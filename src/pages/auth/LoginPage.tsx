import React from "react";
import { Stack } from "@chakra-ui/react";
import LoginForm from "../../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
