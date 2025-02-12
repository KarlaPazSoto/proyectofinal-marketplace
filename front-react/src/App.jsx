import AppRoutes from "./routes/Routes";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/colores.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const {user} = useContext(UserContext);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Header />
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
