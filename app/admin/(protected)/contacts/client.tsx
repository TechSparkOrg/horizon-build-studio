"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronDown, ChevronRight, Mail, Phone, Calendar,
  MessageSquareText, Clock, User, Briefcase, RefreshCw,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
  preferredDate: string;
  status: string;
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  completed: "Completed",
};

const STATUS_OPTIONS = ["new", "contacted", "completed"] as const;

async function updateStatus(id: string, status: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${STATUS_STYLES[status] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}

function StatusSelect({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border cursor-pointer appearance-none bg-white ${STATUS_STYLES[value] || "bg-gray-50 text-gray-600 border-gray-200"} disabled:opacity-60`}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt} value={opt}>{STATUS_LABELS[opt]}</option>
      ))}
    </select>
  );
}

export function ContactsClient({ contacts: initialContacts }: { contacts: Contact[] }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading((prev) => new Set(prev).add(id));
    const ok = await updateStatus(id, newStatus);
    if (ok) {
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
      toast.success(`Status updated to "${STATUS_LABELS[newStatus] || newStatus}"`);
    } else {
      toast.error("Failed to update status");
    }
    setLoading((prev) => { const next = new Set(prev); next.delete(id); return next; });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-secondary tracking-tight">
            Contact Submissions
          </h1>
          <p className="text-sm text-mid-gray mt-0.5">
            {contacts.length} submission{contacts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-light-gray shadow-[0_4px_16px_rgba(0,0,0,0.04)] p-16 text-center">
          <div className="size-16 rounded-2xl bg-gradient-to-br from-brand-primary/10 to-orange-100 mx-auto mb-5 flex items-center justify-center">
            <MessageSquareText className="size-7 text-brand-primary" />
          </div>
          <h3 className="text-xl font-display font-bold text-brand-secondary mb-2">No submissions yet</h3>
          <p className="text-sm text-mid-gray">Contact form submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c) => {
            const isOpen = expanded.has(c.id);
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-light-gray shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <button
                  onClick={() => toggleExpand(c.id)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <div className="shrink-0">
                    {isOpen ? (
                      <ChevronDown className="size-4 text-mid-gray" />
                    ) : (
                      <ChevronRight className="size-4 text-mid-gray" />
                    )}
                  </div>

                  <div className="size-10 rounded-xl bg-gradient-to-br from-brand-primary/10 to-orange-100 flex items-center justify-center shrink-0">
                    <User className="size-4 text-brand-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-brand-secondary truncate">
                        {c.name}
                      </span>
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-mid-gray mt-0.5">
                      <span className="inline-flex items-center gap-1">
                        <Briefcase className="size-3" /> {c.serviceType}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3" /> {c.preferredDate}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" /> {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {c.description && (
                    <div className="hidden sm:block text-xs text-mid-gray truncate max-w-[200px] lg:max-w-[300px] text-right">
                      {c.description}
                    </div>
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-light-gray px-4 py-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="size-9 rounded-lg bg-off-white flex items-center justify-center shrink-0">
                          <User className="size-4 text-mid-gray" />
                        </div>
                        <div>
                          <p className="text-xs text-mid-gray">Name</p>
                          <p className="font-medium text-brand-secondary">{c.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="size-9 rounded-lg bg-off-white flex items-center justify-center shrink-0">
                          <Mail className="size-4 text-mid-gray" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-mid-gray">Email</p>
                          <a href={`mailto:${c.email}`} className="font-medium text-brand-primary hover:underline truncate block">
                            {c.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="size-9 rounded-lg bg-off-white flex items-center justify-center shrink-0">
                          <Phone className="size-4 text-mid-gray" />
                        </div>
                        <div>
                          <p className="text-xs text-mid-gray">Phone</p>
                          <a href={`tel:${c.phone}`} className="font-medium text-brand-secondary hover:underline">
                            {c.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="size-9 rounded-lg bg-off-white flex items-center justify-center shrink-0">
                          <Briefcase className="size-4 text-mid-gray" />
                        </div>
                        <div>
                          <p className="text-xs text-mid-gray">Service</p>
                          <p className="font-medium text-brand-secondary">{c.serviceType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="size-9 rounded-lg bg-off-white flex items-center justify-center shrink-0">
                          <Calendar className="size-4 text-mid-gray" />
                        </div>
                        <div>
                          <p className="text-xs text-mid-gray">Preferred Schedule</p>
                          <p className="font-medium text-brand-secondary">{c.preferredDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="size-9 rounded-lg bg-off-white flex items-center justify-center shrink-0">
                          <Clock className="size-4 text-mid-gray" />
                        </div>
                        <div>
                          <p className="text-xs text-mid-gray">Submitted</p>
                          <p className="font-medium text-brand-secondary">
                            {new Date(c.createdAt).toLocaleDateString("en-US", {
                              weekday: "short", month: "short", day: "numeric", year: "numeric",
                              hour: "numeric", minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="size-9 rounded-lg bg-off-white flex items-center justify-center shrink-0">
                          <RefreshCw className="size-4 text-mid-gray" />
                        </div>
                        <div>
                          <p className="text-xs text-mid-gray">Status</p>
                          <StatusSelect
                            value={c.status}
                            onChange={(v) => handleStatusChange(c.id, v)}
                            disabled={loading.has(c.id)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-light-gray pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquareText className="size-4 text-mid-gray" />
                        <h4 className="text-sm font-semibold text-brand-secondary">Project Description</h4>
                      </div>
                      <p className="text-sm text-mid-gray leading-relaxed whitespace-pre-wrap bg-off-white rounded-xl p-4 border border-light-gray">
                        {c.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
