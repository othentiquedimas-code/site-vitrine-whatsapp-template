import settings from '@/data/settings.json'

export function useWhatsApp() {
  const orderLink = (product) => {
    const msg = `Bonjour, je souhaite commander :\n*${product.name}*\nPrix : ${formatPrice(product.price)}\nRéf : ${product.sku}`
    return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  const cartOrderLink = (lines, total) => {
    const list = lines
      .map(({ product, quantity }) => `• ${quantity} x *${product.name}* (Réf : ${product.sku}) : ${formatPrice(product.price * quantity)}`)
      .join('\n')
    const msg = `Bonjour, je souhaite commander :\n\n${list}\n\n*Total : ${formatPrice(total)}*`
    return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  return { orderLink, cartOrderLink }
}

export function formatPrice(value) {
  return new Intl.NumberFormat('fr-FR').format(value) + ' FCFA'
}