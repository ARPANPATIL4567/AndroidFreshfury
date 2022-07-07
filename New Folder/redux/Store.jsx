import { createStore } from "redux";
import { reducer } from "./act_red";

export const store = createStore(reducer);
