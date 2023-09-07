import { CommandType } from "./command";
import todoCommand from "./commands/todo/todoCommand";
import dateCommand from "./commands/dateCommand";
import shortcutCommands from "./commands/terminal/shortcut/shortcutCommands";
import historyCommand from "./commands/terminal/historyCommands";
import helpCommand from "./commands/terminal/help/helpCommand";
import userCommands from "./commands/user/userCommands";
import backgroundCommand from "./commands/terminal/config/backgroundCommands";
import musicCommand from "./commands/music/musicCommands";
import baiduCommand from "./commands/search/baiduCommands";
import gameCommand from "./commands/game/gameCommand";
import weatherCommand from "./commands/weather/weatherCommand";
import csdnCommand from "./commands/search/csdnCommands";
const commandList: CommandType[] = [
  todoCommand,
  dateCommand,
  shortcutCommands,
  historyCommand,
  helpCommand,
  ...userCommands,
  backgroundCommand,
  musicCommand,
  baiduCommand,
  gameCommand,
  weatherCommand,
  csdnCommand,
];
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };
