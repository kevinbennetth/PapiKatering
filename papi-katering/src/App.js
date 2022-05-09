import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import AddPacketPage from "./pages/AddPacketPage";
import QuizPage from "./pages/QuizPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router className="bg-gray-50">
      <Header />
      <Switch>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        {/* ganti jadi /detail/:id */}
        <Route path="/detail">
          <DetailPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/packet">
          <AddPacketPage />
        </Route>
        <Route path="/quiz">
          <QuizPage />
        </Route>
        <Route path="/checkout">
          <CheckoutPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
