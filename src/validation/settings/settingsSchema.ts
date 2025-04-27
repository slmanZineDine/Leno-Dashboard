// Third-Party =====> zod
import { z } from "zod";
// Common-Schema
import {
  imageSchema,
  urlSchema,
  emailSchema,
  requiredFieldSchema,
} from "@validation/common";

const settingsSchema = z.object({
  logo: imageSchema,
  app_name: z.union([requiredFieldSchema, z.literal("")]),
  email: z.union([emailSchema, z.literal("")]),
  about_us: z.union([requiredFieldSchema, z.literal("")]),
  description: z.union([requiredFieldSchema, z.literal("")]),
  location: z.union([requiredFieldSchema, z.literal("")]),
  police: z.union([requiredFieldSchema, z.literal("")]),
  privacy_policy: z.union([requiredFieldSchema, z.literal("")]),
  phone: z.union([requiredFieldSchema, z.literal("")]),
  web_site: z.union([urlSchema, z.literal("")]),
  facebook: z.union([urlSchema, z.literal("")]),
  instagram: z.union([urlSchema, z.literal("")]),
  twitter: z.union([urlSchema, z.literal("")]),
  whatsapp: z.union([requiredFieldSchema, z.literal("")]),
});

type settingsSchemaFormType = z.infer<typeof settingsSchema>;

export { settingsSchema, type settingsSchemaFormType };
