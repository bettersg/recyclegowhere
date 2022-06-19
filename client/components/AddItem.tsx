import { Text } from "@chakra-ui/react";
import { useState } from "react";
import AddItemDialog from "./AddItemDialog";
import AddItemMultiSelect from "./AddItemMultiSelect";
import {DataType} from "../pages/index";

interface AddItemType{
	data: DataType;
	setItems: () => void;
	setNextStep: () => void;
}

const AddItem = (props: AddItemType) => {
	const [didSelectItems, willTriggerDialog] = useState(false);

	return (
		<div>
			<div style={{ marginInline: "20%", marginBottom: "20px" }}>
				<Text fontWeight="bold" textAlign="center">
					Type in the item(s) you wish to recycle/donate:
				</Text>
			</div>
			<AddItemMultiSelect
                setItems={props.setItems}
				data={props.data}
				openDialog={() => willTriggerDialog(true)}
			/>
			<AddItemDialog
				setNextStep={props.setNextStep}
				didSelectItems={didSelectItems}
				closeDialog={() => willTriggerDialog(false)}
			/>
		</div>
	);
};

export default AddItem;