import React, { useState, useLayoutEffect } from "react";
import { Routes, Route, Router } from "react-router-dom";
import { routes } from "@/app/routes";
import history from "@/shared/utils/history";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "@/theme";

const CustomRouter = ({ basename, children, history }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <ThemeProvider theme={appTheme}>
      <Router
        basename={basename}
        children={children}
        location={state.location}
        navigationType={state.action}
        navigator={history}
      />
    </ThemeProvider>
  );
};

function App() {
  return (
    <CustomRouter history={history}>
      <Routes>
        {routes.map((item) => {
          return (
            <Route key={item?.path} path={item?.path} element={item?.element}>
              {item?.children &&
                item?.children.map((child) => (
                  <Route
                    key={child?.path}
                    path={child?.path}
                    element={child?.element}
                  />
                ))}
            </Route>
          );
        })}
      </Routes>
    </CustomRouter>
  );
}

export default App;
