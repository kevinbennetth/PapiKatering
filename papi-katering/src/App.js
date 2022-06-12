import './App.css';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router className="App">
        <Header />
        <ProfilePage />
        <Footer />
    </Router>
  );
}

export default App;
