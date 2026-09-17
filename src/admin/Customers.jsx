import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CarFront,
  ChevronDown,
  Mail,
  Phone,
  Search,
  UserRound,
  X,
} from "lucide-react";

import "./Customers.css";

const initialCustomers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    location: "New Delhi",
    interestedCar: "BMW X5",
    purchases: 1,
    spent: "₹82,00,000",
    lastActivity: "Today, 10:42 AM",
    status: "Active",
    joined: "12 Mar 2026",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@email.com",
    phone: "+91 98123 45678",
    location: "Gurugram",
    interestedCar: "Mercedes-Benz GLE",
    purchases: 2,
    spent: "₹1,74,00,000",
    lastActivity: "Today, 09:18 AM",
    status: "VIP",
    joined: "18 Jan 2026",
  },
  {
    id: 3,
    name: "Aman Verma",
    email: "aman.verma@email.com",
    phone: "+91 99887 66554",
    location: "Noida",
    interestedCar: "Porsche Cayenne",
    purchases: 0,
    spent: "₹0",
    lastActivity: "Yesterday",
    status: "Lead",
    joined: "05 Aug 2026",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    email: "arjun.mehta@email.com",
    phone: "+91 97654 32109",
    location: "New Delhi",
    interestedCar: "Audi Q8",
    purchases: 1,
    spent: "₹96,00,000",
    lastActivity: "Yesterday",
    status: "Active",
    joined: "21 Feb 2026",
  },
  {
    id: 5,
    name: "Neha Kapoor",
    email: "neha.kapoor@email.com",
    phone: "+91 96543 21098",
    location: "Faridabad",
    interestedCar: "Range Rover Velar",
    purchases: 3,
    spent: "₹2,48,00,000",
    lastActivity: "12 Aug 2026",
    status: "VIP",
    joined: "11 Dec 2025",
  },
  {
    id: 6,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 95432 10987",
    location: "Ghaziabad",
    interestedCar: "BMW 3 Series",
    purchases: 0,
    spent: "₹0",
    lastActivity: "10 Aug 2026",
    status: "Inactive",
    joined: "20 Jun 2026",
  },
];

const filters = [
  "All",
  "Active",
  "VIP",
  "Lead",
  "Inactive",
];

const Customers = () => {
  const [customers, setCustomers] =
    useState(initialCustomers);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [openStatusId, setOpenStatusId] =
    useState(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchableText = `
        ${customer.name}
        ${customer.email}
        ${customer.phone}
        ${customer.location}
        ${customer.interestedCar}
        ${customer.status}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(
          search.toLowerCase()
        );

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [customers, search, statusFilter]);

  const updateStatus = (id, status) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? { ...customer, status }
          : customer
      )
    );

    setSelectedCustomer((prev) =>
      prev && prev.id === id
        ? { ...prev, status }
        : prev
    );

    setOpenStatusId(null);
  };

  const getStatusClass = (status) =>
    status.toLowerCase();

  return (
    <div className="customers-page">

      {/* HEADER */}

      <header className="customers-header">

        <div>

          <span className="customers-eyebrow">
            MOTORA / CRM / CUSTOMERS
          </span>

          <h1>
            Customers
          </h1>

          <p>
            Manage customer relationships,
            purchase history and lifetime value.
          </p>

        </div>

      </header>


      {/* STATS */}

      <section className="customers-stats">

        <div className="customer-stat">

          <span>
            TOTAL CUSTOMERS
          </span>

          <strong>
            {customers.length}
          </strong>

          <small>
            +18 this month
          </small>

        </div>


        <div className="customer-stat">

          <span>
            VIP CUSTOMERS
          </span>

          <strong>
            {
              customers.filter(
                (customer) =>
                  customer.status === "VIP"
              ).length
            }
          </strong>

          <small>
            High-value relationships
          </small>

        </div>


        <div className="customer-stat">

          <span>
            ACTIVE CUSTOMERS
          </span>

          <strong>
            {
              customers.filter(
                (customer) =>
                  customer.status === "Active"
              ).length
            }
          </strong>

          <small>
            Engaged recently
          </small>

        </div>


        <div className="customer-stat">

          <span>
            CUSTOMER VALUE
          </span>

          <strong>
            ₹5.00 Cr
          </strong>

          <small>
            Lifetime purchase value
          </small>

        </div>

      </section>


      {/* VIP BANNER */}

      <section className="customer-highlight">

        <div className="customer-highlight-icon">
          <UserRound size={19} />
        </div>

        <div>

          <span>
            CUSTOMER RELATIONSHIP
          </span>

          <h2>
            Premium relationships create
            premium experiences.
          </h2>

          <p>
            Keep track of every interaction,
            vehicle interest and purchase so your
            team always knows the customer.
          </p>

        </div>

        <div className="customer-highlight-value">

          <strong>
            3
          </strong>

          <span>
            VIP customers
          </span>

        </div>

      </section>


      {/* MAIN PANEL */}

      <section className="customers-panel">

        {/* TOOLBAR */}

        <div className="customers-toolbar">

          <div className="customers-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search customers..."
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


          <div className="customer-filters">

            {filters.map((filter) => (

              <button
                key={filter}
                className={
                  statusFilter === filter
                    ? "customer-filter active"
                    : "customer-filter"
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

        <div className="customers-table">

          <div className="customers-table-head">

            <span>
              CUSTOMER
            </span>

            <span>
              VEHICLE INTEREST
            </span>

            <span>
              PURCHASES
            </span>

            <span>
              LIFETIME VALUE
            </span>

            <span>
              STATUS
            </span>

            <span />

          </div>


          {filteredCustomers.length === 0 ? (

            <div className="customers-empty">

              <UserRound size={30} />

              <strong>
                No customers found
              </strong>

              <span>
                Try another search or filter.
              </span>

            </div>

          ) : (

            filteredCustomers.map(
              (customer) => (

                <div
                  className="customer-row"
                  key={customer.id}
                >

                  {/* CUSTOMER */}

                  <div className="customer-person">

                    <div className="customer-avatar">
                      {customer.name
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
                        {customer.name}
                      </strong>

                      <span>
                        {customer.location}
                      </span>

                    </div>

                  </div>


                  {/* VEHICLE */}

                  <div className="customer-car">

                    <div className="customer-car-icon">
                      <CarFront size={16} />
                    </div>

                    <div>

                      <strong>
                        {customer.interestedCar}
                      </strong>

                      <span>
                        Last activity:{" "}
                        {customer.lastActivity}
                      </span>

                    </div>

                  </div>


                  {/* PURCHASES */}

                  <div className="customer-purchases">

                    <strong>
                      {customer.purchases}
                    </strong>

                    <span>
                      vehicle
                      {customer.purchases !== 1
                        ? "s"
                        : ""}
                    </span>

                  </div>


                  {/* VALUE */}

                  <strong className="customer-value">
                    {customer.spent}
                  </strong>


                  {/* STATUS */}

                  <div className="customer-status-wrapper">

                    <button
                      className={`customer-status ${getStatusClass(
                        customer.status
                      )}`}
                      onClick={() =>
                        setOpenStatusId(
                          openStatusId ===
                            customer.id
                            ? null
                            : customer.id
                        )
                      }
                    >

                      {customer.status}

                      <ChevronDown size={11} />

                    </button>


                    {openStatusId ===
                      customer.id && (

                      <div className="customer-status-menu">

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
                                  customer.id,
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
                    className="customer-view"
                    onClick={() =>
                      setSelectedCustomer(
                        customer
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

      <div className="customers-footer">

        <span>
          Showing {filteredCustomers.length} of{" "}
          {customers.length} customers
        </span>

        <span>
          MOTORA / CUSTOMER CRM
        </span>

      </div>


      {/* CUSTOMER MODAL */}

      {selectedCustomer && (

        <div
          className="customer-modal-overlay"
          onClick={() =>
            setSelectedCustomer(null)
          }
        >

          <div
            className="customer-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="customer-modal-header">

              <div>

                <span>
                  CUSTOMER PROFILE
                </span>

                <h2>
                  {selectedCustomer.name}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >
                <X size={18} />
              </button>

            </div>


            {/* PROFILE */}

            <div className="customer-profile">

              <div className="large-customer-avatar">
                {selectedCustomer.name
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
                  {selectedCustomer.name}
                </strong>

                <span>
                  Customer since{" "}
                  {selectedCustomer.joined}
                </span>

              </div>

              <span
                className={`customer-profile-status ${getStatusClass(
                  selectedCustomer.status
                )}`}
              >
                {selectedCustomer.status}
              </span>

            </div>


            {/* CONTACT */}

            <div className="customer-contact-row">

              <a
                href={`tel:${selectedCustomer.phone}`}
              >
                <Phone size={14} />
                {selectedCustomer.phone}
              </a>

              <a
                href={`mailto:${selectedCustomer.email}`}
              >
                <Mail size={14} />
                {selectedCustomer.email}
              </a>

            </div>


            {/* DETAILS */}

            <div className="customer-detail-grid">

              <div>

                <span>
                  LOCATION
                </span>

                <strong>
                  {selectedCustomer.location}
                </strong>

              </div>


              <div>

                <span>
                  VEHICLE INTEREST
                </span>

                <strong>
                  {selectedCustomer.interestedCar}
                </strong>

              </div>


              <div>

                <span>
                  TOTAL PURCHASES
                </span>

                <strong>
                  {selectedCustomer.purchases}
                </strong>

              </div>


              <div>

                <span>
                  LIFETIME VALUE
                </span>

                <strong>
                  {selectedCustomer.spent}
                </strong>

              </div>


              <div>

                <span>
                  LAST ACTIVITY
                </span>

                <strong>
                  {selectedCustomer.lastActivity}
                </strong>

              </div>


              <div>

                <span>
                  CUSTOMER SINCE
                </span>

                <strong>
                  {selectedCustomer.joined}
                </strong>

              </div>

            </div>


            {/* ACTIVITY */}

            <div className="customer-activity">

              <div className="customer-activity-header">

                <span>
                  RECENT ACTIVITY
                </span>

                <CalendarDays size={14} />

              </div>


              <div className="customer-activity-item">

                <div className="activity-point" />

                <div>

                  <strong>
                    Enquired about{" "}
                    {selectedCustomer.interestedCar}
                  </strong>

                  <span>
                    Today, 10:42 AM
                  </span>

                </div>

              </div>


              <div className="customer-activity-item">

                <div className="activity-point" />

                <div>

                  <strong>
                    Viewed vehicle details
                  </strong>

                  <span>
                    Yesterday, 04:20 PM
                  </span>

                </div>

              </div>


              <div className="customer-activity-item">

                <div className="activity-point" />

                <div>

                  <strong>
                    Customer profile updated
                  </strong>

                  <span>
                    05 Aug 2026
                  </span>

                </div>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="customer-modal-actions">

              <a
                href={`tel:${selectedCustomer.phone}`}
              >
                <Phone size={15} />
                Call Customer
              </a>

              <a
                href={`mailto:${selectedCustomer.email}`}
              >
                <Mail size={15} />
                Email
              </a>

              <button
                onClick={() =>
                  setSelectedCustomer(null)
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

export default Customers;