import { NavLink } from "react-router-dom";
import HeroImage from "../../public/images/background.png";

const HomePage = () => {
  return (
    <main className="py-5 bg-pink-gradient px-1">
      <div className="container col-xxl-8 px-4 py-1 glassmorphism rounded-3 position-relative overflow-hidden">
        <div className="p-2 position-absolute bg-danger bottom-0"></div>
        <div className="heart x1"></div>
        <div className="heart x2"></div>
        <div className="heart x3"></div>
        <div className="heart x4"></div>
        <div className="heart x5"></div>
        <div className="altheart x6"></div>
        <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={HeroImage}
              className="d-block mx-auto img-fluid rounded-3"
              alt="romantic hero image"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bolder lh-1 mb-3">
              Start planning your next romantic adventure now!
            </h1>
            <p className="lead text-white">
              We bring romance and creativity to your love life, from first
              dates to special anniversaries and Valentine's surprises. At Date
              Sparkle, we inspire magical moments for every relationship.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <NavLink id="letsPlanBtn" to="/choices">
                Lets Plan! <i className="ms-2 fa-solid fa-heart"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-white my-5" />
      <section className="my-5">
        <h2 className=" text-white  mx-auto display-3 bg-dark-gradient rounded-3 w-fit px-3 mb-5">
          How to Use Sparkle Ai
        </h2>
        <div id="howToWrapper">
          <ol>
            <li>
              <div className="icon">
                <i className="fa-solid fa-champagne-glasses"></i>
              </div>
              <div className="title">Drinks</div>
              <div className="descr">Choose your preffered drinks</div>
            </li>
            <li>
              <div className="icon">
                <i className="fa-solid fa-utensils"></i>
              </div>
              <div className="title">Food</div>
              <div className="descr">Choose your preffered foods</div>
            </li>
            <li>
              <div className="icon">
                <i className="fa-solid fa-helicopter"></i>
              </div>
              <div className="title">Activities</div>
              <div className="descr">
                Choose activities you usually like to do
              </div>
            </li>
            <li>
              <div className="icon">
                <i className="fa-solid fa-square-root-variable"></i>
              </div>
              <div className="title">SparkleAi</div>
              <div className="descr">
                Cupid generates fun date ideas based on your preferences.
              </div>
            </li>
            <li>
              <div className="icon">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <div className="title">Options</div>
              <div className="descr">
                Explore related options tailored to your tastes.
              </div>
            </li>
            <li>
              <div className="icon">
                <i className="fa-solid fa-heart"></i>
              </div>
              <div className="title">Date!</div>
              <div className="descr">
                Turn on location services to find local spots to carry out
                prompted dates
              </div>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
