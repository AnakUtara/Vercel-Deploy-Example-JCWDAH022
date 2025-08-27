import { usePasswordMask } from "@/hooks/usePasswordMask";

type Props = {
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
};
function PasswordInput({ password, setPassword }: Props) {
	const { visibility, toggleMask } = usePasswordMask();
	return (
		<span className="flex items-center gap-4">
			<input
				type={visibility ? "text" : "password"}
				className="input input-bordered w-full text-white"
				placeholder="Enter your password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button
				className={`btn btn-sm btn-primary ${
					visibility ? "btn-secondary" : "btn-primary"
				}`}
				onClick={toggleMask}
			>
				{visibility ? "Hide" : "Show"}
			</button>
		</span>
	);
}
export default PasswordInput;
