import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AllFood from "../pages/AllFood";
import Gallery from "../pages/Gallery";
import MyFoodPage from "../pages/MyFoodPage";
import AddFood from "../pages/AddFood";
import FoodPurchase from "../pages/FoodPurchase";
import AuthForm from "../pages/AuthForm";
import SingleFood from "../pages/SingleFood";
import PrivateRoute from "./PrivateRoute";
import UpdateFoods from "../components/UpdateFoods";
import MyOrder from "../components/MyOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-foods",
        Component: AllFood,
      },
      {
        path: "/gallery",
        Component: Gallery,
      },
      {
        path: "/my-foods",
        element: (
          <PrivateRoute>
            <MyFoodPage></MyFoodPage>
          </PrivateRoute>
        ),
      },
      {
        path: "add-foods",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/food-purchase/:id",
        element: (
          <PrivateRoute>
            <FoodPurchase>
            </FoodPurchase>
          </PrivateRoute>
        ),
      },
      
      {
        path: "/my-order",
        Component: MyOrder,
      },

      {
        path: "/auth-form",
        Component: AuthForm,
      },
      {
        path: "/auth-form",
        Component: AuthForm,
      },

      {
        path: "/single-food/:foodId",
        Component: SingleFood,
      },

      {
        path: "/add-foods/:id",
        Component: UpdateFoods,
      },
    ],
  },
]);
