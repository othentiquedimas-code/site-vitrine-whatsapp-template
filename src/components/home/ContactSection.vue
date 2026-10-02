<template>
  <section class="max-w-6xl mx-auto px-6 py-20 text-center">
    <h2 class="font-serif text-2xl font-bold text-ink">Une question ? Une commande ?</h2>
    <p class="mt-3 text-ink/70 max-w-xl mx-auto">Écrivez-nous directement sur WhatsApp, nous répondons rapidement.</p>
    <a :href="`https://wa.me/${settings.whatsapp}`" target="_blank"
       class="mt-8 inline-block bg-brand text-white px-8 py-3 rounded-full font-medium hover:bg-brand-dark transition">
      Discuter sur WhatsApp
    </a>
  </section>
</template>

<script setup>
import settings from '@/data/settings.json'
</script>