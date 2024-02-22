import axiosClient from './axiosClient';

const bookingApi = {
  getBookingByUserId: async (id) => {
    const url = `/api/booking/findBookingByUserId/${id}`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  sendMailBooking(data) {
    const url = `/api/booking/sendEmail`;
    return axiosClient.post(url, data);
  },
};

export default bookingApi;
