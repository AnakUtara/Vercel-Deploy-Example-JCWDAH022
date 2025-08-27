import * as Yup from "yup";

export const todoValidationSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	is_completed: Yup.boolean(),
});
