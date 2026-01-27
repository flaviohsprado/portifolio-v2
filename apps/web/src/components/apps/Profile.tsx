import { ScrollArea } from "@/components/ui/scroll-area";
import { RESUME_DATA } from "@/lib/constants";
import {
	Briefcase,
	Building2,
	Calendar,
	GraduationCap,
	Mail,
	MapPin,
	User,
} from "lucide-react";
import { useState } from "react";

type Tab = "overview" | "experience" | "education";

export function ProfileApp() {
	const [activeTab, setActiveTab] = useState<Tab>("overview");

	return (
		<div className="flex h-full bg-win-bg-window text-win-text-main">
			{/* Sidebar (Menu Lateral estilo Settings) */}
			<div className="w-48 bg-win-bg-panel border-r border-win-border flex flex-col pt-4">
				<SidebarItem
					active={activeTab === "overview"}
					icon={<User />}
					label="Visão Geral"
					onClick={() => setActiveTab("overview")}
				/>
				<SidebarItem
					active={activeTab === "experience"}
					icon={<Briefcase />}
					label="Experiência"
					onClick={() => setActiveTab("experience")}
				/>
				<SidebarItem
					active={activeTab === "education"}
					icon={<GraduationCap />}
					label="Educação"
					onClick={() => setActiveTab("education")}
				/>
			</div>

			{/* Content Area */}
			<div className="flex-1 overflow-hidden bg-win-bg-window">
				<ScrollArea className="h-full">
					<div className="p-8 max-w-3xl mx-auto">
						{activeTab === "overview" && (
							<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
								<div className="flex items-center gap-6">
									<div className="size-24 rounded-full bg-win-bg-surface border-2 border-win-border flex items-center justify-center overflow-hidden">
										{/* Coloque sua foto aqui */}
										<User className="size-12 text-win-text-muted" />
									</div>
									<div>
										<h1 className="text-3xl font-light">
											{RESUME_DATA.profile.name}
										</h1>
										<p className="text-xl text-win-accent">
											{RESUME_DATA.profile.title}
										</p>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<InfoCard
										icon={<Mail />}
										label="Email"
										value={RESUME_DATA.profile.email}
									/>
									<InfoCard
										icon={<MapPin />}
										label="Local"
										value={RESUME_DATA.profile.location}
									/>
								</div>

								<div className="space-y-2">
									<h3 className="text-lg font-medium border-b border-win-border pb-2">
										Sobre
									</h3>
									<p className="text-win-text-muted leading-relaxed">
										{RESUME_DATA.profile.about}
									</p>
								</div>
							</div>
						)}

						{activeTab === "experience" && (
							<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
								<h2 className="text-2xl font-light mb-6">
									Histórico Profissional
								</h2>

								<div className="relative border-l border-win-border ml-3 space-y-10 pb-4">
									{RESUME_DATA.experience.map((job, index) => (
										<div key={index} className="pl-8 relative">
											{/* Timeline Dot */}
											<div className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-win-accent ring-4 ring-win-bg-window" />

											<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
												<h3 className="text-lg font-medium">{job.role}</h3>
												<span className="text-xs font-mono text-win-text-muted bg-win-bg-surface px-2 py-1 rounded">
													{job.period}
												</span>
											</div>

											<div className="flex items-center gap-2 text-win-accent mb-3">
												<Building2 className="size-4" />
												<span className="text-sm font-medium">
													{job.company}
												</span>
											</div>

											<p className="text-sm text-win-text-muted mb-4">
												{job.description}
											</p>

											{/* Impact List */}
											<div className="bg-win-bg-surface/30 rounded-sm p-3 border border-win-border/50">
												<p className="text-xs font-semibold text-white mb-2 uppercase tracking-wider">
													Principais Impactos
												</p>
												<ul className="list-disc list-inside space-y-1">
													{job.impact.map((item, i) => (
														<li
															key={i}
															className="text-sm text-win-text-muted pl-1"
														>
															{item}
														</li>
													))}
												</ul>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{activeTab === "education" && (
							<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
								<h2 className="text-2xl font-light mb-6">Formação Acadêmica</h2>
								<div className="grid gap-4">
									{RESUME_DATA.education.map((edu, i) => (
										<div
											key={i}
											className="bg-win-bg-surface p-4 border border-win-border flex items-start gap-4"
										>
											<div className="p-3 bg-win-bg-panel rounded-full">
												<GraduationCap className="size-6 text-win-accent" />
											</div>
											<div>
												<h3 className="font-medium">{edu.school}</h3>
												<p className="text-sm text-white/80">{edu.degree}</p>
												<div className="flex items-center gap-2 mt-2 text-xs text-win-text-muted">
													<Calendar className="size-3" />
													<span>{edu.period}</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}

interface SidebarItemProps {
	active: boolean;
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}

function SidebarItem({ active, icon, label, onClick }: SidebarItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors relative
        ${active ? "bg-win-bg-surface text-white" : "text-win-text-muted hover:bg-win-hover-control hover:text-white"}
      `}
		>
			{active && (
				<div className="absolute left-0 top-0 bottom-0 w-1 bg-win-accent" />
			)}
			<span className={active ? "text-win-accent" : ""}>{icon}</span>
			<span>{label}</span>
		</button>
	);
}

interface InfoCardProps {
	icon: React.ReactNode;
	label: string;
	value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
	return (
		<div className="bg-win-bg-surface p-4 border border-win-border flex items-center gap-4">
			<div className="p-2 bg-win-bg-panel rounded">{icon}</div>
			<div>
				<p className="text-xs text-win-text-muted uppercase">{label}</p>
				<p className="text-sm font-medium select-all">{value}</p>
			</div>
		</div>
	);
}
