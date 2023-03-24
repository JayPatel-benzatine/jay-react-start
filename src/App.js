import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Helmet from "react-helmet";
import MetaContent from "./Meta/MetaContent";
import AuthProvider from "./Contexts/AuthProvider";
import AnimatedLoader from "./Utils/AnimatedLoader/AnimatedLoader";
import SignUpPage from "./Pages/Authentication/SignUpPage/SignUpPage";
import Home from "./Pages/Home/Home";
import Layout from "./components/Layout/Layout";


const App = () => {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const appLoader = setTimeout(() => setShowApp(true), 2000);
    return () => clearTimeout(appLoader);
  }, []);

  function PrivateRoute({ children }) {
    const user = JSON.parse(localStorage.getItem("token"));

    return user ? (
      children
    ) : (
      <>
        <Navigate
          to={`/`} //used this because to add an extra history to the browser stack so that when a user hits back button it reverts back to home page
        />
        <Navigate
          to={`/authentication/sign-in?callbackURL=${window.location.pathname}`}
        />
      </>
    );
  }
  return (
    <div>
      <MetaContent page={"home"} />

      <AuthProvider>
        
          <Helmet />

          <div
            style={{
              height: "100vh",
            }}
          >
            {showApp ? (
              <div>
                <BrowserRouter>
               
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Layout >
                          <Home  />
                        </Layout>
                      }
                    />

                      <Route
                        path="sign-up"
                        element={
                          <PrivateRoute>
                            <SignUpPage  />
                          </PrivateRoute>
                        }
                      />
        
          
                </Routes>
                </BrowserRouter>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <AnimatedLoader />
              </div>
            )}
          </div>

      </AuthProvider>
    </div>
  )
}

export default App