import { useMemo, useState } from 'react'
import { Search, MapPin, ArrowRight, Store, Heart, Menu, X, ShoppingBag, Sparkles, ChevronDown, Navigation, CheckCircle2, Compass, Tag, Clock } from 'lucide-react'
import './App.css'

const markets = [
{ id: 'sarojini', name: 'Sarojini Nagar', city: 'New Delhi', description: 'Streetwear, fashion & hidden gems', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85', tag: 'FASHION FAVOURITE', count: 'Fashion & lifestyle' },
{ id: 'chandni', name: 'Chandni Chowk', city: 'Old Delhi', description: 'Ethnic wear, jewellery & traditions', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=85', tag: 'CULTURE & CRAFT', count: 'Ethnic & traditional' },
{ id: 'sadar', name: 'Sadar Bazaar', city: 'New Delhi', description: 'Wholesale finds & everyday essentials', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=85', tag: 'WHOLESALE HUB', count: 'Wholesale & essentials' },
]

const categories = [
{ name: 'Clothing', emoji: '👕' }, { name: 'Footwear', emoji: '👟' },
{ name: 'Jewellery', emoji: '💍' }, { name: 'Bags', emoji: '👜' },
{ name: 'Accessories', emoji: '🕶️' }, { name: 'Home Decor', emoji: '🪴' },
]

const shops = [
{ id: 1, name: 'Urban Thread Co.', market: 'sarojini', category: 'Clothing', price: '₹200–₹800', lane: 'Sample Lane 3', landmark: 'Near the main market entrance', rating: '4.8', description: 'Everyday streetwear, oversized tees, cargos and seasonal styles.', products: ['Oversized T-shirts', 'Cargo pants', 'Casual shirts'], image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80' },
{ id: 2, name: 'The Sneaker Spot', market: 'sarojini', category: 'Footwear', price: '₹400–₹1,500', lane: 'Sample Lane 2', landmark: 'Near the central crossing', rating: '4.6', description: 'A sample listing for shoppers exploring everyday footwear.', products: ['Casual sneakers', 'Slides', 'Everyday footwear'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
{ id: 3, name: 'Everyday Edit', market: 'sarojini', category: 'Bags', price: '₹250–₹900', lane: 'Sample Lane 5', landmark: 'Near the sample accessories lane', rating: '4.5', description: 'Sample listing for totes, shoulder bags and everyday accessories.', products: ['Tote bags', 'Shoulder bags', 'Mini bags'], image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
{ id: 4, name: 'Silver & Soul', market: 'chandni', category: 'Jewellery', price: '₹150–₹2,000', lane: 'Sample Lane 1', landmark: 'Near the sample shopping square', rating: '4.7', description: 'Illustrative listing for festive accessories and statement jewellery.', products: ['Earrings', 'Necklaces', 'Bracelets'], image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80' },
{ id: 5, name: 'The Ethnic Edit', market: 'chandni', category: 'Clothing', price: '₹500–₹3,000', lane: 'Sample Lane 4', landmark: 'Near the sample textile street', rating: '4.8', description: 'Illustrative listing for festive styles and ethnic-inspired outfits.', products: ['Kurtas', 'Dupattas', 'Festive wear'], image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' },
{ id: 6, name: 'Little Luxe', market: 'chandni', category: 'Accessories', price: '₹100–₹700', lane: 'Sample Lane 2', landmark: 'Near the sample market junction', rating: '4.4', description: 'Illustrative listing for small gifts and fashion accessories.', products: ['Hair accessories', 'Gift items', 'Fashion jewellery'], image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80' },
{ id: 7, name: 'Home Finds Studio', market: 'sadar', category: 'Home Decor', price: '₹100–₹1,200', lane: 'Sample Lane 6', landmark: 'Near the sample wholesale block', rating: '4.6', description: 'Illustrative listing for decor pieces and everyday home essentials.', products: ['Decor pieces', 'Storage baskets', 'Kitchen essentials'], image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80' },
{ id: 8, name: 'Bulk & Beyond', market: 'sadar', category: 'Accessories', price: 'Wholesale pricing', lane: 'Sample Lane 3', landmark: 'Near the sample distribution lane', rating: '4.5', description: 'Illustrative listing for shoppers exploring bulk-buying options.', products: ['Bulk accessories', 'Gift packaging', 'Everyday goods'], image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80' },
]

function App() {
const [market, setMarket] = useState('all')
const [query, setQuery] = useState('')
const [category, setCategory] = useState('All')
const [page, setPage] = useState('home')
const [selectedShop, setSelectedShop] = useState(null)
const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('gullyguide-saved') || '[]'))
const [userShops, setUserShops] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('gullyguide-user-shops') || '[]')
  } catch {
    return []
  }
})
const [mobileMenu, setMobileMenu] = useState(false)
const [toast, setToast] = useState('')
const [form, setForm] = useState({ shopName: '', owner: '', phone: '', market: 'sarojini', location: '', category: 'Clothing', plan: 'Free' })
const [submitted, setSubmitted] = useState(false)

const allShops = useMemo(() => [...shops, ...userShops], [userShops])

const filteredShops = useMemo(() => allShops.filter(shop => {
const selectedMarket = market === 'all' || shop.market === market
const matchesCategory = category === 'All' || shop.category === category
const text = `${shop.name} ${shop.category} ${shop.description} ${shop.products.join(' ')} ${shop.lane}`.toLowerCase()
return selectedMarket && matchesCategory && text.includes(query.toLowerCase())
}), [market, category, query])

const notify = (message) => {
setToast(message)
window.setTimeout(() => setToast(''), 2600)
}

const navigate = (nextPage) => {
setPage(nextPage)
setMobileMenu(false)
window.scrollTo({ top: 0, behavior: 'smooth' })
}

const toggleSave = (shop) => {
const next = saved.includes(shop.id) ? saved.filter(id => id !== shop.id) : [...saved, shop.id]
setSaved(next)
localStorage.setItem('gullyguide-saved', JSON.stringify(next))
notify(next.includes(shop.id) ? 'Shop saved to your favourites' : 'Shop removed from saved shops')
}

const openMarket = (id) => {
setMarket(id)
setCategory('All')
setQuery('')
navigate('explore')
}

const openShop = (shop) => {
setSelectedShop(shop)
navigate('shop')
}

const goSearch = () => {
setCategory('All')
navigate('explore')
}

const marketName = markets.find(m => m.id === market)?.name || 'All markets'

const ShopCard = ({ shop }) => ( <article className="shop-card">
<div className="shop-image-wrap" onClick={() => openShop(shop)}> <img src={shop.image} alt={shop.name} className="shop-image" loading="lazy" /> <span className="sample-label">DEMO LISTING</span>
<button className={`save-button ${saved.includes(shop.id) ? 'is-saved' : ''}`} aria-label="Save shop" onClick={e => { e.stopPropagation(); toggleSave(shop) }}>
<Heart size={18} fill={saved.includes(shop.id) ? 'currentColor' : 'none'} /> </button> </div> <div className="shop-card-body"> <div className="shop-card-top"><span className="category-label">{shop.category}</span><span className="rating">★ {shop.rating}</span></div> <h3>{shop.name}</h3> <p className="shop-description">{shop.description}</p> <div className="shop-meta"><span><MapPin size={14} /> {shop.lane}</span><strong>{shop.price}</strong></div>
<button className="text-link" onClick={() => openShop(shop)}>Explore shop <ArrowRight size={15} /></button> </div> </article>
)

return ( <div className="app-shell"> <div className="announcement"><Sparkles size={14} /> YOUR GUIDE TO INDIA'S HIDDEN SHOPPING GEMS <span>✦</span> BUILT FOR CURIOUS SHOPPERS</div> <header className="navbar">
<button className="brand" onClick={() => navigate('home')}><span className="brand-icon"><Compass size={22} /></span><span>gully<span className="brand-accent">guide</span><small>THE LOCAL SHOPPING MAP</small></span></button>
<button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation">{mobileMenu ? <X /> : <Menu />}</button>
<nav className={mobileMenu ? 'nav-links nav-open' : 'nav-links'}>
  <button onClick={() => navigate('home')}>Home</button>

<button onClick={() => { setMarket('all'); navigate('explore') }}>
Explore </button>

<button onClick={() => {
navigate('home');
setTimeout(() => {
document.getElementById('markets')?.scrollIntoView({ behavior: 'smooth' });
}, 100);
}}>
Markets </button>

<button onClick={() => navigate('favourites')}>
❤️ Favourites ({saved.length}) </button>

<button onClick={() => navigate('pricing')}>Pricing</button>

</nav>

<button className="nav-cta" onClick={() => { setSubmitted(false); setForm(f => ({ ...f, plan: 'Free' })); navigate('list') }}><Store size={16} /> List your shop <ArrowRight size={15} /></button> </header>


  {page === 'home' && <>
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> THE STREETS ARE YOURS TO DISCOVER</div>
          <h1>Big markets.<br />Little <span>shortcuts.</span></h1>
          <p className="hero-description">Find the right shop, skip the endless wandering. Your guide to the lanes, local favourites and hidden gems of India's most iconic markets.</p>
          <div className="search-panel">
            <div className="search-input-wrap"><Search size={21} /><input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && goSearch()} placeholder="Try “oversized tees” or “silver earrings”" /></div>
            <div className="search-bottom"><label><MapPin size={16} /><select value={market} onChange={e => setMarket(e.target.value)}><option value="all">All markets</option>{markets.map(m => <option value={m.id} key={m.id}>{m.name}</option>)}</select><ChevronDown size={14} /></label><button className="primary-button" onClick={goSearch}>Find my shop <ArrowRight size={17} /></button></div>
          </div>
          <div className="hero-proof"><div className="proof-avatars"><span>🛍️</span><span>🧭</span><span>✨</span></div><p><strong>Discover smarter.</strong><br />Explore local, shop with confidence.</p></div>
        </div>
        <div className="hero-visual"><img className="hero-image" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90" alt="Fashion shopping destination" /><div className="image-shade" /><div className="floating-note note-top"><span className="note-icon"><MapPin size={18} /></span><div><strong>Your next find is nearby</strong><small>Explore lane by lane</small></div></div><div className="floating-note note-bottom"><div className="note-check"><CheckCircle2 size={19} /></div><div><strong>Less wandering, more finding.</strong><small>Your market, mapped differently.</small></div></div><div className="hero-stamp">LOCAL<br />FINDS<br /><span>✳</span></div></div>
      </section>

      <section className="market-section section-wrap">
        <div className="section-heading"><div><span className="section-kicker">PICK YOUR PLAYGROUND</span><h2>Markets with a million stories.</h2><p>Big names. Small lanes. Your next favourite shop is waiting.</p></div><button className="text-link all-link" onClick={() => { setMarket('all'); navigate('explore') }}>Explore all markets <ArrowRight size={16} /></button></div>
        <div className="market-grid">{markets.map((m, i) => <button className={`market-card market-card-${i}`} key={m.id} onClick={() => openMarket(m.id)} style={{ backgroundImage: `linear-gradient(0deg,rgba(18,18,18,.88),rgba(18,18,18,.02) 80%),url("${m.image}")` }}><span className="market-tag">{m.tag}</span><div className="market-card-info"><span>{m.city}</span><h3>{m.name}</h3><p>{m.description}</p><span className="market-explore">Explore market <ArrowRight size={16} /></span></div></button>)}</div>
      </section>

      <section className="category-section section-wrap" id="category-section"><div className="section-heading"><div><span className="section-kicker">FOLLOW YOUR CURIOSITY</span><h2>What are we hunting for?</h2><p>From everyday essentials to unexpected treasures.</p></div></div><div className="category-grid">{categories.map(c => <button className="category-card" key={c.name} onClick={() => { setCategory(c.name); setMarket('all'); navigate('explore') }}><span className="category-emoji">{c.emoji}</span><span>{c.name}</span><ArrowRight size={16} /></button>)}</div></section>

      <section className="featured-section section-wrap"><div className="section-heading"><div><span className="section-kicker">HANDPICKED FOR YOUR NEXT TRIP</span><h2>A few places to start.</h2><p>Illustrative listings to show how local discovery can work.</p></div><button className="text-link all-link" onClick={() => { setMarket('all'); navigate('explore') }}>See all shops <ArrowRight size={16} /></button></div><div className="shop-grid">{shops.slice(0, 4).map(shop => <ShopCard key={shop.id} shop={shop} />)}</div></section>

      <section className="owner-banner"><div className="owner-art"><div className="owner-circle circle-one" /><div className="owner-circle circle-two" /><ShoppingBag size={70} strokeWidth={1.1} /></div><div className="owner-copy"><span className="section-kicker">FOR THE PEOPLE BEHIND THE COUNTER</span><h2>Your shop deserves<br />to be <em>discovered.</em></h2><p>Give your local business a digital storefront. Help new customers find you, one search at a time.</p><button className="primary-button" onClick={() => { setSubmitted(false); navigate('list') }}>List your shop <ArrowRight size={17} /></button></div><div className="owner-side-note">LOCAL BUSINESS<br />GLOBAL POSSIBILITIES ✳</div></section>
    </main>
    <Footer navigate={navigate} />
  </>}

  {page === 'explore' && <main className="page-content">
    <div className="page-intro"><span className="section-kicker">YOUR MARKET, YOUR WAY</span><h1>Find your kind<br />of <span>hidden gem.</span></h1><p>Search local listings and discover shops by category. Locations shown are illustrative demo data.</p></div>
    <div className="explore-toolbar"><div className="explore-search"><Search size={20} /><input placeholder="Search shops, products, categories..." value={query} onChange={e => setQuery(e.target.value)} /><button onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button></div><label className="market-filter"><MapPin size={17} /><select value={market} onChange={e => setMarket(e.target.value)}><option value="all">All markets</option>{markets.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></label></div>
    <div className="filter-row"><button className={category === 'All' ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory('All')}>All shops</button>{categories.map(c => <button key={c.name} className={category === c.name ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(c.name)}>{c.emoji} {c.name}</button>)}</div>
    <div className="results-caption"><div><strong>{filteredShops.length} shops to explore</strong><span> in {marketName}</span></div><span className="demo-disclaimer">Illustrative listings · Not verified</span></div>
    <div className="shop-grid explore-grid">{filteredShops.map(shop => <ShopCard key={shop.id} shop={shop} />)}</div>
    {filteredShops.length === 0 && <div className="empty-state"><Compass size={35} /><h3>No shops found just yet.</h3><p>Try another search or clear your filters.</p><button className="primary-button" onClick={() => { setQuery(''); setCategory('All'); setMarket('all') }}>Reset discovery <ArrowRight size={16} /></button></div>}
    <div className="map-demo"><div className="map-copy"><span className="section-kicker">A NEW WAY TO NAVIGATE</span><h2>Know the lane<br />before the lane knows you.</h2><p>Our vision: lane-level discovery that helps shoppers narrow down their next stop before entering the crowd.</p><span className="demo-disclaimer">Map and lane information are illustrative for this prototype.</span></div><div className="map-illustration"><div className="map-road road-a" /><div className="map-road road-b" /><div className="map-road road-c" /><div className="map-block block-a" /><div className="map-block block-b" /><div className="map-block block-c" /><div className="map-pin pin-a"><MapPin size={22} fill="currentColor" /></div><div className="map-pin pin-b"><MapPin size={22} fill="currentColor" /></div><div className="map-pin pin-c"><MapPin size={22} fill="currentColor" /></div><div className="map-caption"><Navigation size={15} /> SAMPLE MARKET MAP</div></div></div>
  </main>}

  {page === 'favourites' && (

  <main className="page-content">
    <div className="page-intro">
      <span className="section-kicker">YOUR PERSONAL COLLECTION</span>
      <h1>Your kind of <span>hidden gems.</span></h1>
      <p>Keep your favourite market discoveries together for your next visit.</p>
    </div>


{(() => {
  const favouriteShops = allShops.filter(shop =>
    saved.includes(shop.id)
  );

  if (favouriteShops.length === 0) {
    return (
      <div className="empty-state">
        <Heart size={35} />
        <h2>No favourites yet</h2>
        <p>Explore the markets and save shops you want to visit.</p>
        <button
          className="primary-button"
          onClick={() => navigate('explore')}
        >
          Explore shops <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="shop-grid explore-grid">
      {favouriteShops.map(shop => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  );
})()}

  </main>
)}


  {page === 'shop' && selectedShop && <main className="page-content shop-detail-page"><button className="back-link" onClick={() => navigate('explore')}>← Back to discovery</button><div className="shop-detail"><div className="shop-detail-image"><img src={selectedShop.image} alt={selectedShop.name} /><span className="sample-label">ILLUSTRATIVE LISTING</span></div><div className="shop-detail-copy"><span className="section-kicker">{markets.find(m => m.id === selectedShop.market)?.name}</span><h1>{selectedShop.name}</h1><div className="detail-rating">★ {selectedShop.rating} <span>Illustrative rating</span></div><p>{selectedShop.description}</p><div className="detail-price">{selectedShop.price}<small>Indicative price range</small></div><div className="detail-info"><p><MapPin size={17} /> {selectedShop.lane} · {selectedShop.landmark}</p><p><Clock size={17} /> Hours to be confirmed with shop</p><p><Tag size={17} /> {selectedShop.category}</p></div><div className="detail-products"><strong>What you might find</strong><div>{selectedShop.products.map(p => <span key={p}>{p}</span>)}</div></div><div className="detail-actions"><button className="primary-button" onClick={() => notify('Demo mode: verify the location before visiting.')}> <Navigation size={16} /> Get directions</button><button className="outline-button" onClick={() => toggleSave(selectedShop)}><Heart size={16} fill={saved.includes(selectedShop.id) ? 'currentColor' : 'none'} /> {saved.includes(selectedShop.id) ? 'Saved' : 'Save shop'}</button></div><p className="demo-disclaimer">This is an illustrative sample listing. Shop details, prices, ratings and locations are not verified.</p></div></div><section className="featured-section"><div className="section-heading"><div><span className="section-kicker">KEEP EXPLORING</span><h2>More places to discover.</h2></div></div><div className="shop-grid">{shops.filter(s => s.id !== selectedShop.id && s.category === selectedShop.category).slice(0, 3).map(s => <ShopCard key={s.id} shop={s} />)}</div></section></main>}

{page === 'list' && (

  <main className="page-content form-page">
    <div className="form-intro">
      <span className="section-kicker">JOIN YOUR LOCAL DISCOVERY MAP</span>
      <h1>Let the right people<br /><span>find your shop.</span></h1>
      <p>Create a demo listing and see how GullyGuide could help shoppers discover local businesses.</p>
      <div className="form-benefits">
        <span><CheckCircle2 size={16} /> A digital storefront</span>
        <span><CheckCircle2 size={16} /> More discoverability</span>
        <span><CheckCircle2 size={16} /> Simple listing plans</span>
      </div>
    </div>

```
{submitted ? (
  <div className="success-card">
    <div className="success-icon">
      <CheckCircle2 size={36} />
    </div>
    <span className="section-kicker">DEMO SUBMISSION COMPLETE</span>
    <h2>You're on the map!</h2>
    <p>
      <strong>{form.shopName}</strong> has been saved in this browser's
      local demo data. No real registration has occurred.
    </p>
    <button
      className="primary-button"
      onClick={() => {
        setSubmitted(false);
        navigate('home');
      }}
    >
      Back to GullyGuide <ArrowRight size={16} />
    </button>
  </div>
) : (
  <form
    className="owner-form"
    onSubmit={e => {
      e.preventDefault();

      if (
        !form.shopName.trim() ||
        !form.owner.trim() ||
        !form.location.trim()
      ) {
        notify('Please complete all required fields');
        return;
      }

      if (form.phone.replace(/\D/g, '').length < 10) {
        notify('Please enter a valid phone number');
        return;
      }

      try {
        const existing = JSON.parse(
          localStorage.getItem('gullyguide-user-shops') || '[]'
        );

        const newShop = {
          id: `user-${Date.now()}`,
          name: form.shopName.trim(),
          market: form.market,
          category: form.category,
          lane: form.location.trim(),
          location: form.location.trim(),
          price: 'Price to be confirmed',
          rating: 'New',
          description: `A ${form.category.toLowerCase()} shop in ${form.location.trim()}.`,
          products: [form.category],
          image: shops[0].image,
          owner: form.owner.trim(),
          phone: form.phone.trim(),
          plan: form.plan,
          createdAt: new Date().toISOString()
        };

        const updated = [...existing, newShop];

        localStorage.setItem(
          'gullyguide-user-shops',
          JSON.stringify(updated)
        );

        setUserShops(updated);
        setSubmitted(true);
        notify('Your demo shop has been added!');
      } catch {
        notify('Could not save your listing. Please try again.');
      }
    }}
  >
    <div className="form-heading">
      <span>01 / YOUR BUSINESS</span>
      <h2>Tell us about your shop.</h2>
      <p>All fields are for prototype demonstration only.</p>
    </div>

    <label>
      Shop name
      <input
        required
        value={form.shopName}
        onChange={e => setForm({ ...form, shopName: e.target.value })}
        placeholder="e.g. The Corner Store"
      />
    </label>

    <div className="form-two-col">
      <label>
        Owner name
        <input
          required
          value={form.owner}
          onChange={e => setForm({ ...form, owner: e.target.value })}
          placeholder="Your full name"
        />
      </label>

      <label>
        Phone number
        <input
          required
          type="tel"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          placeholder="10-digit number"
        />
      </label>
    </div>

    <label>
      Choose your market
      <select
        value={form.market}
        onChange={e => setForm({ ...form, market: e.target.value })}
      >
        {markets.map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>
    </label>

    <label>
      Lane or landmark
      <input
        required
        value={form.location}
        onChange={e => setForm({ ...form, location: e.target.value })}
        placeholder="Nearby landmark or lane"
      />
    </label>

    <label>
      Main category
      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        {categories.map(c => (
          <option key={c.name}>{c.name}</option>
        ))}
      </select>
    </label>

    <label>
      Listing plan
      <select
        value={form.plan}
        onChange={e => setForm({ ...form, plan: e.target.value })}
      >
        <option>Free</option>
        <option>Pro</option>
        <option>Premium</option>
      </select>
    </label>

    <div className="form-note">
      <CheckCircle2 size={17} />
      <p>Prototype only: no real shop registration, customer contact, or payment is processed.</p>
    </div>

    <button className="primary-button submit-button" type="submit">
      Create demo listing <ArrowRight size={17} />
    </button>
  </form>
)}
```

  </main>
)}
ṭ
  {page === 'pricing' && <main className="page-content pricing-page"><div className="page-intro centered-intro"><span className="section-kicker">A BUSINESS MODEL BUILT FOR LOCAL</span><h1>Simple plans.<br /><span>More discovery.</span></h1><p>Start free. Upgrade when visibility brings value. Proposed prototype pricing, not validated market rates.</p></div><div className="pricing-grid">{[{ name: 'Free', price: '₹0', subtitle: 'For getting started', features: ['Basic shop profile', 'Category & lane information', 'Market discovery listing'], featured: false }, { name: 'Pro', price: '₹499', subtitle: 'For growing local shops', features: ['Everything in Free', 'Enhanced shop profile', 'Featured placement concept', 'Promotional offers'], featured: true }, { name: 'Premium', price: '₹999', subtitle: 'For ambitious businesses', features: ['Everything in Pro', 'Premium visibility concept', 'Illustrative analytics', 'Campaign highlights'], featured: false }].map(plan => <article className={`pricing-card ${plan.featured ? 'pricing-featured' : ''}`} key={plan.name}>{plan.featured && <span className="popular-badge">MOST POPULAR</span>}<span className="plan-name">{plan.name}</span><div className="plan-price">{plan.price}<small>/month</small></div><p>{plan.subtitle}</p><div className="plan-divider" />{plan.features.map(f => <div className="plan-feature" key={f}><CheckCircle2 size={17} /> {f}</div>)}<button className={plan.featured ? 'primary-button plan-button' : 'outline-button plan-button'} onClick={() => { setForm(f => ({ ...f, plan: plan.name })); setSubmitted(false); navigate('list') }}>Choose {plan.name} <ArrowRight size={16} /></button></article>)}</div><div className="revenue-note"><div><span className="section-kicker">THE BIGGER PICTURE</span><h2>A neighbourhood business, at scale.</h2><p>For example, 500 paying shops at ₹499/month would generate ₹2,49,500 in monthly gross subscription revenue before costs. This is an illustrative scenario, not a forecast.</p></div><div className="revenue-number">₹2,49,500<small>Illustrative monthly gross revenue</small></div></div><section className="business-model-grid"><article><span>01</span><h3>Shop subscriptions</h3><p>Optional paid listings for enhanced profiles and greater visibility.</p></article><article><span>02</span><h3>Sponsored discovery</h3><p>Clearly labelled promotional placements for relevant searches.</p></article><article><span>03</span><h3>Local insights</h3><p>Potential aggregated demand insights for participating shop owners, with appropriate privacy safeguards.</p></article></section></main>}

  {toast && <div className="toast"><CheckCircle2 size={18} /> {toast}</div>}
</div>


)
}

function Footer({ navigate }) {
return <footer className="footer"><div className="footer-top"><button className="brand footer-brand" onClick={() => navigate('home')}><span className="brand-icon"><Compass size={22} /></span><span>gully<span className="brand-accent">guide</span><small>THE LOCAL SHOPPING MAP</small></span></button><p>Find your lane. Find your people. Find your shop.</p><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></div><div className="footer-bottom"><span>© 2026 GullyGuide · College project prototype</span><span>Illustrative listings · Verify details before visiting</span></div></footer>

}

export default App
