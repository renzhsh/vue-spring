/**
 * SpringX 装配器
 */

import { SpringX } from "./springx";

// base
import Storage from "@/spring/base/storage";

// core
import HttpFactory from '@/spring/core/http'; 
import RouterX from "@/spring/core/routerx";
import StoreX from "@/spring/core/storex";

// functional
import Interceptor from "@/spring/functional/interceptor";
import UserData from "@/spring/functional/userData";
import Auth2 from "@/spring/functional/auth";

SpringX.use(Storage);

SpringX.use(HttpFactory);
SpringX.use(RouterX);
SpringX.use(StoreX);

SpringX.use(Interceptor);
SpringX.use(UserData);
SpringX.use(Auth2);
