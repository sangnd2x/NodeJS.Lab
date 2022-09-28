import { useState } from "react";
import { useEffect } from "react";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
            });
        console.log(users);
    }, []);
    
    if (users.length === 0) {
        return (
            <div>
                <h1>No User Found!</h1>
            </div>
        );
    } else {
        return (
            <div>
                <h1 className="h1">Users</h1>
                <div className="users">
                    {users.map(user => (
                        <li key={users.indexOf(user)}>
                            {user}
                        </li>
                    ))}
                </div>
            </div>
        );
    }
};

export default Users;