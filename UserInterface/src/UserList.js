import React from 'react';

const UserList = ({ data }) => (
    <ul>
        { data.map(name => <li key={name}>{name}</li>) }
    </ul>
);

export default UserList;