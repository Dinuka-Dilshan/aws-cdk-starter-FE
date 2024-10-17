import { useCallback, useMemo, useState } from "react";

type Validator<T> = (val: T | undefined) => boolean;

const useTextFieldValue = <T,>(initialValue: T, validator: Validator<T>) => {
  const [value, setValue] = useState<T>(initialValue);

  const isValid = useMemo(() => validator(value), [validator, value]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value as T),
    []
  );

  return { value, setValue, isValid, onChangeHandler };
};

export default useTextFieldValue;
