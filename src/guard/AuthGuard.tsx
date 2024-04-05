import { createElement } from "react";
import { Navigate } from "react-router-dom";

const AuthRoute: React.FunctionComponent<{ children: React.FunctionComponent}> = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user');

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login on unauthorized access
  }

  return createElement(children);
}

export default AuthRoute;
