import { RandomUserApiResponse, RandomUserApiUser } from "../types/User";

const BASE_URL = "https://randomuser.me/api/";

// Transform API user to our app's User interface
const transformUser = (apiUser: RandomUserApiUser): User => {
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
export const fetchUsers = async (results: number = 20): Promise<User[]> => {
  try {
    // Validate input
    if (results <= 0 || results > 5000) {
      throw new Error("Results must be between 1 and 5000");
    }

    