import React, {SyntheticEvent, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {AppDispatch} from '../app/store'
import {useAppSelector} from '../app/hooks'
import {
    getBooks,
    selectBooks,
    selectLoading,
    selectError,
} from '../features/book/bookSlice'
import SearchBox from '../utils/SearchBox'
import NavBar from './NavBar'
import BookList from '../components/books/BookList'

const BookListContainer = () => {
    const [term, setTerm] = useState<string>('')
    const dispatch: AppDispatch = useDispatch()
    const books = useAppSelector(selectBooks)
    const loading = useAppSelector(selectLoading)
    const error = useAppSelector(selectError)
    const onSearch = (evt: SyntheticEvent) => {
        const target = evt.target as HTMLInputElement
        const {value} = target
        setTerm(value)
    }

    useEffect(() => {
        dispatch(getBooks(term))
    }, [dispatch, term])

    return (
        <React.Fragment>
            <NavBar />
            <SearchBox term={term} onSearch={onSearch} />
            <BookList books={books} loading={loading} error={error} />
        </React.Fragment>
    )
}

export default BookListContainer
