import { Text } from "@chakra-ui/react";
import { useState } from "react";
import AddItemDialog from "./AddItemDialog";
import AddItemMultiSelect from "./AddItemMultiSelect";
interface Data {
	items:()=>void;
}
const AddItem = ({ setNextStep, data, setItems }:{setNextStep: ()=> void, data: Data, setItems:()=> void}) => {
	const [didSelectItems, willTriggerDialog] = useState(false);

	return (
		<div>
			<div style={{ marginInline: "20%", marginBottom: "20px" }}>
				<Text fontWeight="bold" textAlign="center">
					Type in the item(s) you wish to recycle/donate:
				</Text>
			</div>
			<AddItemMultiSelect
                setItems={setItems}
				data={data}
				openDialog={() => willTriggerDialog(true)}
			/>
			<AddItemDialog
				setNextStep={setNextStep}
				didSelectItems={didSelectItems}
				closeDialog={() => willTriggerDialog(false)}
			/>
		</div>
	);
};

export default AddItem;