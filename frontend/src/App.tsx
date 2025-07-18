import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/auth/Navigation";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default App;
