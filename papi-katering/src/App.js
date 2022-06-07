import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DetailPage from "./pages/DetailPage";
import AddPacketPage from "./pages/AddPacketPage";
import { ContextProvider } from "./context/context";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import QuizPage from "./pages/QuizPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/quiz" element={<QuizPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/detail/:id" element={<DetailPage />} />
          <Route exact path="/addpacket" element={<AddPacketPage />} />
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
