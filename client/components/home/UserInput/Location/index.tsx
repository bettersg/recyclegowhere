import { Box, Flex, Text } from "@chakra-ui/react";
import { fetchAddresses } from "api/onemap";
import { useUserInputs } from "hooks/useUserSelection";
import debounce from "lodash/debounce";
import { useCallback, useState } from "react";
import AsyncSelect from "react-select/async";
import { COLORS } from "theme";
import { IndicatorsContainer, NoOptionsMessage } from "./custom-components";
import { AddressOption } from "app-context/UserSelectionContext/types";
interface LocationProps {
	handleBlur?: () => void;
	showText: boolean;
	containerStyle?: React.CSSProperties;
}

export const Location = ({ handleBlur, showText, containerStyle = {} }: LocationProps) => {
	const [showEmptyWarning, setShowEmptyWarning] = useState(false);
	const { address, setAddress } = useUserInputs();
	const { value: addressValue } = address;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedLoadOptions = useCallback(
		debounce((inputValue: string, cb: (options: AddressOption[]) => void) => {
			fetchAddresses(inputValue).then((options) =>
				cb(
					options.results?.map(
						(result) =>
							({
								value: result.ADDRESS,
								label: result.ADDRESS,
								coordinates: {
									lat: result.LATITUDE,
									long: result.LONGITUDE,
								},
							} as AddressOption),
					),
				),
			);
		}, 500),
		[],
	);

	const handleShowError = useCallback(() => {
		if (!addressValue) {
			setShowEmptyWarning(true);
		}
	}, [addressValue]);

	return (
		<Box flex={1} minWidth={0}>
			{showText && (
				<Text fontWeight={500} fontSize="md" mb="8px">
					Where are you at?
				</Text>
			)}
			<AsyncSelect
				value={addressValue ? address : undefined}
				isSearchable
				components={{
					NoOptionsMessage,
					IndicatorsContainer,
				}}
				placeholder="Type address here"
				loadOptions={debouncedLoadOptions}
				onChange={(newValue) => {
					setAddress(newValue as AddressOption);
					setShowEmptyWarning(false);
				}}
				styles={{
					container: (base) => ({
						...base,
						...containerStyle,
					}),
					control: (base) => ({
						...base,
						overflow: "hidden",
						borderColor: showEmptyWarning ? COLORS.Select.error : COLORS.gray[200],
					}),
					menu: (base) => ({
						...base,
						zIndex: 9999,
					}),
					placeholder: (base) => ({
						...base,
						paddingLeft: 7,
					}),
					valueContainer: (base) => ({
						...base,
						paddingLeft: 15,
					}),
				}}
				onBlur={() => {
					handleBlur?.();
					handleShowError();
				}}
			/>
		</Box>
	);
};
