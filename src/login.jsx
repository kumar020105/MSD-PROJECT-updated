import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const LS_USERS = "tt_users_v1";
const LS_SESSION = "tt_session_v1";
const Auth = {
  signup({ name, email, password }) {
    const users = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
    if (users.find((u) => u.email === email)) {
      return { ok: false, message: "Email already registered." };
    }
    users.push({ name, email, password });
    localStorage.setItem(LS_USERS, JSON.stringify(users));
    return { ok: true };
  },
  login(email, password) {
    const users = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
    const match = users.find((u) => u.email === email && u.password === password);
    if (!match) return { ok: false, message: "Invalid credentials." };
    localStorage.setItem(LS_SESSION, JSON.stringify({ email: match.email, name: match.name }));
    return { ok: true };
  },
  logout() {
    localStorage.removeItem(LS_SESSION);
  },
  me() {
    try {
      return JSON.parse(localStorage.getItem(LS_SESSION) || "null");
    } catch {
      return null;
    }
  },
};
const AuthContext = React.createContext(null);
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