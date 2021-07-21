import { createContext } from "react";
import dateFormat from "./useDateformat";
const DateContext =createContext(()=>dateFormat(new Date()))

export default DateContext