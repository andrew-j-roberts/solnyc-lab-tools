/**
 * perf-host.js
 * @author Andrew Roberts
 */

function PerfHost(ipString, numCpusParam) {
  let ip = ipString;
  let numCpus = numCpusParam;

  function getIp() {
    return ip;
  }

  function getNumCpus() {
    return numCpus;
  }

  return {
    getIp,
    getNumCpus
  };
}

export default PerfHost;
