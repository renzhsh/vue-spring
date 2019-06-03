import SpringX from "./core";
import Storage from "./base/storage";
import { StorageFactory } from "./base";
import Interceptor from "./functional/interceptor";
import UserData from "./functional/userData";
import { context } from "./core";
import Auth2 from './functional/auth';

SpringX.use(Storage);
SpringX.use(Interceptor);
SpringX.use(UserData);
SpringX.use(Auth2);

export default SpringX;

export { StorageFactory };

export { context as SpringContext };
