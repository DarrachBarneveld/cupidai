import { Route, Routes } from "react-router-dom";
import ChoicesPage from "../pages/ChoicesPage";
import RecommendationsPage from "../pages/RecommendationsPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<ChoicesPage />} />
      <Route path="recommendations" element={<RecommendationsPage />} />
    </Routes>
  );
};

export default Routing;
