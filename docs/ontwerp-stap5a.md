# Bouwontwerp werkorder stap 5, eerste deel: N-M1, R-M3, M5 en N-M4 (N-M2 wacht op een besluit)

Stand: 15 november 2026. Bouwsessie. De eerste twee eisen van stap 5 uit de werkorder. Daarna volgt ijkmoment G2 voor Nederlands, door de ontwerpsessie.

## N-M1: een woord aantikken is een keuze

Bron: `onderbouwing-nederlands.md` 2.1 en `scenes.md` ("Een woord aantikken is een keuze").

### Wat de leerder ziet

In een leestekst (ook bij een leesvraag) en in een gesprek staat een woord uit het hoofdstuk, of uit een pakket waar het op voortbouwt (`requires`), met een stippellijn eronder. Wie erop tikt, krijgt eerst drie betekenissen in de steuntaal. De juiste betekenis komt uit het woord zelf, de twee andere komen uit andere woorden van hetzelfde soort. Na een goede keuze toont de app het woord met lidwoord en betekenis, plus de omschrijving (`def`), en leest het woord voor.

### Wat de app bijhoudt (na de codereview)

- Een juiste keuze bij de eerste poging is een ontmoeting, maar alleen voor een woord dat al in de herhaling zit (`reps` > 0): een passieve review, met een logregel en zonder groei, fout of vorm.
- Een woord dat nog nieuw is, wordt niet als gezien gemarkeerd. Anders raakt het verweesd: het komt dan nooit als nieuw woord en nooit als herhaling.
- Hooguit één ontmoeting per woord per scherm. Is er eenmaal fout gekozen, dan telt het daarna niet meer.
- Een foute keuze telt niet. In een losse les en buiten `STORE` ok wordt niets bijgehouden.

### Wanneer het niet kan

- **Zonder steuntaal:** in de examenvorm, en ook waar de steuntaal bewust uit staat (moeilijk, `nosup`, instap, controle), is er niets aan te tikken.
- **In een tekening (`look`):** daar blijft aantikken tonen en voorlezen.
- **Woorden die de vraag zelf oefent (`q.items`):** die zijn niet aan te tikken, anders verraadt aantikken het antwoord.

### Grenzen

- Alleen losse woorden, geen vaste zinnen van meer woorden.
- Alleen de vorm zoals in het pakket: "stations" is niet aan te tikken als alleen "station" bestaat.
- Een woord met twee betekenissen ("hoe laat" tegenover "te laat") toont de betekenis uit het pakket. Dit is een punt voor het ijkmoment.

## R-M3: soorten sommen mengen

Bron: `onderbouwing-rekenen.md` 2.5.

### Hoe het werkt

- **Aanpak per som:** elke som kent zijn aanpak. Die staat in het veld `approach` van de oefening (zie `pakketformaat.md`); zonder dat veld geldt de vorm (geld, klok, korting).
- **Mengen in de herhaling:** de samensteller (`mixAppr`, na `noSameForm` en vóór `breakTriples`) zet twee sommen met dezelfde aanpak in de herhaling nooit direct na elkaar. Daartoe schuift hij een ander onderdeel ertussen. Een uitleg blijft bij de som erna. Als er niets te schuiven is, blijft de volgorde staan en valt er niets weg.
- **Nieuw mag geblokt:** een som die nieuw is (`_new`), mag wel naast een som met dezelfde aanpak staan. Zo leert de leerder de aanpak eerst geblokt.
- **Mengen van soorten:** de samensteller kiest per les al verschillende vaardigheden die aan de beurt zijn, één oefening per vaardigheid. Zodra een soort is aangeleerd, komt hij dus gemengd terug.

## Besluiten van de ontwerpsessie (Fable, 15 november 2026)

1. **Een nieuw woord aantikken:** zo laten; het levert niets op. De leerkaart en de uitleg bij de introductie zijn meer waard dan het overslaan ervan. Komt terug bij G2.
2. **Aanpakken:** rk-1 krijgt een expliciete `approach`: r-geld `money`, r-komma `decimal`, r-10 `percent-tenth`, r-25 `percent-fraction`. Wie verschillende aanpakken naast elkaar ziet, leert ze beter uit elkaar houden (`onderbouwing-rekenen.md` 2.5). Hetzelfde label zou ze ten onrechte nooit naast elkaar zetten. Gebouwd: per oefening naar het eerste item. De klok (r-klok) heeft geen `approach` en valt dus terug op de vorm.
3. **Steuntaal op "altijd":** aantikken blijft, maar toont de betekenis meteen, zonder keuze, en telt niet als ontmoeting. Gebouwd.

## M5, N-M4 en N-M2 (na de codereview en ijkmoment G2)

Bron: `ontwerp-stap2b.md` (M5, besluiten na G2) en `herhaalmodel.md` 10b.

- **Treden (`TIER`):**
  - kiezen (1): herkennen, gatzin, luisteren en kiezen, gesprek, lezen, kaart, tijdlijn;
  - afmaken (2): typen, luisteren en typen, dictee, zin bouwen;
  - een eigen zin (3): `make` of spreken, met de checklist zelf afgevinkt.
- **Trede 2:** goed bij de eerste poging in een gesloten productieve vorm, op twee verschillende dagen (`MOTOR.tierN`, `tierDays`).
- **Trede 3:** trede 2 plus een eigen zin.
- **Bewaren:** de bereikte trede wordt bewaard (`it.tier`), en een eigen zin ook (`it.own`), zodat het inkorten van de reeks pogingen niets afpakt.
- **Het huidige antwoord telt mee:** de trede wordt bijgewerkt vóór de groei wordt berekend.
- **Oefenen:** `chooseEx` kiest de trede erboven. Na twee fouten op rij daar gaat hij één trede terug, totdat er op de lagere trede weer iets goed ging (geen vastlopen).
- **Bloei van een regel:** trede 2 en een eigen zin.
- **N-M2:** herkennen groeit met 0,6.
- **Volle bloei:** nooit vóór dag 21 (A2).
- **Bestaande bloei:** onderdelen boven 9 dagen krijgen bij migratie 7 naar 8 `gf` en houden hun bloei. Een wachttijd wordt nooit korter.
- **Opslag:** SCHEMA 8, alleen toevoegend (`gf`, en lui ook `tier` en `own` op een onderdeel).

## MO-M2: punten alleen achteraf

Bron: `onderbouwing-motivatie-en-kennis.md` 2.2. Een beloning die je vooraf verwacht, ondermijnt de eigen motivatie; waardering in woorden achteraf verhoogt haar.

Wat de controle opleverde:
- **Inhoud en functies:** nergens hangt inhoud of een functie aan een aantal punten.
- **Punten zakken nooit:** `addPts` telt alleen op, ook bij een gedeeltelijk antwoord. Alleen Alles wissen zet ze op nul, en dat doet de leerder zelf.
- **Eén overtreding, hersteld:** het scherm Route zei "Kies samen met je begeleider een beloning voor als het lukt". Dat was een beloning die vooraf beloofd werd. Nu staat er: "Kijk daarna samen met je begeleider terug op wat je nu kunt" (waardering achteraf).
- **Test:** `tools/test-motivatie.mjs` bewaakt dit.

## MO-M4: gedrag meten

Bron: `onderbouwing-motivatie-en-kennis.md` 2.1.
- **Wat de app bijhoudt:** per dag hoe vaak het doorgaan-scherm verschijnt na een ronde en hoe vaak de leerder daarna doorgaat (`behNote`, `S.beh`). Dat wordt hooguit 12 weken bewaard.
- **Opslag:** SCHEMA 9, alleen toevoegend.
- **Scherm van de begeleider (meekijken):** een tabel van de laatste vier weken, per week: dagen met leertijd, minuten, rondes, hoe vaak de leerder doorging, en de tikken "te moeilijk" en "saai". Zo staat wat de leerder doet naast wat de leerder aangeeft.
- **Het bericht naar de EDGE:** verandert niet.

## MO-M6: sneller bijsturen in de eerste twaalf weken

Besluit van de ontwerpsessie (18 november 2026). Voor de soort ronde bewaart elke tik na een ronde `k`, uit een vaste naam: les, Engels of scène.

- **Twee keer op rij "te moeilijk"** bij de les of Engels: de volgende ronde van die soort is kort en kiest in plaats van typen. Engels heeft geen korte ronde in het pakket, dus daar geldt × `MOTOR.steerShort` (0,6, aanname).
- **Twee keer op rij "saai"** bij de les, Engels of een scène, en de laatste tik was niet "te moeilijk":
  - de volgende ronde krijgt één nieuw woord meer en de zwaardere vorm (feel = makkelijk);
  - dezelfde vorm komt hooguit één keer achter elkaar (`noPairs`);
  - Vandaag stelt een verhaal voor, alleen als die tikken van de laatste 7 dagen zijn.
- **Duur:** alleen in de eerste `MOTOR.steerWeeks` (12) weken na de eerste leerdag (`S.days`). Na Alles wissen beginnen die twaalf weken opnieuw.
- **Begeleider:** ziet het bij meekijken. Het bericht naar de EDGE verandert niet: `steer.feel` blijft de laatste tik zelf (`feelConf`). Het nieuwe veld komt met het widgetpakket in stap 12.
- **Scènes (besluit ontwerpsessie):** de tik na een scène is altijd over te slaan (k = scene).
  - Twee keer "te moeilijk": de volgende scène krijgt meer steun. De steuntaal staat meteen aan (ook bij nosup, behalve in examenvorm), de eerste hint staat er al, en de extra komt na de eerste fout van dezelfde soort.
  - Twee keer "saai": de zwaardere vorm (typen bij een kort antwoord) en een voorstel op Vandaag.
- **Ontdek** (losse lessen) krijgt geen tik. "Meer zoals dit" bij de draden komt later.

## M6 en N-M6: de vier strengen

Bron: `ontwerp-stap2b.md` (M6, N-M6) en het didactisch plan, hoofdstuk 2.

- **Streng per scherm (`strandOf`, gezet in `frame`):**
  - input: lezen, luisteren, het verhaal en een losse les;
  - output: een gesprek, zelf maken en spreken;
  - vloeiendheid: een spel, de zwaardere vorm en de snelronde;
  - taal: al het andere, waaronder de uitleg.
- **De klok** telt per dag ook per streng (`S.strand`, hooguit 12 weken bewaard).
- **Opslag:** SCHEMA 10, alleen toevoegend.
- **Vandaag:**
  - Een streng die over 7 dagen onder `MOTOR.strandLow` (12,5%) blijft, krijgt een melding. Dat geldt vanaf `strandMin` (60) minuten; beide waarden zijn aannames.
  - Anders volgt N-M6: is er vandaag na 5 minuten leren nog niets gelezen of geluisterd, dan komt een knop naar een verhaal.
- **Begeleider:** ziet bij meekijken de verdeling over de laatste 7 dagen.
- **Nog niet gebouwd:** dat de app de keuze van de volgende scène of activiteit laat meewegen. Dat is een vervolgstap.

## E-M1 en E-M2: Engels gescheiden en via de steuntaal

Bron: `onderbouwing-engels.md` 2.2 en 2.3, `ontwerp-stap2b.md`.

- **E-M1:** een nieuw woord wacht als zijn tegenhanger in de andere taal minder dan `MOTOR.pairDays` (7) dagen geleden nieuw was (`pairOf` via `tr.nl`, `pairBlocked` in `newWords`).
- **E-M2:** de Engelse oefeningen tonen de betekenis in de steuntaal.
  - Het Nederlandse woord staat er alleen nog bij als brug, als het erop lijkt (`nlLike`). Bij een valse vriend (`falseFriend`) staat er een waarschuwing.
  - Vroeger stond de Nederlandse vertaling er altijd bij ("Nederlands: …"). Dat mengde twee vreemde talen, en dat wil E-M1 juist voorkomen.
  - Bij Nederlands als steuntaal (of alleen Nederlands) blijft de Nederlandse vertaling de prompt.
  - In en-t1 krijgen colleague (de collega) en information (de informatie) een `nlLike`.

## Wat kan breken

- **Opslag:** niets. De vorm `tik` komt in de bestaande lijst `forms`.
- **`test-les`:** ongewijzigd, want in de vastgelegde les staan geen twee sommen met dezelfde aanpak naast elkaar.
- **Koppeling met de begeleider:** ongewijzigd.

## Tests

- `tools/test-tik.mjs`: aansluiting, regels en genoeg afleiders per hoofdstuk.
- `tools/test-samensteller.mjs`: R-M3.
