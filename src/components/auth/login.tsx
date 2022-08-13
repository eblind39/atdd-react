import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Login = () => {
    return (
        <React.Fragment>
            <h1>Login</h1>
            <TextField label="email" id="email"></TextField>
            <TextField
                label="password"
                id="password"
                type="password"
            ></TextField>
            <Button>Send</Button>
        </React.Fragment>
    )
}

export default Login
