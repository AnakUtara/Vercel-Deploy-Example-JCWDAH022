"use client";

import { createContext, useContext, useState } from "react";

interface IUser {
	name: string;
	email: string;
}

type UserContextType = {
	user: IUser;
	setUser: React.Dispatch<React.SetStateAction<IUser>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type Props = {
	children: React.ReactNode;
};

export function UserProvider({ children }: Props) {
	const [user, setUser] = useState<IUser>({ name: "", email: "" });
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () =>
	useContext<UserContextType | undefined>(UserContext);
