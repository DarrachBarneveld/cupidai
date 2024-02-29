import HeadingText from "../components/ui/HeadingText";
import "./contact.css";

const ContactPage = () => {
  return (
    <main className="py-5 bg-pink-gradient px-1">
      <div class="heart x1"></div>
      <div class="heart x2"></div>
      <div class="heart x3"></div>
      <div class="heart x4"></div>
      <div class="heart x5"></div>
      <div class="altheart x6"></div>

      <section id="contact">
        <HeadingText
          text="Let the team know what we can do!"
          className="bg-transparent"
        />
        <div class="container contact-form rounded-3 glassmorphism">
          <div class="contact-image">
            <i class="fa-solid fa-heart"></i>
          </div>
          <form method="post">
            <h3>Drop Us a Message</h3>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <input
                    type="text"
                    name="txtName"
                    class="form-control"
                    placeholder="Your Name *"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    name="txtEmail"
                    class="form-control"
                    placeholder="Your Email *"
                  />
                </div>

                <div class="form-group">
                  <input type="submit" name="btnSubmit" class="btnContact" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <textarea
                    name="txtMsg"
                    class="form-control"
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
