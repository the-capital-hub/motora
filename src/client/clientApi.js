import api from "../api/client";

export const clientApi = {
  me: () => api.get("/client/me"),
  updateProfile: (body) => api.patch("/client/me", body),

  wishlist: () => api.get("/wishlist"),
  removeWishlist: (carId) => api.delete(`/wishlist/${carId}`),

  appointments: () => api.get("/requests/mine/test-drives"),
  sellRequests: () => api.get("/requests/mine/sell-requests"),
  enquiries: () => api.get("/requests/mine/leads"),
};
