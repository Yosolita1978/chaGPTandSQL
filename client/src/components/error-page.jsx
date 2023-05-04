import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops Techtonica apologizes for the error!</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}