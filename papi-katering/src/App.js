import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DetailPage from "./pages/DetailPage";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Switch>
                        <Route exact path="/login">
                            <LoginPage />
                        </Route>
                        <Route exact path="/register">
                            <RegisterPage />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
