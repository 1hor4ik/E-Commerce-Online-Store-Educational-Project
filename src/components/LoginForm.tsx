import React from "react";
import { useFormik } from "formik";
import { Button, Stack, Heading, useToast, Text } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import InputField from "./InputField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password too short")
    .required("Password is required"),
});

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const auth = getAuth();
  const { avatarUrl } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();

        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            avatarUrl,
            token,
          })
        );
        toast({
          title: "Successfully Logged in!",
          status: "success",
        });
        navigate("/");
      } catch (error) {
        console.error("Error during login process:", error);
        toast({
          title: "Login Failed",
          description: "Wrong Credentials",
          status: "error",
        });
      }
    },
  });

  return (
    <Stack
      w="600px"
      display="flex"
      flexDirection="column"
      padding="30px 50px"
      boxShadow="-2px 4px 29px -6px rgba(0,0,0,0.8)"
      borderRadius="10px"
      alignItems="center"
      justifyContent="center"
      rowGap="20px"
    >
      <Heading>Login</Heading>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          rowGap: "20px",
          flexDirection: "column",
        }}
      >
        <InputField
          label="Email"
          disabled={false}
          placeholder="Email..."
          required
          meta={formik.getFieldMeta("email")}
          {...formik.getFieldProps("email")}
        />
        <InputField
          label="Password"
          disabled={false}
          placeholder="Password..."
          required
          meta={formik.getFieldMeta("password")}
          {...formik.getFieldProps("password")}
        />
        <Button colorScheme="blue" type="submit" width="100%" marginTop="20px">
          Login
        </Button>
        <Text>
          Don't Have An Account Yet?
          <Text
            paddingRight="5px"
            color="blue"
            textDecoration="underline"
            as={Link}
            to="/register"
          >
            Register
          </Text>
        </Text>
      </form>
    </Stack>
  );
};

export default LoginForm;
