"use client";

import { useState } from "react";
import { ImageUploader } from "./ImageUploader";

interface Props {
  name: string;
  defaultValue?: string;
  required?: boolean;
}

export function ImageField({ name, defaultValue = "", required }: Props) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div>
      <input type="hidden" name={name} value={value} />
      <ImageUploader value={value} onChange={setValue} />
      {required && !value && (
        <p className="text-xs text-destructive mt-1">Image is required</p>
      )}
    </div>
  );
}
