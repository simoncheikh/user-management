import React, { Suspense, useMemo } from "react";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routeNames } from "../constants/routeNames";
import { AuthenticationRoute } from "./AuthenticationRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../components/layout/Layout";

// Lazy-loaded components
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
);

const EditUser = React.lazy(() =>
  import("../pages/EditUser").then((module) => ({
    default: module.EditUser,
  }))
);


const queryClient = new QueryClient();

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
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route element={<NewUser />} path={routeNames.newuser} />
          </Route>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute><EditUser /></ProtectedRoute>} path={routeNames.edituser} />
          </Route>
        </Route>
      )
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
