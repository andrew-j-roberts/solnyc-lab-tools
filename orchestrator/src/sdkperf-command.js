/**
 * sdkperf-command.js
 * @author Andrew Roberts
 */

const sdkPerfAliasesDict = {
  C: "sdkperf_c",
  CS: "sdkperf_cs",
  JAVA: "sdkperf_java",
  MQTT: "sdkperf_mqtt",
  REST: "sdkperf_rest"
};

function SdkPerfCommand(language, options) {
  // form and return command string
  function getCommandString() {
    let sdkperfAlias = sdkPerfAliasesDict[language];
    let optionsString = "";
    for (let key of Object.keys(options)) {
      optionsString = optionsString + ` ${key}=${options[key]}`;
    }

    return `${sdkperfAlias}${optionsString}`;
  }

  return Object.freeze({
    language,
    options,
    getCommandString
  });
}

export default SdkPerfCommand;
