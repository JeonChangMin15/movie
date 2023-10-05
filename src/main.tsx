import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import { Loading } from "./component/common/Loading";
import { store } from "./redux/store";
import { NavBar } from "./component/Nav/NavBar";

const List = React.lazy(() => import("@src/routes/List"));
const Detail = React.lazy(() => import("@src/routes/Detail"));
const Search = React.lazy(() => import("@src/routes/Search"));
const Auth = React.lazy(() => import("@src/routes/Auth"));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  { path: "/detail/:movieId", element: <Detail /> },
  { path: "/search/:keyword", element: <Search /> },
  { path: "/auth", element: <Auth /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </Provider>
  </QueryClientProvider>
);
