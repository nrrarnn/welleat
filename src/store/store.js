import { createStore } from "redux";
import { reducers } from "./index"; // Adjust the path if necessary

const store = createStore(reducers);

export default store;
