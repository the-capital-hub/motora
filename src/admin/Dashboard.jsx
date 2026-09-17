import {
  ArrowUpRight,
  CalendarDays,
  CarFront,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  MessageSquare,
  Plus,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

import "./Dashboard.css";

const stats = [
  {
    label: "TOTAL CARS",
    value: "128",
    change: "+12.4%",
    icon: CarFront,
  },
  {
    label: "ACTIVE LISTINGS",
    value: "96",
    change: "+8.2%",
    icon: TrendingUp,
  },
  {
    label: "CUSTOMERS",
    value: "842",
    change: "+18.7%",
    icon: Users,
  },
  {
    label: "NEW LEADS",
    value: "24",
    change: "+6.5%",
    icon: MessageSquare,
  },
];

const recentCars = [
  {
    name: "BMW X5",
    year: "2024",
    price: "₹85,00,000",
    status: "Active",
  },
  {
    name: "Mercedes-Benz GLE",
    year: "2023",
    price: "₹92,50,000",
    status: "Active",
  },
  {
    name: "Porsche Cayenne",
    year: "2024",
    price: "₹1,28,00,000",
    status: "Pending",
  },
  {
    name: "Audi Q8",
    year: "2023",
    price: "₹1,05,00,000",
    status: "Active",
  },
];

const enquiries = [
  {
    name: "Rahul Sharma",
    car: "BMW X5",
    type: "Test Drive",
    time: "12 min ago",
  },
  {
    name: "Aman Verma",
    car: "Porsche Cayenne",
    type: "Enquiry",
    time: "34 min ago",
  },
  {
    name: "Priya Singh",
    car: "Mercedes-Benz GLE",
    type: "Purchase",
    time: "1 hr ago",
  },
  {
    name: "Arjun Mehta",
    car: "Audi Q8",
    type: "Test Drive",
    time: "2 hrs ago",
  },
];

const testDrives = [
  {
    name: "Rahul Sharma",
    car: "BMW X5",
    date: "Today",
    time: "04:30 PM",
  },
  {
    name: "Priya Singh",
    car: "Mercedes-Benz GLE",
    date: "Tomorrow",
    time: "11:00 AM",
  },
  {
    name: "Arjun Mehta",
    car: "Audi Q8",
    date: "Tomorrow",
    time: "03:30 PM",
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard">

      {/* =================================
          HEADER
      ================================= */}

      <header className="dashboard-header">

        <div>
          <span className="dashboard-eyebrow">
            MOTORA / ADMIN
          </span>

          <h1>
            Good morning, Admin.
          </h1>

          <p>
            Here's what's happening with your
            automotive business today.
          </p>
        </div>

        <button className="dashboard-add-btn">
          <Plus size={17} />
          Add New Car
        </button>

      </header>


      {/* =================================
          STATS
      ================================= */}

      <section className="dashboard-stats">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              className="dashboard-stat-card"
              key={stat.label}
            >

              <div className="stat-top">

                <span>
                  {stat.label}
                </span>

                <div className="stat-icon">
                  <Icon size={17} />
                </div>

              </div>

              <div className="stat-bottom">

                <strong>
                  {stat.value}
                </strong>

                <span className="stat-change">
                  {stat.change}
                </span>

              </div>

              <div className="stat-line" />

            </div>
          );
        })}

      </section>


      {/* =================================
          MAIN GRID
      ================================= */}

      <section className="dashboard-main-grid">

        {/* INVENTORY OVERVIEW */}

        <div className="dashboard-panel inventory-overview">

          <div className="panel-header">

            <div>
              <span>
                INVENTORY
              </span>

              <h2>
                Inventory overview
              </h2>
            </div>

            <button>
              View inventory
              <ArrowUpRight size={15} />
            </button>

          </div>


          <div className="inventory-chart">

            <div className="inventory-chart-value">
              <strong>
                128
              </strong>

              <span>
                TOTAL VEHICLES
              </span>
            </div>

            <div className="inventory-bars">

              <div
                className="inventory-bar"
                style={{ height: "82%" }}
              />

              <div
                className="inventory-bar"
                style={{ height: "58%" }}
              />

              <div
                className="inventory-bar"
                style={{ height: "72%" }}
              />

              <div
                className="inventory-bar"
                style={{ height: "91%" }}
              />

              <div
                className="inventory-bar"
                style={{ height: "67%" }}
              />

              <div
                className="inventory-bar"
                style={{ height: "84%" }}
              />

              <div
                className="inventory-bar"
                style={{ height: "96%" }}
              />

            </div>

            <div className="inventory-labels">
              <span>JAN</span>
              <span>FEB</span>
              <span>MAR</span>
              <span>APR</span>
              <span>MAY</span>
              <span>JUN</span>
              <span>JUL</span>
            </div>

          </div>

        </div>


        {/* QUICK ACTIONS */}

        <div className="dashboard-panel quick-actions">

          <div className="panel-header">

            <div>
              <span>
                QUICK ACTIONS
              </span>

              <h2>
                Manage faster
              </h2>
            </div>

          </div>


          <button className="quick-action">
            <div>
              <CarFront size={17} />
            </div>

            <span>
              Add new vehicle
            </span>

            <ChevronRight size={15} />
          </button>


          <button className="quick-action">
            <div>
              <Users size={17} />
            </div>

            <span>
              View customers
            </span>

            <ChevronRight size={15} />
          </button>


          <button className="quick-action">
            <div>
              <MessageSquare size={17} />
            </div>

            <span>
              Check new leads
            </span>

            <ChevronRight size={15} />
          </button>


          <button className="quick-action">
            <div>
              <CalendarDays size={17} />
            </div>

            <span>
              Test drive requests
            </span>

            <ChevronRight size={15} />
          </button>

        </div>

      </section>


      {/* =================================
          LOWER GRID
      ================================= */}

      <section className="dashboard-lower-grid">

        {/* RECENT CARS */}

        <div className="dashboard-panel recent-cars">

          <div className="panel-header">

            <div>
              <span>
                INVENTORY
              </span>

              <h2>
                Recently added cars
              </h2>
            </div>

            <button>
              View all
              <ArrowUpRight size={15} />
            </button>

          </div>


          <div className="recent-car-list">

            {recentCars.map((car) => (

              <div
                className="recent-car"
                key={car.name}
              >

                <div className="car-mini-image">
                  <CarFront size={18} />
                </div>

                <div className="recent-car-info">

                  <strong>
                    {car.name}
                  </strong>

                  <span>
                    {car.year}
                  </span>

                </div>

                <strong className="recent-car-price">
                  {car.price}
                </strong>

                <span
                  className={
                    car.status === "Active"
                      ? "status active"
                      : "status pending"
                  }
                >
                  {car.status}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* UPCOMING TEST DRIVES */}

        <div className="dashboard-panel test-drives">

          <div className="panel-header">

            <div>
              <span>
                APPOINTMENTS
              </span>

              <h2>
                Upcoming test drives
              </h2>
            </div>

            <button>
              View all
              <ArrowUpRight size={15} />
            </button>

          </div>


          <div className="test-drive-list">

            {testDrives.map((drive) => (

              <div
                className="test-drive"
                key={`${drive.name}-${drive.time}`}
              >

                <div className="test-drive-date">

                  <CalendarDays size={16} />

                  <span>
                    {drive.date}
                  </span>

                </div>


                <div className="test-drive-info">

                  <strong>
                    {drive.name}
                  </strong>

                  <span>
                    {drive.car}
                  </span>

                </div>


                <div className="test-drive-time">

                  <Clock3 size={14} />

                  {drive.time}

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================
          ENQUIRIES
      ================================= */}

      <section className="dashboard-panel enquiries-panel">

        <div className="panel-header">

          <div>
            <span>
              CUSTOMER ACTIVITY
            </span>

            <h2>
              Recent enquiries
            </h2>
          </div>

          <button>
            View all enquiries
            <ArrowUpRight size={15} />
          </button>

        </div>


        <div className="enquiries-table">

          <div className="enquiry-head">
            <span>CUSTOMER</span>
            <span>VEHICLE</span>
            <span>TYPE</span>
            <span>TIME</span>
            <span />
          </div>


          {enquiries.map((item) => (

            <div
              className="enquiry-row"
              key={`${item.name}-${item.time}`}
            >

              <div className="customer-cell">

                <div className="customer-avatar">
                  {item.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <strong>
                  {item.name}
                </strong>

              </div>

              <span>
                {item.car}
              </span>

              <span className="enquiry-type">
                {item.type}
              </span>

              <span className="enquiry-time">
                {item.time}
              </span>

              <button className="row-arrow">
                <ArrowUpRight size={15} />
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="dashboard-footer">

        <span>
          MOTORA ADMIN SYSTEM
        </span>

        <span>
          LAST UPDATED JUST NOW
        </span>

      </footer>

    </div>
  );
};

export default Dashboard;