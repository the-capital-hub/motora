import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  Phone,
  Search,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import "./SellRequests.css";

const initialRequests = [
  {
    id: 1,
    owner: "Rohit Kumar",
    email: "rohit.kumar@email.com",
    phone: "+91 98765 12345",
    car: "BMW 3 Series",
    year: 2021,
    km: "32,400 km",
    expectedPrice: "₹48,00,000",
    location: "New Delhi",
    status: "New",
    submitted: "Today, 11:20 AM",
  },
  {
    id: 2,
    owner: "Ankit Mehra",
    email: "ankit.mehra@email.com",
    phone: "+91 98123 45678",
    car: "Mercedes-Benz C-Class",
    year: 2022,
    km: "21,800 km",
    expectedPrice: "₹54,00,000",
    location: "Gurugram",
    status: "Inspection",
    submitted: "Today, 09:45 AM",
  },
  {
    id: 3,
    owner: "Sahil Verma",
    email: "sahil.verma@email.com",
    phone: "+91 99887 66554",
    car: "Audi A6",
    year: 2020,
    km: "41,200 km",
    expectedPrice: "₹39,50,000",
    location: "Noida",
    status: "Offer Sent",
    submitted: "Yesterday",
  },
  {
    id: 4,
    owner: "Karan Malhotra",
    email: "karan.m@email.com",
    phone: "+91 97654 32109",
    car: "Volvo XC60",
    year: 2022,
    km: "19,600 km",
    expectedPrice: "₹51,00,000",
    location: "Delhi",
    status: "Approved",
    submitted: "12 Aug 2026",
  },
  {
    id: 5,
    owner: "Amit Kapoor",
    email: "amit.k@email.com",
    phone: "+91 96543 21098",
    car: "Jaguar F-Pace",
    year: 2021,
    km: "28,700 km",
    expectedPrice: "₹46,00,000",
    location: "Faridabad",
    status: "Rejected",
    submitted: "10 Aug 2026",
  },
];

const filters = [
  "All",
  "New",
  "Inspection",
  "Offer Sent",
  "Approved",
  "Rejected",
];

const SellRequests = () => {
  const [requests, setRequests] =
    useState(initialRequests);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [openStatusId, setOpenStatusId] =
    useState(null);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const searchableText = `
        ${request.owner}
        ${request.email}
        ${request.phone}
        ${request.car}
        ${request.location}
        ${request.status}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(
          search.toLowerCase()
        );

      const matchesStatus =
        statusFilter === "All" ||
        request.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [requests, search, statusFilter]);

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status }
          : request
      )
    );

    setSelectedRequest((prev) =>
      prev && prev.id === id
        ? { ...prev, status }
        : prev
    );

    setOpenStatusId(null);
  };

  const getStatusClass = (status) =>
    status
      .toLowerCase()
      .replace(" ", "-");

  const getStatusIcon = (status) => {
    if (status === "Approved") {
      return <CheckCircle2 size={13} />;
    }

    if (status === "Rejected") {
      return <XCircle size={13} />;
    }

    if (status === "Inspection") {
      return <Clock3 size={13} />;
    }

    return <CarFront size={13} />;
  };

  return (
    <div className="sellrequests-page">

      {/* HEADER */}

      <header className="sellrequests-header">

        <div>
          <span className="sellrequests-eyebrow">
            MOTORA / SELL YOUR CAR
          </span>

          <h1>
            Sell requests
          </h1>

          <p>
            Review, evaluate and manage vehicles
            submitted by private sellers.
          </p>
        </div>

      </header>


      {/* STATS */}

      <section className="sellrequests-stats">

        <div className="sellrequest-stat">

          <span>
            TOTAL REQUESTS
          </span>

          <strong>
            {requests.length}
          </strong>

        </div>


        <div className="sellrequest-stat">

          <span>
            NEW REQUESTS
          </span>

          <strong>
            {
              requests.filter(
                (request) =>
                  request.status === "New"
              ).length
            }
          </strong>

        </div>


        <div className="sellrequest-stat">

          <span>
            INSPECTION
          </span>

          <strong>
            {
              requests.filter(
                (request) =>
                  request.status ===
                  "Inspection"
              ).length
            }
          </strong>

        </div>


        <div className="sellrequest-stat">

          <span>
            APPROVED
          </span>

          <strong>
            {
              requests.filter(
                (request) =>
                  request.status ===
                  "Approved"
              ).length
            }
          </strong>

        </div>

      </section>


      {/* PROCESS */}

      <section className="sell-process">

        <div className="sell-process-heading">

          <div>
            <span>
              MOTORA SELLING PROCESS
            </span>

            <h2>
              From request to purchase
            </h2>
          </div>

          <span>
            Simple. Transparent. Premium.
          </span>

        </div>


        <div className="sell-process-steps">

          <div className="sell-process-step">
            <span>01</span>
            <strong>Request</strong>
            <small>
              Customer submits vehicle
            </small>
          </div>

          <div className="sell-process-line" />

          <div className="sell-process-step">
            <span>02</span>
            <strong>Inspection</strong>
            <small>
              Vehicle is evaluated
            </small>
          </div>

          <div className="sell-process-line" />

          <div className="sell-process-step">
            <span>03</span>
            <strong>Offer</strong>
            <small>
              Best market price
            </small>
          </div>

          <div className="sell-process-line" />

          <div className="sell-process-step">
            <span>04</span>
            <strong>Purchase</strong>
            <small>
              Vehicle acquired
            </small>
          </div>

        </div>

      </section>


      {/* MAIN PANEL */}

      <section className="sellrequests-panel">

        {/* TOOLBAR */}

        <div className="sellrequests-toolbar">

          <div className="sellrequests-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search seller or vehicle..."
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


          <div className="sellrequest-filters">

            {filters.map((filter) => (

              <button
                key={filter}
                className={
                  statusFilter === filter
                    ? "sellrequest-filter active"
                    : "sellrequest-filter"
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

        <div className="sellrequests-table">

          <div className="sellrequests-table-head">

            <span>
              SELLER
            </span>

            <span>
              VEHICLE
            </span>

            <span>
              EXPECTED PRICE
            </span>

            <span>
              LOCATION
            </span>

            <span>
              STATUS
            </span>

            <span />

          </div>


          {filteredRequests.length === 0 ? (

            <div className="sellrequests-empty">

              <CarFront size={30} />

              <strong>
                No sell requests found
              </strong>

              <span>
                Try another search or filter.
              </span>

            </div>

          ) : (

            filteredRequests.map(
              (request) => (

                <div
                  className="sellrequest-row"
                  key={request.id}
                >

                  {/* SELLER */}

                  <div className="sellrequest-seller">

                    <div className="sellrequest-avatar">
                      {request.owner
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
                        {request.owner}
                      </strong>

                      <span>
                        {request.submitted}
                      </span>

                    </div>

                  </div>


                  {/* VEHICLE */}

                  <div className="sellrequest-car">

                    <div className="sellrequest-car-icon">
                      <CarFront size={17} />
                    </div>

                    <div>

                      <strong>
                        {request.car}
                      </strong>

                      <span>
                        {request.year} ·{" "}
                        {request.km}
                      </span>

                    </div>

                  </div>


                  {/* PRICE */}

                  <strong className="sellrequest-price">
                    {request.expectedPrice}
                  </strong>


                  {/* LOCATION */}

                  <span className="sellrequest-location">
                    {request.location}
                  </span>


                  {/* STATUS */}

                  <div className="sellrequest-status-wrapper">

                    <button
                      className={`sellrequest-status ${getStatusClass(
                        request.status
                      )}`}
                      onClick={() =>
                        setOpenStatusId(
                          openStatusId ===
                            request.id
                            ? null
                            : request.id
                        )
                      }
                    >

                      {getStatusIcon(
                        request.status
                      )}

                      {request.status}

                      <ChevronDown size={11} />

                    </button>


                    {openStatusId ===
                      request.id && (

                      <div className="sellrequest-status-menu">

                        {filters
                          .filter(
                            (item) =>
                              item !== "All"
                          )
                          .map((status) => (

                            <button
                              key={status}
                              onClick={() =>
                                updateStatus(
                                  request.id,
                                  status
                                )
                              }
                            >
                              {status}
                            </button>

                          ))}

                      </div>

                    )}

                  </div>


                  {/* VIEW */}

                  <button
                    className="sellrequest-view"
                    onClick={() =>
                      setSelectedRequest(
                        request
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

      <div className="sellrequests-footer">

        <span>
          Showing {filteredRequests.length} of{" "}
          {requests.length} requests
        </span>

        <span>
          MOTORA / SELLING SYSTEM
        </span>

      </div>


      {/* DETAIL MODAL */}

      {selectedRequest && (

        <div
          className="sellrequest-modal-overlay"
          onClick={() =>
            setSelectedRequest(null)
          }
        >

          <div
            className="sellrequest-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="sellrequest-modal-header">

              <div>

                <span>
                  SELL REQUEST
                </span>

                <h2>
                  {selectedRequest.car}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedRequest(null)
                }
              >
                <X size={18} />
              </button>

            </div>


            {/* SELLER PROFILE */}

            <div className="sellrequest-profile">

              <div className="large-sellrequest-avatar">
                {selectedRequest.owner
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
                  {selectedRequest.owner}
                </strong>

                <span>
                  {selectedRequest.location}
                </span>

              </div>

            </div>


            {/* VEHICLE */}

            <div className="sellrequest-vehicle-card">

              <div className="sellrequest-large-car">
                <CarFront size={25} />
              </div>

              <div>

                <span>
                  VEHICLE
                </span>

                <strong>
                  {selectedRequest.car}
                </strong>

                <small>
                  {selectedRequest.year} ·{" "}
                  {selectedRequest.km}
                </small>

              </div>

            </div>


            {/* DETAILS */}

            <div className="sellrequest-detail-grid">

              <div>

                <span>
                  EXPECTED PRICE
                </span>

                <strong>
                  {selectedRequest.expectedPrice}
                </strong>

              </div>


              <div>

                <span>
                  LOCATION
                </span>

                <strong>
                  {selectedRequest.location}
                </strong>

              </div>


              <div>

                <span>
                  EMAIL
                </span>

                <strong>
                  {selectedRequest.email}
                </strong>

              </div>


              <div>

                <span>
                  PHONE
                </span>

                <strong>
                  {selectedRequest.phone}
                </strong>

              </div>

            </div>


            {/* STATUS */}

            <div className="sellrequest-status-section">

              <span>
                REQUEST STATUS
              </span>

              <div className="sellrequest-status-buttons">

                {filters
                  .filter(
                    (item) =>
                      item !== "All"
                  )
                  .map((status) => (

                    <button
                      key={status}
                      className={
                        selectedRequest.status ===
                        status
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        updateStatus(
                          selectedRequest.id,
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

            <div className="sellrequest-modal-actions">

              <a
                href={`tel:${selectedRequest.phone}`}
              >
                <Phone size={15} />
                Call Seller
              </a>

              <a
                href={`mailto:${selectedRequest.email}`}
              >
                <Mail size={15} />
                Email
              </a>

              <button
                onClick={() =>
                  setSelectedRequest(null)
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

export default SellRequests;