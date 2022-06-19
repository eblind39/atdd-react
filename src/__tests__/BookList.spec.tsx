import { render } from '@testing-library/react';
import { Book } from "../types/books";
import { MemoryRouter as Router } from 'react-router-dom';
import SearchBox from '../utils/SearchBox';
import userEvent from '@testing-library/user-event';

interface Props {
    books: Book[];
    loading: boolean;
    error: boolean;
}

interface PropsBookDetail {
    book: Book;
    loading: boolean;
    error: boolean;
}

const renderWithRouter = (component: JSX.Element) => {
    return {
        ...render(<Router>{ component }</Router>)
    }
}

const BookList = ({ books, loading, error }: Props) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>An error has ocurred</div>;
    return (
        <div data-test="book-list">
            {
                books.map(book => (
                    <div key={book.id} className="book-item">
                        <h2 className="title">{ book.name }</h2>
                    </div>
                ))
            }
        </div>
    )
}

const getDescriptionFor = (book: Book): string => {
    return book.description ? book.description : book.name;
}

const BookDetail = ({book, loading, error}: PropsBookDetail) => {
    return (
        <div className='detail'>
            <h2 className='book-title'>{ book.name }</h2>
            <p className='book-description'>{ getDescriptionFor(book) }</p>
        </div>
    );
}

describe('BookList', () => {
    it('loading', () => {
        const props = {
            books: [],
            loading: true,
            error: false,
        };
        const { container } = render(<BookList books={props.books} loading={props.loading} error={props.error} />);
        const content = container.querySelector('div');
        expect(content?.innerHTML).toContain('Loading...');
    });
    it('error', () => {
        const props = {
            books: [],
            loading: false,
            error: true,
        };
        const { container } = render(<BookList {...props} />);
        const content = container.querySelector('div');
        expect(content?.innerHTML).toContain('An error has ocurred');
    });
    it('render book list', () => {
        const props = {
            books: [
                { 
                    id: 1, 
                    name: 'Refactoring', 
                    image: "https://images-na.ssl-images-amazon.com/images/I/41odjJlPgHL._SY445_SX342_QL70_ML2_.jpg",
                    description: "For more than twenty years, experienced programmers worldwide have relied on Martin Fowler’s Refactoring to improve the design of existing code and to enhance software maintainability, as well as to make existing code easier to understand."
                },
                { 
                    id: 2, 
                    name: 'Domain-driven design', 
                    "image": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3218/9780321834577.jpg",
                    "description": "For software developers of all experience levels looking to improve their results, and design and implement domain-driven enterprise applications consistently with the best current state of professional practice"
                },
            ],
            loading: false,
            error: false,
        };
        const { container } = render(<BookList {...props} />)
        const titles = [...container.querySelectorAll('h2')].map(title => title.innerHTML );
        expect(titles).toEqual(['Refactoring', 'Domain-driven design']);
        expect(titles.length).toBe(2);
    });
    it('render books', () => {
        const props = {
            books: [
                { 
                    id: 1, 
                    name: 'Refactoring', 
                    image: "https://images-na.ssl-images-amazon.com/images/I/41odjJlPgHL._SY445_SX342_QL70_ML2_.jpg",
                    description: "For more than twenty years, experienced programmers worldwide have relied on Martin Fowler’s Refactoring to improve the design of existing code and to enhance software maintainability, as well as to make existing code easier to understand."
                },
                { 
                    id: 2, 
                    name: 'Domain-driven design', 
                    "image": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3218/9780321834577.jpg",
                    "description": "For software developers of all experience levels looking to improve their results, and design and implement domain-driven enterprise applications consistently with the best current state of professional practice"
                },
            ],
            loading: false,
            error: false,
        };

        const { container } = renderWithRouter(<BookList {...props} />);
        const titles = [...container.querySelectorAll('h2')].map(title => title.innerHTML);
        expect(titles).toEqual(['Refactoring', 'Domain-driven design']);
    });
    it('displays the book name when no description was given', () => {
        const props = {
            book: {
                id: 1,
                name: 'Refactoring',
                image: 'url-img',
                description: '',
            },
            loading: false,
            error: false,
        };
        const { container } = render(<BookDetail {...props} />);
        const description = container.querySelector('p.book-description');
        expect(description?.innerHTML).toEqual(props.book.name);
    });
    it.skip('Shows *more* link when the description is too long', () => {
        const props = {
            book: {
                id: 1,
                name: 'Refactoring',
                image: 'url-img',
                description: 'The book about how to do Refactoring...'
            },
            loading: false,
            error: false,
        };

        const { container } = render(<BookDetail {...props} />);
        const link = container.querySelector('a.show-more');
        const title = container.querySelector('p.book-description');
        expect(link?.innerHTML).toEqual('Show more');
        expect(title?.innerHTML).toEqual('The book about how to do Refactoring...')
    });
});

describe('SearchBox', () => {
    it('renders input', () => {
        const props = {
            term: '',
            onSearch: jest.fn()
        }

        const { container } = render(<SearchBox {...props} />);
        const input = container.querySelector('input[type="text"]');
        if (input != null) userEvent.type(input, 'Refactoring');
        expect(props.onSearch).toHaveBeenCalledTimes(0);
    });
    it('trim empty strings', () => {
        const props = {
            term: '',
            onSearch: jest.fn()
        }

        const { container } = render(<SearchBox {...props} />);
        const input = container.querySelector('input[type="text"]');
        if (input != null) userEvent.type(input, '   ');
        expect(props.onSearch).not.toHaveBeenCalled();
    });
});