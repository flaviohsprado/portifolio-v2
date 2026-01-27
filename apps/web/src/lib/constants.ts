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
		name: "Seu Nome",
		title: "Senior Full Stack Developer",
		email: "contato@exemplo.com",
		location: "São Paulo, Brasil",
		social: {
			github: "https://github.com/seuuser",
			linkedin: "https://linkedin.com/in/seuuser",
		},
		about:
			"Desenvolvedor apaixonado por criar experiências web imersivas e interfaces pixel-perfect. Especialista em React, Node.js e arquitetura de sistemas.",
	},
	experience: [
		{
			company: "Tech Corp",
			role: "Senior Frontend Engineer",
			period: "2023 - Presente",
			description: "Liderança técnica do time de Design System.",
			impact: [
				"Redução de 40% no tempo de desenvolvimento com novo Design System.",
				"Implementação de testes E2E que diminuíram bugs em produção em 25%.",
				"Mentoria de 3 desenvolvedores júnior.",
			],
		},
		{
			company: "StartUp Innovator",
			role: "Full Stack Developer",
			period: "2021 - 2023",
			description: "Desenvolvimento de MVP para fintech.",
			impact: [
				"Escalou a aplicação de 0 para 50k usuários.",
				"Integração com Open Finance APIs.",
			],
		},
	],
	education: [
		{
			school: "Universidade Exemplo",
			degree: "Bacharelado em Ciência da Computação",
			period: "2017 - 2021",
		},
	],
	certificates: [
		{ name: "AWS Solutions Architect", issuer: "Amazon", date: "2024" },
		{ name: "FullStack Master", issuer: "Rocketseat", date: "2023" },
	],
};

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
