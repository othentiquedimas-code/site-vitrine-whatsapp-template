<template>
  <div v-if="product" class="max-w-6xl mx-auto px-6 py-12">
    <!-- Fil d'ariane -->
    <nav class="text-sm text-ink/60 mb-8">
      <router-link to="/" class="hover:text-ink">Accueil</router-link>
      <span class="mx-2">/</span>
      <router-link to="/produits" class="hover:text-ink">Produits</router-link>
      <span class="mx-2">/</span>
      <span class="text-ink">{{ product.name }}</span>
    </nav>

    <div class="grid md:grid-cols-2 gap-12">
      <!-- Galerie -->
      <div>
        <div class="aspect-square rounded-2xl overflow-hidden bg-sage/30">
          <img :src="activeImage" :alt="product.name" class="w-full h-full object-cover" />
        </div>
        <div v-if="product.images.length > 1" class="flex gap-3 mt-4">
          <button
            v-for="(img, i) in product.images"
            :key="i"
            @click="activeImage = img"
            :class="[
              'aspect-square w-20 rounded-lg overflow-hidden border-2 transition',
              activeImage === img ? 'border-brand' : 'border-transparent'
            ]"
          >
            <img :src="img" :alt="`${product.name} ${i + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Infos -->
      <div>
        <h1 class="font-serif text-3xl font-bold text-ink">{{ product.name }}</h1>
        <p class="text-2xl text-ink mt-4">{{ formatPrice(product.price) }}</p>
        <p class="text-sm text-ink/50 mt-1">Réf : {{ product.sku }}</p>

        <p class="text-ink/70 mt-6 leading-relaxed">{{ product.description }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <AddToCartButton :product="product" class="px-8 py-3" />
          <a :href="orderLink(product)" target="_blank"
             class="inline-flex items-center justify-center bg-brand text-white px-8 py-3 rounded-full font-medium hover:bg-brand-dark transition">
            Commander sur WhatsApp
          </a>
        </div>
      </div>
    </div>

    <!-- Produits similaires -->
    <div v-if="related.length" class="mt-20">
      <h2 class="font-serif text-2xl font-bold text-ink mb-8">Vous aimerez aussi</h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="p in related" :key="p.id" :product="p" />
      </div>
    </div>
  </div>

  <!-- Produit introuvable -->
  <div v-else class="max-w-6xl mx-auto px-6 py-20 text-center">
    <h1 class="font-serif text-2xl font-bold text-ink">Produit introuvable</h1>
    <router-link to="/produits" class="mt-4 inline-block text-ink/70 hover:text-ink underline">
      Retour aux produits
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import products from '@/data/products.json'
import ProductCard from '@/components/product/ProductCard.vue'
import AddToCartButton from '@/components/product/AddToCartButton.vue'
import { useWhatsApp, formatPrice } from '@/composables/useWhatsApp'

const route = useRoute()
const { orderLink } = useWhatsApp()

const product = computed(() => products.find(p => p.slug === route.params.slug))
const activeImage = ref(product.value?.images[0])

// Si on navigue d'un produit à un autre, remettre la première image
watch(product, (p) => {
  activeImage.value = p?.images[0]
})

const related = computed(() => {
  if (!product.value) return []
  return products
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
})
</script>