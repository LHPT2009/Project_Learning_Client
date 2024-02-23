import axiosClient from './axiosClient';

const doctorApi = {
  getDoctorsOutstanding: async (quantity) => {
    const url = `/doctors/random?limit=${quantity}`;
    return await axiosClient.get(url);
  },
  getDoctorsBySpecialty: async (specialists) => {
    const url = `/doctors/speciality/${specialists}`;
    return await axiosClient.get(url);
  },
  getDoctorById: async (id) => {
    const url = `/doctors/${id}`;
    return await axiosClient.get(url);
  },
};

export default doctorApi;
