import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById,updateRoom } from "../../../api/room.api";
import toast from "react-hot-toast";

export default function UpdateRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    roomNumber: "",
    hotelId: "",
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
          hotelId: room.hotelId,
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

  // 🔥 submit update
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateRoom(Number(id), {
        ...form,
        hotelId: Number(form.hotelId),
        capacity: Number(form.capacity),
        price: Number(form.price),
      });

      toast.success("Chambre mise à jour");

      navigate("/admin/rooms");

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

        <input
          placeholder="Hotel ID"
          value={form.hotelId}
          onChange={(e) =>
            setForm({ ...form, hotelId: e.target.value })
          }
        />

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