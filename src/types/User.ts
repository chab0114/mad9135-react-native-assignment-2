
export interface RandomUserApiResponse {
  results: RandomUserApiUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

// Store and use in the app
export interface User {
  uuid: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
}

// Raw user from API 
export interface RandomUserApiUser {
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    uuid: string;
    username: string;
    password: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}