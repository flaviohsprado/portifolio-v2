export type ExplorerItemType = "folder" | "file";

export interface ExplorerItem {
	id: string;
	name: string;
	type: ExplorerItemType;
	icon?: React.ReactNode;
	size?: string;
	dateModified?: string;
	children?: ExplorerItem[];
	content?: string;
}

export const FILE_SYSTEM: ExplorerItem[] = [
	{
		id: "quick-access",
		name: "Quick Access",
		type: "folder",
		children: [
			{ id: "desktop", name: "Desktop", type: "folder", dateModified: "Today" },
			{
				id: "downloads",
				name: "Downloads",
				type: "folder",
				dateModified: "Yesterday",
			},
			{
				id: "documents",
				name: "Documents",
				type: "folder",
				dateModified: "Last Week",
			},
			{
				id: "pictures",
				name: "Pictures",
				type: "folder",
				dateModified: "Last Month",
			},
		],
	},
	{
		id: "this-pc",
		name: "This PC",
		type: "folder",
		children: [
			{
				id: "c-drive",
				name: "Local Disk (C:)",
				type: "folder",
				size: "900 GB free",
				dateModified: "Now",
			},
			{
				id: "projects",
				name: "Projects",
				type: "folder",
				dateModified: "2024-01-20",
				children: [
					{
						id: "portifolio",
						name: "Portifolio-v2",
						type: "folder",
						dateModified: "2024-01-15",
					},
					{
						id: "ecommerce",
						name: "E-commerce App",
						type: "folder",
						dateModified: "2023-12-10",
					},
				],
			},
			{
				id: "certs",
				name: "Certificados",
				type: "folder",
				children: [
					{
						id: "cert-aws",
						name: "AWS-Architect.pdf",
						type: "file",
						size: "2.4 MB",
						dateModified: "2023-05-01",
					},
					{
						id: "cert-react",
						name: "React-Mastery.pdf",
						type: "file",
						size: "1.1 MB",
						dateModified: "2023-08-15",
					},
				],
			},
		],
	},
];

export const RESUME_DATA = {
	profile: {
		name: "Flávio Prado",
		role: "Senior FullStack Developer",
		bio: "Desenvolvedor apaixonado por criar experiências web imersivas e interfaces pixel-perfect. Especialista em React, Node.js e arquitetura de sistemas.",
		email: "contato@exemplo.com",
		location: "São Paulo, Brasil",
	},
	experience: [
		{
			company: "Tech Corp",
			role: "Senior Frontend Engineer",
			period: "2023 - Present",
			description: "Liderança técnica do time de Design System.",
		},
		{
			company: "StartUp Innovator",
			role: "Full Stack Developer",
			period: "2021 - 2023",
			description: "Desenvolvimento de MVP para fintech.",
		},
	],
	education: [
		{
			school: "Universidade Exemplo",
			degree: "Bacharelado em Ciência da Computação",
			period: "2017 - 2021",
		},
	],
	techStack: [
		"React",
		"TypeScript",
		"Node.js",
		"Next.js",
		"TailwindCSS",
		"PostgreSQL",
	],
};

export const ACCENT_COLORS = [
	"bg-[#0078d7]",
	"bg-[#e81123]",
	"bg-[#881798]",
	"bg-[#107c10]",
	"bg-[#e3008c]",
	"bg-[#00b294]",
	"bg-[#ff8c00]",
];

export const WALLPAPERS = [
	"/images/win10-wallpaper.jpg",
	"/images/win11-wallpaper.jpg",
	"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80",
	"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80",
	"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
];

export const resizeHandleClasses = {
	n: "top-0 left-0 right-0 h-1 cursor-ns-resize",
	s: "bottom-0 left-0 right-0 h-1 cursor-ns-resize",
	e: "top-0 bottom-0 right-0 w-1 cursor-ew-resize",
	w: "top-0 bottom-0 left-0 w-1 cursor-ew-resize",
	ne: "top-0 right-0 w-3 h-3 cursor-nesw-resize",
	nw: "top-0 left-0 w-3 h-3 cursor-nwse-resize",
	se: "bottom-0 right-0 w-3 h-3 cursor-nwse-resize",
	sw: "bottom-0 left-0 w-3 h-3 cursor-nesw-resize",
};
