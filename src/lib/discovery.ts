export const discoveries = [
  {
    id: 'wine', image: { src: '/images/chelsea/restaurant.jpg', alt: 'Tables and the bar at No. Fifty Cheyne', credit: 'No. Fifty Cheyne · dining room', source: 'https://fiftycheyne.com/' }, object: 'glass', prompt: 'Swirl a little', label: 'Explore the wine',
    title: 'Not the ladies who lunch.',
    body: 'Ladies who Shoot their Lunch. That is the name of a Shiraz on No. Fifty Cheyne’s wine list: the 2021 vintage from Fowles in Victoria, Australia. A rather different conversation starter from “red or white?”.',
    aside: 'A discovery from the restaurant’s sample wine list, not the wine selection for our evening.',
    sources: [{ label: 'Find it on the wine list', url: 'https://fiftycheyne.com/wp-content/uploads/2026/08/WINE-LIST.pdf.pdf' }],
  },
  {
    id: 'chef', image: { src: '/images/chelsea/steven-connolly.jpg', alt: 'Steven Connolly seated in the restaurant', credit: 'No. Fifty Cheyne / Mooncake Pictures', source: 'https://fiftycheyne.com/meet-steven-connolly-executive-chef/' }, object: 'flame', prompt: 'Follow the warmth', label: 'Meet the chef',
    title: 'A cooking lesson. A twenty-year detour.',
    body: 'Steven Connolly took a catering course at fourteen or fifteen to learn to cook for himself. Kitchens alongside his A-levels became a career taking in Ronnie Scott’s, The Ned and The Orrery. Now he is executive chef here. His indispensable ingredient? Butter.',
    aside: 'His chicken and leek pie changes its filling with the seasons. Familiar, but never quite the same.',
    sources: [{ label: 'Meet Steven, in his own words', url: 'https://fiftycheyne.com/meet-steven-connolly-executive-chef/' }],
  },
  {
    id: 'dogs', image: { src: '/images/chelsea/chelsea-dog-day.jpg', alt: 'Visitors with a dog outside the Saatchi Gallery', credit: 'Chelsea Dog Day · King’s Road Partnership', source: 'https://www.kingsroad.co.uk/experience/chelsea-dog-day-2026/' }, object: 'ring', prompt: 'An unexpected guest', label: 'Discover Chelsea Dog Day',
    title: 'Your dog gets a bed. You get a chair.',
    body: 'No. Fifty Cheyne offers visiting dogs their own bed and water bowl. Outside, the neighbourhood takes this affection seriously: Chelsea Dog Day on 3 October 2026 brought together more than 75 businesses in support of Pets as Therapy.',
    aside: 'A little local hospitality. Pet arrangements for our own evening are not confirmed.',
    sources: [{ label: 'The restaurant’s welcome', url: 'https://fiftycheyne.com/contact/' }, { label: 'Chelsea Dog Day', url: 'https://www.kingsroad.co.uk/experience/chelsea-dog-day-2026/' }],
  },
  {
    id: 'neighbours', image: { src: '/images/chelsea/cheyne-map.jpg', alt: 'Illustrated map of Chelsea and the Thames from the restaurant website', credit: 'No. Fifty Cheyne · neighbourhood map', source: 'https://fiftycheyne.com/contact/' }, object: 'leaf', prompt: 'Turn over a leaf', label: 'Discover an unlikely neighbour',
    title: 'Down the road, a wombat.',
    body: 'At number 16 Cheyne Walk, Dante Gabriel Rossetti’s household included wombats, wallabies and armadillos. His sister Christina even wrote a poem about the wombat. Some neighbourhoods have always attracted people who do things differently.',
    aside: 'A story from the street, not the restaurant. Rossetti lived at number 16; we are meeting at number 50.',
    sources: [{ label: 'The Rossetti Archive', url: 'https://rossettiarchive.iath.virginia.edu/docs/nd497.r8.m33.rad.html' }],
  },
] as const;
export type Discovery = typeof discoveries[number];
