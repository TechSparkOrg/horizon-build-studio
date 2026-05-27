import { CharCount } from "./CharCount";

interface MetaInputProps {
  label: string;
  hint: string;
  max: number;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const inputClass = "w-full h-10 px-3 rounded border border-gray-300 text-sm";

export function MetaInput({ label, hint, max, value, onChange, placeholder }: MetaInputProps) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <p className="text-xs text-gray-500 mb-1">{hint}</p>
      <div className="relative">
        <input value={value} onChange={(e) => onChange(e.target.value)} maxLength={max + 20} className={`${inputClass} pr-16`} placeholder={placeholder} />
        <div className="absolute right-2 top-1/2 -translate-y-1/2"><CharCount current={value.length} max={max} /></div>
      </div>
    </div>
  );
}
