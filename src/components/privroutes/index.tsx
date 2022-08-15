import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoutes = () => {
    const isAuth: boolean = !!sessionStorage.getItem('is-authenticated')
    return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
