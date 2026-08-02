import React from 'react';
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const DeleteConfirm = ({ deletingDoctor, setDeletingDoctor, refetch }) => {
  const { name, email } = deletingDoctor;

  const handleDelete = (email) => {
    fetch(`https://doctors-portal-server-psi.vercel.app/delete/${email}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success(`Doctor ${name} has been deleted.`);
          setDeletingDoctor(null);
          refetch();
        }
      });
  };

  return (
    <Dialog open={Boolean(deletingDoctor)} onOpenChange={(open) => !open && setDeletingDoctor(null)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-2">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-lg font-bold text-slate-900">
            Confirm Doctor Deletion
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-slate-500">
            Are you sure you want to permanently remove <span className="font-bold text-red-600">{name}</span> from the system? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center gap-3 pt-4">
          <Button variant="outline" onClick={() => setDeletingDoctor(null)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(email)}>
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirm;