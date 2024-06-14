import { Outlet } from "react-router-dom";
import Header from "../Navbar/Header/Header";

const Layout = () => {
  return (
    <div className="p-8 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;