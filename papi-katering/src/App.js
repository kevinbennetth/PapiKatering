import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";

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
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
