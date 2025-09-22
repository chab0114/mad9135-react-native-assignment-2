import { RandomUserApiResponse, RandomUserApiUser, User } from "../types/User";

const BASE_URL = "https://randomuser.me/api/";

// Transform API user to our app's User interface
const transformApiUserToUser = (apiUser: RandomUserApiUser): User => {
  return {
    uuid: apiUser.login.uuid,
    name: {
      first: apiUser.name.first,
      last: apiUser.name.last,
    },
    picture: {
      thumbnail: apiUser.picture.thumbnail,
    },
  };
};

// Fetch users from Random User API
export const fetchUsers = async (count: number = 10): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}?results=${count}`);
  const data: RandomUserApiResponse = await response.json();
  return data.results.map(transformApiUserToUser);
};

