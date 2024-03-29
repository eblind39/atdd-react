import React, {useEffect, useRef, useState} from 'react'
import NavBar from './NavBar'
import List from '../components/users/List'
import Form from '../components/users/Form'
import {User} from '../types/users'
import {UsersState} from '../types/users'
import WithNavBar from '../components/withnavbar'

const Users: React.FC = (): JSX.Element => {
    const [users, setUsers] = useState<UsersState['users']>([])
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetch('https://reqres.in/api/users?page=1&per_page=12')
            .then(res => res.json())
            .then(res => {
                setUsers(res.data)
            })
    }, [])

    const handleNewUser = (newUser: User): void => {
        setUsers(users => [...users, newUser])
    }

    const RenderUsers = () => (
        <React.Fragment>
            <div ref={divRef} className="containerUsers">
                <List users={users} />
                <Form onNewUser={handleNewUser} />
            </div>
        </React.Fragment>
    )

    return <WithNavBar element={<RenderUsers />} />
}

export default Users
