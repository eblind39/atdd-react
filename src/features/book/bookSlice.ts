import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../../types/books";
import { API_URL } from "../../app/config";
import { RootState } from "../../app/store";

interface BooksState {
    books: Book[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
    books: [],
    loading: 'idle'
} as BooksState;

export const getBooks = createAsyncThunk(
    "books/getBooks",
    async (term: string) => {
        let apiURL = `${API_URL}/books` + (term ? `?q=${term}` : ``);
        const response = await fetch(apiURL);
        const books: Book[] = await response.json();
        return books;
    }
);

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBooks.pending, (state, action) => {
            state.loading = 'pending';
        });
        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.books = action.payload;
            state.loading = 'succeeded';
        });
        builder.addCase(getBooks.rejected, (state, action) => {
            state.loading = 'failed';
        });
    }
});

export const selectBooks = (state: RootState) => state.books.books;
export default booksSlice.reducer;