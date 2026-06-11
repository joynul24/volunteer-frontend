import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddPost from "../pages/AddPost/AddPost";
import AllPosts from "../pages/AllPosts/AllPosts";
import ManagePosts from "../pages/ManagePosts/ManagePosts";
import PostDetails from "../pages/PostDetails/PostDetails";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-post",
        element: <PrivateRoute><AddPost /></PrivateRoute>,
      },
      {
        path: "/all-posts",
        element: <AllPosts />,
      },
      {
        path: "/manage-posts",
        element: <PrivateRoute><ManagePosts /></PrivateRoute>,
      },
      {
        path: "/post/:id",
        element: <PrivateRoute><PostDetails /></PrivateRoute>,
      }
    ]
  }
]);
