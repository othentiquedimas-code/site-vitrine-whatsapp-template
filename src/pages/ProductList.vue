<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <h1 class="font-serif text-3xl font-bold text-ink">Nos produits</h1>
    <p class="text-ink/70 mt-2">Parcourez notre sélection et commandez sur WhatsApp.</p>

    <!-- Filtres par catégorie -->
    <div class="flex flex-wrap gap-2 mt-8">
      <button
        @click="setCategory('all')"
        :class="filterClass('all')"
      >
        Tout
      </button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="setCategory(cat.slug)"
        :class="filterClass(cat.slug)"
      >
        {{ cat.name }}
      </button>
    </div>

    <!-- Grille de produits -->
    <div v-if="filteredProducts.length" class="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>

    <!-- État vide -->
    <p v-else class="text-ink/60 mt-10">Aucun produit dans cette catégorie pour le moment.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import products from '@/data/products.json'
import categories from '@/data/categories.json'
import ProductCard from '@/components/product/ProductCard.vue'

const route = useRoute()
const router = useRouter()

const validSlugs = categories.map(cat => cat.slug)

// Source de vérité du filtre : le paramètre d'URL `categorie` (partageable).
// Toute valeur absente ou inconnue retombe sur « all ».
const activeCategory = computed(() => {
  const fromQuery = route.query.categorie
  return typeof fromQuery === 'string' && validSlugs.includes(fromQuery) ? fromQuery : 'all'
})

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') return products
  return products.filter(p => p.category === activeCategory.value)
})

const filterClass = (slug) => [
  'px-4 py-2 rounded-full text-sm font-medium transition border',
  activeCategory.value === slug
    ? 'bg-brand text-white border-brand'
    : 'bg-surface text-ink/70 border-ink/15 hover:border-brand'
]

// Reflète le filtre dans l'URL pour qu'il reste partageable et rejouable au rafraîchissement.
const setCategory = (slug) => {
  router.replace({
    path: '/produits',
    query: slug === 'all' ? {} : { categorie: slug },
  })
}
</script>