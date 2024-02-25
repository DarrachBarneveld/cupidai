import placeholderPhoto from "../../public/images/noimageplaceholder.png";

const PlacesCard = ({
  displayName,
  category,
  regularOpeningHours,
  photos,
  rating,
  userRatingCount,
  googleMapsUri,
  websiteUri,
}) => {
  const isOpen = regularOpeningHours?.openNow;

  let photoUrl;
  if (!photos) {
    photoUrl = placeholderPhoto;
  } else {
    const photo = photos[0];
    // photoUrl = `https://places.googleapis.com/v1/${photo?.name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAQD37gEBZUU9QFrndU9QxukjhQ3t8qRWU`;
    photoUrl = placeholderPhoto;
  }
  return (
    <div className="col-md-3 p-2">
      <div className="card-sl fade-in-bounce position-relative">
        <span class="position-absolute top-0 right-0 translate-middle badge rounded-pill bg-danger text-capitalize">
          {category}
        </span>

        <div className="card-image">
          <img src={photoUrl} />
        </div>
        <div className="card-heading text-truncate">{displayName?.text}</div>
        <div className="container p-0 text-small my-2">
          <div className="row m-0">
            <div className="col-sm-4 text-center">
              <i className="fa-solid fa-star text-warning h5"></i>
              <p className="card-text fw-bold m-0 text-dark">{rating}</p>
            </div>
            <div className="col-sm-4 text-center">
              <i className="fa-solid fa-user text-info h5"></i>
              <p className="card-text fw-bold m-0 text-dark">
                {userRatingCount}
              </p>
            </div>
            <div className="col-sm-4 text-center">
              <i
                className={`fa-solid fa-door-open h5 ${
                  isOpen ? "text-success" : "text-danger"
                }`}
              ></i>
              <p
                className={`card-text fw-bold ${
                  isOpen ? "text-success" : "text-danger"
                }`}
              >
                {" "}
                {isOpen ? "Open" : "Closed"}
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-around p-2">
          <a href={googleMapsUri} target="_blank" className="btn btn-primary">
            <i className="fa-solid fa-location-dot"></i>
          </a>

          <a href={websiteUri} target="_blank" className="btn btn-success">
            <i className="fa-solid fa-globe"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlacesCard;
