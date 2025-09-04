import { api } from "../api";

export const createSendVerification = async (data: {}) => {
  try {
    const res = await api.post(`/send-verification`, data);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw Error;
  }
};
