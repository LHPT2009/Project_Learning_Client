import axiosClient from './axiosClient';

const transactionApi = {
  createTransaction: async (data) => {
    const url = `/transaction/createTransaction`;
    return await axiosClient.post(url, data);
  },
  updateScheduleStatus: async (data) => {
    const url = `/transaction/updateScheduleDetail`;
    return await axiosClient.put(url, data);
  },
  transactionCallback: async (vnp_Response, datarequest) => {
    const url = `/transaction/callback?vnp_Response=${vnp_Response}`;
    return await axiosClient.post(url, datarequest);
  },
};

export default transactionApi;
