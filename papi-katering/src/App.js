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
import MerchantPage from "./pages/MerchantPage";
import SearchPage from "./pages/AddPacket/SearchPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/addpacket" element={<AddPacketPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/merchant/:id" element={<MerchantPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
