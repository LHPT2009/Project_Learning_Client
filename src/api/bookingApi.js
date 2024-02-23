import axiosClient from './axiosClient';

const bookingApi = {
  getBookingByUserId: async (id) => {
    const url = `/booking/findBookingByUserId/${id}`;
    return await axiosClient.get(url);
  },
  sendMailBooking: async (data) => {
    const url = `/booking/sendEmail`;
    return await axiosClient.post(url, data);
  },
};

export default bookingApi;
