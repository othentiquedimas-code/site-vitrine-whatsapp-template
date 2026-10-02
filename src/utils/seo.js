import settings from '@/data/settings.json'

export function setPageMeta({ title, description } = {}) {
  document.title = title
    ? `${title} | ${settings.brandName}`
    : `${settings.brandName} | ${settings.slogan}`

  let tag = document.querySelector('meta[name="description"]')
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', 'description')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', description || settings.subtitle)
}