import { Route, Routes } from "react-router-dom";
import ChoicesPage from "../pages/ChoicesPage";
import RecommendationsPage from "../pages/RecommendationsPage";
import PlacesPage from "../pages/PlacesPage";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="choices" element={<ChoicesPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="recommendations" element={<RecommendationsPage />} />
      <Route
        path="recommendations/:drink/:food/:activity"
        element={<RecommendationsPage />}
      />
      <Route path="places" element={<PlacesPage />} />
    </Routes>
  );
};

export default Routing;
