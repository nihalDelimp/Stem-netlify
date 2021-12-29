//  https://localhost:4000
//  https://api.delimp:world/

import axios from "axios";


import { store } from '../Redux/store';

export const authAxios = () => {
  let token = store.getState( 'state' ).auth.token;
  return axios.create( {
    baseURL: "https://api.delimp.world",
    headers: {
      Authorization: `${token ? `${token}` : null}`,
    },
  } );
};

export const withoutAuthAxios = () => {
  return axios.create( {
    baseURL: "https://api.delimp.world",
  } );
};

