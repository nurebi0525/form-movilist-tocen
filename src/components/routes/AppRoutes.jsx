import { Navigate, Route, Routes } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import LoginForm from "../auth/Login";
import RegistrationForm from "../auth/Register";
import { Movie } from "../../page/movie";
import { MovieLayout } from "./MovieLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="sign-up" />} />
        <Route path="sign-up" element={<RegistrationForm />} />
        <Route path="sign-in" element={<LoginForm />} />
      </Route>
     <Route path="/" element={<MovieLayout/>}>
    <Route index element={<Navigate to="movie"/>}/>
    <Route path="/movie" element={<Movie/>}/>
     </Route>
    </Routes>
  );
}

export default AppRoutes;
