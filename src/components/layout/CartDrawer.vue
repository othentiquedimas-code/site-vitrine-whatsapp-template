<template>
  <!-- Fond sombre -->
  <transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="cart.isOpen" class="fixed inset-0 z-[60] bg-ink/40" @click="cart.close()"></div>
  </transition>

  <!-- Panneau latéral -->
  <transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-200 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <aside
      v-if="cart.isOpen"
      class="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-cream shadow-2xl flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Panier"
    >
      <!-- En-tête -->
      <div class="flex items-center justify-between px-6 h-16 border-b border-ink/10 shrink-0">
        <h2 class="font-serif text-xl font-bold text-ink">Votre panier</h2>
        <button @click="cart.close()" class="p-2 -mr-2 text-ink/60 hover:text-ink transition" aria-label="Fermer le panier">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Panier vide -->
      <div v-if="!cart.lines.length" class="flex-1 flex flex-col items-center justify-center text-center px-6">
        <p class="text-ink/60">Votre panier est vide.</p>
        <router-link to="/produits" @click="cart.close()" class="mt-4 text-sm font-medium text-brand underline">
          Découvrir les produits
        </router-link>
      </div>

      <!-- Articles + pied -->
      <template v-else>
        <ul class="flex-1 overflow-y-auto divide-y divide-ink/10 px-6">
          <li v-for="line in cart.lines" :key="line.product.id" class="py-5 flex gap-4">
            <router-link
              :to="`/produits/${line.product.slug}`"
              @click="cart.close()"
              class="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-sage/30"
            >
              <img :src="line.product.images[0]" :alt="line.product.name" class="w-full h-full object-cover" />
            </router-link>

            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-3">
                <p class="min-w-0 font-medium text-ink truncate">{{ line.product.name }}</p>
                <p class="text-sm font-medium text-ink whitespace-nowrap">
                  {{ formatPrice(line.product.price * line.quantity) }}
                </p>
              </div>
              <p class="text-sm text-ink/60 mt-0.5">{{ formatPrice(line.product.price) }} l'unité</p>

              <div class="mt-3 flex items-center justify-between">
                <div class="inline-flex items-center border border-ink/15 rounded-full bg-surface">
                  <button @click="cart.decrement(line.product.id)" class="w-8 h-8 text-ink/70 hover:text-ink transition" aria-label="Diminuer la quantité">−</button>
                  <span class="w-8 text-center text-sm font-medium text-ink">{{ line.quantity }}</span>
                  <button @click="cart.increment(line.product.id)" class="w-8 h-8 text-ink/70 hover:text-ink transition" aria-label="Augmenter la quantité">+</button>
                </div>
                <button @click="cart.remove(line.product.id)" class="text-xs text-ink/50 hover:text-ink underline transition">
                  Retirer
                </button>
              </div>
            </div>
          </li>
        </ul>

        <div class="border-t border-ink/10 px-6 py-5 shrink-0">
          <div class="flex items-center justify-between">
            <span class="text-ink/70">Total</span>
            <span class="text-xl font-bold text-ink">{{ formatPrice(cart.total) }}</span>
          </div>
          
          <a  :href="cartOrderLink(cart.lines, cart.total)"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 flex items-center justify-center w-full bg-brand text-white px-6 py-3 rounded-full font-medium hover:bg-brand-dark transition"
          >
            Commander sur WhatsApp
          </a>
          <button @click="cart.clear()" class="mt-3 w-full text-sm text-ink/60 hover:text-ink transition">
            Vider le panier
          </button>
        </div>
      </template>
    </aside>
  </transition>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useWhatsApp, formatPrice } from '@/composables/useWhatsApp'

const cart = useCartStore()
const { cartOrderLink } = useWhatsApp()

// Fermer avec la touche Échap
const onKeydown = (e) => {
  if (e.key === 'Escape') cart.close()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

// Bloquer le défilement de la page quand le panier est ouvert
watch(
  () => cart.isOpen,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  }
)
</script>