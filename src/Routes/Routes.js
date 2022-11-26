import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Blogs from "../Pages/Blogs/Blogs";
import BrandProducts from "../Pages/BrandProducts/BrandProducts";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import Login from "../Shared/Login/Login";
import Register from "../Shared/Register/Register";
import PrivateRoute from "./PrivateRoute";

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
        loader: async ({ params }) =>
          fetch(`http://localhost:2000/allProducts/${params.id}`),
        element: (
          <PrivateRoute>
            <BrandProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <MyOrders />,
          },
          {
            path: "/dashboard/all-sellers",
            element: <AllSellers />,
            
          },
          {
            path: "/dashboard/all-buyers",
            element: <AllBuyers />,
          },
        ],
      },
    ],
  },
]);

export default routes;
