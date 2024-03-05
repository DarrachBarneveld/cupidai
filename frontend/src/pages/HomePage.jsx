import { NavLink } from "react-router-dom";
import HeroImage from "../../public/images/background.png";

const HomePage = () => {
  return (
    <main className="py-lg-5 bg-pink-gradient">
      <div className="container col-xxl-8 px-4 py-1 glassmorphism rounded-3 position-relative overflow-hidden">
        <div className="heart x1"></div>
        <div className="heart x2"></div>
        <div className="heart x3"></div>
        <div className="heart x4"></div>
        <div className="heart x5"></div>
        <div className="altheart x6"></div>
        <div className="row flex-lg-row-reverse justify-content-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={HeroImage}
              className="d-block mx-auto img-fluid rounded-3"
              alt="romantic hero image"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6 mt-4 d-flex flex-column justify-content-around">
            <h1 className="display-5 fw-bolder lh-1 mb-3 border-bottom text-white">
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
      <section className="my-5 p-1">
        <h2 className=" text-white text-center my-3 display-3">
          How to Use Sparkle Ai
        </h2>
        {/* <div id="howToWrapper">
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
        </div> */}

        <ol>
          <li>
            <div class="icon">
              <i className="fa-solid fa-champagne-glasses"></i>
            </div>
            <div class="title">Drinks</div>
            <div class="descr">Select some drinks</div>
          </li>
          <li>
            <div class="icon">
              <i className="fa-solid fa-utensils"></i>
            </div>
            <div class="title">Foods</div>
            <div class="descr">Select some Food</div>
          </li>
          <li>
            <div class="icon">
              <i class="fa-solid fa-person-snowboarding"></i>{" "}
            </div>
            <div class="title">Activities</div>
            <div class="descr">Select a few activites</div>
          </li>
          <li>
            <div class="icon">
              <i className="fa-solid fa-square-root-variable"></i>
            </div>
            <div class="title">Sparkle Ai</div>
            <div class="descr">
              Sparkle Ai generates fun date ideas based on your choices.
            </div>
          </li>
          <li>
            <div class="icon">
              <i className="fa-solid fa-rocket"></i>
            </div>
            <div class="title">Options</div>
            <div class="descr">
              Explore date options tailored to your tastes.
            </div>
          </li>
          <li>
            <div class="icon">
              <i className="fa-solid fa-heart"></i>
            </div>
            <div class="title">Date</div>
            <div class="descr">
              Enable location to find local spots to carry out your date
            </div>
          </li>
        </ol>
      </section>
    </main>
  );
};

export default HomePage;
