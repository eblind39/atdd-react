import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {Book} from '../../types/books'
import {API_URL} from '../../app/config'
import {RootState} from '../../app/store'

interface BooksState {
    books: Book[]
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | undefined
}

const initialState: BooksState = {
    books: [],
    loading: 'idle',
    error: undefined,
}

export const getBooks = createAsyncThunk(
    'books/getBooks',
    async (term: string) => {
        let apiURL = `${API_URL}/books` + (term ? `?q=${term}` : ``)
        const response = await fetch(apiURL)
        const books: Book[] = await response.json()
        return books
    },
)

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getBooks.pending, (state, action) => {
            state.loading = 'pending'
            state.error = undefined
        })
        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.books = action.payload
            state.loading = 'succeeded'
            state.error = undefined
        })
        builder.addCase(getBooks.rejected, (state, action) => {
            state.loading = 'failed'
            state.error = action.error.message?.toString()
        })
    },
})

export const selectBooks = (state: RootState) => state.books.books
export const selectLoading = (state: RootState) => state.books.loading
export const selectError = (state: RootState) => state.books.error
export default booksSlice.reducer
