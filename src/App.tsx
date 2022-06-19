import { Routes, Route } from 'react-router-dom';

import BookListContainer from "./books/BookListContainer";
import BookDetailContainer from './books/BookDetailContainer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookListContainer />} />
      <Route path="/books/:bookId" element={<BookDetailContainer />} />
    </Routes>
  )
}

export default App;