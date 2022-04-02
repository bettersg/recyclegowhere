import { Box } from "@chakra-ui/react";

const NonBlueBinPopupInfo = ({ marker }) => (
	<span>
		<strong>{marker.items}</strong> <br /> <br />
		<b>{marker.channel_name}</b> by {marker.organisation_name} <br />
		<br />
		<b>Address: </b>
		{marker.address} <br />
		<b>Postal: </b> {marker.postal} <br />
		<b>Operating Hours: </b> {marker.operating_hours} <br />
		<b>Contact: </b> {marker.contact} <br />
		<b>Website: </b> <a href={marker.website}>{marker.website}</a> <br />
		<b>Categories Accepted: </b> {marker.categories_accepted} <br />
	</span>
);

const BlueBinPopupInfo = ({ marker }) => (
	<span>
		<strong>Blue Recycling Bin</strong> for <strong>{marker.items}</strong>{" "}
		<br /> <br />
		Postal Code: {marker.postal} <br /> Distance: {marker.distance} km{" "}
		<br />
	</span>
);

const NoFacilityInfo = ({ noFacilityItems }) => {
	return (
		<span>
			<p>
				Sorry but the following items selected do not have a facility to
				take them in:
			</p>
			{noFacilityItems.map(({ description, condition, id }) => {
				return (
					<Box my="0.5rem" key={id}>
						<b>Item: </b> {description} <br />
						<b>Condition: </b> {condition} <br />
					</Box>
				);
			})}
		</span>
	);
};

// need leaflet to nbe red and say thaT these items have no facilities
export const PopupInfo = {
	blueBin: BlueBinPopupInfo,
	nonBlueBin: NonBlueBinPopupInfo,
	noFacility: NoFacilityInfo,
};
