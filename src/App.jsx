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

const SAMPLE_CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Drinks"]
const SAMPLE_ITEMS = [
  { id: 1, title: "Truffle Fries", cat: "Starters", price: 450, img: "https://images.unsplash.com/photo-1544025162-d76694265947" },
  { id: 2, title: "Caprese Salad", cat: "Starters", price: 350, img: "https://images.unsplash.com/photo-1525351484163-7529414344d8" },
  { id: 3, title: "Panner Tikka", cat: "Starters", price: 220, img: "https://www.indianveggiedelight.com/wp-content/uploads/2021/08/air-fryer-paneer-tikka-featured.jpg" },
  { id: 4, title: "Chilli Chicken", cat: "Starters", price: 320, img: "https://i.pinimg.com/736x/c9/75/65/c975650c0d281ca915ebffd91578b26e.jpg" },
  { id: 5, title: "Gobi Manchuria", cat: "Starters", price: 120, img: "https://www.robinage.com/wp-content/uploads/2022/01/GOBI-MANCHURIAN.jpg" },
  { id: 6, title: "Chicken wings", cat: "Starters", price: 200, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXqOcQCJoWlzKlaei-XXcrHzsy_uZNW6NgmA&s" },
  { id: 7, title: "Spring rolls", cat: "Starters", price: 120, img: "https://www.sushiya.in/cdn/shop/files/IMG_0853_6b04d8d6-13ca-43d9-aa97-79abf2bca9eb.jpg?v=1689759492&width=1946" },
  { id: 8, title: "Dragon chicken", cat: "Starters", price: 300, img: "https://c.ndtvimg.com/2022-06/5p5jfmj8_chicken_120x90_22_June_22.png" },
  { id: 9, title: "Mutton kebab", cat: "Starters", price: 320, img: "https://i.ytimg.com/vi/QRqno1pTpKk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC9lCJRpY9pe-E_GkMbRSsNMGGS7w" },
  { id: 10, title: "Ribeye Steak", cat: "Mains", price: 1150, img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141" },
  { id: 11, title: "Margherita Pizza", cat: "Mains", price: 600, img: "https://www.foodandwine.com/thmb/7BpSJWDh1s-2M2ooRPHoy07apq4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mozzarella-pizza-margherita-FT-RECIPE0621-11fa41ceb1a5465d9036a23da87dd3d4.jpg" },
  { id: 12, title: "Chicken Biriyani", cat: "Mains", price: 150, img: "https://vismaifood.com/storage/app/uploads/public/e12/7b7/127/thumb__1200_0_0_0_auto.jpg" },
  { id: 13, title: "Butter Chicken", cat: "Mains", price: 280, img:"https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg?quality=90&resize=440,400" },
  { id: 14, title: "Paneer Butter Masala", cat: "Mains", price: 250, img: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-1.jpg" },
  { id: 15, title: "Prawns biriyani", cat: "Mains", price: 180, img: "https://images.archanaskitchen.com/images/recipes/indian/main-course/indian-rice-recipes/biryani-recipes/Prawns_Biryani_e0669b2cbd.jpg" },
  { id: 16, title: "Vegetable Biryani", cat: "Mains", price: 200, img: "https://media.istockphoto.com/id/179085494/photo/indian-biryani.jpg?s=612x612&w=0&k=20&c=VJAUfiuavFYB7PXwisvUhLqWFJ20-9m087-czUJp9Fs=" },
  { id: 17, title: "Fish Tawa", cat: "Mains", price: 320, img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQ1YEnWUOdt128zUAKRAKHKoCLI3xGQbRwKaow4K9VwWta4tiFvXse_QAOdBV_8yw57lZzyKFLbKJ_MIM0M7sTUcMBmRSQyEzBg156-SZVNC2_rdQqmQ9Upsgr1V0I3s9PP4lTzBcyGd0/s1600/0000000000000000000000A+%25281%2529.jpg" },
  { id: 18, title: "Tandoori", cat: "Mains", price: 440, img: "https://blog.swiggy.com/wp-content/uploads/2024/10/Image1_-Tandoori-Chicken-1024x538.jpg" },
  { id: 19, title: "Tiramisu", cat: "Desserts", price: 325, img: "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2024/09/THUMB-VIDEO-2_rev1-56.jpeg" },
  { id: 20, title: "Crème Brûlée", cat: "Desserts", price: 350, img: "https://www.nestleprofessional.in/sites/default/files/2022-07/Vanilla-Creme-Brulee-420x330.webp" },
  { id: 21, title: "Choclate Lava", cat: "Desserts", price: 200, img: "https://www.melskitchencafe.com/wp-content/uploads/2023/01/updated-lava-cakes7.jpg" },
  { id: 22, title: "Semifreddo", cat: "Desserts", price: 400, img: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Semifreddo_nocciola.jpg" },
  { id: 23, title: "Sorbet", cat: "Desserts", price: 500, img: "https://www.allrecipes.com/thmb/UlTqqNxnFugjt0ARL9ec3mr8Rng=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/233892-watermelon-sorbet-VAT-001-4x3-a1fe23b276e4496aabc2e9a41897f829.jpg" },
  { id: 24, title: "Baked Alaska", cat: "Desserts", price: 600, img: "https://i0.wp.com/smittenkitchen.com/wp-content/uploads//2016/09/baked-alaska.jpg?fit=1200%2C800&ssl=1&w=640" },
  { id: 25, title: "Frozen Custartd", cat: "Desserts", price: 550, img: "https://images.immediate.co.uk/production/volatile/sites/30/2023/10/Frozen-custard-sundae-2528127.jpg?resize=768,713" },
  { id: 26, title: "Gelato", cat: "Desserts", price: 650, img: "https://www.biggerbolderbaking.com/wp-content/uploads/2020/07/The-Easiest-Homemade-Gelato-WS-Thumbnail.jpeg" },
  { id: 27, title: "Choclate Brownie", cat: "Desserts", price: 300, img: "https://i.ytimg.com/vi/qdxqip0Bgt8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCPjO2A80XRgLsPVseoe9Q8KzCccA" },
  { id: 28, title: "House Lemonade", cat: "Drinks", price: 175, img: "https://images.unsplash.com/photo-1497534446932-c925b458314e" },
  { id: 29, title: "Iced Latte", cat: "Drinks", price: 200, img: "https://myeverydaytable.com/wp-content/uploads/ICEDLATTE_0_4.jpg" },
  { id: 30, title: "Fruit coolers", cat: "Drinks", price: 200, img: "https://thumbs.dreamstime.com/b/fruit-infused-strawberry-mint-cooler-drink-served-glass-ice-fresh-strawberries-leaves-wooden-table-364548580.jpg" },
  { id: 31, title: "Blue curacco", cat: "Drinks", price: 200, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3XJGePqF7sIjXG5rfjlzIt8m0MeTZDhQtCQ&s" },
  { id: 32, title: "Diabolo grenadine", cat: "Drinks", price: 200, img: "https://www.1001cocktails.com/wp-content/uploads/1001cocktails/2023/03/118429_origin-2048x1370.jpg" },
  { id: 33, title: "Strawberry Lemonade", cat: "Drinks", price: 280, img: "https://tastesbetterfromscratch.com/wp-content/uploads/2019/03/Strawberry-Lemonade-8.jpg" },
  { id: 34, title: "Fizzy berry Fusion", cat: "Drinks", price: 300, img: "https://heybairtender.s3.amazonaws.com/recipes/berry-fusion-fizz.png" },
  { id: 35, title: "coco-cola", cat: "Drinks", price: 100, img: "https://www.sugarandsoul.co/wp-content/uploads/2017/01/roy-rogers-mocktail-drink-recipe-1.jpg" },
  { id: 36, title: "pepsi", cat: "Drinks", price: 100, img: "https://www.pepsicopartners.com/medias/Article-Preview.jpg?context=bWFzdGVyfHJvb3R8MjA1MzY1fGltYWdlL2pwZWd8YURBM0wyZzVaQzh4TURBNE1qRTFORGd3TnpNeU5pOUJjblJwWTJ4bElGQnlaWFpwWlhjdWFuQm58NWFlOGI5YWFmNjY2OGViZGY2NmIwYmFiMzczMGZjNDdlODM5M2QyMmEwNDJiYjY3ZmVhOTkwNmY3NDRhYThkNA" },

];

const SAMPLE_SUITES = [
  { id: 1, name: "Executive Suite", price: 7500, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", description: "Spacious suite with king bed and city view" },
  { id: 2, name: "Deluxe Room", price: 5500, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a", description: "Comfortable room with all modern amenities" },
  { id: 3, name: "Presidential Suite", price: 12500, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304", description: "Luxurious suite with separate living area and premium amenities" },
  { id: 4, name: "Garden View Room", price: 6000, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945", description: "Peaceful room overlooking our garden" },
];

// Add sample events data
const SAMPLE_EVENTS = [
  { 
    id: 1, 
    name: "Grand Ballroom", 
    price: 25000, 
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", 
    description: "Elegant space for up to 200 guests with full catering services",
    capacity: 200,
    type: "Wedding",
    amenities: ["Stage", "Dance Floor", "Sound System", "Projector"]
  },
  { 
    id: 2, 
    name: "Executive Conference Hall", 
    price: 15000, 
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2", 
    description: "Professional setting for corporate events and meetings",
    capacity: 80,
    type: "Corporate",
    amenities: ["Projector", "WiFi", "Whiteboards", "Catering"]
  },
  { 
    id: 3, 
    name: "Garden Pavilion", 
    price: 18000, 
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", 
    description: "Outdoor venue surrounded by nature, perfect for celebrations",
    capacity: 120,
    type: "Celebration",
    amenities: ["Outdoor Space", "Decoration", "Sound System", "Lighting"]
  },
  { 
    id: 4, 
    name: "Intimate Dining Room", 
    price: 10000, 
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0", 
    description: "Cozy private room for small gatherings and family events",
    capacity: 30,
    type: "Family",
    amenities: ["Private Chef", "Exclusive Menu", "Audio System"]
  }
];

const EVENT_TYPES = ["All", "Wedding", "Corporate", "Celebration", "Family"];

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

const AuthContext = createContext(null);
function useAuth() {
  return useContext(AuthContext);
}

function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

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
          
          {/* Bookings Dropdown */}
          <li className="nav-dropdown">
            <span className="dropdown-toggle">Book</span>
            <div className="dropdown-menu">
              <NavLink to="/reserve">Reserve Table</NavLink>
              <NavLink to="/suites">Book Suite</NavLink>
              <NavLink to="/events">Private Events</NavLink>
            </div>
          </li>
          
          <li><NavLink to="/menu#order">Order</NavLink></li>
          
          {auth.user ? (
            <>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><button className="btn" onClick={() => { Auth.logout(); auth.setUser(null); }}>Logout</button></li>
            </>
          ) : (
            <li><NavLink to="/login" className="cta">Login</NavLink></li>
          )}
          
          <li className="cart-link">
            <NavLink to="/cart" className="cta">
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartCount}</span>
            </NavLink>
          </li>
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
            <Link to="/suites" className="btn btn-outline">Book a Suite</Link>
            <Link to="/events" className="btn btn-outline">Private Events</Link>
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
      
      <section className="section" style={{backgroundColor: '#f9f9f9'}}>
        <div className="container">
          <h3>Our Luxury Suites</h3>
          <p className="helper">Experience comfort and luxury in our carefully designed accommodations.</p>
          <div className="menu-grid" style={{marginTop:16}}>
            {SAMPLE_SUITES.slice(0, 3).map(suite => (
              <div className="card" key={suite.id}>
                <img src={suite.img} alt={suite.name} style={{height: '200px', objectFit: 'cover'}} />
                <div className="p">
                  <h4 style={{margin:'4px 0 8px'}}>{suite.name}</h4>
                  <p className="helper">₹{suite.price.toFixed(2)} per night</p>
                  <p className="helper" style={{fontSize: '0.9rem'}}>{suite.description}</p>
                  <Link to="/suites" className="btn btn-primary" style={{marginTop:8, width:"100%"}}>Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <h3>Private Events & Celebrations</h3>
          <p className="helper">Host your special moments in our elegant event spaces.</p>
          <div className="menu-grid" style={{marginTop:16}}>
            {SAMPLE_EVENTS.slice(0, 3).map(event => (
              <div className="card" key={event.id}>
                <img src={event.img} alt={event.name} style={{height: '200px', objectFit: 'cover'}} />
                <div className="p">
                  <h4 style={{margin:'4px 0 8px'}}>{event.name}</h4>
                  <p className="helper">₹{event.price.toFixed(2)} starting price</p>
                  <p className="helper" style={{fontSize: '0.9rem'}}>Capacity: {event.capacity} guests</p>
                  <Link to="/events" className="btn btn-primary" style={{marginTop:8, width:"100%"}}>Plan Event</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

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
function Reserve() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    date: "", 
    time: "", 
    guests: 2, 
    notes: "" 
  });
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [ok, setOk] = useState("");

  function addDishToReservation(dish) {
    setSelectedDishes(prev => {
      const existing = prev.find(d => d.id === dish.id);
      if (existing) {
        return prev.map(d => 
          d.id === dish.id ? { ...d, quantity: d.quantity + 1 } : d
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  }

  function updateDishQuantity(id, quantity) {
    if (quantity === 0) {
      setSelectedDishes(prev => prev.filter(d => d.id !== id));
    } else {
      setSelectedDishes(prev => prev.map(d => 
        d.id === id ? { ...d, quantity } : d
      ));
    }
  }

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) {
      setOk("Please fill all required fields.");
      return;
    }
    
    const bookings = JSON.parse(localStorage.getItem("tt_bookings") || "[]");
    bookings.push({ 
      ...form, 
      dishes: selectedDishes,
      total: selectedDishes.reduce((sum, dish) => sum + (dish.price * dish.quantity), 0),
      createdAt: Date.now() 
    });
    
    localStorage.setItem("tt_bookings", JSON.stringify(bookings));
    setOk("Reservation confirmed! We'll email you shortly.");
    setForm({ name: "", email: "", date: "", time: "", guests: 2, notes: "" });
    setSelectedDishes([]);
    setTimeout(()=>setOk(""), 5000);
  }

  const dishesTotal = selectedDishes.reduce((sum, dish) => sum + (dish.price * dish.quantity), 0);

  return (
    <section className="section">
      <div className="container">
        <h3>Book a Table</h3>
        <p className="helper">Reserve your spot and pre-order dishes for an unforgettable evening.</p>
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

          {/* Dish Selection */}
          <div style={{margin: '16px 0'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
              <h4>Pre-order Dishes</h4>
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu ? 'Hide Menu' : 'Browse Menu'}
              </button>
            </div>

            {showMenu && (
              <div className="menu-grid" style={{marginTop: '12px', marginBottom: '20px'}}>
                {SAMPLE_ITEMS.map((dish) => (
                  <div className="card" key={dish.id}>
                    <img src={dish.img} alt={dish.title} style={{height: '120px', objectFit: 'cover'}} />
                    <div className="p">
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h5 style={{margin: '4px 0'}}>{dish.title}</h5>
                        <div className="price">₹{dish.price.toFixed(2)}</div>
                      </div>
                      <p className="helper">{dish.cat}</p>
                      <button 
                        type="button" 
                        className="btn btn-primary" 
                        style={{width: '100%', padding: '8px'}}
                        onClick={() => addDishToReservation(dish)}
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected Dishes */}
            {selectedDishes.length > 0 && (
              <div className="card" style={{padding: '16px', marginTop: '12px'}}>
                <h5 style={{margin: '0 0 12px 0'}}>Selected Dishes</h5>
                {selectedDishes.map(dish => (
                  <div key={dish.id} style={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '8px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 'bold'}}>{dish.title}</div>
                      <div className="helper">₹{dish.price.toFixed(2)} each</div>
                    </div>
                    
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <button 
                        type="button" 
                        className="btn" 
                        style={{padding: '4px 8px'}}
                        onClick={() => updateDishQuantity(dish.id, dish.quantity - 1)}
                      >
                        -
                      </button>
                      <span style={{minWidth: '30px', textAlign: 'center'}}>
                        {dish.quantity}
                      </span>
                      <button 
                        type="button" 
                        className="btn" 
                        style={{padding: '4px 8px'}}
                        onClick={() => updateDishQuantity(dish.id, dish.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div style={{minWidth: '80px', textAlign: 'right', fontWeight: 'bold'}}>
                      ₹{(dish.price * dish.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                
                {selectedDishes.length > 0 && (
                  <div style={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '2px solid #ddd',
                    fontWeight: 'bold'
                  }}>
                    <span>Dishes Total:</span>
                    <span>₹{dishesTotal.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <textarea className="textarea" rows="4" placeholder="Notes (optional)" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})}></textarea>
          
          <button className="btn btn-primary" type="submit">Confirm Reservation</button>
        </form>
      </div>
    </section>
  );
}
function Suites() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    checkIn: "", 
    checkOut: "", 
    suite: "", 
    guests: 1, 
    notes: "" 
  });
  const [ok, setOk] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.checkIn || !form.checkOut || !form.suite) {
      setOk("Please fill all required fields.");
      return;
    }
    
    const bookings = JSON.parse(localStorage.getItem("tt_bookings") || "[]");
    const selectedSuite = SAMPLE_SUITES.find(s => s.id === parseInt(form.suite));
    
    bookings.push({ 
      ...form, 
      type: "suite",
      suiteName: selectedSuite?.name || "",
      suitePrice: selectedSuite?.price || 0,
      createdAt: Date.now() 
    });
    
    localStorage.setItem("tt_bookings", JSON.stringify(bookings));
    setOk("Suite reservation confirmed! We'll email you shortly.");
    setForm({ name: "", email: "", checkIn: "", checkOut: "", suite: "", guests: 1, notes: "" });
    setTimeout(()=>setOk(""), 5000);
  }

  
  const nights = form.checkIn && form.checkOut ? 
    Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)) : 0;
  
  const selectedSuite = SAMPLE_SUITES.find(s => s.id === parseInt(form.suite));
  const totalPrice = selectedSuite ? selectedSuite.price * nights : 0;

  return (
    <section className="section">
      <div className="container">
        <h3>Book a Suite</h3>
        <p className="helper">Reserve your stay in our luxurious accommodations.</p>
        
        <div className="menu-grid" style={{marginBottom: '24px'}}>
          {SAMPLE_SUITES.map(suite => (
            <div className="card" key={suite.id}>
              <img src={suite.img} alt={suite.name} style={{height: '200px', objectFit: 'cover'}} />
              <div className="p">
                <h4 style={{margin:'4px 0 8px'}}>{suite.name}</h4>
                <p className="helper">₹{suite.price.toFixed(2)} per night</p>
                <p className="helper" style={{fontSize: '0.9rem'}}>{suite.description}</p>
              </div>
            </div>
          ))}
        </div>

        {ok && <div className="success" style={{margin:"12px 0"}}>{ok}</div>}
        <form className="form" onSubmit={submit} noValidate>
          <div className="grid2">
            <input className="input" placeholder="Full name *" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
            <input className="input" placeholder="Email *" type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
          </div>
          
          <div className="grid2">
            <input className="input" placeholder="Check-in Date *" type="date" value={form.checkIn} onChange={(e)=>setForm({...form, checkIn:e.target.value})} />
            <input className="input" placeholder="Check-out Date *" type="date" value={form.checkOut} onChange={(e)=>setForm({...form, checkOut:e.target.value})} />
          </div>
          
          <select className="select" value={form.suite} onChange={(e)=>setForm({...form, suite:e.target.value})} required>
            <option value="">Select a Suite *</option>
            {SAMPLE_SUITES.map(suite => (
              <option key={suite.id} value={suite.id}>{suite.name} - ₹{suite.price.toFixed(2)}/night</option>
            ))}
          </select>
          
          <select className="select" value={form.guests} onChange={(e)=>setForm({...form, guests:Number(e.target.value)})}>
            {[...Array(4)].map((_,i)=><option key={i+1} value={i+1}>{i+1} guest{i? "s":""}</option>)}
          </select>
          
          <textarea className="textarea" rows="4" placeholder="Special requests (optional)" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})}></textarea>
          
          {nights > 0 && selectedSuite && (
            <div style={{padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '12px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Nights:</span>
                <span>{nights}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Price per night:</span>
                <span>₹{selectedSuite.price.toFixed(2)}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '8px'}}>
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          <button className="btn btn-primary" type="submit">Confirm Reservation</button>
        </form>
      </div>
    </section>
  );
}

function Events() {
  const [active, setActive] = useState("All");
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    eventDate: "", 
    eventType: "", 
    guests: 50, 
    venue: "", 
    notes: "" 
  });
  const [ok, setOk] = useState("");

  const filtered = useMemo(() => {
    return SAMPLE_EVENTS.filter((ev) =>
      (active === "All" || ev.type === active)
    );
  }, [active]);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventDate || !form.venue) {
      setOk("Please fill all required fields.");
      return;
    }
    
    const bookings = JSON.parse(localStorage.getItem("tt_bookings") || "[]");
    const selectedEvent = SAMPLE_EVENTS.find(ev => ev.id === parseInt(form.venue));
    
    bookings.push({ 
      ...form, 
      type: "event",
      eventName: selectedEvent?.name || "",
      eventPrice: selectedEvent?.price || 0,
      createdAt: Date.now() 
    });
    
    localStorage.setItem("tt_bookings", JSON.stringify(bookings));
    setOk("Event inquiry submitted! We'll contact you shortly to finalize details.");
    setForm({ name: "", email: "", eventDate: "", eventType: "", guests: 50, venue: "", notes: "" });
    setTimeout(()=>setOk(""), 5000);
  }

  return (
    <section className="section">
      <div className="container">
        <h3>Private Events & Celebrations</h3>
        <p className="helper">Host your special moments in our elegant event spaces.</p>

        <div style={{marginBottom: '24px'}}>
          <h4>Our Event Spaces</h4>
          <div className="menu-filters" aria-label="event types" style={{marginTop: '12px'}}>
            {EVENT_TYPES.map((type) => (
              <button key={type} className={"chip"+(active===type?" active":"")} onClick={()=>setActive(type)}>{type}</button>
            ))}
          </div>
          
          <div className="menu-grid" style={{marginTop: '16px'}}>
            {filtered.map(event => (
              <div className="card" key={event.id}>
                <img src={event.img} alt={event.name} style={{height: '200px', objectFit: 'cover'}} />
                <div className="p">
                  <h4 style={{margin:'4px 0 8px'}}>{event.name}</h4>
                  <p className="helper">₹{event.price.toFixed(2)} starting price</p>
                  <p className="helper" style={{fontSize: '0.9rem'}}>{event.description}</p>
                  <div style={{marginTop: '8px'}}>
                    <p className="helper" style={{margin: '4px 0'}}><strong>Capacity:</strong> {event.capacity} guests</p>
                    <p className="helper" style={{margin: '4px 0'}}><strong>Type:</strong> {event.type}</p>
                    <div style={{marginTop: '8px'}}>
                      <strong>Amenities:</strong>
                      <ul style={{paddingLeft: '16px', margin: '4px 0'}}>
                        {event.amenities.map((amenity, i) => (
                          <li key={i} className="helper" style={{fontSize: '0.8rem'}}>{amenity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {ok && <div className="success" style={{margin:"12px 0"}}>{ok}</div>}
        <div className="card" style={{padding: '20px'}}>
          <h4>Inquire About Event Booking</h4>
          <p className="helper">Provide details about your event and we'll contact you to discuss options.</p>
          
          <form className="form" onSubmit={submit} noValidate>
            <div className="grid2">
              <input className="input" placeholder="Full name *" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
              <input className="input" placeholder="Email *" type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
            </div>
            
            <div className="grid2">
              <input className="input" placeholder="Event Date *" type="date" value={form.eventDate} onChange={(e)=>setForm({...form, eventDate:e.target.value})} />
              <select className="select" value={form.eventType} onChange={(e)=>setForm({...form, eventType:e.target.value})}>
                <option value="">Event Type</option>
                {EVENT_TYPES.filter(type => type !== "All").map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="grid2">
              <select className="select" value={form.venue} onChange={(e)=>setForm({...form, venue:e.target.value})} required>
                <option value="">Select a Venue *</option>
                {SAMPLE_EVENTS.map(event => (
                  <option key={event.id} value={event.id}>{event.name} - up to {event.capacity} guests</option>
                ))}
              </select>
              <select className="select" value={form.guests} onChange={(e)=>setForm({...form, guests:Number(e.target.value)})}>
                <option value="">Expected Guests</option>
                {[...Array(20)].map((_,i)=><option key={(i+1)*10} value={(i+1)*10}>{(i+1)*10} guests</option>)}
              </select>
            </div>
            
            <textarea className="textarea" rows="4" placeholder="Tell us about your event (theme, special requirements, etc.)" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})}></textarea>
            
            <button className="btn btn-primary" type="submit">Submit Inquiry</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Cart({ cart, onUpdate, onClear }) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);

  function checkout() {
    
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

function AuthBackground() {
  return (
    <div className="auth-background">
      <div className="background-overlay"></div>
    </div>
  );
}

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
            <p className="helper">Join our restaurant for perks & updates.</p>
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

  const tableBookings = bookings.filter(b => !b.type || b.type === "table");
  const suiteBookings = bookings.filter(b => b.type === "suite");
  const eventBookings = bookings.filter(b => b.type === "event");

  return (
    <section className="section">
      <div className="container">
        <div className="card" style={{padding:20}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>Welcome, {me.name || me.email}</h3>
            <button className="btn" onClick={() => { Auth.logout(); navigate("/"); }}>Logout</button>
          </div>

          <div style={{marginTop:24}}>
            <h4>Your Order History</h4>
            {orders.length === 0 ? (
              <p className="helper">No orders yet.</p>
            ) : orders.map(o => (
              <div key={o.id} className="card" style={{marginTop:12, padding:16}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12}}>
                  <div>
                    <strong>Order #{o.id.toString().slice(-6)}</strong> 
                    <div className="helper">{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                  <div><strong>₹{o.total.toFixed(2)}</strong></div>
                </div>
                
                <div style={{borderTop: '1px solid #eee', paddingTop: 12}}>
                  <strong>Items:</strong>
                  <div style={{marginTop: 8}}>
                    {o.items.map((item, index) => (
                      <div key={index} style={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
                        <span>{item.title} × {item.qty}</span>
                        <span>₹{(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:24}}>
            <h4>Your Table Reservations</h4>
             {tableBookings.length === 0 ? (
    <p className="helper">No table reservations yet.</p>
  ) : tableBookings.map((b,i)=>(
    <div key={i} className="card" style={{marginTop:12, padding:16}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
        <div>
          <strong>{b.name}</strong> 
          <div className="helper">{b.email}</div>
        </div>
        <div>
          <div className="helper">{b.date} at {b.time}</div>
          <div className="helper">{b.guests} guest{b.guests !== 1 ? 's' : ''}</div>
          {b.total > 0 && <div className="helper">Dishes: ₹{b.total?.toFixed(2)}</div>}
        </div>
      </div>
      {b.dishes && b.dishes.length > 0 && (
        <div style={{marginTop: 12, paddingTop: 12, borderTop: '1px solid #eee'}}>
          <strong>Ordered Dishes:</strong>
          <div style={{marginTop: 8}}>
            {b.dishes.map((dish, index) => (
              <div key={index} style={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
                <span>{dish.title} × {dish.quantity}</span>
                <span>₹{(dish.price * dish.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {b.notes && (
        <div style={{marginTop: 12, paddingTop: 12, borderTop: '1px solid #eee'}}>
          <strong>Notes:</strong> {b.notes}
        </div>
      )}
    </div>
  ))}
</div>
          <div style={{marginTop:24}}>
            <h4>Your Suite Reservations</h4>
            {suiteBookings.length === 0 ? (
              <p className="helper">No suite reservations yet.</p>
            ) : suiteBookings.map((b,i)=>(
              <div key={i} className="card" style={{marginTop:12, padding:16}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div>
                    <strong>{b.suiteName}</strong> 
                    <div className="helper">{b.name} - {b.email}</div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <strong>₹{(b.suitePrice * Math.ceil((new Date(b.checkOut) - new Date(b.checkIn)) / (1000 * 60 * 60 * 24))).toFixed(2)}</strong>
                  </div>
                </div>
                <div className="helper" style={{marginTop: 8}}>
                  {b.checkIn} to {b.checkOut} ({Math.ceil((new Date(b.checkOut) - new Date(b.checkIn)) / (1000 * 60 * 60 * 24))} nights)
                </div>
                <div className="helper">{b.guests} guest{b.guests !== 1 ? 's' : ''}</div>
                {b.notes && (
                  <div style={{marginTop: 12, paddingTop: 12, borderTop: '1px solid #eee'}}>
                    <strong>Special requests:</strong> {b.notes}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{marginTop:24}}>
            <h4>Your Event Inquiries</h4>
            {eventBookings.length === 0 ? (
              <p className="helper">No event inquiries yet.</p>
            ) : eventBookings.map((b,i)=>(
              <div key={i} className="card" style={{marginTop:12, padding:16}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div>
                    <strong>{b.eventName}</strong> 
                    <div className="helper">{b.name} - {b.email}</div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <strong>₹{b.eventPrice.toFixed(2)} starting price</strong>
                  </div>
                </div>
                <div style={{marginTop: 8}}>
                  <div className="helper"><strong>Event Date:</strong> {b.eventDate}</div>
                  <div className="helper"><strong>Event Type:</strong> {b.eventType}</div>
                  <div className="helper"><strong>Guests:</strong> {b.guests}</div>
                </div>
                {b.notes && (
                  <div style={{marginTop: 12, paddingTop: 12, borderTop: '1px solid #eee'}}>
                    <strong>Event details:</strong> {b.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
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

export default function AppRoot() {
  
  const [user, setUser] = useState(Auth.me());

  
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tt_cart") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("tt_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
   
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
          <Route path="/suites" element={<Suites />} />
          <Route path="/events" element={<Events />} />
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