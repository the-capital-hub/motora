import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CarFront,
  ChevronDown,
  CircleDollarSign,
  Download,
  MousePointerClick,
  Users,
} from "lucide-react";

import "./Analytics.css";

const monthlyData = [
  { month: "Jan", leads: 42, sales: 8 },
  { month: "Feb", leads: 55, sales: 10 },
  { month: "Mar", leads: 61, sales: 12 },
  { month: "Apr", leads: 48, sales: 9 },
  { month: "May", leads: 72, sales: 15 },
  { month: "Jun", leads: 68, sales: 13 },
  { month: "Jul", leads: 91, sales: 19 },
  { month: "Aug", leads: 84, sales: 17 },
];

const Analytics = () => {
  const maxLeads = Math.max(
    ...monthlyData.map((item) => item.leads)
  );

  return (
    <div className="analytics-page">

      {/* HEADER */}

      <header className="analytics-header">

        <div>
          <span className="analytics-eyebrow">
            MOTORA / BUSINESS INTELLIGENCE
          </span>

          <h1>
            Analytics
          </h1>

          <p>
            Understand your dealership performance,
            customer demand and sales growth.
          </p>
        </div>


        <div className="analytics-header-actions">

          <button className="analytics-date">
            <CalendarDays size={14} />
            Last 30 days
            <ChevronDown size={13} />
          </button>

          <button className="analytics-export">
            <Download size={14} />
            Export
          </button>

        </div>

      </header>


      {/* KPI CARDS */}

      <section className="analytics-kpis">

        <div className="analytics-kpi">

          <div className="analytics-kpi-top">

            <span>
              TOTAL REVENUE
            </span>

            <div className="analytics-kpi-icon">
              <CircleDollarSign size={16} />
            </div>

          </div>

          <strong>
            ₹8.42 Cr
          </strong>

          <div className="analytics-kpi-growth positive">
            <ArrowUpRight size={12} />
            18.6%
            <span>
              vs last month
            </span>
          </div>

        </div>


        <div className="analytics-kpi">

          <div className="analytics-kpi-top">

            <span>
              TOTAL LEADS
            </span>

            <div className="analytics-kpi-icon">
              <Users size={16} />
            </div>

          </div>

          <strong>
            521
          </strong>

          <div className="analytics-kpi-growth positive">
            <ArrowUpRight size={12} />
            12.4%
            <span>
              vs last month
            </span>
          </div>

        </div>


        <div className="analytics-kpi">

          <div className="analytics-kpi-top">

            <span>
              VEHICLES SOLD
            </span>

            <div className="analytics-kpi-icon">
              <CarFront size={16} />
            </div>

          </div>

          <strong>
            103
          </strong>

          <div className="analytics-kpi-growth positive">
            <ArrowUpRight size={12} />
            9.8%
            <span>
              vs last month
            </span>
          </div>

        </div>


        <div className="analytics-kpi">

          <div className="analytics-kpi-top">

            <span>
              CONVERSION RATE
            </span>

            <div className="analytics-kpi-icon">
              <MousePointerClick size={16} />
            </div>

          </div>

          <strong>
            19.7%
          </strong>

          <div className="analytics-kpi-growth negative">
            <ArrowDownRight size={12} />
            2.1%
            <span>
              vs last month
            </span>
          </div>

        </div>

      </section>


      {/* CHART ROW */}

      <section className="analytics-chart-grid">

        {/* LEAD PERFORMANCE */}

        <div className="analytics-card lead-chart-card">

          <div className="analytics-card-header">

            <div>

              <span>
                LEAD PERFORMANCE
              </span>

              <h2>
                Lead generation
              </h2>

            </div>

            <BarChart3 size={17} />

          </div>


          <div className="chart-summary">

            <div>

              <strong>
                521
              </strong>

              <span>
                Total leads
              </span>

            </div>

            <div>

              <strong>
                +12.4%
              </strong>

              <span>
                Growth
              </span>

            </div>

          </div>


          <div className="bar-chart">

            {monthlyData.map(
              (item) => {

                const height =
                  (item.leads /
                    maxLeads) *
                  100;

                return (
                  <div
                    className="bar-column"
                    key={item.month}
                  >

                    <div className="bar-value">
                      {item.leads}
                    </div>

                    <div className="bar-track">

                      <div
                        className="bar-fill"
                        style={{
                          height: `${height}%`,
                        }}
                      />

                    </div>

                    <span>
                      {item.month}
                    </span>

                  </div>
                );
              }
            )}

          </div>

        </div>


        {/* SALES */}

        <div className="analytics-card sales-chart-card">

          <div className="analytics-card-header">

            <div>

              <span>
                SALES PERFORMANCE
              </span>

              <h2>
                Vehicles sold
              </h2>

            </div>

            <Activity size={17} />

          </div>


          <div className="sales-chart">

            <svg
              viewBox="0 0 500 220"
              preserveAspectRatio="none"
            >

              <defs>

                <linearGradient
                  id="salesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#050505"
                    stopOpacity="0.18"
                  />

                  <stop
                    offset="100%"
                    stopColor="#050505"
                    stopOpacity="0"
                  />

                </linearGradient>

              </defs>


              <path
                className="sales-area"
                d="
                  M0 175
                  L70 150
                  L140 158
                  L210 125
                  L280 140
                  L350 82
                  L420 100
                  L500 45
                  L500 220
                  L0 220
                  Z
                "
              />


              <path
                className="sales-line"
                d="
                  M0 175
                  L70 150
                  L140 158
                  L210 125
                  L280 140
                  L350 82
                  L420 100
                  L500 45
                "
              />


              <circle
                cx="500"
                cy="45"
                r="5"
                className="sales-dot"
              />

            </svg>


            <div className="sales-labels">

              {monthlyData.map(
                (item) => (
                  <span key={item.month}>
                    {item.month}
                  </span>
                )
              )}

            </div>

          </div>


          <div className="sales-bottom">

            <div>

              <strong>
                103
              </strong>

              <span>
                Vehicles sold
              </span>

            </div>

            <div>

              <strong>
                ₹8.42 Cr
              </strong>

              <span>
                Revenue
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* SECOND ROW */}

      <section className="analytics-bottom-grid">

        {/* TOP VEHICLES */}

        <div className="analytics-card">

          <div className="analytics-card-header">

            <div>

              <span>
                INVENTORY
              </span>

              <h2>
                Best performing vehicles
              </h2>

            </div>

            <CarFront size={17} />

          </div>


          <div className="vehicle-performance">

            <div className="vehicle-performance-row">

              <div className="vehicle-rank">
                01
              </div>

              <div className="vehicle-name">

                <strong>
                  BMW X5
                </strong>

                <span>
                  18 enquiries
                </span>

              </div>

              <div className="vehicle-performance-bar">

                <span
                  style={{
                    width: "92%",
                  }}
                />

              </div>

              <strong>
                24%
              </strong>

            </div>


            <div className="vehicle-performance-row">

              <div className="vehicle-rank">
                02
              </div>

              <div className="vehicle-name">

                <strong>
                  Mercedes-Benz GLE
                </strong>

                <span>
                  15 enquiries
                </span>

              </div>

              <div className="vehicle-performance-bar">

                <span
                  style={{
                    width: "78%",
                  }}
                />

              </div>

              <strong>
                20%
              </strong>

            </div>


            <div className="vehicle-performance-row">

              <div className="vehicle-rank">
                03
              </div>

              <div className="vehicle-name">

                <strong>
                  Porsche Cayenne
                </strong>

                <span>
                  13 enquiries
                </span>

              </div>

              <div className="vehicle-performance-bar">

                <span
                  style={{
                    width: "69%",
                  }}
                />

              </div>

              <strong>
                18%
              </strong>

            </div>


            <div className="vehicle-performance-row">

              <div className="vehicle-rank">
                04
              </div>

              <div className="vehicle-name">

                <strong>
                  Audi Q8
                </strong>

                <span>
                  11 enquiries
                </span>

              </div>

              <div className="vehicle-performance-bar">

                <span
                  style={{
                    width: "57%",
                  }}
                />

              </div>

              <strong>
                15%
              </strong>

            </div>


            <div className="vehicle-performance-row">

              <div className="vehicle-rank">
                05
              </div>

              <div className="vehicle-name">

                <strong>
                  Range Rover Velar
                </strong>

                <span>
                  9 enquiries
                </span>

              </div>

              <div className="vehicle-performance-bar">

                <span
                  style={{
                    width: "44%",
                  }}
                />

              </div>

              <strong>
                12%
              </strong>

            </div>

          </div>

        </div>


        {/* LEAD SOURCES */}

        <div className="analytics-card">

          <div className="analytics-card-header">

            <div>

              <span>
                ACQUISITION
              </span>

              <h2>
                Lead sources
              </h2>

            </div>

            <Users size={17} />

          </div>


          <div className="source-chart">

            <div className="donut-chart">

              <div className="donut-inner">

                <strong>
                  521
                </strong>

                <span>
                  Leads
                </span>

              </div>

            </div>


            <div className="source-list">

              <div>

                <span className="source-dot website" />

                <span>
                  Website
                </span>

                <strong>
                  38%
                </strong>

              </div>

              <div>

                <span className="source-dot instagram" />

                <span>
                  Instagram
                </span>

                <strong>
                  24%
                </strong>

              </div>

              <div>

                <span className="source-dot google" />

                <span>
                  Google
                </span>

                <strong>
                  18%
                </strong>

              </div>

              <div>

                <span className="source-dot referral" />

                <span>
                  Referral
                </span>

                <strong>
                  12%
                </strong>

              </div>

              <div>

                <span className="source-dot other" />

                <span>
                  Other
                </span>

                <strong>
                  8%
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* INSIGHTS */}

      <section className="analytics-insights">

        <div className="analytics-insight-icon">
          <Activity size={18} />
        </div>

        <div>

          <span>
            MOTORA AI INSIGHT
          </span>

          <h3>
            Demand for premium SUVs is
            increasing.
          </h3>

          <p>
            BMW X5 and Mercedes-Benz GLE
            generated 31% of all vehicle
            enquiries this month. Consider
            increasing inventory in this segment.
          </p>

        </div>

        <button>
          View insight
          <ArrowUpRight size={14} />
        </button>

      </section>

    </div>
  );
};

export default Analytics;