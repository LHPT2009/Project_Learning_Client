import axiosClient from './axiosClient';

const hospitalsApi = {
  getHospitalsOutstanding: async (quantity) => {
    const url = `/hospital/random?limit=${quantity}`;
    return await axiosClient.get(url);
  },
};

export default hospitalsApi;
