/**
 * sdkperf-command.js
 * @author Andrew Roberts
 */

function SDKPerfCommand(languageString, optionsMap) {
  let language = languageString;
  let options = optionsMap;

  let sdkperfAliasesDict = {
    c: "sdkperf_c",
    cs: "sdkperf_cs",
    java: "sdkperf_java",
    mqtt: "sdkperf_mqtt",
    rest: "sdkperf_rest"
  };

  function getLanguage() {
    return language;
  }

  function getOptions() {
    return options;
  }

  function getCommandString() {
    // get alias to execute appropriate sdkperf implementation
    let sdkperfAlias = sdkperfAliasesDict[language];
    // form options string from options
    let optionsString = "";
    options.forEach((value, optionFlag) => {
      optionsString = optionsString + ` ${optionFlag}=${value}`;
    });
    // +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
    return `${sdkperfAlias}${optionsString}`;
  }

  return {
    getLanguage,
    getOptions,
    getCommandString
  };
}

export default SDKPerfCommand;
