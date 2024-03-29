import "./about.css";
import darrachImage from "../../public/images/darrach.webp";
import cameliaImage from "../../public/images/camelia.webp";
import dimitriImage from "../../public/images/dimitri.webp";
import erikImage from "../../public/images/erik.webp";
import patriciaImage from "../../public/images/patricia.webp";
import kiki from "../../public/images/kiki.jpg";
import Developer from "../components/Developer";
import MainWrapper from "../layout/MainWrapper";

const developers = [
  {
    name: "Darrach",
    description: "The scrum master",
    src: darrachImage,
    link: "https://github.com/DarrachBarneveld",
  },
  {
    name: "Camelia",
    description: "The backend girl-power",
    src: cameliaImage,
    link: "https://github.com/Camelia03",
  },
  {
    name: "Erik",
    description: "The automation veteran",
    src: erikImage,
    link: "https://github.com/Erikas-Ramanauskas",
  },
  {
    name: "Patricia",
    description: "The styling girl-power",
    src: patriciaImage,
    link: "https://github.com/pswhdev",
  },
  {
    name: "Dimitri",
    description: "The backend ai wizard",
    src: dimitriImage,
    link: "https://github.com/dimitri-edel",
  },
  {
    name: "kiki",
    description: "The structure wizard",
    src: kiki,
    link: "https://github.com/KikiBerg",
  },
];

const AboutPage = () => {
  return (
    <MainWrapper>
      <div className="container">
        <section id="about" className="container p-4">
          <h2>
            Welcome to Sparkle Ai, where we ignite the flames of romance and
            infuse creativity into your love life!
          </h2>
        </section>

        <section id="about-sparkle-container">
          <h2 className="fw-bolder">What is Sparkle Ai?</h2>

          <div id="background">
            <div id="about-sparkle">
              <div>
                <h3>ABOUT Sparkle Ai</h3>
                <hr />
                <p>
                  Whether you're embarking on the thrilling journey of a first
                  date, commemorating a milestone anniversary, or crafting the
                  perfect surprise for Valentine's Day, Sparkle Ai is here to
                  elevate your experience to extraordinary heights.
                  <br />
                  In a world filled with routine and monotony, we recognize the
                  importance of nurturing the spark that keeps relationships
                  vibrant and alive. At Sparkle Ai, we're not just about
                  planning dates; we're about curating unforgettable experiences
                  that deepen connections and create cherished memories.
                  <br />
                  Our mission is simple: to inspire you to infuse magic into
                  every moment spent with your partner. Whether it's an intimate
                  candlelit dinner under the stars, a whimsical picnic in a
                  sun-kissed meadow, or an exhilarating adventure that gets your
                  hearts racing, we're dedicated to helping you create moments
                  that will last a lifetime.
                </p>
              </div>

              <div>
                <h3>WHY Sparkle Ai?</h3>
                <hr />
                <p>
                  Because we understand that every relationship is unique, we
                  offer personalized experiences tailored to your preferences
                  and desires.
                  <br />
                  Whether you're a hopeless romantic or an adventurous soul,
                  we'll tailor our services to reflect your individuality,
                  ensuring that your date is a true reflection of your love
                  story.
                  <br />
                  So, whether you're planning a grand gesture or a simple,
                  heartfelt surprise, let Sparkle Ai be your guide. Together,
                  let's embark on a journey of love, laughter, and unforgettable
                  moments. Welcome to Sparkle Ai; where love shines bright and
                  every date is a celebration of romance and creativity.
                </p>
              </div>
            </div>

            <div id="team-sparkle">
              <div>
                <h3>MEET THE TEAM</h3>
                <hr />
                <p>
                  Here's the group behind Sparkle Ai!
                  <br />
                  <br />
                  <i className="fa-regular fa-heart text-danger"></i> We're the
                  great people who have created this site. Here you can find
                  some information about us, and links to our Github and
                  LinkedIn.
                  <br />
                  Sparkle Ai isn't just a web app; it's the brainchild of a
                  passionate and dedicated development group committed to
                  enhancing the romantic experiences of couples worldwide.{" "}
                  <br />
                  <br />
                  <i className="fa-regular fa-heart text-danger"></i>
                  Behind the scenes, there's a team of individuals driven by a
                  shared vision: to inspire and facilitate meaningful
                  connections through curated, unforgettable experiences. <br />
                  <br />
                  <i className="fa-regular fa-heart text-danger"></i>{" "}
                  Collaborative by nature, the developers at Sparkle Ai thrive
                  in an environment where ideas flow freely, and innovation
                  knows no bounds. They leverage their collective expertise to
                  overcome challenges and push the boundaries of what's
                  possible, constantly striving to exceed expectations and
                  delight users at every turn. <br />
                  <br />
                  <i className="fa-regular fa-heart text-danger"></i> In
                  essence, the development team behind Sparkle Ai is more than
                  just a group of professionals; they are architects of romance,
                  sculptors of dreams, and champions of love. Through their
                  creativity and dedication, they ensure that Sparkle Ai remains
                  not just a platform, but a trusted companion on the journey of
                  love, guiding couples toward moments of pure magic and
                  enduring connection.
                </p>
              </div>
            </div>

            <div id="sparkle-image">
              <div id="circle-cover-bg-end"></div>
            </div>
          </div>
        </section>

        <section id="sparkle-spoiler" className="mt-5">
          {developers.map((developer) => (
            <Developer {...developer} />
          ))}
        </section>
      </div>
    </MainWrapper>
  );
};

export default AboutPage;
