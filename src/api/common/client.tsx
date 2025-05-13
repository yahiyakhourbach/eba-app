import { Env } from '@env';
import axios from 'axios';
export const client = axios.create({
  baseURL: Env.API_URL,
});

export const apiGoogleClient = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/',
});
