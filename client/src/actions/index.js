import axios from 'axios';

import { FETCH_USER } from './types';

console.log({ FETCH_USER });

export const fetchUser = () => async (
  dispatch
) => {
  const { data } = await axios.get(
    '/api/users/current-user'
  );

  dispatch({
    type: FETCH_USER,
    payload: data,
  });
};
