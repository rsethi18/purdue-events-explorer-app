import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const buildingAliases = {
  "Asian American and Asian Resource and Cultural Center": ["AACC", "Asian american and asian resource and cultural center"],
  "Ag Alumni Seed Phenotyping Facility": ["AAPF", "Ag alumni seed phenotyping facility"],
  "Agricultural and Biological Engineering": ["ABE", "Agricultural and biological engineering"],
  "Animal Disease Diagnostic Laboratory": ["ADDL", "Animal disease diagnostic laboratory"],
  "ADM Agricultural Innovation Center": ["ADM", "Adm agricultural innovation center"],
  "Aspire at Discovery Park": ["ADPA-C", "Aspire at discovery park"],
  "Aerospace Science Laboratory": ["AERO", "Aerospace science laboratory"],
  "Agricultural Administration Building": ["AGAD", "Agricultural administration building"],
  "Animal Holding Facility": ["AHF", "Animal holding facility"],
  "Burke (Morgan J.) Boilermaker Aquatic Center": ["AQUA", "Burke (morgan j.) boilermaker aquatic center", "Burke Boilermaker Aquatic Center", "Burke boilermaker aquatic center"],
  "Armory": ["AR", "Armory"],
  "Armstrong Hall of Engineering": ["ARMS", "Armstrong hall of engineering"],
  "Airport Service Building (Shop Services)": ["ASB", "Airport service building (shop services)", "Airport Service Building", "Airport service building"],
  "Bailey (Ralph and Bettye) Hall": ["BALY", "Bailey (ralph and bettye) hall", "Bailey Hall", "Bailey hall"],
  "Black Cultural Center": ["BCC", "Black cultural center"],
  "Biochemistry Building": ["BCHM", "Biochemistry building"],
  "Brown (Max W & Maileen) Family Hall": ["BHEE", "Brown (max w & maileen) family hall", "Brown Family Hall", "Brown family hall"],
  "Bechtel Innovation Design Center": ["BIDC", "Bechtel innovation design center"],
  "Bindley Bioscience Center": ["BIND", "Bindley bioscience center"],
  "Bowen (Robert L. & Terry L.) Laboratory": ["BOWN", "Bowen (robert l. & terry l.) laboratory", "Bowen Laboratory", "Bowen laboratory"],
  "Brunner (David and Bonnie) Equine Hospital": ["BREQ", "Brunner (david and bonnie) equine hospital", "Brunner Equine Hospital", "Brunner equine hospital"],
  "Brees (Drew and Brittany) Student-Athlete Academic Center": ["BRES", "Brees (drew and brittany) student-athlete academic center", "Brees Student-Athlete Academic Center", "Brees student-athlete academic center"],
  "Brunner (David and Bonnie) Farm Animal Hospital": ["BRFM", "Brunner (david and bonnie) farm animal hospital", "Brunner Farm Animal Hospital", "Brunner farm animal hospital"],
  "Brunner (David and Bonnie) Small Animal Hospital": ["BRUN", "Brunner (david and bonnie) small animal hospital", "Brunner Small Animal Hospital", "Brunner small animal hospital"],
  "Birck Nanotechnology Center": ["BRK", "Birck nanotechnology center"],
  "Beering (Steven C.) Hall of Liberal Arts and Education": ["BRNG", "Beering (steven c.) hall of liberal arts and education", "Beering Hall of Liberal Arts and Education", "Beering hall of liberal arts and education"],
  "Brown (Herbert C.) Laboratory of Chemistry": ["BRWN", "Brown (herbert c.) laboratory of chemistry", "Brown Laboratory of Chemistry", "Brown laboratory of chemistry"],
  "Boiler Television Building": ["BTV", "Boiler television building"],
  "Chaffee Hall": ["CHAF", "Chaffee hall"],
  "Chaney-Hale Hall of Science": ["CHAS", "Chaney-hale hall of science", "Chaney Hall of Science", "Chaney hall of science"],
  "Class of 1950 Lecture Hall": ["CL50", "Class of 1950 lecture hall"],
  "Composites Laboratory": ["COMP", "Composites laboratory"],
  "Convergence": ["CONV", "Convergence"],
  "Córdova (France A.) Recreational Sports Center": ["CREC", "Córdova (france a.) recreational sports center", "Córdova Recreational Sports Center", "Córdova recreational sports center", 'COREC', 'Corec'],
  "Creighton (Hobart and Russell) Hall of Animal Sciences": ["CRTN", "Creighton (hobart and russell) hall of animal sciences", "Creighton Hall of Animal Sciences", "Creighton hall of animal sciences"],
  "Daniel (William H.) Turfgrass Research Center": ["DANL", "Daniel (william h.) turfgrass research center", "Daniel Turfgrass Research Center", "Daniel turfgrass research center"],
  "Hall for Discovery and Learning Research": ["DLR", "Hall for discovery and learning research"],
  "DeMent (Clayton W.) Fire Station": ["DMNT", "DeMent (clayton w.) fire station", "DeMent Fire Station", "DeMent fire station"],
  "Doyle (Leo Philip) Laboratory": ["DOYL", "Doyle (leo philip) laboratory", "Doyle Laboratory", "Doyle laboratory"],
  "Drug Discovery": ["DRUG", "Drug discovery"],
  "Data Science": ["DSCB", "Data science"],
  "Dudley Hall": ["DUDL", "Dudley hall"],
  "Pete Dye Clubhouse": ["DYE", "Pete dye clubhouse", "Dye Clubhouse", "Dye clubhouse"],
  "Purdue University Early Care and Education Center": ["ECEC", "Purdue university early care and education center"],
  "Entomology Environmental Laboratory": ["EEL", "Entomology environmental laboratory"],
  "Equine Health Sciences Annex": ["EHSA", "Equine health sciences annex"],
  "Equine Health Sciences Building": ["EHSB", "Equine health sciences building"],
  "Elliott (Edward C.) Hall of Music": ["ELLT", "Elliott (edward c.) hall of music", "Elliott Hall of Music", "Elliott hall of music"],
  "Flex Laboratories": ["FLEX", "Flex laboratories"],
  "Flight Operations Building": ["FOPN", "Flight operations building"],
  "Forestry Building": ["FORS", "Forestry building"],
  "Forest Products Building": ["FPRD", "Forest products building"],
  "Forney Hall of Chemical Engineering": ["FRNY", "Forney hall of chemical engineering"],
  "Fowler (Harriet O. and James M., Jr.) Memorial House": ["FWLR", "Fowler (harriet o. and james m., jr.) memorial house", "Fowler Memorial House", "Fowler memorial house"],
  "Golf Course Maintenance Barn": ["GCMB", "Golf course maintenance barn"],
  "Grounds Maintenance Facility": ["GMF", "Grounds maintenance facility"],
  "Grounds Maintenance Greenhouse Facilities": ["GMGF", "Grounds maintenance greenhouse facilities"],
  "Grissom Hall": ["GRIS", "Grissom hall"],
  "Grounds Service Building": ["GRS", "Grounds service building"],
  "Golf Storage Maintenance Building": ["GSMB", "Golf storage maintenance building"],
  "Haas (Felix) Hall": ["HAAS", "Haas (felix) hall", "Haas Hall", "Haas hall"],
  "Hagle (Marc and Sharon) Hall": ["HAGL", "Hagle (marc and sharon) hall", "Hagle Hall", "Hagle hall"],
  "Hampton (Delon and Elizabeth) Hall of Civil Engineering": ["HAMP", "Hampton (delon and elizabeth) hall of civil engineering", "Hampton Hall of Civil Engineering", "Hampton hall of civil engineering"],
  "Hansen (Arthur G.) Life Sciences Research Building": ["HANS", "Hansen (arthur g.) life sciences research building", "Hansen Life Sciences Research Building", "Hansen life sciences research building"],
  "Heavilon Hall": ["HEAV", "Heavilon hall"],
  "Herrick Acoustics": ["HERL", "Herrick acoustics"],
  "Herrick Laboratories": ["HLAB", "Herrick laboratories"],
  "Hazardous Materials Management Trailer": ["HMMT", "Hazardous materials management trailer"],
  "Hanley (Bill and Sally) Hall": ["HNLY", "Hanley (bill and sally) hall", "Hanley Hall", "Hanley hall"],
  "Hockmeyer (Wayne T. and Mary T.) Hall of Structural Biology": ["HOCK", "Hockmeyer (wayne t. and mary t.) hall of structural biology", "Hockmeyer Hall of Structural Biology", "Hockmeyer hall of structural biology"],
  "Horticulture Building": ["HORT", "Horticulture building"],
  "Hovde (Frederick L.) Hall of Administration": ["HOVD", "Hovde (frederick l.) hall of administration", "Hovde Hall of Administration", "Hovde hall of administration"],
  "Hull All-American Marching Band": ["HULL", "Hull all-american marching band"],
  "Johnson (Helen R.) Hall of Nursing": ["JNSN", "Johnson (helen r.) hall of nursing", "Johnson Hall of Nursing", "Johnson hall of nursing"],
  "Krannert Center for Executive Education and Research": ["KCTR", "Krannert center for executive education and research"],
  "Kozuch Football Performance Complex": ["KFPC", "Kozuch football performance complex"],
  "Knoy (Maurice G.) Hall of Technology": ["KNOY", "Knoy (maurice g.) hall of technology", "Knoy Hall of Technology", "Knoy hall of technology"],
  "Krannert Building": ["KRAN", "Krannert building"],
  "Krach Leadership Center": ["KRCH", "Krach leadership center"],
  "Lambert (Ward L.) Fieldhouse and Gymnasium": ["LAMB", "Lambert (ward l.) fieldhouse and gymnasium", "Lambert Fieldhouse and Gymnasium", "Lambert fieldhouse and gymnasium"],
  "Latino Cultural Center at Purdue": ["LCCP", "Latino cultural center at purdue"],
  "Lilly Hall of Life Sciences": ["LILY", "Lilly hall of life sciences"],
  "Lambertus Hall": ["LMBS", "Lambertus hall"],
  "Laboratory Materials Storage Building": ["LMSB", "Laboratory materials storage building"],
  "Land O’Lakes Center for Experiential Learning and Purina Pavilion": ["LOLC", "Land o’lakes center for experiential learning and purina pavilion", "Land O’Lakes Center for Experiential Learning", "Land o’lakes center for experiential learning"],
  "Life Science Animal Building": ["LSA", "Life science animal building"],
  "Life Science Plant and Soils Laboratory": ["LSPS", "Life science plant and soils laboratory"],
  "Life Science Ranges (Greenhouse and Service Building)": ["LSR", "Life science ranges (greenhouse and service building)", "Life Science Ranges", "Life science ranges"],
  "Lawson (Richard and Patricia) Computer Science Building": ["LWSN", "Lawson (richard and patricia) computer science building", "Lawson Computer Science Building", "Lawson computer science building"],
  "Lyles-Porter Hall": ["LYLE", "Lyles-porter hall"],
  "Lynn (Charles J.) Hall of Veterinary Medicine": ["LYNN", "Lynn (charles j.) hall of veterinary medicine", "Lynn Hall of Veterinary Medicine", "Lynn hall of veterinary medicine"],
  "Mackey (Guy J.) Arena": ["MACK", "Mackey (guy j.) arena", "Mackey Arena", "Mackey arena"],
  "Mann (Gerald D. and Edna E.) Hall": ["MANN", "Mann (gerald d. and edna e.) hall", "Mann Hall", "Mann hall"],
  "Mathematical Sciences Building": ["MATH", "Mathematical sciences building"],
  "Mechanical Engineering Building": ["ME", "Mechanical engineering building"],
  "Jischke (Martin C.) Hall of Biomedical Engineering": ["MJIS", "Jischke (martin c.) hall of biomedical engineering", "Jischke Hall of Biomedical Engineering", "Jischke hall of biomedical engineering"],
  "Materials Management and Distribution Center": ["MMDC", "Materials management and distribution center"],
  "Materials Management Storage Building 1": ["MMS1", "Materials management storage building 1"],
  "Mollenkopf Athletic Center": ["MOLL", "Mollenkopf athletic center"],
  "Morgan (Burton D.) Center for Entrepreneurship": ["MRGN", "Morgan (burton d.) center for entrepreneurship", "Morgan Center for Entrepreneurship", "Morgan center for entrepreneurship"],
  "Marriott Hall": ["MRRT", "Marriott hall"],
  "Materials and Electrical Engineering Building": ["MSEE", "Materials and electrical engineering building"],
  "Matthews Hall": ["MTHW", "Matthews hall"],
  "Native American Educational and Cultural Center": ["NACC", "Native american educational and cultural center"],
  "Niswonger Aviation Technology Building": ["NISW", "Niswonger aviation technology building"],
  "Nelson (Philip E.) Hall of Food Science": ["NLSN", "Nelson (philip e.) hall of food science", "Nelson Hall of Food Science", "Nelson hall of food science"],
  "Ollman (Melvin L.) Golfcart Barn": ["OLMN", "Ollman (melvin l.) golfcart barn", "Ollman Golfcart Barn", "Ollman golfcart barn"],
  "Page (Thomas A.) Pavilion": ["PAGE", "Page (thomas a.) pavilion", "Page Pavilion", "Page pavilion"],
  "Pao (Yue-Kong) Hall of Visual and Performing Arts": ["PAO", "Pao (yue-kong) hall of visual and performing arts", "Pao Hall of Visual and Performing Arts", "Pao hall of visual and performing arts"],
  "Pfendler (David C.) Hall of Agriculture": ["PFEN", "Pfendler (david c.) hall of agriculture", "Pfendler Hall of Agriculture", "Pfendler hall of agriculture"],
  "Physical Facilities Service Building": ["PFSB", "Physical facilities service building"],
  "Purdue Graduate Student Center": ["PGSC", "Purdue graduate student center"],
  "Physics Building": ["PHYS", "Physics building"],
  "Purdue Magnetic Resonance Imaging Facility": ["PMRI", "Purdue magnetic resonance imaging facility"],
  "Purdue Memorial Union": ["PMU", "Purdue memorial union"],
  "Potter (A.A.) Engineering Center": ["POTR", "Potter (a.a.) engineering center", "Potter Engineering Center", "Potter engineering center"],
  "Peirce Hall": ["PRCE", "Peirce hall"],
  "Printing Services Facility": ["PRSV", "Printing services facility"],
  "Psychological Sciences Building": ["PSYC", "Psychological sciences building"],
  "Purdue University Student Health Center": ["PUSH", "Purdue university student health center"],
  "Purdue Village Administration Building": ["PVAB", "Purdue village administration building"],
  "American Railway Building": ["RAIL", "American railway building"],
  "Rawls (Jerry S.) Hall": ["RAWL", "Rawls (jerry s.) hall", "Rawls Hall", "Rawls hall"],
  "Heine (Robert E.) Pharmacy Building": ["RHPH", "Heine (robert e.) pharmacy building", "Heine Pharmacy Building", "Heine pharmacy building"],
  "Stanley Coulter Hall": ["SC", "Stanley coulter hall"],
  "Helen B. Schleman Hall": ["SCHM", "Helen b. schleman hall", "Schleman Hall", "Schleman hall"],
  "Slayter Center of Performing Arts": ["SCPA", "Slayter center of performing arts"],
  "Smalley (John C.) Center for Housing and Food Services Administration": ["SMLY", "Smalley (john c.) center for housing and food services administration", "Smalley Center for Housing and Food Services Administration", "Smalley center for housing and food services administration"],
  "Smith Hall": ["SMTH", "Smith hall"],
  "Spurgeon (Tom) Golf Training Center": ["SPUR", "Spurgeon (tom) golf training center", "Spurgeon Golf Training Center", "Spurgeon golf training center"],
  "Ross-Ade Stadium": ["STDM", "Ross-ade stadium"],
  "Stewart Center": ["STEW", "Stewart center"],
  "Stone Hall": ["STON", "Stone hall"],
  "Telecommunications Building": ["TEL", "Telecommunications building"],
  "Terminal Building": ["TERM", "Terminal building"],
  "Terry (Oliver P.) House": ["TERY", "Terry (oliver p.) house", "Terry House", "Terry house"],
  "Turf Recreation Exercise Center": ["TREC", "Turf recreation exercise center"],
  "University Church": ["UC", "University church"],
  "University Hall": ["UNIV", "University hall"],
  "Utility Plant Office Building": ["UPOB", "Utility plant office building"],
  "Utility Plant Office Facility": ["UPOF", "Utility plant office facility"],
  "Utility Plant Storage Building": ["UPSB", "Utility plant storage building"],
  "Veterinary Animal Isolation Building 1": ["VA1", "Veterinary animal isolation building 1"],
  "Veterinary Animal Isolation Building 2": ["VA2", "Veterinary animal isolation building 2"],
  "Veterinary Center for Paralysis Research": ["VCPR", "Veterinary center for paralysis research"],
  "Veterinary Laboratory Animal Building": ["VLAB", "Veterinary laboratory animal building"],
  "Veterinary Medicine Isolation Facility": ["VMIF", "Veterinary medicine isolation facility"],
  "Voinoff (Samuel) Golf Pavilion": ["VOIN", "Voinoff (samuel) golf pavilion", "Voinoff Golf Pavilion", "Voinoff golf pavilion"],
  "Veterinary Pathobiology Research Building": ["VPRB", "Veterinary pathobiology research building"],
  "Veterinary Pathology Building": ["VPTH", "Veterinary pathology building"],
  "Wade (Walter W.) Utility Plant": ["WADE", "Wade (walter w.) utility plant", "Wade Utility Plant", "Wade utility plant"],
  "Wilmeth (Thomas S. and Harvey D.) Active Learning Center": ["WALC", "Wilmeth (thomas s. and harvey d.) active learning center", "Wilmeth Active Learning Center", "Wilmeth active learning center"],
  "Wang (Seng-Liang) Hall": ["WANG", "Wang (seng-liang) hall", "Wang Hall", "Wang hall"],
  "Westwood (President’s Home)": ["WEST", "Westwood (president’s home)", "Westwood Home", "Westwood home"],
  "Women’s Golf Locker Room": ["WGLR", "Women’s golf locker room"],
  "Whistler (Roy L.) Hall of Agricultural Research": ["WSLR", "Whistler (roy l.) hall of agricultural research", "Whistler Hall of Agricultural Research", "Whistler hall of agricultural research"],
  "Wetherill (Richard Benbridge) Laboratory of Chemistry": ["WTHR", "Wetherill (richard benbridge) laboratory of chemistry", "Wetherill Laboratory of Chemistry", "Wetherill laboratory of chemistry"],
  "Young (Ernest C.) Hall": ["YONG", "Young (ernest c.) hall", "Young Hall", "Young hall"],
  "Cary (Franklin Levering) Quadrangle": ["CARY", "Cary (franklin levering) quadrangle", "Cary Quadrangle", "Cary quadrangle"],
  "Duhme (Ophelia) Residence Hall": ["DUHM", "Duhme (ophelia) residence hall", "Duhme Residence Hall", "Duhme residence hall"],
  "Earhart (Amelia) Residence Hall": ["ERHT", "Earhart (amelia) residence hall", "Earhart Residence Hall", "Earhart residence hall"],
  "Ford (Fred and Mary) Dining Court": ["FORD", "Ford (fred and mary) dining court", "Ford Dining Court", "Ford dining court"],
  "First Street Towers": ["FST", "First street towers"],
  "Harrison (Benjamin) Residence Hall": ["HARR", "Harrison (benjamin) residence hall", "Harrison Residence Hall", "Harrison residence hall"],
  "Hawkins (George A.) Hall": ["HAWK", "Hawkins (george a.) hall", "Hawkins Hall", "Hawkins hall"],
  "Honors College and Residences North": ["HCRN", "Honors college and residences north"],
  "Honors College and Residences South": ["HCRS", "Honors college and residences south"],
  "Hillenbrand Residence Hall": ["HILL", "Hillenbrand residence hall"],
  "Hilltop Apartments": ["HLTP", "Hilltop apartments"],
  "McCutcheon (John T.) Residence Hall": ["MCUT", "McCutcheon (john t.) residence hall", "McCutcheon Residence Hall", "McCutcheon residence hall"],
  "Meredith (Virginia C.) Residence Hall": ["MRDH", "Meredith (virginia c.) residence hall", "Meredith Residence Hall", "Meredith residence hall"],
  "Meredith South": ["MRDS", "Meredith (virginia c.) residence hall south", "Meredith Residence Hall South", "Meredith residence hall south"],
  "Owen (Richard) Residence Hall": ["OWEN", "Owen (richard) residence hall", "Owen Residence Hall", "Owen residence hall"],
  "Parker (Frieda) Residence Hall": ["PKRF", "Parker (frieda) residence hall", "Parker Residence Hall", "Parker residence hall"],
  "Parker (Winifred) Residence Hall": ["PKRW", "Parker (winifred) residence hall", "Parker Residence Hall", "Parker residence hall"],
  "Purdue Village Administration Building": ["PVAB", "Purdue village administration building"],
  "Purdue Village Community Center": ["PVCC", "Purdue village community center"],
  "Purdue Village": ["PVIL", "Purdue village"],
  "Shealy (Frances M.) Residence Hall": ["SHLY", "Shealy (frances m.) residence hall", "Shealy Residence Hall", "Shealy residence hall"],
  "Shreve (Eleanor B.) Residence Hall": ["SHRV", "Shreve (eleanor b.) residence hall", "Shreve Residence Hall", "Shreve residence hall"],
  "Smalley (John C.) Center for Housing and Food Services Administration": ["SMLY", "Smalley (john c.) center for housing and food services administration", "Smalley Center for Housing and Food Services Administration", "Smalley center for housing and food services administration"],
  "Tarkington (Newton Booth) Residence Hall": ["TARK", "Tarkington (newton booth) residence hall", "Tarkington Residence Hall", "Tarkington residence hall"],
  "Vawter (Everett B.) Residence Hall": ["VAWT", "Vawter (everett b.) residence hall", "Vawter Residence Hall", "Vawter residence hall"],
  "Warren (Martha E. and Eugene K.) Residence Hall": ["WARN", "Warren (martha e. and eugene k.) residence hall", "Warren Residence Hall", "Warren residence hall"],
  "Wiley Dining Court": ["WDCT", "Wiley dining court"],
  "Wiley (Harvey W.) Residence Hall": ["WILY", "Wiley (harvey w.) residence hall", "Wiley Residence Hall", "Wiley residence hall"],
  "Wood (Elizabeth G. and William R.) Residence Hall": ["WOOD", "Wood (elizabeth g. and william r.) residence hall", "Wood Residence Hall", "Wood residence hall"],
  "Purdue Baseball Clubhouse": ["BBCH", "Purdue baseball clubhouse"],
  "Purdue Baseball Press Box": ["BBPB", "Purdue baseball press box"],
  "Purdue Softball Clubhouse": ["SBCH", "Purdue softball clubhouse"],
  "Purdue Softball Press Box": ["SBPB", "Purdue softball press box"],
  "Schwartz Tennis Center": ["SCHW", "Schwartz tennis center"],
  "Purdue Women's Soccer Building": ["SOCC", "Purdue women's soccer building"]
};


function App() {
  const [events, setEvents] = useState([]);
  const [virtualEvents, setVirtualEvents] = useState([]);
  const [mapOpen, setMapOpen] = useState(false);
  const [boilerLinkMapOpen, setBoilerLinkMapOpen] = useState(false);
  const [showVirtualEvents, setShowVirtualEvents] = useState(false);
  const [map, setMap] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const [virtualCarouselIndex, setVirtualCarouselIndex] = useState(0);
  const [unmappableEvents, setUnmappableEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/events')
      .then(response => response.json())
      .then(data => {
        const allEvents = [...data.purdueEvents, ...data.boilerLinkEvents];
        const physicalEvents = allEvents.filter(event => event.location.toLowerCase() !== 'virtual event');
        const virtualEvents = allEvents.filter(event => event.location.toLowerCase() === 'virtual event');
        setAllEvents(allEvents);
        setEvents(sortEventsByDate(physicalEvents));
        setVirtualEvents(sortEventsByDate(virtualEvents));
      })
      .catch(e => {
        console.error('There was a problem with the fetch operation: ' + e.message);
      });
  }, []);

  useEffect(() => {
    if (mapOpen || boilerLinkMapOpen) {
      initMap();
    }
  }, [mapOpen, boilerLinkMapOpen, events]);

  useEffect(() => {
    function handleResize() {
      setCardsPerPage(window.innerWidth <= 768 ? 1 : 2);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function fetchBoilerLinkEvents() {
    fetch('http://localhost:3000/api/events')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEvents(sortEventsByDate(data.boilerLinkEvents));
        setBoilerLinkMapOpen(true);
        setMapOpen(false);
      })
      .catch(e => {
        console.error('There was a problem with the fetch operation: ' + e.message);
      });
  }

  function initMap() {
    const loader = new Loader({
      apiKey: 'YOUR_API_KEY',
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      const newMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.4237, lng: -86.9212 },
        zoom: 15.5,
        styles: [
          {
            featureType: 'all',
            elementType: 'all',
            stylers: [{ saturation: -100 }]
          }
        ]
      });

      setMap(newMap);

      const geocoder = new window.google.maps.Geocoder();
      const infoWindow = new window.google.maps.InfoWindow();

      const unmappable = [];
      events.forEach(event => {
        geocodeLocation(event, geocoder, newMap, infoWindow, boilerLinkMapOpen, unmappable);
      });
      setUnmappableEvents(unmappable);
    });
  }

  function geocodeLocation(event, geocoder, map, infoWindow, isBoilerLink, unmappable) {
    const address = `${event.location}, Purdue University, West Lafayette, IN`;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results[0].geometry) {
        const formattedAddress = results[0].formatted_address;
        if (formattedAddress !== "610 Purdue Mall, West Lafayette, IN 47907, USA") {
          addMarker(results[0].geometry.location, event, map, infoWindow, isBoilerLink);
        } else {
          unmappable.push(event);
        }
      } else {
        const matchedBuilding = findMatchInBuildingAliases(event.location);
        if (matchedBuilding) {
          geocoder.geocode({ address: `${matchedBuilding}, Purdue University, West Lafayette, IN` }, (results, status) => {
            if (status === 'OK' && results[0].geometry) {
              const formattedAddress = results[0].formatted_address;
              if (formattedAddress !== "610 Purdue Mall, West Lafayette, IN 47907, USA") {
                addMarker(results[0].geometry.location, event, map, infoWindow, isBoilerLink);
              } else {
                unmappable.push(event);
              }
            } else {
              unmappable.push(event);
            }
          });
        } else {
          unmappable.push(event);
        }
      }
    });
  }

  function findMatchInBuildingAliases(location) {
    const normalizedLocation = location.toLowerCase().trim();
    for (const [fullName, aliases] of Object.entries(buildingAliases)) {
      if (aliases.some(alias => normalizedLocation.includes(alias.toLowerCase()))) {
        return fullName;
      }
    }
    return null;
  }

  function addMarker(position, event, map, infoWindow, isBoilerLink) {
    const markerIcon = {
      url: isBoilerLink ? '/green_marker.png' : '/black_marker.png',
      scaledSize: new window.google.maps.Size(32, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(16, 16)
    };

    const marker = new window.google.maps.Marker({
      position,
      map,
      icon: markerIcon,
      title: event.title
    });

    const infoWindowContent = `
      <div class="info-window ${isBoilerLink ? 'boilerlink-info-window' : ''}">
        <h3>${event.title}</h3>
        <p class="event-date">${formatDate(normalizeEventDate(event.date_time))}</p>
        <p class="event-location">${event.location}</p>
        ${isBoilerLink ? `<p class="event-organizer">Organized by: ${event.organizer}</p>` : ''}
        <a href="${event.url}" target="_blank" rel="noopener noreferrer" class="${isBoilerLink ? 'boilerlink-button' : ''}">More Info</a>
      </div>
    `;

    marker.addListener('click', () => {
      infoWindow.setContent(infoWindowContent);
      infoWindow.open(map, marker);
    });
  }

  function handleMapOpen(isBoilerLink) {
    if (isBoilerLink) {
      fetchBoilerLinkEvents();
    } else {
      fetch('http://localhost:3000/api/events')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const physicalEvents = data.purdueEvents.filter(event => event.location.toLowerCase() !== 'virtual event');
          const virtualEvents = data.purdueEvents.filter(event => event.location.toLowerCase() === 'virtual event');
          setEvents(sortEventsByDate(physicalEvents));
          setVirtualEvents(sortEventsByDate(virtualEvents));
          setMapOpen(true);
          setBoilerLinkMapOpen(false);
        })
        .catch(e => {
          console.error('There was a problem with the fetch operation: ' + e.message);
        });
    }

    setMap(null);
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setSelectedEvent(null);
  }

  function handleEventSelect(event) {
    setSelectedEvent(event);
    setSearchTerm('');
  }

  function handleDateChange(e) {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    if (selectedDate) {
      setShowAllEvents(false);
      setShowVirtualEvents(true);
    } else {
      setShowVirtualEvents(false);
    }
    setCarouselIndex(0);
  }

  function handleSeeAllEvents() {
    const newShowAllEvents = !showAllEvents;
    setShowAllEvents(newShowAllEvents);
    setSelectedDate('');
    if (newShowAllEvents) {
      setShowVirtualEvents(true);
    } else {
      setShowVirtualEvents(false);
    }
    setCarouselIndex(0);
  }

  function handleShowVirtualEvents() {
    setShowVirtualEvents(!showVirtualEvents);
    setCarouselIndex(0);
    setVirtualCarouselIndex(0);
  }

  function prioritizeSearchResults(events, searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return events.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      
      if (titleA.startsWith(lowerSearchTerm) && !titleB.startsWith(lowerSearchTerm)) return -1;
      if (!titleA.startsWith(lowerSearchTerm) && titleB.startsWith(lowerSearchTerm)) return 1;
      
      const indexA = titleA.indexOf(lowerSearchTerm);
      const indexB = titleB.indexOf(lowerSearchTerm);
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      
      return 0;
    });
  }

  const filteredEvents = prioritizeSearchResults(
    allEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    searchTerm
  );

  const uniqueFilteredEvents = filteredEvents.reduce((acc, current) => {
    const x = acc.find(item => item.title === current.title);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []).slice(0, 6);

  const uniqueVirtualEvents = virtualEvents.reduce((acc, current) => {
    const x = acc.find(item => item.title === current.title);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const limitedVirtualEvents = sortEventsByDate(uniqueVirtualEvents);

  const filteredEventsByDate = selectedDate
    ? allEvents.filter(event => {
        const eventDate = normalizeEventDate(event.date_time).split('T')[0];
        return eventDate === selectedDate;
      })
    : [];

  function normalizeEventDate(dateString) {
    const monthNames = {
      January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
      July: '07', August: '08', September: '09', October: '10', November: '11', December: '12',
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    const dateRegex = /(?:(\w+), )?(\w+) (\d{1,2})(?:,? (\d{4}))?(?:\s+(.+))?/;
    const match = dateString.match(dateRegex);

    if (match) {
      const [, , month, day, year, timeString] = match;
      const monthNumber = monthNames[month];
      const currentYear = new Date().getFullYear();
      const formattedYear = year || currentYear.toString();
      
      const formattedDate = `${formattedYear}-${monthNumber}-${day.padStart(2, '0')}`;
      
      return timeString ? `${formattedDate}T${timeString.trim()}` : formattedDate;
    }

    return dateString;
  }

  function formatDate(dateString) {
    const [year, month, dayWithTime] = dateString.split('-');
    const [day, ...timeParts] = dayWithTime.split('T');
    const time = timeParts.join(' ');
    const date = new Date(`${year}-${month}-${day}`);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return time ? `${formattedDate} ${time}` : formattedDate;
  }

  function sortEventsByDate(events) {
    return events.sort((a, b) => {
      const dateA = new Date(normalizeEventDate(a.date_time).split('T')[0]);
      const dateB = new Date(normalizeEventDate(b.date_time).split('T')[0]);
      if (dateA - dateB === 0) {
        const timeA = normalizeEventDate(a.date_time).split('T')[1] || '';
        const timeB = normalizeEventDate(b.date_time).split('T')[1] || '';
        return timeA.localeCompare(timeB);
      }
      return dateA - dateB;
    });
  }

  const displayedEvents = selectedDate
    ? (showVirtualEvents ? filteredEventsByDate : filteredEventsByDate.filter(event => event.location.toLowerCase() !== 'virtual event'))
    : showAllEvents
    ? sortEventsByDate(showVirtualEvents ? allEvents : allEvents.filter(event => event.location.toLowerCase() !== 'virtual event'))
    : [];

  function handlePrev() {
    setCarouselIndex((prevIndex) => Math.max(prevIndex - cardsPerPage, 0));
  }

  function handleNext() {
    setCarouselIndex((prevIndex) => Math.min(prevIndex + cardsPerPage, displayedEvents.length - cardsPerPage));
  }

  function handleVirtualPrev() {
    setVirtualCarouselIndex((prevIndex) => Math.max(prevIndex - cardsPerPage, 0));
  }

  function handleVirtualNext() {
    setVirtualCarouselIndex((prevIndex) => Math.min(prevIndex + cardsPerPage, limitedVirtualEvents.length - cardsPerPage));
  }

  return (
    <div className="app">
      <header>
        <h1>Purdue Events Explorer</h1>
      </header>
      <main>
        <section className="intro">
        <h2>Discover Exciting Events at Purdue</h2>
          <p>Explore a wide range of events happening around Purdue University. From academic lectures to sports games, find what interests you!</p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for events..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-bar"
            />
            {searchTerm && uniqueFilteredEvents.length > 0 && (
              <div className="search-results">
                {uniqueFilteredEvents.map((event, index) => (
                  <div 
                    key={`${event.title}-${event.date_time}-${index}`} 
                    className="search-result"
                    onClick={() => handleEventSelect(event)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            )}
            {selectedEvent && (
              <div className="selected-event-card">
                <button className="close-button" onClick={() => setSelectedEvent(null)}>×</button>
                <h3>{selectedEvent.title}</h3>
                <p>{formatDate(normalizeEventDate(selectedEvent.date_time))}</p>
                <p>{selectedEvent.location}</p>
                <p>{selectedEvent.organizer}</p>
                <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer">More Info</a>
              </div>
            )}
          </div>
          <div className="filter-container">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="date-picker"
            />
            <button 
              onClick={handleSeeAllEvents} 
              className={`filter-button ${showAllEvents ? 'active' : ''}`}
            >
              {showAllEvents ? 'Hide All' : 'See All'}
            </button>
            <button 
              onClick={handleShowVirtualEvents} 
              className={`filter-button ${showVirtualEvents ? 'active' : ''}`}
            >
              Virtual Events {showVirtualEvents && '✓'}
            </button>
          </div>
          {(showAllEvents || selectedDate) && displayedEvents.length > 0 && (
            <div className="carousel-container">
              <button className="carousel-arrow prev" onClick={handlePrev} disabled={carouselIndex === 0}>
                &#8592;
              </button>
              <div className="carousel-content">
                {displayedEvents.slice(carouselIndex, carouselIndex + cardsPerPage).map((event, index) => (
                  <div key={`${event.title}-${event.date_time}-${index}`} className="carousel-card">
                    <div className="carousel-card-content">
                      <h3>{event.title}</h3>
                      <p>{formatDate(normalizeEventDate(event.date_time))}</p>
                      <p>{event.location}</p>
                    </div>
                    <div className="carousel-card-footer">
                      <a href={event.url} target="_blank" rel="noopener noreferrer" className="more-info-btn yellow-button">More Info</a>
                    </div>
                  </div>
                ))}
                {displayedEvents.length === 1 && (
                  <div className="event-card empty-card">
                    {/* Empty card to maintain size */}
                  </div>
                )}
              </div>
              <button className="carousel-arrow next" onClick={handleNext} disabled={carouselIndex >= displayedEvents.length - cardsPerPage}>
                &#8594;
              </button>
            </div>
          )}
          {!showAllEvents && !selectedDate && showVirtualEvents && limitedVirtualEvents.length > 0 && (
            <div className="carousel-container">
              <button className="carousel-arrow prev" onClick={handleVirtualPrev} disabled={virtualCarouselIndex === 0}>
                &#8592;
              </button>
              <div className="carousel-content">
                {limitedVirtualEvents.slice(virtualCarouselIndex, virtualCarouselIndex + cardsPerPage).map((event, index) => (
                  <div key={`${event.title}-${event.date_time}-${index}`} className="carousel-card">
                    <div className="carousel-card-content">
                      <h3>{event.title}</h3>
                      <p>{formatDate(normalizeEventDate(event.date_time))}</p>
                      <p>Virtual Event</p>
                    </div>
                    <div className="carousel-card-footer">
                      <a href={event.url} target="_blank" rel="noopener noreferrer" className="more-info-btn">More Info</a>
                    </div>
                  </div>
                ))}
                {limitedVirtualEvents.length === 1 && (
                  <div className="event-card empty-card">
                    {/* Empty card to maintain size */}
                  </div>
                )}
              </div>
              <button className="carousel-arrow next" onClick={handleVirtualNext} disabled={virtualCarouselIndex >= limitedVirtualEvents.length - cardsPerPage}>
                &#8594;
              </button>
            </div>
          )}
          <div className="button-container">
            <button onClick={() => handleMapOpen(false)} className="event-button">Open Purdue Events Map</button>
            <button onClick={() => handleMapOpen(true)} className="event-button">Open BoilerLink Events Map</button>
          </div>
        </section>
        <section className={`map-container ${mapOpen || boilerLinkMapOpen ? 'open' : ''}`}>
          <div id="map"></div>
        </section>
        {unmappableEvents.length > 0 && (
          <section className="unmappable-events">
            <h3>Events with Unavailable Locations</h3>
            <ul>
              {unmappableEvents.map((event, index) => (
                <li key={index}>
                  {event.title} - {event.location}
                  <span className="unmappable-note"> (Location could not be mapped)</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;