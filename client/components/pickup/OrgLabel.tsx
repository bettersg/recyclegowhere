import { Text, HStack, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { MdOutlineScale } from "react-icons/md";

type Props = {
    icon: IconType;
    title: string;
    text: string;
};

const OrgLabel = (props: Props) => {
    return (
        <HStack flexShrink={0}>
            <Icon as={props.icon} boxSize={4} />
            <Text as='b' fontSize="xs" >{props.title}</Text>
            <Text fontSize="xs" >{props.text}</Text>
        </HStack>
    );
};

export default OrgLabel;