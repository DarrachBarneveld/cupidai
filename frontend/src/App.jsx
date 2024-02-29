import Navbar from "./components/Navbar";
import "./App.css";
import Routing from "./routes/Routing";
import { BrowserRouter } from "react-router-dom";
import ChoiceContextProvider from "./context/ChoiceContext";
import PlacesContextProvider from "./context/PlacesContext";

function App() {
  return (
    <PlacesContextProvider>
      <ChoiceContextProvider>
        <BrowserRouter>
          <header>
            <Navbar />
          </header>

          <Routing />

          <footer
            id="sticky-footer"
            className="flex-shrink-0 py-4 bg-dark text-white-50"
          >
            <div className="container text-center">
              <small>Copywrite &copy; SparkleAi</small>
            </div>
          </footer>
        </BrowserRouter>
      </ChoiceContextProvider>
    </PlacesContextProvider>
  );
}

export default App;
