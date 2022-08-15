import {useParams} from 'react-router-dom'
import useRemoteService from '../hooks/useRemoteService'
import BookDetail from '../components/books/BookDetail'
import {API_URL} from '../app/config'
import WithNavBar from '../components/withnavbar'

const BookDetailContainer = () => {
    let params = useParams()
    const {data, loading, error} = useRemoteService({
        initialUrl: `${API_URL}/books/${params.bookId}`,
        initialData: {},
    })

    return (
        <WithNavBar
            element={<BookDetail book={data} loading={loading} error={error} />}
        />
    )
}

export default BookDetailContainer
