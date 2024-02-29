import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <main className="py-5 bg-pink-gradient px-1 d-flex justify-content-center align-items-center">
      <div className="text-center glassmorphism p-4 rounded-3">
        <i
          className="fa-solid fa-heart-broken error-icon"
          style={{ fontSize: "3rem" }}
        ></i>
        <h1 className="display-1 fw-bold">404</h1>

        <p className="fs-3">
          <span className="text-danger">Opps!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <NavLink to="/" className="btn btn-danger">
          Go Home
        </NavLink>
      </div>
    </main>
  );
};

export default Error404;
