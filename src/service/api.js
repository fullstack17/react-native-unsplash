import AppConfig from '../config';
import { apiModels } from './apiModel';

const { Unsplash } = AppConfig;


export const getUnsplashUsers = async (page, query) => {
  const res = await apiModels(`search/users?per_page=15&page=${page}&query=${query}&client_id=${Unsplash.clientID}`, 'GET', null, null);
  console.info('res getUnsplashUsers', res);
  debugger;
  return res;
};