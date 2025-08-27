import axios from "axios";
import {
	NEXT_PUBLIC_BACKENDLESS_API_BASE_URL,
	NEXT_PUBLIC_BACKENDLESS_API_KEY,
	NEXT_PUBLIC_BACKENDLESS_APP_ID,
} from "../backendless/backendless.config";

const backendlessAxios = axios.create({
	baseURL: `${NEXT_PUBLIC_BACKENDLESS_API_BASE_URL}/${NEXT_PUBLIC_BACKENDLESS_APP_ID}/${NEXT_PUBLIC_BACKENDLESS_API_KEY}`,
	headers: { "Content-Type": "application/json" },
});

export default backendlessAxios;
