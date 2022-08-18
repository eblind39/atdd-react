import React, {useContext, useEffect} from 'react'
import WithNavBar from '../components/withnavbar'
import AuthContext from '../services/auth-context'

const AdminPage = () => {
    const {user} = useContext(AuthContext)

    return (
        <WithNavBar
            element={
                <React.Fragment>
                    <h1>Admin page</h1>
                    <h4>Username displayed in AppBar</h4>
                </React.Fragment>
            }
            username={user.username}
        />
    )
}

export default AdminPage
