import {Outlet, Navigate} from 'react-router-dom'

interface Props {
    isAuth: boolean
}

const PrivateRoutes = ({isAuth}: Props) => {
    // const isAuth: boolean = !!sessionStorage.getItem('is-authenticated')
    return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
