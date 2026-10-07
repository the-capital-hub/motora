import { useEffect, useState } from "react";
import { Bell, CalendarDays, FileText, MessageSquare } from "lucide-react";
import { clientApi } from "./clientApi";

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([clientApi.appointments(), clientApi.sellRequests(), clientApi.enquiries()])
      .then((results) => {
        const list = [];

        if (results[0].status === "fulfilled") {
          (Array.isArray(results[0].value) ? results[0].value : results[0].value?.items || []).forEach((item) => {
            list.push({
              id: `appointment-${item._id}`,
              icon: CalendarDays,
              title: `Test drive ${item.status === "Confirmed" ? "confirmed" : "request received"}`,
              text: `${item.car?.brand || ""} ${item.car?.model || "Vehicle"} · ${item.date || "Date pending"}`,
              date: item.createdAt,
            });
          });
        }

        if (results[1].status === "fulfilled") {
          (Array.isArray(results[1].value) ? results[1].value : results[1].value?.items || []).forEach((item) => {
            list.push({
              id: `sell-${item._id}`,
              icon: FileText,
              title: "Sell request received",
              text: `${item.brand || ""} ${item.model || "Vehicle"} · ${item.status || "New"}`,
              date: item.createdAt,
            });
          });
        }

        if (results[2].status === "fulfilled") {
          (Array.isArray(results[2].value) ? results[2].value : results[2].value?.items || []).forEach((item) => {
            list.push({
              id: `enquiry-${item._id}`,
              icon: MessageSquare,
              title: "Enquiry submitted",
              text: item.message || "Your enquiry is with the Motora team.",
              date: item.createdAt,
            });
          });
        }

        setNotifications(list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="client-page">
      <div className="client-page-header">
        <div><span className="client-eyebrow">UPDATES</span><h1>Notifications</h1><p>Recent updates generated from your Motora activity.</p></div>
        <div className="client-page-mark"><Bell size={20} /></div>
      </div>

      {loading ? <div className="client-empty">Loading notifications...</div> : notifications.length === 0 ? (
        <div className="client-empty"><Bell size={26} /><strong>No notifications</strong><span>New account activity will appear here.</span></div>
      ) : (
        <div className="client-panel">
          <div className="client-timeline">
            {notifications.map((item) => {
              const Icon = item.icon;
              return <div className="client-timeline-item" key={item.id}><div className="client-list-icon"><Icon size={17} /></div><div><strong>{item.title}</strong><span>{item.text}</span></div></div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientNotifications;
