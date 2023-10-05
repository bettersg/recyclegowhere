import { useUserInputs } from "hooks/useUserSelection";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Items } from "./Items";
import { Location } from "./Location";
import { validateSelections } from "./utils";

type Props = {
	scrollableContainerRef: RefObject<HTMLDivElement>;
	setReadyToSubmit: Dispatch<SetStateAction<boolean>>;
};

export const UserInput = ({ scrollableContainerRef, setReadyToSubmit }: Props) => {
	const { items, address } = useUserInputs();

	useEffect(() => {
		setReadyToSubmit(!!address && validateSelections(items));
	}, [address, items, setReadyToSubmit]);

	useEffect(() => {
		if (items.length > 1) {
			scrollableContainerRef.current?.scrollBy(0, 100);
		}
	}, [items.length, scrollableContainerRef]);

	return (
		<>
			<Location showText={true} />
			<Items />
		</>
	);
};
