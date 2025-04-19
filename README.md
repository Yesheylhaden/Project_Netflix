# Netflix Clone - Web101 Assign (kinda rushed)

This is like a fake Netflix site made for Web101 class. I used React and Vite (first time using Vite tbh). It shows how to use routing, components, api call and all that. Not perfect but works.

## What it can do

Some basic things:

- Watch movies and shows  
- Can view trailer (if it works)  
- Looks ok in phone and PC  
- Scroll by categories  

## How to run it

### Things you need:

- Node.js v14 or more  
- npm or yarn  

### Steps:

1. Clone the project

```
git clone https://github.com/Yesheylhaden/Project_Netflix
cd netflix-clone
```

2. Install packages

```
npm install
```

3. Make a `.env` file and add your tmdb api key

```
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start dev server

```
npm run dev
```

5. Open the link in terminal. If blank screen shows, check api key or errors.

## How the site works

I used React Router for routes:

- `/` is home page with banner and rows  
- `/search` is for search results  

## About the components

### Layout Components

- `Navbar`: top bar with logo and search  
- `Banner`: big banner at top with movie info

### Content Components

- `Row`: movie posters in horizontal row, can scroll  

## Component Explain

### Banner

**What it does**: show one featured movie or show at the top  
**Props**:  
- `fetchUrl` – to get data for banner  

**Example**:

```jsx
<Banner fetchUrl={requests.fetchNetflixOriginals} />
```

### Row

**What it does**: show one category like Trending, Netflix Originals, etc  
**Props**:  
- `title` – text for row title  
- `fetchUrl` – get data for that row  
- `isLargeRow` – optional, makes posters bigger

**Example**:

```jsx
<Row 
  title="NETFLIX ORIGINALS" 
  fetchUrl={requests.fetchNetflixOriginals}
  isLargeRow
/>
```

## API part

I used TMDB API to get movie and tv show data. The request links are in `src/api/requests.js`. You need your own API key or it won’t work. Took me a while to figure that out.

## Responsive design

I tried to make it look okay on all screen sizes:

- Mobile: poster smaller, stacked layout  
- Tablet: medium size  
- Desktop: full layout with rows scrolling side  

Tested on browser inspect tool, not real phone.

## Things to add later

Maybe will try to add these in next version or next assignment:

- Login/signup  
- Save to "My List"  
- Detail page for each show  
- Better filter and sort  
- Maybe a loading spinner  

---

Not 100% perfect but it works mostly. If it breaks, check console or API key.
