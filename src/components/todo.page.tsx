"use client";

import { IToDoItem } from "@/models/todo.item.model";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/user.slice";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store/store";
import ToDoCard from "./todo.card";
import ToDoForm from "./todo.form";

type Props = {
	todos: IToDoItem[];
};
function ToDoPage({ todos }: Props) {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		if (!user.isLoggedIn) {
			router.replace("/auth/login");
		}
	}, [user.isLoggedIn, router]);

	return (
		<>
			<div className="w-full text-center py-2 bg-base-200 text-base-content flex flex-col items-center gap-2">
				{user.isLoggedIn ? (
					<div className="flex items-center gap-4">
						<span>
							Logged in as <b>{user.name}</b> ({user.email})
						</span>
						<button
							className="btn btn-sm btn-outline btn-error"
							onClick={() => dispatch(logout())}
						>
							Logout
						</button>
					</div>
				) : (
					<span>Not logged in</span>
				)}
			</div>
			<header
				className="hero min-h-[240px]"
				style={{
					backgroundImage: "url(/images/kufaku.jpg)",
					backgroundSize: "contain",
					backgroundPosition: "center",
				}}
			>
				<div className="hero-overlay bg-purple-800/50"></div>
				<ToDoForm />
			</header>
			<main className="relative -top-8 w-sm sm:w-md md:w-lg mx-auto px-4 flex items-center flex-col h-full">
				{todos.map((item: IToDoItem) => (
					<ToDoCard
						key={item.objectId}
						{...{
							item,
						}}
					/>
				))}
			</main>
		</>
	);
}
export default ToDoPage;
