import React from 'react';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Book } from '../../types/books';
import Loading from '../../utils/Loading';
import Error from '../../utils/Error';

interface Props {
    book: Book;
    loading: boolean;
    error: boolean;
}

const BookDetail = ({ book, loading, error }: Props) => {
    return (
        <React.Fragment>
            <Loading showIf={loading} />
            <Error showIf={error} message={ "An error has occurred" } />
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                component="img"
                height="340"
                image={book?.image}
                alt="book image"
                />
                <CardContent>
                    <Typography className='book-title' variant='h2' component='h2'>{ book.name }</Typography>
                    <Typography className='book-title' variant='h2' component='h2'>Book Detail { book.id }</Typography>
                    <Typography variant="body2" color="text.secondary">
                        { book.description }
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

export default BookDetail;