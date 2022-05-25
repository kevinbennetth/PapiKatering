import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/detail/:id">
        <DetailPage />
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
