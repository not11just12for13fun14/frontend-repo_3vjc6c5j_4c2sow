import { useEffect, useMemo, useState } from 'react'
import { STRINGS, t } from './i18n'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

function useLang() {
  const [lang, setLang] = useState('en')
  // Detect from URL: /en/... or /ar/...
  useEffect(() => {
    const path = window.location.pathname
    if (path.startsWith('/ar')) setLang('ar')
    else if (path.startsWith('/en')) setLang('en')
    else {
      // Auto-detect browser language
      const nav = (navigator.language || 'en').toLowerCase()
      setLang(nav.startsWith('ar') ? 'ar' : 'en')
      const target = nav.startsWith('ar') ? '/ar' : '/en'
      if (path === '/' ) {
        window.history.replaceState({}, '', target)
      }
    }
  }, [])

  // Keep URL prefix in sync when switching
  const switchLang = (l) => {
    const path = window.location.pathname.replace(/^\/(en|ar)/, '') || '/'
    const newPath = `/${l}${path}`
    setLang(l)
    window.history.pushState({}, '', newPath)
  }

  // RTL handling
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  return { lang, switchLang }
}

function Header({ lang, switchLang, phone, socials }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo placeholder - replace with real logo asset */}
          <div className="w-32 h-8 bg-neutral-900 text-white flex items-center justify-center tracking-widest text-xs">
            LOGO
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
            <a href={`/${lang}`} className="hover:text-black">{t(lang,'nav.home')}</a>
            <a href={`/${lang}#products`} className="hover:text-black">{t(lang,'nav.products')}</a>
            <a href={`/${lang}/gallery`} className="hover:text-black">{t(lang,'nav.gallery')}</a>
            <a href={`/${lang}/contact`} className="hover:text-black">{t(lang,'nav.contact')}</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href={`tel:${phone}`} className="hidden sm:block text-sm text-neutral-700 hover:text-black">{phone}</a>
          <a href={socials?.whatsapp} aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-neutral-900 text-white grid place-items-center">wa</a>
          <a href={socials?.instagram} aria-label="Instagram" className="w-9 h-9 rounded-full bg-neutral-900 text-white grid place-items-center">ig</a>
          <a href={socials?.tiktok} aria-label="TikTok" className="w-9 h-9 rounded-full bg-neutral-900 text-white grid place-items-center">tt</a>
          <button onClick={()=>switchLang(lang==='en'?'ar':'en')} className="ml-2 text-sm px-3 py-1 border border-neutral-300 rounded-full hover:border-neutral-500">
            {t(lang,'nav.language')}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ lang }) {
  // Parallax: background image moves slower than content on scroll.
  const [offset, setOffset] = useState(0)
  useEffect(()=>{
    const onScroll = () => setOffset(window.scrollY * 0.4)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  },[])

  return (
    <section aria-label="Hero" className="relative h-[70vh] sm:h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop')",
          transform: `translateY(${offset * -0.2}px)`,
        }}
      />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20">
        <div className="bg-white/70 backdrop-blur px-6 py-5 inline-block">
          <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900">
            {t(lang,'hero.headline')}
          </h1>
          <p className="text-neutral-700 mt-1">{t(lang,'hero.sub')}</p>
        </div>
      </div>
    </section>
  )
}

function Products({ lang, products }) {
  return (
    <section id="products" className="py-16 sm:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-medium text-neutral-900">{t(lang,'products.title')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p)=> (
            <a key={p.slug} href={`/${lang}/products/${p.slug}`} className="group block bg-white border border-neutral-200 overflow-hidden">
              <div className="aspect-[4/3] bg-neutral-200 overflow-hidden">
                <img src={p.image} alt={p.title?.[lang] || p.title?.en} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"/>
              </div>
              <div className="p-4">
                <div className="text-neutral-900">{p.title?.[lang] || p.title?.en}</div>
                <div className="text-xs text-neutral-500 mt-1">{t(lang,'products.category')}: {p.category}</div>
                <div className="mt-3 text-sm underline underline-offset-4">{t(lang,'products.viewDetails')}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services({ lang }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-medium text-neutral-900 mb-8">{t(lang,'services.title')}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STRINGS[lang].services.items.map((s, i)=> (
            <li key={i} className="border border-neutral-200 p-5 bg-white">{s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Contact({ lang, config }) {
  const [form, setForm] = useState({ name:'', phone:'', message:'' })
  const [sent, setSent] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${BACKEND}/api/contact`,{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, source:'homepage' })})
    if(res.ok) setSent(true)
  }
  return (
    <section className="py-16 sm:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-medium text-neutral-900 mb-6">{t(lang,'contact.title')}</h2>
          <form onSubmit={submit} className="space-y-4">
            <input required placeholder={t(lang,'contact.name')} className="w-full border border-neutral-300 px-3 py-2" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
            <input required placeholder={t(lang,'contact.phone')} className="w-full border border-neutral-300 px-3 py-2" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
            <textarea required rows="4" placeholder={t(lang,'contact.message')} className="w-full border border-neutral-300 px-3 py-2" value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
            <button type="submit" className="px-4 py-2 bg-neutral-900 text-white">{t(lang,'contact.send')}</button>
            {sent && <p className="text-green-700 text-sm">{t(lang,'contact.success')}</p>}
          </form>
          <div className="mt-6 flex items-center gap-4">
            <a className="underline" href={`https://wa.me/${config?.contact?.whatsapp?.replace(/[^\d]/g,'')}`}>{t(lang,'contact.whatsapp')}</a>
            <a className="underline" href={config?.contact?.instagram}>Instagram</a>
            <a className="underline" href={config?.contact?.tiktok}>TikTok</a>
            <a className="underline" href={`tel:${config?.contact?.phone}`}>{config?.contact?.phone}</a>
          </div>
        </div>
        <div>
          <iframe title="map" className="w-full h-80 border" src={config?.contact?.map_embed} loading="lazy" />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 text-center text-xs text-neutral-500">© {new Date().getFullYear()} Premium Curtains</footer>
  )
}

export default function App(){
  const { lang, switchLang } = useLang()
  const [config, setConfig] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(()=>{
    fetch(`${BACKEND}/api/config`).then(r=>r.json()).then(setConfig).catch(()=>{})
    fetch(`${BACKEND}/api/products`).then(r=>r.json()).then(setProducts).catch(()=>{})
  },[])

  // Simple router by pathname for the required pages
  const path = typeof window !== 'undefined' ? window.location.pathname.replace(/^\/(en|ar)/,'') || '/' : '/'

  if(path.startsWith('/products/')){
    const slug = path.split('/').pop()
    return <ProductPage lang={lang} switchLang={switchLang} slug={slug} config={config} />
  }
  if(path === '/gallery'){
    return <GalleryPage lang={lang} switchLang={switchLang} />
  }
  if(path === '/contact'){
    return <ContactPage lang={lang} switchLang={switchLang} config={config} />
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header lang={lang} switchLang={switchLang} phone={config?.contact?.phone} socials={{
        whatsapp: `https://wa.me/${config?.contact?.whatsapp?.replace(/[^\d]/g,'')}`,
        instagram: config?.contact?.instagram,
        tiktok: config?.contact?.tiktok,
      }} />
      <main className="pt-16">
        <Hero lang={lang} />
        <Products lang={lang} products={products} />
        <Services lang={lang} />
        <Contact lang={lang} config={config} />
      </main>
      <Footer />
    </div>
  )
}

function ProductPage({ lang, switchLang, slug, config }){
  const [product, setProduct] = useState(null)
  useEffect(()=>{ fetch(`${BACKEND}/api/products/${slug}`).then(r=>r.json()).then(setProduct) },[slug])
  return (
    <div className="min-h-screen bg-white">
      <Header lang={lang} switchLang={switchLang} phone={config?.contact?.phone} socials={{}} />
      <main className="pt-16">
        {product && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
              <img src={product.image} alt={product.title?.[lang] || product.title?.en} className="w-full h-full object-cover" />
            </div>
            <div className="mt-6">
              <h1 className="text-2xl sm:text-3xl font-medium">{product.title?.[lang] || product.title?.en}</h1>
              <p className="text-neutral-500 mt-1">{product.category}</p>
              <p className="mt-4 text-neutral-700">{product.description?.[lang] || product.description?.en}</p>
              <div className="mt-6">
                <a
                  className="inline-block px-4 py-2 bg-neutral-900 text-white"
                  href={`https://wa.me/${(config?.contact?.whatsapp||'').replace(/[^\d]/g,'')}?text=${encodeURIComponent(lang==='ar' ? 'مرحبا، أنا مهتم بهذا الموديل من الستائر. هل يمكنكم تزويدي بمزيد من التفاصيل؟' : 'Hello, I am interested in this curtain model. Can you share more details?')}`}
                >WhatsApp</a>
              </div>
              {product.gallery?.length > 0 && (
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.gallery.map((g,i)=> (
                    <img key={i} src={g} alt="" className="w-full h-32 sm:h-40 object-cover" loading="lazy" />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

function GalleryPage({ lang, switchLang }){
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  useEffect(()=>{ fetch(`${BACKEND}/api/gallery`).then(r=>r.json()).then(setItems) },[])
  const filtered = useMemo(()=> filter==='all' ? items : items.filter(i=> i.category===filter), [items, filter])
  const labels = STRINGS[lang].gallery.filters
  return (
    <div className="min-h-screen bg-white">
      <Header lang={lang} switchLang={switchLang} />
      <main className="pt-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl font-medium mb-6">{t(lang,'gallery.title')}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(labels).map(([key, label])=> (
              <button key={key} onClick={()=>setFilter(key)} className={`px-3 py-1 border text-sm ${filter===key?'bg-neutral-900 text-white':'bg-white'}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]"><div className="space-y-4">
            {filtered.map((it)=> (
              <img key={it._id} src={it.image} alt="" loading="lazy" className="w-full rounded-sm" />
            ))}
          </div></div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function ContactPage({ lang, switchLang, config }){
  return (
    <div className="min-h-screen bg-white">
      <Header lang={lang} switchLang={switchLang} phone={config?.contact?.phone} socials={{}} />
      <main className="pt-16">
        <Contact lang={lang} config={config} />
      </main>
      <Footer />
    </div>
  )
}
