<template>
  <button
    type="button"
    @click="add"
    class="inline-flex items-center justify-center font-medium border border-brand text-brand rounded-full hover:bg-brand hover:text-white transition"
  >
    {{ added ? 'Ajouté ✓' : 'Ajouter au panier' }}
  </button>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps({ product: { type: Object, required: true } })

const cart = useCartStore()
const added = ref(false)
let timer = null

const add = () => {
  cart.add(props.product)
  added.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    added.value = false
  }, 1500)
}

onUnmounted(() => clearTimeout(timer))
</script>