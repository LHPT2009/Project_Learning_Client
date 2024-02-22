import axiosClient from './axiosClient';

const jwtApi = {
  validateToken: async () => {
    const url = `/api/user/validateToken`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export default jwtApi;
