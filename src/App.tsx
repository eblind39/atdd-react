import {Routes, Route} from 'react-router-dom'

import BookListContainer from './containers/BookListContainer'
import BookDetailContainer from './containers//BookDetailContainer'
import Home from './containers/Home'
import TSBasics from './containers/TSBasics'
import Users from './containers/Users'
import Form from './containers/products/Form'
import CreativAnims from './containers/CreativAnims'
import CreativeCSketch from './containers/CreativeCSketch'
import GithubSearchPage from './containers/GithubSearchPage'
import LoginPage from './containers/LoginPage'
import NotFoundPage from './utils/NotFoundPage'

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/books" element={<BookListContainer />} />
            <Route path="/books/:bookId" element={<BookDetailContainer />} />
            <Route path="/" element={<Home />} />
            <Route path="/tsbasics" element={<TSBasics />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Form />} />
            <Route path="/creative" element={<CreativAnims />} />
            <Route path="/sketch" element={<CreativeCSketch />} />
            <Route path="/gitsearch" element={<GithubSearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
