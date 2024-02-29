const AboutPage = () => {
  return (
    <main className="py-5 bg-pink-gradient px-1">
      <div class="container col-xxl-8 px-4 py-1 glassmorphism rounded-3">
        <div class="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src={HeroImage}
              class="d-block mx-auto img-fluid rounded-3"
              alt="romantic hero image"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bolder lh-1 mb-3">
              Start planning your next romantic adventure now!
            </h1>
            <p class="lead text-white">
              We bring romance and creativity to your love life, from first
              dates to special anniversaries and Valentine's surprises. At Date
              Sparkle, we inspire magical moments for every relationship.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <NavLink id="letsPlanBtn" to="/choices">
                Lets Plan! <i class="ms-2 fa-solid fa-heart"></i>
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
              <div class="icon">
                <i class="fa-solid fa-champagne-glasses"></i>
              </div>
              <div class="title">Drinks</div>
              <div class="descr">Choose your preffered drinks</div>
            </li>
            <li>
              <div class="icon">
                <i class="fa-solid fa-utensils"></i>
              </div>
              <div class="title">Food</div>
              <div class="descr">Choose your preffered foods</div>
            </li>
            <li>
              <div class="icon">
                <i class="fa-solid fa-helicopter"></i>
              </div>
              <div class="title">Activities</div>
              <div class="descr">Choose activities you usually like to do</div>
            </li>
            <li>
              <div class="icon">
                <i class="fa-solid fa-square-root-variable"></i>
              </div>
              <div class="title">SparkleAi</div>
              <div class="descr">
                Cupid generates fun date ideas based on your preferences.
              </div>
            </li>
            <li>
              <div class="icon">
                <i class="fa-solid fa-rocket"></i>
              </div>
              <div class="title">Options</div>
              <div class="descr">
                Explore related options tailored to your tastes.
              </div>
            </li>
            <li>
              <div class="icon">
                <i class="fa-solid fa-heart"></i>
              </div>
              <div class="title">Date!</div>
              <div class="descr">
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

export default AboutPage;
