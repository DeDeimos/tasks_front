import React from "react";
import styles from "./TextInput.module.scss";

type TextInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={styles.textInput}>
      <input
        type="text"
        className={styles.textInputField}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;