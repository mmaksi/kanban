"use client"; // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const clickHandler = () => {
    window.location.reload();
    reset();
  };

  return (
    <div className="error__container">
      <h2>Something went wrong! Please click the button below to try again.</h2>
      <button className="error__button" onClick={clickHandler}>
        Try again
      </button>
    </div>
  );
}
