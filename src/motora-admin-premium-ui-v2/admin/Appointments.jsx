import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Phone,
  Search,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import "./Appointments.css";

const statusFilters = ["All", "Confirmed", "Pending", "Cancelled"];

const apiBase =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

/* =========================
   HELPERS
========================= */

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value) => {
  if (!value) return "—";
  return value;
};

const getDisplayStatus = (status) => {
  if (status === "Requested") return "Pending";

  return status || "Pending";
};

const getApiStatus = (status) => {
  if (status === "Pending") return "Requested";

  return status;
};

/* =========================
   MAP BACKEND DATA
========================= */

const mapAppointment = (item) => ({
  id: item._id,

  customer:
    item.name ||
    item.user?.name ||
    "Customer",

  phone:
    item.phone ||
    item.user?.phone ||
    "—",

  email:
    item.email ||
    item.user?.email ||
    "",

  car: item.car
    ? `${item.car.brand || ""} ${item.car.model || ""}`.trim()
    : "Vehicle",

  type: "Test Drive",

  date: formatDate(item.date),

  rawDate: item.date,

  time: formatTime(item.time),

  location:
    item.car?.location ||
    "Motora Showroom",

  status: getDisplayStatus(item.status),

  apiStatus: item.status,

  createdAt: item.createdAt,

  carDetails: item.car || null,

  userDetails: item.user || null,
});

/* =========================
   COMPONENT
========================= */

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [calendarDate, setCalendarDate] =
    useState(new Date());

  const [loading, setLoading] =
    useState(true);

  const [savingId, setSavingId] =
    useState("");

  const [error, setError] =
    useState("");

  /* =========================
     LOAD APPOINTMENTS
  ========================= */

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const response = await fetch(
        `${apiBase}/admin/test-drives?limit=100`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",

            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to load appointments"
        );
      }

      const mappedAppointments =
        (data.items || []).map(mapAppointment);

      setAppointments(mappedAppointments);
    } catch (err) {
      console.error(
        "Appointments load error:",
        err
      );

      setError(
        err.message ||
          "Unable to load appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    loadAppointments();
  }, []);

  /* =========================
     UPDATE STATUS
  ========================= */

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      setSavingId(id);
      setError("");

      const token = getToken();

      const apiStatus =
        getApiStatus(status);

      const response = await fetch(
        `${apiBase}/admin/test-drives/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },

          body: JSON.stringify({
            status: apiStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to update appointment"
        );
      }

      const updatedAppointment =
        mapAppointment(data);

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id
            ? updatedAppointment
            : appointment
        )
      );

      setSelectedAppointment((prev) =>
        prev && prev.id === id
          ? updatedAppointment
          : prev
      );
    } catch (err) {
      console.error(
        "Appointment status error:",
        err
      );

      setError(
        err.message ||
          "Unable to update appointment"
      );
    } finally {
      setSavingId("");
    }
  };

  /* =========================
     FILTER
  ========================= */

  const filteredAppointments =
    useMemo(() => {
      return appointments.filter(
        (appointment) => {
          const text = `
            ${appointment.customer}
            ${appointment.phone}
            ${appointment.email}
            ${appointment.car}
            ${appointment.type}
            ${appointment.location}
            ${appointment.status}
          `.toLowerCase();

          const matchesSearch =
            text.includes(
              search.toLowerCase()
            );

          const matchesStatus =
            statusFilter === "All" ||
            appointment.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      appointments,
      search,
      statusFilter,
    ]);

  /* =========================
     TODAY
  ========================= */

  const todayKey =
    new Date().toLocaleDateString(
      "en-CA"
    );

  const todayAppointments =
    appointments.filter(
      (appointment) => {
        if (!appointment.rawDate) {
          return false;
        }

        const date = new Date(
          appointment.rawDate
        );

        if (Number.isNaN(date.getTime())) {
          return false;
        }

        return (
          date.toLocaleDateString(
            "en-CA"
          ) === todayKey
        );
      }
    );

  /* =========================
     STATS
  ========================= */

  const testDriveCount =
    appointments.filter(
      (item) =>
        item.type === "Test Drive"
    ).length;

  const confirmedCount =
    appointments.filter(
      (item) =>
        item.status === "Confirmed"
    ).length;

  const pendingCount =
    appointments.filter(
      (item) =>
        item.status === "Pending"
    ).length;

  /* =========================
     STATUS CLASS
  ========================= */

  const getStatusClass = (status) =>
    status
      .toLowerCase()
      .replace(/\s+/g, "-");

  /* =========================
     CALENDAR
  ========================= */

  const calendarDays = useMemo(() => {
    const current =
      new Date(calendarDate);

    const day =
      current.getDay();

    const mondayOffset =
      day === 0 ? -6 : 1 - day;

    const monday =
      new Date(current);

    monday.setDate(
      current.getDate() +
        mondayOffset
    );

    return Array.from(
      { length: 7 },
      (_, index) => {
        const date =
          new Date(monday);

        date.setDate(
          monday.getDate() +
            index
        );

        return date;
      }
    );
  }, [calendarDate]);

  const getEventsForDate = (
    date
  ) => {
    const target =
      date.toLocaleDateString(
        "en-CA"
      );

    return appointments.filter(
      (appointment) => {
        if (!appointment.rawDate) {
          return false;
        }

        const appointmentDate =
          new Date(
            appointment.rawDate
          );

        if (
          Number.isNaN(
            appointmentDate.getTime()
          )
        ) {
          return false;
        }

        return (
          appointmentDate.toLocaleDateString(
            "en-CA"
          ) === target
        );
      }
    ).length;
  };

  const moveCalendar = (
    direction
  ) => {
    setCalendarDate((prev) => {
      const next =
        new Date(prev);

      next.setDate(
        next.getDate() +
          direction
      );

      return next;
    });
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="appointments-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="appointments-header">

        <div>

          <span className="appointments-eyebrow">
            MOTORA / CRM / APPOINTMENTS
          </span>

          <h1>
            Appointments
          </h1>

          <p>
            Manage test drives,
            consultations and vehicle
            deliveries.
          </p>

        </div>

        <button
          className="appointment-create-btn"
          onClick={() =>
            setError(
              "Appointments are created from the customer Test Drive flow."
            )
          }
        >
          <CalendarDays size={15} />

          New appointment
        </button>

      </header>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="appointments-error">

          <strong>
            Something went wrong
          </strong>

          <span>
            {error}
          </span>

          <button
            onClick={
              loadAppointments
            }
          >
            Retry
          </button>

        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="appointments-loading">
          Loading appointments...
        </div>
      )}

      {/* =========================
          STATS
      ========================= */}

      <section className="appointments-stats">

        <div className="appointment-stat">

          <span>
            TODAY
          </span>

          <strong>
            {todayAppointments.length}
          </strong>

          <small>
            Scheduled appointments
          </small>

        </div>

        <div className="appointment-stat">

          <span>
            TEST DRIVES
          </span>

          <strong>
            {testDriveCount}
          </strong>

          <small>
            Vehicle experiences
          </small>

        </div>

        <div className="appointment-stat">

          <span>
            CONFIRMED
          </span>

          <strong>
            {confirmedCount}
          </strong>

          <small>
            Ready to go
          </small>

        </div>

        <div className="appointment-stat">

          <span>
            PENDING
          </span>

          <strong>
            {pendingCount}
          </strong>

          <small>
            Need confirmation
          </small>

        </div>

      </section>

      {/* =========================
          CALENDAR
      ========================= */}

      <section className="appointment-calendar">

        <div className="appointment-calendar-header">

          <div>

            <span>
              {calendarDate
                .toLocaleDateString(
                  "en-IN",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )
                .toUpperCase()}
            </span>

            <h2>
              Schedule
            </h2>

          </div>

          <div className="calendar-navigation">

            <button
              onClick={() =>
                moveCalendar(-7)
              }
              aria-label="Previous week"
            >
              <ChevronLeft size={15} />
            </button>

            <strong>
              {calendarDays[0]
                ?.toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )}
              {" — "}
              {calendarDays[6]
                ?.toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )}
            </strong>

            <button
              onClick={() =>
                moveCalendar(7)
              }
              aria-label="Next week"
            >
              <ChevronRight size={15} />
            </button>

          </div>

        </div>

        <div className="calendar-days">

          {calendarDays.map(
            (date) => {

              const iso =
                date.toLocaleDateString(
                  "en-CA"
                );

              const selectedIso =
                calendarDate.toLocaleDateString(
                  "en-CA"
                );

              const eventCount =
                getEventsForDate(
                  date
                );

              return (
                <button
                  key={iso}
                  className={
                    selectedIso === iso
                      ? "calendar-day active"
                      : "calendar-day"
                  }
                  onClick={() =>
                    setCalendarDate(
                      date
                    )
                  }
                >

                  <span>
                    {date.toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "short",
                      }
                    )}
                  </span>

                  <strong>
                    {date.getDate()}
                  </strong>

                  <small>
                    {eventCount} events
                  </small>

                </button>
              );
            }
          )}

        </div>

      </section>

      {/* =========================
          APPOINTMENTS PANEL
      ========================= */}

      <section className="appointments-panel">

        {/* TOOLBAR */}

        <div className="appointments-toolbar">

          <div className="appointments-search">

            <Search size={15} />

            <input
              type="text"
              placeholder="Search appointments..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            {search && (
              <button
                onClick={() =>
                  setSearch("")
                }
              >
                <X size={14} />
              </button>
            )}

          </div>

          <div className="appointment-filters">

            {statusFilters.map(
              (filter) => (
                <button
                  key={filter}
                  className={
                    statusFilter ===
                    filter
                      ? "appointment-filter active"
                      : "appointment-filter"
                  }
                  onClick={() =>
                    setStatusFilter(
                      filter
                    )
                  }
                >
                  {filter}
                </button>
              )
            )}

          </div>

        </div>

        {/* LIST */}

        <div className="appointments-list">

          <div className="appointments-list-head">

            <span>
              TIME
            </span>

            <span>
              CUSTOMER
            </span>

            <span>
              VEHICLE
            </span>

            <span>
              TYPE
            </span>

            <span>
              LOCATION
            </span>

            <span>
              STATUS
            </span>

            <span />

          </div>

          {loading ? (
            <div className="appointments-empty">

              <CalendarDays size={30} />

              <strong>
                Loading appointments...
              </strong>

              <span>
                Please wait.
              </span>

            </div>
          ) : filteredAppointments.length ===
            0 ? (
            <div className="appointments-empty">

              <CalendarDays size={30} />

              <strong>
                No appointments found
              </strong>

              <span>
                Try another search or filter.
              </span>

            </div>
          ) : (
            filteredAppointments.map(
              (appointment) => (

                <div
                  className="appointment-row"
                  key={appointment.id}
                >

                  {/* TIME */}

                  <div className="appointment-time">

                    <strong>
                      {appointment.time}
                    </strong>

                    <span>
                      {appointment.date}
                    </span>

                  </div>

                  {/* CUSTOMER */}

                  <div className="appointment-customer">

                    <div className="appointment-avatar">

                      {appointment.customer
                        .split(" ")
                        .map(
                          (name) =>
                            name[0]
                        )
                        .join("")
                        .slice(0, 2)}

                    </div>

                    <div>

                      <strong>
                        {appointment.customer}
                      </strong>

                      <span>
                        {appointment.phone}
                      </span>

                    </div>

                  </div>

                  {/* VEHICLE */}

                  <div className="appointment-car">

                    <div className="appointment-car-icon">

                      <CarFront
                        size={15}
                      />

                    </div>

                    <strong>
                      {appointment.car}
                    </strong>

                  </div>

                  {/* TYPE */}

                  <span className="appointment-type">
                    {appointment.type}
                  </span>

                  {/* LOCATION */}

                  <div className="appointment-location">

                    <MapPin size={13} />

                    <span>
                      {appointment.location}
                    </span>

                  </div>

                  {/* STATUS */}

                  <span
                    className={`appointment-status ${getStatusClass(
                      appointment.status
                    )}`}
                  >

                    {appointment.status ===
                      "Confirmed" && (
                      <CheckCircle2
                        size={12}
                      />
                    )}

                    {appointment.status ===
                      "Pending" && (
                      <Clock3
                        size={12}
                      />
                    )}

                    {appointment.status ===
                      "Cancelled" && (
                      <XCircle
                        size={12}
                      />
                    )}

                    {appointment.status}

                  </span>

                  {/* VIEW */}

                  <button
                    className="appointment-view"
                    onClick={() =>
                      setSelectedAppointment(
                        appointment
                      )
                    }
                  >
                    <ArrowUpRight
                      size={15}
                    />
                  </button>

                </div>

              )
            )
          )}

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <div className="appointments-footer">

        <span>
          Showing{" "}
          {filteredAppointments.length}{" "}
          appointments
        </span>

        <span>
          MOTORA / SCHEDULING SYSTEM
        </span>

      </div>

      {/* =========================
          DETAIL MODAL
      ========================= */}

      {selectedAppointment && (

        <div
          className="appointment-modal-overlay"
          onClick={() =>
            setSelectedAppointment(
              null
            )
          }
        >

          <div
            className="appointment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="appointment-modal-header">

              <div>

                <span>
                  APPOINTMENT DETAILS
                </span>

                <h2>
                  {selectedAppointment.type}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedAppointment(
                    null
                  )
                }
              >
                <X size={18} />
              </button>

            </div>

            {/* CUSTOMER */}

            <div className="appointment-profile">

              <div className="large-appointment-avatar">

                {selectedAppointment.customer
                  .split(" ")
                  .map(
                    (name) =>
                      name[0]
                  )
                  .join("")
                  .slice(0, 2)}

              </div>

              <div>

                <strong>
                  {selectedAppointment.customer}
                </strong>

                <span>
                  {selectedAppointment.phone}
                </span>

              </div>

            </div>

            {/* VEHICLE */}

            <div className="appointment-detail-hero">

              <div className="appointment-detail-icon">

                <CarFront size={24} />

              </div>

              <div>

                <span>
                  VEHICLE
                </span>

                <strong>
                  {selectedAppointment.car}
                </strong>

                <small>
                  {selectedAppointment.type}
                </small>

              </div>

            </div>

            {/* DETAILS */}

            <div className="appointment-detail-grid">

              <div>

                <span>
                  DATE
                </span>

                <strong>
                  {selectedAppointment.date}
                </strong>

              </div>

              <div>

                <span>
                  TIME
                </span>

                <strong>
                  {selectedAppointment.time}
                </strong>

              </div>

              <div>

                <span>
                  LOCATION
                </span>

                <strong>
                  {selectedAppointment.location}
                </strong>

              </div>

              <div>

                <span>
                  TYPE
                </span>

                <strong>
                  {selectedAppointment.type}
                </strong>

              </div>

            </div>

            {/* STATUS */}

            <div className="appointment-status-section">

              <span>
                APPOINTMENT STATUS
              </span>

              <div>

                {statusFilters
                  .filter(
                    (item) =>
                      item !== "All"
                  )
                  .map(
                    (status) => (

                      <button
                        key={status}
                        disabled={
                          savingId ===
                          selectedAppointment.id
                        }
                        className={
                          selectedAppointment.status ===
                          status
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          updateStatus(
                            selectedAppointment.id,
                            status
                          )
                        }
                      >

                        {savingId ===
                        selectedAppointment.id
                          ? "Saving..."
                          : status}

                      </button>

                    )
                  )}

              </div>

            </div>

            {/* ACTIONS */}

            <div className="appointment-modal-actions">

              <a
                href={`tel:${selectedAppointment.phone}`}
              >
                <Phone size={15} />

                Call Customer
              </a>

              <button
                onClick={() =>
                  setSelectedAppointment(
                    null
                  )
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Appointments;