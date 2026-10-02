<template>
  <section class="max-w-6xl mx-auto px-6 py-24 text-center">
    <h1 class="font-serif text-4xl md:text-6xl font-bold tracking-tight text-ink leading-tight">
      {{ settings.slogan }}
    </h1>
    <p class="mt-6 text-lg text-ink/70 max-w-2xl mx-auto">{{ settings.subtitle }}</p>
    <div class="mt-10 flex items-center justify-center gap-4">
      <router-link to="/produits" class="bg-brand text-white px-6 py-3 rounded-full font-medium hover:bg-brand-dark transition">
        Voir les produits
      </router-link>
      <a :href="`https://wa.me/${settings.whatsapp}`" target="_blank" rel="noopener noreferrer"
         class="border border-ink/20 text-ink px-6 py-3 rounded-full font-medium hover:border-brand transition">
        Commander maintenant
      </a>
    </div>
  </section>
</template>

<script setup>
import settings from '@/data/settings.json'
</script>