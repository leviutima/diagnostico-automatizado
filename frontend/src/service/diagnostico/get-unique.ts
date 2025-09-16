import { api } from "../api";

export const getUnique = async (id: string) => {
  try {
    const res = await api.get(`/send-verification/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw Error;
  }
};
