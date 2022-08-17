import {useContext} from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import AuthContext from '../../services/auth-context'

const PrivateRoutes = () => {
    const {isAuth} = useContext(AuthContext)

    // const isAuth: boolean = !!sessionStorage.getItem('is-authenticated')
    return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
