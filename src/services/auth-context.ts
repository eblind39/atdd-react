import React from 'react'
import {UserType} from '../types/login'

interface SLogginProp {
    username: string
    role: string
}

const AuthContext = React.createContext({
    isAuth: false,
    handleSuccessLogin: ({username, role}: SLogginProp) => {},
    user: {role: '', username: ''} as UserType,
})

export default AuthContext
