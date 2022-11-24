import Main from "../Layout/Main";
import Blogs from "../Pages/Blogs/Blogs";
import BrandProducts from "../Pages/BrandProducts/BrandProducts";
import Login from "../Shared/Login/Login";
import Register from "../Shared/Register/Register";

const { createBrowserRouter } = require("react-router-dom");
const { default: Home } = require("../Pages/Home/Home/Home");

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/brand/:id",
        loader : async({params}) => fetch(`http://localhost:2000/allProducts/${params.id}`),
        element: <BrandProducts />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
    ],
  },
]);

export default routes;
