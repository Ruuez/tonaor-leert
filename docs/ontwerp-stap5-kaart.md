# Ontwerp stap 5: de kaart als thuisscherm, met album

Stand: 20 november 2026, concept voor de ontwerpsessie (nog niet gebouwd). Bronnen: `docs/masterplan.md` (stap 5, eisen D1 tot D5, E5, H1), `docs/concept-leerwereld.md` (de kaart, het album, Onderweg, besluit 3: een neutraal figuurtje met een kleur naar keuze), `docs/route-en-prognose.md`.

## Welke eisen het dient

| Eis | Hoe |
|---|---|
| D1 Reden om door te gaan | De kaart toont het pad, de plek waar de leerder is, en de volgende plek (dicht, met één regel over wat daar gebeurt). |
| D2 Nooit iets afpakken | Een plek die af is, blijft af en blijft open. Er gaat niets dicht, er is geen teller die terugloopt en geen "je hebt een dag gemist". |
| D3 Weekdoel | De weekring van Vandaag staat bovenaan de kaart (dezelfde klok, `S.mins`). |
| D5 Levend en pastel | Een getekend landschap in de kleuren per vak, het figuurtje beweegt één keer naar de nieuwe plek; met "minder beweging" staat het er meteen. |
| E5 Route met tijd en examendatum | Op de kaart een regel "Examen naar verwachting: maand" uit dezelfde berekening als het tabblad Route (`rCalc`), met een tik naar Route. De route zelf verandert niet. |
| Stap 5, "klaar als" | Niets van de voortgang verloren; het huidige thuisscherm en de tuin blijven te kiezen op Ik. |

## Wat er voor de leerder verandert

Niets, zolang de schakelaar op Ik op het oude thuisscherm staat. Dat blijft de standaard tot de eigenaar na G3 anders beslist.

Staat de schakelaar op **Kaart**:
- Het eerste tabblad heet **Kaart** in plaats van Vandaag, het tweede **Album** in plaats van Tuin. Route en Ik blijven.
- **De kaart** (één scherm, verticaal pad, 375 px):
  - bovenaan de weekring en de examenregel;
  - daaronder het pad met de plekken. Een plek = een hoofdstuk (een pakket met scènes, in de volgorde `order`). Per plek vijf stippen voor de scènes Nederlands, plus een gele stip voor de rekenscène en een lila stip voor de kennisles;
  - het figuurtje staat op de plek van `nextScene()`, dus waar de leerder nu is. Die plek is groot, met de knop **Verder** (start `nextScene()`, net als de scènetegel nu);
  - onder het pad drie knoppen: **Onderweg** (de bestaande les, `lesson`/`lessonShort`, ongewijzigd), **Ontdek** (zoals nu) en **Meer** (opent het huidige scherm Vandaag als subscherm, zodat uitleg, activiteiten, berichten, de melding over een ontbrekend pakket en alles wat daar staat bereikbaar blijven).
- **Een plek aantikken:**
  - een plek die af is, of de huidige: een kaartje met de scènes van die plek (titel, gedaan of niet) en per scène **Speel** of **Nog eens**. Dat is `startScene(sc)`, zoals de knop "Nog eens" na een scène nu al doet;
  - de volgende plek: dicht, met de intro van de eerste scène als één regel ("Hier ga je …");
  - verder vooruit: alleen als silhouet, zonder tekst.
- **Het album** vervangt de tuin als overzicht: per plek de woorden, zinnen en regels van dat hoofdstuk, met hoe stevig ze zitten (dezelfde `stage()` als de tuin, in woorden in plaats van planten: nieuw, bezig, zit, stevig). Bovenaan een blok "Basiswoorden" voor de onderdelen die niet bij een plek horen (nl-t1, nl-basis, rekenen, Engels). Een tik op een woord speelt het af en toont de uitleg-knop, zoals de tuin nu.
- **Het figuurtje:** neutraal (geen geslacht), een rondje met ogen; de leerder kiest de kleur op Ik uit de pastels. Geen naam, geen accessoires.

## Wat er niet verandert

- De samensteller, het herhaalmodel, `nextScene()`, de les, de scènes, de route, het meten en de koppeling met de begeleider. Een scène die vanaf de kaart start, is dezelfde scène als vanaf de tegel.
- `tools/test-les.mjs` (de les blijft precies dezelfde).
- De tuin: blijft bestaan als scherm, te kiezen op Ik.

## Instellingen en opslag

Twee schakelaars op Ik, onder Weekdoel:
- **Thuisscherm:** Vandaag (standaard) of Kaart → `S.home` = `'vandaag'` of `'kaart'`.
- **Overzicht:** Tuin (standaard) of Album → `S.overview` = `'tuin'` of `'album'`.
- **Kleur van je figuurtje** (alleen zichtbaar bij Kaart) → `S.fig` = een van de pastels.

Twee aparte schakelaars, omdat de eigenaar na G3 de kaart standaard kan maken zonder de tuin weg te halen, of andersom.

Opslag: `SCHEMA` 10 → 11, een stap in `MIGRATE` die alleen ontbrekende velden toevoegt (`home:'vandaag'`, `overview:'tuin'`, `fig:null`), vaker kan draaien en niets weggooit; vooraf de gewone kopie naar `tonaor-leert-v2.bak`. `S.world` blijft zoals het is; de kaart leest `S.world.done`, `S.items` en de pakketten. Alles wissen laat de drie keuzes staan (het zijn instellingen, net als het weekdoel). Test: `tools/test-migratie.mjs`.

## Techniek

- **Tekenen:** een nieuw bestand `wereld.js` (`WereldVis.render(places, state)`), naar het voorbeeld van `scene.js` en `kaart.js`: SVG uit vaste bouwstenen (heuvel, pad, plek per vak, figuurtje), geen tekening of script uit een pakket. Tekst uit een pakket (titels, intro) gaat door `esc()`.
- **Plekken:** `PLACES` wordt bij het laden afgeleid uit `SCENES` (pakket, `order`, vak per scène). Een losse les (Ontdek) is geen plek.
- **Open of dicht:** open = elke plek met minstens één gedane scène, plus de plek van `nextScene()`. De eerstvolgende plek daarna staat dicht met één regel; verder vooruit alleen een silhouet.
- **Toegankelijk:** elke plek is een knop met een tekstlabel ("De markt, 3 van 5 scènes"); het pad is decoratie (`aria-hidden`). Werkt met de steuntaalregel (`T()`), nieuwe teksten in nl, en en th.
- **Tabbalk:** de knoppen krijgen hun naam en icoon uit `S.home` en `S.overview`; `rerender()` kiest `vKaart` of `vToday`, en `vAlbum` of `vGarden`.

## Getallen en hun herkomst

- Vijf stippen per plek: `concept-leerwereld.md` ("een hoofdstuk heeft vijf stippen"), plus de rekenscène en de kennisles die elk hoofdstuk heeft (`redactie/controleer.mjs`).
- Eén plek vooruit zichtbaar: concept, "de volgende plek is zichtbaar maar nog dicht". Aanname: verder vooruit alleen een silhouet, zodat de kaart niet leeg of te vol oogt; bij te weinig lesstof zie je zo geen gat.
- Vier sterktes in het album: aanname; dezelfde `stage()` als de tuin, samengevoegd van zes naar vier woorden om het overzicht rustig te houden (0 nieuw; 1-2 bezig; 3 zit; 4-5 stevig).

## Een week doorgerekend (met de huidige lesstof)

Er zijn 11 hoofdstukken Nederlands met scènes (order 10 tot 110), dus 11 plekken. Bij twee nieuwe scènes per dag (concept, bijgesteld) is een plek in drie à vier dagen af; in een week komt de leerder één tot twee plekken verder. De lesstof is genoeg voor ruim vijf weken op de kaart. Is het verhaal op, dan zegt de plek van `nextScene()` dat eerlijk en wijst naar Onderweg en Ontdek (`nextScene()` geeft dan de eerste scène terug; de kaart toont dan "Alles gespeeld: kies een plek om nog eens te doen").

## Wat kan breken

- **Voortgang:** alleen toevoegende migratie, met kopie vooraf en een test.
- **EDGE-koppeling:** niets; er gaat geen nieuw bericht over de koppeling.
- **De les van `test-les`:** niets; Onderweg is de bestaande les.
- **Bereikbaarheid:** alles van Vandaag blijft bereikbaar via Meer; dat bewaakt een test (elke knop-id van `vToday` is ook vanuit de kaart te bereiken).
- **Prestaties op een oude iPhone:** één SVG met hooguit een paar honderd elementen; geen animatie behalve het figuurtje.

## Wat het wegneemt

Niets. Met beide schakelaars op de standaard ziet de leerder precies wat er nu is.

## Vragen aan de ontwerpsessie

1. Twee schakelaars (thuisscherm en overzicht) of één ("Leerwereld" of "Klassiek")? Voorstel: twee.
2. Open plekken: alleen wat al begonnen is plus de huidige (voorstel), of alles vrij kiezen? Vrij kiezen botst met de volgorde van de route.
3. De rekenscène en kennisles als aparte stippen op de plek (voorstel), of pas als eigen plekken in stap 7?
4. Onderweg als knop onder de kaart (voorstel), of als plekjes tussen de plekken op het pad (concept: "de korte ronde tussen twee plekken")? Het tweede is mooier, maar vraagt een plek op het pad die steeds meeschuift.
5. Het album in vier sterktes in woorden (voorstel), of de zes van de tuin?

Na akkoord bouw ik het in deze volgorde: opslag en schakelaars, de kaart, het album, het figuurtje. Elk met tests, een controle op 375 px en een onafhankelijke review. Daarna meld ik G3 met één bericht.
