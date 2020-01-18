import { Machine, interpret } from "xstate";
import produce from "immer";
import shelljs from "shelljs";

function CommandBuilder() {
  let commandBuilder = {};
  commandBuilder.commands = [];

  commandBuilder.add = function() {
    console.log(test);
  };

  return commandBuilder;
}

export default CommandBuilder;
