import { quotes } from "../../assets/data/quotes.json";

const LoadingSpinner = () => {
  return (
    <div id="loadingModal" className="glassmorphism p-3 text-center">
      <div className="mx-auto" id="pulsingheart"></div>
      <h3 className="fw-bolder">SparkleAi is generating...</h3>
      <p>Please be patient for your custom generated dates</p>
      <em className="text-decoration-underline">
        Your partner will be appreciative
      </em>
      <div></div>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide mt-3"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner fw-bolder h6">
          {quotes.map((quote, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              {quote}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
