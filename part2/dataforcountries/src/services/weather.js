import axios from "axios";

const key = import.meta.env.VITE_WEATHERAPI_KEY;

const baseURL = "https://api.weatherapi.com/v1/current.json";

const getWeatherByCity = (city) => {
  const request = axios.get(`${baseURL}?q=${city}&key=${key}`);
  return request.then((response) => response.data);
};

export default { getWeatherByCity };
