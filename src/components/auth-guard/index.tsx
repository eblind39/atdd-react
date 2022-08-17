import React, {useState} from 'react'
import AuthContext from '../../services/auth-context'

interface Props {
    children: JSX.Element
    isAuth: boolean
}

const AuthGuard = ({children, isAuth = false}: Props) => {
    const [isUserAuth, setIsUserAuth] = useState<boolean>(isAuth)

    const handleSuccessLogin = () => setIsUserAuth(true)

    const authProviderValue = {
        isAuth: isUserAuth,
        handleSuccessLogin,
    }

    return (
        <AuthContext.Provider value={authProviderValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthGuard
