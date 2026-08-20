## Folder Structure
- 'src/components/'
- 'src/layouts/'
    - site layouts where pages live in
- 'src/content/'
    - images for the site organized by folder for each page that contain images. Folder names correspond with page name they're associated with. For pages with a gallery, not that the order they show up in the folder will be the order they show up on the built site. Rename them alphabetically/numerically to customize
- 'src/lib/'
    - static photo fetching functionality lives here
- 'src/content/navbar'
    - navigation
- 'src/assets/'
    - bgs, landing page pg, and imported fonts
- 'src/pages'
    - site pages


## Image Galleries

The base module is Gallery.astro. Any page that features an image gallery layout can use it with: 

```
	<Gallery
		folder="illustrations"
		title="Illustrations"
		description="insert description here"
	/>
```

the folder field refers to src/content/folder. Note: The image gallery is a solid section of images with no text in between images. Would need to hardcode each page or make a complicated refactor if otherwise.

Gallery.astro refers to Gallery.tsx to render the gallery layout with React. React can probably be removed here since lightbox and grid functionality is demonstrated here: https://github.com/kydecker/astro-photo-grid but at the time, I wanted a way to easy switch between row and column layout. I may just want column layout no, but it's ok to leave as is until refactor is needed. The React lightbox seems much faster as well.

It uses a process called Hydration, which improves SSR (Server-Side Rendering) performance and interactivity. Hydration is the process of attaching React’s event listeners and state to server-rendered HTML so the UI becomes interactive without re-rendering the DOM.

At build time
- getPhotosFromContent() filters and creates the photo array
- Astro imports image metadata and generates their URLs
- Gallery gets that array 
At runtime
- dimensions and page calculations occur. React-photo-album need's browser's container to determine column count and placement. 

Technically could reduce client side work by replacing client:load with client:visible or client:idle, but still needs client side JS to recompute responsive layouts. 
Or, use a regular html/css grid to run desktop/mobile layouts but we'd lose measurement based packing and we'd need the lightbox to hydrate separately anyway

UPDATE 8/19:
Image gallery functionality switched to astro-masonry package, which uses no react. Only minimal client side javascript to figure out the layout. It works much better with Astro's <Image> component and loads all of the images faster.
Gallery.tsx is no longer needed.

At build time
- getPhotosFromContent() filters and creates the photo array
- Astro imports images metadata and uses it to display them in Gallery.astro
At runtime
- dimensions and page calculations occur. Astro-masonry reads browser's container to determine column count and placement. 

UPDATE 8/19:
Switched back to react method because it calculates the masonry layout slightly better. The Astro method would sometimes not make the bottom set of images even, and have some columns of images longer than others by 2 images