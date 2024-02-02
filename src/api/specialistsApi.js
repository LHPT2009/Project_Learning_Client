import axiosClient from './axiosClient';

const specialistsApi = {
  getSpecialistsOutstanding(quantity) {
    const url = `/api/specialists/radom?limit=${quantity}`;
    return axiosClient.get(url);
  },
};

export default specialistsApi;
