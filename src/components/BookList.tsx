import { useEffect } from "react";
import { getBooks } from "../api/BookApi";
import type { BookAction, BookState } from "../reducer/Reducertype";
import { BookActions } from "../reducer/‌BookActions";
import type { Book } from "../types/book";
import BookCard from "./BookCard";
import Loading from "./Loading";
import Error from "./Error";

type BookListProps = {
  state: BookState;
  dispatch: React.ActionDispatch<[action: BookAction]>;
  onEdit: (book: Book) => void;
};

const BookList = ({ state, dispatch, onEdit }: BookListProps) => {
  const fetchBooks = async () => {
    dispatch({
      type: BookActions.FETCH_LOAD,
    });
    try {
      const books = await getBooks();
      dispatch({
        type: BookActions.GET_BOOK,
        payload: books,
      });
    } catch (error) {
      dispatch({
        type: BookActions.FETCH_ERROR,
        payload: "Failed to get books!",
      });
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 ">My Books</h1>

      <div className=" grid grid-cols-2 gap-4 lg:grid-cols-4">
        {state.loading ? (
          <Loading />
        ) : state.error ? (
          <Error message={state.error} />
        ) : (
          state.books.map((item) => (
            <BookCard
              book={item}
              key={item.id}
              dispatch={dispatch}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default BookList;
