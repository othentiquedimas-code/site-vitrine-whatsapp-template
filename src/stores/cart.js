import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import products from '@/data/products.json'

const STORAGE_KEY = 'cart-items'

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  // [{ id, quantity }]
  const items = ref(loadItems())
  const isOpen = ref(false)

  // Lignes détaillées : produit complet + quantité (ignore les produits supprimés du JSON)
  const lines = computed(() =>
    items.value
      .map((item) => {
        const product = products.find((p) => p.id === item.id)
        return product ? { product, quantity: item.quantity } : null
      })
      .filter(Boolean)
  )

  const count = computed(() => lines.value.reduce((n, l) => n + l.quantity, 0))
  const total = computed(() => lines.value.reduce((n, l) => n + l.product.price * l.quantity, 0))

  function add(product, quantity = 1) {
    const existing = items.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ id: product.id, quantity })
    }
  }

  function increment(id) {
    const item = items.value.find((i) => i.id === id)
    if (item) item.quantity += 1
  }

  function decrement(id) {
    const item = items.value.find((i) => i.id === id)
    if (item && item.quantity > 1) item.quantity -= 1
  }

  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function clear() {
    items.value = []
  }

  const open = () => { isOpen.value = true }
  const close = () => { isOpen.value = false }

  // Sauvegarde automatique dans le navigateur
  watch(
    items,
    (value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      } catch {
        // stockage indisponible : on ignore
      }
    },
    { deep: true }
  )

  return { items, isOpen, lines, count, total, add, increment, decrement, remove, clear, open, close }
})