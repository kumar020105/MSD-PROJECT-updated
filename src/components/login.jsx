import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Auth from "./Auth";
import "./home.css";

function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  function submit(e) {
    e.preventDefault();
    const res = Auth.login(email, password);
    if (!res.ok) {
      setErr(res.message);
      return;
    }
    auth.setUser(Auth.me());
    navigate(from, { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="background-overlay"></div>
      </div>
      
      <section className="section">
        <div className="container">
          <div className="card auth-card" style={{padding:20, position: 'relative', zIndex: 2}}>
            <h3>Login</h3>
            <p className="helper">Welcome back! Please sign in to continue.</p>
            {err && <div className="error" style={{marginTop:8}}>{err}</div>}
            <form className="form" onSubmit={submit}>
              <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
              <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
              <button className="btn cta" type="submit">Sign in</button>
            </form>
            <p className="helper" style={{marginTop:10}}>No account? <Link to="/signup">Signup</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;