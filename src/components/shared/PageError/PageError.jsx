export default function PageError({ error }) {
  return (
    <div className="h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="text-3xl">{error}</h1>
      </div>
    </div>
  );
}

PageError.defaultProps = {
  error: "Something went wrong! The page could not be loaded",
};
