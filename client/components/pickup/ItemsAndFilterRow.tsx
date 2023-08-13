import { Icon } from "@chakra-ui/icons";
import { BsFilter } from 'react-icons/bs'
import { Flex, HStack, IconButton, Spacer, Tag } from "@chakra-ui/react";

const items = [
    { name: 'Blouse' },
    { name: 'Shirt' },
    { name: 'Drink Bottle' },
    { name: 'Something' }
]

const ItemsAndFilterRow = () => {
    return (
        <Flex px={4} gap={4}>
            <HStack h='48px' flexWrap='wrap' flexGrow={1} spacing={2} px={4} py={3} border='1px' borderColor='gray.200' borderRadius='md' overflow='hidden'>
                {items.map((item) => (
                    <Tag flexShrink={0} size='sm' key={item.name} borderRadius='full' colorScheme="blackAlpha">{item.name}</Tag>
                ))}
            </HStack>
            <IconButton
                icon={<Icon as={BsFilter} />}
                variant='outline'
                size='lg'
                aria-label={"Filter"} />
        </Flex>
    );
};

export default ItemsAndFilterRow;