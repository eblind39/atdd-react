import React, {SyntheticEvent, useState} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Login = () => {
    const [emailValMsg, setEmailValMsg] = useState<string>('')
    const [passwordValMsg, setPasswordValMsg] = useState<string>('')

    const handleSubmit = (evt: SyntheticEvent) => {
        evt.preventDefault()
        setEmailValMsg('The email is required')
        setPasswordValMsg('The password is required')
    }

    return (
        <React.Fragment>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="email"
                    id="email"
                    helperText={emailValMsg}
                ></TextField>
                <TextField
                    label="password"
                    id="password"
                    type="password"
                    helperText={passwordValMsg}
                ></TextField>
                <Button type="submit">Send</Button>
            </form>
        </React.Fragment>
    )
}

export default Login
