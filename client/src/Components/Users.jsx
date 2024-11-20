import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = () => {
      fetch("https://dummyjson.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data.users)) 
        .catch((error) => console.error('Error fetching users:', error));
    };

    getAllUsers(); 
  }, []); 

  return (
    <>
      <Container>
        <h2 className="mt-3">Users List:</h2>
        <ul>
          {users.map((user) => (
            <li className="py-2" key={user.id}>{user.firstName} {user.lastName} / {user.username} <a className="btn btn-primary" href={`/users/${user.id}`}> Show more of this User</a> </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export default Users;
