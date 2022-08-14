import {Outlet, Navigate} from 'react-router-dom'

interface Props {
    isAuth: boolean
}

const PrivateRoutes = ({isAuth}: Props) => {
    // let auth = {token: false}
    return /*auth.token*/ isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
