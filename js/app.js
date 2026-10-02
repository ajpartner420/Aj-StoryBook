/* AJ StoryBooks — bilingual Hindi/English + scalable chapters + audiobook-ready */
const $ = s => document.querySelector(s);
const params = new URLSearchParams(location.search);
const path = location.pathname.toLowerCase();
const standaloneStoryPath = /\/stories\/[^/]+\.html$/i.test(path);
const page = path.endsWith("stories.html") ? "stories" : path.endsWith("chapter.html") ? "chapter" : path.endsWith("comic.html") ? "comic" : standaloneStoryPath ? "story" : "home";

const I18N = {
  hi: {
    home:"होम", stories:"कहानियाँ", comics:"कॉमिक्स", about:"हमारे बारे में", search:"कहानियाँ खोजें…",
    welcome:"आपकी कहानी की दुनिया में स्वागत है", tagline:"कहानियों की एक नई दुनिया",
    intro:"असली कहानियाँ, अनोखे किरदार और कल्पना से भरी दुनिया — पढ़िए अपनी अगली पसंदीदा कहानी।",
    explore:"कहानियाँ देखें →", featured:"⭐ खास कहानी", today:"आज की खास कहानी", viewAll:"सभी देखें →",
    readNow:"अभी पढ़ें →", latest:"📚 नई कहानियाँ", discover:"नई कहानियाँ खोजें",
    popularComics:"🎨 लोकप्रिय कॉमिक्स", comicsSub:"चित्रों के साथ मजेदार कहानियाँ",
    novelStories:"उपन्यास कहानियाँ", longStories:"लंबी कहानियाँ पढ़ें",
    comicStories:"कॉमिक कहानियाँ", withPictures:"चित्रों के साथ कहानी",
    photoStories:"फोटो कहानियाँ", inPictures:"तस्वीरों में कहानी",
    audiobook:"ऑडियोबुक", comingSoon:"जल्द आ रहा है",
    ourStories:"हमारी कहानियाँ", everyStory:"हर कहानी एक नई दुनिया की शुरुआत है।",
    searchGenre:"🔎 कहानी का नाम या genre खोजें…", sortFeatured:"क्रम: Featured first", sortAZ:"नाम: A–Z", sortChapters:"सबसे अधिक अध्याय",
    all:"सभी", allStories:"सभी कहानियाँ", choose:"अपनी अगली पसंदीदा कहानी चुनें।", story:"कहानी", storiesCount:"कहानियाँ",
    backStories:"← कहानियों पर वापस", previous:"← पिछला अध्याय", next:"अगला अध्याय →", startAgain:"फिर से शुरू करें ↻",
    chapter:"अध्याय", chapters:"अध्याय", ongoing:"● जारी है", completed:"✓ पूर्ण",
    language:"भाषा", settings:"सेटिंग्स", hindi:"हिन्दी", english:"English",
    audiobookSoon:"Audiobook — Coming Soon", audioText:"इस अध्याय की ऑडियो सुविधा पर अभी काम चल रहा है। जल्द ही यहाँ सुनने का विकल्प उपलब्ध होगा।",
    audioAvailable:"Audiobook available", listen:"🎧 इस अध्याय को सुनें",
    noStory:"कोई कहानी नहीं मिली। दूसरा नाम या category खोजें।",
    footer:"कहानियों की एक नई दुनिया।", rights:"सभी कहानियाँ अपने संबंधित लेखकों की संपत्ति हैं।",
    aboutText:"AJ StoryBooks — Stories · Novels · Comics"
  },
  en: {
    home:"Home", stories:"Stories", comics:"Comics", about:"About", search:"Search stories…",
    welcome:"Welcome to your story universe", tagline:"A New World of Stories",
    intro:"Original stories, unique characters and imaginative worlds — discover your next favorite story.",
    explore:"Explore Stories →", featured:"⭐ Featured Story", today:"Today's featured story", viewAll:"View all →",
    readNow:"Read Now →", latest:"📚 Latest Stories", discover:"Discover new stories",
    popularComics:"🎨 Popular Comics", comicsSub:"Fun stories told through pictures",
    novelStories:"Novel Stories", longStories:"Read long-form stories",
    comicStories:"Comic Stories", withPictures:"Stories with illustrations",
    photoStories:"Photo Stories", inPictures:"Stories told through pictures",
    audiobook:"Audiobook", comingSoon:"Coming Soon",
    ourStories:"Our Stories", everyStory:"Every story is the beginning of a new world.",
    searchGenre:"🔎 Search by story name or genre…", sortFeatured:"Sort: Featured first", sortAZ:"Name: A–Z", sortChapters:"Most chapters",
    all:"All", allStories:"All Stories", choose:"Choose your next favorite story.", story:"Story", storiesCount:"stories",
    backStories:"← Back to Stories", previous:"← Previous Chapter", next:"Next Chapter →", startAgain:"Start Again ↻",
    chapter:"Chapter", chapters:"Chapters", ongoing:"● Ongoing", completed:"✓ Completed",
    language:"Language", settings:"Settings", hindi:"हिन्दी", english:"English",
    audiobookSoon:"Audiobook — Coming Soon", audioText:"Audio narration is currently being developed. The listening option will be available here soon.",
    audioAvailable:"Audiobook available", listen:"🎧 Listen to this chapter",
    noStory:"No stories found. Try another name or category.", 
    footer:"A new world of stories.", rights:"All stories belong to their respective authors.",
    aboutText:"AJ StoryBooks — Stories · Novels · Comics"
  }
};

let lang = localStorage.getItem("aj-language") || "hi";
const t = key => I18N[lang][key] || I18N.hi[key] || key;
const tr = obj => typeof obj === "object" ? (obj[lang] ?? obj.hi ?? obj.en ?? "") : obj;

function textPair(hi,en){ return {hi,en}; }

const demoChapter = number => ({
  number,
  title: textPair(number===1 ? "गाँव की रहस्यमयी रात" : "कहानी का अगला मोड़",
                  number===1 ? "The Mysterious Night in the Village" : "The Next Turn in the Story"),
  paragraphs: number===1 ? [
    textPair("रात काफी गहरी हो चुकी थी। सोनपुर गाँव की सँकरी गलियों में सन्नाटा पसरा था। दूर पहाड़ी के पीछे से आती हवा पेड़ों की शाखाओं को ऐसे हिला रही थी, मानो कोई धीरे-धीरे किसी अनकही कहानी के पन्ने पलट रहा हो।",
              "It was deep into the night. Silence covered the narrow lanes of Sonpur village. The wind coming from behind the distant hill moved the branches as if someone were slowly turning the pages of an untold story."),
    textPair("आरव अपने पुराने घर की खिड़की के पास खड़ा था। तभी उसे गाँव के बीचोंबीच बने पुराने कुएँ की तरफ से एक अजीब-सी नीली रोशनी दिखाई दी। उसने आँखें मलीं, लेकिन रोशनी अब भी वहीं थी।",
              "Aarav stood beside the window of his old house. Suddenly, he noticed a strange blue light coming from the old well in the middle of the village. He rubbed his eyes, but the light was still there."),
    textPair("“इतनी रात को वहाँ कौन हो सकता है?” आरव ने खुद से पूछा। उसके मन में डर भी था और जानने की उत्सुकता भी। उसने अपनी टॉर्च उठाई, जूते पहने और दरवाज़े की कुंडी धीरे से खोली।",
              "“Who could be there at this hour?” Aarav wondered. He felt both fear and curiosity. He picked up his flashlight, put on his shoes and slowly opened the door."),
    textPair("“आरव… वहाँ मत जाना!” पीछे से उसकी छोटी बहन की आवाज़ आई।",
              "“Aarav… don't go there!” his younger sister called from behind."),
    textPair("आरव ठिठक गया। बहन के चेहरे पर घबराहट साफ दिखाई दे रही थी। “तुम्हें उस कुएँ के बारे में कुछ पता है?” उसने पूछा। जवाब देने से पहले ही दूर कहीं घंटी बज उठी — एक बार, फिर दूसरी बार… और तीसरी बार पर पूरा गाँव जैसे जाग गया।",
              "Aarav froze. The fear on his sister's face was unmistakable. “Do you know something about that well?” he asked. Before she could answer, a bell rang in the distance — once, then twice… and on the third ring, the whole village seemed to wake up."),
    textPair("आरव जानता था कि अब वापस लौटना आसान नहीं होगा। उस रात की शुरुआत एक सवाल से हुई थी, लेकिन सुबह होने तक उसकी ज़िंदगी बदलने वाली थी।",
              "Aarav knew that turning back would not be easy now. The night had begun with a question, but by morning, his life was going to change.")
  ] : [
    textPair("यह अध्याय अभी डेमो के लिए रखा गया है। यहाँ तुम्हारी असली कहानी का अध्याय टेक्स्ट आएगा।",
              "This chapter is currently a demo. Your real chapter text will go here."),
    textPair("हर नया अध्याय इसी data structure में जोड़कर वेबसाइट पर अपने आप दिखाई दिया जा सकता है।",
              "Every new chapter can be added to the same data structure and will automatically appear on the website."),
    textPair("जब कहानी तैयार होती जाएगी, हम इसी जगह वास्तविक अध्याय, illustrations, comic panels और बाद में audio जोड़ेंगे।",
              "As the story grows, we can add the real chapter, illustrations, comic panels and later audio here.")
  ],
  images: [], comics: [], audio: null
});

function makeChapters(count){ return Array.from({length:count},(_,i)=>demoChapter(i+1)); }

const stories = [
 {id:"mayavi-exchange",title:textPair("मायावी एक्सचेंज: वीर की खोज","Mayavi Exchange: Veer's Quest"),genre:["Fantasy","Adventure","Mystery"],
  desc:textPair("उत्तराखंड के एक छोटे से पहाड़ी गाँव में रहने वाले वीर की जिंदगी उस रात बदल जाती है, जब उसे अपने दादा जी का रहस्यमयी संदूक और एक मायावी एक्सचेंज सिस्टम मिलता है।","Veer’s life changes forever when he discovers his grandfather’s mysterious chest and a magical exchange system."),
  cover:"assets/stories/mayavi-exchange/chapter-01.png",feature:true,status:"ongoing",chapters:[{number:1,title:textPair("दादा जी का संदूक और मायावी शुरुआत","Grandfather's Chest and the Mysterious Beginning")}],link:"stories/mayavi-exchange.html"},
  {id:"mystery",title:textPair("रहस्यमयी गाँव","The Mystery Village"),genre:["Adventure","Mystery","Fantasy"],
  desc:textPair("एक छोटे से गाँव में छिपा है ऐसा रहस्य, जो आरव की पूरी दुनिया बदल सकता है।","A hidden mystery in a small village could change Aarav's entire world."),
  cover:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85",feature:true,status:"ongoing",chapters:makeChapters(12)},
 {id:"city",title:textPair("शहर का रहस्य","Secrets of the City"),genre:["Mystery","Thriller"],
  desc:textPair("एक अनजान संदेश, एक पुरानी इमारत और सवालों से भरी रात।","A strange message, an old building and a night full of questions."),
  cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85",status:"ongoing",chapters:makeChapters(10)},
 {id:"lastletter",title:textPair("अधूरी मोहब्बत","The Last Letter"),genre:["Romance","Drama"],
  desc:textPair("कुछ बातें खतों में रह जाती हैं और कुछ दिल में।","Some things remain in letters, and some remain in the heart."),
  cover:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85",status:"ongoing",chapters:makeChapters(8)},
 {id:"jungle",title:textPair("जंगल का दोस्त","A Friend in the Forest"),genre:["Adventure","Kids"],
  desc:textPair("एक बच्चे और जंगल के रहस्यमयी दोस्त की प्यारी कहानी।","A heartwarming story about a child and a mysterious friend in the forest."),
  cover:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85",status:"ongoing",chapters:makeChapters(8)},
 {id:"time",title:textPair("समय का चक्र","The Time Loop"),genre:["Sci-Fi","Thriller"],
  desc:textPair("जब घड़ी रुकती है, तब समय का असली खेल शुरू होता है।","When the clock stops, the real game of time begins."),
  cover:"https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=85",status:"ongoing",chapters:makeChapters(10)},
 {id:"gaon",title:textPair("गाँव की बेटी","Daughter of the Village"),genre:["Drama","Social"],
  desc:textPair("हिम्मत, परिवार और अपने सपनों को पाने की कहानी।","A story of courage, family and pursuing one's dreams."),
  cover:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",status:"ongoing",chapters:makeChapters(7)}
];

const comics=[
 {title:textPair("वीर और जादुई पेड़","Veer and the Magical Tree"),cover:"https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=85",desc:textPair("वीर को जंगल में मिलता है एक अनोखा दोस्त।","Veer finds an unusual friend in the forest.")},
 {title:textPair("छोटे जासूस","Little Detectives"),cover:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",desc:textPair("दो दोस्तों की मजेदार जासूसी।","A fun mystery solved by two friends.")},
 {title:textPair("जादुई दुनिया","The Magical World"),cover:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85",desc:textPair("एक दरवाज़ा, दूसरी दुनिया।","One door, another world.")},
 {title:textPair("रोबोट की दुनिया","The Robot World"),cover:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",desc:textPair("भविष्य की एक रंगीन कहानी।","A colorful story from the future.")}
];

function header(){
 const rootPrefix=page==="story"?"../":"";
 return `<header class="topbar"><div class="container nav">
 <a class="brand" href="${rootPrefix}index.html"><span class="brand-mark">📖</span><span><strong>AJ StoryBooks</strong><small>Stories · Novels · Comics</small></span></a>
 <nav class="navlinks" id="navlinks"><a class="${page==="home"?"active":""}" href="${rootPrefix}index.html">${t("home")}</a><a class="${page==="stories"||page==="chapter"||page==="story"?"active":""}" href="${rootPrefix}stories.html">${t("stories")}</a><a class="${page==="comic"?"active":""}" href="${rootPrefix}comic.html">${t("comics")}</a><a href="#about">${t("about")}</a></nav>
 <div class="navtools"><input id="navSearch" class="search" placeholder="${t("search")}">
 <select id="languageSelect" class="lang-select" aria-label="${t("language")}"><option value="hi">हिन्दी</option><option value="en">English</option></select>
 <button class="iconbtn" id="themeBtn" aria-label="Toggle theme">☾</button><button class="iconbtn menu-toggle" id="menuBtn" aria-label="Open menu">☰</button></div>
 </div></header>`;
}
function footer(){
 const rootPrefix=page==="story"?"../":"";
 return `<footer id="about"><div class="container footer-inner"><div><strong>📖 AJ StoryBooks</strong><br>${t("footer")}</div><div>© 2026 AJ StoryBooks. ${t("rights")}</div><div><a href="${rootPrefix}stories.html">${t("stories")}</a>　·　<a href="${rootPrefix}comic.html">${t("comics")}</a>　·　<a href="#about">${t("about")}</a></div></div></footer><div class="toast" id="toast"></div>`;
}
function tags(arr){return `<div class="tag-row">${arr.map((x,i)=>`<span class="tag ${i%3===1?"purple":i%3===2?"green":""}">${x}</span>`).join("")}</div>`}
function statusBadge(s){return `<span class="status-badge ${s.status==="completed"?"completed":""}">${s.status==="completed"?t("completed"):t("ongoing")}</span>`}
function storyCard(s){
 const href=s.link || `chapter.html?id=${s.id}`;
 return `<article class="story-card" data-title="${(tr(s.title)+" "+(s.title.en||"")+" "+s.genre.join(" ")).toLowerCase()}"><a href="${href}"><img class="cover" src="${s.cover}" alt="${tr(s.title)}" loading="lazy"></a><div class="story-info">${statusBadge(s)}${tags(s.genre)}<h3>${tr(s.title)}</h3><p>${tr(s.desc)}</p><div class="card-bottom"><span>▤ ${s.chapters.length} ${t("chapters")}</span><a class="btn small" href="${href}">${t("readNow")}</a></div></div></article>`;
}
function comicTiles(){return comics.map((c,i)=>`<a class="comic-tile" href="comic.html?page=${i+1}"><img src="${c.cover}" alt="${tr(c.title)}" loading="lazy"><span>${tr(c.title)}</span></a>`).join("")}
function home(){
 return `<main class="container"><section class="hero"><div class="hero-copy"><div class="eyebrow">${t("welcome")}</div><h1>AJ StoryBooks</h1><h2 style="margin:0 0 8px;font-size:25px">${t("tagline")}</h2><p>${t("intro")}</p><a class="btn" href="stories.html">${t("explore")}</a></div></section>
 <section class="section" id="autoFeaturedSection"><div class="section-head"><div><h2>${t("featured")}</h2><p>${t("today")}</p></div><a class="textlink" href="stories.html">${t("viewAll")}</a></div>
 <div class="featured-side-layout">
   <div id="autoFeatured"><div class="feature-card"><div class="feature-copy"><h3>${lang==="en"?"Loading stories…":"कहानियाँ लोड हो रही हैं…"}</h3></div></div></div>
   <div class="quick-list"><a class="quick-card" href="stories.html"><span class="quick-icon">📚</span><span><strong>${t("novelStories")}</strong><small>${t("longStories")}</small></span>→</a><a class="quick-card" href="comic.html"><span class="quick-icon">🎨</span><span><strong>${t("comicStories")}</strong><small>${t("withPictures")}</small></span>→</a><a class="quick-card" href="stories.html"><span class="quick-icon">🖼️</span><span><strong>${t("photoStories")}</strong><small>${t("inPictures")}</small></span>→</a><a class="quick-card" href="stories.html"><span class="quick-icon">🎧</span><span><strong>${t("audiobook")}</strong><small>${t("comingSoon")}</small></span>→</a></div>
 </div></section>
 <section class="section"><div class="section-head"><div><h2>${t("latest")}</h2><p>${t("discover")}</p></div><a class="textlink" href="stories.html">${t("viewAll")}</a></div><div class="story-grid" id="autoLatest"><div class="empty">${lang==="en"?"Loading…":"लोड हो रहा है…"}</div></div></section>
 <section class="section"><div class="section-head"><div><h2>${t("popularComics")}</h2><p>${t("comicsSub")}</p></div><a class="textlink" href="comic.html">${t("viewAll")}</a></div><div class="comic-strip">${comicTiles()}</div></section></main>`;
}
function listing(){
 return `<div class="page-banner"><div class="container"><h1>${t("ourStories")}</h1><p>${t("everyStory")}</p></div></div><main class="container"><div class="listing-tools"><input id="storySearch" placeholder="${t("searchGenre")}"><select id="sortStories"><option value="default">${t("sortFeatured")}</option><option value="az">${t("sortAZ")}</option><option value="chapters">${t("sortChapters")}</option></select></div><div class="filters" id="filters">${["All","Adventure","Mystery","Fantasy","Romance","Thriller","Sci-Fi","Kids","Drama"].map((g,i)=>`<button class="filter-btn ${i===0?"active":""}" data-filter="${g}">${g==="All"?t("all"):g}</button>`).join("")}</div><div class="section-head"><div><h2 id="resultTitle">${t("allStories")}</h2><p>${t("choose")}</p></div><span class="muted" id="resultCount"></span></div><div class="story-grid" id="storyGrid"></div></main>`;
}
function audiobookBox(chapter){
 if(chapter.audio) return `<section class="audiobook-card available"><div class="audio-icon">▶</div><div class="audio-copy"><strong>${t("listen")}</strong><small>${t("audioAvailable")}</small></div><audio controls preload="none" src="${chapter.audio}"></audio></section>`;
 return `<section class="audiobook-card"><div class="audio-icon">🎧</div><div class="audio-copy"><strong>${t("audiobookSoon")}</strong><small>${t("audioText")}</small></div><span class="coming-pill">${t("comingSoon").toUpperCase()}</span></section>`;
}
function chapter(){
 let s=stories.find(x=>x.id===params.get("id"))||stories[0];
 return `<main class="container"><article class="reader-shell"><a class="backlink" href="stories.html">${t("backStories")}</a><div class="reader-top"><img src="${s.cover}" alt="${tr(s.title)}"><div><div>${statusBadge(s)}</div><h1>${tr(s.title)}</h1><p>${tr(s.title.en ? s.title.en : s.title)} · ${s.chapters.length} ${t("chapters")}</p>${tags(s.genre)}</div><div class="reader-controls"><select id="chapterSelect">${s.chapters.map(ch=>`<option value="${ch.number}">${t("chapter")} ${ch.number} - ${tr(ch.title)}</option>`).join("")}</select><button class="iconbtn" id="fontDown" style="color:var(--ink);background:var(--bg);border-color:var(--line)">A−</button><button class="iconbtn" id="fontUp" style="color:var(--ink);background:var(--bg);border-color:var(--line)">A+</button></div></div><img class="reader-hero" src="${s.cover}" alt="${tr(s.title)}"><div class="progress"><span id="readProgress"></span></div><div id="audiobookSlot"></div><div class="chapter-text" id="chapterText"></div><div class="reader-bottom"><button class="btn secondary" id="prevChapter">${t("previous")}</button><span class="muted" id="chapterCount"></span><button class="btn" id="nextChapter">${t("next")}</button></div></article></main>`;
}
function renderChapter(s,n){
 let ch=s.chapters.find(x=>x.number===n)||s.chapters[0];
 $("#chapterText").innerHTML=`<h2 id="chapterTitle">${t("chapter")} ${ch.number} — ${tr(ch.title)}</h2>${ch.paragraphs.map(p=>`<p>${tr(p)}</p>`).join("")}${ch.images.map(src=>`<img class="story-illustration" src="${src}" alt="Chapter illustration" loading="lazy">`).join("")}${ch.comics.map(src=>`<img class="story-illustration" src="${src}" alt="Comic panel" loading="lazy">`).join("")}`;
 $("#audiobookSlot").innerHTML=audiobookBox(ch); $("#chapterCount").textContent=`${t("chapter")} ${n} ${lang==="en"?"of":"में से"} ${s.chapters.length}`; $("#readProgress").style.width=(n/s.chapters.length*100)+"%"; $("#chapterSelect").value=n; $("#prevChapter").disabled=n===1; $("#nextChapter").textContent=n===s.chapters.length?t("startAgain"):t("next"); document.title=`${tr(s.title)} — ${t("chapter")} ${n} | AJ StoryBooks`;
}
function standaloneStory(){
 const tpl=document.getElementById("storyTemplate");
 if(!tpl) return `<main class="container"><article class="reader-shell"><h1>Story not found</h1></article></main>`;
 const source=tpl.innerHTML;
 return `<main class="container"><article class="reader-shell standalone-story" id="standaloneStory">${source}</article></main>`;
}

function applyStandaloneStoryLanguage(){
 const root=document.getElementById("standaloneStory"); if(!root) return;
 const meta=root.querySelector(".story-metadata");
 const titleHi=meta?.dataset.titleHi||document.title;
 const titleEn=meta?.dataset.titleEn||titleHi;
 const descHi=meta?.dataset.descHi||"";
 const descEn=meta?.dataset.descEn||descHi;
 const cover=meta?.dataset.cover;
 document.title=`${lang==="en"?titleEn:titleHi} | AJ StoryBooks`;
 const title=root.querySelector("[data-story-title]"); if(title) title.textContent=lang==="en"?titleEn:titleHi;
 const desc=root.querySelector("[data-story-desc]"); if(desc) desc.textContent=lang==="en"?descEn:descHi;
 if(cover){const hero=root.querySelector("[data-story-cover]"); if(hero) hero.src=cover;}
 root.querySelectorAll("[data-lang]").forEach(el=>{el.hidden=el.dataset.lang!==lang;});
 const english=root.querySelector("[data-lang='en']");
 const hasEnglish=!!english;
 const notice=root.querySelector("#englishComingSoon");
 if(notice) notice.hidden=lang!=="en"||hasEnglish;
 const readHindi=root.querySelector("#readHindiBtn");
 if(readHindi) readHindi.onclick=()=>{localStorage.setItem("aj-language","hi");location.reload()};
 root.querySelectorAll(".story-chapter").forEach(ch=>{
   const titleNode=ch.querySelector("[data-chapter-title]");
   if(titleNode){ const hi=titleNode.dataset.hi||titleNode.textContent; const en=titleNode.dataset.en||hi; titleNode.textContent=lang==="en"?en:hi; }
 });
 const list=root.querySelector("#storyChapterList");
 if(list){
   const chapters=[...root.querySelectorAll(".story-chapter[data-chapter]")];
   list.innerHTML=chapters.map((ch,i)=>{const title=ch.querySelector("[data-chapter-title]"); const hi=title?.dataset.hi||`अध्याय ${i+1}`; const en=title?.dataset.en||hi; return `<a href="#chapter-${ch.dataset.chapter}">${lang==="en"?`Chapter ${ch.dataset.chapter} — ${en}`:`अध्याय ${ch.dataset.chapter} — ${hi}`}</a>`;}).join("");
 }
 const chapters=[...root.querySelectorAll(".story-chapter[data-chapter]")];
 chapters.forEach((ch,i)=>{
   let nav=ch.querySelector(".story-chapter-nav");
   if(!nav){nav=document.createElement("div");nav.className="story-chapter-nav";ch.appendChild(nav);}
   const prev=chapters[i-1], next=chapters[i+1];
   const prevHtml=prev?`<a class="btn secondary" href="#chapter-${prev.dataset.chapter}">← ${lang==="en"?"Previous Chapter":"पिछला अध्याय"}</a>`:`<span></span>`;
   const midHtml=`<span class="muted">${lang==="en"?`Chapter ${ch.dataset.chapter} of ${chapters.length}`:`अध्याय ${ch.dataset.chapter} / ${chapters.length}`}</span>`;
   const nextHtml=next?`<a class="btn" href="#chapter-${next.dataset.chapter}">${lang==="en"?"Next Chapter →":"अगला अध्याय →"}</a>`:`<span class="muted">${lang==="en"?"More chapters will be added later.":"आगे के अध्याय बाद में जोड़े जाएंगे।"}</span>`;
   nav.innerHTML=prevHtml+midHtml+nextHtml;
 });
 const fontTarget=root.querySelector(".chapter-text"); let size=Number(localStorage.getItem("aj-story-font-size")||18); if(fontTarget) fontTarget.style.fontSize=size+"px";
 const down=root.querySelector("#fontDown"), up=root.querySelector("#fontUp");
 if(down) down.onclick=()=>{size=Math.max(14,size-1);if(fontTarget)fontTarget.style.fontSize=size+"px";localStorage.setItem("aj-story-font-size",size)};
 if(up) up.onclick=()=>{size=Math.min(28,size+1);if(fontTarget)fontTarget.style.fontSize=size+"px";localStorage.setItem("aj-story-font-size",size)};
}

async function discoverStandaloneStories(){
 if(location.protocol==="file:") return [];
 let owner="",repo="";
 const host=location.hostname;
 if(host.endsWith("github.io")){
   owner=host.split(".")[0];
   const parts=location.pathname.split("/").filter(Boolean);
   repo=parts[0]||"";
 }
 const configured=window.AJ_STORYBOOKS_REPO||"";
 if(configured.includes("/")){[owner,repo]=configured.split("/");}
 if(!owner||!repo) return [];
 try{
   const api=`https://api.github.com/repos/${owner}/${repo}/contents/stories`;
   const res=await fetch(api,{headers:{Accept:"application/vnd.github+json"}}); if(!res.ok) return [];
   const files=await res.json();
   const htmlFiles=files.filter(x=>x.type==="file"&&/\.html$/i.test(x.name)&&x.name!=="story-template.html");
   const found=[];
   for(const f of htmlFiles){
     try{
       const r=await fetch(f.download_url); if(!r.ok) continue;
       const text=await r.text(); const doc=new DOMParser().parseFromString(text,"text/html");
       const m=n=>doc.querySelector(`meta[name="${n}"]`)?.content||"";
       const titleHi=m("story-title-hi")||f.name.replace(/\.html$/i,"");
       const titleEn=m("story-title-en")||titleHi;
       const descHi=m("story-desc-hi")||""; const descEn=m("story-desc-en")||descHi;
       const cover=(m("story-cover")||"").replace(/^\.\.\//,""); const genre=(m("story-genres")||"Fantasy").split(",").map(x=>x.trim()).filter(Boolean);
       const status=m("story-status")||"ongoing";
       const chapters=doc.querySelectorAll(".story-chapter[data-chapter]").length||1;
       const link=`stories/${f.name}`;
       found.push({id:f.name.replace(/\.html$/i,""),title:{hi:titleHi,en:titleEn},desc:{hi:descHi,en:descEn},genre,cover,feature:m("story-feature")==="true",status,chapters:Array.from({length:chapters},(_,i)=>({number:i+1,title:{hi:`अध्याय ${i+1}`,en:`Chapter ${i+1}`}})),link,external:true});
     }catch(e){}
   }
   return found;
 }catch(e){return []}
}

async function hydrateStandaloneStories(){
 const external=await discoverStandaloneStories(); if(!external.length) return;
 external.forEach(ext=>{const i=stories.findIndex(s=>s.id===ext.id); if(i>=0)stories[i]=ext; else stories.unshift(ext);});
 if(page==="home"){
   const featured=stories.find(s=>s.feature)||stories[0];
   const f=document.getElementById("autoFeatured"); if(f&&featured) f.innerHTML=`<article class="feature-card"><img class="cover" src="${featured.cover}" alt="${tr(featured.title)}"><div class="feature-copy"><div class="eyebrow">Editor's pick</div><div>${statusBadge(featured)}</div><h3>${tr(featured.title)}</h3>${tags(featured.genre)}<p>${tr(featured.desc)}</p><a class="btn" href="${featured.link}">${t("readNow")}</a>　<span class="muted" style="font-size:12px">▤ ${featured.chapters.length} ${t("chapters")}</span></div></article>`;
   const latest=document.getElementById("autoLatest"); if(latest) latest.innerHTML=stories.slice(0,8).map(storyCard).join("");
 }
 if(page==="stories") window.__renderStories?.();
}

function comic(){
 let idx=Math.max(1,Math.min(10,Number(params.get("page"))||1));
 return `<main class="container"><article class="comic-shell"><a class="backlink" href="index.html">← ${t("comics")}</a><div class="comic-head"><img src="${comics[0].cover}" alt="${tr(comics[0].title)}"><div><h1>${tr(comics[0].title)}</h1><p>Adventure · Fantasy · Kids · Illustrated comic</p>${tags(["Adventure","Fantasy","Kids"])}</div><div class="comic-actions"><select id="comicPage">${Array.from({length:10},(_,i)=>`<option value="${i+1}" ${i+1===idx?"selected":""}>Page ${i+1} of 10</option>`).join("")}</select><button class="iconbtn" id="comicPrev" style="color:var(--ink);background:var(--bg);border-color:var(--line)">←</button><button class="iconbtn" id="comicNext" style="color:var(--ink);background:var(--bg);border-color:var(--line)">→</button></div></div><div class="comic-grid"><div class="panel"><img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85" alt="Forest"><div class="bubble">${lang==="hi"?"वाह! ये पेड़ कितना बड़ा है!":"Wow! This tree is huge!"}</div></div><div class="panel"><img src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=85" alt="Magical tree"><div class="bubble">${lang==="hi"?"कहते हैं, इस पेड़ में जादुई शक्ति है…":"They say this tree has magical powers…"}</div></div><div class="panel"><img src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85" alt="Light in forest"><div class="bubble">${lang==="hi"?"अरे! इसकी शाखाओं से रोशनी निकल रही है!":"Look! Light is coming from its branches!"}</div></div><div class="panel"><img src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85" alt="Mysterious night"><div class="bubble">${lang==="hi"?"डरो मत वीर, तुम्हें एक खास काम करना है।":"Don't be afraid, Veer. You have a special task."}</div></div></div><div class="comic-nav"><button class="btn secondary" id="comicPrev2">← ${lang==="hi"?"पिछला पेज":"Previous Page"}</button><span class="muted" id="comicCount">Page ${idx} of 10</span><button class="btn" id="comicNext2">${lang==="hi"?"अगला पेज →":"Next Page →"}</button></div></article></main>`;
}

$("#app").innerHTML=header()+(page==="stories"?listing():page==="chapter"?chapter():page==="comic"?comic():page==="story"?standaloneStory():home())+footer();
if(page==="story") applyStandaloneStoryLanguage();

const savedTheme=localStorage.getItem("aj-theme"); if(savedTheme==="dark") document.documentElement.dataset.theme="dark";
$("#themeBtn").textContent=document.documentElement.dataset.theme==="dark"?"☀":"☾";
$("#themeBtn").addEventListener("click",()=>{let dark=document.documentElement.dataset.theme!=="dark";document.documentElement.dataset.theme=dark?"dark":"light";localStorage.setItem("aj-theme",dark?"dark":"light");$("#themeBtn").textContent=dark?"☀":"☾"});
$("#menuBtn").addEventListener("click",()=>$("#navlinks").classList.toggle("open"));
$("#languageSelect").value=lang;
$("#languageSelect").addEventListener("change",e=>{localStorage.setItem("aj-language",e.target.value);location.reload()});
$("#navSearch").addEventListener("keydown",e=>{if(e.key==="Enter")location.href=(page==="story"?"../stories.html":"stories.html")+"?q="+encodeURIComponent(e.target.value)});

if(page==="stories"){
 let filter="All"; const search=$("#storySearch"); search.value=params.get("q")||"";
 window.__renderStories=function render(){
  let q=search.value.toLowerCase().trim();
  let arr=stories.filter(s=>(filter==="All"||s.genre.includes(filter))&&(`${tr(s.title)} ${s.title.en} ${tr(s.desc)} ${s.desc.en} ${s.genre.join(" ")}`).toLowerCase().includes(q));
  let sort=$("#sortStories").value;
  if(sort==="az") arr.sort((a,b)=>tr(a.title).localeCompare(tr(b.title)));
  if(sort==="chapters") arr.sort((a,b)=>b.chapters.length-a.chapters.length);
  $("#storyGrid").innerHTML=arr.length?arr.map(storyCard).join(""):`<div class="empty">${t("noStory")}</div>`;
  $("#resultCount").textContent=`${arr.length} ${t("storiesCount")}`;
  $("#resultTitle").textContent=filter==="All"?t("allStories"):`${filter} ${t("stories")}`;
 }
 $("#filters").addEventListener("click",e=>{let b=e.target.closest("button");if(!b)return;filter=b.dataset.filter;document.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()});
 search.addEventListener("input",window.__renderStories); $("#sortStories").addEventListener("change",window.__renderStories); window.__renderStories();
}

if(page==="stories") hydrateStandaloneStories();
if(page==="home") hydrateStandaloneStories();
if(page==="story") { applyStandaloneStoryLanguage(); }

if(page==="chapter"){
 const s=stories.find(x=>x.id===params.get("id"))||stories[0];
 let n=Number(params.get("chapter"))||1;
 renderChapter(s,n);
 $("#chapterSelect").addEventListener("change",e=>{location.href=`chapter.html?id=${s.id}&chapter=${e.target.value}`});
 $("#prevChapter").addEventListener("click",()=>{if(n>1)location.href=`chapter.html?id=${s.id}&chapter=${n-1}`});
 $("#nextChapter").addEventListener("click",()=>{location.href=`chapter.html?id=${s.id}&chapter=${n===s.chapters.length?1:n+1}`});
 let size=18;
 $("#fontDown").addEventListener("click",()=>{$(".chapter-text").style.fontSize=(size=Math.max(14,size-1))+"px"});
 $("#fontUp").addEventListener("click",()=>{$(".chapter-text").style.fontSize=(size=Math.min(26,size+1))+"px"});
}


if(page==="comic"){
 const go=d=>{let x=Math.max(1,Math.min(10,(Number(params.get("page"))||1)+d));location.href=`comic.html?page=${x}`};
 $("#comicPrev").addEventListener("click",()=>go(-1)); $("#comicNext").addEventListener("click",()=>go(1));
 $("#comicPrev2").addEventListener("click",()=>go(-1)); $("#comicNext2").addEventListener("click",()=>go(1));
 $("#comicPage").addEventListener("change",e=>location.href=`comic.html?page=${e.target.value}`);
}

/* =========================================================
   AJ StoryBooks — Copy Protection
   This is a deterrence layer, not DRM. Anything displayed in
   a browser can ultimately be captured by a determined user.
   ========================================================= */
(function initCopyProtection(){
  const protectedSelectors = [
    '.chapter-text', '.reader-shell', '.mayavi-reader', '.comic-shell', '.story-card',
    '.feature-card', '.comic-strip', '.comic-grid'
  ].join(',');

  const isProtected = (target) => target && target.closest && target.closest(protectedSelectors);

  // Disable context menu on story/comic content.
  document.addEventListener('contextmenu', function(e){
    if (isProtected(e.target)) {
      e.preventDefault();
      showProtectionToast();
    }
  }, true);

  // Disable text selection inside story/comic content.
  document.addEventListener('selectstart', function(e){
    if (isProtected(e.target)) e.preventDefault();
  }, true);

  // Disable dragging story/comic images.
  document.addEventListener('dragstart', function(e){
    if (isProtected(e.target) || (e.target && e.target.tagName === 'IMG')) {
      e.preventDefault();
    }
  }, true);

  // Block common copy/save/source/print/devtools shortcuts while reading.
  document.addEventListener('keydown', function(e){
    if (!isProtected(document.activeElement) && !isProtected(e.target)) return;

    const key = String(e.key || '').toLowerCase();
    const blocked =
      (e.ctrlKey || e.metaKey) && ['c','x','u','s','p','a'].includes(key) ||
      e.key === 'F12' ||
      (e.ctrlKey || e.metaKey) && e.shiftKey && ['i','j','c'].includes(key);

    if (blocked) {
      e.preventDefault();
      e.stopPropagation();
      showProtectionToast();
    }
  }, true);

  // Block copy/cut events from protected story content.
  document.addEventListener('copy', function(e){
    if (isProtected(e.target)) {
      e.preventDefault();
      showProtectionToast();
    }
  }, true);
  document.addEventListener('cut', function(e){
    if (isProtected(e.target)) {
      e.preventDefault();
      showProtectionToast();
    }
  }, true);

  // Reduce mobile long-press text selection in protected areas.
  let pressTimer;
  document.addEventListener('touchstart', function(e){
    if (!isProtected(e.target)) return;
    pressTimer = setTimeout(function(){ showProtectionToast(); }, 550);
  }, {passive:true});
  document.addEventListener('touchend', function(){ clearTimeout(pressTimer); }, {passive:true});
  document.addEventListener('touchmove', function(){ clearTimeout(pressTimer); }, {passive:true});

  function showProtectionToast(){
    let toast = document.getElementById('copyProtectionToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'copyProtectionToast';
      toast.className = 'toast';
      toast.textContent = lang === 'en'
        ? 'Copying this story content is disabled.'
        : 'इस कहानी के टेक्स्ट की कॉपी करना बंद है।';
      document.body.appendChild(toast);
    }
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 1800);
  }
})();
