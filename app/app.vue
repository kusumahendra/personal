<template>
  <div class="relative min-h-screen overflow-hidden bg-white font-sans text-neutral-900 antialiased"
    @mousemove="onMouseMove">
    <div class="pointer-events-none fixed inset-0 z-0"
      style="background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px); background-size: 24px 24px;" />
    <div class="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500" :style="{
      background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(34, 211, 238, 0.25), transparent 70%)`,
      opacity: cursor.visible ? 1 : 0
    }" />
    <main class="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-4">
      <section class="py-24 sm:py-32">
        <p class="text-sm font-medium tracking-wide text-neutral-600">
          Hi, I'm Kusuma Hendra
        </p>
        <h1 class="mt-3 font-display text-5xl font-semibold tracking-tighter text-neutral-900 sm:text-6xl text-balance">
          I turn
          <span class="text-neutral-500">"we should have a website"</span>
          into one.
        </h1>
        <p class="mt-4 max-w-2xl text-balance text-lg text-neutral-600 sm:text-xl">
          Company profiles, online stores, and everything between — designed well, built to function.
        </p>

        <div class="mt-8 flex flex-wrap gap-2">
          <a href="mailto:me@kusumahendra.com"
            class="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 ease-out delay-75 hover:-translate-y-0.5 hover:bg-neutral-700 hover:shadow-lg hover:shadow-neutral-900/20 active:translate-y-0 active:scale-95 active:delay-0">
            Get in touch
          </a>
          <!-- <a href="#work"
            class="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-all duration-200 ease-out delay-75 hover:-translate-y-0.5 hover:border-neutral-400 hover:text-neutral-900 hover:shadow-lg hover:shadow-neutral-900/10 active:translate-y-0 active:scale-95 active:delay-0">
            See who I've worked with
          </a> -->
        </div>
      </section>

      <section id="work" class="border-t border-neutral-200 py-16 max-w-4xl">
        <p class="text-sm font-medium tracking-wide text-neutral-500">
          Behind the scenes with
        </p>
        <ul class="mt-8 flex flex-wrap items-center gap-x-12 gap-y-8">
          <li v-for="brand in brands" :key="brand.name">
            <a :href="brand.url" target="_blank" rel="noopener noreferrer"
              class="flex h-7 items-center grayscale transition duration-200 hover:grayscale-0 hover:opacity-100 sm:h-8"
              :class="brand.logo.endsWith('.svg') ? 'opacity-70' : 'opacity-60'">
              <img :src="logoSrc(brand.logo)" :alt="brand.name"
                class="h-full w-auto max-w-[110px] object-contain object-left sm:max-w-[130px]">
            </a>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const brands = [
  { name: 'Tenplus', url: 'https://mytenplus.com', logo: 'tenplus.png' },
  { name: 'Arus the Brand', url: 'https://arusthebrand.com', logo: 'arus.png' },
  { name: 'G Herbal', url: 'https://gherbal.com', logo: 'gherbal.svg' },
  { name: 'Island Sports Club', url: 'https://iscbali.com', logo: 'isc.webp' },
  { name: 'Bali Veterinary Clinic', url: 'https://balivetclinic.com', logo: 'balivetclinic.webp' },
  { name: 'RAH Legal Experts', url: 'https://rahlegalexperts.com', logo: 'rah-legal.webp' },
  { name: 'Blackwood Ideas', url: 'https://blackwoodideas.com', logo: 'blackwood-ideas.webp' },
  { name: 'Busana Indah Bali', url: 'https://busanaindahbali.com', logo: 'busana-indah.webp' },
  { name: 'Print Here', url: 'https://printhereplease.com', logo: 'print-here.webp' },
  { name: 'Nusantara Lifestyle', url: 'https://nusantaralifestyle.com', logo: 'nusantara-lifestyle.png' },
  { name: 'Catalyze', url: 'https://catalyze.id', logo: 'catalyze.svg' }
]

const runtimeConfig = useRuntimeConfig()
function logoSrc(file: string) {
  return `${runtimeConfig.app.baseURL}logos/${file}`.replace(/\/{2,}/g, '/')
}

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: `${runtimeConfig.app.baseURL}favicon.png`.replace(/\/{2,}/g, '/') },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap' }
  ]
})

const cursor = reactive({ x: 0, y: 0, visible: false })
const pos = reactive({ x: 0, y: 0 })

let rafId: number | null = null

function onMouseMove(e: MouseEvent) {
  cursor.x = e.clientX
  cursor.y = e.clientY
  cursor.visible = true
}

function animate() {
  // Ease the glow toward the cursor instead of snapping to it, for a smoother trail.
  pos.x += (cursor.x - pos.x) * 0.12
  pos.y += (cursor.y - pos.y) * 0.12
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  pos.x = cursor.x
  pos.y = cursor.y
  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>
