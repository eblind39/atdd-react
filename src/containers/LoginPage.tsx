import React from 'react'

import Login from '../components/auth/login'
import NavBar from './NavBar'

const LoginPage = () => {
    return (
        <React.Fragment>
            <NavBar />
            <Login />
        </React.Fragment>
    )
}

export default LoginPage
