import { z } from "zod";
import { IssuePriority, IssueStatus, IssueType, ProjectStatus } from "./types";

const ProjectStatusEnum = z.enum(ProjectStatus);

export const ImageItemSchema = z.object({
   url: z.string(),
   path: z.string(),
   caption: z.string().optional(),
});
export type ImageItem = z.infer<typeof ImageItemSchema>;

export const SignFormSchema = z.object({
   email: z.string().email("Please enter a valid email address"),
   password: z.string().min(1, "Password is required"),
});
export type SignFormData = z.infer<typeof SignFormSchema>;

export const UserFormSchema = z.object({
   name: z.string().min(1, "Name is required"),
   email: z.string().email("Invalid email"),
   password: z.string().min(1, "Password is required").optional(),
});
export type UserFormData = z.infer<typeof UserFormSchema>;
export const UserUpdateFormSchema = UserFormSchema.partial();
export type UserUpdateFormData = z.infer<typeof UserUpdateFormSchema>;

export const PasswordFormSchema = z
   .object({
      currentPassword: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
      newPassword: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
      confirmNewPassword: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
   })
   .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "As senhas não coincidem",
      path: ["confirmNewPassword"],
   });
export type PasswordFormData = z.infer<typeof PasswordFormSchema>;

export const IssueFormSchema = z.object({
   projectId: z.string().min(1, "Project ID is required"),
   title: z.string().min(1, "Title is required"),
   description: z.string().optional(),
   status: z.enum(IssueStatus).optional(),
   priority: z.enum(IssuePriority).optional(),
   type: z.enum(IssueType).optional(),
   attachments: z.array(ImageItemSchema).optional(),
   assignedTo: z.string().optional(),
   order: z.number().optional(),
});
export const IssueUpdateFormSchema = IssueFormSchema.partial();
export type IssueFormData = z.infer<typeof IssueFormSchema>;
export type IssueUpdateFormData = z.infer<typeof IssueUpdateFormSchema>;

export const EnvironmentVariableFormSchema = z.object({
   projectId: z.string().min(1),
   key: z.string().optional(),
   value: z.string().min(1, "Value is required"),
   description: z.string().optional(),
});
export type EnvironmentVariableFormData = z.infer<typeof EnvironmentVariableFormSchema>;

export const BackofficeProjectFormSchema = z.object({
   name: z.string().min(1, "Name is required"),
   description: z.string().optional(),
   databaseUrl: z.string().min(1, "Database URL is required"),
});
export type BackofficeProjectFormData = z.infer<typeof BackofficeProjectFormSchema>;

// Base schema without refinement (needed for .partial())
const ProjectFormBaseSchema = z.object({
   name: z.string().min(1, "Name is required"),
   description: z.string().optional(),
   status: ProjectStatusEnum,
   url: z.string().optional(),
   repositoryUrl: z.string().optional(),
   databaseUrl: z.string().optional(),
   topics: z.string().optional(),
});

// Full schema with refinement
export const ProjectFormSchema = ProjectFormBaseSchema.refine((val) => {
   if (val.topics) val.topics = val.topics.trim();
   return true;
});
export type ProjectFormData = z.infer<typeof ProjectFormSchema>;

// Partial schema derived from base (without refinement)
export const UpdateProjectFormSchema = ProjectFormBaseSchema.partial();
export type UpdateProjectFormData = z.infer<typeof UpdateProjectFormSchema>;
