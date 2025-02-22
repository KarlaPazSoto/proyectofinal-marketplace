import AppRoutes from "./routes/Routes";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useLocation } from 'react-router-dom';

function App() {
  const {user} = useContext(UserContext);
  const location = useLocation();
  
 // Definir rutas donde NO se debe mostrar el Header
 const hiddenHeaderRoutes = ["/principal", "/profile", "/cart", "/register", "/login"];

  return (
    <>
      <div className="d-flex flex-column min-vh-100 all-body">
        <Navbar />
        <main className="flex-grow-1">
          {/* Si la ruta no está en hiddenHeaderRoutes, mostrar el Header */}
          {!hiddenHeaderRoutes.includes(location.pathname) && <Header />} 
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
