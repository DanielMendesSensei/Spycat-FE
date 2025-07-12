import { z } from "zod";

// Common validation patterns
export const idSchema = z.number().positive("ID must be a positive number");

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name too long")
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name must contain only letters and spaces")
  .transform((name) => name.trim());

export const salarySchema = z
  .number()
  .positive("Salary must be positive")
  .max(10000000, "Salary too high")
  .multipleOf(0.01, "Salary must have at most 2 decimal places");

export const experienceSchema = z
  .number()
  .min(0, "Experience cannot be negative")
  .max(30, "Maximum experience is 30 years")
  .int("Experience must be an integer");

export const breedSchema = z
  .string()
  .min(1, "Breed is required")
  .max(100, "Breed name too long")
  .transform((breed) => breed.trim());

// Spy Cat form schemas
export const spyCatCreateSchema = z.object({
  name: nameSchema,
  years_of_experience: experienceSchema,
  breed: breedSchema,
  salary: salarySchema,
});

export const spyCatUpdateSchema = z.object({
  salary: salarySchema,
});

// Form types
export type SpyCatCreateForm = z.infer<typeof spyCatCreateSchema>;
export type SpyCatUpdateForm = z.infer<typeof spyCatUpdateSchema>;

// Search and filter schemas
export const spyCatFilterSchema = z.object({
  search: z.string().optional(),
  breed: z.string().optional(),
  minExperience: z.number().min(0).optional(),
  maxExperience: z.number().max(30).optional(),
  minSalary: z.number().min(0).optional(),
  maxSalary: z.number().optional(),
});

export type SpyCatFilterForm = z.infer<typeof spyCatFilterSchema>;

// Mission validation schemas
export const missionCreateSchema = z.object({
  cat: z.string().min(1, "Spy cat is required"),
  complete: z.boolean().default(false),
});

export type MissionCreateForm = z.infer<typeof missionCreateSchema>;

export const missionUpdateSchema = z.object({
  cat: z.string().min(1, "Spy cat is required").optional(),
  complete: z.boolean().optional(),
});

export type MissionUpdateForm = z.infer<typeof missionUpdateSchema>;

// Target validation schemas
export const targetCreateSchema = z.object({
  name: nameSchema,
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),
  complete: z.boolean().default(false),
  mission: z.string().min(1, "Mission is required"),
});

export type TargetCreateForm = z.infer<typeof targetCreateSchema>;

export const targetUpdateSchema = z.object({
  name: nameSchema.optional(),
  country: z.string().min(1, "Country is required").optional(),
  notes: z.string().optional(),
  complete: z.boolean().optional(),
});

export type TargetUpdateForm = z.infer<typeof targetUpdateSchema>;

export const targetNotesSchema = z.object({
  notes: z
    .string()
    .min(1, "Notes are required when updating target information"),
});

export type TargetNotesForm = z.infer<typeof targetNotesSchema>;

// Validation helpers
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone);
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
};

// Custom validation functions
export const validateAge = (birthDate: Date): boolean => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age >= 0 && age <= 150;
};

export const validateFutureDate = (date: Date): boolean => {
  return date > new Date();
};

export const validatePastDate = (date: Date): boolean => {
  return date < new Date();
};
