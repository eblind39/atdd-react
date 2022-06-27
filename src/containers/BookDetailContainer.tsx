import { useParams } from 'react-router-dom';
import useRemoteService from '../hooks/useRemoteService';
import BookDetail from '../components/books/BookDetail';
import { API_URL } from '../app/config';

const BookDetailContainer = () => {
    let params = useParams();
    const { data, loading, error, setUrl } = useRemoteService({ initialUrl: `${API_URL}/books/${params.bookId}`, initialData: {} });
    return <BookDetail book={data} loading={loading} error={error} />;
}

export default BookDetailContainer;