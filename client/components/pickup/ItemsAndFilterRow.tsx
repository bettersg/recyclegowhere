import { ChevronDownIcon, ChevronUpIcon, Icon } from "@chakra-ui/icons";
import { BsFilter } from 'react-icons/bs'
import { Box, Flex, HStack, IconButton, Spacer, Tag } from "@chakra-ui/react";
import { useState } from "react";
import { useUserInputs } from "hooks/useUserSelection";

const ItemsAndFilterRow = () => {
    const { items } = useUserInputs();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Flex px={4} gap={4}>
            <Flex justifyContent='space-between' flexGrow={1} border='1px' borderColor='gray.200' borderRadius='md'>
                <Flex h={isExpanded ? '' : '48px'} flexWrap='wrap' rowGap={4} columnGap={2} px={4} py={3} overflow={isExpanded ? '' : 'hidden'}>
                    {items.map((item) => (
                        <Tag flexShrink={0} size='sm' key={item.name} borderRadius='full' colorScheme="blackAlpha">{item.name}</Tag>
                    ))}
                </Flex>
                <Icon as={isExpanded ? ChevronUpIcon : ChevronDownIcon} boxSize={6} mr={4} my={3} onClick={() => setIsExpanded(!isExpanded)} />
            </Flex>
            <IconButton
                icon={<Icon as={BsFilter} />}
                variant='outline'
                size='lg'
                aria-label={"Filter"} />
        </Flex>
    );
};

export default ItemsAndFilterRow;