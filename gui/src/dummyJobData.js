const dummyJobData1 = {
  id: 1,
  name: `Basic sdkperf_c consumer`,
  type: `sdkperf_c`,
  options: JSON.stringify({
    "-cip": "localhost:55555",
    "-stl": ["a", "b", "c"]
  }),
  commandString: `sdkperf_c -cip=localhost:55555 -stl=a,b,c`
};

const dummyJobData2 = {
  id: 2,
  name: `Basic sdkperf_mqtt consumer`,
  type: `sdkperf_mqtt`,
  options: JSON.stringify({
    "-cip": "localhost:55555",
    "-stl": ["a", "b", "c"]
  }),
  commandString: `sdkperf_mqtt -cip=localhost:55555 -stl=a,b,c`
};

const dummyJobData3 = {
  id: 3,
  name: `Basic sdkperf_java consumer`,
  type: `sdkperf_java`,
  options: JSON.stringify({
    "-cip": "localhost:55555",
    "-stl": ["a", "b", "c"]
  }),
  commandString: `sdkperf_java -cip=localhost:55555 -stl=a,b,c`
};

const dummyJobData4 = {
  id: (Math.random() * 10) % 5,
  name: `Basic sdkperf_jms consumer`,
  type: `sdkperf_jms`,
  options: JSON.stringify({
    "-cip": "localhost:55555",
    "-stl": ["a", "b", "c"]
  }),
  commandString: `sdkperf_jms -cip=localhost:55555 -stl=a,b,c`
};

const dummyJobData5 = {
  id: (Math.random() * 10) % 5,
  name: `Basic sdkperf_rest consumer`,
  type: `sdkperf_rest`,
  options: JSON.stringify({
    "-cip": "localhost:55555",
    "-stl": ["a", "b", "c"]
  }),
  commandString: `sdkperf_rest -cip=localhost:55555 -stl=a,b,c`
};

export const dummyJobData = [
  dummyJobData1,
  dummyJobData2,
  dummyJobData3,
  dummyJobData4,
  dummyJobData5
];
