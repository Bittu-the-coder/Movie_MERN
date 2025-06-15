import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import PrivateRoutes from "./pages/auth/PrivateRoutes.tsx";
import Profile from "./pages/user/Profile.tsx";
import AdminRoute from "./pages/admin/Dashboard/AdminRoute.tsx";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard.tsx";
import GenreList from "./pages/admin/Dashboard/GenreList.tsx";
import CreateMovie from "./pages/admin/Dashboard/CreateMovie.tsx";
import AdminMoviesList from "./pages/admin/Dashboard/AdminMoviesList.tsx";
import UpdateMovie from "./pages/admin/Dashboard/UpdateMovie.tsx";
import AllMovies from "./pages/movies/AllMovies.tsx";
import MovieDetails from "./pages/movies/MovieDetails.tsx";
import AllComments from "./pages/admin/Dashboard/AllComments.tsx";
import NewMovies from "./pages/movies/NewMovies.tsx";
import TopMovies from "./pages/movies/TopMovies.tsx";
import RandomMovies from "./pages/movies/RandomMovies.tsx";

// auth

// restricted routes

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/movies" element={<AllMovies />} />
      <Route path="/movies/new" element={<NewMovies />} />
      <Route path="/movies/top" element={<TopMovies />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/movies/random" element={<RandomMovies />} />

      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/movies/genre" element={<GenreList />} />
        <Route path="/admin/movies/comments" element={<AllComments />} />
        <Route path="/admin/movies/create" element={<CreateMovie />} />
        <Route path="/admin/movies-list" element={<AdminMoviesList />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
        <Route path="/admin/movies/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/admin/movies/comments" element={<AllComments />} /> */}
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
