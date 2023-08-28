import { ChevronDownIcon, ChevronUpIcon, Icon } from "@chakra-ui/icons";
import { BsFilter } from "react-icons/bs";
import { Flex, IconButton, Tag, theme } from "@chakra-ui/react";
import { useState } from "react";
import { TEmptyItem, TItemSelection } from "app-context/SheetyContext/types";
import FilterButton from "./filterPopover";

type Props = {
    items: (TItemSelection | TEmptyItem)[];
};

const ItemsAndFilterRow = (props: Props) => {
    const colors = theme.colors;

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Flex px={4} gap={4}>
            <Flex justifyContent="space-between" flexGrow={1} border="1px" borderColor={colors.gray[200]} borderRadius="md">
                <Flex h={isExpanded ? "" : "48px"} flexWrap="wrap" rowGap={4} columnGap={2} px={4} py={3} overflow={isExpanded ? "" : "hidden"}>
                    {props.items.map((item) => (
                        <Tag flexShrink={0} size="sm" key={item.name} borderRadius="full" colorScheme="blackAlpha">{item.name}</Tag>
                    ))}
                </Flex>
                <Icon as={isExpanded ? ChevronUpIcon : ChevronDownIcon} boxSize={6} mr={4} my={3} onClick={() => setIsExpanded(!isExpanded)} />
            </Flex>
            {/* <IconButton
                icon={<Icon as={BsFilter} />}
                variant="outline"
                size="lg"
                aria-label={"Filter"} /> */}
            <FilterButton />
        </Flex>
    );
};

export default ItemsAndFilterRow;