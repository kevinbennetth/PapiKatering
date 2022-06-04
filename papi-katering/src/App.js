import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DetailPage from "./pages/DetailPage";
import AddPacketPage from "./pages/AddPacketPage";
import { APIContextProvider } from "./context/api-context";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import QuizPage from "./pages/QuizPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <APIContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/quiz">
            <QuizPage />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/detail/:id">
            <DetailPage />
          </Route>
          <Route path="/addpacket">
            <AddPacketPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </APIContextProvider>
  );
}

export default App;
