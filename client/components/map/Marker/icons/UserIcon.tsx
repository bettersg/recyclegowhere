import { Icon } from "@chakra-ui/react";

// Map Icon (placeholder for testing)
const UserIcon = (props: any) => (
	<Icon viewBox="0 0 75 75" {...props}>
		<g filter="url(#filter0_d_5859_39306)">
			<circle cx="37" cy="37" r="32" fill="#DD0303" />
			<circle cx="37" cy="37" r="24" fill="white" />
			<path
				d="M47.6673 50.3359H26.334V47.6693C26.334 45.9012 27.0364 44.2055 28.2866 42.9552C29.5368 41.705 31.2325 41.0026 33.0007 41.0026H41.0007C42.7688 41.0026 44.4645 41.705 45.7147 42.9552C46.9649 44.2055 47.6673 45.9012 47.6673 47.6693V50.3359ZM37.0007 38.3359C35.9501 38.3359 34.9098 38.129 33.9392 37.727C32.9686 37.3249 32.0867 36.7357 31.3438 35.9928C30.6009 35.2499 30.0117 34.368 29.6096 33.3974C29.2076 32.4268 29.0007 31.3865 29.0007 30.3359C29.0007 29.2854 29.2076 28.2451 29.6096 27.2745C30.0117 26.3039 30.6009 25.422 31.3438 24.6791C32.0867 23.9362 32.9686 23.3469 33.9392 22.9449C34.9098 22.5429 35.9501 22.3359 37.0007 22.3359C39.1224 22.3359 41.1572 23.1788 42.6575 24.6791C44.1578 26.1794 45.0006 28.2142 45.0006 30.3359C45.0006 32.4577 44.1578 34.4925 42.6575 35.9928C41.1572 37.4931 39.1224 38.3359 37.0007 38.3359V38.3359Z"
				fill="#DD0303"
			/>
		</g>
		<defs>
			<filter
				id="filter0_d_5859_39306"
				x="0"
				y="0"
				width="80"
				height="99"
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
					result="effect1_dropShadow_5859_39306"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_5859_39306"
					result="shape"
				/>
			</filter>
		</defs>
	</Icon>
	// </Box>
);

export default UserIcon;
