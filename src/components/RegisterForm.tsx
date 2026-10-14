import React from "react";
import { useFormik } from "formik";
import { Button, Stack, Heading, useToast, Text } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import InputField from "./InputField";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password too short")
    .required("Password is required"),
  avatarUrl: yup.string().optional(),
});

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const auth = getAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      id: "",
      token: "",
      avatarUrl: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();

        dispatch(
          setUser({
            email: values.email,
            avatarUrl: values.avatarUrl,
            password: values.password,
            id: user.uid,
            token,
          })
        );
        toast({
          title: "Successfully Registered!",
          status: "success",
        });
        navigate("/");
      } catch (error) {
        console.error("Error during registration:", error);
        toast({
          title: "Registration Failed",
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
      <Heading>Register</Heading>
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
        <InputField
          label="Avatar Image"
          disabled={false}
          placeholder="Put Your Avatar Image URL..."
          required={false}
          meta={formik.getFieldMeta("avatarUrl")}
          {...formik.getFieldProps("avatarUrl")}
        />
        <Button colorScheme="blue" type="submit" width="100%" marginTop="20px">
          Register
        </Button>
        <Text>
          Already Have An Account?
          <Text
            paddingRight="5px"
            color="blue"
            textDecoration="underline"
            as={Link}
            to="/login"
          >
            Login
          </Text>
        </Text>
      </form>
    </Stack>
  );
};

export default RegisterForm;
