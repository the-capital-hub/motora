import { useMemo, useState } from "react";
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

const initialAppointments = [
  {
    id: 1,
    customer: "Rahul Sharma",
    phone: "+91 98765 43210",
    car: "BMW X5",
    type: "Test Drive",
    date: "14 Aug 2026",
    time: "11:30 AM",
    location: "Motora Delhi Showroom",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Priya Singh",
    phone: "+91 98123 45678",
    car: "Mercedes-Benz GLE",
    type: "Test Drive",
    date: "14 Aug 2026",
    time: "01:00 PM",
    location: "Motora Gurugram",
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Aman Verma",
    phone: "+91 99887 66554",
    car: "Porsche Cayenne",
    type: "Consultation",
    date: "14 Aug 2026",
    time: "03:30 PM",
    location: "Motora Delhi Showroom",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Arjun Mehta",
    phone: "+91 97654 32109",
    car: "Audi Q8",
    type: "Test Drive",
    date: "15 Aug 2026",
    time: "10:00 AM",
    location: "Motora Noida",
    status: "Confirmed",
  },
  {
    id: 5,
    customer: "Neha Kapoor",
    phone: "+91 96543 21098",
    car: "Range Rover Velar",
    type: "Delivery",
    date: "15 Aug 2026",
    time: "04:00 PM",
    location: "Motora Delhi Showroom",
    status: "Confirmed",
  },
  {
    id: 6,
    customer: "Vikram Singh",
    phone: "+91 95432 10987",
    car: "BMW 3 Series",
    type: "Consultation",
    date: "16 Aug 2026",
    time: "12:30 PM",
    location: "Motora Ghaziabad",
    status: "Cancelled",
  },
];

const statusFilters = [
  "All",
  "Confirmed",
  "Pending",
  "Cancelled",
];

const Appointments = () => {
  const [appointments, setAppointments] =
    useState(initialAppointments);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [calendarDate, setCalendarDate] =
    useState(14);

  const updateStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status,
            }
          : appointment
      )
    );

    setSelectedAppointment((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            status,
          }
        : prev
    );
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const text = `
        ${appointment.customer}
        ${appointment.phone}
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
        appointment.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    appointments,
    search,
    statusFilter,
  ]);

  const todayAppointments =
    appointments.filter(
      (appointment) =>
        appointment.date ===
        "14 Aug 2026"
    );

  const getStatusClass = (status) =>
    status.toLowerCase();

  return (
    <div className="appointments-page">

      {/* HEADER */}

      <header className="appointments-header">

        <div>

          <span className="appointments-eyebrow">
            MOTORA / CRM / APPOINTMENTS
          </span>

          <h1>
            Appointments
          </h1>

          <p>
            Manage test drives, consultations
            and vehicle deliveries.
          </p>

        </div>


        <button className="appointment-create-btn">
          <CalendarDays size={15} />
          New appointment
        </button>

      </header>


      {/* STATS */}

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
            {
              appointments.filter(
                (item) =>
                  item.type ===
                  "Test Drive"
              ).length
            }
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
            {
              appointments.filter(
                (item) =>
                  item.status ===
                  "Confirmed"
              ).length
            }
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
            {
              appointments.filter(
                (item) =>
                  item.status ===
                  "Pending"
              ).length
            }
          </strong>

          <small>
            Need confirmation
          </small>

        </div>

      </section>


      {/* CALENDAR STRIP */}

      <section className="appointment-calendar">

        <div className="appointment-calendar-header">

          <div>

            <span>
              AUGUST 2026
            </span>

            <h2>
              Schedule
            </h2>

          </div>


          <div className="calendar-navigation">

            <button
              onClick={() =>
                setCalendarDate(
                  Math.max(
                    1,
                    calendarDate - 1
                  )
                )
              }
            >
              <ChevronLeft size={15} />
            </button>

            <strong>
              {calendarDate} Aug
            </strong>

            <button
              onClick={() =>
                setCalendarDate(
                  Math.min(
                    31,
                    calendarDate + 1
                  )
                )
              }
            >
              <ChevronRight size={15} />
            </button>

          </div>

        </div>


        <div className="calendar-days">

          {[10, 11, 12, 13, 14, 15, 16].map(
            (day) => (

              <button
                key={day}
                className={
                  calendarDate === day
                    ? "calendar-day active"
                    : "calendar-day"
                }
                onClick={() =>
                  setCalendarDate(day)
                }
              >

                <span>
                  {
                    [
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                      "Sun",
                    ][day - 10]
                  }
                </span>

                <strong>
                  {day}
                </strong>

                <small>
                  {
                    appointments.filter(
                      (item) =>
                        item.date ===
                        `${day} Aug 2026`
                    ).length
                  }{" "}
                  events
                </small>

              </button>

            )
          )}

        </div>

      </section>


      {/* APPOINTMENTS PANEL */}

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
                setSearch(e.target.value)
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
                    setStatusFilter(filter)
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


          {filteredAppointments.length ===
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
                      <CarFront size={15} />
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
                      <CheckCircle2 size={12} />
                    )}

                    {appointment.status ===
                      "Pending" && (
                      <Clock3 size={12} />
                    )}

                    {appointment.status ===
                      "Cancelled" && (
                      <XCircle size={12} />
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
                    <ArrowUpRight size={15} />
                  </button>

                </div>

              )
            )

          )}

        </div>

      </section>


      {/* FOOTER */}

      <div className="appointments-footer">

        <span>
          Showing {filteredAppointments.length}{" "}
          appointments
        </span>

        <span>
          MOTORA / SCHEDULING SYSTEM
        </span>

      </div>


      {/* DETAIL MODAL */}

      {selectedAppointment && (

        <div
          className="appointment-modal-overlay"
          onClick={() =>
            setSelectedAppointment(null)
          }
        >

          <div
            className="appointment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

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


            {/* APPOINTMENT HERO */}

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
                  .map((status) => (

                    <button
                      key={status}
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
                      {status}
                    </button>

                  ))}

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