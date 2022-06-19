import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Book } from '../types/books';
import Loading from '../utils/Loading';
import Error from '../utils/Error';

interface Props {
    books: Book[];
    loading: boolean;
    error: boolean;
}

const BookList = ({ books, loading, error }: Props) => {
    return (
        <div data-test='book-list'>
            <Typography variant='h2' component='h2' data-test='heading'>Bookish</Typography>
            <Loading showIf={ loading } />
            <Error showIf={ error } message={ "An error has occurred" } />
            <Grid container spacing={3}>
                { 
                    (books && books.length > 0 ?
                    books.map(book => (
                        <Grid item xs={4} sm={4} key={book.id} className='book-item'>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={book.image}
                                    alt="green iguana"
                                    />
                                <CardContent>
                                    <Typography className='book-title' gutterBottom variant="h5" component="div">
                                        { book.name }
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        { `${book.description.slice(0, 150)} ...` }
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">
                                        <Link to={`/books/${book.id}`}>View Details</Link>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                    :
                    null)
                }
            </Grid>
        </div>
    )
  };

  export default BookList;