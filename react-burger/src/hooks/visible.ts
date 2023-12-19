import { useState } from "react";

export const useVisible = () => {
  const [visible, setVisible] = useState(false);

  const onVisible = () => {
    setVisible(!visible);
  };

  return {
    visible,
    onVisible,
  };
};
