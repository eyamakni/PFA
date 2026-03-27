import axios from "axios";

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export const getAllHotels = async (): Promise<Hotel[]> => {
  try {
    const response = await axios.get<Hotel[]>("http://localhost:3003/admin/hotels");
    return response.data;
  } catch (error) {
    console.error("Erreur lors du fetch des hôtels :", error);
    throw error;
  }
};

export const getHotelById = async (id: number): Promise<Hotel> => {
  try {
    const response = await axios.get<Hotel>(`http://localhost:3003/admin/hotels/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors du fetch de l'hôtel avec ID ${id} :`, error);
    throw error;
  }
};