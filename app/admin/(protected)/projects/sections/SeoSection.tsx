import { Field } from "../components/Fields";
import { Input, Textarea } from "../components/Fields";
import type { FormFields } from "../types";

export function SeoSection({
  form,
  onChange,
}: {
  form: FormFields;
  onChange: (key: keyof FormFields, value: unknown) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Field label="Meta Title">
          <p className="text-xs text-mid-gray mb-1">Keep under 70 characters.</p>
          <Input
            value={form.metaTitle}
            onChange={(e) => onChange("metaTitle", e.target.value)}
            maxLength={90}
            placeholder="SEO title"
          />
        </Field>
      </div>
      <div>
        <Field label="Meta Description">
          <p className="text-xs text-mid-gray mb-1">Keep under 160 characters.</p>
          <Textarea
            value={form.metaDescription}
            onChange={(e) => onChange("metaDescription", e.target.value)}
            maxLength={200}
            rows={2}
            placeholder="SEO description"
          />
        </Field>
      </div>
      <div>
        <Field label="Meta Keywords">
          <p className="text-xs text-mid-gray mb-1">Keep under 200 characters.</p>
          <Input
            value={form.metaKeywords}
            onChange={(e) => onChange("metaKeywords", e.target.value)}
            maxLength={220}
            placeholder="SEO keywords"
          />
        </Field>
      </div>
      <div>
        <Field label="Custom Script">
          <p className="text-xs text-mid-gray mb-1">Optional script or tracking code.</p>
          <textarea
            value={form.customScript}
            onChange={(e) => onChange("customScript", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono"
            placeholder="<script>..."
          />
        </Field>
      </div>
    </div>
  );
}
