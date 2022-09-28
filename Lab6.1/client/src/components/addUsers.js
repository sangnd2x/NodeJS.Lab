import React from "react";
import { useEffect, useState, useRef } from "react";

function AddUser() {
    const [user, setUser] = useState('');
    const [users, setUsers] = useState([]);
    const render = useRef(true);

    useEffect(() => {
        if (render.current) {
            render.current = false;
        } else {
            fetch('http://localhost:5000/add-user', {
                method: 'POST',
                body: JSON.stringify(users.slice(-1)),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }, [users]);

    const handleSubmit = () => {
        setUsers(prev => ([...prev, user]));
        setUser('');
    }

    return (
        <div className="form">
            <input type="text" name="user" value={user} onChange={e => setUser(e.target.value)}/>
            <button onClick={handleSubmit}>Add User</button>
        </div>
    );
};

export default AddUser;