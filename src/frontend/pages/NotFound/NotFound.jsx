import { Link } from "react-router-dom";
export function NotFound() {
  return (
    <div className="not-found-page">
      <h2 className="margin-sm">Oops!</h2>
      <h1 className="margin-sm">Looks like you lost your way.</h1>
      <Link to="/">
        <button className="btn btn-sm">Go Back Home</button>
      </Link>
    </div>
  );
}
