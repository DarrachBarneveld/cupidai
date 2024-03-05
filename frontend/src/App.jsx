import Navbar from "./components/Navbar";
import "./App.css";
import Routing from "./routes/Routing";
import { BrowserRouter } from "react-router-dom";
import ChoiceContextProvider from "./context/ChoiceContext";
import PlacesContextProvider from "./context/PlacesContext";
import Footer from "./components/Footer";

function App() {
  return (
    <PlacesContextProvider>
      <ChoiceContextProvider>
        <BrowserRouter>
          <header>
            <Navbar />
          </header>

          <Routing />
          <Footer />
        </BrowserRouter>
      </ChoiceContextProvider>
    </PlacesContextProvider>
  );
}

export default App;
