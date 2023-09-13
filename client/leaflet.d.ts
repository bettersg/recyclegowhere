import { Leaflet } from "leaflet";

// leaflet.d.ts
declare global {
	interface Window {
		L: Leaflet; // Adjust this type based on Leaflet's actual types if available
	}
}

export {};
