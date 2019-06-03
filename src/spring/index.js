import SpringX from "./core";
import Storage from "./storage";
import { StorageFactory } from "./storage";
import Interceptor from "./interceptor";
import UserData from "./userData";
import { context } from "./core";
import Auth2 from './auth';

SpringX.use(Storage);
SpringX.use(Interceptor);
SpringX.use(UserData);
SpringX.use(Auth2);

export default SpringX;

export { StorageFactory };

export { context as SpringContext };
