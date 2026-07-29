import { Star } from "lucide-react";
import React from "react";
import type { BookAction } from "../reducer/Reducertype";
import type { Book } from "../types/book";
import { deleteBook } from "../api/BookApi";
import { BookActions } from "../reducer/‌BookActions";

type BookCardProps = {
  book: Book;
  dispatch: React.ActionDispatch<[action: BookAction]>;
  onEdit: (book: Book) => void;
};

function BookCard({ book, dispatch, onEdit }: BookCardProps) {
  const deleteHandler = async () => {
    dispatch({
      type: BookActions.FETCH_LOAD,
    });
    try {
      await deleteBook(book.id);
      dispatch({
        type: BookActions.DELETE_BOOK,
        payload: book.id,
      });
    } catch (error) {
      dispatch({
        type: BookActions.FETCH_ERROR,
        payload: "Failed to delete book!",
      });
    }
  };

  return (
    <>
      {/* {card} */}
      <div className="w-64 h-[350px] bg-white border-none rounded-xl flex flex-col items-center gap-2">
        <img className="w-40 h-44 mt-5" alt="prodoct" src={book.url} />

        <div className="flex flex-col ml-5">
          <h1 className="whitespace-nowrap font-bold mr-20 ml-2">
            {book.bookName}
          </h1>

          <p className="whitespace-nowrap font-bold mr-20 ml-2 text-xs text-gray-400">
            {book.author}
          </p>

          {/* {rating} */}
          <span className=" flex flex-row justify-center gap-1 mr-48  ml-2">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400  mt-1" />
            <span className="text-gray-400 text-sm">{book.rating}</span>
          </span>
        </div>

        <div className=" flex flex-row justify-between gap-4">
          <button
            onClick={() => onEdit(book)}
            className="w-24 h-8 border-2  border-blue-400 text-blue-400 font-bold rounded-lg hover:bg-amber-400 "
          >
            Edit
          </button>
          <button
            onClick={deleteHandler}
            className="w-24 h-8 border-2 border-red-500  text-red-500 font-bold rounded-lg hover:bg-amber-400 "
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
export default BookCard;
