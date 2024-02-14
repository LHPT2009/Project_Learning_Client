import axiosClient from './axiosClient';

const transactionApi = {
  createTransaction(data) {
    const url = `/api/transaction/createTransaction`;
    return axiosClient.post(url, data);
  },
  transactionCallback(vnp_Response, datarequest) {
    const url = `/api/transaction/callback?vnp_Response=${vnp_Response}`;
    return axiosClient.post(url, datarequest);
  },
};

export default transactionApi;
