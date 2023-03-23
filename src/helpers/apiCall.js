import axios from 'axios';
import * as SecureStore from "expo-secure-store"

const BASE_URL = "https://api.careerkick.in/api/v1";

export const server = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 600000,
  headers: {
    'Access-Control-Allow-Origin': BASE_URL,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

export const serverUnauth = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 600000,
  headers: {
    'Access-Control-Allow-Origin': BASE_URL,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
})
