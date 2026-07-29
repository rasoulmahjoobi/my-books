import type { BookAction, BookState } from "./Reducertype";
import { BookActions } from "./‌BookActions";

export const BookReducer = (
  state: BookState,
  action: BookAction,
): BookState => {
  switch (action.type) {
    case BookActions.GET_BOOK:
      return {
        ...state,
        loading: false,
        books: action.payload,
      };
    case BookActions.FETCH_LOAD:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case BookActions.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case BookActions.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
        loading: false,
      };
    case BookActions.DELETE_BOOK:
      return {
        ...state,
        books: [...state.books].filter((book) => book.id !== action.payload),
        loading: false,
      };
    case BookActions.UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book,
        ),
        loading: false,
      };

    default:
      return state;
  }
};
