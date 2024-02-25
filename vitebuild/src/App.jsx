import Navbar from "./components/Navbar";
import "./App.css";
import Routing from "./routes/Routing";
import { BrowserRouter } from "react-router-dom";
import ChoiceContextProvider from "./context/ChoiceContext";

function App() {
  return (
    <ChoiceContextProvider>
      <BrowserRouter>
        <div className="wrapper">
          <header>
            <Navbar />
          </header>

          <main className="container mb-5">
            <Routing />
          </main>

          <footer
            id="sticky-footer"
            class="flex-shrink-0 py-4 bg-dark text-white-50"
          >
            <div class="container text-center">
              <small>Copywrite &copy; SparkleAi</small>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </ChoiceContextProvider>
  );
}

export default App;
