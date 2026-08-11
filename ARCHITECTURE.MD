## Folder Layout
- 'src/components/'
- 'src/layouts/'
    - universal website layouts where pages live in
    - Landing.astro is for the landing page, which is different than the rest
- 'src/content/'
    - images for the site organized by folder for each page that requires a gallery. Folder names correspond with page name it's associated with
- 'src/lib/'
    - photo fetching functionality lives here
- 'src/content/navbar'
    - navigation
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

the folder field refers to src/content/folder. Note: The image gallery is a solid section of images with no text in between images. Would need to hardcode or make a complicated refactor if otherwise.

Gallery.astro refers to Gallery.tsx to render the gallery layout with React. React can probably be removed here since lightbox and grid functionality is demonstrated here: https://github.com/kydecker/astro-photo-grid but at the time, I wanted a way to easy switch between row and column layout. I may just want column layout no, but it's ok to leave as is until refactor is needed. The React lightbox seems much faster as well.

It uses a process called Hydration, which improves SSR (Server-Side Rendering) performance and interactivity. Hydration is the process of attaching React’s event listeners and state to server-rendered HTML so the UI becomes interactive without re-rendering the DOM.