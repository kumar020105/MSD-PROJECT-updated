import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import "./home.css";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    setErr("");
    if (!form.name || !form.email || !form.password) { setErr("All fields required."); return; }
    if (form.password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirm) { setErr("Passwords do not match."); return; }
    const res = Auth.signup({ name: form.name, email: form.email, password: form.password });
    if (!res.ok) { setErr(res.message); return; }
    alert("Account created. Please login.");
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="background-overlay"></div>
      </div>
      
      <section className="section">
        <div className="container">
          <div className="card auth-card" style={{padding:20, position: 'relative', zIndex: 2}}>
            <h3>Create account</h3>
            <p className="helper">Join our diners' club for perks & updates.</p>
            {err && <div className="error" style={{marginTop:8}}>{err}</div>}
            <form className="form" onSubmit={submit}>
              <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
              <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
              <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
              <input className="input" placeholder="Confirm password" type="password" value={form.confirm} onChange={e=>setForm({...form, confirm:e.target.value})}/>
              <button className="btn cta" type="submit">Create account</button>
            </form>
            <p className="helper" style={{marginTop:10}}>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;