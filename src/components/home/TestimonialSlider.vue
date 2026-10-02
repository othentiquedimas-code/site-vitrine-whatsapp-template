<template>
  <section class="bg-sage/40 border-y border-ink/10 py-16">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="font-serif text-2xl font-bold text-ink mb-8 text-center">Ils nous font confiance</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <figure v-for="t in testimonials" :key="t.id" class="bg-white rounded-2xl p-6">
          <blockquote class="text-ink/80 italic">« {{ t.text }} »</blockquote>
          <figcaption class="mt-4 text-sm">
            <span class="font-medium text-ink">{{ t.name }}</span>
            <span class="text-ink/60"> — {{ t.role }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup>
import testimonials from '@/data/testimonials.json'
</script>