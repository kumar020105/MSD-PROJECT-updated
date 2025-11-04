// src/App.jsx
import React, { useEffect, useMemo, useState, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./home.css";

/* ============================================================
   In-file data + utils
   - This single file contains the whole app: components,
     pages, mock auth (localStorage), sample data, and a small
     order/cart flow so the app feels like a complete project.
   ============================================================ */

/* -------------------- sample data -------------------- */
const SAMPLE_CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Drinks"];
const SAMPLE_ITEMS = [
  { id: 1, title: "Truffle Fries", cat: "Starters", price: 450, img: "https://images.unsplash.com/photo-1544025162-d76694265947" },
  { id: 2, title: "Caprese Salad", cat: "Starters", price: 350, img: "https://images.unsplash.com/photo-1525351484163-7529414344d8" },
  { id: 3, title: "Chilli Chicken", cat: "Starters", price: 320, img: "https://i.pinimg.com/736x/c9/75/65/c975650c0d281ca915ebffd91578b26e.jpg"},
  { id: 4, title: "Ribeye Steak", cat: "Mains", price: 1150, img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141" },
  { id: 5, title: "Margherita Pizza", cat: "Mains", price: 600, img: "https://www.foodandwine.com/thmb/7BpSJWDh1s-2M2ooRPHoy07apq4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mozzarella-pizza-margherita-FT-RECIPE0621-11fa41ceb1a5465d9036a23da87dd3d4.jpg" },
  { id: 6, title: "Tiramisu", cat: "Desserts", price: 325, img: "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2024/09/THUMB-VIDEO-2_rev1-56.jpeg" },
  { id: 7, title: "Crème Brûlée", cat: "Desserts", price: 350, img: "https://www.nestleprofessional.in/sites/default/files/2022-07/Vanilla-Creme-Brulee-420x330.webp" },
  { id: 8, title: "Choclate Lava", cat: "Desserts", price: 200, img: "https://www.melskitchencafe.com/wp-content/uploads/2023/01/updated-lava-cakes7.jpg"},
  { id: 9, title: "House Lemonade", cat: "Drinks", price: 175, img: "https://images.unsplash.com/photo-1497534446932-c925b458314e" },
  { id: 10, title: "Iced Latte", cat: "Drinks", price: 200, img: "https://myeverydaytable.com/wp-content/uploads/ICEDLATTE_0_4.jpg" },
];

/* -------------------- auth util (localStorage) -------------------- */
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

/* -------------------- Auth context for ease -------------------- */
const AuthContext = createContext(null);
function useAuth() {
  return useContext(AuthContext);
}

/* -------------------- ProtectedRoute -------------------- */
function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

/* ============================================================
   UI Components
   ============================================================ */

function Navbar({ cartCount }) {
  const auth = useAuth();
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="brand" aria-label="Twilling Tastes home">
          <img src="https://img.freepik.com/premium-vector/golden-d-letter-logo-design-tempalte_89908-473.jpg" alt="Logo" />
          <h1>Twilling Tastes</h1>
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/reserve">Reserve</NavLink></li>
          <li><NavLink to="/menu#order">Order</NavLink></li>
          {auth.user ? (
            <>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><button className="btn" onClick={() => { Auth.logout(); auth.setUser(null); }}>Logout</button></li>
            </>
          ) : (
            <li><NavLink to="/login" className="cta">Login</NavLink></li>
          )}
          <li><NavLink to="/cart" className="cta">Cart ({cartCount})</NavLink></li>
        </ul>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div>© {new Date().getFullYear()} Twilling Tastes</div>
        <div style={{display:'flex', gap:12}}>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="X">X</a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Pages (all in-file)
   ============================================================ */

function Home() {
  return (
    <>
      <section className="hero">
        <div className="inner">
          <h2>Welcome to Twilling Tastes</h2>
          <p>Where fine dining meets cozy stays. Taste the craft, feel the comfort.</p>
          <div className="actions">
            <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
            <Link to="/reserve" className="btn btn-outline">Book a Table</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h3>Why Guests Love Us</h3>
          <p className="helper">Farm-to-table ingredients, seasonal menus, and suites designed for unwinding.</p>
          <div className="menu-grid" style={{marginTop:16}}>
            {["Seasonal Cuisine","Artisan Cocktails","Luxury Suites","Private Events"].map((t,i)=>(
              <div className="card" key={i}>
                <img alt="" src={
                  i===0? "https://images.unsplash.com/photo-1504674900247-0877df9cc836":
                  i===1? "https://images.unsplash.com/photo-1544145945-f90425340c7e":
                  i===2? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb":
                  "https://event360.co.in/wp-content/uploads/2017/02/IMG_5343.jpg"
                }/>
                <div className="p">
                  <h4 style={{margin:'4px 0 8px'}}>{t}</h4>
                  <p className="helper">Delightful experiences crafted by chefs and hospitality experts.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* -------------------- Menu with search, filters, add-to-cart -------------------- */
function Menu({ onAdd }) {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return SAMPLE_ITEMS.filter((it) =>
      (active === "All" || it.cat === active) &&
      (q.trim() === "" || it.title.toLowerCase().includes(q.toLowerCase()))
    );
  }, [active, q]);

  return (
    <section className="section" id="order">
      <div className="container">
        <h3>Chef's Menu</h3>
        <p className="helper">Filter by category or search your favorite dish.</p>

        <div style={{display:'flex', gap:12, alignItems:'center', marginTop:12, flexWrap:'wrap'}}>
          <input className="input" style={{flex:'1 1 240px'}} placeholder="Search dishes..." value={q} onChange={(e)=>setQ(e.target.value)} />
          <div className="menu-filters" aria-label="menu categories">
            {SAMPLE_CATEGORIES.map((c) => (
              <button key={c} className={"chip"+(active===c?" active":"")} onClick={()=>setActive(c)}>{c}</button>
            ))}
          </div>
        </div>

        <div className="menu-grid" style={{marginTop:18}}>
          {filtered.map((it) => (
            <div className="card" key={it.id} role="article" aria-label={it.title}>
              <img src={it.img} alt={it.title}/>
              <div className="p">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <h4 style={{margin:'4px 0'}}>{it.title}</h4>
                  <div className="price">₹{it.price.toFixed(2)}</div>
                </div>
                <p className="helper">{it.cat}</p>
                <button className="btn btn-primary" style={{marginTop:8, width:"100%"}} onClick={()=>onAdd(it)}>Add to order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Reservation page -------------------- */
function Reserve() {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", guests: 2, notes: "" });
  const [ok, setOk] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) {
      setOk("Please fill all required fields.");
      return;
    }
    const bookings = JSON.parse(localStorage.getItem("tt_bookings") || "[]");
    bookings.push({ ...form, createdAt: Date.now() });
    localStorage.setItem("tt_bookings", JSON.stringify(bookings));
    setOk("Reservation confirmed! We'll email you shortly.");
    setForm({ name: "", email: "", date: "", time: "", guests: 2, notes: "" });
    setTimeout(()=>setOk(""), 5000);
  }

  return (
    <section className="section">
      <div className="container">
        <h3>Book a Table</h3>
        <p className="helper">Reserve your spot for an unforgettable evening.</p>
        {ok && <div className="success" style={{margin:"12px 0"}}>{ok}</div>}
        <form className="form" onSubmit={submit} noValidate>
          <div className="grid2">
            <input className="input" placeholder="Full name *" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
            <input className="input" placeholder="Email *" type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
          </div>
          <div className="grid2">
            <input className="input" placeholder="Date *" type="date" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} />
            <input className="input" placeholder="Time *" type="time" value={form.time} onChange={(e)=>setForm({...form, time:e.target.value})} />
          </div>
          <select className="select" value={form.guests} onChange={(e)=>setForm({...form, guests:Number(e.target.value)})}>
            {[...Array(10)].map((_,i)=><option key={i+1} value={i+1}>{i+1} guest{i? "s":""}</option>)}
          </select>
          <textarea className="textarea" rows="4" placeholder="Notes (optional)" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})}></textarea>
          <button className="btn btn-primary" type="submit">Confirm Reservation</button>
        </form>
      </div>
    </section>
  );
}

/* -------------------- Cart & Checkout -------------------- */
function Cart({ cart, onUpdate, onClear }) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);

  function checkout() {
    // simple checkout: save order to localStorage and clear cart
    const orders = JSON.parse(localStorage.getItem("tt_orders") || "[]");
    const session = Auth.me();
    orders.push({ id: Date.now(), items: cart, total: subtotal, email: session?.email || "guest", createdAt: Date.now() });
    localStorage.setItem("tt_orders", JSON.stringify(orders));
    onClear();
    navigate("/dashboard");
    alert("Order placed! Check Dashboard for details.");
  }

  if (cart.length === 0) return (
    <section className="section">
      <div className="container">
        <h3>Your cart is empty</h3>
        <p className="helper">Browse the menu and add tasty items.</p>
        <Link to="/menu" className="btn btn-primary">Explore menu</Link>
      </div>
    </section>
  );

  return (
    <section className="section">
      <div className="container">
        <h3>Your Order</h3>
        <div style={{display:'grid', gap:12}}>
          {cart.map(it => (
            <div key={it.id} className="card" style={{display:'flex', alignItems:'center', gap:12}}>
              <img src={it.img} alt={it.title} style={{width:96, height:64, objectFit:'cover'}}/>
              <div style={{flex:1}}>
                <strong>{it.title}</strong>
                <div className="helper">₹{it.price.toFixed(2)} x {it.qty}</div>
              </div>
              <div style={{display:'flex', gap:6}}>
                <button className="btn" onClick={()=>onUpdate(it.id, Math.max(1, it.qty - 1))}>-</button>
                <button className="btn" onClick={()=>onUpdate(it.id, it.qty + 1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div className="helper">Subtotal</div>
            <h3>₹{subtotal.toFixed(2)}</h3>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onClear}>Clear</button>
            <button className="btn btn-primary" onClick={checkout}>Checkout</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Auth Background Component -------------------- */
function AuthBackground() {
  return (
    <div className="auth-background">
      <div className="background-overlay"></div>
    </div>
  );
}

/* -------------------- Login & Signup pages -------------------- */
function Login() {
  const auth = useAuth();
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

function Signup() {
  const auth = useAuth();
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
      <AuthBackground />
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

/* -------------------- Dashboard (protected) -------------------- */
function Dashboard() {
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = Auth.me();
    if (!u) { navigate("/login"); return; }
    setMe(u);
  }, [navigate]);

  if (!me) return null;

  const orders = JSON.parse(localStorage.getItem("tt_orders") || "[]").filter(o => o.email === me.email).sort((a,b)=>b.createdAt - a.createdAt);
  const bookings = JSON.parse(localStorage.getItem("tt_bookings") || "[]").filter(b => b.email === me.email).sort((a,b)=>b.createdAt - a.createdAt);

  return (
    <section className="section">
      <div className="container">
        <div className="card" style={{padding:20}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>Welcome, {me.name || me.email}</h3>
            <button className="btn" onClick={() => { Auth.logout(); navigate("/"); }}>Logout</button>
          </div>

          <div style={{marginTop:12}}>
            <h4>Your latest orders</h4>
            {orders.length === 0 ? <p className="helper">No orders yet.</p> : orders.map(o => (
              <div key={o.id} className="card" style={{marginTop:8, padding:12}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div><strong>Order #{o.id}</strong> <div className="helper">{new Date(o.createdAt).toLocaleString()}</div></div>
                  <div><strong>₹{o.total.toFixed(2)}</strong></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:12}}>
            <h4>Your reservations</h4>
            {bookings.length === 0 ? <p className="helper">No reservations yet.</p> : bookings.map((b,i)=>(
              <div key={i} className="card" style={{marginTop:8, padding:12}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <div><strong>{b.name}</strong> <div className="helper">{b.email}</div></div>
                  <div><div className="helper">{b.date} at {b.time}</div></div>
                </div>
                {b.notes && <p className="helper">Notes: {b.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- NotFound -------------------- */
function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{textAlign:'center'}}>
        <h2>404</h2>
        <p className="helper">That page doesn't exist.</p>
        <Link to="/" className="btn cta">Back home</Link>
      </div>
    </section>
  );
}

/* ============================================================
   Main App (contains state for auth & cart)
   ============================================================ */

export default function AppRoot() {
  // auth
  const [user, setUser] = useState(Auth.me());

  // cart: array of { id, title, price, img, qty }
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tt_cart") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("tt_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // listen for storage changes from other tabs and sync
    function handler(e) {
      if (e.key === "tt_cart") {
        try { setCart(JSON.parse(e.newValue || "[]")); } catch {}
      }
      if (e.key === LS_SESSION) {
        setUser(Auth.me());
      }
    }
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  function addToCart(item) {
    setCart(prev => {
      const found = prev.find(p => p.id === item.id);
      if (found) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function updateCartItem(id, qty) {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p).filter(p => p.qty > 0));
  }

  function clearCart() {
    setCart([]);
  }

  const value = { user, setUser };

  return (
    <AuthContext.Provider value={value}>
      <Router>
        <Navbar cartCount={cart.reduce((s, it) => s + it.qty, 0)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu onAdd={addToCart} />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/cart" element={<Cart cart={cart} onUpdate={updateCartItem} onClear={clearCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}