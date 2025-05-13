import { Env } from '@env';

import { apiGoogleClient } from '../common';

type funcProp = {
  country: string;
  street: string;
  city: string;
  zipcode: number;
};

export const getCoordinate = async ({
  country,
  street,
  city,
  zipcode,
}: funcProp) => {
  const apiKey = Env.GOOGLE_API_KEY;
  const address = `${street}, ${city}, ${zipcode}, ${country}`;
  const url = `json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const res = await apiGoogleClient.get(url);
    const location = res.data.results[0];
    if (location) {
      const formatted = location.formatted_address.toLowerCase();
      const isValid =
        formatted.includes(city.toLowerCase()) &&
        formatted.includes(country.toLowerCase());
      if (!isValid) return null;
      console.log(location.geometry.location);
      return location.geometry.location;
    }

    return location;
  } catch (error) {
    return null;
  }
};
