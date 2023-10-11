import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { Methods } from "api/sheety/enums";
import { BiSolidDonateHeart } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { HiCurrencyDollar } from "react-icons/hi2";
import { LuRecycle } from "react-icons/lu";
import { TiSpanner } from "react-icons/ti";

type InstructionsTagProps = {
    method: Methods | undefined;
};

const getDetails = (method: Methods | undefined) => {
    switch (method) {
        case Methods.RESELL:
            return { label: "Sell", icon: HiCurrencyDollar, colorScheme: "blue", color: "blue.600", boxSize: "16px" };
        case Methods.REPAIR:
            return { label: "Repair", icon: TiSpanner, colorScheme: "yellow", color: "yellow.500", boxSize: "18px" };
        case Methods.RECYCLE:
            return { label: "Recycle", icon: LuRecycle, colorScheme: "green", color: "green", boxSize: "15px" };
        case Methods.DONATE:
            return { label: "Donate", icon: BiSolidDonateHeart, colorScheme: "orange", color: "orange.400", boxSize: "16px" };
        default:
            return { label: "Throw", icon: GoTrash, colorScheme: "gray", color: "gray.600", boxSize: "16px" };
    }
};

export const InstructionsTag = ({ method }: InstructionsTagProps) => {
    const { label, icon, colorScheme, color, boxSize } = getDetails(method);
    return (
        <Tag
            size='sm'
            borderRadius='full'
            variant='subtle'
            colorScheme={colorScheme}
            color={color}
            fontSize='10px'
            py='1px'
        >
            <TagLabel>{label}</TagLabel>
            <TagRightIcon as={icon} boxSize={boxSize} ml='3px' />
        </Tag>);
};