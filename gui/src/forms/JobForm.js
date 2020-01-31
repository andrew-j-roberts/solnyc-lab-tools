/**
 * JobForm.js
 * Implements a CLI command builder using Formik and react-select.
 * @author Andrew Roberts
 */

import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Grid,
  Heading,
  Input,
  Stack,
  Text,
  theme,
  useClipboard
} from "@chakra-ui/core";
import { CustomSelect, CustomCreatableSelect } from "../CustomSelect";

export default function JobForm() {
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("");

  let form = null;
  switch (jobType) {
    case "sdkperf_c":
      form = <SdkperfCForm jobName={jobName} />;
      break;
    case "sdkperf_java":
      form = <SdkperfJavaForm jobName={jobName} />;
      break;
    case "sdkperf_jms":
      form = <SdkperfJmsForm jobName={jobName} />;
      break;
    case "sdkperf_mqtt":
      form = <SdkperfMqttForm jobName={jobName} />;
      break;
    case "sdkperf_rest":
      form = <SdkperfRestForm jobName={jobName} />;
      break;
  }

  return (
    <Stack width="1000px" p={4}>
      <Heading as="h2" size="xl">
        Add a job
      </Heading>
      <Formik
        initialValues={{
          name: "",
          type: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Grid templateColumns="1fr 1fr" columnGap="25px">
          <Field name="name">
            {({
              field, // { name, value, onChange, onBlur }
              form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta
            }) => (
              <FormControl marginBottom={theme.space[4]}>
                <FormLabel htmlFor="jobType" w={"100%"}>
                  Name
                </FormLabel>
                <Input {...field} id="name" placeholder="E.g. basic sdkperf_mqtt consumer" />
              </FormControl>
            )}
          </Field>
          <Field name="type">
            {({
              field, // { name, value, onChange, onBlur }
              form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta
            }) => (
              <FormControl marginBottom={theme.space[4]}>
                <FormLabel htmlFor="type" w={"100%"}>
                  Type
                </FormLabel>
                <CustomSelect
                  field={field}
                  form={form}
                  options={[
                    { label: "sdkperf_c", value: "sdkperf_c" },
                    { label: "sdkperf_java", value: "sdkperf_java" },
                    { label: "sdkperf_jms", value: "sdkperf_jms" },
                    { label: "sdkperf_mqtt", value: "sdkperf_mqtt" },
                    { label: "sdkperf_rest", value: "sdkperf_rest" }
                  ]}
                  placeholder={"Select..."}
                  isMulti={false}
                  updateParentCb={setJobType}
                />
              </FormControl>
            )}
          </Field>
        </Grid>
      </Formik>
      {form}
    </Stack>
  );
}

function CommandBuilder({ command, values }) {
  // reduce command options from form into command options string
  let options = "";
  for (let key of Object.keys(values)) {
    // guard: don't include command as an option
    if (key === "command") {
      continue;
    }
    // guard: don't include keys that have empty values
    if (!values[key]) {
      continue;
    }

    // if the value is a non-empty string, append its value to the list of options
    if (typeof values[key] === "string") {
      options += `-${key}=${values[key]} `;
      continue;
    }

    // if the value is a non-empty array, include all its values in the option value
    if (typeof values[key] === "object") {
      if (values[key].length > 0) {
        let commaDelimitedValues = "";
        for (let value of values[key]) {
          commaDelimitedValues += `${value},`;
        }
        commaDelimitedValues = commaDelimitedValues.slice(0, -1); // remove trailing comma
        options += `-${key}=${commaDelimitedValues} `;
        continue;
      }
    }

    // if the value is a non-empty string, append its value to the list of options
    if (typeof values[key] === "boolean") {
      options += `-${key} `;
    }
  }

  // chakra clipboard
  const { onCopy, hasCopied } = useClipboard(`${command} ${options}`);

  return (
    <Stack isInline bg="gray.800" height="66px" alignItems="center" spacing={2} px={4}>
      <Text color="gray.50" fontSize={"lg"} fontFamily="mono">
        ▶
      </Text>
      <Text color="green.400" fontSize={"lg"} fontFamily="mono">
        {command}
      </Text>
      <Text color="gray.50" fontSize={"lg"} fontFamily="mono">
        {options}
      </Text>
      <Button onClick={onCopy} ml={"auto"}>
        {hasCopied ? "Copied" : "Copy"}
      </Button>
    </Stack>
  );
}

function SdkperfCForm({ jobName }) {
  return (
    <div>
      <Formik
        initialValues={{
          name: `${jobName}`,
          command: "sdkperf_c",
          cip: "localhost:55555",
          cu: "",
          cp: "",
          cc: "",
          z: "",
          sql: [],
          stl: [],
          tqe: "",
          pql: [],
          ptl: [],
          mt: "",
          mn: "",
          mr: "",
          msa: [],
          q: false,
          md: false
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            <Text marginBottom={4}>Command</Text>
            <CommandBuilder command={"sdkperf_c"} values={values} />
            <Stack p={3}>
              <Accordion allowMultiple>
                <AccordionItem>
                  <AccordionHeader borderBottom="1px solid #CCC">
                    <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                      Connection Options
                    </Flex>
                    <AccordionIcon />
                  </AccordionHeader>
                  <AccordionPanel pb={4}>
                    <Field name="cip">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]} isInvalid={errors.cip && touched.cip}>
                          <FormLabel htmlFor="cip" w={"100%"}>
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>-cip=host</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  host (often IP:port) of the Solace PubSub+ event broker
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <Input {...field} id="cip" placeholder="E.g. localhost:55555" />
                          <FormErrorMessage>{errors.cip}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="cu">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]} isInvalid={errors.cu && touched.cu}>
                          <FormLabel htmlFor="cu" w={"100%"}>
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>‑cu=user[@vpn]</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  client username and message VPN name
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <Input {...field} id="cu" placeholder="E.g. user01@vpn01" />
                          <FormErrorMessage>{errors.cu}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="cp">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]} isInvalid={errors.cp && touched.cp}>
                          <FormLabel htmlFor="cp" w={"100%"}>
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>‑cp=string</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  client password
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <Input {...field} id="cp" placeholder="E.g. secret" />
                          <FormErrorMessage>{errors.cp}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="cc">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]} isInvalid={errors.cc && touched.cc}>
                          <FormLabel htmlFor="cc" w={"100%"}>
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>‑cc=int</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  number of client connections
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <Input {...field} id="cc" placeholder="E.g. 1" />
                          <FormErrorMessage>{errors.cc}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="z">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]} isInvalid={errors.z && touched.z}>
                          <FormLabel htmlFor="z" w={"100%"}>
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>‑z=int</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  enables compression and specifies compression level
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <Input {...field} id="z" placeholder="E.g. 1" />
                          <FormErrorMessage>{errors.z}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader borderBottom="1px solid #CCC">
                    <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                      Subscription Options
                    </Flex>
                    <AccordionIcon />
                  </AccordionHeader>
                  <AccordionPanel pb={4}>
                    <Field name="sql">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]}>
                          <FormLabel htmlFor="sql">
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>-sql=list</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  list of queue names from which clients will receive messages
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <CustomCreatableSelect
                            field={field}
                            form={form}
                            options={[
                              { label: "try-me", value: "try-me" },
                              { label: "demo", value: "demo" },
                              { label: "test", value: "test" },
                              { label: "foo", value: "foo" },
                              { label: "bar", value: "bar" },
                              { label: "baz", value: "baz" },
                              { label: "qux", value: "qux" }
                            ]}
                            placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                            isMulti={true}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="stl">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]}>
                          <FormLabel htmlFor="stl">
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>-stl=list</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  list of topics that are applied as subscriptions (or mapped onto queues if used with –sql)
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <CustomCreatableSelect
                            field={field}
                            form={form}
                            options={[
                              { label: "try-me", value: "try-me" },
                              { label: "demo", value: "demo" },
                              { label: "test", value: "test" },
                              { label: "foo", value: "foo" },
                              { label: "bar", value: "bar" },
                              { label: "baz", value: "baz" },
                              { label: "qux", value: "qux" }
                            ]}
                            placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                            isMulti={true}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="tqe">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]}>
                          <FormLabel htmlFor="tqe">
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>-tqe=int</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  number of temporary queue endpoints to create per client.
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <Input {...field} id="tqe" placeholder="E.g. 1" />
                        </FormControl>
                      )}
                    </Field>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader borderBottom="1px solid #CCC">
                    <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                      Publishing Options
                    </Flex>
                    <AccordionIcon />
                  </AccordionHeader>
                  <AccordionPanel pb={4}>
                    <Field name="pql">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]}>
                          <FormLabel htmlFor="pql">
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>-pql=list</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  list of queue names to which messages will be published
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <CustomCreatableSelect
                            field={field}
                            form={form}
                            options={[
                              { label: "try-me", value: "try-me" },
                              { label: "demo", value: "demo" },
                              { label: "test", value: "test" },
                              { label: "foo", value: "foo" },
                              { label: "bar", value: "bar" },
                              { label: "baz", value: "baz" },
                              { label: "qux", value: "qux" }
                            ]}
                            placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                            isMulti={true}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="ptl">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]}>
                          <FormLabel htmlFor="ptl">
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>-ptl=list</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  list of topics to which messages will be published
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <CustomCreatableSelect
                            field={field}
                            form={form}
                            options={[
                              { label: "try-me", value: "try-me" },
                              { label: "demo", value: "demo" },
                              { label: "test", value: "test" },
                              { label: "foo", value: "foo" },
                              { label: "bar", value: "bar" },
                              { label: "baz", value: "baz" },
                              { label: "qux", value: "qux" }
                            ]}
                            placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                            isMulti={true}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="mt">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]}>
                          <FormLabel htmlFor="mt">
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>-mt=string</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  message type for published messages, default is "direct"
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <CustomSelect
                            field={field}
                            form={form}
                            options={[
                              { label: "persistent", value: "persistent" },
                              { label: "nonpersistent", value: "nonpersistent" },
                              { label: "direct", value: "direct" }
                            ]}
                            placeholder={"Select..."}
                            isMulti={false}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="mn">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]}>
                          <FormLabel htmlFor="mn">
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>-mn=int</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  total number of messages to publish
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <Input {...field} id="tqe" placeholder="E.g. 1" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="mr">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]} isInvalid={errors.mr && touched.mr}>
                          <FormLabel htmlFor="mr">
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>-mr=int</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  publishing rate in messages per second
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <Input {...field} id="mr" placeholder="E.g. 1" />
                          <FormErrorMessage>{errors.mr}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="msa">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]}>
                          <FormLabel htmlFor="mt">
                            <Grid templateColumns="150px 1fr">
                              <Box>
                                <Text>-msa=list</Text>
                              </Box>
                              <Box>
                                <Text fontStyle="italic" as="i" color="gray.500">
                                  list of sizes in bytes for auto-generated binary attachment payloads
                                </Text>
                              </Box>
                            </Grid>
                          </FormLabel>
                          <CustomCreatableSelect
                            field={field}
                            form={form}
                            options={[
                              { label: "10 B", value: "10" },
                              { label: "100 B", value: "100" },
                              { label: "200 B", value: "200" },
                              { label: "500 B", value: "500" },
                              { label: "1 KB", value: "1000" },
                              { label: "10 KB", value: "10000" }
                            ]}
                            placeholder={"Select from common attachment sizes or type and press enter to add custom sizes to the list..."}
                            isMulti={true}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader borderBottom="1px solid #CCC">
                    <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                      General Options
                    </Flex>
                    <AccordionIcon />
                  </AccordionHeader>
                  <AccordionPanel pb={4}>
                    <Field name="q">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]} isInvalid={errors.q && touched.q}>
                          <Grid templateColumns="75px 1fr 200px" columnGap={4}>
                            <Box>
                              <Text>-q</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                enable quiet mode to suppress real time message rates
                              </Text>
                            </Box>
                            <Stack isInline spacing={4}>
                              <Text>Enabled?</Text>
                              <Input {...field} id="q" type="checkbox" width="auto" height="auto" />
                            </Stack>
                          </Grid>
                          <FormErrorMessage>{errors.q}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="md">
                      {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta
                      }) => (
                        <FormControl marginBottom={theme.space[4]} isInvalid={errors.md && touched.md}>
                          <Grid templateColumns="75px 1fr 200px" columnGap={4}>
                            <Box>
                              <Text>-md</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                dump all received messages to the screen as text. Do not use this with high message rates.
                              </Text>
                            </Box>
                            <Stack isInline spacing={4}>
                              <Text>Enabled?</Text>
                              <Input {...field} id="md" type="checkbox" width="auto" height="auto" />
                            </Stack>
                          </Grid>
                          <FormErrorMessage>{errors.md}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
            <Button w="100%" variantColor="green" type="submit" disabled={isSubmitting} marginTop={theme.space[10]}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function SdkperfJavaForm({ jobName }) {
  return (
    <div>
      <Formik
        initialValues={{
          name: `${jobName}`,
          command: "sdkperf_java",
          cip: "localhost:55555",
          cu: "",
          cp: "",
          cc: "",
          z: "",
          sql: [],
          stl: [],
          tqe: "",
          pql: [],
          ptl: [],
          mt: "",
          mn: "",
          mr: "",
          msa: [],
          q: false,
          md: false
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            <CommandStringPreview command={"sdkperf_java"} values={values} />
            <Accordion allowMultiple>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Connection Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="cip">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cip && touched.cip}>
                        <FormLabel htmlFor="cip" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-cip=host</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                host (often IP:port) of the Solace PubSub+ event broker
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cip" placeholder="E.g. localhost:55555" />
                        <FormErrorMessage>{errors.cip}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cu">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cu && touched.cu}>
                        <FormLabel htmlFor="cu" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cu=user[@vpn]</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                client username and message VPN name
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cu" placeholder="E.g. user01@vpn01" />
                        <FormErrorMessage>{errors.cu}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cp">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cp && touched.cp}>
                        <FormLabel htmlFor="cp" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cp=string</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                client password
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cp" placeholder="E.g. secret" />
                        <FormErrorMessage>{errors.cp}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cc">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cc && touched.cc}>
                        <FormLabel htmlFor="cc" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cc=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                number of client connections
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cc" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.cc}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="z">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.z && touched.z}>
                        <FormLabel htmlFor="z" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑z=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                enables compression and specifies compression level
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="z" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.z}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Subscription Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="sql">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="sql">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-sql=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of queue names from which clients will receive messages
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="stl">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="stl">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-stl=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of topics that are applied as subscriptions (or mapped onto queues if used with –sql)
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="tqe">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="tqe">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-tqe=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                number of temporary queue endpoints to create per client.
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="tqe" placeholder="E.g. 1" />
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Publishing Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="pql">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="pql">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-pql=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of queue names to which messages will be published
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="ptl">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="ptl">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-ptl=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of topics to which messages will be published
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mt">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mt">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mt=string</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                message type for published messages, default is "direct"
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "persistent", value: "persistent" },
                            { label: "nonpersistent", value: "nonpersistent" },
                            { label: "direct", value: "direct" }
                          ]}
                          placeholder={"Select..."}
                          isMulti={false}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mn">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mn">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mn=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                total number of messages to publish
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="tqe" placeholder="E.g. 1" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mr">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.mr && touched.mr}>
                        <FormLabel htmlFor="mr">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mr=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                publishing rate in messages per second
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="mr" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.mr}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="msa">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mt">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-msa=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of sizes in bytes for auto-generated binary attachment payloads
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "10 B", value: "10" },
                            { label: "100 B", value: "100" },
                            { label: "200 B", value: "200" },
                            { label: "500 B", value: "500" },
                            { label: "1 KB", value: "1000" },
                            { label: "10 KB", value: "10000" }
                          ]}
                          placeholder={"Select from common attachment sizes or type and press enter to add custom sizes to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    General Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="q">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.q && touched.q}>
                        <Grid templateColumns="75px 1fr 200px" columnGap={4}>
                          <Box>
                            <Text>-q</Text>
                          </Box>
                          <Box>
                            <Text fontStyle="italic" as="i" color="gray.500">
                              enable quiet mode to suppress real time message rates
                            </Text>
                          </Box>
                          <Stack isInline spacing={4}>
                            <Text>Enabled?</Text>
                            <Input {...field} id="q" type="checkbox" width="auto" height="auto" />
                          </Stack>
                        </Grid>
                        <FormErrorMessage>{errors.q}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="md">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.md && touched.md}>
                        <Grid templateColumns="75px 1fr 200px" columnGap={4}>
                          <Box>
                            <Text>-md</Text>
                          </Box>
                          <Box>
                            <Text fontStyle="italic" as="i" color="gray.500">
                              dump all received messages to the screen as text. Do not use this with high message rates.
                            </Text>
                          </Box>
                          <Stack isInline spacing={4}>
                            <Text>Enabled?</Text>
                            <Input {...field} id="md" type="checkbox" width="auto" height="auto" />
                          </Stack>
                        </Grid>
                        <FormErrorMessage>{errors.md}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function SdkperfJmsForm({ jobName }) {
  return (
    <div>
      <Formik
        initialValues={{
          name: `${jobName}`,
          command: "sdkperf_jms",
          cip: "localhost:55555",
          cu: "",
          cp: "",
          cc: "",
          z: "",
          sql: [],
          stl: [],
          tqe: "",
          pql: [],
          ptl: [],
          mt: "",
          mn: "",
          mr: "",
          msa: [],
          q: false,
          md: false,
          jcf: "",
          jndi: false
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            <CommandStringPreview command={"sdkperf_jms"} values={values} />
            <Accordion allowMultiple>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Connection Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="cip">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cip && touched.cip}>
                        <FormLabel htmlFor="cip" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-cip=host</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                host (often IP:port) of the Solace PubSub+ event broker
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cip" placeholder="E.g. localhost:55555" />
                        <FormErrorMessage>{errors.cip}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cu">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cu && touched.cu}>
                        <FormLabel htmlFor="cu" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cu=user[@vpn]</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                client username and message VPN name
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cu" placeholder="E.g. user01@vpn01" />
                        <FormErrorMessage>{errors.cu}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cp">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cp && touched.cp}>
                        <FormLabel htmlFor="cp" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cp=string</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                client password
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cp" placeholder="E.g. secret" />
                        <FormErrorMessage>{errors.cp}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cc">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cc && touched.cc}>
                        <FormLabel htmlFor="cc" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cc=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                number of client connections
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cc" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.cc}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="z">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.z && touched.z}>
                        <FormLabel htmlFor="z" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑z=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                enables compression and specifies compression level
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="z" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.z}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Subscription Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="sql">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="sql">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-sql=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of queue names from which clients will receive messages
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="stl">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="stl">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-stl=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of topics that are applied as subscriptions (or mapped onto queues if used with –sql)
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="tqe">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="tqe">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-tqe=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                number of temporary queue endpoints to create per client.
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="tqe" placeholder="E.g. 1" />
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Publishing Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="pql">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="pql">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-pql=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of queue names to which messages will be published
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="ptl">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="ptl">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-ptl=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of topics to which messages will be published
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mt">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mt">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mt=string</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                message type for published messages, default is "direct"
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "persistent", value: "persistent" },
                            { label: "nonpersistent", value: "nonpersistent" },
                            { label: "direct", value: "direct" }
                          ]}
                          placeholder={"Select..."}
                          isMulti={false}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mn">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mn">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mn=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                total number of messages to publish
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="tqe" placeholder="E.g. 1" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mr">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.mr && touched.mr}>
                        <FormLabel htmlFor="mr">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mr=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                publishing rate in messages per second
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="mr" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.mr}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="msa">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mt">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-msa=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of sizes in bytes for auto-generated binary attachment payloads
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "10 B", value: "10" },
                            { label: "100 B", value: "100" },
                            { label: "200 B", value: "200" },
                            { label: "500 B", value: "500" },
                            { label: "1 KB", value: "1000" },
                            { label: "10 KB", value: "10000" }
                          ]}
                          placeholder={"Select from common attachment sizes or type and press enter to add custom sizes to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    General Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="q">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.q && touched.q}>
                        <Grid templateColumns="75px 1fr 200px" columnGap={4}>
                          <Box>
                            <Text>-q</Text>
                          </Box>
                          <Box>
                            <Text fontStyle="italic" as="i" color="gray.500">
                              enable quiet mode to suppress real time message rates
                            </Text>
                          </Box>
                          <Stack isInline spacing={4}>
                            <Text>Enabled?</Text>
                            <Input {...field} id="q" type="checkbox" width="auto" height="auto" />
                          </Stack>
                        </Grid>
                        <FormErrorMessage>{errors.q}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="md">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.md && touched.md}>
                        <Grid templateColumns="75px 1fr 200px" columnGap={4}>
                          <Box>
                            <Text>-md</Text>
                          </Box>
                          <Box>
                            <Text fontStyle="italic" as="i" color="gray.500">
                              dump all received messages to the screen as text. Do not use this with high message rates.
                            </Text>
                          </Box>
                          <Stack isInline spacing={4}>
                            <Text>Enabled?</Text>
                            <Input {...field} id="md" type="checkbox" width="auto" height="auto" />
                          </Stack>
                        </Grid>
                        <FormErrorMessage>{errors.md}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    JMS Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="jcf">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.jcf && touched.jcf}>
                        <FormLabel htmlFor="jcf" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑jcf=string</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                JMS connection factory. Default: /jms/cf/default
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="jcf" placeholder="E.g. /jms/cf/demo" />
                        <FormErrorMessage>{errors.jcf}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="jndi">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.jndi && touched.jndi}>
                        <Grid templateColumns="150px 1fr 200px">
                          <Box>
                            <Text>-jndi</Text>
                          </Box>
                          <Box>
                            <Text fontStyle="italic" as="i" color="gray.500">
                              enable JNDI topic and queue lookups. By default queues and topics endpoints are created from the Session without JNDI lookup.
                            </Text>
                          </Box>
                          <Stack isInline spacing={4}>
                            <Text>Enabled?</Text>
                            <Input {...field} id="jndi" type="checkbox" width="auto" height="auto" />
                          </Stack>
                        </Grid>
                        <FormErrorMessage>{errors.jndi}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function SdkperfMqttForm({ jobName }) {
  return (
    <div>
      <Formik
        initialValues={{
          name: `${jobName}`,
          command: "sdkperf_mqtt",
          cip: "localhost:55555",
          cu: "",
          cp: "",
          cc: "",
          z: "",
          sql: [],
          stl: [],
          tqe: "",
          pql: [],
          ptl: [],
          mt: "",
          mn: "",
          mr: "",
          msa: [],
          q: false,
          md: false
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            <CommandStringPreview command={"sdkperf_mqtt"} values={values} />
            <Accordion allowMultiple>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Connection Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="cip">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cip && touched.cip}>
                        <FormLabel htmlFor="cip" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-cip=host</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                host (often IP:port) of the Solace PubSub+ event broker
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cip" placeholder="E.g. localhost:55555" />
                        <FormErrorMessage>{errors.cip}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cu">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cu && touched.cu}>
                        <FormLabel htmlFor="cu" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cu=user[@vpn]</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                client username and message VPN name
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cu" placeholder="E.g. user01@vpn01" />
                        <FormErrorMessage>{errors.cu}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cp">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cp && touched.cp}>
                        <FormLabel htmlFor="cp" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cp=string</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                client password
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cp" placeholder="E.g. secret" />
                        <FormErrorMessage>{errors.cp}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cc">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cc && touched.cc}>
                        <FormLabel htmlFor="cc" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cc=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                number of client connections
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cc" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.cc}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="z">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.z && touched.z}>
                        <FormLabel htmlFor="z" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑z=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                enables compression and specifies compression level
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="z" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.z}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Subscription Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="sql">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="sql">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-sql=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of queue names from which clients will receive messages
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="stl">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="stl">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-stl=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of topics that are applied as subscriptions (or mapped onto queues if used with –sql)
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="tqe">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="tqe">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-tqe=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                number of temporary queue endpoints to create per client.
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="tqe" placeholder="E.g. 1" />
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Publishing Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="pql">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="pql">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-pql=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of queue names to which messages will be published
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="ptl">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="ptl">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-ptl=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of topics to which messages will be published
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mt">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mt">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mt=string</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                message type for published messages, default is "direct"
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "persistent", value: "persistent" },
                            { label: "nonpersistent", value: "nonpersistent" },
                            { label: "direct", value: "direct" }
                          ]}
                          placeholder={"Select..."}
                          isMulti={false}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mn">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mn">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mn=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                total number of messages to publish
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="tqe" placeholder="E.g. 1" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mr">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.mr && touched.mr}>
                        <FormLabel htmlFor="mr">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mr=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                publishing rate in messages per second
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="mr" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.mr}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="msa">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mt">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-msa=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of sizes in bytes for auto-generated binary attachment payloads
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "10 B", value: "10" },
                            { label: "100 B", value: "100" },
                            { label: "200 B", value: "200" },
                            { label: "500 B", value: "500" },
                            { label: "1 KB", value: "1000" },
                            { label: "10 KB", value: "10000" }
                          ]}
                          placeholder={"Select from common attachment sizes or type and press enter to add custom sizes to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    General Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="q">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.q && touched.q}>
                        <Grid templateColumns="75px 1fr 200px" columnGap={4}>
                          <Box>
                            <Text>-q</Text>
                          </Box>
                          <Box>
                            <Text fontStyle="italic" as="i" color="gray.500">
                              enable quiet mode to suppress real time message rates
                            </Text>
                          </Box>
                          <Stack isInline spacing={4}>
                            <Text>Enabled?</Text>
                            <Input {...field} id="q" type="checkbox" width="auto" height="auto" />
                          </Stack>
                        </Grid>
                        <FormErrorMessage>{errors.q}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="md">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.md && touched.md}>
                        <Grid templateColumns="75px 1fr 200px" columnGap={4}>
                          <Box>
                            <Text>-md</Text>
                          </Box>
                          <Box>
                            <Text fontStyle="italic" as="i" color="gray.500">
                              dump all received messages to the screen as text. Do not use this with high message rates.
                            </Text>
                          </Box>
                          <Stack isInline spacing={4}>
                            <Text>Enabled?</Text>
                            <Input {...field} id="md" type="checkbox" width="auto" height="auto" />
                          </Stack>
                        </Grid>
                        <FormErrorMessage>{errors.md}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function SdkperfRestForm({ jobName }) {
  return (
    <div>
      <Formik
        initialValues={{
          name: `${jobName}`,
          command: "sdkperf_rest",
          cip: "localhost:55555",
          cu: "",
          cp: "",
          cc: "",
          z: "",
          sql: [],
          stl: [],
          tqe: "",
          pql: [],
          ptl: [],
          mt: "",
          mn: "",
          mr: "",
          msa: [],
          q: false,
          md: false
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            <CommandStringPreview command={"sdkperf_rest"} values={values} />
            <Accordion allowMultiple>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Connection Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="cip">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cip && touched.cip}>
                        <FormLabel htmlFor="cip" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-cip=host</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                host (often IP:port) of the Solace PubSub+ event broker
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cip" placeholder="E.g. localhost:55555" />
                        <FormErrorMessage>{errors.cip}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cu">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cu && touched.cu}>
                        <FormLabel htmlFor="cu" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cu=user[@vpn]</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                client username and message VPN name
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cu" placeholder="E.g. user01@vpn01" />
                        <FormErrorMessage>{errors.cu}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cp">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cp && touched.cp}>
                        <FormLabel htmlFor="cp" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cp=string</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                client password
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cp" placeholder="E.g. secret" />
                        <FormErrorMessage>{errors.cp}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="cc">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.cc && touched.cc}>
                        <FormLabel htmlFor="cc" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑cc=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                number of client connections
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="cc" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.cc}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="z">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.z && touched.z}>
                        <FormLabel htmlFor="z" w={"100%"}>
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>‑z=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                enables compression and specifies compression level
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="z" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.z}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Subscription Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="sql">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="sql">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-sql=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of queue names from which clients will receive messages
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="stl">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="stl">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-stl=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of topics that are applied as subscriptions (or mapped onto queues if used with –sql)
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="tqe">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="tqe">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-tqe=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                number of temporary queue endpoints to create per client.
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="tqe" placeholder="E.g. 1" />
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    Publishing Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="pql">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="pql">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-pql=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of queue names to which messages will be published
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="ptl">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="ptl">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-ptl=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of topics to which messages will be published
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "try-me", value: "try-me" },
                            { label: "demo", value: "demo" },
                            { label: "test", value: "test" },
                            { label: "foo", value: "foo" },
                            { label: "bar", value: "bar" },
                            { label: "baz", value: "baz" },
                            { label: "qux", value: "qux" }
                          ]}
                          placeholder={"Select from common topics or type and press enter to add custom topics to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mt">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mt">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mt=string</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                message type for published messages, default is "direct"
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "persistent", value: "persistent" },
                            { label: "nonpersistent", value: "nonpersistent" },
                            { label: "direct", value: "direct" }
                          ]}
                          placeholder={"Select..."}
                          isMulti={false}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mn">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mn">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mn=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                total number of messages to publish
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="tqe" placeholder="E.g. 1" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="mr">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.mr && touched.mr}>
                        <FormLabel htmlFor="mr">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-mr=int</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                publishing rate in messages per second
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <Input {...field} id="mr" placeholder="E.g. 1" />
                        <FormErrorMessage>{errors.mr}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="msa">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]}>
                        <FormLabel htmlFor="mt">
                          <Grid templateColumns="150px 1fr">
                            <Box>
                              <Text>-msa=list</Text>
                            </Box>
                            <Box>
                              <Text fontStyle="italic" as="i" color="gray.500">
                                list of sizes in bytes for auto-generated binary attachment payloads
                              </Text>
                            </Box>
                          </Grid>
                        </FormLabel>
                        <CustomCreatableSelect
                          field={field}
                          form={form}
                          options={[
                            { label: "10 B", value: "10" },
                            { label: "100 B", value: "100" },
                            { label: "200 B", value: "200" },
                            { label: "500 B", value: "500" },
                            { label: "1 KB", value: "1000" },
                            { label: "10 KB", value: "10000" }
                          ]}
                          placeholder={"Select from common attachment sizes or type and press enter to add custom sizes to the list..."}
                          isMulti={true}
                        />
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader borderBottom="1px solid #CCC">
                  <Flex flex="1" height="30px" textAlign="left" alignItems="center">
                    General Options
                  </Flex>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Field name="q">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.q && touched.q}>
                        <Grid templateColumns="75px 1fr 200px" columnGap={4}>
                          <Box>
                            <Text>-q</Text>
                          </Box>
                          <Box>
                            <Text fontStyle="italic" as="i" color="gray.500">
                              enable quiet mode to suppress real time message rates
                            </Text>
                          </Box>
                          <Stack isInline spacing={4}>
                            <Text>Enabled?</Text>
                            <Input {...field} id="q" type="checkbox" width="auto" height="auto" />
                          </Stack>
                        </Grid>
                        <FormErrorMessage>{errors.q}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="md">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta
                    }) => (
                      <FormControl marginBottom={theme.space[4]} isInvalid={errors.md && touched.md}>
                        <Grid templateColumns="75px 1fr 200px" columnGap={4}>
                          <Box>
                            <Text>-md</Text>
                          </Box>
                          <Box>
                            <Text fontStyle="italic" as="i" color="gray.500">
                              dump all received messages to the screen as text. Do not use this with high message rates.
                            </Text>
                          </Box>
                          <Stack isInline spacing={4}>
                            <Text>Enabled?</Text>
                            <Input {...field} id="md" type="checkbox" width="auto" height="auto" />
                          </Stack>
                        </Grid>
                        <FormErrorMessage>{errors.md}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
