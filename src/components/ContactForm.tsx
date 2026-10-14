import React, { useRef } from "react";
import { useFormik } from "formik";
import {
  Button,
  Stack,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import { motion, useInView } from "framer-motion";

type ContactFormType = {
  email: string;
  message: string;
};

const MotionFormControl = motion(FormControl);
const MotionHeading = motion(Heading);

const contactSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  message: yup.string().required("Message is required"),
});

const ContactForm: React.FC = () => {
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const headingRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const headingInView = useInView(headingRef, { once: true });
  const emailInView = useInView(emailRef, { once: true });
  const messageInView = useInView(messageRef, { once: true });

  const formik = useFormik({
    initialValues: {
      email: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values: ContactFormType, { setSubmitting, resetForm }) => {
      console.log(values);
      if (formRef.current) {
        emailjs
          .sendForm(
            "service_6ewb0so",
            "template_5n16u09",
            formRef.current,
            "4AItnLqGvgBqqJekm"
          )
          .then(
            () => {
              toast({
                title: "Email Sent Successfully!",
                description: "We've received your message.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              resetForm();
            },
            () => {
              toast({
                title: "Something Went Wrong!",
                description:
                  "There was an error submitting your message. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          );
        setSubmitting(false);
      }
    },
  });

  return (
    <form ref={formRef} onSubmit={formik.handleSubmit}>
      <Stack
        id="contact-us"
        p="20px 30px"
        maxW="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <MotionHeading
          ref={headingRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: headingInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          fontSize="45px"
        >
          Contact Us
        </MotionHeading>
        <MotionFormControl
          ref={emailRef}
          initial={{ opacity: 0, translateX: "-1000px" }}
          animate={{
            opacity: emailInView ? 1 : 0,
            translateX: emailInView ? 0 : "-1000px",
          }}
          transition={{ duration: 0.5 }}
          maxW="800px"
          isInvalid={formik.touched.email && !!formik.errors.email}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </MotionFormControl>
        <MotionFormControl
          ref={messageRef}
          initial={{ opacity: 0, translateX: "1000px" }}
          animate={{
            opacity: messageInView ? 1 : 0,
            translateX: messageInView ? 0 : "1000px",
          }}
          transition={{ duration: 0.5 }}
          maxW="800px"
          isInvalid={formik.touched.message && !!formik.errors.message}
        >
          <FormLabel htmlFor="message">Message</FormLabel>
          <Textarea
            id="message"
            name="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          <FormErrorMessage>{formik.errors.message}</FormErrorMessage>
        </MotionFormControl>
        <Button type="submit" isLoading={formik.isSubmitting}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default ContactForm;
