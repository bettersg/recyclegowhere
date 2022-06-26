import { Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import AsyncSelect from "react-select/async";
import { COLORS } from "theme";
import { AddressOption } from "../../types";
import { IndicatorsContainer, NoOptionsMessage } from "./custom-components";
import { OneMapResponse } from "./types";

interface LocationProps {
	address: string;
	setAddress: Dispatch<SetStateAction<string>>;
}
export const Location = ({ address, setAddress }: LocationProps) => {
	const loadOptionsHandler = useCallback(async (inputValue: string) => {
		const response = await fetch(
			`https://developers.onemap.sg/commonapi/search?searchVal=${inputValue}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
		);
		const json: OneMapResponse = await response.json();
		return json.results.map(
			(result) =>
				({
					value: result.ADDRESS,
					label: result.ADDRESS,
				} as AddressOption),
		);
	}, []);

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
				loadOptions={loadOptionsHandler}
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
