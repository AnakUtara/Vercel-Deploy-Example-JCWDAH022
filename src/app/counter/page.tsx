"use client";

import { useUser } from "@/context/user.context";
import useCounter from "@/hooks/useCounter";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

// type Props = {}
function CounterPage() {
	const user = useUser();
	const { count, incr, decr } = useCounter();
	const [number, setNumber] = useState<number>(0);
	const [name, setName] = useState<string>("");
	const renderCount = useRef<number>(0);
	const textInputRef = useRef<null | HTMLInputElement>(null);
	const fileInputRef = useRef<null | HTMLInputElement>(null);

	useEffect(() => {
		renderCount.current = renderCount.current + 1;
	}, [name, count, number]);

	const isNumberEvenExtreme = useMemo(() => {
		console.log("Calculating if number is even or odd...");
		let i = 0;
		while (i < 2000000) {
			i++;
		}
		return number % 2 === 0;
	}, [number]);

	return (
		<div className="container mx-auto h-screen bg-white dark:bg-black">
			<div className="flex flex-col justify-center items-center h-full">
				<h1 className="text-3xl font-bold text-white mb-4">Counter: {count}</h1>
				<div className="flex gap-4 mb-4">
					<button className="btn btn-primary" onClick={decr}>
						Decrement
					</button>
					<button className="btn btn-primary" onClick={incr}>
						Increment
					</button>
				</div>
				<h1 className="text-3xl font-bold text-white mb-4">Number: {number}</h1>
				<div className="flex gap-4 mb-4">
					<button
						className="btn btn-primary"
						onClick={() => setNumber(number - 1)}
					>
						Decrement
					</button>
					<button
						className="btn btn-primary"
						onClick={() => setNumber(number + 1)}
					>
						Increment
					</button>
					<p className="text-white">{isNumberEvenExtreme ? "Even" : "Odd"}</p>
				</div>
				<div>
					<div className="avatar">
						<div className="w-24 rounded">
							<Image
								onClick={() => fileInputRef.current?.click()}
								width={96}
								height={96}
								alt="avatar"
								src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
							/>
						</div>
					</div>
					<input ref={fileInputRef} type="file" className="hidden" />
					<input
						ref={textInputRef}
						type="text"
						className="input input-primary text-white"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<p className="text-lg text-white">Name: {name}</p>
					<p className="text-lg text-white">Rendered: {renderCount.current}</p>
					<button
						className="btn btn-active"
						onClick={() => textInputRef.current?.focus()}
					>
						Focus Input
					</button>
					<div>
						<h3>User Info</h3>
						<input
							type="text"
							className="input input-primary text-white mb-2"
							value={user?.user.name}
							onChange={(e) =>
								user?.setUser({ ...user.user, name: e.target.value })
							}
						/>
						<input
							type="text"
							className="input input-primary text-white mb-2"
							value={user?.user.email}
							onChange={(e) =>
								user?.setUser({ ...user.user, email: e.target.value })
							}
						/>
						<p className="text-lg text-white">Name: {user?.user.name}</p>
						<p className="text-lg text-white">Email: {user?.user.email}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CounterPage;
