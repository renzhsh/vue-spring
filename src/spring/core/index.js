import { SpringX } from "./springx";
import RouterX from "./routerx";
import StoreX from "./storex";
import { context } from "@spring/base";

SpringX.use(RouterX);
SpringX.use(StoreX);

export default SpringX;

export { context };
