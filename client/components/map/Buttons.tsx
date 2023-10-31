import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import { MouseEventHandler } from "react";
import { Icon, IconButton } from "@chakra-ui/react";
import { COLORS } from "theme";

interface ButtonProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
	height?: string;
}

// Button Design for the filter button
export const FilterButton = ({ onClick, height }: ButtonProps) => {
	return (
		<IconButton
			variant="solid"
			color={COLORS.gray[700]}
			background="white"
			aria-label="add line"
			icon={
				<Icon viewBox="0 0 24 24">
					<path
						d="M12.5263 11.5H22M12.5263 6.3H22M12.5263 16.7H22M5.93056 5V11.5V18M5.93056 18L2 14.1M5.93056 18L9.86111 14.1"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</Icon>
			}
			onClick={onClick}
			height={height}
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
