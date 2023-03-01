import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Favourites from "./pages/Favourites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "favourites",
    element: <Favourites />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
