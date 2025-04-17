import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="container_custom">
      <div className="content_custom">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<Navigate to="/" replace />} />{' '} */}
            {/* Route 404, chuyển hướng về trang chủ */}
          </Routes>
          {/* <ScrollToTop />*/}
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
