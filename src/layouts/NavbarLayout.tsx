import { Outlet } from "react-router-dom";
import { Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import React from "react";
import Footer from "../components/Footer";
import { selectUser } from "../redux/userSelector";
import { useSelector } from "react-redux";
import { RootState } from "../types";

const NavbarLayout: React.FC = () => {
  const user = useSelector((state: RootState) => selectUser(state));
  return (
    <Stack>
      <Navbar username={user.email} avatarImg={user.avatarUrl} />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default NavbarLayout;
