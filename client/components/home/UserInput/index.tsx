import { RefObject, useState } from "react";
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
};

export const UserInput = ({ scrollableContainerRef }: Props) => {
	const [address, setAddress] = useState("");
	const [items, setItems] = useState<TItems[]>([emptyItem]);

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
		/*
		HACK: This timeout is needed because for some reason,
		the scrollBy call is done before the size of the component changes.
		Can't find another way to add a resize listener without installing packages
		or adding a ton of refs, so this is the simplest hack fix.
		*/
		setTimeout(() => {
			scrollableContainerRef.current?.scrollBy(0, 60);
		}, 50);
	};
	const handleRemoveItem = (index: number) => {
		const _items = [...items];
		_items.splice(index, 1);
		setItems(_items);
	};

	return (
		<>
			<Location address={address} setAddress={setAddress} />
			<Items
				items={items}
				handleUpdateItem={handleUpdateItem}
				handleAddItem={handleAddItem}
				handleRemoveItem={handleRemoveItem}
			/>
		</>
	);
};
