// IndexedDB / LocalStorage Offline Queue Engine for Doctors Portal

const DB_NAME = 'doctors_portal_offline_db';
const DB_VERSION = 1;
const STORE_NAME = 'offline_outbox';

// Initialize IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      resolve(null); // Fallback to localStorage
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null); // Fallback to localStorage on error
  });
};

// LocalStorage Fallback Helpers
const getLocalStorageQueue = () => {
  try {
    const data = localStorage.getItem('doctors_portal_offline_queue');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const setLocalStorageQueue = (queue) => {
  try {
    localStorage.setItem('doctors_portal_offline_queue', JSON.stringify(queue));
  } catch (err) {
    console.error('[OfflineSync] Failed to save queue to localStorage:', err);
  }
};

export const offlineSync = {
  // Add item to outbox
  async queueRequest(type, url, method, body, headers = {}) {
    const payload = {
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      type, // e.g. 'BOOKING'
      url,
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ...headers,
      },
      createdAt: new Date().toISOString(),
    };

    const db = await openDB();
    if (db) {
      await new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.add(payload);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } else {
      const queue = getLocalStorageQueue();
      queue.push(payload);
      setLocalStorageQueue(queue);
    }

    // Dispatch event to update listeners (e.g. OfflineBanner)
    window.dispatchEvent(new CustomEvent('offline-queue-changed'));
    return payload;
  },

  // Get all queued items
  async getQueue() {
    const db = await openDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => resolve([]);
      });
    } else {
      return getLocalStorageQueue();
    }
  },

  // Clear or remove specific item from queue
  async removeItem(id) {
    const db = await openDB();
    if (db) {
      await new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete(id);
        tx.oncomplete = () => resolve();
      });
    } else {
      const queue = getLocalStorageQueue().filter((item) => item.id !== id);
      setLocalStorageQueue(queue);
    }
    window.dispatchEvent(new CustomEvent('offline-queue-changed'));
  },

  // Flush and sync all queued requests to backend
  async syncAll(onSuccessItem) {
    const queue = await this.getQueue();
    if (queue.length === 0) return { success: true, count: 0 };

    let syncedCount = 0;
    const errors = [];

    for (const item of queue) {
      try {
        const response = await fetch(item.url, {
          method: item.method,
          headers: item.headers,
          body: JSON.stringify(item.body),
        });

        const data = await response.json();

        if (response.ok && (data.success || data.acknowledged || data.insertedId)) {
          await this.removeItem(item.id);
          syncedCount++;
          if (onSuccessItem) onSuccessItem(item, data);
        } else {
          // If server rejects request (e.g. slot taken), remove to avoid endless retry loop
          if (response.status === 400 || response.status === 409 || (data && data.message)) {
            await this.removeItem(item.id);
          }
          errors.push({ item, error: data?.message || 'Server error' });
        }
      } catch (err) {
        console.error('[OfflineSync] Network error while syncing item:', item, err);
        // Break out if network drops during sync loop
        break;
      }
    }

    window.dispatchEvent(new CustomEvent('offline-queue-changed'));
    return { success: syncedCount > 0, count: syncedCount, errors };
  },
};
