"use client";

import backendlessAxios from "@/libs/axios/axios.config";
import { todoValidationSchema } from "@/libs/yup/todo.schema";
import { IToDoItem } from "@/models/todo.item.model";
import axios from "axios";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = object;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ToDoForm(_: Props) {
	type FormToDoItem = Omit<IToDoItem, "objectId">;
	const router = useRouter();

	const handleSubmit = async (data: FormToDoItem) => {
		try {
			await backendlessAxios.post("/data/todo_items", data);
			toast.success("To Do item created successfully!");
			router.refresh(); // This will re-fetch server data for the current route
		} catch (e) {
			console.error(e);
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			axios.isAxiosError(e)
				? toast.error(e.response?.data?.error?.message)
				: toast.error("Failed to create To Do item.");
		}
	};

	return (
		<div className="hero-content text-neutral-content w-sm sm:w-md md:w-lg">
			<div className="w-full">
				<h2 className="mb-2 md:mb-5 text-5xl tracking-wider font-bold text-white">
					TO DO
				</h2>
				<Formik
					initialValues={{
						title: "",
						is_completed: false,
					}}
					validationSchema={todoValidationSchema}
					onSubmit={handleSubmit}
				>
					{({
						errors,
						touched,
						getFieldProps,
						isSubmitting,
					}: FormikProps<FormToDoItem>) => (
						<Form className="flex flex-col gap-2 md:flex-row justify-center items-center">
							<input
								id="title"
								type="text"
								{...getFieldProps("title")}
								disabled={isSubmitting}
								placeholder={
									touched.title && errors.title
										? errors.title
										: "Type New To Do...."
								}
								className={`input w-full md:flex-1 bg-white input-lg ${
									touched.title && errors.title
										? "placeholder:text-red-500"
										: "placeholder:text-gray-600"
								} text-gray-600 focus:outline-0 focus:border-purple-500 focus:border-2 rounded-lg`}
							/>

							<button
								type="submit"
								disabled={isSubmitting}
								className="btn btn-primary w-full md:w-auto md:btn-lg rounded-lg"
							>
								{isSubmitting ? (
									<span className="loading loading-spinner"></span>
								) : null}
								{isSubmitting ? "Creating..." : "Create"}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
export default ToDoForm;
