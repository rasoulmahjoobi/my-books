type ErrorProps = {
  message: string;
};

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl">❌</span>

        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Error;
