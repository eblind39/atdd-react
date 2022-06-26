import { Book } from '../../types/books';

interface ActionType {
    type: string;
    books: Book[];
}

interface BooksState {
    loading: boolean;
    books: Book[];
    term: string;
}

export { ActionType, BooksState };