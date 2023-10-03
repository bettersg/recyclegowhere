import { Icon } from "@chakra-ui/react";
import { IconProps } from "@chakra-ui/icons";

// Map Icon (placeholder for testing)
const UserIcon = (props: any) => (
	<Icon viewBox="0 0 200 200" {...props}>
		<svg width="100" height="100" viewBox="10 8 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g filter="url(#filter0_d_5367_2331)">
				<ellipse cx="58.5" cy="58.8072" rx="47.5" ry="47.8072" fill="url(#paint0_linear_5367_2331)"/>
				<path d="M74.3337 78.7278H42.667V74.7439C42.667 72.1024 43.7096 69.569 45.5654 67.7012C47.4212 65.8334 49.9383 64.784 52.5628 64.784H64.4378C67.0624 64.784 69.5794 65.8334 71.4352 67.7012C73.2911 69.569 74.3337 72.1024 74.3337 74.7439V78.7278ZM58.5003 60.8001C56.9409 60.8001 55.3967 60.491 53.956 59.8903C52.5152 59.2897 51.2061 58.4093 50.1034 57.2995C49.0007 56.1897 48.126 54.8721 47.5293 53.4221C46.9325 51.972 46.6253 50.4178 46.6253 48.8483C46.6253 47.2788 46.9325 45.7246 47.5293 44.2745C48.126 42.8245 49.0007 41.5069 50.1034 40.3971C51.2061 39.2873 52.5152 38.4069 53.956 37.8063C55.3967 37.2056 56.9409 36.8965 58.5003 36.8965C61.6498 36.8965 64.6702 38.1557 66.8972 40.3971C69.1242 42.6385 70.3753 45.6785 70.3753 48.8483C70.3753 52.0181 69.1242 55.0581 66.8972 57.2995C64.6702 59.5409 61.6498 60.8001 58.5003 60.8001V60.8001Z" fill="white"/>
			</g>
			<defs>
				<filter id="filter0_d_5367_2331" x="0" y="0" width="119" height="148" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix"/>
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
					<feOffset dx="1" dy="1"/>
					<feGaussianBlur stdDeviation="6"/>
					<feComposite in2="hardAlpha" operator="out"/>
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5367_2331"/>
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5367_2331" result="shape"/>
				</filter>
				<linearGradient id="paint0_linear_5367_2331" x1="24.3594" y1="22.9518" x2="90.171" y2="101.715" gradientUnits="userSpaceOnUse">
					<stop stopColor="#CE3636"/>
					<stop offset="1" stopColor="#F76262"/>
				</linearGradient>
			</defs>
		</svg>

	</Icon>
);

export default UserIcon;
