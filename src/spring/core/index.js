import '../base';
import { SpringX } from './springx';
import RouterX from './routerx';
import StoreX from './storex';
import AxiosX from './axiosx';
import Storage from './storage';

SpringX.use(AxiosX);
SpringX.use(Storage);
SpringX.use(RouterX);
SpringX.use(StoreX);

export default SpringX;