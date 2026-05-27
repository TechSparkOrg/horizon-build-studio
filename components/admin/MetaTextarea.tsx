import { CharCount } from "./CharCount";

interface MetaTextareaProps {
  label: string;
  hint: string;
  max: number;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const textareaClass = "w-full px-3 py-2 rounded border border-gray-300 text-sm resize-y min-h-20";

export function MetaTextarea({ label, hint, max, value, onChange, placeholder }: MetaTextareaProps) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <p className="text-xs text-gray-500 mb-1">{hint}</p>
      <div className="relative">
        <textarea value={value} onChange={(e) => onChange(e.target.value)} maxLength={max + 40} className={`${textareaClass} pr-16`} placeholder={placeholder} />
        <div className="absolute right-2 bottom-2"><CharCount current={value.length} max={max} /></div>
      </div>
    </div>
  );
}
