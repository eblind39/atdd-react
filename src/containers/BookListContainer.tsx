import React, { SyntheticEvent, useEffect, useState } from 'react';
import NavBar from './NavBar';
import BookList from '../components/books/BookList';
import useRemoteService from '../hooks/useRemoteService';
// import { TextField } from '@mui/material';
import SearchBox from '../utils/SearchBox';
import { API_URL } from '../app/config';

const BookListContainer = () => {
    const [term, setTerm] = useState<string>('');
    const { data, loading, error, setUrl } = useRemoteService({ initialUrl: `${API_URL}/books`, initialData: [] });
    const onSearch = (evt: SyntheticEvent) => {
        let target = evt.target as HTMLInputElement;
        let { value } = target;
        setTerm(value);
    }

    useEffect(() => {
        setUrl(`${API_URL}/books?q=${term}`);
    }, [term, setUrl]);

    return (
        <React.Fragment>
            <NavBar />
            <SearchBox term={term} onSearch={onSearch} />
            <BookList books={data} loading={loading} error={error} />
        </React.Fragment>
    )
}

export default BookListContainer;