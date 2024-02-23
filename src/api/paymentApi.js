import axiosClient from './axiosClient';

const paymentApi = {
  getAllPaymentMethod: async () => {
    const url = `/paymentMethod`;
    return await axiosClient.get(url);
  },
};

export default paymentApi;
