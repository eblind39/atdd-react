import React, {SyntheticEvent, useState, useContext} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {Navigate} from 'react-router-dom'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {doLogin} from '../../services/loginService'
import {EnumStrings} from '../../types/strings'
import {validEmail, validPassword} from '../../services/loginService'
import Copyright from '../copyright'
import AuthContext from '../../services/auth-context'

type FormValues = {
    email: string
    password: string
}

type UserType = {role: string}

const Login = () => {
    const [emailValMsg, setEmailValMsg] = useState<string>('')
    const [passwordValMsg, setPasswordValMsg] = useState<string>('')
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
    })
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isOpenSnack, setIsOpenSnack] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [user, setUser] = useState<UserType>({role: ''})
    const {handleSuccessLogin} = useContext(AuthContext)

    const noValidForm = (): boolean => {
        const {email, password} = formValues

        if (!email) setEmailValMsg('The email is required')
        if (!password) setPasswordValMsg('The password is required')

        return !email || !password
    }

    const handleSubmit = async (evt: SyntheticEvent) => {
        evt.preventDefault()

        if (noValidForm()) return

        setEmailValMsg('')
        setPasswordValMsg('')

        try {
            setIsFetching(true)

            // const response: Response = await fetch('http://localhost:3007/login', {
            //     method: 'GET',
            // })
            // setTimeout(() => setIsFetching(false), 3000)

            const response: Response = await doLogin({
                email: formValues.email,
                password: formValues.password,
            })

            if (!response.ok) throw response

            const {
                user: {role},
            } = await response.json()
            setUser({role})
            handleSuccessLogin()
        } catch (err: unknown) {
            if (err instanceof Response) {
                const data = await err.json()
                if (data.hasOwnProperty('message')) {
                    setIsOpenSnack(true)
                    setErrorMessage(data.message)
                }
            }
        } finally {
            setIsFetching(false)
        }
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
                `The email is invalid. Example: john.doe@domain.com.`,
            )
        else setEmailValMsg('')
    }

    const handleBlurPassword = (evt: SyntheticEvent) => {
        if (!validPassword(formValues.password))
            setPasswordValMsg(
                `The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character`,
            )
        else setPasswordValMsg('')
    }

    const handleCloseSnackbar = () => setIsOpenSnack(false)

    const theme = createTheme()

    if (!isFetching && user.role === EnumStrings.ROLE_ADMIN)
        return <Navigate to="/admin" />
    if (!isFetching && user.role === EnumStrings.ROLE_EMPLOYEE)
        return <Navigate to="/employee" />

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {isFetching && (
                    <CircularProgress data-testid="loading-indicator" />
                )}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login page
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{mt: 1}}
                    >
                        <TextField
                            label="email"
                            id="email"
                            name="email"
                            helperText={emailValMsg}
                            onChange={handleChange}
                            onBlur={handleBlurEmail}
                            value={formValues.email}
                            fullWidth
                            margin="normal"
                        ></TextField>
                        <TextField
                            label="password"
                            id="password"
                            name="password"
                            type="password"
                            helperText={passwordValMsg}
                            onChange={handleChange}
                            onBlur={handleBlurPassword}
                            value={formValues.password}
                            fullWidth
                            margin="normal"
                        ></TextField>

                        <Button
                            type="submit"
                            disabled={isFetching}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}} />
                <Snackbar
                    open={isOpenSnack}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={errorMessage}
                />
            </Container>
        </ThemeProvider>
    )
}

export default Login
