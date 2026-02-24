/**
 * 购物车状态管理
 */
import { create } from 'zustand'

interface CartState {
  selectedIds: number[]
  toggleSelect: (id: number) => void
  selectAll: (ids: number[]) => void
  clearSelected: () => void
  isSelected: (id: number) => boolean
}

export const useCartStore = create<CartState>((set, get) => ({
  selectedIds: [],
  
  toggleSelect: (id) => {
    set((state) => {
      const selectedIds = state.selectedIds.includes(id)
        ? state.selectedIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedIds, id]
      return { selectedIds }
    })
  },
  
  selectAll: (ids) => {
    set({ selectedIds: ids })
  },
  
  clearSelected: () => {
    set({ selectedIds: [] })
  },
  
  isSelected: (id) => {
    return get().selectedIds.includes(id)
  },
}))
