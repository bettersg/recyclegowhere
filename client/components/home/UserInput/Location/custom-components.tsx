import { AddressOption } from "components/home/types";
import { ComponentType } from "react";
import { components, GroupBase, NoticeProps } from "react-select";

export const IndicatorsContainer = () => <></>;

export const NoOptionsMessage: ComponentType<
	NoticeProps<AddressOption, false, GroupBase<AddressOption>>
> = (props) => (
	<components.NoOptionsMessage {...props}>
		<span>Please enter your address to find your location.</span>
	</components.NoOptionsMessage>
);
