import React from "react";
import { Stack } from "@chakra-ui/react";
import RegisterForm from "../../components/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <RegisterForm />
    </Stack>
  );
};

export default RegisterPage;
