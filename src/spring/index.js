import './base';
import SpringX from './core';
import OAuth2 from './oauth2';
import Interceptor from './interceptor';
import UserData from './userData';

SpringX.use(OAuth2)
SpringX.use(Interceptor)
SpringX.use(UserData)

export default SpringX;
