import React, { Suspense, useMemo } from "react";

import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router";

import { routeNames } from "../constants/routeNames";
import { AuthenticationRoute } from "./AuthenticationRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../components/layout/Layout";


const LoginPage = React.lazy(() =>
  import("../pages/Login").then((module) => ({
    default: module.Login,
  }))
);
const Dashboard = React.lazy(() =>
  import("../pages/userManagement/userManagement").then((module) => ({
    default: module.UserManagement,
  }))
);

const NewUser = React.lazy(() =>
  import("../pages/CreateUser").then((module) => ({
    default: module.CreateUser,
  }))

)

export const Routes = () => {
  const router = useMemo(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route errorElement={<></>}>
          <Route
            path={routeNames.login}
            element={
              <AuthenticationRoute>
                <LoginPage />
              </AuthenticationRoute>
            }
          />
          <Route element={<Layout />}>
            <Route
              path={routeNames.dashboard}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<Layout />}>
            <Route element={<NewUser />} path={routeNames.newuser} />
          </Route>
        </Route >
      )
    );
  }, []);

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  )
}