import { useState } from "react";
import { createRoom } from "../../../api/room.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Select from "react-select";
export default function CreateRoom() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    roomNumber: "",
    hotelId: "",
    type: "SINGLE",
    capacity: "",
    price: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createRoom({
        ...form,
        hotelId: Number(form.hotelId),
        capacity: Number(form.capacity),
        price: Number(form.price),
      });

      toast.success("Chambre créée");
      navigate("/admin/rooms");
    } catch {
      toast.error("Erreur");
    }
  };
const customStyles = {
  control: (base: any) => ({
    ...base,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "14px",
    padding: "5px",
    color: "white",
  }),
  menu: (base: any) => ({
    ...base,
    background: "#1e1e2f",
  }),
  option: (base: any, state: any) => ({
    ...base,
    background: state.isFocused ? "#6366f1" : "#1e1e2f",
    color: "white",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "white",
  }),
};
  return (
    <div className="landing-page hotels-page">

      <h1 className="about-header">Créer une chambre</h1>

      <form onSubmit={handleSubmit} className="admin-form">

        <input placeholder="Numéro"
          onChange={(e) => setForm({ ...form, roomNumber: e.target.value })} />

        <input placeholder="Hotel ID"
          onChange={(e) => setForm({ ...form, hotelId: e.target.value })} />
<Select
  styles={{
    ...customStyles,
    container: (base) => ({
      ...base,
      width: "100%", // 🔥 LA SOLUTION
    }),
  }}
  options={[
    { value: "SINGLE", label: "Single" },
    { value: "DOUBLE", label: "Double" },
    { value: "SUITE", label: "Suite" },
  ]}
  value={{
    value: form.type,
    label: form.type,
  }}
  onChange={(selected: any) =>
    setForm({ ...form, type: selected.value })
  }
/>

        <input placeholder="Capacité"
          onChange={(e) => setForm({ ...form, capacity: e.target.value })} />

        <input placeholder="Prix"
          onChange={(e) => setForm({ ...form, price: e.target.value })} />

        <button className="btn-primary">Créer</button>

      </form>
    </div>
  );
}