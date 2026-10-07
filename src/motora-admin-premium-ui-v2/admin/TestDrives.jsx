import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  Search,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import "./TestDrives.css";

const initialTestDrives = [
  {
    id: 1,
    customer: "Rahul Sharma",
    phone: "+91 98765 43210",
    car: "BMW X5",
    date: "14 Aug 2026",
    time: "04:30 PM",
    location: "MOTORA Delhi Showroom",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Priya Singh",
    phone: "+91 98123 45678",
    car: "Mercedes-Benz GLE",
    date: "15 Aug 2026",
    time: "11:00 AM",
    location: "MOTORA Gurgaon Showroom",
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Aman Verma",
    phone: "+91 99887 66554",
    car: "Porsche Cayenne",
    date: "15 Aug 2026",
    time: "03:30 PM",
    location: "MOTORA Delhi Showroom",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Arjun Mehta",
    phone: "+91 97654 32109",
    car: "Audi Q8",
    date: "16 Aug 2026",
    time: "12:00 PM",
    location: "MOTORA Noida Showroom",
    status: "Confirmed",
  },
  {
    id: 5,
    customer: "Neha Kapoor",
    phone: "+91 96543 21098",
    car: "Range Rover Velar",
    date: "16 Aug 2026",
    time: "05:00 PM",
    location: "MOTORA Delhi Showroom",
    status: "Completed",
  },
  {
    id: 6,
    customer: "Vikram Singh",
    phone: "+91 95432 10987",
    car: "BMW X5",
    date: "17 Aug 2026",
    time: "10:30 AM",
    location: "MOTORA Gurgaon Showroom",
    status: "Cancelled",
  },
];

const filters = [
  "All",
  "Confirmed",
  "Pending",
  "Completed",
  "Cancelled",
];

const TestDrives = () => {
  const [testDrives, setTestDrives] =
    useState(initialTestDrives);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedDrive, setSelectedDrive] =
    useState(null);

  const filteredDrives = useMemo(() => {
    return testDrives.filter((drive) => {
      const searchableText = `
        ${drive.customer}
        ${drive.phone}
        ${drive.car}
        ${drive.location}
        ${drive.date}
        ${drive.status}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(
          search.toLowerCase()
        );

      const matchesStatus =
        statusFilter === "All" ||
        drive.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [testDrives, search, statusFilter]);

  const updateStatus = (id, status) => {
    setTestDrives((prev) =>
      prev.map((drive) =>
        drive.id === id
          ? { ...drive, status }
          : drive
      )
    );

    setSelectedDrive((prev) =>
      prev && prev.id === id
        ? { ...prev, status }
        : prev
    );
  };

  const getStatusIcon = (status) => {
    if (status === "Confirmed") {
      return <CheckCircle2 size={13} />;
    }

    if (status === "Completed") {
      return <CheckCircle2 size={13} />;
    }

    if (status === "Cancelled") {
      return <XCircle size={13} />;
    }

    return <Clock3 size={13} />;
  };

  const getStatusClass = (status) =>
    status.toLowerCase();

  return (
    <div className="testdrives-page">

      {/* HEADER */}

      <header className="testdrives-header">

        <div>
          <span className="testdrives-eyebrow">
            MOTORA / APPOINTMENTS
          </span>

          <h1>
            Test drives
          </h1>

          <p>
            Schedule and manage premium
            vehicle test drive appointments.
          </p>
        </div>

      </header>


      {/* STATS */}

      <section className="testdrives-stats">

        <div className="testdrive-stat">
          <div className="testdrive-stat-icon">
            <CalendarDays size={17} />
          </div>

          <span>
            TOTAL APPOINTMENTS
          </span>

          <strong>
            {testDrives.length}
          </strong>
        </div>


        <div className="testdrive-stat">
          <div className="testdrive-stat-icon">
            <CheckCircle2 size={17} />
          </div>

          <span>
            CONFIRMED
          </span>

          <strong>
            {
              testDrives.filter(
                (drive) =>
                  drive.status === "Confirmed"
              ).length
            }
          </strong>
        </div>


        <div className="testdrive-stat">
          <div className="testdrive-stat-icon">
            <Clock3 size={17} />
          </div>

          <span>
            PENDING
          </span>

          <strong>
            {
              testDrives.filter(
                (drive) =>
                  drive.status === "Pending"
              ).length
            }
          </strong>
        </div>


        <div className="testdrive-stat">
          <div className="testdrive-stat-icon">
            <CarFront size={17} />
          </div>

          <span>
            COMPLETED
          </span>

          <strong>
            {
              testDrives.filter(
                (drive) =>
                  drive.status === "Completed"
              ).length
            }
          </strong>
        </div>

      </section>


      {/* TODAY */}

      <section className="today-testdrives">

        <div className="today-heading">

          <div>
            <span>
              TODAY
            </span>

            <h2>
              Today's schedule
            </h2>
          </div>

          <span className="today-count">
            2 appointments
          </span>

        </div>


        <div className="today-cards">

          {testDrives
            .filter(
              (drive) =>
                drive.date ===
                "14 Aug 2026"
            )
            .map((drive) => (

              <div
                className="today-card"
                key={drive.id}
              >

                <div className="today-time">
                  <Clock3 size={15} />
                  {drive.time}
                </div>

                <div className="today-car">
                  <CarFront size={19} />

                  <div>
                    <strong>
                      {drive.car}
                    </strong>

                    <span>
                      {drive.customer}
                    </span>
                  </div>
                </div>

                <div className="today-location">
                  <MapPin size={14} />
                  {drive.location}
                </div>

              </div>

            ))}

        </div>

      </section>


      {/* MAIN PANEL */}

      <section className="testdrives-panel">

        {/* TOOLBAR */}

        <div className="testdrives-toolbar">

          <div className="testdrives-search">

            <Search size={16} />

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


          <div className="testdrive-filters">

            {filters.map((filter) => (

              <button
                key={filter}
                className={
                  statusFilter === filter
                    ? "testdrive-filter active"
                    : "testdrive-filter"
                }
                onClick={() =>
                  setStatusFilter(filter)
                }
              >
                {filter}
              </button>

            ))}

          </div>

        </div>


        {/* TABLE */}

        <div className="testdrives-table">

          <div className="testdrives-table-head">

            <span>
              CUSTOMER
            </span>

            <span>
              VEHICLE
            </span>

            <span>
              DATE & TIME
            </span>

            <span>
              LOCATION
            </span>

            <span>
              STATUS
            </span>

            <span />

          </div>


          {filteredDrives.length === 0 ? (

            <div className="testdrives-empty">

              <CalendarDays size={30} />

              <strong>
                No test drives found
              </strong>

              <span>
                Try another search or filter.
              </span>

            </div>

          ) : (

            filteredDrives.map((drive) => (

              <div
                className="testdrive-row"
                key={drive.id}
              >

                {/* CUSTOMER */}

                <div className="testdrive-customer">

                  <div className="testdrive-avatar">
                    {drive.customer
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
                      {drive.customer}
                    </strong>

                    <span>
                      {drive.phone}
                    </span>
                  </div>

                </div>


                {/* CAR */}

                <div className="testdrive-car">

                  <div className="testdrive-car-icon">
                    <CarFront size={17} />
                  </div>

                  <div>
                    <strong>
                      {drive.car}
                    </strong>

                    <span>
                      Premium test drive
                    </span>
                  </div>

                </div>


                {/* DATE */}

                <div className="testdrive-datetime">

                  <strong>
                    {drive.date}
                  </strong>

                  <span>
                    <Clock3 size={11} />
                    {drive.time}
                  </span>

                </div>


                {/* LOCATION */}

                <div className="testdrive-location">

                  <MapPin size={13} />

                  <span>
                    {drive.location}
                  </span>

                </div>


                {/* STATUS */}

                <span
                  className={`testdrive-status ${getStatusClass(
                    drive.status
                  )}`}
                >
                  {getStatusIcon(
                    drive.status
                  )}

                  {drive.status}
                </span>


                {/* VIEW */}

                <button
                  className="testdrive-view"
                  onClick={() =>
                    setSelectedDrive(drive)
                  }
                >
                  <ArrowUpRight size={15} />
                </button>

              </div>

            ))

          )}

        </div>

      </section>


      {/* FOOTER */}

      <div className="testdrives-footer">

        <span>
          Showing {filteredDrives.length} of{" "}
          {testDrives.length} appointments
        </span>

        <span>
          MOTORA / APPOINTMENT SYSTEM
        </span>

      </div>


      {/* DETAIL MODAL */}

      {selectedDrive && (

        <div
          className="testdrive-modal-overlay"
          onClick={() =>
            setSelectedDrive(null)
          }
        >

          <div
            className="testdrive-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="testdrive-modal-header">

              <div>
                <span>
                  TEST DRIVE APPOINTMENT
                </span>

                <h2>
                  {selectedDrive.car}
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedDrive(null)
                }
              >
                <X size={18} />
              </button>

            </div>


            {/* CUSTOMER */}

            <div className="testdrive-profile">

              <div className="large-testdrive-avatar">
                {selectedDrive.customer
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
                  {selectedDrive.customer}
                </strong>

                <span>
                  {selectedDrive.phone}
                </span>
              </div>

            </div>


            {/* DETAILS */}

            <div className="testdrive-detail-grid">

              <div>
                <span>
                  DATE
                </span>

                <strong>
                  {selectedDrive.date}
                </strong>
              </div>

              <div>
                <span>
                  TIME
                </span>

                <strong>
                  {selectedDrive.time}
                </strong>
              </div>

              <div>
                <span>
                  VEHICLE
                </span>

                <strong>
                  {selectedDrive.car}
                </strong>
              </div>

              <div>
                <span>
                  LOCATION
                </span>

                <strong>
                  {selectedDrive.location}
                </strong>
              </div>

            </div>


            {/* STATUS */}

            <div className="testdrive-status-section">

              <span>
                APPOINTMENT STATUS
              </span>

              <div className="testdrive-status-buttons">

                {[
                  "Confirmed",
                  "Pending",
                  "Completed",
                  "Cancelled",
                ].map((status) => (

                  <button
                    key={status}
                    className={
                      selectedDrive.status ===
                      status
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      updateStatus(
                        selectedDrive.id,
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

            <div className="testdrive-modal-actions">

              <a
                href={`tel:${selectedDrive.phone}`}
              >
                <Phone size={15} />
                Call Customer
              </a>

              <button
                onClick={() =>
                  setSelectedDrive(null)
                }
              >
                Close
                <ArrowUpRight size={15} />
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default TestDrives;