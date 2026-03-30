// src/api/room.api.ts
import axios from "axios";

const API_URL_RESERVATIONS = "http://localhost:3004/reservations";

// 🔹 Créer une réservation
export const createReservation = async (reservationData: {
  userId: number;
  hotelId: number;
  roomId: number;
  startDate: string;
  endDate: string;
}) => {
  try {
    const response = await axios.post(`${API_URL_RESERVATIONS}`, reservationData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    throw error;
  }
};

// 🔹 Récupérer toutes les réservations d'un utilisateur
export const getReservationsByUser = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL_RESERVATIONS}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data; // renvoie un tableau de réservations
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    throw error;
  }
};

export const cancelReservation = async (reservationId: number) => {
  try {
    const res = await axios.patch(`${API_URL_RESERVATIONS}/${reservationId}/cancel`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};