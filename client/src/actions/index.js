import axios from 'axios';
import { FETCH _USER } from './types';

const fetchUser = () => {
  axios.get('/api/current_user');
};
