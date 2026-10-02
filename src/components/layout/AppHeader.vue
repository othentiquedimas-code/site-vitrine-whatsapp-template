<template>
  <header class="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-ink/10">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link to="/" class="font-serif text-xl font-bold tracking-tight text-ink" @click="isOpen = false">
        {{ settings.brandName }}
      </router-link>

      <!-- Menu desktop -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-ink/70">
        <router-link to="/" class="hover:text-ink transition">Accueil</router-link>
        <router-link to="/produits" class="hover:text-ink transition">Produits</router-link>
        <router-link to="/contact" class="hover:text-ink transition">Contact</router-link>
      </nav>

      <div class="flex items-center gap-3">
        <!-- Bouton panier -->
        <button @click="openCart" class="relative p-2 text-ink" aria-label="Ouvrir le panier">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 8h12l1 12H5L6 8z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 8V7a3 3 0 016 0v1" />
          </svg>
          <span
            v-if="cart.count"
            class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-ink text-[11px] font-semibold flex items-center justify-center"
          >
            {{ cart.count }}
          </span>
        </button>

        <a :href="`https://wa.me/${settings.whatsapp}`" target="_blank" rel="noopener noreferrer"
           class="hidden sm:inline-block text-sm font-medium bg-brand text-white px-4 py-2 rounded-full hover:bg-brand-dark transition">
          Commander
        </a>

        <!-- Bouton burger (mobile seulement) -->
        <button @click="isOpen = !isOpen" class="md:hidden p-2 -mr-2 text-ink" aria-label="Menu">
          <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu mobile déroulant -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav v-if="isOpen" class="md:hidden border-t border-ink/10 bg-cream px-6 py-4 flex flex-col gap-4 text-sm font-medium text-ink/80">
        <router-link to="/" @click="isOpen = false" class="hover:text-ink transition">Accueil</router-link>
        <router-link to="/produits" @click="isOpen = false" class="hover:text-ink transition">Produits</router-link>
        <router-link to="/contact" @click="isOpen = false" class="hover:text-ink transition">Contact</router-link>
        <a :href="`https://wa.me/${settings.whatsapp}`" target="_blank" rel="noopener noreferrer"
           class="bg-brand text-white px-4 py-2 rounded-full text-center hover:bg-brand-dark transition">
          Commander sur WhatsApp
        </a>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import settings from '@/data/settings.json'
import { useCartStore } from '@/stores/cart'

const isOpen = ref(false)
const cart = useCartStore()

const openCart = () => {
  isOpen.value = false
  cart.open()
}
</script>