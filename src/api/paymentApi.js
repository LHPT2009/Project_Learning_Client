import axiosClient from './axiosClient';

const paymentApi = {
  getAllPaymentMethod: async () => {
    const url = `/api/paymentmethod`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default paymentApi;
