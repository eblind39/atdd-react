import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import BookListContainer from './containers/BookListContainer'
import BookDetailContainer from './containers//BookDetailContainer'
import Home from './containers/Home'
import TSBasics from './containers/TSBasics'
import Users from './containers/Users'
import Products from './containers/Products'
import CreativAnims from './containers/CreativAnims'
import CreativeCSketch from './containers/CreativeCSketch'
import GithubSearchPage from './containers/GithubSearchPage'
import LoginPage from './containers/LoginPage'
import AdminPage from './containers/AdminPage'
import EmployeePage from './containers/EmployeePage'
import NotFoundPage from './utils/NotFoundPage'
import PrivateRoutes from './components/privroutes'
import AuthContext from './services/auth-context'

interface Props {
    isAuth: boolean
}

const App = () => {
    const [isUserAuth, setIsUserAuth] = useState<boolean>(false)

    const handleSuccessLogin = () => setIsUserAuth(true)

    const authProviderValue = {
        isAuth: isUserAuth,
        handleSuccessLogin,
    }

    return (
        <AuthContext.Provider value={authProviderValue}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateRoutes isAuth={isUserAuth} />}>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/employee" element={<EmployeePage />} />
                </Route>
                <Route path="/books" element={<BookListContainer />} />
                <Route
                    path="/books/:bookId"
                    element={<BookDetailContainer />}
                />
                <Route path="/" element={<Home />} />
                <Route path="/tsbasics" element={<TSBasics />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/creative" element={<CreativAnims />} />
                <Route path="/sketch" element={<CreativeCSketch />} />
                <Route path="/gitsearch" element={<GithubSearchPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AuthContext.Provider>
    )
}

export default App
