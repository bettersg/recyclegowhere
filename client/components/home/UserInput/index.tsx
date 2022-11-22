import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { TItems } from "../types";
import { Location } from "./Location";
import { Items } from "./Items";

const emptyItem: TItems = {
	id: null as unknown as number,
	name: "",
	method: "",
};

type Props = {
	scrollableContainerRef: RefObject<HTMLDivElement>;
	setReadyToSubmit: Dispatch<SetStateAction<boolean>>;
};

export const UserInput = ({ scrollableContainerRef, setReadyToSubmit }: Props) => {
	const [address, setAddress] = useState("");
	const [addressBlur, setAddressBlur] = useState(false);
	const [items, setItems] = useState<TItems[]>([emptyItem]);

	useEffect(() => {
		if (!addressBlur) {
			setReadyToSubmit(false);
			return;
		}
		if (!address) {
			setReadyToSubmit(false);
			return;
		}
		if (/* items[0].id */ items[0].name && items[0].method) {
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

	const handleUpdateItem = (
		type: keyof Pick<TItems, "name" | "method">,
		index: number,
		value: string,
	) => {
		const _items = [...items];
		const _item = { ..._items[index] };
		_item[type] = value;
		_items[index] = _item;
		setItems(_items);
	};
	const handleAddItem = () => {
		const a = [...items, emptyItem];
		setItems(a);
	};
	const handleRemoveItem = (index: number) => {
		const _items = [...items];
		_items.splice(index, 1);
		setItems(_items);
	};

	return (
		<>
			<Location
				address={address}
				setAddress={setAddress}
				handleBlur={() => setAddressBlur(true)}
			/>
			<Items
				items={items}
				handleUpdateItem={handleUpdateItem}
				handleAddItem={handleAddItem}
				handleRemoveItem={handleRemoveItem}
			/>
		</>
	);
};
