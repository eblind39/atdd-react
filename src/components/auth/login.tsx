import React, {SyntheticEvent, useState} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

interface FormValues {
    email: string
    password: string
}

const validEmail = (email: string): boolean => {
    const validPWGuidelinesRequirements: RegExpMatchArray | null = String(
        email,
    ).match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=,~;:\\\'\""<>\\_\-`\.\[\]{}|/\*\(\)\?]).*$/,
    )

    return !!validPWGuidelinesRequirements
}

const Login = () => {
    const [emailValMsg, setEmailValMsg] = useState<string>('')
    const [passwordValMsg, setPasswordValMsg] = useState<string>('')
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
    })

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

    const handleChange = (evt: SyntheticEvent) => {
        evt.preventDefault()
        const target = evt.target as HTMLInputElement
        const {name, value} = target

        setFormValues({...formValues, [name]: value})
    }

    const handleBlurEmail = (evt: SyntheticEvent) => {
        if (!validEmail(formValues.email))
            setEmailValMsg(
                `The email is invalid. Example: john.doe@domain.com.
                 Password must have 1 capital letter, 1 lowercase letter, and 1 special character.`,
            )
        else setEmailValMsg('')
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
                    onChange={handleChange}
                    onBlur={handleBlurEmail}
                    value={formValues.email}
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
