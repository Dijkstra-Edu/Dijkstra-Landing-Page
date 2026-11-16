"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  contactTopics,
  type ContactInput,
  type ContactTopic,
} from "@/lib/contact";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string; fallback?: boolean };

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const socials = [
  { label: "Discord", href: siteConfig.links.discord, Icon: IconBrandDiscord },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    Icon: IconBrandLinkedin,
  },
  { label: "GitHub", href: siteConfig.links.github, Icon: IconBrandGithub },
];

export default function ContactForm({
  defaultTopic = "general",
  showHeading = true,
}: {
  defaultTopic?: ContactTopic;
  showHeading?: boolean;
}) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0]]),
        ) as FieldErrors,
      );
      return;
    }
    setErrors({});
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({
          state: "error",
          message: body.error ?? "Something went wrong.",
          fallback: body.fallback,
        });
        return;
      }
      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({
        state: "error",
        message: "Network error â€” please try again.",
        fallback: true,
      });
    }
  }

  const field = (name: keyof ContactInput) => ({
    name,
    id: `contact-${name}`,
    "aria-invalid": Boolean(errors[name]) || undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const ErrorText = ({ name }: { name: keyof ContactInput }) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1.5 text-xs text-red-600">
        {errors[name]}
      </p>
    ) : null;

  return (
    <div className="mx-auto w-full max-w-lg">
      {showHeading && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-black sm:text-4xl">
            Contact us
          </h2>
          <p className="mt-3 text-muted-foreground">
            Questions, partnerships or press â€” we read everything.
          </p>
        </div>
      )}

      <Card className="p-0">
        <CardContent className="p-6">
          {status.state === "sent" ? (
            <div className="py-10 text-center" role="status">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
              <h3 className="mt-4 text-xl font-semibold">Message sent</h3>
              <p className="mt-2 text-muted-foreground">
                Thanks for reaching out â€” we&apos;ll get back to you soon.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setStatus({ state: "idle" })}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={onSubmit}
              className="grid gap-4 lg:gap-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="contact-name" className="mb-2">
                    Name
                  </Label>
                  <Input
                    {...field("name")}
                    autoComplete="name"
                    placeholder="Your name"
                  />
                  <ErrorText name="name" />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="mb-2">
                    Email
                  </Label>
                  <Input
                    {...field("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                  <ErrorText name="email" />
                </div>
              </div>

              <div>
                <Label htmlFor="contact-topic" className="mb-2">
                  Topic
                </Label>
                <select
                  {...field("topic")}
                  defaultValue={defaultTopic}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {contactTopics.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="contact-message" className="mb-2">
                  Message
                </Label>
                <Textarea
                  {...field("message")}
                  rows={5}
                  placeholder="How can we help?"
                />
                <ErrorText name="message" />
              </div>

              {/* Honeypot â€” hidden from people and assistive tech */}
              <div
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              >
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {status.state === "error" && (
                <div
                  role="alert"
                  className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900"
                >
                  <p className="font-medium">{status.message}</p>
                  {status.fallback && (
                    <p className="mt-1">
                      You can reach us on{" "}
                      <a className="underline" href={siteConfig.links.discord}>
                        Discord
                      </a>{" "}
                      or{" "}
                      <a className="underline" href={siteConfig.links.linkedin}>
                        LinkedIn
                      </a>{" "}
                      in the meantime.
                    </p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status.state === "sending"}
                className="w-full"
              >
                {status.state === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sendingâ€¦
                  </>
                ) : (
                  "Send message"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">
                    or find us on
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <Button key={label} variant="outline" size="sm" asChild>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("gap-2")}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  </Button>
                ))}
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
