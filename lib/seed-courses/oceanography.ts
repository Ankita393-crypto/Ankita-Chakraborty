import type { SeedCourse } from "../seed-types";

// Standard physical-geography and marine-science material as found in
// introductory oceanography textbooks.
export const oceanography: SeedCourse = {
  slug: "oceanography-basics",
  title: "Oceanography Basics",
  description:
    "A complete introduction to ocean science: ocean structure, the seafloor, seawater chemistry, currents, waves and tides, marine life, climate links, and human impact.",
  category: "general",
  tier: 3,
  price_inr: 499,
  lessons: [
    {
      title: "The World Ocean and Its Vertical Structure",
      content: `Oceans cover about 71 percent of the Earth's surface and hold roughly 97 percent of its water. Geographers recognise five oceans — Pacific, Atlantic, Indian, Southern, and Arctic — with the Pacific alone larger than all land on Earth combined. The average depth of the ocean is close to 3,700 metres.

Scientists divide the water column into light-based zones. The sunlight (euphotic) zone reaches to about 200 metres and is the only layer where there is enough light for photosynthesis. Below it, the twilight (dysphotic) zone extends to roughly 1,000 metres, where light is too faint for plants but many animals still live. Beyond 1,000 metres lies the midnight (aphotic) zone of permanent darkness, which makes up the great majority of ocean volume.

Temperature also structures the ocean vertically. A warm, wind-stirred surface layer sits above the thermocline — a layer where temperature drops rapidly with depth — and beneath the thermocline the deep ocean remains uniformly cold, typically around 0–4 °C regardless of latitude.

Pressure increases by about one atmosphere for every 10 metres of depth, so organisms and instruments at 4,000 metres experience roughly 400 times surface pressure. This is why deep-sea exploration requires specially engineered vehicles, and why the deep ocean remained almost unknown until the twentieth century.`,
    },
    {
      title: "The Ocean Floor and Plate Tectonics",
      content: `The seafloor has a geography as varied as land. Continental shelves — the shallow, gently sloping submerged edges of continents — give way at the shelf break to the steeper continental slope, which descends to the vast, flat abyssal plains lying mostly between 3,000 and 6,000 metres deep.

Mid-ocean ridges form the longest mountain chain on Earth, winding some 65,000 kilometres through all the ocean basins. At these ridges, tectonic plates move apart and molten rock rises to create new oceanic crust — the process of seafloor spreading. The Mid-Atlantic Ridge, for example, is widening the Atlantic by a few centimetres per year, roughly the speed at which fingernails grow.

Where an oceanic plate collides with another plate, the denser oceanic plate bends downward and sinks into the mantle at a subduction zone, forming deep ocean trenches. The Mariana Trench in the western Pacific contains the deepest known point in the ocean, the Challenger Deep, close to 11,000 metres below sea level — deeper than Mount Everest is tall.

Because new crust forms at ridges and old crust is destroyed at trenches, the seafloor is geologically young: nowhere is oceanic crust older than about 200 million years, even though the oceans themselves are billions of years old. Magnetic stripes recorded in the spreading seafloor provided decisive evidence for plate tectonics in the 1960s.`,
    },
    {
      title: "Seawater: Salinity and Chemistry",
      content: `Seawater is about 3.5 percent dissolved salts by weight, expressed as an average salinity of 35 parts per thousand (ppt). The two most abundant dissolved ions are chloride and sodium, which together make up over 85 percent of the dissolved material — the reason seawater tastes of common salt.

Salinity varies geographically in understandable ways. It is higher where evaporation is strong and rainfall low (the Red Sea reaches about 40 ppt) and lower where rivers, rain, or melting ice add fresh water (the Baltic Sea can fall below 10 ppt). In the open ocean, values mostly stay between 33 and 37 ppt.

Dissolved gases matter as much as salts. Oxygen enters at the surface from the atmosphere and from photosynthesis, and is consumed at depth by respiration and decay — producing an oxygen-minimum layer at intermediate depths in many regions. Cold water holds more dissolved gas than warm water, which is why polar waters are rich in oxygen.

Seawater is slightly alkaline, with a pH near 8.1. Because the ocean absorbs a large share of the carbon dioxide humans emit, that CO₂ forms carbonic acid in the water and has already lowered average surface pH by about 0.1 since pre-industrial times — a process called ocean acidification, which makes it harder for shell-building organisms to form their calcium carbonate shells.`,
    },
    {
      title: "Ocean Currents and Global Circulation",
      content: `Surface currents are driven mainly by winds and affect roughly the top 400 metres of the ocean. Because of the Coriolis effect — a consequence of Earth's rotation — moving water is deflected to the right in the Northern Hemisphere and to the left in the Southern Hemisphere. The result is five great circular current systems called gyres, one in each major basin.

Western boundary currents, on the western sides of these gyres, are narrow, deep, and fast: the Gulf Stream in the Atlantic and the Kuroshio in the Pacific carry enormous volumes of warm tropical water toward the poles. The Gulf Stream's warmth is a major reason north-western Europe is milder than other places at the same latitude.

The deep ocean circulates on a different principle: density. Cold, salty water is denser, and in the North Atlantic and around Antarctica surface water becomes cold and salty enough to sink. This drives the thermohaline circulation, often pictured as a global conveyor belt that moves water through all the ocean basins over a timescale of about a thousand years.

Along some coasts, winds push surface water away and deep water rises to replace it — upwelling. Upwelled water is rich in nutrients, which is why upwelling zones such as the coast of Peru support some of the world's richest fisheries despite covering a small fraction of the ocean.`,
    },
    {
      title: "Waves and Tides",
      content: `Most ocean waves are generated by wind. Their size depends on three factors: wind speed, wind duration, and fetch — the distance of open water the wind blows across. In a wave, water particles move in nearly closed circles; it is the wave form and its energy that travel, not the water itself.

As a wave approaches shallow water, the seabed interferes with the circular motion: the wave slows, its height grows, and it eventually becomes unstable and breaks. Tsunamis are fundamentally different from wind waves — they are caused by sudden displacement of the water column, usually by undersea earthquakes, travel across open ocean at jetliner speeds, and grow dangerous as they shoal near coasts.

Tides are the regular rise and fall of sea level caused by the gravitational pull of the Moon and, to a lesser extent, the Sun. The Moon dominates because tidal force depends strongly on distance. Most coasts experience two high tides and two low tides in about 24 hours and 50 minutes — the extra 50 minutes reflecting the Moon's own motion around Earth.

When the Sun, Moon, and Earth align at new moon and full moon, solar and lunar tides reinforce each other, producing the largest tidal range: spring tides. When the Moon is at first or third quarter, the pulls partly cancel and the range is smallest: neap tides. The Bay of Fundy in Canada has the world's largest tidal range, exceeding 15 metres.`,
    },
    {
      title: "Marine Ecosystems and Life Zones",
      content: `Life in the ocean is organised by light, depth, and distance from shore. Phytoplankton — microscopic drifting algae in the sunlit surface layer — carry out roughly half of all photosynthesis on Earth, producing a comparable share of the oxygen we breathe and forming the base of nearly all marine food webs. Zooplankton graze on them, and energy passes up through fish, squid, seabirds, and marine mammals.

Coral reefs, built by colonies of tiny animals that host photosynthetic algae in their tissues, occupy well under one percent of the seafloor yet support an estimated quarter of all marine species. Reefs need warm, clear, sunlit water, which restricts them mostly to the tropics. When water becomes too warm, corals expel their algae and turn white — coral bleaching — and die if the stress persists.

Other coastal ecosystems are just as productive: mangrove forests shelter juvenile fish and buffer shorelines from storms, seagrass meadows store large amounts of carbon, and kelp forests in cooler waters host communities as layered as any forest on land.

The deep sea hosts life on a different chemical basis. Around hydrothermal vents, where mineral-rich hot water erupts from the crust, bacteria perform chemosynthesis — extracting energy from chemicals such as hydrogen sulfide instead of sunlight — and support dense communities of tube worms, clams, and shrimp. Their discovery in 1977 overturned the assumption that all ecosystems ultimately depend on the Sun.`,
    },
    {
      title: "The Ocean and Climate",
      content: `Water has an exceptionally high capacity to store heat, and the ocean has absorbed over 90 percent of the extra heat trapped by human greenhouse-gas emissions. This makes the ocean the planet's great climate moderator: coastal regions have milder seasons than continental interiors, and the whole climate system responds more slowly — and more persistently — because of the ocean's thermal inertia.

The ocean is also a huge carbon reservoir, holding far more carbon than the atmosphere and absorbing roughly a quarter of annual human CO₂ emissions through dissolution and the activity of marine organisms whose remains sink to depth — the biological pump.

The El Niño–Southern Oscillation (ENSO) is the clearest example of the ocean steering global weather. In normal years, trade winds pile warm water in the western tropical Pacific while cold water upwells off South America. During El Niño the trade winds weaken, warm water spreads eastward, Peruvian upwelling falters, and weather patterns shift worldwide — including a tendency toward weaker monsoon rainfall in India. La Niña is the opposite phase, with stronger trades and cooler eastern Pacific waters.

Warming water expands, and this thermal expansion — together with meltwater from glaciers and ice sheets — drives sea-level rise, currently averaging around 3–4 millimetres per year globally. Even small rises significantly increase the reach of storm surges over shallow coastlines, which is why low-lying deltas such as the Sundarbans are so exposed.`,
    },
    {
      title: "Human Impact and Ocean Conservation",
      content: `About a third of the world's monitored fish stocks are overfished, and many more are fished at their limit. Particularly damaging practices include bottom trawling, which drags weighted nets across the seabed, and the large-scale discard of unwanted bycatch. Well-managed quotas, seasonal closures, and marine protected areas have repeatedly shown that stocks can recover when pressure is reduced.

Plastic pollution is pervasive: millions of tonnes of plastic enter the ocean each year, breaking down into microplastics that are now found from surface waters to the deepest trenches and throughout marine food webs. Ocean currents concentrate floating debris in the centres of the subtropical gyres — the best known accumulation being the "Great Pacific Garbage Patch", which is a diffuse soup of fragments rather than a solid island.

Nutrient run-off from farmland and sewage fuels algal blooms whose decay consumes oxygen, creating seasonal "dead zones" such as the large one at the mouth of the Mississippi River. Warming, acidification, and deoxygenation — the three great chemical pressures of climate change — act on top of these local stresses.

Conservation tools are improving: marine protected areas now cover a growing share of national waters, international agreements address shipping pollution and high-seas biodiversity, and satellite tracking makes illegal fishing harder to hide. The consistent scientific finding is that the ocean is resilient — ecosystems rebound when given protection and time.`,
    },
  ],
  questions: [
    { q: "Approximately what fraction of Earth's surface is covered by ocean?", options: ["50%", "61%", "71%", "85%"], correct: 2 },
    { q: "The sunlight (euphotic) zone extends to about:", options: ["50 metres", "200 metres", "1,000 metres", "4,000 metres"], correct: 1 },
    { q: "The thermocline is a layer where:", options: ["Salinity rises sharply", "Temperature drops rapidly with depth", "Pressure stops increasing", "Light is brightest"], correct: 1 },
    { q: "Pressure underwater increases by about one atmosphere for every:", options: ["1 metre", "10 metres", "100 metres", "1,000 metres"], correct: 1 },
    { q: "New oceanic crust is created at:", options: ["Ocean trenches", "Abyssal plains", "Mid-ocean ridges", "Continental shelves"], correct: 2 },
    { q: "The deepest known point in the ocean is in the:", options: ["Java Trench", "Puerto Rico Trench", "Tonga Trench", "Mariana Trench"], correct: 3 },
    { q: "Deep ocean trenches form at:", options: ["Spreading centres", "Subduction zones", "River deltas", "Coral atolls"], correct: 1 },
    { q: "Average open-ocean salinity is closest to:", options: ["3.5 ppt", "15 ppt", "35 ppt", "350 ppt"], correct: 2 },
    { q: "The two most abundant dissolved ions in seawater are:", options: ["Calcium and carbonate", "Chloride and sodium", "Potassium and iodide", "Magnesium and sulfate"], correct: 1 },
    { q: "Ocean acidification is caused by the ocean absorbing:", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Methane"], correct: 2 },
    { q: "Surface ocean currents are driven mainly by:", options: ["Tides", "Winds", "Earthquakes", "River inflow"], correct: 1 },
    { q: "The Coriolis effect deflects currents in the Northern Hemisphere to the:", options: ["Left", "Right", "North", "South"], correct: 1 },
    { q: "Thermohaline circulation is driven by differences in:", options: ["Wind and waves", "Temperature and salinity", "Depth and sunlight", "Plankton density"], correct: 1 },
    { q: "Upwelling zones support rich fisheries because rising deep water is:", options: ["Warmer", "Saltier", "Nutrient-rich", "Oxygen-free"], correct: 2 },
    { q: "The size of wind waves depends on wind speed, wind duration, and:", options: ["Fetch", "Salinity", "Latitude", "Depth"], correct: 0 },
    { q: "Spring tides (the largest tidal range) occur when:", options: ["The Moon is at first quarter", "Sun, Moon, and Earth align", "The Sun is closest to Earth", "Winds are strongest"], correct: 1 },
    { q: "Tsunamis are most commonly caused by:", options: ["Strong winds", "Undersea earthquakes", "Ship traffic", "Spring tides"], correct: 1 },
    { q: "Roughly what share of Earth's photosynthesis is carried out by phytoplankton?", options: ["5%", "20%", "50%", "90%"], correct: 2 },
    { q: "Around hydrothermal vents, food webs are based on:", options: ["Photosynthesis by algae", "Chemosynthesis by bacteria", "Falling debris only", "Coral polyps"], correct: 1 },
    { q: "During El Niño, the Pacific trade winds:", options: ["Strengthen", "Weaken", "Reverse direction permanently", "Stop affecting currents"], correct: 1 },
  ],
};
