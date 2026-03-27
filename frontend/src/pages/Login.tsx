import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { login } from "../api/auth.api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle, FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(form.email, form.password);

      // stocker token
      localStorage.setItem("token", res.data.access_token);

      toast.success("Connexion réussie");

      // redirection vers dashboard (à créer après)
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
<h2 className="title-gradient title-animate">Bienvenue</h2>      <p className="subtitle">
        Connectez-vous pour gérer vos réservations.
      </p>

      <form onSubmit={handleSubmit}>
      <div className="input-group">
  <label>Email</label>
  <div className="input-wrapper">
    <MdEmail className="input-icon" />
    <input
      type="email"
      required
      placeholder=""
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />
  </div>
</div>

<div className="input-group">
  <label>Mot de passe</label>
  <div className="input-wrapper">
    <RiLockPasswordLine className="input-icon" />
    <input
      type="password"
      required
      placeholder=""
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />
  </div>

  <Link to="/forgot" className="forgot-link">
    Mot de passe oublié ?
  </Link>
</div>

        <button className="btn-primary" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <div className="divider">ou continuer avec</div>

    <div className="social-login">
  <button className="btn-social">
    <FaGoogle /> Google
  </button>

  <button className="btn-social">
    <FaApple /> Apple
  </button>
</div>

      <p className="toggle-text">
        Pas encore membre ? <Link to="/register">S'inscrire</Link>
      </p>
    </AuthLayout>
  );
}