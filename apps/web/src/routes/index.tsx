import { SignIn } from "@/components/layout/Signin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

export default function Index() {
	//const { data: session, isPending } = useSession();

	return (
		<div className="flex justify-center items-center h-screen w-screen">
			<SignIn />
		</div>
	);
}
