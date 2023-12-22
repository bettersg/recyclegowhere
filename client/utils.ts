import { Categories, Methods } from "api/sheety/enums";
import { TItemSelection, TStateFacilities } from "app-context/SheetyContext/types";
import {
	AddressOption,
	RecyclingLocationResults,
	TResult,
} from "app-context/UserSelectionContext/types";
import { LatLngExpression } from "leaflet";

const EARTH_RADIUS = 6371; // Radius of the earth in km
export const MAX_DISTANCE_KM = 3; // Maximum distance from your location to facility

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
	const blueBinFacilities: TStateFacilities[] = [];

	// For each category that we have, find facilities that take in that item
	for (const item of userCats) {
		const [cat, method] = item;
		const catAndMethod = (cat + "/" + method) as string;
		const relevantFacilities = facilities.filter((facility) => {
			const { id, methodsAccepted, categoriesAccepted, latitude, longitude } = facility;
			if (methodsAccepted.includes(method) && categoriesAccepted.includes(cat)) {
				const distance = calculateDistance(
					Number(address.coordinates.lat),
					Number(address.coordinates.long),
					latitude,
					longitude,
				);
				// Separate Blue Bin from other facilities for reduction
				if (distance < maxDistance) {
					if (facility.channelName === "Blue Bin") {
						if (blueBinFacilities.includes(facility)) {
							return false;
						}
						blueBinFacilities.push(facility);
						distances.set(id, distance);
					} else {
						if (!allFacilities.includes(facility)) {
							allFacilityIds.push(id);
							allFacilities.push(facility);
							distances.set(id, distance);

							return true;
						}
					}
				}
			}
			return false;
		});
		// Filter out nearest 5 bins specifically, and reinsert to relevant lists
		const reducedBlueBinFacilities = blueBinFacilities
			.sort((a, b) => {
				const distA = distances.get(a.id) as number;
				const distB = distances.get(b.id) as number;

				return distA - distB;
			})
			.slice(0, 5);
		for (const blueBin of reducedBlueBinFacilities) {
			allFacilities.push(blueBin);
			relevantFacilities.push(blueBin);
			allFacilityIds.push(blueBin.id);
		}

		// Sort facilities by distance
		relevantFacilities.sort((a, b) => {
			const distA = distances.get(a.id) as number;
			const distB = distances.get(b.id) as number;

			return distA - distB;
		});
		res[catAndMethod] = {
			facilities: relevantFacilities.map((facility) => ({
				id: facility.id,
				distance: distances.get(facility.id) as number,
				latlng: [facility.latitude, facility.longitude] as LatLngExpression,
			})),
		};
	}
	// Sort facilities by distance
	allFacilities.sort((a, b) => {
		const distA = distances.get(a.id) as number;
		const distB = distances.get(b.id) as number;

		return distA - distB;
	});

	const route = dijkstra(allFacilities, address, userCats);
	console.log(route.complete);
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

/**
 * Type for the Node used in PQ and Adjacency List
 */
type Node = number;

/**
 * Edge used for each Node in Adjacency List
 */
interface Edge {
	nextNode: Node;
	nextDistance: number;
	items: [Categories, Methods][];
}

/**
 * Edge used for Priority Queue
 */
interface PQEdge {
	node: Node;
	distance: number;
	itemsCleared: Set<[Categories, Methods]>;
}

/**
 * Graph where one Node will have a linked list of multiple edges
 */
type Graph = Record<Node, Edge[]>;

/**
 * Priority Queue that takes a weighted priority of distance and itemsCleared as a greedy heuristic
 */
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
		this.queue.sort((a, b) => {
			const aPriority = a.distance * (userCats.size / a.itemsCleared.size);
			const bPriority = b.distance * (userCats.size / b.itemsCleared.size);

			return aPriority - bPriority;
		});
	}
	dequeue() {
		return this.queue.shift();
	}

	isEmpty() {
		return this.queue.length === 0;
	}
}

/**
 * Construction of the Adjacency List for Dijkstra's Algorithm
 */
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

/**
 * Dijkstra's Algorithm with modified end conditions and Priority Queue
 */
const dijkstra = (
	relevantFacilities: TStateFacilities[],
	address: AddressOption,
	userCats: Set<[Categories, Methods]>,
): RecyclingLocationResults["route"] => {
	// Create adjacency list
	const adjList = constructAdjList(relevantFacilities, address, userCats);
	// Track parent of each node
	const parentsMap = new Map<number, number>();
	const visitedMap = new Map<number, number>();
	const distanceMap = new Map<number, number>();
	for (const facility of relevantFacilities) {
		distanceMap.set(facility.id, Infinity);
		parentsMap.set(facility.id, -1);
		visitedMap.set(facility.id, 0);
	}
	// Create priority queue for finding optimum location using a Greedy heuristic
	const priorityQueue = new PriorityQueue();
	// Enqueue the user Node
	priorityQueue.enqueue({ node: 123456, distance: 0, itemsCleared: new Set() }, userCats);
	let furthestNode: PQEdge = { node: -1, distance: 0, itemsCleared: new Set() };
	let parentsSnapshotMap = new Map<number, number>();

	// Go through all the nearest nodes to you until you find a set of nodes that clear all your items
	while (!priorityQueue.isEmpty()) {
		// Dequeue the shortest node
		const { node, distance, itemsCleared } = priorityQueue.dequeue() as PQEdge;

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
			const distanceBtwFacilities: number[] = [];
			let distanceIdx = 0;
			for (const node of path) {
				if (node !== 123456) {
					const facility = relevantFacilities.find((facility) => facility.id === node);
					if (facility) {
						distanceBtwFacilities.push(
							calculateDistance(
								coords[distanceIdx][0],
								coords[distanceIdx][1],
								facility.latitude,
								facility.longitude,
							),
						);
						coords.push([facility.latitude, facility.longitude]);
						distanceIdx++;
					}
				}
			}
			return { path, distanceBtwFacilities, coords, complete: true };
		}

		// NORMAL FLOW: look through each neighbour
		const currentNode = node;
		for (const { nextNode, nextDistance, items } of adjList[currentNode]) {
			const updatedItemsCleared = new Set(itemsCleared);
			// Track if a new item is added
			if (items) {
				for (const item of items) {
					updatedItemsCleared.add(item);
				}
			}

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
				// Track the distances and parents of the newly updated ndoe
				distanceMap.set(node, updatedDistance);
				parentsMap.set(nextNode, currentNode);
				// If the node is already in the PQ, update it - else, add it into the PQ. It will auto sort.
				const pqEdge: PQEdge = {
					node: nextNode,
					distance: updatedDistance,
					itemsCleared: updatedItemsCleared,
				};
				if (updatedItemsCleared.size > furthestNode.itemsCleared.size) {
					furthestNode = pqEdge;
					parentsSnapshotMap = new Map([...parentsMap]);
				}
				priorityQueue.enqueue(pqEdge, userCats);
			}
		}
	}
	// EDGE CASE: If there are no facilities that take your items
	if (furthestNode.node === -1) {
		return { path: [], distanceBtwFacilities: [], coords: [[0, 0]], complete: false };
	}
	// EDGE CASE: If the loop completes without finding a path, return the most complete path
	const path: Node[] = [];
	let backtrackNode: number = furthestNode.node;
	while (backtrackNode !== 123456) {
		path.unshift(backtrackNode);
		backtrackNode = parentsSnapshotMap.get(backtrackNode) as number;
	}
	path.unshift(123456);
	const coords: [number, number][] = [[+address.coordinates.lat, +address.coordinates.long]];
	const distanceBtwFacilities: number[] = [];
	let distanceIdx = 0;
	for (const node of path) {
		if (node !== 123456) {
			const facility = relevantFacilities.find((facility) => facility.id === node);
			if (facility) {
				distanceBtwFacilities.push(
					calculateDistance(
						coords[distanceIdx][0],
						coords[distanceIdx][1],
						facility.latitude,
						facility.longitude,
					),
				);
				coords.push([facility.latitude, facility.longitude]);
				distanceIdx++;
			}
		}
	}

	return { path, coords, complete: false, distanceBtwFacilities };
};
