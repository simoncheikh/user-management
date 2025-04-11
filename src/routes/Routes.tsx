import React, { Suspense, useMemo } from "react";

import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router";

import { routeNames } from "../constants/routeNames";


const LoginPage = React.lazy(() =>
  import("../pages/Login").then((module) => ({
    default: module.Login,
  }))
);
const Dashboard = React.lazy(() =>
  import("../pages/userManagement").then((module) => ({
    default: module.UserManagement,
  }))
);

export const Routes = () => {
  const router = useMemo(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route errorElement={<></>}>
          <Route
            path={routeNames.login}
            element={<LoginPage />}
          />
          <Route
            path={routeNames.dashboard}
            element={<Dashboard />}
          />
        </Route>
      )
    );
  }, []);

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  )
}