import React, { SyntheticEvent, useEffect, useState } from 'react';
import BookList from './BookList';
import useRemoteService from '../hooks/useRemoteService';
// import { TextField } from '@mui/material';
import SearchBox from '../utils/SearchBox';

const BookListContainer = () => {
    const [term, setTerm] = useState<string>('');
    const { data, loading, error, setUrl } = useRemoteService({ initialUrl: 'http://localhost:3007/books', initialData: [] });
    const onSearch = (evt: SyntheticEvent) => {
        let target = evt.target as HTMLInputElement;
        let { value } = target;
        setTerm(value);
    }

    useEffect(() => {
        setUrl(`http://localhost:3007/books?q=${term}`);
    }, [term, setUrl]);

    return (
        <React.Fragment>
            <SearchBox term={term} onSearch={onSearch} />
            <BookList books={data} loading={loading} error={error} />
        </React.Fragment>
    )
}

export default BookListContainer;