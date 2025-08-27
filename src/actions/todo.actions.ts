"use server";

import backendlessAxios from "@/libs/axios/axios.config";
import { IToDoItem } from "@/models/todo.item.model";
import { revalidatePath } from "next/cache";

export const toggleCompleted = async (formData: FormData) => {
	await backendlessAxios.put(`/data/todo_items/${formData.get("id")}`, {
		is_completed: formData.get("is_completed") === "on" ? true : false,
	});
	revalidatePath(`/`);
};

export const createToDo = async (formData: IToDoItem) => {
	await backendlessAxios.post("/data/todo_items", formData);
	revalidatePath(`/`);
};
