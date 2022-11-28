import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Blogs from "../Pages/Blogs/Blogs";
import BrandProducts from "../Pages/BrandProducts/BrandProducts";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Shared/Login/Login";
import Register from "../Shared/Register/Register";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

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
            element: <AdminRoute><AllSellers /></AdminRoute>,
            
          },
          {
            path: "/dashboard/all-buyers",
            element: <AdminRoute><AllBuyers /></AdminRoute>,
          },
          {
            path: "/dashboard/add-product",
            element: <><AddProduct /></>,
          },
          {
            path: "/dashboard/my-products",
            element: <><MyProducts /></>,
          },
        ],
      },
      {
        path : '*',
        element : <ErrorPage />
      }
    ],
  },
]);

export default routes;
