<template>
  <div class="max-w-3xl mx-auto px-6 py-16">
    <div class="text-center">
      <h1 class="font-serif text-3xl font-bold text-ink">Contactez-nous</h1>
      <p class="text-ink/70 mt-3">
        La façon la plus rapide de nous joindre, c'est WhatsApp. Écrivez-nous, nous répondons vite.
      </p>
    </div>

    <!-- Bloc WhatsApp principal -->
    <div class="mt-10 bg-surface border border-ink/10 rounded-2xl p-8 text-center">
      <p class="text-ink/80">Une question sur un produit ou une commande ?</p>
      <a :href="`https://wa.me/${settings.whatsapp}`" target="_blank" rel="noopener noreferrer"
         class="mt-6 inline-flex items-center justify-center bg-brand text-white px-8 py-3 rounded-full font-medium hover:bg-brand-dark transition">
        Discuter sur WhatsApp
      </a>
    </div>

    <!-- Coordonnées -->
    <div class="mt-8 grid sm:grid-cols-2 gap-4">
      <a :href="`mailto:${settings.email}`"
         class="bg-surface border border-ink/10 rounded-2xl p-6 hover:border-brand transition">
        <p class="text-sm text-ink/50">Email</p>
        <p class="text-ink font-medium mt-1">{{ settings.email }}</p>
      </a>
      <a :href="`https://wa.me/${settings.whatsapp}`" target="_blank" rel="noopener noreferrer"
         class="bg-surface border border-ink/10 rounded-2xl p-6 hover:border-brand transition">
        <p class="text-sm text-ink/50">WhatsApp</p>
        <p class="text-ink font-medium mt-1">+{{ settings.whatsapp }}</p>
      </a>
    </div>

    <!-- Réseaux sociaux (affichés seulement si renseignés) -->
    <div v-if="settings.socials.instagram || settings.socials.facebook" class="mt-8 text-center">
      <p class="text-sm text-ink/50 mb-3">Suivez-nous</p>
      <div class="flex items-center justify-center gap-6">
        <a v-if="settings.socials.instagram" :href="settings.socials.instagram" target="_blank" rel="noopener noreferrer"
           class="text-ink/70 hover:text-ink transition font-medium">Instagram</a>
        <a v-if="settings.socials.facebook" :href="settings.socials.facebook" target="_blank" rel="noopener noreferrer"
           class="text-ink/70 hover:text-ink transition font-medium">Facebook</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import settings from '@/data/settings.json'
</script>