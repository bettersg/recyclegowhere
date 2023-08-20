import { Container, VStack } from "@chakra-ui/react";
import { useSheetyData } from "hooks/useSheetyData";
import { TInstructions } from "api/sheety/types";
import { BasePage } from "layouts/BasePage";
import { AccordionComp, InstructionsHeader } from "components/instructions";
import { Dispatch, SetStateAction, useRef, useEffect, useState } from "react";
import { Pages } from "spa-pages/pageEnums";
import { useUserInputs } from "hooks/useUserSelection";
import { StickyFooterInstructions } from "components/footer/StickyFooterInstructions";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { NAVBAR_HEIGHT } from "components/nav/NavHeader";
import {
	TEmptyItem,
	TItemSelection,
	TReasonsForUnrecyclability,
} from "app-context/SheetyContext/types";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export const InstructionsPage = ({ setPage }: Props) => {
	const stickyRef = useRef<HTMLDivElement>(null);
	const { items } = useUserInputs();
	const { instructions, unrecyclableDetails } = useSheetyData();
	const [stickyHeight, setStickyHeight] = useState<number>(0);
	const { height } = useWindowDimensions();

	const itemFilter = (items: (TItemSelection | TEmptyItem)[], instructions: TInstructions[]) => {
		const filteredInstructions = instructions
			.filter((instructionItem) =>
				items.some((selectedItem) => selectedItem.name === instructionItem.name),
			)
			.map((instructionItem) => {
				if (instructionItem.category === "GENERAL_WASTE") {
					const unrecyclableDetail = unrecyclableDetails.find(
						(detail) => detail.description === instructionItem.name,
					) as TReasonsForUnrecyclability;
					return {
						title: instructionItem.name,
						method: "THROW",
						reason: unrecyclableDetail.reason,
						suggestion: unrecyclableDetail.suggestion,
					};
				}
				const contents = [];
				contents.push(instructionItem.step1);
				if (instructionItem.step2 !== undefined) {
					contents.push(instructionItem.step2);
				}
				if (instructionItem.step3 !== undefined) {
					contents.push(instructionItem.step3);
				}
				const matchingItem = items.find(
					(selectedItem) => selectedItem.name === instructionItem.name,
				) as TItemSelection | TEmptyItem;
				return {
					title: instructionItem.name,
					method: matchingItem.method,
					contents,
				};
			});
		return filteredInstructions;
	};

	useEffect(() => {
		setStickyHeight(stickyRef.current?.clientHeight || 0);
	}, [stickyRef.current?.clientHeight, height]);
	console.log(unrecyclableDetails);
	return (
		<BasePage title="Instructions" description="Singapore's first recycling planner">
			<Container
				maxW={{
					base: "full",
					sm: "container.md",
				}}
				height={height - stickyHeight - NAVBAR_HEIGHT}
			>
				<VStack align="stretch">
					<InstructionsHeader setPage={setPage} />
					<AccordionComp items={itemFilter(items, instructions)} />
				</VStack>
			</Container>
			<StickyFooterInstructions ref={stickyRef} setPage={setPage} />
		</BasePage>
	);
};
