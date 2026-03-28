import axios from "axios";

const API = "http://localhost:3003/admin/rooms";

export const getAllRooms = () => axios.get(API);

export const getRoomById = (id: number) =>
  axios.get(`${API}/${id}`);

export const getRoomsByHotel = (hotelId: number) =>
  axios.get(`${API}/hotel/${hotelId}`);

export const createRoom = (data: any) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateRoom = (id: number, data: any) =>
  axios.patch(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteRoom = (id: number) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });