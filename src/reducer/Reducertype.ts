import type { Book } from "../types/book";

export type BookState = {
  books: Book[];
  loading: boolean;
  error: string | null;
};

export type BookAction =
  | {
      type: "FETCH_LOAD";
    }
  | {
      type: "FETCH_ERROR";
      payload: string;
    }
  | {
      type: "GET_BOOK";
      payload: Book[];
    }
  | {
      type: "ADD_BOOK";
      payload: Book;
    }
  | {
      type: "DELETE_BOOK";
      payload: string;
    }
  | {
      type: "UPDATE_BOOK";
      payload: Book;
    };
