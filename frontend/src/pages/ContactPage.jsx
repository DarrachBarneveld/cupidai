import HeadingText from "../components/ui/HeadingText";
import "./contact.css";

const ContactPage = () => {
  return (
    <main className="py-5 bg-pink-gradient px-1">
      <section id="contact">
        <HeadingText
          text="Let the team know what we can do!"
          className="bg-transparent"
        />
        <div className="container contact-form rounded-3 glassmorphism">
          <div className="contact-image">
            <i className="fa-solid fa-heart"></i>
          </div>
          <form method="post">
            <h3>Drop Us a Message</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="txtName"
                    className="form-control"
                    placeholder="Your Name *"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="txtEmail"
                    className="form-control"
                    placeholder="Your Email *"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    name="btnSubmit"
                    className="btnContact"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <textarea
                    name="txtMsg"
                    className="form-control"
                    placeholder="Your Message *"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
