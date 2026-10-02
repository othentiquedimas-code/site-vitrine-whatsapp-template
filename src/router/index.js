import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import products from '@/data/products.json'
import { setPageMeta } from '@/utils/seo'

const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/produits',
    name: 'products',
    component: () => import('@/pages/ProductList.vue'),
    meta: {
      title: 'Nos produits',
      description: 'Parcourez notre sélection de produits et commandez directement sur WhatsApp.',
    },
  },
  { path: '/produits/:slug', name: 'product-detail', component: () => import('@/pages/ProductDetail.vue') },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/Contact.vue'),
    meta: {
      title: 'Contact',
      description: 'Contactez-nous sur WhatsApp ou par email pour toute question ou commande.',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  if (to.name === 'product-detail') {
    const product = products.find((p) => p.slug === to.params.slug)
    setPageMeta({
      title: product ? product.name : 'Produit introuvable',
      description: product?.description,
    })
    return
  }
  setPageMeta({ title: to.meta.title, description: to.meta.description })
})

export default router