import { useRef, RefObject, useCallback } from 'react';
import { CSSObject } from 'styled-components';

import { FileInputContainer } from './styles';

type FileInputProps = {
  text: string;
  style?: CSSObject;
  disabled?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FileInput({
  text,
  handleChange,
}: FileInputProps) {
  const inputRef: RefObject<HTMLInputElement | null> = useRef(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(event);
      if (inputRef.current) { inputRef.current.value = ''; }
    },
    [handleChange],
  );

  return (
    <>
      <FileInputContainer
        ref={inputRef}
        multiple
        type="file"
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
      />
      
      <span onClick={() => inputRef.current?.click()}>
        {text}
      </span>
    </>
  );
}
