import { useParams } from 'react-router-dom';
import useRemoteService from '../hooks/useRemoteService';
import BookDetail from './BookDetail';

const BookDetailContainer = () => {
    let params = useParams();
    const { data, loading, error, setUrl } = useRemoteService({ initialUrl: `http://localhost:3007/books/${params.bookId}`, initialData: {} });
    return <BookDetail book={data} loading={loading} error={error} />;
}

export default BookDetailContainer;