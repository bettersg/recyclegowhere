import { useState } from "react";
import { TItems } from "../types";
import { Location } from "./Location";
import { Items } from "./Items";

const emptyItem: TItems = {
	id: null as unknown as number,
	name: "",
	condition: "",
};

export const UserInput = () => {
	const [address, setAddress] = useState("");
	const [items, setItems] = useState<TItems[]>([emptyItem]);

	const handleUpdateItem = (
		type: keyof Pick<TItems, "name" | "condition">,
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
