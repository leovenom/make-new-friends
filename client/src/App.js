import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import OnBoarding from "./pages/OnBoarding";

import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const authToken = cookies.AuthToken;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/dashboard" element={<DashBoard />} />}
        {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
