import { FormInputLabel, Group, Input } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      {label && (
        <FormInputLabel shrink={otherProps.value.length ? true : false}>
          {label}
        </FormInputLabel>
      )}
      <Input {...otherProps} />
    </Group>
  );
};

export default FormInput;
