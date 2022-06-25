import { Input, Text } from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

interface LocationProps {
	address: string;
	updateAddress: ChangeEventHandler<HTMLInputElement>;
}

export const Location = ({ address, updateAddress }: LocationProps) => (
	<div>
		<Text fontWeight={500} fontSize="md" mb="8px">
			Where are you at?
		</Text>
		<Input placeholder="Type address here" onChange={updateAddress} value={address} />
	</div>
);
