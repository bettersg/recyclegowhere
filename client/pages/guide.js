import { AddIcon, EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
  Heading,
} from '@chakra-ui/react'
// STEPPER IMPORTS
import { Step, Steps } from "chakra-ui-steps";

import AddItem from "../components/recycleAndReuseComponents/AddItem";
import TakeAction from "../components/recycleAndReuseComponents/TakeAction";
import VerifyItem from "../components/recycleAndReuseComponents/VerifyItem";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import urlcat from "urlcat";

import dynamic from "next/dynamic"
import Head from '../components/head'

import Item from '../jsonfiles/Item.json'
import GeneralWaste from '../jsonfiles/General-Waste.json'


function Guide({ data }) {
  const [items, setItems] = useState([])
  const [step, setStep] = useState(0)
  const [geolocation, setGeolocation] = useState(false)

  return (
    <Center>
      <Head title="Reuse and Recycle" />
      <Box w={['70vw', '60vw', '40wv']}>
        Guide to recycle
      </Box>
    </Center >
  );
}

export default Guide
