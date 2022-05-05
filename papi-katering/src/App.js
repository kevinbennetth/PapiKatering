import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <div className="bg-gray-50">
            <Header />
            <ProfilePage />
            <Footer />
        </div>
    );
}

export default App;
