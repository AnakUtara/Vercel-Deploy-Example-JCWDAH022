"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store/store";
import PasswordInput from "../components/password.input";

export default function RegisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState<string>("");
	const user = useSelector((state: RootState) => state.user);
	const router = useRouter();

	useEffect(() => {
		document.title = "Register - To Do App";
	}, []);

	useEffect(() => {
		if (user.isLoggedIn) {
			router.replace("/");
		}
	}, [user.isLoggedIn, router]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const name = email.split("@")[0];
		// Save user to localStorage only (do not sign in)
		const userData = { name, email, password };
		const oldUserData = localStorage.getItem("demoUser");
		if (oldUserData !== null && JSON.parse(oldUserData).email === email) {
			alert(
				"User already registered with this email. Please use a different email."
			);
			return;
		}
		localStorage.setItem("demoUser", JSON.stringify(userData));
		alert("Registration successful! You can now log in.");
		setEmail("");
		setPassword("");
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-base-200">
			<div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
						Register
					</button>
				</form>
				<div className="text-center mt-4">
					<span className="text-sm">Already have an account? </span>
					<Link href="/auth/login" className="link link-primary">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
