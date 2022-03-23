import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const DarkModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const iconColor = {
		light: "black",
		dark: "white",
	};
	return (
		<IconButton
			aria-label="Toggle dark mode"
			icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
			onClick={toggleColorMode}
			color={iconColor[colorMode]}
		/>
	);
};

const selectStylesForColorModes = {
	option: (provided) => ({
		...provided,
		color: "initial",
	}),
};

export { DarkModeSwitch, selectStylesForColorModes };
