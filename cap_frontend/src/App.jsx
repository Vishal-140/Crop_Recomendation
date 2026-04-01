import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Predict from './pages/Predict';
import About from './pages/About';
import './index.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/predict" element={<Predict />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
