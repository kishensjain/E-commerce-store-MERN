import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const items = get().items;

        const existing = items.find((item) => item._id === product._id);

        if (existing) {
          set({
            items: items.map((item) =>
              item._id === product._id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item,
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                ...product,
                quantity: 1,
              },
            ],
          });
        }
      },

      removeFromCart: (id) =>
        set({
          items: get().items.filter((item) => item._id !== id),
        }),

      clearCart: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
