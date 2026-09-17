import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CarFront,
  Check,
  ChevronDown,
  Edit3,
  Fuel,
  Gauge,
  Plus,
  Search,
  Settings2,
  Star,
  Trash2,
  X,
} from "lucide-react";

import "./Inventory.css";

const initialCars = [
  {
    id: 1,
    name: "BMW X5",
    variant: "xDrive40i M Sport",
    year: 2023,
    price: "₹82,00,000",
    priceValue: 8200000,
    km: "18,400 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "New Delhi",
    status: "Available",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Mercedes-Benz GLE",
    variant: "300d 4MATIC",
    year: 2022,
    price: "₹74,50,000",
    priceValue: 7450000,
    km: "24,100 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Gurugram",
    status: "Available",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Porsche Cayenne",
    variant: "Platinum Edition",
    year: 2021,
    price: "₹96,00,000",
    priceValue: 9600000,
    km: "31,700 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "New Delhi",
    status: "Reserved",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Audi Q8",
    variant: "55 TFSI Quattro",
    year: 2022,
    price: "₹89,00,000",
    priceValue: 8900000,
    km: "22,500 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Noida",
    status: "Available",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Range Rover Velar",
    variant: "R-Dynamic SE",
    year: 2022,
    price: "₹78,00,000",
    priceValue: 7800000,
    km: "27,900 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Faridabad",
    status: "Sold",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "BMW 3 Series",
    variant: "330i M Sport",
    year: 2021,
    price: "₹48,00,000",
    priceValue: 4800000,
    km: "32,400 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "New Delhi",
    status: "Available",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=85",
  },
];

const statusFilters = [
  "All",
  "Available",
  "Reserved",
  "Sold",
];

const Inventory = () => {
  const [cars, setCars] =
    useState(initialCars);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedCar, setSelectedCar] =
    useState(null);

  const [isAddOpen, setIsAddOpen] =
    useState(false);

  const [editingCar, setEditingCar] =
    useState(null);

  const [deleteCar, setDeleteCar] =
    useState(null);

  const [sortBy, setSortBy] =
    useState("Newest");

  const [showSortMenu, setShowSortMenu] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    variant: "",
    year: "",
    price: "",
    km: "",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "New Delhi",
    status: "Available",
    featured: false,
    image: "",
  });

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const searchableText = `
        ${car.name}
        ${car.variant}
        ${car.year}
        ${car.location}
        ${car.fuel}
        ${car.status}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(
          search.toLowerCase()
        );

      const matchesStatus =
        statusFilter === "All" ||
        car.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

    if (sortBy === "Price Low") {
      result.sort(
        (a, b) =>
          a.priceValue -
          b.priceValue
      );
    }

    if (sortBy === "Price High") {
      result.sort(
        (a, b) =>
          b.priceValue -
          a.priceValue
      );
    }

    if (sortBy === "Newest") {
      result.sort(
        (a, b) =>
          b.year - a.year
      );
    }

    return result;
  }, [
    cars,
    search,
    statusFilter,
    sortBy,
  ]);

  const resetForm = () => {
    setForm({
      name: "",
      variant: "",
      year: "",
      price: "",
      km: "",
      fuel: "Petrol",
      transmission: "Automatic",
      location: "New Delhi",
      status: "Available",
      featured: false,
      image: "",
    });
  };

  const openAddModal = () => {
    resetForm();
    setEditingCar(null);
    setIsAddOpen(true);
  };

  const openEditModal = (car) => {
    setForm({
      name: car.name,
      variant: car.variant,
      year: car.year,
      price: car.priceValue,
      km: car.km.replace(
        " km",
        ""
      ),
      fuel: car.fuel,
      transmission: car.transmission,
      location: car.location,
      status: car.status,
      featured: car.featured,
      image: car.image,
    });

    setEditingCar(car);
    setIsAddOpen(true);
  };

  const handleFormChange = (
    e
  ) => {
    const { name, value, type, checked } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const saveCar = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.variant ||
      !form.year ||
      !form.price
    ) {
      return;
    }

    const priceNumber =
      Number(form.price);

    const carData = {
      id: editingCar
        ? editingCar.id
        : Date.now(),
      name: form.name,
      variant: form.variant,
      year: Number(form.year),
      price:
        `₹${priceNumber.toLocaleString(
          "en-IN"
        )}`,
      priceValue: priceNumber,
      km: `${form.km || 0} km`,
      fuel: form.fuel,
      transmission:
        form.transmission,
      location: form.location,
      status: form.status,
      featured: form.featured,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85",
    };

    if (editingCar) {
      setCars((prev) =>
        prev.map((car) =>
          car.id === editingCar.id
            ? carData
            : car
        )
      );
    } else {
      setCars((prev) => [
        carData,
        ...prev,
      ]);
    }

    setIsAddOpen(false);
    setEditingCar(null);
    resetForm();
  };

  const toggleFeatured = (
    id
  ) => {
    setCars((prev) =>
      prev.map((car) =>
        car.id === id
          ? {
              ...car,
              featured:
                !car.featured,
            }
          : car
      )
    );
  };

  const changeStatus = (
    id,
    status
  ) => {
    setCars((prev) =>
      prev.map((car) =>
        car.id === id
          ? {
              ...car,
              status,
            }
          : car
      )
    );
  };

  const confirmDelete = () => {
    if (!deleteCar) return;

    setCars((prev) =>
      prev.filter(
        (car) =>
          car.id !== deleteCar.id
      )
    );

    setDeleteCar(null);
    setSelectedCar(null);
  };

  const getStatusClass = (
    status
  ) =>
    status.toLowerCase();

  return (
    <div className="inventory-page">

      {/* HEADER */}

      <header className="inventory-header">

        <div>

          <span className="inventory-eyebrow">
            MOTORA / INVENTORY MANAGEMENT
          </span>

          <h1>
            Inventory
          </h1>

          <p>
            Manage every premium vehicle
            across your dealership.
          </p>

        </div>


        <button
          className="inventory-add-btn"
          onClick={openAddModal}
        >
          <Plus size={15} />
          Add vehicle
        </button>

      </header>


      {/* STATS */}

      <section className="inventory-stats">

        <div className="inventory-stat">

          <span>
            TOTAL VEHICLES
          </span>

          <strong>
            {cars.length}
          </strong>

          <small>
            Across all locations
          </small>

        </div>


        <div className="inventory-stat">

          <span>
            AVAILABLE
          </span>

          <strong>
            {
              cars.filter(
                (car) =>
                  car.status ===
                  "Available"
              ).length
            }
          </strong>

          <small>
            Ready for customers
          </small>

        </div>


        <div className="inventory-stat">

          <span>
            FEATURED
          </span>

          <strong>
            {
              cars.filter(
                (car) =>
                  car.featured
              ).length
            }
          </strong>

          <small>
            Homepage vehicles
          </small>

        </div>


        <div className="inventory-stat">

          <span>
            INVENTORY VALUE
          </span>

          <strong>
            ₹4.67 Cr
          </strong>

          <small>
            Current vehicle value
          </small>

        </div>

      </section>


      {/* FEATURED STRIP */}

      <section className="inventory-featured">

        <div className="inventory-featured-heading">

          <div>

            <span>
              PREMIUM COLLECTION
            </span>

            <h2>
              Featured vehicles
            </h2>

          </div>

          <Star size={17} />

        </div>


        <div className="inventory-featured-cars">

          {cars
            .filter(
              (car) =>
                car.featured
            )
            .slice(0, 3)
            .map((car) => (

              <div
                className="inventory-featured-card"
                key={car.id}
              >

                <img
                  src={car.image}
                  alt={car.name}
                />

                <div className="featured-card-overlay">

                  <div>

                    <span>
                      {car.year}
                    </span>

                    <strong>
                      {car.name}
                    </strong>

                  </div>

                  <strong>
                    {car.price}
                  </strong>

                </div>

              </div>

            ))}

        </div>

      </section>


      {/* MAIN PANEL */}

      <section className="inventory-panel">

        {/* TOOLBAR */}

        <div className="inventory-toolbar">

          <div className="inventory-search">

            <Search size={15} />

            <input
              type="text"
              placeholder="Search vehicles..."
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


          <div className="inventory-controls">

            <div className="inventory-filters">

              {statusFilters.map(
                (filter) => (

                  <button
                    key={filter}
                    className={
                      statusFilter ===
                      filter
                        ? "inventory-filter active"
                        : "inventory-filter"
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


            <div className="inventory-sort">

              <button
                onClick={() =>
                  setShowSortMenu(
                    !showSortMenu
                  )
                }
              >
                <Settings2
                  size={13}
                />

                {sortBy}

                <ChevronDown
                  size={12}
                />

              </button>


              {showSortMenu && (

                <div className="inventory-sort-menu">

                  {[
                    "Newest",
                    "Price Low",
                    "Price High",
                  ].map(
                    (sort) => (

                      <button
                        key={sort}
                        onClick={() => {
                          setSortBy(
                            sort
                          );
                          setShowSortMenu(
                            false
                          );
                        }}
                      >
                        {sort}

                        {sortBy ===
                          sort && (
                          <Check
                            size={12}
                          />
                        )}

                      </button>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>


        {/* GRID */}

        <div className="inventory-grid">

          {filteredCars.length ===
          0 ? (

            <div className="inventory-empty">

              <CarFront size={32} />

              <strong>
                No vehicles found
              </strong>

              <span>
                Try another search
                or filter.
              </span>

            </div>

          ) : (

            filteredCars.map(
              (car) => (

                <article
                  className="inventory-card"
                  key={car.id}
                >

                  {/* IMAGE */}

                  <div className="inventory-image">

                    <img
                      src={car.image}
                      alt={car.name}
                    />

                    <div className="inventory-image-top">

                      <span
                        className={`inventory-status ${getStatusClass(
                          car.status
                        )}`}
                      >
                        {car.status}
                      </span>


                      <button
                        className={
                          car.featured
                            ? "inventory-star active"
                            : "inventory-star"
                        }
                        onClick={() =>
                          toggleFeatured(
                            car.id
                          )
                        }
                      >
                        <Star
                          size={14}
                          fill={
                            car.featured
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                    </div>


                    <div className="inventory-image-bottom">

                      <span>
                        {car.year}
                      </span>

                      <span>
                        {car.location}
                      </span>

                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="inventory-card-content">

                    <div className="inventory-card-title">

                      <div>

                        <span>
                          {car.variant}
                        </span>

                        <h3>
                          {car.name}
                        </h3>

                      </div>

                      <strong>
                        {car.price}
                      </strong>

                    </div>


                    <div className="inventory-specs">

                      <div>

                        <Gauge
                          size={13}
                        />

                        <span>
                          {car.km}
                        </span>

                      </div>


                      <div>

                        <Fuel
                          size={13}
                        />

                        <span>
                          {car.fuel}
                        </span>

                      </div>


                      <div>

                        <Settings2
                          size={13}
                        />

                        <span>
                          {car.transmission}
                        </span>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="inventory-card-actions">

                      <button
                        onClick={() =>
                          setSelectedCar(
                            car
                          )
                        }
                      >
                        View details
                        <ArrowUpRight
                          size={13}
                        />
                      </button>

                      <button
                        onClick={() =>
                          openEditModal(
                            car
                          )
                        }
                      >
                        <Edit3
                          size={13}
                        />
                      </button>

                      <button
                        className="delete"
                        onClick={() =>
                          setDeleteCar(
                            car
                          )
                        }
                      >
                        <Trash2
                          size={13}
                        />
                      </button>

                    </div>

                  </div>

                </article>

              )
            )

          )}

        </div>

      </section>


      {/* FOOTER */}

      <div className="inventory-footer">

        <span>
          Showing {filteredCars.length} of{" "}
          {cars.length} vehicles
        </span>

        <span>
          MOTORA / INVENTORY SYSTEM
        </span>

      </div>


      {/* =====================================
          ADD / EDIT MODAL
      ===================================== */}

      {isAddOpen && (

        <div
          className="inventory-modal-overlay"
          onClick={() =>
            setIsAddOpen(false)
          }
        >

          <form
            className="inventory-form-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
            onSubmit={saveCar}
          >

            <div className="inventory-modal-header">

              <div>

                <span>
                  {editingCar
                    ? "EDIT VEHICLE"
                    : "NEW VEHICLE"}
                </span>

                <h2>
                  {editingCar
                    ? "Update vehicle"
                    : "Add vehicle"}
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setIsAddOpen(false)
                }
              >
                <X size={18} />
              </button>

            </div>


            <div className="inventory-form-grid">

              <label>

                <span>
                  VEHICLE NAME
                </span>

                <input
                  name="name"
                  value={form.name}
                  onChange={
                    handleFormChange
                  }
                  placeholder="BMW X5"
                />

              </label>


              <label>

                <span>
                  VARIANT
                </span>

                <input
                  name="variant"
                  value={form.variant}
                  onChange={
                    handleFormChange
                  }
                  placeholder="xDrive40i M Sport"
                />

              </label>


              <label>

                <span>
                  YEAR
                </span>

                <input
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={
                    handleFormChange
                  }
                  placeholder="2023"
                />

              </label>


              <label>

                <span>
                  PRICE
                </span>

                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={
                    handleFormChange
                  }
                  placeholder="8200000"
                />

              </label>


              <label>

                <span>
                  KILOMETERS
                </span>

                <input
                  name="km"
                  type="number"
                  value={form.km}
                  onChange={
                    handleFormChange
                  }
                  placeholder="18400"
                />

              </label>


              <label>

                <span>
                  FUEL
                </span>

                <select
                  name="fuel"
                  value={form.fuel}
                  onChange={
                    handleFormChange
                  }
                >
                  <option>
                    Petrol
                  </option>

                  <option>
                    Diesel
                  </option>

                  <option>
                    Hybrid
                  </option>

                  <option>
                    Electric
                  </option>
                </select>

              </label>


              <label>

                <span>
                  TRANSMISSION
                </span>

                <select
                  name="transmission"
                  value={
                    form.transmission
                  }
                  onChange={
                    handleFormChange
                  }
                >
                  <option>
                    Automatic
                  </option>

                  <option>
                    Manual
                  </option>
                </select>

              </label>


              <label>

                <span>
                  LOCATION
                </span>

                <select
                  name="location"
                  value={form.location}
                  onChange={
                    handleFormChange
                  }
                >
                  <option>
                    New Delhi
                  </option>

                  <option>
                    Gurugram
                  </option>

                  <option>
                    Noida
                  </option>

                  <option>
                    Faridabad
                  </option>

                  <option>
                    Ghaziabad
                  </option>
                </select>

              </label>


              <label>

                <span>
                  STATUS
                </span>

                <select
                  name="status"
                  value={form.status}
                  onChange={
                    handleFormChange
                  }
                >
                  <option>
                    Available
                  </option>

                  <option>
                    Reserved
                  </option>

                  <option>
                    Sold
                  </option>
                </select>

              </label>


              <label className="inventory-image-field">

                <span>
                  IMAGE URL
                </span>

                <input
                  name="image"
                  value={form.image}
                  onChange={
                    handleFormChange
                  }
                  placeholder="https://..."
                />

              </label>

            </div>


            <label className="inventory-featured-checkbox">

              <input
                name="featured"
                type="checkbox"
                checked={
                  form.featured
                }
                onChange={
                  handleFormChange
                }
              />

              <span>
                Mark as featured vehicle
              </span>

            </label>


            <div className="inventory-form-actions">

              <button
                type="button"
                onClick={() =>
                  setIsAddOpen(false)
                }
              >
                Cancel
              </button>

              <button type="submit">
                <Check size={14} />
                {editingCar
                  ? "Update vehicle"
                  : "Add vehicle"}
              </button>

            </div>

          </form>

        </div>

      )}


      {/* =====================================
          DETAIL MODAL
      ===================================== */}

      {selectedCar && (

        <div
          className="inventory-modal-overlay"
          onClick={() =>
            setSelectedCar(null)
          }
        >

          <div
            className="inventory-detail-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="inventory-detail-image">

              <img
                src={selectedCar.image}
                alt={selectedCar.name}
              />

              <button
                onClick={() =>
                  setSelectedCar(null)
                }
              >
                <X size={17} />
              </button>

              <div>

                <span>
                  {selectedCar.status}
                </span>

                {selectedCar.featured && (
                  <span>
                    <Star
                      size={10}
                      fill="currentColor"
                    />
                    Featured
                  </span>
                )}

              </div>

            </div>


            <div className="inventory-detail-content">

              <div className="inventory-detail-heading">

                <div>

                  <span>
                    {selectedCar.variant}
                  </span>

                  <h2>
                    {selectedCar.name}
                  </h2>

                </div>

                <strong>
                  {selectedCar.price}
                </strong>

              </div>


              <div className="inventory-detail-specs">

                <div>

                  <Gauge size={14} />

                  <span>
                    {selectedCar.km}
                  </span>

                </div>


                <div>

                  <Fuel size={14} />

                  <span>
                    {selectedCar.fuel}
                  </span>

                </div>


                <div>

                  <Settings2 size={14} />

                  <span>
                    {selectedCar.transmission}
                  </span>

                </div>

              </div>


              <div className="inventory-detail-info">

                <div>

                  <span>
                    YEAR
                  </span>

                  <strong>
                    {selectedCar.year}
                  </strong>

                </div>


                <div>

                  <span>
                    LOCATION
                  </span>

                  <strong>
                    {selectedCar.location}
                  </strong>

                </div>


                <div>

                  <span>
                    STATUS
                  </span>

                  <strong>
                    {selectedCar.status}
                  </strong>

                </div>

              </div>


              <div className="inventory-status-change">

                <span>
                  CHANGE STATUS
                </span>

                <div>

                  {[
                    "Available",
                    "Reserved",
                    "Sold",
                  ].map(
                    (status) => (

                      <button
                        key={status}
                        className={
                          selectedCar.status ===
                          status
                            ? "selected"
                            : ""
                        }
                        onClick={() => {
                          changeStatus(
                            selectedCar.id,
                            status
                          );

                          setSelectedCar(
                            {
                              ...selectedCar,
                              status,
                            }
                          );
                        }}
                      >
                        {status}
                      </button>

                    )
                  )}

                </div>

              </div>


              <div className="inventory-detail-actions">

                <button
                  onClick={() => {
                    openEditModal(
                      selectedCar
                    );
                    setSelectedCar(
                      null
                    );
                  }}
                >
                  <Edit3 size={14} />
                  Edit vehicle
                </button>


                <button
                  className="delete"
                  onClick={() =>
                    setDeleteCar(
                      selectedCar
                    )
                  }
                >
                  <Trash2 size={14} />
                  Delete
                </button>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          DELETE CONFIRMATION
      ===================================== */}

      {deleteCar && (

        <div className="inventory-delete-overlay">

          <div className="inventory-delete-modal">

            <div className="delete-icon">
              <Trash2 size={20} />
            </div>

            <span>
              DELETE VEHICLE
            </span>

            <h2>
              Remove {deleteCar.name}?
            </h2>

            <p>
              This action will remove the
              vehicle from your inventory.
              This cannot be undone.
            </p>

            <div>

              <button
                onClick={() =>
                  setDeleteCar(null)
                }
              >
                Cancel
              </button>

              <button
                className="delete"
                onClick={confirmDelete}
              >
                Delete vehicle
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Inventory;