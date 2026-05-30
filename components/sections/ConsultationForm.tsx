"use client";

import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/DynamicModelViewer3D";
import { useText, useLang } from "@/lib/i18n/lang-client";
import { getVal, getMedia, type SectionContentMap } from "@/lib/content/section-content";
import { submitContact } from "@/lib/services/actions/contact.actions";

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  service: z.string().min(1, "Select a service"),
  description: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (10+ chars)")
    .max(1000),
  date: z.string().min(1, "Choose a date"),
});

type FormValues = z.infer<typeof formSchema>;

export function ConsultationForm({ settings, content }: { settings?: Record<string, string>; content?: SectionContentMap }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      description: "",
      date: "",
    },
  });

  const t = useText();
  const lang = useLang();
  const val = (key: string, fb: string) => getVal(content, key, fb, lang);
  const media = (key: string, fb: string) => getMedia(content, key, fb);
  const phone = settings?.contact_phone ?? "+977 1 441 1222";
  const email = settings?.contact_email ?? "hello@horizonnepal.com.np";
  const address = settings?.contact_address ?? "Tinkune, Kathmandu";

  const errMap: Record<string, string> = {
    name: t.consultation.errors.name,
    email: t.consultation.errors.email,
    phone: t.consultation.errors.phone,
    service: t.consultation.errors.service,
    description: t.consultation.errors.desc,
    date: t.consultation.errors.date,
  };

  const onSubmit = async (data: FormValues): Promise<void> => {
    const result = await submitContact(data);

    if (result.success) {
      toast.success(result.message);
      reset();
    } else {
      toast.error(result.message ?? t.consultation.apiError);
    }
  };

  const errBase =
    "mt-1 text-xs text-destructive";
  const inputBase =
    "w-full h-11 px-3 rounded-md border bg-white text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

  const getErrMsg = (field: keyof typeof errors) => {
    if (errors[field]) {
      const path = field;
      return errMap[path] ?? errors[field]?.message;
    }
    return undefined;
  };

  return (
    <section id="consultation-form" className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 grid lg:grid-cols-2 gap-0 lg:gap-10 items-stretch">
        <div
          className="relative rounded-l-2xl lg:rounded-l-2xl rounded-t-2xl lg:rounded-tr-none bg-brand-dark text-white p-8 sm:p-12 overflow-hidden animate-slide-in-left"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(1 0 0 / 0.03) 0 2px, transparent 2px 14px)",
          }}
        >
          <SectionLabel>{val("label", t.consultation.label)}</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-white text-3xl sm:text-4xl leading-tight">
            {val("h2", t.consultation.h2)}
          </h2>
          <p className="mt-5 text-white/75 leading-relaxed max-w-md">
            {val("subtitle", t.consultation.subtitle)}
          </p>
          <div className="mt-8 rounded-xl overflow-hidden h-32 sm:h-36">
            <ModelViewer3D
              src={media("formModel", "/glb/mailbox.glb")}
              className="w-full h-full bg-transparent"
              hideBadge
              disableControls
            />
          </div>
          <ul className="mt-6 space-y-4 text-white/85">
            <li className="flex items-center gap-3">
              <Phone className="size-5 text-brand-primary" />
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="hover:text-brand-primary"
              >
                {phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 text-brand-primary" />
              <a
                href={`mailto:${email}`}
                className="hover:text-brand-primary"
              >
                {email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-5 text-brand-primary" />
              <span>{address}</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-off-white rounded-r-2xl rounded-b-2xl lg:rounded-b-2xl lg:rounded-bl-none p-8 sm:p-10 animate-slide-in-right"
        >
          <h3 className="font-display text-2xl font-bold text-brand-secondary">
            {t.consultation.formTitle}
          </h3>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="name"
              >
                {t.consultation.nameLabel}
              </label>
              <input
                id="name"
                aria-required="true"
                aria-invalid={!!errors.name}
                {...register("name")}
                className={`${inputBase} ${errors.name ? "border-destructive" : "border-light-gray"}`}
              />
              {errors.name && (
                <p role="alert" className={errBase}>
                  {getErrMsg("name")}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="email"
              >
                {t.consultation.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                {...register("email")}
                className={`${inputBase} ${errors.email ? "border-destructive" : "border-light-gray"}`}
              />
              {errors.email && (
                <p role="alert" className={errBase}>
                  {getErrMsg("email")}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="phone"
              >
                {t.consultation.phoneLabel}
              </label>
              <input
                id="phone"
                type="tel"
                placeholder={t.consultation.phonePlaceholder}
                aria-required="true"
                aria-invalid={!!errors.phone}
                {...register("phone")}
                className={`${inputBase} ${errors.phone ? "border-destructive" : "border-light-gray"}`}
              />
              {errors.phone && (
                <p role="alert" className={errBase}>
                  {getErrMsg("phone")}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="service"
              >
                {t.consultation.serviceLabel}
              </label>
              <select
                id="service"
                aria-required="true"
                aria-invalid={!!errors.service}
                {...register("service")}
                className={`${inputBase} ${errors.service ? "border-destructive" : "border-light-gray"}`}
              >
                <option value="">{t.consultation.serviceDefault}</option>
                {t.consultation.serviceOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              {errors.service && (
                <p role="alert" className={errBase}>
                  {getErrMsg("service")}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="description"
              >
                {t.consultation.descLabel}
              </label>
              <textarea
                id="description"
                rows={4}
                aria-required="true"
                aria-invalid={!!errors.description}
                {...register("description")}
                className={`w-full px-3 py-2 rounded-md border bg-white text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${errors.description ? "border-destructive" : "border-light-gray"}`}
              />
              {errors.description && (
                <p role="alert" className={errBase}>
                  {getErrMsg("description")}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="date"
              >
                {t.consultation.dateLabel}
              </label>
              <input
                id="date"
                type="date"
                aria-required="true"
                aria-invalid={!!errors.date}
                {...register("date")}
                className={`${inputBase} ${errors.date ? "border-destructive" : "border-light-gray"}`}
              />
              {errors.date && (
                <p role="alert" className={errBase}>
                  {getErrMsg("date")}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full h-[52px] rounded-md bg-brand-primary text-white font-semibold inline-flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-60"
          >
            {isSubmitting ? (
              t.consultation.submitting
            ) : (
              <>
                {t.consultation.submit} <ArrowRight className="size-4" />
              </>
            )}
          </button>
          <p className="mt-3 text-xs text-mid-gray">
            {t.consultation.privacy}
          </p>
        </form>
      </div>
    </section>
  );
}
