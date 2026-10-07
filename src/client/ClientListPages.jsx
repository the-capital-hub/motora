import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, CarFront, Heart, MessageSquare, Phone, Trash2, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { clientApi } from "./clientApi";

const formatDate = (value) => {
  if (!value) return "Date not set";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const getItems = (data) => Array.isArray(data) ? data : data?.items || [];

export const ClientWishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      setItems(getItems(await clientApi.wishlist()));
    } catch (err) {
      setError(err.message || "Unable to load wishlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (carId) => {
    try {
      await clientApi.removeWishlist(carId);
      setItems((current) => current.filter((item) => String(item.car?._id || item.car?.id || item.car) !== String(carId)));
    } catch (err) {
      setError(err.message || "Unable to remove car.");
    }
  };

  return (
    <ListPageShell
      eyebrow="MY GARAGE"
      title="My wishlist"
      description="Your saved Motora vehicles, ready whenever you are."
      icon={Heart}
    >
      {error && <div className="client-alert">{error}</div>}
      {loading ? <div className="client-empty">Loading wishlist...</div> : items.length === 0 ? (
        <EmptyState icon={Heart} title="Your wishlist is empty" text="Save vehicles you like from the cars page." link="/cars" label="Browse cars" />
      ) : (
        <div className="client-card-grid">
          {items.map((item) => {
            const car = item.car || item;
            const id = car._id || car.id;
            return (
              <article className="client-car-card" key={item._id || id}>
                <div className="client-car-image">
                  <img src={car.images?.[0] || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"} alt={`${car.brand || ""} ${car.model || ""}`} />
                  <button onClick={() => remove(id)} aria-label="Remove from wishlist"><Trash2 size={16} /></button>
                </div>
                <div className="client-car-body">
                  <span>{car.year || "Vehicle"} · {car.fuel || "Fuel"} · {car.transmission || "Transmission"}</span>
                  <h3>{car.brand} {car.model}</h3>
                  <strong>₹{Number(car.price || 0).toLocaleString("en-IN")}</strong>
                  <Link to={`/cars/${id}`}>View vehicle <ArrowUpRight size={14} /></Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </ListPageShell>
  );
};

export const ClientAppointments = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi.appointments().then((data) => setItems(getItems(data))).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  return (
    <ListPageShell eyebrow="MY JOURNEY" title="My appointments" description="Track your test drive requests and scheduled visits." icon={CalendarDays}>
      {loading ? <div className="client-empty">Loading appointments...</div> : items.length === 0 ? (
        <EmptyState icon={CalendarDays} title="No appointments yet" text="Choose a car and request a test drive." link="/cars" label="Find a car" />
      ) : (
        <div className="client-table">
          {items.map((item) => (
            <div className="client-table-row" key={item._id}>
              <div className="client-table-main">
                <div className="client-list-icon"><CarFront size={17} /></div>
                <div><strong>{item.car?.brand} {item.car?.model}</strong><span>Test Drive · {formatDate(item.date)}</span></div>
              </div>
              <div><span>{item.time || "Time pending"}</span></div>
              <span className={`client-status ${String(item.status || "").toLowerCase()}`}>{item.status === "Requested" ? "Pending" : item.status}</span>
            </div>
          ))}
        </div>
      )}
    </ListPageShell>
  );
};

export const ClientEnquiries = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi.enquiries().then((data) => setItems(getItems(data))).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  return (
    <ListPageShell eyebrow="CONVERSATIONS" title="My enquiries" description="Keep track of your conversations with the Motora team." icon={MessageSquare}>
      {loading ? <div className="client-empty">Loading enquiries...</div> : items.length === 0 ? (
        <EmptyState icon={MessageSquare} title="No enquiries yet" text="Ask about a vehicle from its details page." link="/cars" label="Browse cars" />
      ) : (
        <div className="client-table">
          {items.map((item) => (
            <div className="client-table-row" key={item._id}>
              <div className="client-table-main">
                <div className="client-list-icon"><MessageSquare size={17} /></div>
                <div><strong>{item.car?.brand} {item.car?.model || "Motora enquiry"}</strong><span>{item.message || "Vehicle enquiry"}</span></div>
              </div>
              <span className={`client-status ${String(item.status || "").toLowerCase()}`}>{item.status || "New"}</span>
            </div>
          ))}
        </div>
      )}
    </ListPageShell>
  );
};

export const ClientSellRequests = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi.sellRequests().then((data) => setItems(getItems(data))).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  return (
    <ListPageShell eyebrow="SELL WITH MOTORA" title="My sell requests" description="Follow the progress of vehicles you submitted to Motora." icon={FileText}>
      {loading ? <div className="client-empty">Loading sell requests...</div> : items.length === 0 ? (
        <EmptyState icon={FileText} title="No sell requests yet" text="Submit your vehicle details to get started." link="/sell" label="Sell your car" />
      ) : (
        <div className="client-table">
          {items.map((item) => (
            <div className="client-table-row" key={item._id}>
              <div className="client-table-main">
                <div className="client-list-icon"><CarFront size={17} /></div>
                <div><strong>{item.brand} {item.model}</strong><span>{item.year} · {item.km || item.kilometers || 0} km · {item.location}</span></div>
              </div>
              <div><span>₹{Number(item.expectedPrice || 0).toLocaleString("en-IN")}</span></div>
              <span className={`client-status ${String(item.status || "").toLowerCase().replaceAll(" ", "-")}`}>{item.status}</span>
            </div>
          ))}
        </div>
      )}
    </ListPageShell>
  );
};

export const ClientActivity = () => {
  const [data, setData] = useState({ appointments: [], sellRequests: [], enquiries: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([clientApi.appointments(), clientApi.sellRequests(), clientApi.enquiries()])
      .then((results) => {
        const value = (i) => results[i].status === "fulfilled" ? getItems(results[i].value) : [];
        setData({ appointments: value(0), sellRequests: value(1), enquiries: value(2) });
      })
      .finally(() => setLoading(false));
  }, []);

  const activity = useMemo(() => [
    ...data.appointments.map((x) => ({ id: `a-${x._id}`, title: `Test drive: ${x.car?.brand || ""} ${x.car?.model || ""}`, date: x.createdAt, icon: CalendarDays })),
    ...data.sellRequests.map((x) => ({ id: `s-${x._id}`, title: `Sell request: ${x.brand || ""} ${x.model || ""}`, date: x.createdAt, icon: FileText })),
    ...data.enquiries.map((x) => ({ id: `e-${x._id}`, title: `Enquiry${x.car ? `: ${x.car.brand || ""} ${x.car.model || ""}` : ""}`, date: x.createdAt, icon: MessageSquare })),
  ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)), [data]);

  return (
    <ListPageShell eyebrow="ACCOUNT HISTORY" title="My activity" description="A timeline of your recent activity with Motora." icon={MessageSquare}>
      {loading ? <div className="client-empty">Loading activity...</div> : activity.length === 0 ? (
        <EmptyState icon={MessageSquare} title="No activity yet" text="Your Motora activity will appear here." />
      ) : (
        <div className="client-timeline">
          {activity.map((item) => {
            const Icon = item.icon;
            return <div className="client-timeline-item" key={item.id}><div className="client-list-icon"><Icon size={17} /></div><div><strong>{item.title}</strong><span>{formatDate(item.date)}</span></div></div>;
          })}
        </div>
      )}
    </ListPageShell>
  );
};

const ListPageShell = ({ eyebrow, title, description, icon: Icon, children }) => (
  <div className="client-page">
    <div className="client-page-header">
      <div><span className="client-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
      <div className="client-page-mark"><Icon size={20} /></div>
    </div>
    {children}
  </div>
);

const EmptyState = ({ icon: Icon, title, text, link, label }) => (
  <div className="client-empty">
    <Icon size={26} />
    <strong>{title}</strong>
    <span>{text}</span>
    {link && <Link to={link} className="client-secondary-btn">{label}</Link>}
  </div>
);
