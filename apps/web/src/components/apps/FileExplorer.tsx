import { WindowsEmptyFolderIcon } from "@/components/ui/windows/empty-folder";
import {
	ChevronRight,
	Folder,
	HardDrive,
	Image,
	Monitor,
	Music,
	Pin,
	Video,
} from "lucide-react";

export function FileExplorerApp() {
	const quickAccessFolders = [
		{ name: "Desktop", icon: Monitor, pinned: true },
		{ name: "Downloads", icon: Folder, pinned: true },
		{ name: "Documents", icon: Folder, pinned: true },
		{ name: "Pictures", icon: Image, pinned: true },
	];

	const unpinnedFolders = [{ name: "Projects", icon: Folder }];

	const thisPcFolders = [
		{ name: "Desktop", icon: Folder },
		{ name: "Documents", icon: Folder },
		{ name: "Downloads", icon: Folder },
		{ name: "Pictures", icon: Image },
		{ name: "Music", icon: Music },
		{ name: "Videos", icon: Video },
	];

	const drives = [
		{
			name: "Local Disk (C:)",
			icon: HardDrive,
			free: "284 GB",
			total: "930 GB",
			used: 70,
			logo: "windows",
		},
		{
			name: "Local Disk (D:)",
			icon: HardDrive,
			free: "935 GB",
			total: "952 GB",
			used: 2,
			logo: "green",
		},
	];

	const mainFolders = [
		{ name: "Desktop", icon: Monitor },
		{ name: "Downloads", icon: Folder },
		{ name: "Music", icon: Music },
		{ name: "Documents", icon: Folder },
		{ name: "Pictures", icon: Image },
		{ name: "Videos", icon: Video },
	];

	return (
		<div className="flex flex-col h-full text-white">
			<div className="flex flex-1">
				{/* Sidebar */}
				<div className="w-64 border-r border-border">
					<div className="p-2">
						{/* Quick Access Section */}
						<div className="space-y-1">
							{quickAccessFolders.map((folder) => (
								<div
									key={folder.name}
									className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-700 cursor-pointer rounded"
								>
									{folder.pinned && <Pin className="h-3 w-3 text-blue-400" />}
									<folder.icon className="h-4 w-4 text-yellow-400" />
									<span className="text-sm">{folder.name}</span>
								</div>
							))}

							{unpinnedFolders.map((folder) => (
								<div
									key={folder.name}
									className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-700 cursor-pointer rounded"
								>
									<folder.icon className="h-4 w-4 text-yellow-400" />
									<span className="text-sm">{folder.name}</span>
								</div>
							))}
						</div>

						{/* This PC Section */}
						<div className="mt-4">
							<div className="flex items-center gap-3 px-2 py-1.5 bg-blue-600 cursor-pointer rounded">
								<Monitor className="h-4 w-4" />
								<span className="text-sm font-medium">Este Computador</span>
							</div>
							<div className="ml-4 mt-1 space-y-1">
								{thisPcFolders.map((folder) => (
									<div
										key={folder.name}
										className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-700 cursor-pointer rounded"
									>
										<ChevronRight className="h-3 w-3 text-gray-400" />
										<folder.icon className="h-4 w-4 text-yellow-400" />
										<span className="text-sm">{folder.name}</span>
									</div>
								))}
								<div className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-700 cursor-pointer rounded">
									<ChevronRight className="h-3 w-3 text-gray-400" />
									<HardDrive className="h-4 w-4 text-gray-400" />
									<span className="text-sm">Disco Local (C:)</span>
								</div>
								<div className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-700 cursor-pointer rounded">
									<ChevronRight className="h-3 w-3 text-gray-400" />
									<HardDrive className="h-4 w-4 text-gray-400" />
									<span className="text-sm">Disco Local (D:)</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="flex-1 p-6">
					{/* Folders Section */}
					<div className="mb-8">
						<h3 className="text-sm font-semibold text-muted-foreground mb-4">
							Folders (6)
						</h3>
						<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 gap-4">
							{mainFolders.map((folder) => (
								<div
									key={folder.name}
									className="w-24 flex flex-col items-center p-4 hover:bg-secondary/50 cursor-pointer rounded-none transition-colors"
								>
									<div className="w-16 h-16 rounded-none flex items-center justify-center mb-2">
										<WindowsEmptyFolderIcon className="h-16 w-16 text-background" />
									</div>
									<span className="text-sm text-center">{folder.name}</span>
								</div>
							))}
						</div>
					</div>

					{/* Devices and Drives Section */}
					<div>
						<h3 className="text-sm font-semibold text-muted-foreground mb-4">
							Devices and Drives (2)
						</h3>
						<div className="space-y-4">
							{drives.map((drive) => (
								<div
									key={drive.name}
									className="flex items-center gap-4 p-4 hover:bg-secondary/50 cursor-pointer rounded-none transition-colors"
								>
									<div className="w-12 h-12 rounded-none flex items-center justify-center">
										<HardDrive className="h-6 w-6 text-white" />
									</div>
									<div className="flex-1">
										<div className="text-sm font-medium mb-1">{drive.name}</div>
										<div className="w-full bg-secondary/50 rounded-none h-2 mb-1 border-1 border-white">
											<div
												className="bg-blue-500 h-2 rounded-none"
												style={{ width: `${drive.used}%` }}
											/>
										</div>
										<div className="text-xs text-gray-400">
											{drive.free} livre(s) de {drive.total}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
