import {
	ProjectFormSchema,
	UpdateProjectFormSchema,
} from "@portifolio-v2/config/schemas";
import { project } from "@portifolio-v2/db/schema/index";
import { asc, eq } from "drizzle-orm";
import z from "zod";
import { protectedProcedure, publicProcedure, router } from "..";

export const projectRouter = router({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.query.project.findMany({
			orderBy: [asc(project.name)],
		});
	}),

	find: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			return await ctx.db.query.project.findFirst({
				where: eq(project.id, input.id),
			});
		}),

	getProjectOptions: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.query.project.findMany({
			columns: {
				id: true,
				name: true,
			},
		});
	}),

	create: protectedProcedure
		.input(ProjectFormSchema)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.insert(project).values(input);
		}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				data: UpdateProjectFormSchema,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.update(project)
				.set(input.data)
				.where(eq(project.id, input.id));
		}),
});
