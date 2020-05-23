/**
 * SpringX 装配器
 */

import { SpringX } from "./springx";

// core
import RouterX from "@/spring/core/routerx";
import StoreX from "@/spring/core/storex";

// functional
// import Auth2 from "@/spring/functional/auth";

SpringX.use(RouterX);
SpringX.use(StoreX);

// SpringX.use(Auth2);
