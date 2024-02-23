import axiosClient from './axiosClient';

const specialistsApi = {
  getSpecialistsOutstanding: async (quantity) => {
    const url = `/specialists/random?limit=${quantity}`;
    return await axiosClient.get(url);
  },
  getAllSpecialists: async () => {
    const url = `/specialists`;
    return await axiosClient.get(url);
  },
};

export default specialistsApi;
