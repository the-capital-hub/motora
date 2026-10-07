import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  FileText,
  Heart,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { clientApi } from "./clientApi";

const getCount = (data) => {
  if (Array.isArray(data)) return data.length;
  return data?.items?.length ?? data?.data?.length ?? 0;
};

const formatDate = (value) => {
  if (!value) return "Date not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

const ClientDashboard = () => {
  const [data, setData] = useState({
    wishlist: [],
    appointments: [],
    enquiries: [],
    sellRequests: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = getStoredUser();
  const name = user?.name || user?.fullName || "there";

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await Promise.allSettled([
          clientApi.wishlist(),
          clientApi.appointments(),
          clientApi.enquiries(),
          clientApi.sellRequests(),
        ]);

        if (!mounted) return;

        const value = (index) =>
          results[index].status === "fulfilled" ? results[index].value : [];

        setData({
          wishlist: value(0),
          appointments: value(1),
          enquiries: value(2),
          sellRequests: value(3),
        });

        if (results.some((item) => item.status === "rejected")) {
          setError("Some account data could not be loaded.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const appointments = Array.isArray(data.appointments)
    ? data.appointments
    : data.appointments?.items || [];

  const upcoming = useMemo(
    () =>
      appointments
        .filter((item) => !["Completed", "Cancelled"].includes(item.status))
        .slice(0, 3),
    [appointments]
  );

  const stats = [
    {
      label: "Saved cars",
      value: getCount(data.wishlist),
      icon: Heart,
      to: "/client/wishlist",
    },
    {
      label: "Appointments",
      value: getCount(data.appointments),
      icon: CalendarDays,
      to: "/client/appointments",
    },
    {
      label: "Enquiries",
      value: getCount(data.enquiries),
      icon: MessageSquare,
      to: "/client/enquiries",
    },
    {
      label: "Sell requests",
      value: getCount(data.sellRequests),
      icon: FileText,
      to: "/client/sell-requests",
    },
  ];

  return (
    <div className="client-page">
      <div className="client-page-header">
        <div>
          <span className="client-eyebrow">MOTORA / CUSTOMER</span>
          <h1>Welcome back, {name}.</h1>
          <p>Keep track of your cars, appointments and requests in one place.</p>
        </div>

        <Link to="/cars" className="client-primary-btn">
          <CarFront size={16} />
          Explore cars
        </Link>
      </div>

      {error && <div className="client-alert">{error}</div>}

      <section className="client-stat-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link className="client-stat-card" to={stat.to} key={stat.label}>
              <div className="client-stat-icon">
                <Icon size={18} />
              </div>
              <span>{stat.label}</span>
              <strong>{loading ? "..." : stat.value}</strong>
              <small>View details <ArrowUpRight size={13} /></small>
            </Link>
          );
        })}
      </section>

      <section className="client-dashboard-grid">
        <div className="client-panel">
          <div className="client-panel-header">
            <div>
              <span>UPCOMING</span>
              <h2>Your appointments</h2>
            </div>
            <Link to="/client/appointments">View all</Link>
          </div>

          {loading ? (
            <div className="client-empty">Loading appointments...</div>
          ) : upcoming.length === 0 ? (
            <div className="client-empty">
              <CalendarDays size={22} />
              <strong>No upcoming appointments</strong>
              <span>Book a test drive from any vehicle details page.</span>
              <Link to="/cars" className="client-secondary-btn">Browse cars</Link>
            </div>
          ) : (
            <div className="client-list">
              {upcoming.map((item) => (
                <div className="client-list-row" key={item._id}>
                  <div className="client-list-icon"><CalendarDays size={17} /></div>
                  <div className="client-list-copy">
                    <strong>
                      {item.car?.brand} {item.car?.model}
                    </strong>
                    <span>{formatDate(item.date)} · {item.time || "Time pending"}</span>
                  </div>
                  <span className={`client-status ${String(item.status || "").toLowerCase()}`}>
                    {item.status === "Requested" ? "Pending" : item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="client-panel client-quick-panel">
          <span>QUICK ACTIONS</span>
          <h2>What would you like to do?</h2>

          <Link to="/cars" className="client-action-card">
            <CarFront size={18} />
            <div>
              <strong>Find a car</strong>
              <span>Search the Motora inventory.</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>

          <Link to="/sell" className="client-action-card">
            <FileText size={18} />
            <div>
              <strong>Sell your car</strong>
              <span>Submit a vehicle for evaluation.</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>

          <Link to="/client/wishlist" className="client-action-card">
            <Heart size={18} />
            <div>
              <strong>Open wishlist</strong>
              <span>See your saved vehicles.</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="client-info-strip">
        <div><CheckCircle2 size={18} /><span>Verified vehicle listings</span></div>
        <div><Clock3 size={18} /><span>Track your requests anytime</span></div>
        <div><MessageSquare size={18} /><span>Stay connected with Motora</span></div>
      </section>
    </div>
  );
};

export default ClientDashboard;
