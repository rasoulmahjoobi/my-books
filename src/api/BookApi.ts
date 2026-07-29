import api from "./Axios";
import type { Book, BookData } from "../types/book";

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get("/books");
  return response.data;
};

export const addBook = async (book: BookData) => {
  const response = await api.post("/books", book);
  return response.data;
};

export const deleteBook = async (id: string) => {
  await api.delete(`/books/${id}`);
};

export const updateBook = async (book: Book) => {
  const response = await api.put(`/books/${book.id}`, book);
  return response.data;
};
