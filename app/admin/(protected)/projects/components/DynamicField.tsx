import { Input, Select, Textarea } from "./Fields";
import type { FieldConfig } from "../field-config";

interface DynamicFieldProps {
  config: FieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

export function DynamicField({ config, value, onChange, error }: DynamicFieldProps) {
  const id = `field-${config.key}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    if (config.type === "checkbox") {
      onChange((e as React.ChangeEvent<HTMLInputElement>).target.checked);
    } else if (config.type === "number") {
      onChange(e.target.value === "" ? "" : e.target.value);
    } else {
      onChange(e.target.value);
    }
  };

  const renderInput = () => {
    switch (config.type) {
      case "select":
        return (
          <Select id={id} value={String(value ?? "")} onChange={handleChange} required={config.required}>
            {config.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={id}
            rows={4}
            value={String(value ?? "")}
            onChange={handleChange}
            placeholder={config.placeholder}
          />
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={handleChange}
              className="rounded border-light-gray text-brand-primary focus:ring-brand-primary"
            />
            <span className="text-sm text-brand-secondary font-medium">{config.label}</span>
          </label>
        );

      case "number":
        return (
          <Input
            id={id}
            type="number"
            value={String(value ?? "")}
            onChange={handleChange}
            placeholder={config.placeholder}
            required={config.required}
            min={config.min}
            max={config.max}
            step={config.step}
          />
        );

      case "date":
        return (
          <Input
            id={id}
            type="date"
            value={String(value ?? "")}
            onChange={handleChange}
          />
        );

      default:
        return (
          <Input
            id={id}
            type="text"
            value={String(value ?? "")}
            onChange={handleChange}
            placeholder={config.placeholder}
            required={config.required}
            maxLength={config.maxLength}
          />
        );
    }
  };

  if (config.type === "checkbox") {
    return <div className={config.span === "full" ? "col-span-full" : ""}>{renderInput()}</div>;
  }

  return (
    <div className={config.span === "full" ? "col-span-full" : ""}>
      <label htmlFor={id} className="block text-sm font-medium text-brand-secondary mb-1.5">
        {config.label}
        {config.required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {renderInput()}
      {config.help && <p className="text-xs text-mid-gray mt-1">{config.help}</p>}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
