import React, { useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";

const AutoExpandingTextarea = React.memo(({ value, onChange, className, ...props }: any) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
  }, [onChange]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      className={`min-h-[60px] overflow-hidden ${className}`}
      {...props}
    />
  );
});

export default AutoExpandingTextarea;