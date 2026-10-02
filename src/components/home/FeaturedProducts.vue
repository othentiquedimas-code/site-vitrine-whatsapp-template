<template>
  <section class="max-w-6xl mx-auto px-6 py-16">
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-serif text-2xl font-bold text-ink">Produits vedettes</h2>
      <router-link to="/produits" class="text-sm font-medium text-ink/60 hover:text-brand transition">Tout voir →</router-link>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in featured" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<script setup>
import products from '@/data/products.json'
import ProductCard from '@/components/product/ProductCard.vue'
const featured = products.filter(p => p.featured)
</script>