export type Story = {
  id: string; label: string; title: string; body: string; aside: string;
  image: { src: string; alt: string; credit: string; source: string };
  sources: { label: string; url: string }[];
  catalogueNumber?: number;
};
const chefSource='https://fiftycheyne.com/meet-steven-connolly-executive-chef/';
export const currentMenuUrl='https://fiftycheyne.com/menus/';
const restaurant={src:'/images/chelsea/restaurant.jpg',alt:'Tables and the bar at No. Fifty Cheyne',credit:'No. Fifty Cheyne · dining room',source:'https://fiftycheyne.com/'};
const chef={src:'/images/chelsea/steven-connolly.jpg',alt:'Executive chef Steven Connolly in the restaurant',credit:'No. Fifty Cheyne / Mooncake Pictures',source:chefSource};
const map={src:'/images/chelsea/cheyne-map.jpg',alt:'Illustrated map of Chelsea and the Thames',credit:'No. Fifty Cheyne · neighbourhood map',source:'https://fiftycheyne.com/contact/'};
const destination=encodeURIComponent('No. Fifty Cheyne, 50 Cheyne Walk, Chelsea, London SW3 5LR');
export const locationLinks=[
  {label:'Open map',url:`https://www.google.com/maps/search/?api=1&query=${destination}`},
  {label:'Walking directions',url:`https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=walking`},
  {label:'Public transport directions',url:`https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=transit`},
];

// Catalogue numbers preserve the owner's exact selection; they are not UI numbering.
export const discoveries: Story[]=[
  {id:'wine',catalogueNumber:1,label:'A different lunch',title:'Not the ladies who lunch.',image:restaurant,
    body:'Ladies who Shoot their Lunch. That is the name of a Shiraz on No. Fifty Cheyne’s sample wine list: the 2021 vintage from Fowles in Victoria, Australia. A rather different conversation starter from “red or white?”.',
    aside:'A wine-list discovery, not the wine selection for our evening.',
    sources:[{label:'The sample wine list',url:'https://fiftycheyne.com/wp-content/uploads/2026/08/WINE-LIST.pdf.pdf'}]},
  {id:'happy-kitchen',catalogueNumber:10,label:'A happy kitchen',title:'The first ingredient is a happy kitchen.',image:chef,
    body:'For Steven Connolly, good food begins with how people treat one another. A happy kitchen makes better food; better food makes happier guests.',
    aside:'His recipe starts with greeting colleagues, thanking them and making everyone feel included.',sources:[{label:'Steven, in his own words',url:chefSource}]},
  {id:'dogs',catalogueNumber:13,label:'An unexpected guest',title:'Your dog gets a bed. You get a chair.',
    image:{src:'/images/chelsea/chelsea-dog-day.jpg',alt:'Local dog owners outside the Saatchi Gallery',credit:'Chelsea Dog Day · King’s Road Partnership',source:'https://www.kingsroad.co.uk/experience/chelsea-dog-day-2026/'},
    body:'No. Fifty Cheyne offers visiting dogs their own bed and water bowl. Let the restaurant know when booking, keep them on a lead, and leave the chairs and table service to the humans.',
    aside:'The photograph shows local dog owners at Chelsea Dog Day. Pet arrangements for our own evening are not confirmed.',sources:[{label:'The restaurant’s dog policy',url:'https://fiftycheyne.com/contact/'}]},
  {id:'seasonal-pie',catalogueNumber:6,label:'A change of season',title:'Same pie. A different season.',image:restaurant,
    body:'The chicken-and-leek pie is one of the restaurant’s bestsellers. Connolly plans to change its filling through the year, following what the seasons bring.',
    aside:'A familiar dish with room to change. This is a restaurant story, not our agreed dinner menu.',sources:[{label:'The chef on seasonal cooking',url:chefSource}]},
  {id:'open-grill',catalogueNumber:14,label:'At the fire',title:'The menu has a warm centre.',image:restaurant,
    body:'At No. Fifty Cheyne, the open grill is more than a backdrop: the restaurant describes its changing British menu as built around it. The cooking is part of the room.',
    aside:'An open kitchen, good produce, and very little distance between the cooking and the evening.',sources:[{label:'Inside No. Fifty Cheyne',url:'https://fiftycheyne.com/'}]},
  {id:'menu-2019',catalogueNumber:33,label:'A taste of 2019',title:'Scallops. Served cold.',image:restaurant,
    body:'In October 2019, a reviewer found scallops served cold in cucumber soup, followed by courgette flowers stuffed with aubergine caviar. A small glimpse of the restaurant’s earlier chapter, under Iain Smith.',
    aside:'From a 2019 review, not today’s menu or our dinner. The photograph shows the dining room.',sources:[{label:'Read the 2019 account',url:'https://lvbmag.com/2019/10/19/no-50-cheyne-chelsea-london-iain-smith/'}]},
];
export const practicalInformation: Story[]=[
  {id:'chef',label:'The chef',title:'Steven Connolly',image:chef,
    body:'Executive chef Steven Connolly brings around twenty years of experience, including Ronnie Scott’s, The Ned and The Orrery. His cooking starts with carefully sourced ingredients, clear flavours and generous hospitality.',
    aside:'Seasonal produce, thoughtful technique and dishes that feel familiar without being overcomplicated.',sources:[{label:'Meet the executive chef',url:chefSource}]},
  {id:'restaurant',label:'The restaurant',title:'No. Fifty Cheyne',image:restaurant,
    body:'A neighbourhood restaurant on Cheyne Walk, beside the Thames in Old Chelsea. British produce, a changing seasonal menu and an open kitchen give it its character. Upstairs, the Drawing Room looks towards the river, Embankment Gardens and Albert Bridge.',
    aside:'Warm dining rooms, a bar and a riverside setting. Our evening begins at 19:00 on Wednesday 4 November.',sources:[{label:'Visit the restaurant',url:'https://fiftycheyne.com/'},{label:'Current menu',url:currentMenuUrl}]},
  {id:'location',label:'Getting there',title:'50 Cheyne Walk',image:map,
    body:'No. Fifty Cheyne, 50 Cheyne Walk, Chelsea, London SW3 5LR. Wednesday 4 November 2026, 19:00.',
    aside:'Open the map or choose walking or public transport directions below. Add your starting point in Maps for a route and journey time. The illustrated map is for context; use the live directions for navigation.',sources:locationLinks},
];
export const stories=[...discoveries,...practicalInformation];
export const portals=[
  {object:'glass',prompt:'Swirl a little',label:'Explore the wine',stories:[0]},
  {object:'flame',prompt:'Follow the warmth',label:'Discover the kitchen',stories:[1]},
  {object:'ring',prompt:'An unexpected guest',label:'Discover the dog welcome',stories:[2]},
  {object:'leaf',prompt:'Turn over a leaf',label:'Discover the seasonal pie',stories:[3]},
  {object:'ember',prompt:'At the fire',label:'Discover the open grill',stories:[4]},
  {object:'flower',prompt:'A taste of 2019',label:'Discover the historical menu',stories:[5]},
];
