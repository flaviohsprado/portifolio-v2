import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignFormData, SignFormSchema } from "@portifolio-v2/config/schemas";
import { useRouter } from "@tanstack/react-router";
import { ArrowRight, Monitor, Power, ScanFace, UserRound } from "lucide-react";
import { type FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

export function SignIn() {
	const router = useRouter();

	const form = useForm<SignFormData>({
		resolver: zodResolver(SignFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: SignFormData) => {
		try {
			const result = await signIn.email({
				email: data.email,
				password: data.password,
			});

			if (result.error) {
				toast.error(
					result.error.message ||
					"Invalid email or password. Please try again.",
				);
			} else {
				router.navigate({ to: "/desktop" });
			}
		} catch {
			toast.error("An unexpected error occurred. Please try again.");
		}
	};

	const onInvalid = (errors: FieldErrors<z.infer<typeof SignFormSchema>>) => {
		console.error("Invalid form data", form.getValues());
		void form.trigger();
		console.error("Form errors", errors);
	};

	return (
		<div className="relative min-h-screen min-w-screen overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: 'url("/images/win10-wallpaper.jpg")',
					filter: "blur(8px)",
				}}
			/>
			<div className="absolute inset-0 bg-black/20" />

			{/* Main Login Interface */}
			<div className="relative z-10 flex min-h-screen items-center justify-center">
				<div className="flex flex-col items-center space-y-6">
					<div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray-700 shadow-lg">
						<UserRound className="w-20 h-20 text-white" />
					</div>

					{/* Login Form */}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit, onInvalid)}
							className="space-y-4"
						>
							<div className="space-y-4">
								<div className="relative">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<input
														placeholder="Email"
														{...field}
														value={field.value}
														onChange={(e) => field.onChange(e.target.value)}
														type="email"
														className="h-9 w-80 rounded-none border-none px-2 text-black placeholder-gray-400 focus:border-none focus:outline-none focus:ring-0 focus:bg-white!"
														style={{
															backgroundColor: "white",
															background: "white",
															border: "2px solid #9a9a9a",
														}}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{/* Password Field */}
								<div className="relative">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="Password"
														{...field}
														value={field.value}
														onChange={(e) => field.onChange(e.target.value)}
														type="password"
														className="h-9 w-80 rounded-none border-2 border-gray-400 bg-gray-600 px-2 text-gray-300 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button
										type="submit"
										className="size-9 absolute opacity-50 hover:opacity-100 right-0 top-1/2 -translate-y-1/2 rounded-none border-none bg-gray-400 text-white hover:bg-gray-600 focus:outline-none"
									>
										<ArrowRight className="size-5" />
									</Button>
								</div>
							</div>
						</form>
					</Form>

					{/* Guest Access Button */}
					<Button
						type="button"
						variant="ghost"
						onClick={() => router.navigate({ to: "/desktop" })}
						className="mt-4 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
					>
						Sign in as Guest
						<ArrowRight className="ml-2 size-4" />
					</Button>
				</div>
			</div>

			<div className="absolute bottom-6 right-6 z-10 flex gap-2">
				<Button
					variant="ghost"
					className="rounded-none text-white hover:bg-white/10 focus:outline-none"
				>
					<Monitor className="size-6 text-white hover:text-white/80" />
				</Button>
				<Button
					variant="ghost"
					className="rounded-none text-white hover:bg-white/10 focus:outline-none"
				>
					<ScanFace className="size-6 text-white hover:text-white/80" />
				</Button>
				<Button
					variant="ghost"
					className="rounded-none text-white hover:bg-white/10 focus:outline-none"
				>
					<Power className="size-6 text-white hover:text-white/80" />
				</Button>
			</div>
		</div>
	);
}
