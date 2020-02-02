import React, { useState, useEffect } from "react";
import produce from "immer";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Grid,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text
} from "@chakra-ui/core";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// dev data
import { dummyJobData } from "../dummyJobData";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  // fetch data after render
  useEffect(() => {
    // define
    async function fetchData() {
      let data = await getData();
      setJobs(data);
    }

    fetchData();
  }, []);

  return (
    <Grid width="90%" height="100%" templateRows="60px 1fr">
      <Heading as="h2" textSize="xl">
        Jobs
      </Heading>
      <JobTable jobsList={jobs} />
    </Grid>
  );
}

function getData() {
  return new Promise((resolve, reject) => {
    resolve(dummyJobData);
  });
}

// these components are extended from this example:
// https://codesandbox.io/s/3vnx878jk5
function JobTable({ jobsList }) {
  const [checkboxState, setCheckboxState] = useState({
    noneChecked: true,
    allChecked: false,
    isIndeterminate: false,
    checkedItems: {}
  });

  // set initial state
  useEffect(() => {
    console.log(jobsList);
    // form immutable checkedItems obj
    let checkedItems = {};
    checkedItems = produce(checkedItems, draft => {
      checkedItems["all"] = false;
      for (let job of jobsList) {
        draft[job.id] = false;
      }
    });
    // form initial state object using checkedItems obj
    let initialState = produce(checkboxState, draft => {
      // states
      draft.noneChecked = true;
      draft.allChecked = false;
      draft.isIndeterminate = false;
      // child states
      draft.checkedItems = checkedItems;
    });

    setCheckboxState(initialState);
  }, [jobsList]);

  function handleParentCheckboxClicked() {
    // update checked items based on previous state
    let updatedCheckedItems;
    if (checkboxState.isIndeterminate) {
      updatedCheckedItems = produce(checkboxState.checkedItems, draft => {
        draft["all"] = true;
        for (let key of Object.keys(checkboxState.checkedItems)) {
          draft[key] = true;
        }
      });
    }
    if (checkboxState.noneChecked) {
      updatedCheckedItems = produce(checkboxState.checkedItems, draft => {
        draft["all"] = true;
        for (let key of Object.keys(checkboxState.checkedItems)) {
          draft[key] = true;
        }
      });
    }
    if (checkboxState.allChecked) {
      updatedCheckedItems = produce(checkboxState.checkedItems, draft => {
        draft["all"] = false;
        for (let key of Object.keys(checkboxState.checkedItems)) {
          draft[key] = false;
        }
      });
    }

    // use updated checked items state to determine parent and child state flags
    let someTrue = false;
    let someFalse = false;
    for (let key of Object.keys(updatedCheckedItems)) {
      // guard: don't include parent checkbox in determining parent state
      if (key === "all") {
        continue;
      }
      if (updatedCheckedItems[key] === true) {
        someTrue = true;
        continue;
      }
      someFalse = true;
    }
    let allChecked = !someFalse;
    let noneChecked = !someTrue;
    let isIndeterminate = someTrue && someFalse;

    // update state
    let updatedState = produce(checkboxState, draft => {
      // states
      draft.noneChecked = noneChecked;
      draft.allChecked = allChecked;
      draft.isIndeterminate = isIndeterminate;
      // child states
      draft.checkedItems = updatedCheckedItems;
    });

    setCheckboxState(updatedState);
  }

  function handleChildCheckboxClicked(jobId) {
    // update checked items based on previous state
    let updatedCheckedItems = produce(checkboxState.checkedItems, draft => {
      draft[jobId] = !checkboxState.checkedItems[jobId];
    });

    // use updated checked items state to determine parent and child state flags
    let someTrue = false;
    let someFalse = false;
    for (let key of Object.keys(updatedCheckedItems)) {
      // guard: don't include parent checkbox in determining parent state
      if (key === "all") {
        continue;
      }
      if (updatedCheckedItems[key] === true) {
        someTrue = true;
        continue;
      }
      someFalse = true;
    }
    let allChecked = !someFalse;
    let noneChecked = !someTrue;
    let isIndeterminate = someTrue && someFalse;

    // update state
    let updatedState = produce(checkboxState, draft => {
      // states
      draft.noneChecked = noneChecked;
      draft.allChecked = allChecked;
      draft.isIndeterminate = isIndeterminate;
      // child states
      draft.checkedItems = updatedCheckedItems;
    });

    setCheckboxState(updatedState);
  }

  return (
    <Grid h="100%" w="100%" p="2" templateRows="60px 60px 1fr">
      {/* action bar */}
      <Flex>
        <Menu>
          <MenuButton as={Button} rightIcon="chevron-down" variantColor="teal">
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Stack isInline spacing={2}>
                <Text>Edit</Text>
                <Icon name="edit" color="teal.500" />
              </Stack>
            </MenuItem>
            <MenuItem>
              <Stack isInline spacing={2}>
                <Text>Delete</Text>
                <Icon name="delete" color="red.500" />
              </Stack>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {/* <table header> */}
      <Grid
        alignItems="center"
        borderBottom="1px #CCC solid"
        h="100%"
        minWidth="1200px"
        width="100%"
        templateColumns="auto 30fr 10fr 55fr"
        columnGap={4}
        p={2}
      >
        <Flex>
          <Checkbox
            id={"all"}
            size="lg"
            variantColor="teal"
            borderColor="#CCC"
            isChecked={checkboxState.allChecked}
            isIndeterminate={checkboxState.isIndeterminate}
            onChange={() => handleParentCheckboxClicked()}
          />
        </Flex>
        <Heading as="h3" size="md">
          Name
        </Heading>
        <Heading as="h3" size="md">
          Type
        </Heading>
        <Heading as="h3" size="md">
          Command string
        </Heading>
      </Grid>
      <Box w="100%" h="100%">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={jobsList.length}
              itemData={{ checkboxState, handleChildCheckboxClicked, jobsList }}
              itemSize={45}
            >
              {JobRow}
            </List>
          )}
        </AutoSizer>
      </Box>
    </Grid>
  );
}

function JobRow({ data, index }) {
  // a little messy but not too bad, I think using the job id to manage checkbox state is okay
  let jobData = data.jobsList[index];
  let isChecked = data.checkboxState.checkedItems[jobData.id];

  return (
    <Grid
      alignContent="center"
      borderBottom="1px #CCC solid"
      color="gray.800"
      fontSize="xl"
      minWidth="1200px"
      width="100%" // so it doesn't cover right highlight outline, I think this is okay? *shrug*
      height="45px"
      templateColumns="auto 30fr 10fr 55fr"
      columnGap={4}
      transition="all 0.2s"
      px={2}
      py={4}
    >
      <Flex>
        <Checkbox
          size="lg"
          variantColor="teal"
          borderColor="#CCC"
          isChecked={isChecked}
          onChange={() => data.handleChildCheckboxClicked(jobData.id)}
        />
      </Flex>
      <Flex fontSize="md" w="100%" align="center">
        <Text fontSize="md">{jobData.name}</Text>
      </Flex>
      <Flex fontSize="md" w="100%" align="center">
        <Text fontSize="md">{jobData.type}</Text>
      </Flex>
      <Flex fontSize="md" w="100%" align="center">
        <Text fontSize="md">{jobData.commandString}</Text>
      </Flex>
    </Grid>
  );
}
