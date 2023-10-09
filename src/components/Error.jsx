import { useApp } from "../context/AppContext";

function Errors() {
  const { error } = useApp();

  return (
    error &&
    error?.error?.map((err, i) => (
      <div
        key={i}
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {err}</span>
      </div>
    ))
  );
}

export default Errors;
