import { Container, VStack } from "@chakra-ui/react";
import { useSheetyData } from "hooks/useSheetyData";
import { TInstructions } from "api/sheety/types";
import { BasePage } from "layouts/BasePage";
import { AccordionComp, InstructionsHeader } from "components/instructions";
import { Dispatch, SetStateAction, useRef, useEffect, useState } from "react";
import { Pages } from "spa-pages/pageEnums";
import { useUserInputs } from "hooks/useUserSelection";
import styles from "components/home/hideScrollbar.module.css";

import { StickyFooterInstructions } from "components/footer/StickyFooterInstructions";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { NAVBAR_HEIGHT } from "components/nav/NavHeader";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import { TReasonsForUnrecyclability } from "api/sheety/types";
import { AccordionProps } from "components/instructions";
import { Methods } from "api/sheety/enums";

type Props = {
	setPage: Dispatch<SetStateAction<Pages>>;
};

export const InstructionsPage = ({ setPage }: Props) => {
	const stickyRef = useRef<HTMLDivElement>(null);
	const scrollableContainerRef = useRef<HTMLObjectElement>(null);

	const { items } = useUserInputs();
	const { instructions, unrecyclableDetails } = useSheetyData();
	const [stickyHeight, setStickyHeight] = useState<number>(0);
	const { height } = useWindowDimensions();

	const itemFilter = (
		items: (TItemSelection | TEmptyItem)[],
		instructions: TInstructions[],
	): AccordionProps[] => {
		// Filter out instructions from Instructions table, whose names match the names of items selected by user.
		// Then, if it is GENERAL_WASTE, return reasons and suggestions (w/ title and method)
		// Else, if it is Normal Recyclables, compile the instructions and return it (w/ title and method)
		const filteredInstructions = instructions
			.filter((instructionItem) =>
				items.some((selectedItem) => selectedItem.name === instructionItem.name),
			)
			.map((instructionItem) => {
				const contents = [] as string[];
				if (instructionItem.category === "GENERAL_WASTE") {
					const unrecyclableDetail = unrecyclableDetails.find(
						(detail) => detail.description === instructionItem.name,
					) as TReasonsForUnrecyclability;
					return {
						title: instructionItem.name,
						method: Methods.THROW,
						reason: unrecyclableDetail.reason,
						suggestion: unrecyclableDetail.suggestion,
					} as AccordionProps;
				}
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
				} as AccordionProps;
			});
		return filteredInstructions as AccordionProps[];
	};

	useEffect(() => {
		setStickyHeight(stickyRef.current?.clientHeight || 0);
	}, [stickyRef.current?.clientHeight, height]);

	return (
		<BasePage title="Instructions" description="Singapore's first recycling planner">
			<VStack p={0} m={0} height={`${height - NAVBAR_HEIGHT}px`}>
				<Container
					className={styles.hideScrollbar}
					maxW={{
						base: "full",
						sm: "container.md",
					}}
					overflow="auto"
					height={height - stickyHeight - NAVBAR_HEIGHT}
					ref={scrollableContainerRef}
				>
					<VStack align="stretch" mb={2}>
						<InstructionsHeader setPage={setPage} />
						<AccordionComp items={itemFilter(items, instructions)} />
					</VStack>
				</Container>
				<StickyFooterInstructions ref={stickyRef} setPage={setPage} />
			</VStack>
		</BasePage>
	);
};
