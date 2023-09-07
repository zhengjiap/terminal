import myDayjs from "../../plugins/myDayjs";
import {CommandType} from "../command";
const dateCommand:CommandType={
    func:"date",
    name:"日期",
    options:[],
    action(options,terminal):void{
        const dateStr=myDayjs().format("YYYY-MM-DD HH:mm:ss");
        const output=`当前时间:${dateStr}`;
        terminal.writeTextResult(output)
    }
}
export default dateCommand