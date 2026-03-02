# 🧪 Incubyte Pokémon Kata – TDD-Driven Pokédex

Live Demo: **[https://incubyte-pokemon-kata.vercel.app/]**

---

## 📌 Overview

This project is a modern Pokédex application built using a **Test-Driven Development (TDD)** approach.

The primary focus of this implementation was not just building UI, but:

- Writing failing tests first
- Designing architecture around testability
- Separating server state from UI state
- Building scalable folder structure
- Ensuring production-ready code quality

This project demonstrates engineering discipline rather than just feature implementation.

---

## 🧠 Core Engineering Focus

## ✅ Test-Driven Development (TDD)

The development process followed:

1. 🔴 Write a failing test
2. 🟢 Implement the minimal logic to pass
3. 🔵 Refactor safely with test coverage

This approach was applied across:

- API layer
- Redux slices
- Page rendering
- Error states
- Retry logic
- Navigation behavior
- Tab switching
- Skeleton states

---

## 🛠 Tech Stack

### Core

- React 18
- TypeScript
- Vite

### State & Data

- Redux Toolkit
- RTK Query
- MSW (Mock Service Worker)

### Styling

- SCSS Modules
- Centralized variables & mixins

### Testing

- Vitest
- React Testing Library
- MSW

### Visualization

- Recharts (Radar chart for stats visualization)

---

## 🏗 Architecture

This project follows a **feature-first, scalable architecture**.

src/
│
├── app/ → Redux store setup
├── features/
│ └── pokemon/
│ ├── api/ → RTK Query API layer
│ ├── components/ → UI components (grouped by feature)
│ │ └── detail/ → Detail page components
│ ├── pages/ → Route-level components
│ ├── store/ → UI slice state
│ └── types/ → TypeScript types
│
├── styles/ → Global SCSS variables & mixins
├── constants.ts

---

## 🧪 Testing Strategy (TDD-Centric)

### 1️⃣ API Layer Testing

- Used MSW to mock PokéAPI endpoints
- Tested success & failure scenarios
- Verified caching behavior

### 2️⃣ Page-Level Tests

Covered:

- Loading skeleton
- Error state
- Retry button behavior
- Back navigation
- Tab switching
- Species data rendering

### 3️⃣ Redux Slice Tests

- Filter updates
- Reset behavior
- Clear all behavior

### 4️⃣ UI Interaction Tests

- Select dropdown behavior
- Filter application
- Tab state changes

All tests are isolated, network-independent, and deterministic.

---

## 🌐 API Design

The application integrates 4 API interactions:

---

### 1️⃣ Pokémon List

```code
GET https://pokeapi.co/api/v2/pokemon
```

Used for:

- Paginated listing
- Search and filter operations

---

### 2️⃣ Pokémon List Enrichment

Each Pokémon in the list is enriched with:

```bash
GET https://pokeapi.co/api/v2/pokemon/:name
```

Trade-off:

- Increased API calls
- Significantly improved UI richness

---

### 3️⃣ Pokémon Details

```bash
GET https://pokeapi.co/api/v2/pokemon/:name
```

Used for:

- Hero section
- Stats
- Abilities
- Height / Weight
- Official artwork

---

### 4️⃣ Pokémon Species

```bash
GET https://pokeapi.co/api/v2/pokemon-species/:name
```

Used for:

- Description
- Egg groups
- Gender ratio
- Breeding details

Separation ensures:

- Clear data boundaries
- Maintainable components
- Predictable re-renders

---

## 🧩 State Management Philosophy

We strictly separated:

### Server State → RTK Query

- Handles caching
- Loading states
- Error states
- Refetch logic

### UI State → Redux Slice

- Filters
- Sorting
- Toolbar state
- Search state

This separation improves:

- Testability
- Predictability
- Performance
- Refactor safety

---

## 📱 Responsiveness

The application is fully responsive:

- Desktop
- Tablet
- Mobile

Approach:

- SCSS breakpoints via centralized variables
- Grid + Flexbox
- Responsive chart rendering
- Layout reordering via CSS only

---

## ⚖ Trade-offs

### 🔹 Enriched List Strategy

More API calls, but better UI.

### 🔹 Evolution Tab

Currently placeholder.
Future improvement: integrate evolution-chain endpoint.

### 🔹 No UI Framework

SCSS Modules chosen for:

- Precision
- Isolation
- Design control

---

## 🤖 AI Usage

AI was used for:

- Architectural validation
- Refactoring suggestions
- Test coverage improvement ideas
- Minor SCSS refinements

All implementation logic, structure, debugging, and integration decisions were manually designed and implemented.

---

## 🚀 Setup Instructions

### Clone the repo

```bash
git clone
cd incubyte-pokemon-kata
```

```bash
## Install dependencies
yarn install
```

```bash
## Run the tests
yarn test
```

```bash
## Start the development server
yarn dev
```

---

## 📸 Screenshots

_Add screenshots here_

- List Page
- Detail Page
- Mobile View

---

## 🏁 Deployment

Live URL:

👉 **[ADD_LIVE_URL_HERE]**

---

## 🎯 Final Thoughts

This project emphasizes:

- TDD-first mindset
- Clean architecture
- Maintainable folder structure
- Type-safe code
- Scalable design
- Production-level discipline

The focus was not just “making it work” —  
but ensuring it is **testable, extensible, and professionally structured**.
