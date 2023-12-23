import { Icon } from "@chakra-ui/react";

const ClusterIcon = (props: any) => (
	<Icon viewBox="0 0 75 75" {...props}>
		<g filter="url(#filter0_d_5866_39311)">
			<path
				d="M69 37.3829C69 55.0173 54.6731 69.3128 37 69.3128C19.3269 69.3128 5 55.0173 5 37.3829C5 19.7486 19.3269 5.45312 37 5.45312C54.6731 5.45312 69 19.7486 69 37.3829Z"
				fill="white"
			/>
		</g>
		<defs>
			<filter
				id="filter0_d_5866_39311"
				x="0"
				y="-2"
				width="80"
				height="86"
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood floodOpacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx="3" dy="3" />
				<feGaussianBlur stdDeviation="4" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
				<feBlend
					mode="normal"
					in2="BackgroundImageFix"
					result="effect1_dropShadow_5866_39311"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_5866_39311"
					result="shape"
				/>
			</filter>
		</defs>
	</Icon>
);

export default ClusterIcon;
