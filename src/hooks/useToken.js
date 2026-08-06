import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const useToken = (user) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email || user?.email;
        const displayName = user?.user?.displayName || user?.displayName || '';
        
        if (email) {
            const currentUser = { email: email, name: displayName };
            fetch(`${BASE_URL}/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            .then(res => res.json())
            .then(data => {
                const accessToken = data.token;
                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                }
            })
            .catch((err) => {
                console.error("Error obtaining token / saving user:", err);
            });
        }

    }, [user]);
    return [token];
};

export default useToken;


