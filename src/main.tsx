import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import { List } from "@src/routes/List.tsx";
import { NavBar } from "./component/Nav/NavBar";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <NavBar />
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
