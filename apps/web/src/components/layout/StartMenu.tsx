import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StartmenuFolderIcon } from "@/components/ui/windows/startmenu-folder";
import { WindowsStoreIcon } from "@/components/ui/windows/store";
import { signOut } from "@/lib/auth-client";
import { getStartMenuPosition } from "@/lib/boundary-utils";
import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
	Calculator,
	FileText,
	Image,
	Menu,
	Power,
	Settings,
	Store,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectDetailsApp } from "../apps/ProjectDetails";

interface StartMenuProps {
	isOpen: boolean;
	onClose: () => void;
	onOpenApp: (
		id: string,
		title: string,
		icon: React.ReactNode,
		component: React.ReactNode,
	) => void;
}

export function StartMenu({ isOpen, onClose, onOpenApp }: StartMenuProps) {
	const trpc = useTRPC();
	const navigate = useNavigate();

	const { data: projects = [] } = useQuery(trpc.project.get.queryOptions());

	const [position, setPosition] = useState({ x: 0, y: 0 });
	const menuWidth = 800;
	const menuHeight = 600;

	// Calculate position when menu opens
	useEffect(() => {
		if (isOpen) {
			const newPosition = getStartMenuPosition(menuWidth, menuHeight);
			setPosition(newPosition);
		}
	}, [isOpen]);

	const recentlyAddedApps = [
		{
			id: "calculator",
			name: "Calculator",
			icon: <Calculator className="size-4" />,
			color: "text-white",
			component: <div>Calculator</div>,
		},
	];

	const mappedProjects = projects.map((project) => ({
		id: project.id,
		name: project.name,
		icon: <StartmenuFolderIcon className="size-5.5" />,
		color: "text-white",
		component: <ProjectDetailsApp projectId={project.id} />,
	}));

	const exploreApps = [
		{
			id: "store",
			name: "Microsoft Store",
			icon: Store,
			color: "text-blue-500",
			component: <div>Microsoft Store</div>,
		},
	];

	const handleAppClick = (app: any) => {
		onOpenApp(app.id, app.name, app.icon.name, app.component);
		onClose();
	};

	const handleSignOut = () => {
		signOut();
		navigate({ to: "/" });
	};

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<button
				type="button"
				className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
				onClick={onClose}
				onKeyDown={(e) => e.key === "Enter" && onClose()}
				aria-label="Close start menu"
			/>

			{/* Start Menu */}
			<div
				className="fixed bg-[#232323] z-50 animate-in fade-in slide-in-from-bottom-4 fade-out slide-out-to-bottom-4 duration-200"
				style={{
					left: `${position.x}px`,
					top: `${position.y}px`,
					width: `${menuWidth}px`,
					height: `${menuHeight}px`,
				}}
			>
				<div className="flex h-full">
					{/* Left Navigation Bar */}
					<div className="w-12 flex flex-col items-center space-y-4 justify-between">
						<Button
							variant="ghost"
							size="icon"
							className="w-12 h-10 text-white hover:bg-[#555555]! hover:text-white! rounded-none"
						>
							<Menu className="h-5 w-5" />
						</Button>

						<div className="flex flex-col items-center justify-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								className="w-10 h-10 text-white hover:bg-[#555555]! hover:text-white! rounded-none"
							>
								<User className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="w-10 h-10 text-white hover:bg-[#555555]! hover:text-white! rounded-none"
							>
								<FileText className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="w-10 h-10 text-white hover:bg-[#555555]! hover:text-white! rounded-none"
							>
								<Image className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="w-10 h-10 text-white hover:bg-[#555555]! hover:text-white! rounded-none"
							>
								<Settings className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="w-10 h-10 text-white hover:bg-[#555555]! hover:text-white! rounded-none"
								onClick={handleSignOut}
							>
								<Power className="h-5 w-5" />
							</Button>
						</div>
					</div>

					{/* Main Content Area */}
					<div className="flex-1 flex">
						{/* Left Content */}
						<div className="flex-1 py-2">
							<ScrollArea className="h-148">
								<div className="mb-6">
									<h2 className="text-white text-xs font-light mb-4">
										Recent Added
									</h2>
									<div className="space-y-2 pb-2">
										{recentlyAddedApps.map((app) => (
											<Button
												key={app.id}
												variant="ghost"
												onClick={() => handleAppClick(app)}
												className="w-full justify-start text-white hover:bg-[#555555]! hover:text-white! rounded-none h-auto py-2 px-1"
											>
												<div className="rounded flex items-center justify-center mr-1">
													{app.icon}
												</div>
												<span className="text-xs font-light">{app.name}</span>
											</Button>
										))}
									</div>
									<h2 className="text-white text-xs font-light mb-4">A-Z</h2>
								</div>

								{/* Alphabetical List */}
								<div className="space-y-4">
									{mappedProjects.map((project) => (
										<div key={project.id}>
											<Button
												key={project.id}
												variant="ghost"
												onClick={() => handleAppClick(project)}
												className="w-full justify-start text-white hover:bg-[#555555]! hover:text-white! rounded-none h-auto py-2 px-1"
											>
												<div className="rounded flex items-center justify-center">
													<StartmenuFolderIcon className="size-5.5" />
												</div>
												<span className="text-xs font-light">
													{project.name}
												</span>
											</Button>
										</div>
									))}
								</div>
							</ScrollArea>
						</div>

						{/* Right Content - Explore Section */}
						<div className="w-80 p-6 border-l border-gray-700">
							<h2 className="text-white text-xs font-light mb-4">Explore</h2>
							<div className="grid grid-cols-1 gap-4">
								{exploreApps.map((app) => (
									<Button
										key={app.id}
										variant="ghost"
										//onClick={() => handleAppClick(app)}
										className="w-24 h-24 flex flex-col items-center justify-center bg-[#393939]! hover:bg-[#5c5c5c]! hover:border-3 hover:border-[#a8a8a8]! rounded-none py-2 px-1"
									>
										<div className="rounded flex items-center justify-center">
											<WindowsStoreIcon className="size-10" />
										</div>
										<span className="text-xs text-white font-light">
											{app.name}
										</span>
									</Button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
