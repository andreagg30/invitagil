import { useState } from "react";
import TextInput, { type TextInputProps } from "./TextInput";
import Icon from "./Icon";
import IconButton from "./IconButton";

function PasswordInput({ ...props }: TextInputProps) {
  const [show, setShow] = useState(false);
  return (
    <TextInput
      {...props}
      type={show ? "text" : "password"}
      rightItem={
        <IconButton
          onClick={() => {
            setShow((prevStep) => !prevStep);
          }}
          type="button"
        >
          <Icon icon={show ? "visibility_off" : "visibility"} />
        </IconButton>
      }
    />
  );
}

export default PasswordInput;
