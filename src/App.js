import "bootstrap/dist/css/bootstrap.min.css";
import { useGetMe } from "customHooks/useGetMe";
import "font-awesome/css/font-awesome.min.css";
import "react-day-picker/style.css";
import "react-modern-drawer/dist/index.css";
import "react-phone-number-input/style.css";
import "react-quill/dist/quill.snow.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./assets/Styles/style.css";
import "./assets/Styles/table.css";
import { Loader } from "./components/Core/Loader";
import ScrollToTop from "./helper/ScrollToTop";

import ProtectedRouter from "helper/ProtectedRoute";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { routes } from "./routes";

function App() {
  const { user } = useSelector((state) => state.authReducer);
  const userLoading = useGetMe();

  if (userLoading) {
    return <Loader className="vh-100" />;
  }

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Loader className={"vh-100"} />}>
          <Routes>
            {routes?.map((route, index) => {
              return (
                <>
                  {Array?.isArray(route?.subMenu) ? (
                    route.subMenu.map((subRoute, subIndex) => {
                      return (
                        <Route
                          key={subIndex}
                          path={subRoute.path}
                          exact={subRoute.exact}
                          element={
                            <ProtectedRouter
                              element={subRoute.element}
                              isProtected={route.protected}
                            />
                          }
                        />
                      );
                    })
                  ) : (
                    <Route
                      key={index}
                      path={route?.path}
                      exact={route?.exact}
                      element={
                        <ProtectedRouter
                          element={route.element}
                          isProtected={route.protected}
                        />
                      }
                    />
                  )}
                </>
              );
            })}
            <Route path="*" element={<p>not found</p>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
