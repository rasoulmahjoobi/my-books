import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import type { BookAction } from "../reducer/Reducertype";
import type { Book, BookData } from "../types/book";
import { addBook, updateBook } from "../api/BookApi";
import { BookActions } from "../reducer/‌BookActions";
import type React from "react";
import { useEffect } from "react";

const bookValidationSchema = z.object({
  bookName: z
    .string()
    .min(1, " Book name is required.")
    .min(3, "Book name must be at least 3 character")
    .max(25, "Book name must be less than 25 character"),

  author: z
    .string()
    .min(1, "Author is required.")
    .min(3, "Author must be at least 3 character")
    .max(20, "Author must be less than 20 character"),

  rating: z
    .string()
    .min(1, "Rating is required")
    .refine((value) => Number(value) >= 1 && Number(value) <= 5, {
      message: "Rating must be between 1 and 5",
    }),

  url: z.string().min(1, "URL is required.").url("Invalid image URL"),
});

type HandleFormProps = {
  dispatch: React.Dispatch<BookAction>;
  selectedBook: Book | null;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
};

const HandleForm = ({
  dispatch,
  selectedBook,
  setSelectedBook,
}: HandleFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookData>({
    resolver: zodResolver(bookValidationSchema),
    mode: "onChange",
  });

  //اضافه کردن و ویرایش

  useEffect(() => {
    if (selectedBook) {
      reset({
        bookName: selectedBook.bookName,
        author: selectedBook.author,
        rating: selectedBook.rating,
        url: selectedBook.url,
      });
    }
  }, [selectedBook]);

  const onSubmit = async (data: BookData) => {
    dispatch({
      type: BookActions.FETCH_LOAD,
    });

    //ویرایش
    if (selectedBook) {
      try {
        const updatedBook = await updateBook({
          id: selectedBook.id,
          bookName: data.bookName,
          author: data.author,
          rating: data.rating,
          url: data.url,
        });

        dispatch({
          type: BookActions.UPDATE_BOOK,
          payload: updatedBook,
        });

        reset;
        setSelectedBook(null);
      } catch (error) {
        dispatch({
          type: BookActions.FETCH_ERROR,
          payload: "Failed to edit student!",
        });
      }
    } else {
      
      //اضافه کردن
      try {
        const newBook = await addBook({
          bookName: data.bookName,
          author: data.author,
          rating: data.rating,
          url: data.url,
        });
        dispatch({
          type: BookActions.ADD_BOOK,
          payload: newBook,
        });
        reset();
      } catch (error) {
        dispatch({
          type: BookActions.FETCH_ERROR,
          payload: "Failed to add Book",
        });
      }
    }
  };
  return (
    <>
      <div className="flex flex-col w-full m-10 gap-5 p-5 bg-white rounded-xl shadow-xl shadow-gray-300">
        <h1 className="text-xl font-bold">Add New Book</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row justify-between items-start gap-5"
        >
          <div className="flex flex-col gap-5">
            <label className="text-base font-bold">Book Name</label>
            <input
              type="text"
              {...register("bookName")}
              placeholder="Enter Book Name"
              className="p-2 border-2 border-gray-200 rounded-xl"
            />
            {errors.bookName && (
              <p className="text-red-500 text-sm">{errors.bookName.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-base font-bold">Author</label>
            <input
              type="text"
              {...register("author")}
              placeholder="Enter Author Name"
              className="p-2 border-2 border-gray-200 rounded-xl"
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-base font-bold">Rating (1-5)</label>
            <select
              {...register("rating")}
              className="p-2 border-2 border-gray-200 rounded-xl w-50"
            >
              <option value={""}>Choose rating</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-base font-bold">Cover Image URL</label>
            <input
              type="text"
              {...register("url")}
              placeholder="Enter URL"
              className="p-2 border-2 border-gray-200 rounded-xl"
            />
            {errors.url && (
              <p className="text-red-500 text-sm">{errors.url.message}</p>
            )}
          </div>
          <div className="pt-11">
            <button
              type="submit"
              className="bg-blue-700 text-white h-11 rounded-xl px-4 cursor-pointer"
            >
              {selectedBook ? "Edit Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default HandleForm;
