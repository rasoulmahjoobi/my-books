type LoadingProps = {
  message?: string;
};

const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />

      <p className="text-lg font-medium text-gray-600">{message}</p>
    </div>
  );
};

export default Loading;
