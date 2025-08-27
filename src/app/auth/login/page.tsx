"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/user.slice";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store/store";
import PasswordInput from "../components/password.input";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState<string>("");
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);
	const router = useRouter();

	useEffect(() => {
		document.title = "Login - To Do App";
	}, []);

	useEffect(() => {
		if (user.isLoggedIn) {
			router.replace("/");
		}
	}, [user.isLoggedIn, router]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const stored = localStorage.getItem("demoUser");
		if (!stored) {
			alert("No user registered. Please register first.");
			setEmail("");
			setPassword("");
			return;
		}
		const userData = JSON.parse(stored);
		if (userData.email === email && userData.password === password) {
			dispatch(login({ name: userData.name, email }));
		} else {
			alert("Invalid email or password.");
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-base-200">
			<div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							className="input input-bordered w-full text-white"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<PasswordInput {...{ password, setPassword }} />
					</div>
					<button className="btn btn-primary w-full mt-2" type="submit">
						Login
					</button>
				</form>
				<div className="text-center mt-4">
					<span className="text-sm">Don&apos;t have an account? </span>
					<Link href="/auth/register" className="link link-primary">
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}
