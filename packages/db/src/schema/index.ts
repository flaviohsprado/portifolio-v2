import { ProjectStatus } from "@portifolio-v2/config";
import { index, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

export * from "./auth";

export const ProjectStatusEnum = pgEnum("project_status", ProjectStatus);

export const project = pgTable(
	"projects",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull(),
		description: text("description"),
		status: ProjectStatusEnum("status").notNull().default(ProjectStatus.ACTIVE),
		url: text("url"),
		repositoryUrl: text("repository_url"),
		topics: text("topics"),
	},
	(table) => [index("idx_projects_name").on(table.name)],
);

export type Project = typeof project.$inferSelect;
