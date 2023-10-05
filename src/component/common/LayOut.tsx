import { NavBar } from "../Nav/NavBar";
import { Outlet } from "react-router-dom";

export const LayOut = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
