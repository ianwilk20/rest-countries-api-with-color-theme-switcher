# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [Developer notes](#developer-notes)


## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Screenshot

Mobile:

![Mobile home page light mode](/design/completed/mobile-home-light.png)
![Mobile home page dark mode](/design/completed/mobile-home-dark.png)
![Mobile details page light mode](/design/completed/mobile-details-light.png)
![Mobile details page dark mode](/design/completed/mobile-details-dark.png)


Desktop:

![Desktop home page light mode](/design/completed/desktop-home-light.png)
![Desktop home page dark mode](/design/completed/desktop-home-dark.png)
![Desktop details page light mode](/design/completed/desktop-details-light.png)
![Desktop details page dark mode](/design/completed/desktop-details-dark.png)


### Links

- [Solution URL](https://github.com/ianwilk20/rest-countries-api-with-color-theme-switcher)
- [Live Site URL](https://country-finder-ianwilk20.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Tailwind](https://tailwindcss.com/) - Styles
- [Radix Components](https://www.radix-ui.com/) - For the dropdown


### What I learned

I learned some features of the new Tailwind v4 (via the Vite plugin). Rather than having a configuration file, configuration can now be baked into the main css file of the project (index.css for this one). Any customizations can be added to  `@theme` ex:

```CSS
@theme {
    --font-display: 'Nunito Sans', system-ui, Avenir, Helvetica, Arial,
        sans-serif;
    --breakpoint-xs: 500px;
    --color-dark-gray-primary: var(--bg-dark-gray);
    --color-dark-gray-secondary: var(--bg-lighter-dark-gray);
    --color-dark-gray-secondary-hover: var(--bg-lightest-dark-gray);
}
```

A neat thing that was simpler than I imagined, was how to add a dark mode to the site. With Tailwind v4, you can add `@custom-variant dark (&:where(.dark, .dark *));` to your main css file so that you can toggle dark mode manually, which is how it should be done for this app. Then, for any element you want to define a dark variant for you can use the `dark:*` utility, ex. `dark:text-white`.

While exploring ways to optimize the app, I learned the basics of how React renders components and the purpose of the virtual DOM. Essentially, the virtual DOM was created to solve performance problems caused by directly manipulating the real DOM. When React renders a component, it generates both the previous and current states in the virtual DOM. It then compares these states through a process called 'diffing' to identify the necessary changes. Finally, it updates only the parts of the real DOM that need modification to reflect the new state - this process is called 'reconciliation'.


Optimizations:
- Wrapping my CountryTile component with React.memo to prevent unnecessary re-renders. Doing so will ensure that the component only re-renders when its props change.
- Using the `loading="lazy"` attribute on <img> tags to defer loading images until they are close to being in the viewport. This has shown to significantly reduce the initial load time for the images on the homepage, which were all previously loading sequentially and took up too 100 seconds to load.
- Potential improvement: For large lists, using a virtualization library like react-window or react-virtualized. I read that these libraries only render the items that are currently visible in the viewport, which can greatly improve performance.
- Overall improvement: Use babel-plugin-react-compiler

### Continued development

I'd like to continue to learn about React Router and the capabilites of the Radix UI component library. I also read about the [babel-plugin-react-compiler](https://www.npmjs.com/package/babel-plugin-react-compiler) recently and how it is able to optimize React apps, which can mean foregoing the memoization of components. I haven't used it for this project, but I did quickly install it and tested it out and it makes using component memoization useless because it applies that and other optimizations where needed. To visualize the rerenders and my comparison I used the [React Scan](https://github.com/aidenybai/react-scan) tool.

### Useful resources

- [CSS Grid Layout Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - These docs on the grid layout helped me with the desktop layout
- [Select component](https://www.radix-ui.com/themes/docs/components/select) - These docs for the select component helped in designing the region dropdown for the homepage
- [Tailwind - Dark mode](https://tailwindcss.com/docs/dark-mode) - Tailwind docs on how to set up dark mode for a project

### Developer notes
Project bootstrapped by:
- [Bootstrap from Vite React-TS project](https://tailwindcss.com/docs/installation/using-postcss)
  - npm create vite@latest rest-countries -- --template react-ts
  - cd rest-countries
  - npm install
- [Install Tailwind w/ Vite](https://tailwindcss.com/docs/installation/using-vite) 
  - npm install -D tailwindcss @tailwindcss/vite
  - Add tailwind plugin to vite.config.ts
  - Add tailwind css import to index.css