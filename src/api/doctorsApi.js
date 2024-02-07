import axiosClient from './axiosClient';

const doctorApi = {
  getDoctorsOutstanding: async (quantity) => {
    const url = `/api/doctors/random?limit=${quantity}`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getDoctorsBySpecialty: async (specialists) => {
    const url = `/api/doctors/speciality/${specialists}`;
    try {
      const response = await axiosClient.get(url);
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getDoctorById: async (id) => {
    const url = `/api/doctors/${id}`;
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
