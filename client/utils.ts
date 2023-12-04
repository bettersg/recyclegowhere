import { Categories, Methods } from "api/sheety/enums";
import { TItemSelection, TStateFacilities } from "app-context/SheetyContext/types";
import {
	AddressOption,
	RecyclingLocationResults,
	TResult,
} from "app-context/UserSelectionContext/types";
import { LatLngExpression } from "leaflet";

const EARTH_RADIUS = 6371; // Radius of the earth in km
export const MAX_DISTANCE_KM = 1; // Maximum distance from your location to facility

const usersCategories = (
	items: TItemSelection[],
	getItemCategory: (itemName: string) => Categories,
): Set<[Categories, Methods]> => {
	const itemSet = new Set<[Categories, Methods]>();
	items.map((item) => {
		const category = getItemCategory(item.name);
		itemSet.add([category, item.method]);
	});
	return itemSet;
};

export const getNearbyFacilities = (
	items: TItemSelection[],
	address: AddressOption,
	facilities: TStateFacilities[],
	getItemCategory: (itemName: string) => Categories,
	maxDistance: number,
): RecyclingLocationResults => {
	const res: Record<string, TResult> = {};
	const allFacilityIds: number[] = [];
	const userCats = usersCategories(items, getItemCategory);
	const allFacilities: TStateFacilities[] = [];
	const distances = new Map<number, number>();

	// For each category that we have, find facilities that take in that item
	for (const item of userCats) {
		const [cat, method] = item;

		let blueBinCount = 0;

		const relevantFacilities = facilities.filter((facility) => {
			const { id, methodsAccepted, categoriesAccepted, latitude, longitude } = facility;
			if (methodsAccepted.includes(method) && categoriesAccepted.includes(cat)) {
				const distance = calculateDistance(
					Number(address.coordinates.lat),
					Number(address.coordinates.long),
					latitude,
					longitude,
				);

				if (distance < maxDistance) {
					facility.channelName === "Blue Bin" && blueBinCount++;
					if (blueBinCount > 5) {
						return false;
					}
					distances.set(id, distance);
					allFacilityIds.push(id);
					allFacilities.push(facility);
					return true;
				}
			}
			return false;
		});

		// Sort facilities by distance
		relevantFacilities.sort((a, b) => {
			const distA = distances.get(a.id) as number;
			const distB = distances.get(b.id) as number;

			return distA - distB;
		});
		if (cat === Categories.RECYCLABLE) {
			res[cat] = {
				facilities: relevantFacilities
					.map((facility) => ({
						id: facility.id,
						distance: distances.get(facility.id) as number,
						latlng: [facility.latitude, facility.longitude] as LatLngExpression,
					}))
					.slice(0, 5),
			};
		} else {
			res[cat] = {
				facilities: relevantFacilities.map((facility) => ({
					id: facility.id,
					distance: distances.get(facility.id) as number,
					latlng: [facility.latitude, facility.longitude] as LatLngExpression,
				})),
			};
		}
	}
	// Sort facilities by distance
	allFacilities.sort((a, b) => {
		const distA = distances.get(a.id) as number;
		const distB = distances.get(b.id) as number;

		return distA - distB;
	});
	console.log(allFacilities);
	const route = dijkstra(allFacilities, address, userCats);

	return {
		results: res,
		facilitiesList: allFacilityIds,
		route: route,
	};
};

/**
 * returns distance in km
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
	/* thank you ChatGPT */
	/* using Haversine formula */
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);

	/* square of the half the chord length between the points */
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

	/* angular distance between the points in radians */
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	/* distance in km */
	return EARTH_RADIUS * c;
}

function toRad(degrees: number) {
	return (degrees * Math.PI) / 180;
}

// Dijkstra's Algorithm

type Node = number;

interface Edge {
	nextNode: Node;
	nextDistance: number;
	items: [Categories, Methods][];
}

interface PQEdge {
	node: Node;
	distance: number;
	itemsCleared: Set<[Categories, Methods]>;
}

// Graph where one Node will have multiple edges
type Graph = Record<Node, Edge[]>;

class PriorityQueue {
	private queue: Array<PQEdge>;
	constructor() {
		this.queue = [];
	}

	enqueue(item: PQEdge, userCats: Set<[Categories, Methods]>) {
		// Check if the node already exists in the queue
		const existingIndex = this.queue.findIndex((element) => element.node === item.node);

		if (existingIndex !== -1) {
			// If the node exists, update its distance
			if (item.distance < this.queue[existingIndex].distance) {
				this.queue[existingIndex].distance = item.distance;
			}
			if (item.itemsCleared.size > this.queue[existingIndex].itemsCleared.size) {
				this.queue[existingIndex].itemsCleared = item.itemsCleared;
			}
		} else {
			// If the node doesn't exist, simply enqueue the new item
			this.queue.push(item);
		}

		// Re-sort the queue based on the updated distance
		console.log("this priority");
		console.log((userCats.size / item.itemsCleared.size) * item.distance);
		console.log("---");
		this.queue.sort((a, b) => {
			const aPriority = a.distance * (userCats.size / a.itemsCleared.size);
			const bPriority = b.distance * (userCats.size / b.itemsCleared.size);

			return aPriority - bPriority;
		});
		console.log("priority queue:");
		for (const node of this.queue) {
			console.log(node.distance * (userCats.size / node.itemsCleared.size));
		}

		console.log(JSON.stringify(this.queue));
	}
	dequeue() {
		return this.queue.shift();
	}

	isEmpty() {
		return this.queue.length === 0;
	}
}

// Construction of the Adjacency List for Dijkstra's Algorithm
const constructAdjList = (
	relevantFacilities: TStateFacilities[],
	address: AddressOption,
	userCats: Set<[Categories, Methods]>,
) => {
	// Initialise adjacency list
	const graph: Graph = {};

	// Initialise list for user location, identified with placeholder ID 123456
	const start = address;
	const startingID = 123456;
	graph[startingID] = [];
	// Iterate through all facilities and create an Edge in the Graph from user location to the facility
	for (const nearbyFacility of relevantFacilities) {
		const nextDistance = calculateDistance(
			Number(start.coordinates.lat),
			Number(start.coordinates.long),
			nearbyFacility.latitude,
			nearbyFacility.longitude,
		);
		const items: [Categories, Methods][] = [];
		// If the nearby facilities take in your item, and it is the same method, track that this facility takes this item of yours
		for (const cat of userCats) {
			if (
				nearbyFacility.categoriesAccepted.includes(cat[0] as Categories) &&
				nearbyFacility.methodsAccepted.includes(cat[1] as Methods)
			) {
				items.push(cat);
			}
		}
		// Create an edge from user's location to this facility
		const edge: Edge = {
			nextNode: nearbyFacility.id,
			nextDistance,
			items,
		};
		graph[startingID].push(edge);
	}
	// Initialise list for every facility, identified with their own ID
	for (const facility of relevantFacilities) {
		graph[facility.id] = [];
		// Iterate through all facilities and create an Edge in the Graph from every facility to every other facility
		for (const nearbyFacility of relevantFacilities) {
			if (nearbyFacility.id !== facility.id && facility.categoriesAccepted) {
				const nextDistance = calculateDistance(
					facility.latitude,
					facility.longitude,
					nearbyFacility.latitude,
					nearbyFacility.longitude,
				);
				const items: [Categories, Methods][] = [];
				// If the nearby facilities take in your item, and it is the same method, add to the items
				for (const cat of userCats) {
					if (
						nearbyFacility.categoriesAccepted.includes(cat[0] as Categories) &&
						nearbyFacility.methodsAccepted.includes(cat[1] as Methods)
					) {
						// If the next facility takes the same thing as the current facility, do not take it into account
						items.push(cat);
					}
				}
				// Create an edge from this facility to every facility
				const edge: Edge = {
					nextNode: nearbyFacility.id,
					nextDistance,
					items,
				};
				graph[facility.id].push(edge);
			}
		}
	}
	return graph;
};

const dijkstra = (
	relevantFacilities: TStateFacilities[],
	address: AddressOption,
	userCats: Set<[Categories, Methods]>,
): RecyclingLocationResults["route"] => {
	// console.log(relevantFacilities);
	// Create adjacency list
	const adjList = constructAdjList(relevantFacilities, address, userCats);
	console.log(adjList);
	// Track parent of each node
	const parentsMap = new Map<number, number>();
	const visitedMap = new Map<number, number>();
	const distanceMap = new Map<number, number>();
	for (const facility of relevantFacilities) {
		distanceMap.set(facility.id, Infinity);
		parentsMap.set(facility.id, -1);
		visitedMap.set(facility.id, 0);
	}
	const itemSet = new Set<[Categories, Methods][]>();
	// Create priority queue for finding optimum location using a Greedy heuristic
	const priorityQueue = new PriorityQueue();
	// Enqueue the user Node
	priorityQueue.enqueue({ node: 123456, distance: 0, itemsCleared: new Set() }, userCats);
	let furthestNode: Edge = { nextNode: -1, nextDistance: 0, items: [] };

	// Go through all the nearest nodes to you until you find a set of nodes that clear all your items
	while (!priorityQueue.isEmpty()) {
		// Dequeue the shortest node
		const { node, distance, itemsCleared } = priorityQueue.dequeue() as PQEdge;
		console.log("Dequeueing...");
		const facility = relevantFacilities.find((facility) => facility.id === node);
		if (facility) {
			console.log(`Source node: ${facility.channelName}, ${node}`);
		} else {
			console.log(`Source node: User`);
		}
		console.log(JSON.stringify(priorityQueue));
		for (const item of itemsCleared) {
			console.log("Item: " + item[0] + " " + item[1]);
		}

		visitedMap.set(node, 1);

		// EARLY END CONDITION: All items cleared
		if (itemsCleared.size === userCats.size) {
			// Reconstruct the path by backtracking from the destination node to the source node
			const path: Node[] = [];
			let backtrackNode: number = node;
			while (backtrackNode !== 123456) {
				path.unshift(backtrackNode);
				backtrackNode = parentsMap.get(backtrackNode) as number;
			}
			path.unshift(123456);
			const coords: [number, number][] = [
				[+address.coordinates.lat, +address.coordinates.long],
			];
			for (const node of path) {
				if (node !== 123456) {
					const facility = relevantFacilities.find((facility) => facility.id === node);
					if (facility) {
						coords.push([facility.latitude, facility.longitude]);
					}
				}
			}
			return { path, distance, coords, complete: true };
		}

		// NORMAL FLOW: look through each neighbour
		const currentNode = node;
		for (const { nextNode, nextDistance, items } of adjList[currentNode]) {
			console.log("Looking at neighbour:");
			const facility = relevantFacilities.find((facility) => facility.id === nextNode);
			if (facility) {
				console.log(
					`Neighbour node: ${facility.channelName}, ${nextNode}, total dist = ${
						distance + nextDistance
					}`,
				);
			}
			const updatedItemsCleared = new Set(itemsCleared);
			console.log(items);
			// Track if a new item is added
			if (items) {
				for (const item of items) {
					updatedItemsCleared.add(item);
				}
			}

			// // ISSUE: If we have explored the nearest facility that is a Blue Bin, we do not want to explore other Blue Bins.
			// if (itemSet.has(items)) {
			// 	continue;
			// } else {
			// 	itemSet.add(items);
			// }
			const nextNodeOrigDistance = distanceMap.get(nextNode) as number;
			const updatedDistance = distance + nextDistance;
			// If it is not visited
			// If this neighbouring node takes an item that the current one does not, add to the set of items cleared
			// OR, if the distance is smaller than original - update the node
			if (
				visitedMap.get(nextNode) !== 1 &&
				updatedItemsCleared.size > itemsCleared.size &&
				updatedDistance < nextNodeOrigDistance
			) {
				// const facility = relevantFacilities.find((facility) => facility.id === node);
				// if (facility) {
				// 	console.log(`Considering node: ${facility.channelName}`);
				// }
				// FurthestNode is used to track the last node accessed, in the case of incomplete routing.
				furthestNode = { nextNode, nextDistance, items };
				// Track the distances and parents of the newly updated ndoe
				distanceMap.set(node, updatedDistance);
				parentsMap.set(nextNode, currentNode);
				// If the node is already in the PQ, update it - else, add it into the PQ. It will auto sort.
				console.log("Enqueueing with updated items:");
				console.log(updatedItemsCleared);
				priorityQueue.enqueue(
					{
						node: nextNode,
						distance: updatedDistance,
						itemsCleared: updatedItemsCleared,
					},
					userCats,
				);
			}
		}
		// console.log("Moving on to next");
	}
	// EDGE CASE: If there are no facilities that take your items
	if (furthestNode.nextNode === -1) {
		return { path: [], distance: 0, coords: [[0, 0]], complete: false };
	}
	// EDGE CASE: If the loop completes without finding a path, return the most complete path
	const path: Node[] = [];
	let backtrackNode: number = furthestNode.nextNode;
	while (backtrackNode !== 123456) {
		path.unshift(backtrackNode);
		backtrackNode = parentsMap.get(backtrackNode) as number;
	}
	const distance = furthestNode.nextDistance;
	path.unshift(123456);
	const coords: [number, number][] = [[+address.coordinates.lat, +address.coordinates.long]];
	for (const node of path) {
		if (node !== 123456) {
			const facility = relevantFacilities.find((facility) => facility.id === node);
			if (facility) {
				coords.push([facility.latitude, facility.longitude]);
			}
		}
	}
	return { path, distance, coords, complete: false };
};
