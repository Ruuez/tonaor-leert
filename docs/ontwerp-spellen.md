# Ontwerp werkorder stap 6, de spellen

Stand: 24 november 2026, concept voor de ontwerpsessie (nog niet gebouwd). Bronnen: `docs/werkvormen.md` (5. Spellen), `docs/masterplan.md` (C2 "minstens één spel per hoofdstuk", C5, D2, D4, H1), `docs/aanbevelingen.md` 10.3, `docs/scenes.md` (stap `game`).

## Welke eisen het dient

| Eis | Hoe |
|---|---|
| C5: spel is de stof zelf, werkt het herhaalmodel bij, één tot drie minuten, vervangt productief oefenen niet | elk spel gebruikt de woorden, klanken en sommen van de leerder; elke eerste goede beurt per onderdeel gaat langs `review(id,true,'spel',exid,true)`, zoals de snelronde nu; vorm `spel` staat in `NOGROW` (telt niet voor bloei) |
| C2: minstens één spel per hoofdstuk | meer soorten voor de stap `game`, zodat een hoofdstuk niet steeds de of het heeft |
| D2: geen straf op tijd, niets afpakken | geen aftellende klok; een misser kost niets en is geen fout in het herhaalmodel; alleen een eigen record, nooit een ranglijst |
| H1: losse herhaling verwerkt in spel | het spel kiest eerst onderdelen die aan de beurt zijn (`thirsty`), zoals de snelronde |

## Wat er nu is

De snelronde de of het (`H.sc_game`, `kind: "dehet"`): 60 seconden, eigen record (`S.speedBest`), een misser telt niet als fout.

## Wat er bij komt (eerste ronde)

Vijf spellen waarvan de vorm eronder al bestaat. Elk spel is een `kind` voor de stap `game` en heeft hetzelfde kader: tien beurten, een rustige klok die alleen de tijd laat zien (geen aftellen), en aan het eind de tijd en het eigen record voor dit spel.

| `kind` | Spel | Wat de leerder doet | Onderdelen | Gebruikt |
|---|---|---|---|---|
| `dehet` | De of het, met vorm | zoals nu, maar met de vaste rand en vorm van 10.3 als hulp die afbouwt: de eerste keren staat de vorm al bij het woord, later pas na het antwoord | woorden met de of het | bestaand, `art-de`/`art-het` |
| `klank` | Klankduel | hoort een woord en kiest uit twee (*man* of *maan*); de pauze tussen de beurten wordt iets korter, de stem niet sneller | de klankparen (`PAIRS`) | klankparen, geluidsbestanden |
| `koppel` | Koppelen | een geheugenspel van zes kaarten: drie woorden en hun omschrijving (`def`); twee kaarten omdraaien; een paar blijft open | woorden met `def` | bestaande woorden |
| `klok` | Zet de klok | hoort of leest een tijd (*kwart over drie*) en zet de wijzers | tijden, per 5 minuten | bestaand `setclock` |
| `geld` | Wisselgeld | ziet een bedrag en legt het met munten en briefjes | bedragen | bestaand `money` |

Later, zodra de vorm eronder bestaat (geen eigen ontwerp nodig; dezelfde opbouw): **Plek twee** (na de zinsbouwtafel 2.1), **Fout zoeken** (na 2.4), **Kortingsjacht** (na 1.8).

## Gedrag, voor alle spellen gelijk

- **Tien beurten**, geen tijdslimiet. De klok bovenin loopt mee en toont alleen de tijd; het record per spel is de snelste tijd met hooguit één misser. Wie langzaam speelt, maakt het spel gewoon af.
- **Herhaalmodel:** de eerste goede beurt per onderdeel in een spel telt als `review(id,true,'spel',exid,true)` (zoals de snelronde, regel C5 en codereview A3). Een misser is geen fout en komt niet in het foutprofiel.
- **Onderdelen kiezen:** eerst de doelen van de scène die al bekend zijn (`reps>0`), dan wat aan de beurt is (`thirsty`), tot er genoeg zijn. Zijn er te weinig (minder dan vijf voor `dehet`, `klank` en `koppel`), dan valt het spel weg en gaat de scène verder (zoals nu bij `dehet`).
- **Stil:** in de stille stand vallen `klank` en het gesproken deel van `klok` weg (dan leest de leerder de tijd).
- **Minder beweging:** omdraaien en de klok zonder animatie.
- **Tik en toetsenbord:** alles met tikken; geen slepen nodig (de munten bij `geld` worden aangetikt, niet gesleept).
- **Eigen record:** `S.gameBest = { kind: seconden }`, alleen voor de leerder zelf. Nieuwe opslag: SCHEMA 12 → 13, een stap die alleen `gameBest: {}` toevoegt en `speedBest` laat staan.

## Waar de spellen staan

- **In een scène:** de stap `game` met `kind` en `items` (bestaat). De schrijver kiest per hoofdstuk minstens één spel dat bij de situatie past (klok bij een afspraak, geld bij de markt, koppelen bij nieuwe woorden).
- **Op Vandaag (onder Meer):** de tegel van de snelronde wordt de tegel **Spelletje**: hij kiest het spel waarvan de meeste onderdelen aan de beurt zijn. Het record per spel staat erbij.

## Poort

`pakketcheck`: `kind` uit `['dehet','klank','koppel','klok','geld']`; `items` bestaan; bij `koppel` hebben de woorden een `def`; bij `klok` en `geld` geen items nodig (de getallen worden getrokken, zoals `gen`). De redactielijn controleert dat een hoofdstuk minstens één spel heeft (C2, bestaat al als melding).

## Wat kan breken

- **Voortgang:** alleen een toevoegende migratie (`gameBest`), met reservekopie.
- **Herhaalmodel:** de vorm `spel` telt niet voor bloei (`NOGROW`); de test bewaakt dat een spel nooit een fout geeft.
- **De les van `test-les`:** niets.
- **EDGE-koppeling:** niets.

## Tests

`tools/test-spellen.mjs`: per spel de keuze van onderdelen, dat alleen de eerste goede beurt telt, dat een misser niets doet, het record, het wegvallen bij te weinig onderdelen of in de stille stand, de poort, en de migratie in `test-migratie`.

## Wat het wegneemt

Niets. De snelronde blijft als `dehet`, nu met de hulp van de vaste vorm.

## Vragen aan de ontwerpsessie

1. **Tien beurten zonder aftellen** (voorstel), of de huidige 60 seconden houden voor de snelronde en tien beurten voor de rest?
2. **Record als tijd met hooguit één misser** (voorstel), of het aantal goed in één keer?
3. **De hulp bij de of het:** hoe snel afbouwen? Voorstel: de vorm staat bij een woord de eerste twee keer in het spel vóór het antwoord, daarna alleen na het antwoord.
4. **Koppelen:** alleen woord en omschrijving (voorstel), of ook woord en plaatje waar `scene.js` een ding heeft (*appels*, *klok*)? Het tweede kan later.
5. **De tegel op Vandaag:** het spel kiezen dat het meest oplevert (voorstel), of de leerder laten kiezen uit de vijf?
