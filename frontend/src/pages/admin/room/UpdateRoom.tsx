import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../../../api/room.api";
import toast from "react-hot-toast";

export default function UpdateRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    roomNumber: "",
    hotelId: "",  // on garde pour envoyer au backend, mais pas affiché
    type: "SINGLE",
    capacity: "",
    price: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await getRoomById(Number(id));
        const room = res.data;

        setForm({
          roomNumber: room.roomNumber,
          hotelId: room.hotelId, // récupéré mais pas modifiable
          type: room.type,
          capacity: room.capacity,
          price: room.price,
        });
      } catch {
        toast.error("Erreur chargement");
      }
    };

    fetchRoom();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateRoom(Number(id), {
        roomNumber: form.roomNumber,
        hotelId: Number(form.hotelId), // envoyé au backend
        type: form.type,
        capacity: Number(form.capacity),
        price: Number(form.price),
      });

      toast.success("Chambre mise à jour");
      navigate(-1); // ou navigate(-1) pour revenir à la page précédente
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erreur update");
    }
  };

  return (
    <div className="landing-page hotels-page">

      <h1 className="about-header">Modifier chambre</h1>

      <form onSubmit={handleSubmit} className="admin-form">

        <input
          placeholder="Numéro"
          value={form.roomNumber}
          onChange={(e) =>
            setForm({ ...form, roomNumber: e.target.value })
          }
        />

        {/* Champ hotelId retiré du formulaire */}

        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="SINGLE">Single</option>
          <option value="DOUBLE">Double</option>
          <option value="SUITE">Suite</option>
        </select>

        <input
          placeholder="Capacité"
          value={form.capacity}
          onChange={(e) =>
            setForm({ ...form, capacity: e.target.value })
          }
        />

        <input
          placeholder="Prix"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <button className="btn-primary">
          Sauvegarder
        </button>

      </form>
    </div>
  );
}