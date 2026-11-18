# Ijkmoment G2: Nederlands

Stand: 18 november 2026. Ontwerpsessie. Volgens het masterplan (stap 3 en 3b): een steekproef op de eerste drie hoofdstukken, de eindtermen naast de bronnen, en de volledige tekst van de vijf zwaarst wegende studies voor Nederlands. Bekeken zijn de code en de lesstof zelf (`content/nl-*.json`, `index.html`), niet de conclusies van de bouwsessie. De uitkomst is een lijst met wat een eis niet haalt; de bouwsessie herstelt, en de lijn schrijft daarna volgens de bijgestelde opdracht.

## 1. Wat goed is

- Elk hoofdstuk en elke scène noemt zijn eindtermen (`goals`); de poort bewaakt dat (eis G2, deel 1).
- De scènes hangen aan een echte situatie (melden op het werk, rooster, instructie, ziek melden), de woorden zijn bruikbaar, de grammatica volgt de leerroute (inversie, tijd-manier-plaats, *want*), en de foute keuzes hebben een fouttype voor het foutprofiel.
- Regels gaan van kiezen naar bouwen; rekenen werkt met een uitgewerkt voorbeeld, stappen, schatten en "kan dat kloppen?". De kennislessen hebben een bron en beginnen met raden.
- Inhoudelijke fouten zijn zeldzaam na de reviews; één gevonden (zie 2.6).

## 2. Wat een eis niet haalt

Gemeten over alle zes hoofdstukken van thema 1 (344 keuzevragen, 30 scènes Nederlands) en gelezen in *Thuis*, *Werk* en *Dokter*.

### 2.1 Het goede antwoord is meestal het langste (A, D: leren dat werkt; toetsen die iets zeggen)

Bij 231 van de 344 keuzevragen (67%) is het goede antwoord het langste, bij 153 (44%) het enige langste. Bij drie opties is de kans 33%. Wie altijd het langste kiest, haalt dus twee derde zonder iets te weten; de controle aan het eind van een scène en het foutprofiel meten dan deels die truc. Het goede antwoord staat ook nooit als vierde en het vaakst in het midden (de app schudt de volgorde wel, dus de plek is geen probleem; de lengte wel).

**Herstel:** (1) de poort (`pakketcheck`) meldt per hoofdstuk het aandeel "goed = langste" en weigert boven 40%; (2) de schrijversopdracht: foute keuzes zijn even lang en even precies als de goede, en een foute keuze mag de langste zijn; (3) de reviewer telt het. De bestaande hoofdstukken gaan door een herstelronde op dit ene punt.

### 2.2 Elke scène heeft dezelfde opbouw (H6: geen grind; de wens van de eigenaar: geen stramien)

Van de 30 scènes Nederlands volgen ze allemaal: instap met vier vragen (betekenis kiezen, "typ het laatste woord dat je hoort", "typ met lidwoord", kiezen) → kijken → ophalen → gesprek → regel → invullen → doen → extra → controle met twee vragen. Ze verschillen alleen doordat er een lees-, luister-, maak- of spreekstap tussen staat. Na drie scènes weet de leerder precies wat er komt; dat is de grind die de eigenaar niet wil, ook als de vragen zelf goed zijn.

**Herstel:** de vaste delen (instap, ophalen, controle) blijven, want ze dragen het herhaalmodel en de diagnose. De rest volgt de situatie: een scène mag beginnen met de luistertekst of met een probleem, mag zonder gesprek, mag twee doe-stappen hebben en geen regel, mag eindigen met zelf maken. In de schrijversopdracht: geen twee scènes in een hoofdstuk met dezelfde volgorde van stappen; de poort meldt het. De instapvragen wisselen van vorm (niet steeds dezelfde vier).

### 2.3 De teksten zijn te kort (kwaliteitskader; leerroute N1; examen lezen)

Lees- en luisterteksten in thema 1: 13 tot 165 woorden, meestal onder de 100. Het kwaliteitskader vraagt per thema drie tot vijf teksten van 110 tot 450 woorden; het examen lezen werkt met zes teksten in 110 minuten. De vragen bij een tekst zijn vooral letterlijk opzoeken (hoe laat, welk getal); verband, bedoeling en conclusie (eindterm lezen-1, -3, -5) komen weinig voor.

**Herstel:** per hoofdstuk minstens één tekst van 150 tot 300 woorden (thema 1) en vanaf thema 3 tot 450, met vragen naar tekstsoort en bedoeling, hoofdzaak, verband tussen delen en een conclusie, naast opzoeken. De korte teksten blijven als opstap.

### 2.4 Geen examenvorm in de lesstof (G4; onderbouwing Nederlands 1: "de examenvorm is zelf leerstof")

Geen enkele scène in thema 1 heeft `exam: true`. De speler kan het (één keer horen, 25 seconden, spreken op 20 en 30 seconden). Thema 1 is A2, dus volledig in examenvorm is nog vroeg; maar de leerroute vraagt per thema een themaoefentoets, en die ontbreekt.

**Herstel:** per thema een afsluitende toets (stap 10 in de werkorder), met één onderdeel in examenvorm per thema vanaf thema 2 (eerst luisteren: één keer horen; dan spreken op tijd).

### 2.5 Raden telt als fout (motivatie: raden vooraf is een opening, geen toets)

Een raadvraag ("Raad eens: hoe snel geef je je verhuizing door?") gaat bij een foute keuze naar het foutprofiel (`scFault`). Raden vooraf hoort nieuwsgierig te maken; een "fout" erbij straft dat en vervuilt het foutprofiel.

**Herstel:** een vraag met `guess: true` (zoals `standpunt` in een les) telt niet voor het herhaalmodel en niet voor het foutprofiel; de terugkoppeling geeft het antwoord met uitleg. De poort: een vraag die met "Raad" begint, heeft `guess: true`.

### 2.6 Eén inhoudelijke fout (regel 18: blokkerend)

*Werk*, kennisles: "Waarom staat het aantal uren op de loonstrook?" De keuze "Omdat de uren het loon bepalen" is fout gerekend, maar is ook juist. Herstellen.

### 2.7 Klein

- *Thuis*, rekenen: een schatvraag met een lijst van elf goedgekeurde getallen; gebruik `tol`.
- In `index.html` staat een vaste Nederlandse zin buiten de vertaaltabel ("Dat past ook! Maar hier zoeken we een ander woord."). Naar `I18N`, met `th` en `en`.
- Spreken en schrijven: één spreek- en drie maakopdrachten per hoofdstuk. Voor A2 genoeg; vanaf thema 2 per scène een productieve stap, en spreken op tijd (N-M7).

## 3. De dekkingstabel (eis G2, deel 2)

De dekkingstabel in `STATUS.md` is van 14 november en telt per lijn, niet per eindterm. De eis vraagt per eindterm: hoeveel lesstof en hoeveel toetsvragen. **Herstel:** een script (`tools/dekking.mjs`) dat uit de pakketten per eindterm telt: scènes, vragen, waarvan in examenvorm, en toetsvragen; de uitkomst in `STATUS.md`, bij elke release opnieuw.

## 4. De eindtermen naast de bronnen

Steekproef op alle `nt2-I-*` in `eindtermen.md`, naast de officiële regeling en de examensite.

- **De bron is vervangen.** [N1], de Regeling examenprogramma Staatsexamens Nt2 (Staatscourant 2020, 1123), is per 1 januari 2024 ingetrokken door de *Regeling examenprogramma Staatsexamen Nt2 2024*, Staatscourant 2023, 3058, artikel 2 (door de ontwerpsessie zelf nagelezen). Die regeling voegt een woordenlijst van het College toe. De handelingen in de bijlage (paragraaf 3A tot 3D) zijn volgens de steekproef inhoudelijk vrijwel gelijk; een vergelijking regel voor regel is nog niet gedaan. Er is ook een nieuwer examenreglement (2026: Staatscourant 2025, 22377; 2027: Staatscourant 2026, 24802) dan [N4].
- **De vindplaats** "bijlage 3" klopt niet; het is de bijlage, paragraaf 3A (lezen) tot 3D (spreken).
- **De inhoud** van lezen-1 tot -5 en luisteren-1 en -2 klopt. Bij schrijven en spreken is de splitsing in twee codes en "bij I over alledaagse onderwerpen" een eigen indeling; de bron maakt het onderscheid tussen I en II in paragraaf 2 (niveau B1, vertrouwde en werkgerelateerde onderwerpen, de woordenlijst), niet per handeling. Dat is te verdedigen, maar moet zo genoemd worden.
- **Wat ontbreekt:** de niveaubeschrijving per programma (paragraaf 2), de kwaliteitseisen bij schrijven en spreken (passend bij de situatie, leesbaar en verstaanbaar, opbouw, briefconventies, enkele fouten toegestaan), en bij luisteren dat dialect niet getoetst wordt. De kwaliteitseisen zijn precies wat de checklist bij zelf maken en spreken nodig heeft.
- **Examenvorm** (staatsexamensnt2.nl): lezen 35 of 36 vragen; schrijven programma I = 8 zinstaken, 2 deelschrijftaken, 2 korte schrijftaken. Overnemen in `eindtermen.md` en in `onderbouwing-nederlands.md` 1.

## 5. De vijf studies

Opdracht uit `onderbouwing-nederlands.md` 5. Drie volledig gelezen (door hulpagenten, met pagina's; de ontwerpsessie heeft de conclusies nagelopen), twee niet vrij beschikbaar.

| Studie | Gelezen | Wat het verandert |
|---|---|---|
| Andringa, De Glopper & Hacquebord 2011 | volledig | Begonnen met 102 leerlingen van 12 tot 18 jaar, 67 met alle metingen (niet "81 leerders"). Uitleg won bij het herkennen van fouten, niet bij vrij schrijven; beide groepen gingen in vrij schrijven evenveel vooruit. **Uitleg met een vergelijking met de moedertaal hielp leerders met een moedertaal die op het Nederlands lijkt, en werkte slechter bij een moedertaal die het anders doet** (bij de trappen van vergelijking, één structuur). De auteurs raden aan vooral veel betekenisvolle invoer te geven. |
| De Jong e.a. 2012 | volledig | 181 volwassenen, gevorderd (niet A2), 120 seconden per taak, beoordeeld op hoe goed de inhoud overkomt, niet op fouten. Woordenschat en intonatie verklaren samen bijna alles (75%); zinnen snel bouwen weegt mee, losse woordsnelheid minder. Correlatie, geen training. |
| Suzuki 2017 | grotendeels (methode, resultaten, discussie) | 54 studenten, kunsttaal, één regel, vier sessies **zelf mondeling maken**; 3,3 dagen tussen de sessies was beter dan 7 (d ≈ 0,5, ook na vier weken), voor de regel én voor de woorden. Verklaring: bij te lange tussentijd lukt het ophalen niet meer. Vuistregel van de auteur (voorlopig): tussentijd ongeveer een vijfde van hoe lang je het wilt onthouden. Twee dagen en het oplopen daarna zijn niet getest. |
| Yanagisawa, Webb & Uchihara 2020 | alleen samenvatting (niet vrij) | bevestigt: kiezen uit opties is de sterkste vorm, uitleg in de moedertaal beter dan in de doeltaal |
| Kim & Webb 2022 | alleen samenvatting (niet vrij) | gespreid beter dan geblokt, vooral op latere toetsen; langere tussentijden beter op latere toetsen; **oplopend en gelijk ongeveer even goed** |

**Gevolgen:**

1. **Vergelijking met het Thais: niet standaard.** `onderbouwing-nederlands.md` 2.3 zegt "bij elke regel een korte vergelijking met het Thais", en het didactisch plan "helpt waar die afwijkt" (McManus & Marsden 2017). Andringa e.a. vonden bij één structuur het omgekeerde: uitleg werkte slechter bij een moedertaal die het anders doet. Het bewijs is dus tegenstrijdig, en Thais heeft geen vervoeging, geen lidwoord en geen trappen in de vorm. Nieuwe regel: de vergelijking met de moedertaal staat er alleen waar het Thais iets vergelijkbaars heeft (bijvoorbeeld woordvolgorde bij een vraag, tijdwoorden), en waar het Thais het anders doet staat er één zin *"In het Thais zeg je dit niet zo; let op …"* in plaats van een uitleg via het Thais. Te toetsen met het foutprofiel.
2. **Uitleg kort, gebruik veel.** Beheersing van een regel meet je in een eigen zin (N-M4, bevestigd). Uitleg blijft kort; de tijd gaat naar invoer met betekenis en zelf maken.
3. **Grammatica kort gespreid in het begin: blijft, met een betere grond.** Drie tot vier dagen is onderbouwd (Suzuki, bij zelf maken); twee dagen niet. De motor begint op drie dagen voor een nieuwe regel en verkort de tussentijd weer als het ophalen mislukt.
4. **Oplopende tussentijden zijn geen bewezen winst** boven gelijke (Kim & Webb). Het herhaalmodel blijft, maar de aanname staat erbij en wordt met de bewaarde pogingen getoetst.
5. **Spreken:** de checklist bij spreken krijgt *komt de inhoud over?* als eerste punt (zoals De Jong en het examen beoordelen), daarna woordkeus, zinsbouw en uitspraak met **intonatie**. Tempospellen blijven, maar als hulpmiddel, niet als maat; de maat is de spreekopdracht zelf.

## 6. Wat de bouwsessie doet

In deze volgorde, naast het lopende werk:

1. **De inhoudelijke fout** in de kennisles van *Werk* (2.6): meteen.
2. **Poort en opdrachten:** "goed = langste" meten en boven 40% weigeren (2.1); geen twee scènes met dezelfde stappenreeks per hoofdstuk (2.2); minstens één tekst van 150 tot 300 woorden met vragen naar bedoeling, verband en conclusie (2.3); `guess: true` bij raadvragen (2.5); `tol` bij schatten. In `redactie/opdracht-schrijver.md` en `opdracht-reviewer.md`.
3. **Herstelronde thema 1** op 2.1 en 2.3 (de lengte van de foute keuzes; één langere tekst per hoofdstuk). De stappenreeks (2.2) bij de volgende ronde van onderhoud. Thema 2 wordt meteen volgens de nieuwe opdracht geschreven.
4. **De app:** `guess` (geen fout, geen foutprofiel); de vaste zin naar `I18N`.
5. **Dekking per eindterm** (3): het script en de tabel in `STATUS.md`.
6. **Eindtermen** (4): bron vervangen door Staatscourant 2023, 3058, vindplaats aanpassen, de twee regelingen regel voor regel vergelijken, kwaliteitseisen en examenvorm toevoegen.
7. **Bij M5/N-M4 en N-M3:** de gevolgen in 5 (vergelijking met het Thais alleen waar het past; drie dagen als start voor een nieuwe regel, korter na een mislukte poging).
8. **Bij de examenvorm (stap 10):** een themaoefentoets per thema (2.4).
