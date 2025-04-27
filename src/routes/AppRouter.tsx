// React
import { lazy, Suspense } from "react";
// My-Components
import MainLayout from "@layouts/MainLayout";
import RootLayout from "@layouts/RootLayout";
import LoggingUser from "@components/auth/LoggingUser";
import RequireAuth from "@components/auth/RequireAuth";
import ProtectedRoute from "@components/guard/ProtectedRoute";
import PageLoading from "@components/common/Loading/PageLoading";
// Third-Party =====> Router
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Pages
const Home = lazy(() => import("@pages/home"));
const Error = lazy(() => import("@pages/Error"));
const Login = lazy(() => import("@pages/auth/Login"));
const NotFound = lazy(() => import("@pages/NotFound"));
const ChangePassword = lazy(() => import("@pages/auth/ChangePassword"));

// ==================== Calendar ====================
const CanlendarPage = lazy(() => import("@pages/calendar"));

// ==================== Booking Orders ====================
const Orders = lazy(() => import("@pages/orders"));

// ==================== Categories ====================
const Categories = lazy(() => import("@pages/categories/inedex"));

// ==================== Products ====================
const Products = lazy(() => import("@pages/porducts"));
const AddProduct = lazy(() => import("@pages/porducts/AddProduct"));
const EditProduct = lazy(() => import("@pages/porducts/EditProduct"));

// ==================== Statistics ====================
const Statistics = lazy(() => import("@pages/statistics"));

// ==================== Settings ====================
const SettingsPage = lazy(() => import("@pages/settings"));
const AppSettings = lazy(() => import("@pages/settings/sub/AppSettings"));

// ==================== Customers ====================
const Customers = lazy(() => import("@pages/customers"));
const AddCustomer = lazy(() => import("@pages/customers/AddCustomer"));
const ShowCustomer = lazy(() => import("@pages/customers/ShowCustomer"));
const EditCustomer = lazy(() => import("@pages/customers/EditCustomer"));

// ==================== Complaints ====================
const Complaints = lazy(() => import("@pages/complaints"));

// ==================== Admin ====================
const EditAdminProfile = lazy(
  () => import("@pages/admin/profile/EditAdminProfile"),
);
const AdminProfile = lazy(() => import("@pages/admin/profile/AdminProfile"));

// ==================== Supervisors ====================
const AddSupervisor = lazy(
  () => import("@pages/admin/supervisors/AddSupervisor"),
);
const EditSupervisor = lazy(
  () => import("@pages/admin/supervisors/EditSupervisor"),
);
const ShowSupervisor = lazy(
  () => import("@pages/admin/supervisors/ShowSupervisor"),
);
const SupervisorProfile = lazy(
  () => import("@pages/supervisors/SupervisorProfile"),
);
const EditSupervisorProfile = lazy(
  () => import("@pages/supervisors/EditSupervisorProfile"),
);
const Supervisors = lazy(() => import("@pages/admin/supervisors/Supervisors"));

// ==================== Roles ====================
const Roles = lazy(() => import("@pages/admin/roles/Roles"));
const AddRole = lazy(() => import("@pages/admin/roles/AddRole"));
const EditRole = lazy(() => import("@pages/admin/roles/EditRole"));

// Data
import { paths } from "./paths";
// Utils
import validatePageParam from "@utils/router/validatePageParam";

export const router = createBrowserRouter([
  {
    path: paths.home.root,

    // ==================== Root Layout ====================
    element: <RootLayout />,
    errorElement: (
      <Suspense fallback={<PageLoading />}>
        <Error />
      </Suspense>
    ),
    children: [
      // ==================== Dashboard Pages ====================
      {
        element: <RequireAuth />,
        children: [
          {
            // ==================== Main Layout ====================
            element: <MainLayout />,
            children: [
              // ==================== Home ====================
              {
                index: true,
                element: (
                  <Suspense fallback={<PageLoading />}>
                    <Home />
                  </Suspense>
                ),
              },

              // ==================== Profile ====================
              // ===== Admin-profile =====
              {
                path: paths.adminProfile.root,
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute>
                          <AdminProfile />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "edit-profile",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute>
                          <EditAdminProfile />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "change-password",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute>
                          <ChangePassword />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                ],
              },
              // ===== Supervisor-profile =====
              {
                path: paths.supervisorProfile.root,
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute>
                          <SupervisorProfile />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "edit-profile",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute>
                          <EditSupervisorProfile />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "change-password",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute>
                          <ChangePassword />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                ],
              },

              // ==================== Customers ====================
              {
                path: paths.customers.root,
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="view" name="customers">
                          <Customers />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: ":prefix",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="view" name="customers">
                          <ShowCustomer />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                    loader: validatePageParam,
                  },
                  {
                    path: "add-customer",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="create" name="customers">
                          <AddCustomer />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "edit-customer",
                    loader: validatePageParam,
                    children: [
                      {
                        path: ":prefix",
                        element: (
                          <Suspense fallback={<PageLoading />}>
                            <ProtectedRoute action="update" name="customers">
                              <EditCustomer />
                            </ProtectedRoute>
                          </Suspense>
                        ),
                      },
                    ],
                  },
                ],
              },

              // ==================== Orders ====================
              {
                path: paths.orders.root,
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="view" name="orders">
                          <Orders />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                ],
              },

              // ==================== Calendar ====================
              {
                path: paths.calendar.root,
                element: (
                  <Suspense fallback={<PageLoading />}>
                    <ProtectedRoute action="view" name="calendar">
                      <CanlendarPage />
                    </ProtectedRoute>
                  </Suspense>
                ),
              },

              // ==================== Categories ====================
              {
                path: paths.categories.root,
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="view" name="categories">
                          <Categories />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                ],
              },

              // ==================== Products ====================
              {
                path: paths.products.root,
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="view" name="products">
                          <Products />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "add-product",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="create" name="products">
                          <AddProduct />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "edit-product",
                    loader: validatePageParam,
                    children: [
                      {
                        path: ":prefix",
                        element: (
                          <Suspense fallback={<PageLoading />}>
                            <ProtectedRoute action="update" name="products">
                              <EditProduct />
                            </ProtectedRoute>
                          </Suspense>
                        ),
                      },
                    ],
                  },
                ],
              },

              // ==================== Complaints ====================
              {
                path: paths.complaints.root,
                element: (
                  <Suspense fallback={<PageLoading />}>
                    <ProtectedRoute action="view" name="complaints">
                      <Complaints />
                    </ProtectedRoute>
                  </Suspense>
                ),
              },

              // ==================== Statistics ====================
              {
                path: paths.statistics.root,
                element: (
                  <Suspense fallback={<PageLoading />}>
                    <ProtectedRoute action="view" name="statistics">
                      <Statistics />
                    </ProtectedRoute>
                  </Suspense>
                ),
              },

              // ==================== Supervisors ====================
              {
                path: paths.supervisors.root,
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="view" name="supervisors">
                          <Supervisors />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "add-supervisor",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="create" name="supervisors">
                          <AddSupervisor />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: ":prefix",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="view" name="supervisors">
                          <ShowSupervisor />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                    loader: validatePageParam,
                  },
                  {
                    path: "edit-supervisor",
                    children: [
                      {
                        path: ":prefix",
                        element: (
                          <Suspense fallback={<PageLoading />}>
                            <ProtectedRoute action="update" name="supervisors">
                              <EditSupervisor />
                            </ProtectedRoute>
                          </Suspense>
                        ),
                      },
                    ],
                  },
                ],
              },

              // ==================== Settings ====================
              {
                path: paths.settings.root,
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="view" names={["settings"]}>
                          <SettingsPage />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "app-settings",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute action="view" name="settings">
                          <AppSettings />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                ],
              },

              // ==================== Roles ====================
              {
                path: paths.roles.root,
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute>
                          <Roles />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "add-role",
                    element: (
                      <Suspense fallback={<PageLoading />}>
                        <ProtectedRoute>
                          <AddRole />
                        </ProtectedRoute>
                      </Suspense>
                    ),
                  },
                  {
                    path: "edit-role",
                    children: [
                      {
                        path: ":prefix",
                        element: (
                          <Suspense fallback={<PageLoading />}>
                            <ProtectedRoute>
                              <EditRole />
                            </ProtectedRoute>
                          </Suspense>
                        ),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // ==================== Login Page ====================
      {
        path: paths.auth,
        element: <LoggingUser />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoading />}>
                <Login />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: paths.notFound,
    element: (
      <Suspense fallback={<PageLoading />}>
        <NotFound />
      </Suspense>
    ),
  },
  {
    path: paths.error,
    element: (
      <Suspense fallback={<PageLoading />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/*",
    element: (
      <Suspense fallback={<PageLoading />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
