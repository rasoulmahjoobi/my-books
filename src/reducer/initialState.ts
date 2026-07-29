import type { BookState } from "./Reducertype";

export const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};
