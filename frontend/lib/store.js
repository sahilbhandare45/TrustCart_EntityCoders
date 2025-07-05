// lib/store.js
"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// === Zustand Cart Store ===
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (newItem) => {
        const items = get().items
        const existing = items.find((item) => item.id === newItem.id)

        const updatedItems = existing
          ? items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            )
          : [...items, newItem]

        const total = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )

        set({ items: updatedItems, total })
      },
      updateQuantity: (id, quantity) => {
        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
        const total = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        set({ items: updatedItems, total })
      },
      removeItem: (id) => {
        const updatedItems = get().items.filter((item) => item.id !== id)
        const total = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        set({ items: updatedItems, total })
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
)

// === Zustand Wishlist Store ===
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const exists = get().items.some((item) => item.id === newItem.id)
        if (!exists) {
          set({ items: [...get().items, newItem] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      isInWishlist: (id) => get().items.some((item) => item.id === id),
    }),
    {
      name: "wishlist-storage",
    }
  )
)
