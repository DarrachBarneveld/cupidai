const PlacesCard = ({
  displayName,
  formattedAddress,
  regularOpeningHours,
  photos,
  rating,
  userRatingCount,
  googleMapsUri,
  websiteUri,
}) => {
  const isOpen = regularOpeningHours?.openNow;

  const photo = photos[0];
  console.log(photo);
  return (
    <div className="col-md-3">
      <div class="card-sl fade-in-bounce">
        <div class="card-image">
          <img
            src={`https://places.googleapis.com/v1/${photo?.name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAQD37gEBZUU9QFrndU9QxukjhQ3t8qRWU`}
          />
        </div>

        <div class="card-heading">{displayName?.text}</div>

        <div class="container p-0 text-small my-2">
          <div class="row m-0">
            <div class="col-sm-4 text-center">
              <i class="fa-solid fa-star text-warning h5"></i>
              <p class="card-text fw-bold m-0 text-dark">{rating}</p>
            </div>
            <div class="col-sm-4 text-center">
              <i class="fa-solid fa-user text-info h5"></i>
              <p class="card-text fw-bold m-0 text-dark">{userRatingCount}</p>
            </div>
            <div class="col-sm-4 text-center">
              <i
                class={`fa-solid fa-door-open h5 ${
                  isOpen ? "text-success" : "text-danger"
                }`}
              ></i>
              <p
                class={`card-text fw-bold ${
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
            <i class="fa-solid fa-location-dot"></i>
          </a>

          <a href={websiteUri} target="_blank" className="btn btn-primary">
            <i class="fa-solid fa-globe"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlacesCard;
