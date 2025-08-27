import ToDoPage from "@/components/todo.page";
import backendlessAxios from "@/libs/axios/axios.config";
import { IToDoItem } from "@/models/todo.item.model";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "To Do Listtttt",
	description: "A simple to do list application",
};

export default async function Home() {
	const res = await backendlessAxios.get("/data/todo_items", {
		params: { sortBy: "created desc" },
	});
	const todos = res.data as IToDoItem[];

	return <ToDoPage {...{ todos }} />;
}
