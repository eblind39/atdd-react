import React from 'react'
import WithNavBar from '../components/withnavbar'

import Login from '../components/auth/login'

interface Props {
    onSuccessLogin: () => void
}

const LoginPage = ({onSuccessLogin}: Props) => (
    <WithNavBar element={<Login onSuccessLogin={onSuccessLogin} />} />
)

export default LoginPage
