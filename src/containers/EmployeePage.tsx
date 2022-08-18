import React, {useContext} from 'react'
import WithNavBar from '../components/withnavbar'
import AuthContext from '../services/auth-context'

const EmployeePage = () => {
    const {user} = useContext(AuthContext)

    return (
        <WithNavBar
            element={
                <React.Fragment>
                    <h1>Employee page</h1>
                    <h4>Username displayed in AppBar</h4>
                </React.Fragment>
            }
            username={user.username}
        />
    )
}

export default EmployeePage
