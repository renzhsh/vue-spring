import { SpringX } from "./springx";
import RouterX from "./routerx";
import StoreX from "./storex";
import Storage from "./storage";
import context from "./context";

SpringX.use(Storage);
SpringX.use(RouterX);
SpringX.use(StoreX);

export default SpringX;

export { context };
