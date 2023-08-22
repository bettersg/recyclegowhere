// Leaflet Imports
import {
	LeafletContextInterface,
	createElementObject,
	createPathComponent,
	extendContext,
} from "@react-leaflet/core";
import { LeafletMouseEventHandlerFn } from "leaflet";
import * as L from "leaflet";
import "leaflet.markercluster";
import useLeafletDivIcon from "hooks/useLeafletDivIcon";

// Marker Imports
import MarkerIconWrapper from "./MarkerIconWrapper";
import { IconProps } from "@chakra-ui/icons";

type ClusterEvents = {
	onClick?: LeafletMouseEventHandlerFn;
	onDblClick?: LeafletMouseEventHandlerFn;
	onMouseDown?: LeafletMouseEventHandlerFn;
	onMouseUp?: LeafletMouseEventHandlerFn;
	onMouseOver?: LeafletMouseEventHandlerFn;
	onMouseOut?: LeafletMouseEventHandlerFn;
	onContextMenu?: LeafletMouseEventHandlerFn;
};

type MarkerClusterControl = L.MarkerClusterGroupOptions & {
	children: React.ReactNode;
	icon: React.ComponentType<IconProps>; // Update the type here
	color: string;
} & ClusterEvents;

// Fix markercluster import errors via installing -D @types/leaflet.markercluster

const CreateMarkerClusterGroup = (
	props: MarkerClusterControl,
	context: LeafletContextInterface,
) => {
	const { divIcon } = useLeafletDivIcon();

	const markerClusterGroup = new L.MarkerClusterGroup({
		// When to disable clusters
		disableClusteringAtZoom: 25,
		// Not too sure what this does
		spiderfyDistanceMultiplier: 3,
		iconCreateFunction: (cluster) =>
			divIcon({
				source: (
					<MarkerIconWrapper
						color={props.color}
						icon={props.icon}
						label={`${cluster.getChildCount()}`}
					/>
				),
				// The offset of the marker from the original lat/long??
				anchor: [17, 18],
			}),
		...props,
	});

	return createElementObject(
		markerClusterGroup,
		extendContext(context, { layerContainer: markerClusterGroup }),
	);
};

export const MarkerClusterGroup = () =>
	createPathComponent<L.MarkerClusterGroup, MarkerClusterControl>(CreateMarkerClusterGroup);
