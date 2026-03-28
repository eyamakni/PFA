import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHotelById } from "../api/hotel.api"; // ← ta nouvelle fonction
import { MapPin } from "lucide-react";
import "../styles/HotelsDetails.css";
import { hotelImages } from "../assets/hotels";

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  imageUrl?: string;
}

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string>(""); // ← image aléatoire

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;
      try {
        const data = await getHotelById(Number(id));
        setHotel(data);

        // Choisir une image aléatoire du tableau
        const randomIndex = Math.floor(Math.random() * hotelImages.length);
        setImage(hotelImages[randomIndex]);
      } catch {
        setError("Impossible de charger l'hôtel");
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!hotel) return null;

  return (
    <div className="hotel-details-container">
      <button className="hotel-details-back-btn" onClick={() => navigate(-1)}>
        ← Retour
      </button>
      <h2 className="hotel-details-name">{hotel.name}</h2>
      {image && (
        <img src={image} alt={hotel.name} className="hotel-details-image" />
      )}
      <p className="hotel-details-location">
        <MapPin size={16} className="hotel-details-location-icon" /> {hotel.address}
      </p>
      <p className="hotel-details-description">{hotel.description}</p>
      <button
        className="hotel-details-reserve-btn"
        onClick={() => navigate(`/reservation/${hotel.id}`)}
      >
        Réserver
      </button>
    </div>
  );
};

export default HotelDetails;