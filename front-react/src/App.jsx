import AppRoutes from "./routes/Routes";
import { useContext } from "react";
import { UserContext, UserProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useLocation } from 'react-router-dom';

function App() {
  const { token } = useContext(UserContext);
  const location = useLocation();

  // Rutas donde se oculta el Header
  const hideHeaderRoutes = ["/principal", "/profile", "/cart", "/login", "/register", "/edit-profile", "/search"];
  const isPrincipalRoute = location.pathname === "/principal";
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <UserProvider>
      <div className="d-flex flex-column min-vh-100 all-body">
        {/* Navbar solo se oculta en "/principal" */}
        {!isPrincipalRoute && <Navbar />}
        <main className="flex-grow-1">
          {/* Header se oculta en "/principal", "/profile" y "/cart" */}
          {!hideHeader && <Header />}
          <AppRoutes />
        </main>
        {/* Footer solo se oculta en "/principal" */}
        {!isPrincipalRoute && <Footer />}
      </div>
    </UserProvider>
  );
}

export default App;
