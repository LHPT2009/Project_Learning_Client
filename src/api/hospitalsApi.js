import axiosClient from './axiosClient';

const hospitalsApi = {
  getHospitalsOutstanding(quantity) {
    const url = `/api/hospital/random?limit=${quantity}`;
    return axiosClient.get(url);
  },
};

export default hospitalsApi;
