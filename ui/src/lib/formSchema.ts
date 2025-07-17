import { z } from "zod";

// Fixed: Use consistent naming - COMPANY instead of ORGANIZATION
export const entityTypeSchema = z.enum(["PERSON", "ORGANIZATION"]);

// Person specific schema
export const personBasicInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  //entityType: z.literal("PERSON"),
});

// Company specific schema - renamed from organizationBasicInfoSchema
export const companyBasicInfoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  registrationNumber: z.string().optional(),
  taxNumber: z.string().optional(),
  //entityType: z.literal("COMPANY"),
});

// Phone number schema
export const phoneNumberSchema = z.object({
  number: z
    .string()
    .regex(/^\d{8}$/, "Phone number must be exactly 8 digits"),
});

// Address schema
export const addressSchema = z.object({
  streetAddress: z.string().optional(),
  city: z.string().optional()
});

// Base entity schema (shared between person and company)
export const baseEntitySchema = z.object({
  entityType: entityTypeSchema,
  email: z.string()
    .email('Adresse email invalide')
    .optional()
    .or(z.literal('')),
  phoneNumbers: z.array(phoneNumberSchema).min(1, "At least one phone number is required"),
  addresses: z.array(addressSchema),
});

// Client form schema with proper union for basicInfo
export const clientFormSchema = baseEntitySchema.extend({
  basicInfo: z.union([
    personBasicInfoSchema,
    companyBasicInfoSchema
  ]),
});

// Supplier form schema with proper union for basicInfo
export const supplierFormSchema = baseEntitySchema.extend({
  basicInfo: z.union([
    personBasicInfoSchema,
    companyBasicInfoSchema
  ]),
});

// Export types
export type ClientForm = z.infer<typeof clientFormSchema>;
export type SupplierForm = z.infer<typeof supplierFormSchema>;
export type EntityType = z.infer<typeof entityTypeSchema>;
export type PersonBasicInfo = z.infer<typeof personBasicInfoSchema>;
export type CompanyBasicInfo = z.infer<typeof companyBasicInfoSchema>;

// Helper type for form components
export type EntityFormType = ClientForm | SupplierForm;
export type addressType = z.infer<typeof addressSchema>;
 