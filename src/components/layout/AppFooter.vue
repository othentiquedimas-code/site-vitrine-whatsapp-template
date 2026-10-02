<template>
  <footer class="border-t border-ink/10 bg-sage/40 mt-20">
    <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-ink/60">
        © {{ new Date().getFullYear() }} {{ settings.brandName }}. Tous droits réservés.
      </p>
      <div class="flex items-center gap-6 text-sm text-ink/60">
        <a :href="`mailto:${settings.email}`" class="hover:text-ink transition">{{ settings.email }}</a>
        <a :href="`https://wa.me/${settings.whatsapp}`" target="_blank" rel="noopener noreferrer" class="hover:text-ink transition">WhatsApp</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import settings from '@/data/settings.json'
</script>