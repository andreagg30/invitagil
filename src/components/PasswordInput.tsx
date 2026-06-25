import { useState } from "react";
import TextInput, { type TextInputProps } from "./TextInput";
import Icon from "./Icon";
import IconButton from "./IconButton";
interface Props extends TextInputProps {
  hideIcon?: boolean;
}
function PasswordInput({ hideIcon, ...props }: Props) {
  const [show, setShow] = useState(false);
  return (
    <TextInput
      {...props}
      type={show ? "text" : "password"}
      rightItem={
        hideIcon ? undefined : (
          <IconButton
            onClick={() => {
              setShow((prevStep) => !prevStep);
            }}
            type="button"
          >
            <Icon icon={show ? "visibility_off" : "visibility"} />
          </IconButton>
        )
      }
    />
  );
}

export default PasswordInput;
