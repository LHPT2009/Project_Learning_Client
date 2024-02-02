import axiosClient from './axiosClient';

const doctorApi = {
  getDoctorsOutstanding: async (quantity) => {
    const url = `/api/doctors/radom?limit=${quantity}`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getDoctorsBySpecialty: async (specialists) => {
    const url = `/api/doctors/specialty/${specialists}`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default doctorApi;
