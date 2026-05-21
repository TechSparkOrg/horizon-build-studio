"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelViewer3D } from "@/components/ui/ModelViewer3D";
import { slideLeft, slideRight } from "@/lib/motion-variants";

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

export function ConsultationForm() {
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

  const onSubmit = async (data: FormValues): Promise<void> => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  const errBase =
    "mt-1 text-xs text-destructive";
  const inputBase =
    "w-full h-11 px-3 rounded-md border bg-white text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

  return (
    <section id="contact" className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 grid lg:grid-cols-2 gap-0 lg:gap-10 items-stretch">
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative rounded-l-2xl lg:rounded-l-2xl rounded-t-2xl lg:rounded-tr-none bg-brand-dark text-white p-8 sm:p-12 overflow-hidden"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(1 0 0 / 0.03) 0 2px, transparent 2px 14px)",
          }}
        >
          <SectionLabel>Book A Consultation</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-white text-3xl sm:text-4xl leading-tight">
            Schedule a Smooth and Stress-Free Consultation
          </h2>
          <p className="mt-5 text-white/75 leading-relaxed max-w-md">
            Our experts are available Monday&ndash;Saturday, 9 AM&ndash;6 PM NPT. No pitch
            decks &mdash; just a real conversation about your project.
          </p>
          <div className="mt-8 rounded-xl overflow-hidden h-32 sm:h-36">
            <ModelViewer3D
              src="/glb/mailbox.glb"
              className="w-full h-full bg-transparent"
              hideBadge
              disableControls
            />
          </div>
          <ul className="mt-6 space-y-4 text-white/85">
            <li className="flex items-center gap-3">
              <Phone className="size-5 text-brand-primary" />
              <a
                href="tel:+97714411222"
                className="hover:text-brand-primary"
              >
                +977 1 441 1222
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 text-brand-primary" />
              <a
                href="mailto:hello@horizonnepal.com.np"
                className="hover:text-brand-primary"
              >
                hello@horizonnepal.com.np
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-5 text-brand-primary" />
              <span>Tinkune, Kathmandu</span>
            </li>
          </ul>
        </motion.div>

        <motion.form
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-off-white rounded-r-2xl rounded-b-2xl lg:rounded-b-2xl lg:rounded-bl-none p-8 sm:p-10"
        >
          <h3 className="font-display text-2xl font-bold text-brand-secondary">
            Book Your Free Consultation
          </h3>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="name"
              >
                Full Name <span className="text-brand-primary">*</span>
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
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="email"
              >
                Email Address <span className="text-brand-primary">*</span>
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
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="phone"
              >
                Phone Number <span className="text-brand-primary">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+977 ..."
                aria-required="true"
                aria-invalid={!!errors.phone}
                {...register("phone")}
                className={`${inputBase} ${errors.phone ? "border-destructive" : "border-light-gray"}`}
              />
              {errors.phone && (
                <p role="alert" className={errBase}>
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="service"
              >
                Service Type <span className="text-brand-primary">*</span>
              </label>
              <select
                id="service"
                aria-required="true"
                aria-invalid={!!errors.service}
                {...register("service")}
                className={`${inputBase} ${errors.service ? "border-destructive" : "border-light-gray"}`}
              >
                <option value="">Choose a service&hellip;</option>
                <option>Building</option>
                <option>Road</option>
                <option>Interior</option>
                <option>Maintenance</option>
                <option>Other</option>
              </select>
              {errors.service && (
                <p role="alert" className={errBase}>
                  {errors.service.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="description"
              >
                Project Description <span className="text-brand-primary">*</span>
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
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                className="block text-sm font-medium text-brand-secondary mb-1"
                htmlFor="date"
              >
                Preferred Date <span className="text-brand-primary">*</span>
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
                  {errors.date.message}
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
              "Sending\u2026"
            ) : (
              <>
                Schedule My Consultation <ArrowRight className="size-4" />
              </>
            )}
          </button>
          <p className="mt-3 text-xs text-mid-gray">
            We respect your privacy. Your details are never shared.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
