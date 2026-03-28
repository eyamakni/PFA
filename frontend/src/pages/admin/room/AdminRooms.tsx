import { useEffect, useState } from "react";
import { getAllRooms, deleteRoom } from "../../../api/room.api";
import { getAllHotels } from "../../../api/hotel.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Bed,
  Hotel,
  Users,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AdminRooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    const res = await getAllRooms();
    setRooms(res.data);
  };

  const fetchHotels = async () => {
    const res = await getAllHotels();
    setHotels(res);
  };

  useEffect(() => {
    fetchRooms();
    fetchHotels();
  }, []);

  const getHotelName = (hotelId: number) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    return hotel ? hotel.name : "Chargement...";
  };

  const handleDelete = async (id: number) => {
    await deleteRoom(id);
    toast.success("Chambre supprimée");
    fetchRooms();
  };

  return (
    <div className="landing-page hotels-page">

      <h1 className="about-header">Gestion des chambres</h1>

      <button
        className="btn-primary"
        onClick={() => navigate("/admin/create-room")}
      >
        + Ajouter une chambre
      </button>

      <div className="hotels-list">

        {rooms.map((room) => (
          <div className="hotel-card" key={room.id}>

            {/* INFO */}
            <div className="hotel-info">

              <h3 className="hotel-name">
                Chambre {room.roomNumber}
              </h3>

             <div className="info-row">
  <Hotel className="icon" />
  {getHotelName(room.hotelId)}
  <span className="hotel-id">#{room.hotelId}</span>
</div>

              <div className="info-row">
                <Bed className="icon" />
                {room.type}

                <Users className="icon" style={{ marginLeft: "10px" }} />
                {room.capacity}
              </div>

              <div className="info-row">
                <DollarSign className="icon" />
                {room.price} TND
              </div>

            </div>

            {/* ACTIONS */}
            <div className="hotel-actions">

              <button
                className="btn-delete"
                onClick={() => handleDelete(room.id)}
              >
                <Trash2 size={16} />
                Supprimer
              </button>

              <button
                className="btn-primary"
                onClick={() =>
                  navigate(`/admin/update-room/${room.id}`)
                }
              >
                <Pencil size={16} />
                Modifier
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}