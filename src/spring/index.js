import SpringX from "./core";
import Storage from "./storage";
import { StorageFactory } from "./storage";
import OAuth2 from "./oauth2";
import Interceptor from "./interceptor";
import UserData from "./userData";

SpringX.use(Storage);
SpringX.use(OAuth2);
SpringX.use(Interceptor);
SpringX.use(UserData);

export default SpringX;

export { StorageFactory };
