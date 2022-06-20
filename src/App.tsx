import { Routes, Route } from 'react-router-dom';

import BookListContainer from "./books/BookListContainer";
import BookDetailContainer from './books/BookDetailContainer';
import NotFoundPage from './utils/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookListContainer />} />
      <Route path="/books/:bookId" element={<BookDetailContainer />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App;