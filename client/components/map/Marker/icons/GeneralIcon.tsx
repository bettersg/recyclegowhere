import { Icon } from "@chakra-ui/react";

// Map Icon (placeholder for testing)
const GeneralIcon = (props: any) => (
	<Icon viewBox="5 5 70 80" {...props}>
		<g filter="url(#filter0_d_5786_45655)">
			<path
				d="M69 37C69 54.6731 54.6731 69 37 69C19.3269 69 5 54.6731 5 37C5 19.3269 19.3269 5 37 5C54.6731 5 69 19.3269 69 37Z"
				fill="white"
			/>
		</g>
		<defs>
			<filter
				id="filter0_d_5786_45655"
				x="0"
				y="0"
				width="80"
				height="96"
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
					result="effect1_dropShadow_5786_45655"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_5786_45655"
					result="shape"
				/>
			</filter>
		</defs>
	</Icon>
);

export default GeneralIcon;
