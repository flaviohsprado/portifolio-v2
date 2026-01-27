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
import { ArrowRight, Power, ScanFace, UserRound, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { type FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

export function SignIn() {
	const router = useRouter();

	const [step, setStep] = useState<"lock" | "login">("lock");
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setDate(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	const handleUnlock = () => {
		setStep("login");
	};

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
				toast.error(result.error.message || "Invalid email or password.");
			} else {
				router.navigate({ to: "/desktop" });
			}
		} catch {
			toast.error("An unexpected error occurred.");
		}
	};

	const onInvalid = (errors: FieldErrors<z.infer<typeof SignFormSchema>>) => {
		console.error("Form errors", errors);
	};

	return (
		<div
			className="relative h-screen w-screen overflow-hidden font-segoe select-none focus:outline-none"
			onClick={step === "lock" ? handleUnlock : undefined}
			onKeyDown={() => step === "lock" && handleUnlock()}
		//tabIndex={0}
		>
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
				style={{
					backgroundImage: 'url("/images/win10-wallpaper.jpg")',
					filter: step === "login" ? "blur(15px) brightness(0.8)" : "none",
					transform: step === "login" ? "scale(1.05)" : "scale(1)",
				}}
			/>

			<div
				className={`
                    absolute inset-0 flex flex-col justify-end pb-24 pl-12 text-white transition-transform duration-700 ease-in-out z-20
                    ${step === "login" ? "-translate-y-full" : "translate-y-0"}
                `}
			>
				<div className="text-8xl font-thin tracking-wider mb-2 drop-shadow-md cursor-default">
					{date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
				</div>
				<div className="text-3xl font-light drop-shadow-md cursor-default">
					{date.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
				</div>
			</div>

			<div
				className={`
                    relative z-10 flex min-h-screen items-center justify-center transition-all duration-700 delay-100
                    ${step === "login" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
                `}
			>
				<div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
					<div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#333] shadow-2xl border-2 border-white/20">
						<UserRound className="w-16 h-16 text-gray-200" />
					</div>
					<div className="text-2xl text-white font-normal drop-shadow-md">
						{form.watch("email") || "Usuário"}
					</div>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit, onInvalid)}
							className="space-y-4 flex flex-col items-center"
						>
							<div className="space-y-0 w-80">
								<div className="relative mb-2">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<input
														placeholder="Email"
														{...field}
														className="h-9 w-full border-2 border-white/40 bg-black/30 px-3 text-white placeholder-white/60 focus:bg-white focus:text-black focus:border-white transition-colors outline-none"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="relative flex">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormControl>
													<Input
														placeholder="Password"
														{...field}
														type="password"
														className="h-9 w-full rounded-none border-2 border-white/40 bg-black/30 px-3 text-white placeholder-white/60 focus:bg-white focus:text-black focus:border-white focus:ring-0 transition-colors"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button
										type="submit"
										className="h-9 w-9 absolute right-0 top-0 rounded-none border-2 border-l-0 border-white/40 bg-gray-600/50 hover:bg-win-accent text-white hover:border-white transition-all"
									>
										<ArrowRight className="size-5" />
									</Button>
								</div>
							</div>
						</form>
					</Form>

					<Button
						type="button"
						variant="ghost"
						onClick={() => router.navigate({ to: "/desktop" })}
						className="mt-2 text-white/70 hover:text-white hover:bg-transparent transition-colors text-sm font-light"
					>
						Entrar como Visitante
					</Button>
				</div>
			</div>

			<div className="absolute bottom-8 right-8 z-30 flex gap-4">
				<Button variant="ghost" className="rounded-none text-white hover:bg-white/10 p-2 h-auto">
					<Wifi className="size-7" />
				</Button>
				<Button variant="ghost" className="rounded-none text-white hover:bg-white/10 p-2 h-auto">
					<ScanFace className="size-7" />
				</Button>
				<Button variant="ghost" className="rounded-none text-white hover:bg-white/10 p-2 h-auto">
					<Power className="size-7" />
				</Button>
			</div>
		</div>
	);
}