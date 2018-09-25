import axios from 'axios';
import context from './context';

context.axios = axios;

export default {
    install() {}
}