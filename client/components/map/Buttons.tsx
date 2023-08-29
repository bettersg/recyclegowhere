import { HamburgerIcon, Search2Icon, CloseIcon } from "@chakra-ui/icons";
import { MouseEventHandler } from "react";
import { IconButton } from "@chakra-ui/react";
import { COLORS } from "theme";

interface ButtonProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
}

// Button Design for the filter button
export const FilterButton = ({ onClick }: ButtonProps) => {
	return (
		<IconButton
			variant="solid"
			color={COLORS.gray[700]}
			background={COLORS.gray[100]}
			aria-label="add line"
			icon={<HamburgerIcon />}
			onClick={onClick}
		/>
	);
};
export const SearchButton = ({ onClick }: ButtonProps) => {
	return (
		<IconButton
			variant="solid"
			color={COLORS.gray[700]}
			background={COLORS.gray[100]}
			aria-label="add line"
			icon={<Search2Icon />}
			onClick={onClick}
		/>
	);
};
export const XButton = ({ onClick }: ButtonProps) => {
	return (
		<IconButton
			variant="solid"
			color={COLORS.gray[700]}
			background={COLORS.gray[100]}
			aria-label="add line"
			icon={<CloseIcon />}
			onClick={onClick}
		/>
	);
};
