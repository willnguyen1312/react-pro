import { useState } from "react";

const MAX_LENGTH = 10;

type MaxLengthInputProps = {
  label?: string;
  initialValue?: string;
};

export default function MaxLengthInput({
  label = "Cool name",
  initialValue = "",
}: MaxLengthInputProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <input
      type="text"
      aria-label={label}
      value={value}
      maxLength={MAX_LENGTH}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
}
