Introduction
CompoDex is a production-ready UI kit for serious Pokédex apps, built on shadcn/ui to handle complex Pokémon data with speed, consistency, and full customization.

​
What is compo/dex?
compo/dex is a component library built on top of shadcn/ui, designed to solve a very specific problem: rendering Pokémon data in a clean, scalable, and maintainable way. Whether you’re building a Pokédex app, a team builder, or any Pokémon-related project, compo/dex provides the UI building blocks you need.
compo/dex follows the shadcn/ui model — you own the code. Components are copied directly into your project, so you can modify anything without being locked into a library version.
​
Why compo/dex?
Building a Pokédex seems simple at first — display some cards with names and images, right? But as your project grows, you quickly run into challenges:
Inconsistent layouts across different views (grid, list, detail pages)
Type system complexity with 18+ Pokémon types, each needing proper styling
Data presentation for stats, abilities, evolutions, and move sets
Responsive design that works on mobile and desktop
Accessibility for screen readers and keyboard navigation
compo/dex solves these problems by providing pre-built, composable components specifically designed for Pokémon data. Instead of reinventing type badges, stat bars, or card layouts for every project, you get battle-tested components that handle the complexity for you.
​
Who is this for?
compo/dex is for anyone building Pokémon-related applications who wants to save time and ensure consistent, high-quality UI. Whether you’re:
Pokémon app developers who want to focus on features, not UI boilerplate
Learning projects where you want production-quality components without the complexity
Portfolio projects that need polished, accessible interfaces
Hackathons where speed matters but quality can’t suffer
If you’re building anything Pokémon-related in React, compo/dex gets you from zero to production-ready UI in minutes, not hours.
​
Philosophy
compo/dex follows these core principles:
Pokémon-first design — Components understand Pokémon data structures out of the box. You don’t need to adapt generic components to fit Pokémon-specific patterns.
Composability — Mix and match components to build any layout you need. Each component does one thing well and works alongside the others.
Accessibility — Semantic HTML, ARIA labels, and keyboard navigation are built in. Accessible by default, not as an afterthought.
Type safety — Full TypeScript support with proper type inference for Pokémon data. Your editor knows what props each component accepts.
Customizable — Like shadcn/ui, you copy the components and own them. Modify anything: styles, behavior, structure.
Because you own the component code, you can adapt any component to your specific data source — whether you’re using the PokéAPI, a custom backend, or static data.

