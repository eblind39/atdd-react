import React, {useState} from 'react'
import AuthContext from '../../services/auth-context'
import {UserType} from '../../types/login'

interface Props {
    children: JSX.Element
    isAuth: boolean
}

type ResponseType = {username: string; role: string}

const AuthGuard = ({children, isAuth = false}: Props) => {
    const [isUserAuth, setIsUserAuth] = useState<boolean>(isAuth)
    const [user, setUser] = useState<UserType>({role: '', username: ''})

    const handleSuccessLogin = ({username, role}: ResponseType) => {
        setIsUserAuth(true)
        setUser({username, role})
    }

    const authProviderValue = {
        isAuth: isUserAuth,
        handleSuccessLogin,
        user,
    }

    return (
        <AuthContext.Provider value={authProviderValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthGuard
