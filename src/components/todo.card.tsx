import { toggleCompleted } from "@/actions/todo.actions";
import { IToDoItem } from "@/models/todo.item.model";
import { useRef } from "react";

type Props = {
	item: IToDoItem;
};
function ToDoCard({ item }: Props) {
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<div className="card w-full card-sm shadow-sm bg-white rounded-none border-[0.5px] border-gray-300 first:rounded-t-2xl first:rounded-b-none last:rounded-b-2xl last:rounded-t-none">
			<div className="card-body flex flex-row items-center justify-between">
				<form
					ref={formRef}
					action={toggleCompleted}
					className="flex items-center gap-4"
				>
					<input type="hidden" name="id" value={item.objectId} />
					<input
						name="is_completed"
						type="checkbox"
						className="checkbox checkbox-primary"
						checked={item.is_completed}
						onChange={() => {
							formRef.current?.requestSubmit();
						}}
					/>
					<h2
						className={`card-title font-black ${
							item.is_completed ? "line-through" : ""
						}`}
					>
						{item.title}
					</h2>
				</form>
				<button
					disabled={!item.is_completed}
					className="btn btn-sm btn-outline btn-error"
					onClick={() => {
						// Handle delete task
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
}
export default ToDoCard;
