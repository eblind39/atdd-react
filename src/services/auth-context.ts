import React from 'react'
import {UserType} from '../types/login'

interface SLogginProp {
    role: string
}

const AuthContext = React.createContext({
    isAuth: false,
    handleSuccessLogin: ({role}: SLogginProp) => {},
    user: {role: '', username: ''} as UserType,
})

export default AuthContext
