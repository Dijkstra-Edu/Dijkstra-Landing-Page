import { z } from "zod";

export const contactTopics = [
  { value: "general", label: "General question" },
  { value: "students", label: "I'm a student" },
  { value: "contributing", label: "Contributing / joining a team" },
  { value: "universities", label: "University partnership" },
  { value: "companies", label: "Hiring / company partnership" },
  { value: "press", label: "Press" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["value"];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  topic: z.enum(
    contactTopics.map((t) => t.value) as [ContactTopic, ...ContactTopic[]],
  ),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail, please (10+ characters)")
    .max(2000, "Please keep it under 2000 characters"),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(500).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function isContactTopic(value: unknown): value is ContactTopic {
  return contactTopics.some((t) => t.value === value);
}
