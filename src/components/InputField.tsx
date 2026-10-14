import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldMetaProps } from "formik";

type InputFieldProps = {
  placeholder: string;
  required: boolean;
  label: string;
  disabled: boolean;
  meta: FieldMetaProps<string>;
};

const InputField: React.FC<InputFieldProps> = ({
  required,
  label,
  disabled,
  meta,
  ...inputProps
}) => {
  return (
    <FormControl
      isRequired={required}
      isDisabled={disabled}
      isInvalid={!!meta.error && meta.touched}
    >
      <FormLabel>{label}</FormLabel>
      <Input {...inputProps} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
