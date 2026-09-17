import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Mail,
  MessageSquare,
  Phone,
  Search,
  UserRound,
  X,
} from "lucide-react";

import "./Leads.css";

const initialLeads = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    car: "BMW X5",
    source: "Website",
    status: "New",
    value: "₹85,00,000",
    date: "Today, 10:42 AM",
    followUp: "Today",
  },
  {
    id: 2,
    name: "Aman Verma",
    email: "aman.verma@email.com",
    phone: "+91 99887 66554",
    car: "Porsche Cayenne",
    source: "Instagram",
    status: "Contacted",
    value: "₹1,28,00,000",
    date: "Today, 09:18 AM",
    followUp: "Tomorrow",
  },
  {
    id: 3,
    name: "Priya Singh",
    email: "priya.singh@email.com",
    phone: "+91 98123 45678",
    car: "Mercedes-Benz GLE",
    source: "Website",
    status: "Qualified",
    value: "₹92,50,000",
    date: "Yesterday",
    followUp: "18 Aug",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    email: "arjun.mehta@email.com",
    phone: "+91 97654 32109",
    car: "Audi Q8",
    source: "Google",
    status: "Negotiation",
    value: "₹1,05,00,000",
    date: "Yesterday",
    followUp: "19 Aug",
  },
  {
    id: 5,
    name: "Neha Kapoor",
    email: "neha.kapoor@email.com",
    phone: "+91 96543 21098",
    car: "Range Rover Velar",
    source: "Referral",
    status: "Won",
    value: "₹89,00,000",
    date: "12 Aug 2026",
    followUp: "Completed",
  },
  {
    id: 6,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 95432 10987",
    car: "BMW X5",
    source: "Facebook",
    status: "Lost",
    value: "₹85,00,000",
    date: "10 Aug 2026",
    followUp: "Closed",
  },
];

const statuses = [
  "All",
  "New",
  "Contacted",
  "Qualified",
  "Negotiation",
  "Won",
  "Lost",
];

const Leads = () => {
  const [leads, setLeads] =
    useState(initialLeads);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedLead, setSelectedLead] =
    useState(null);

  const [openStatusId, setOpenStatusId] =
    useState(null);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchableText = `
        ${lead.name}
        ${lead.email}
        ${lead.phone}
        ${lead.car}
        ${lead.source}
        ${lead.status}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(
          search.toLowerCase()
        );

      const matchesStatus =
        statusFilter === "All" ||
        lead.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [leads, search, statusFilter]);

  const updateStatus = (id, status) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? { ...lead, status }
          : lead
      )
    );

    setOpenStatusId(null);
  };

  const statusClass = (status) =>
    status.toLowerCase().replace(" ", "-");

  return (
    <div className="leads-page">

      {/* HEADER */}

      <header className="leads-header">

        <div>
          <span className="leads-eyebrow">
            MOTORA / CRM / LEADS
          </span>

          <h1>
            Lead management
          </h1>

          <p>
            Track every potential buyer from
            first enquiry to final conversion.
          </p>
        </div>

      </header>


      {/* STATS */}

      <section className="leads-stats">

        <div className="lead-stat">
          <span>TOTAL LEADS</span>
          <strong>{leads.length}</strong>
        </div>

        <div className="lead-stat">
          <span>NEW LEADS</span>
          <strong>
            {
              leads.filter(
                (lead) =>
                  lead.status === "New"
              ).length
            }
          </strong>
        </div>

        <div className="lead-stat">
          <span>QUALIFIED</span>
          <strong>
            {
              leads.filter(
                (lead) =>
                  lead.status === "Qualified"
              ).length
            }
          </strong>
        </div>

        <div className="lead-stat">
          <span>CONVERSION RATE</span>
          <strong>18.6%</strong>
        </div>

      </section>


      {/* PIPELINE */}

      <section className="lead-pipeline">

        <div className="pipeline-header">

          <div>
            <span>SALES PIPELINE</span>
            <h2>Lead journey</h2>
          </div>

          <span className="pipeline-value">
            ₹5.84 Cr potential value
          </span>

        </div>

        <div className="pipeline-steps">

          {[
            "New",
            "Contacted",
            "Qualified",
            "Negotiation",
            "Won",
          ].map((status, index) => {

            const count =
              leads.filter(
                (lead) =>
                  lead.status === status
              ).length;

            return (
              <div
                className="pipeline-step"
                key={status}
              >

                <div className="pipeline-step-top">

                  <span>
                    0{index + 1}
                  </span>

                  <strong>
                    {status}
                  </strong>

                </div>

                <div className="pipeline-progress">

                  <span
                    style={{
                      width: `${Math.max(
                        count * 28,
                        12
                      )}%`,
                    }}
                  />

                </div>

                <small>
                  {count} lead
                  {count !== 1 ? "s" : ""}
                </small>

              </div>
            );
          })}

        </div>

      </section>


      {/* MAIN PANEL */}

      <section className="leads-panel">

        {/* TOOLBAR */}

        <div className="leads-toolbar">

          <div className="leads-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search leads..."
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


          <div className="lead-filters">

            {statuses.map((status) => (
              <button
                key={status}
                className={
                  statusFilter === status
                    ? "lead-filter active"
                    : "lead-filter"
                }
                onClick={() =>
                  setStatusFilter(status)
                }
              >
                {status}
              </button>
            ))}

          </div>

        </div>


        {/* TABLE */}

        <div className="leads-table">

          <div className="leads-table-head">

            <span>LEAD</span>
            <span>VEHICLE</span>
            <span>SOURCE</span>
            <span>VALUE</span>
            <span>STATUS</span>
            <span>FOLLOW-UP</span>
            <span />

          </div>


          {filteredLeads.length === 0 ? (

            <div className="leads-empty">

              <MessageSquare size={30} />

              <strong>
                No leads found
              </strong>

              <span>
                Try another search or filter.
              </span>

            </div>

          ) : (

            filteredLeads.map((lead) => (

              <div
                className="lead-row"
                key={lead.id}
              >

                {/* LEAD */}

                <div className="lead-person">

                  <div className="lead-avatar">
                    {lead.name
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
                      {lead.name}
                    </strong>

                    <span>
                      {lead.date}
                    </span>

                  </div>

                </div>


                {/* VEHICLE */}

                <div className="lead-vehicle">

                  <strong>
                    {lead.car}
                  </strong>

                  <span>
                    Premium enquiry
                  </span>

                </div>


                {/* SOURCE */}

                <span className="lead-source">
                  {lead.source}
                </span>


                {/* VALUE */}

                <strong className="lead-value">
                  {lead.value}
                </strong>


                {/* STATUS */}

                <div className="lead-status-wrapper">

                  <button
                    className={`lead-status ${statusClass(
                      lead.status
                    )}`}
                    onClick={() =>
                      setOpenStatusId(
                        openStatusId ===
                          lead.id
                          ? null
                          : lead.id
                      )
                    }
                  >
                    {lead.status}

                    <ChevronDown size={12} />
                  </button>

                  {openStatusId ===
                    lead.id && (

                    <div className="lead-status-menu">

                      {statuses
                        .filter(
                          (item) =>
                            item !== "All"
                        )
                        .map((status) => (

                          <button
                            key={status}
                            onClick={() =>
                              updateStatus(
                                lead.id,
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


                {/* FOLLOW UP */}

                <div className="lead-followup">

                  <CalendarDays size={13} />

                  <span>
                    {lead.followUp}
                  </span>

                </div>


                {/* VIEW */}

                <button
                  className="lead-view"
                  onClick={() =>
                    setSelectedLead(lead)
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

      <div className="leads-footer">

        <span>
          Showing {filteredLeads.length} of{" "}
          {leads.length} leads
        </span>

        <span>
          MOTORA / CRM SYSTEM
        </span>

      </div>


      {/* DETAIL MODAL */}

      {selectedLead && (

        <div
          className="lead-modal-overlay"
          onClick={() =>
            setSelectedLead(null)
          }
        >

          <div
            className="lead-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="lead-modal-header">

              <div>

                <span>
                  LEAD PROFILE
                </span>

                <h2>
                  {selectedLead.name}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedLead(null)
                }
              >
                <X size={18} />
              </button>

            </div>


            <div className="lead-profile">

              <div className="large-lead-avatar">
                {selectedLead.name
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
                  {selectedLead.name}
                </strong>

                <span>
                  Interested in{" "}
                  {selectedLead.car}
                </span>

              </div>

            </div>


            <div className="lead-detail-grid">

              <div>
                <span>EMAIL</span>
                <strong>
                  {selectedLead.email}
                </strong>
              </div>

              <div>
                <span>PHONE</span>
                <strong>
                  {selectedLead.phone}
                </strong>
              </div>

              <div>
                <span>VEHICLE</span>
                <strong>
                  {selectedLead.car}
                </strong>
              </div>

              <div>
                <span>ESTIMATED VALUE</span>
                <strong>
                  {selectedLead.value}
                </strong>
              </div>

              <div>
                <span>SOURCE</span>
                <strong>
                  {selectedLead.source}
                </strong>
              </div>

              <div>
                <span>FOLLOW-UP</span>
                <strong>
                  {selectedLead.followUp}
                </strong>
              </div>

            </div>


            <div className="lead-contact-actions">

              <a
                href={`tel:${selectedLead.phone}`}
              >
                <Phone size={15} />
                Call
              </a>

              <a
                href={`mailto:${selectedLead.email}`}
              >
                <Mail size={15} />
                Email
              </a>

              <button
                onClick={() =>
                  setSelectedLead(null)
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

export default Leads;