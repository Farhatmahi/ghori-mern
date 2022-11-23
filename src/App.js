import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";

function App() {
  return <div className="max-w-[1440px] font-serif">
    <RouterProvider router={routes}></RouterProvider>
  </div>;
}

export default App;
