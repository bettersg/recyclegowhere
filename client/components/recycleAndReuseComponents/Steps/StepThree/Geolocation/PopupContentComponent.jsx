const NonBlueBinPopupInfo = ({ marker }) => (
	<span>
		{marker.items.map(item => (
			<>
				<strong>{item}</strong> <br />
			</>
		))}
		<br />
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

export const PopupInfo = {
	blueBin: BlueBinPopupInfo,
	nonBlueBin: NonBlueBinPopupInfo,
};
