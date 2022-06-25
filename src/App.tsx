import { Routes, Route } from 'react-router-dom';

import BookListContainer from "./books/BookListContainer";
import BookDetailContainer from './books/BookDetailContainer';
import Home from "./containers/Home";
import TSBasics from "./containers/TSBasics";
import Users from "./containers/Users";
import NotFoundPage from './utils/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookListContainer />} />
      <Route path="/books/:bookId" element={<BookDetailContainer />} />
      <Route path="/" element={ <Home /> } />
      <Route path="/tsbasics" element={ <TSBasics /> } />
      <Route path="/users" element={ <Users /> } />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App;