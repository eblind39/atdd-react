import React, {FormEvent, SyntheticEvent, useState} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Login = () => {
    const [emailValMsg, setEmailValMsg] = useState<string>('')
    const [passwordValMsg, setPasswordValMsg] = useState<string>('')

    const handleSubmit = (evt: SyntheticEvent) => {
        evt.preventDefault()
        const target = evt.target as HTMLFormElement
        const elements = target.elements as typeof target.elements & {
            email: {value: string}
            password: {value: string}
        }

        const {email, password} = elements

        if (!email.value) setEmailValMsg('The email is required')
        else setEmailValMsg('')

        if (!password.value) setPasswordValMsg('The password is required')
        else setPasswordValMsg('')
    }

    return (
        <React.Fragment>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="email"
                    id="email"
                    name="email"
                    helperText={emailValMsg}
                ></TextField>
                <TextField
                    label="password"
                    id="password"
                    name="password"
                    type="password"
                    helperText={passwordValMsg}
                ></TextField>
                <Button type="submit">Send</Button>
            </form>
        </React.Fragment>
    )
}

export default Login
