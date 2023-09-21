import { useEffect, useRef, useState } from "react";

type CustomInputProps<V> = {
  type: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomInput<V>({
  type,
  value,
  onChange,
}: CustomInputProps<V>) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={{ width: `${Math.max(30, value.length * 14)}px` }}
    />
  );
}
