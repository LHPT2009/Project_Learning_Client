import axiosClient from './axiosClient';

const paymentApi = {
  getAllPaymentMethod: async () => {
    const url = `/paymentmethod`;
    return await axiosClient.get(url);
  },
};

export default paymentApi;
