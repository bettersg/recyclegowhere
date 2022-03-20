import { Text } from "@chakra-ui/react";
import { useState } from "react";
import AddItemDialog from "./AddItemDialog";
import AddItemMultiSelect from "./AddItemMultiSelect";
import { StepsLayout } from "../StepsLayout";

export const AddItem = ({ setNextStep, data, setItems }) => {
	const [didSelectItems, willTriggerDialog] = useState(false);

	return (
		<StepsLayout>
			<div style={{ marginInline: "20%", marginBottom: "20px" }}>
				<Text fontWeight="bold" textAlign="center">
					Type in the item(s) you wish to recycle/donate:
				</Text>
			</div>
			<AddItemMultiSelect
				data={data}
				setItems={setItems}
				openDialog={() => willTriggerDialog(true)}
			/>
			<AddItemDialog
				setNextStep={setNextStep}
				didSelectItems={didSelectItems}
				closeDialog={() => willTriggerDialog(false)}
			/>
		</StepsLayout>
	);
};
