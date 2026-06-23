"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface FavoriteVendor {
  id: string
  name: string
  category: string
  type: string
  price: string
  image: string
}

interface FavoritesContextType {
  favorites: FavoriteVendor[]
  addFavorite: (vendor: FavoriteVendor) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteVendor[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nexus_guest_favorites')
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Error loading favorites from local storage", error)
    }
  }, [])

  const saveFavorites = (newFavorites: FavoriteVendor[]) => {
    setFavorites(newFavorites)
    try {
      localStorage.setItem('nexus_guest_favorites', JSON.stringify(newFavorites))
    } catch (error) {
      console.error("Error saving favorites to local storage", error)
    }
  }

  const addFavorite = (vendor: FavoriteVendor) => {
    if (!favorites.some(f => f.id === vendor.id)) {
      saveFavorites([...favorites, vendor])
    }
  }

  const removeFavorite = (id: string) => {
    saveFavorites(favorites.filter(f => f.id !== id))
  }

  const isFavorite = (id: string) => {
    return favorites.some(f => f.id === id)
  }

  const clearFavorites = () => {
    saveFavorites([])
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
