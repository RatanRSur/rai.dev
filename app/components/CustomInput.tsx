type CustomInputProps<V> = {
  type: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  blackletter?: boolean;
  min?: number | string;
  max?: number | string;
  pattern?: string;
};

export default function CustomInput<V>({
  type,
  value,
  onChange,
  blackletter = false,
  min,
  max,
  pattern,
}: CustomInputProps<V>) {
  const fontStyles = blackletter
    ? { fontSize: "30px", fontFamily: "var(--font-jsl-blackletter)" }
    : {};

  const content = value == null ? "" : String(value);

  return (
    <span
      style={{
        display: "inline-grid",
        verticalAlign: "baseline",
        minWidth: "30px",
        position: "relative",
      }}
    >
      {/* Mirror element for width */}
      <span
        aria-hidden="true"
        style={{
          gridArea: "1 / 1",
          visibility: "hidden",
          whiteSpace: "pre",
          padding: 0,
          font: "inherit",
          ...fontStyles,
        }}
      >
        {content}
      </span>

      {/* Actual input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        pattern={pattern}
        className="invalid:text-red-600"
        style={{
          gridArea: "1 / 1",
          width: "100%",
          height: "100%",
          padding: 0,
          margin: 0,
          border: "none",
          font: "inherit",
          background: "transparent",
          position: "absolute",
          inset: 0,
          appearance: "none",
          MozAppearance: "textfield",
          WebkitAppearance: "none",
          ...fontStyles,
        }}
      />
    </span>
  );
}
