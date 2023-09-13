import { useUserInputs } from "hooks/useUserSelection";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { Items } from "./Items";
import { Location } from "./Location";
import { validateSelections } from "./utils";

type Props = {
	scrollableContainerRef: RefObject<HTMLDivElement>;
	setReadyToSubmit: Dispatch<SetStateAction<boolean>>;
};

export const UserInput = ({ scrollableContainerRef, setReadyToSubmit }: Props) => {
	const [addressBlur, setAddressBlur] = useState(false);
	const { items, address } = useUserInputs();

	useEffect(() => {
		if (!addressBlur) {
			setReadyToSubmit(false);
			return;
		}
		if (!address) {
			setReadyToSubmit(false);
			return;
		}
		if (validateSelections(items) && address.value) {
			setReadyToSubmit(true);
		} else {
			setReadyToSubmit(false);
		}
	}, [address, addressBlur, items, setReadyToSubmit]);

	useEffect(() => {
		if (items.length > 1) {
			scrollableContainerRef.current?.scrollBy(0, 100);
		}
	}, [items.length, scrollableContainerRef]);

	return (
		<>
			<Location showText={true} handleBlur={() => setAddressBlur(true)} />
			<Items />
		</>
	);
};
