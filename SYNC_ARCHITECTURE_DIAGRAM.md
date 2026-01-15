# Diagram Alur Sinkronisasi Data

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Single User)                     │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    localStorage                          │   │
│  │  ┌────────────┐  ┌──────────────┐  ┌───────────────────┐│   │
│  │  │ cartsData  │  │customersData │  │businessProfile   ││   │
│  │  │            │  │              │  │                   ││   │
│  │  │[cart data] │  │[cust data]   │  │[profile data]    ││   │
│  │  └────────────┘  └──────────────┘  └───────────────────┘│   │
│  └──────────────────────────────────────────────────────────┘   │
│         ↑                                        ↓                │
│         │ save (setItem)                  load (getItem)        │
│         │                                        │                │
│  ┌──────┴──────────────────────────────────────┴─────────┐      │
│  │            React Components                           │      │
│  │                                                       │      │
│  │  ┌─────────────────────┐    ┌──────────────────────┐│      │
│  │  │   Admin.tsx         │    │   Catalog.tsx        ││      │
│  │  │                     │    │                      ││      │
│  │  │ useEffect hooks:    │    │ useEffect hooks:     ││      │
│  │  │ - carts → save      │    │ - load carts         ││      │
│  │  │ - customers → save  │    │ - listen storage     ││      │
│  │  │ - profile → save    │    │ - render with data   ││      │
│  │  │                     │    │                      ││      │
│  │  │ Triggers:           │    │ Triggers:            ││      │
│  │  │ - Edit cart         │    │ - Component mount    ││      │
│  │  │ - Edit customer     │    │ - Storage change     ││      │
│  │  │ - Edit profile      │    │                      ││      │
│  │  │ - Add items         │    │                      ││      │
│  │  └─────────────────────┘    └──────────────────────┘│      │
│  │                                                       │      │
│  └───────────────────────────────────────────────────────┘      │
│         ↑                                          ↓             │
│         │                                          │             │
│    Admin Page                                Landing Page        │
│    (2 tabs/windows bisa berjalan)                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Flow Diagram: Admin → Landing Page

```
┌─────────────────────────────────────────────────────────────────┐
│  ADMIN PANEL (Settings Tab)                                     │
│                                                                  │
│  User: Ubah harga → Click "Simpan"                             │
│         ↓                                                        │
│  handleSavePricing() dipanggil                                 │
│         ↓                                                        │
│  setCarts([...carts.map(c => ...)])                            │
│         ↓                                                        │
│  [carts] state berubah                                         │
│         ↓                                                        │
└─────────────────────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────────────────────┐
│  useEffect(() => { ... }, [carts])  ← Dependency on carts     │
│                                                                  │
│  Otomatis triggered karena [carts] berubah                     │
│         ↓                                                        │
│  localStorage.setItem('cartsData', JSON.stringify(carts))      │
│         ↓                                                        │
│  Data tersimpan di localStorage                                │
│         ↓                                                        │
└─────────────────────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────────────────────┐
│  LANDING PAGE (Catalog Component)                              │
│                                                                  │
│  useEffect(() => { ... }, [])  ← Run saat component mount    │
│         ↓                                                        │
│  const savedCartsData = localStorage.getItem('cartsData')      │
│         ↓                                                        │
│  JSON.parse(savedCartsData)                                    │
│         ↓                                                        │
│  setCarts(cartsWithIcons) dengan data terbaru                  │
│         ↓                                                        │
│  Component re-render dengan harga terbaru                      │
│         ↓                                                        │
│  ✅ Landing page menampilkan harga yang sudah diubah          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Multi-Tab Synchronization

```
┌──────────────────┐         ┌──────────────────┐
│  TAB A           │         │  TAB B           │
│  Landing Page    │         │  Admin Panel     │
│                  │         │                  │
│  Catalog showing │         │  User edit price │
│  harga lama      │         │  Click Simpan    │
└──────────────────┘         └──────────────────┘
         ↑                            │
         │                            ↓
         │                   saveToLocalStorage()
         │                            │
         └────← storage event ◄─────┘
              (automatic update)
         
         ↓
    
    Catalog re-renders dengan harga baru ✓
```

## Data Flow Chart

```
Admin Actions → State Update → useEffect → localStorage → 
Landing Page (useEffect) → State Update → Re-render → Display Updated Data
```

## Storage Event Listener

```
┌─ Admin Tab (writes to localStorage)
│  setCart() → useEffect → localStorage.setItem()
│
├─→ storage event fired to ALL other tabs
│
└─→ Landing Page Tab (listens to storage)
   handleStorageChange() → loadCartsData() → setState → re-render
```

## Data State Hierarchy

```
Admin.tsx                          Catalog.tsx
│                                  │
├─ carts (state)                  ├─ carts (state)
│  │                              │  │
│  └─ useEffect                   │  └─ useEffect (on mount)
│     └─ save to localStorage     │     └─ load from localStorage
│                                 │
├─ customers (state)              ├─ storage listener
│  │                              │  └─ react to cartsData changes
│  └─ useEffect                   │
│     └─ save to localStorage     └─ display cart data in UI
│
└─ businessProfile (state)
   │
   └─ useEffect
      └─ save to localStorage
```

## Key Points

```
1. WRITE (Admin)
   Data changes → setState → useEffect triggers → localStorage.setItem()

2. READ (Landing Page)
   Component mounts → useEffect → localStorage.getItem() → setState

3. SYNC (Multi-tab)
   localStorage change → storage event → useEffect → setState

4. ERROR HANDLING
   JSON.parse errors → catch block → use default data → no crash
```

## Timeline Example: Ubah Harga Gerobak

```
Time    Action                              Storage        Landing Page
────    ──────                              ───────        ────────────
t0      User opens Admin Panel              empty          showing default
t1      User opens Landing Page                            cart prices
t2      User clicks "Ubah Harga"            empty          (default price)
t3      User enters new price               empty          (default price)
t4      User clicks "Simpan"                empty          (default price)
t5      handleSavePricing() executes        empty          (default price)
t6      setCarts() updates state            empty          (default price)
t7      useEffect on carts triggers         ✓ SAVED        (default price)
t8      localStorage.setItem() called       ✓ SAVED        (default price)
t9      storage event fires                 ✓ SAVED        (default price)
t10     Landing page detects change        ✓ SAVED        loading...
t11     loadCartsData() executes           ✓ SAVED        setting state...
t12     setCarts() with new data           ✓ SAVED        ✓ UPDATED!
t13     Landing page re-renders            ✓ SAVED        ✓ NEW PRICE!
```

Sempurna! Data sudah tersinkronisasi! 🎉
