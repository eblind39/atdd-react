import { applyMiddleware, createStore, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "../reducers/reducer";
import { BooksState } from '../types/reduxcustom';

const initialState: BooksState = { loading: false, books: [], term: '' };

const middlewares = [thunk, logger];

const composeEnhancers = compose(
    applyMiddleware(...middlewares)
);

const store = createStore(
    reducer as any,
    initialState,
    composeEnhancers
);

export default store;