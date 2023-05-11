import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const loadedUsers = useLoaderData()
    const [Users, setUsers] = useState(loadedUsers)

    const handleDelete = _id => {
        console.log('Delete', _id)
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const remaining = Users.filter(user => user._id !== _id)
            setUsers(remaining)
        })
    }
    return (
        <div>
            <h1>Total Users: {Users.length}</h1>
            <div>
                {
              Users.map(user => <p key={user._id}>{user.name} {user.email} {user._id} 
              <Link to={`/update/${user._id}`}><button>Update</button></Link>
              <button onClick={() => handleDelete (user._id)}>X</button> </p>)
                }
            </div>
            <div>
                <Link to='/'><button>Back to home</button></Link>
            </div>
        </div>
    );
};

export default Users;