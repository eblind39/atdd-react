import React from 'react';
import { User } from '../../types/Users/users';

interface Users {
    // children: JSX.Element[];
    users: Array<User>;
}

const List: React.FC<Users> = ({ users }) => {

    const renderList = (): JSX.Element[] => {
        return users.map((user) => {
            return (
                <li key={user.id}>
                    <img src={user.avatar} alt={ `Avatar for ${user.first_name}` }></img>
                    <h4>{ user.first_name } { user.last_name }</h4>
                    <p>{ user.email }</p>
                </li>
            )
        })
    }

    return (
        <React.Fragment>
            <h3>Users list</h3>
            <ul>
                { renderList() }
            </ul>
        </React.Fragment>
    );

}

export default List;