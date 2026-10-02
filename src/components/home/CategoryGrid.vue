<template>
  <section class="max-w-6xl mx-auto px-6 py-16">
    <h2 class="font-serif text-2xl font-bold text-ink mb-8">Catégories</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <router-link v-for="cat in categories" :key="cat.id" to="/produits"
                   class="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-sage/40">
        <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <div class="absolute inset-0 bg-ink/40 flex items-end p-4">
          <span class="text-white font-medium">{{ cat.name }}</span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import categories from '@/data/categories.json'
</script>