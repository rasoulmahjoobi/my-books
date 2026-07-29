import { BookOpenText } from "lucide-react";
import BookList from "./components/BookList";
import { useReducer, useState } from "react";
import { initialState } from "./reducer/initialState";
import { BookReducer } from "./reducer/BookReducer";
import HandleForm from "./components/ZodformHandling";
import type { Book, } from "./types/book";

function App() {
  const [state, dispatch] = useReducer(BookReducer, initialState);
  const [selectedBook, setSelectedBook] = useState<Book|null>(null);

  const editHandler=( book : Book)=>{
    setSelectedBook(book);
  }

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center bg-gray-200 p-8">
      <span className="flex flex-row gap-5 items-center">
        <BookOpenText className="w-16 h-16 text-blue-600" />
        <h1 className="text-3xl font-bold">My Books</h1>
      </span>

      <HandleForm
        dispatch={dispatch}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
      />
      <BookList dispatch={dispatch} state={state} onEdit={editHandler} />
    </div>
  );
}

export default App;
