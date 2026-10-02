<template>
  <div class="group bg-white rounded-2xl overflow-hidden border border-ink/10 hover:border-accent hover:shadow-lg transition">
    <router-link :to="`/produits/${product.slug}`" class="block aspect-square overflow-hidden bg-sage/30">
      <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
    </router-link>
    <div class="p-4">
      <router-link :to="`/produits/${product.slug}`">
        <h3 class="font-medium text-ink hover:text-brand transition">{{ product.name }}</h3>
      </router-link>
      <p class="text-sm text-ink/60 mt-1">{{ formatPrice(product.price) }}</p>
      <div class="mt-3 flex flex-col gap-2">
        <AddToCartButton :product="product" class="w-full py-2 text-sm" />
        <a :href="orderLink(product)" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center justify-center w-full text-sm font-medium bg-brand text-white py-2 rounded-full hover:bg-brand-dark transition">
          Commander sur WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWhatsApp, formatPrice } from '@/composables/useWhatsApp'
import AddToCartButton from '@/components/product/AddToCartButton.vue'
defineProps({ product: { type: Object, required: true } })
const { orderLink } = useWhatsApp()
</script>