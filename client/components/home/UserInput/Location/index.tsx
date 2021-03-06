import { Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import AsyncSelect from "react-select/async";
import { COLORS } from "theme";
import { AddressOption } from "../../types";
import { IndicatorsContainer, NoOptionsMessage } from "./custom-components";
import { OneMapResponse } from "./types";
import debounce from "lodash/debounce";

interface LocationProps {
	address: string;
	setAddress: Dispatch<SetStateAction<string>>;
}

const fetchAddresses = async (searchValue: string): Promise<OneMapResponse> => {
	const response = await fetch(
		`https://developers.onemap.sg/commonapi/search?searchVal=${searchValue}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
	);
	return await response.json();
};

export const Location = ({ address, setAddress }: LocationProps) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedLoadOptions = useCallback(
		debounce((inputValue: string, cb: (options: AddressOption[]) => void) => {
			fetchAddresses(inputValue).then((options) =>
				cb(
					options.results.map(
						(result) =>
							({
								value: result.ADDRESS,
								label: result.ADDRESS,
							} as AddressOption),
					),
				),
			);
		}, 500),
		[],
	);

	return (
		<div>
			<Text fontWeight={500} fontSize="md" mb="8px">
				Where are you at?
			</Text>
			<AsyncSelect
				value={address ? { value: address, label: address } : undefined}
				isSearchable
				components={{
					NoOptionsMessage,
					IndicatorsContainer,
				}}
				placeholder="Type address here"
				loadOptions={debouncedLoadOptions}
				onChange={(newValue) => {
					setAddress((newValue as AddressOption).value);
				}}
				styles={{
					control: (base) => ({
						...base,
						borderColor: COLORS.gray[200],
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
			/>
		</div>
	);
};
