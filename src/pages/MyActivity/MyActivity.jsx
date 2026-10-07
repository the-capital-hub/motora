import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const MyActivity = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [sellRequests, setSellRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadActivity = async () => {
      try {
        setLoading(true);
        setError("");

        const [wishlistData, testDriveData, sellData] =
          await Promise.all([
            api.get("/wishlist"),
            api.get("/requests/mine/test-drives"),
            api.get("/requests/mine/sell-requests"),
          ]);

        setWishlist(wishlistData?.cars || []);

        setTestDrives(testDriveData?.items || []);

        setSellRequests(sellData?.items || []);
      } catch (err) {
        console.error("Failed to load activity:", err);
        setError(
          err.message || "Unable to load your activity."
        );
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div style={{ padding: "120px 30px", textAlign: "center" }}>
        <h2>Loading your activity...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "120px 30px", textAlign: "center" }}>
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "120px 30px 80px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "50px" }}>
        <span>MY MOTORA</span>
        <h1>My Activity</h1>
        <p>
          Manage your saved cars, test drives and sell requests.
        </p>
      </div>

      {/* Wishlist */}

      <section style={{ marginBottom: "50px" }}>
        <h2>Wishlist</h2>

        {wishlist.length === 0 ? (
          <p>No cars saved yet.</p>
        ) : (
          wishlist.map((car) => (
            <div
              key={car._id}
              style={{
                padding: "20px",
                marginTop: "15px",
                border: "1px solid #ddd",
              }}
            >
              <strong>
                {car.brand} {car.model}
              </strong>

              <p>
                {car.year} · {car.location}
              </p>
            </div>
          ))
        )}
      </section>

      {/* Test Drives */}

      <section style={{ marginBottom: "50px" }}>
        <h2>Test Drive Requests</h2>

        {testDrives.length === 0 ? (
          <p>No test drive requests yet.</p>
        ) : (
          testDrives.map((item) => (
            <div
              key={item._id}
              style={{
                padding: "20px",
                marginTop: "15px",
                border: "1px solid #ddd",
              }}
            >
              <strong>
                {item.car?.brand} {item.car?.model}
              </strong>

              <p>
                Date: {item.date}
              </p>

              <p>
                Time: {item.time || "Not specified"}
              </p>

              <p>
                Status: {item.status}
              </p>
            </div>
          ))
        )}
      </section>

      {/* Sell Requests */}

      <section>
        <h2>Sell Car Requests</h2>

        {sellRequests.length === 0 ? (
          <p>No sell requests yet.</p>
        ) : (
          sellRequests.map((item) => (
            <div
              key={item._id}
              style={{
                padding: "20px",
                marginTop: "15px",
                border: "1px solid #ddd",
              }}
            >
              <strong>
                {item.brand} {item.model}
              </strong>

              <p>
                Year: {item.year}
              </p>

              <p>
                Expected Price: ₹
                {Number(item.expectedPrice || 0).toLocaleString(
                  "en-IN"
                )}
              </p>

              <p>
                Status: {item.status}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default MyActivity;