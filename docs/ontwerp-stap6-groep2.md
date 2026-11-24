# Ontwerp werkorder stap 6, groep 2: rekenen in stappen en slepen

Stand: 24 november 2026, concept voor de ontwerpsessie (nog niet gebouwd). Bronnen: `docs/werkvormen.md` (1.4 en de algemene regels), `docs/masterplan.md` (catalogus, rij "In de tekening: iets op zijn plek slepen"; eisen C2, C3, E2, regel 16 "de app keurt alleen een gesloten antwoord"), `docs/onderbouwing-rekenen.md` 2.8 (de vaste aanpak) en R-M4 (drie soorten fouten), `docs/scenes.md` (de tekening).

## Welke eisen het dient

| Eis | Hoe |
|---|---|
| C2, C3 (werkvormen, variatie) | twee nieuwe vormen in de catalogus: rekenen in stappen, en iets op zijn plek slepen in de tekening |
| R-M4 en E2 (diagnose) | bij rekenen in stappen krijgt elke foute stap een eigen soort fout: de vraag gelezen (`lezen`), het model gekozen (`model`), het rekenen zelf (`rekenstap`); het foutprofiel ziet dus wáár het misgaat |
| onderbouwing-rekenen 2.8 | de vijf vaste stappen (wat wordt gevraagd, welke gegevens, welk model, rekenen, kan het kloppen) worden voorgedaan en later weggelaten |
| Regel 16 | elke deelvraag en elke sleepbeweging is gesloten: kiezen, een getal, of een vaste plek |

## A. Rekenen in stappen (`steps`, code `sp`)

**Wat de leerder doet.** Boven in beeld staat de situatie (een korte tekst, eventueel met de tekening van de scène). Daaronder komen twee tot vier deelvragen, één tegelijk. Een beantwoorde deelvraag blijft klein staan met het antwoord en een vinkje, zodat de leerder de redenering ziet groeien. Een balkje toont "stap 2 van 4".

**De deelvragen** volgen de vaste aanpak; het pakket kiest welke erin zitten:
- `vraag`: wat moet je uitrekenen? (kiezen)
- `gegevens`: welke getallen heb je nodig? (kiezen)
- `model`: welk model past? strook, tabel, getallenlijn, of gewoon keer of delen (kiezen)
- `rekenen`: de uitkomst (een getal; verplicht, precies één)
- `klopt`: kan dit kloppen? (kiezen, bijvoorbeeld "ja, ongeveer 20 euro" of "nee, te veel")

**Pakket** (een vraag in een stap `quiz` of `rule` van een rekenscène):

```json
{ "form": "steps", "items": ["rk.per-stuk"],
  "ask": { "nl": "Een kaartje kost € 7,50. Je koopt er drie.", "th": "…", "en": "…" },
  "q": [
    { "step": "vraag", "ask": {…}, "opts": [ { "t": "Wat drie kaartjes samen kosten", "r": "ok", "why": {…} },
                                              { "t": "Hoeveel kaartjes je krijgt", "r": "no", "err": "lezen", "why": {…} } ] },
    { "step": "rekenen", "ask": {…}, "answer": 22.5, "accept": [], "why": {…} },
    { "step": "klopt", "ask": {…}, "opts": [ … ] }
  ],
  "why": {…} }
```

**Nakijken** (gesloten, met dezelfde functies in de app en de test, in `pakketcheck.js` als `stepsGrade`):
- Per deelvraag: goed bij de eerste poging → door. Fout → de uitleg (`why`) en nog één poging. Weer fout → het goede antwoord verschijnt, de leerder gaat door. De leerder loopt nooit vast.
- Een fout telt in het foutprofiel met de soort van die deelvraag: `vraag` en `gegevens` als `lezen`, `model` als `model`, `rekenen` en `klopt` als `rekenstap`, tenzij de foute keuze zelf een `err` heeft.
- Voor het herhaalmodel telt de hele vraag één keer, met `practiced(q,res,'stappen')`: alles in één keer goed = `true`; ergens een tweede poging nodig maar zelf gevonden = `'retry'`; ergens het antwoord getoond = `false`. Alleen `items[0]` krijgt de fout (zoals nu).
- Het getal bij `rekenen` wordt gelezen met `scNum` (zoals de andere rekenvragen: `22,50`, `€ 22,50`, `22,5` en `22 euro 50` zijn goed); `accept` voor "mijn antwoord is ook goed".

**Afbouw** (onderbouwing 2.8: "die de app in het begin voordoet en later weglaat"), per herhaalitem `items[0]`:
- de eerste twee keer: alle deelvragen uit het pakket;
- daarna (reps 2 tot 4): zonder `vraag` en `gegevens`;
- daarna (reps ≥ 5): alleen `rekenen`, en `klopt` als die er is.
Eén waarde in `MOTOR` (`stepsFade: [2,5]`), met "aanname" als bron, te toetsen bij G4 groep 2.

**Trede** (M5): 2, half open (de redenering ligt vast, het rekenen niet). **Streng:** dezelfde als de andere rekenvragen.

**In de korte ronde (Onderweg):** dezelfde vraag, met de afbouw; geen tekening.

## B. Iets op zijn plek slepen (`drag`, code `sl`)

**Wat de leerder doet.** In de tekening van de scène liggen één tot drie dingen die verplaatst moeten worden ("Leg de medicijnen in de kast", "Zet de tassen bij de juiste deur", "Hang het briefje op het bord"). De leerder sleept een ding naar zijn plek. Wie niet kan of wil slepen, tikt eerst op het ding en dan op de plek (tik en tik); dat werkt ook met VoiceOver en met het toetsenbord. Beide wegen worden op dezelfde manier nagekeken.

**Pakket** (een stap `do` in een scène; de dingen zelf staan in `art.things` en zijn aantikbaar, met `label` en `item`):

```json
{ "type": "do", "form": "drag", "items": ["dok.medicijn"],
  "ask": { "nl": "Leg het medicijn in de kast.", "th": "…", "en": "…" },
  "pairs": [ { "thing": 4, "to": 7 } ],
  "why": {…} }
```

`thing` en `to` zijn plekken in `art.things`; beide moeten `hot` zijn (dan hebben ze een label om voor te lezen en kan de poort ze controleren). Hooguit drie paren.

**Nakijken** (`dragGrade` in `pakketcheck.js`):
- Een ding op de goede plek klikt vast (het springt naar het midden van de plek; met "minder beweging" zonder beweging) en het label wordt voorgelezen.
- Een ding op een verkeerde plek gaat terug naar waar het lag, met het label van die verkeerde plek ("Dat is de tafel"); dat is de uitleg.
- Twee keer mis bij hetzelfde ding: het ding gaat zelf naar zijn plek en de leerder gaat door.
- Herhaalmodel: alles in één keer = `true`, ergens een misser = `'retry'`, ergens zelf geplaatst door de app = `false`. Vorm `slepen`. Soort fout: `betekenis` (het woord van de plek niet herkend).

**Tekenen.** `scene.js` krijgt geen nieuwe dingen: het sleept de bestaande groep van een ding (`<g class="s-hot" data-i>`) met een `transform`. Nieuw in `scene.js`: een klasse voor "wordt gesleept" en "doel" (een zachte rand rond een plek, geen rood). Slepen met Pointer Events (werkt met vinger en muis); tijdens het slepen scrolt de pagina niet (`touch-action:none` alleen op het ding).

**Trede** 1 (gesloten). **Streng:** taal (kijken en begrijpen), zoals aanwijzen (`point`).

## Poort (pakketcheck en redactie/controleer.mjs)

- `steps`: twee tot vier deelvragen; elke `step` uit de vijf; precies één `rekenen` met een getal als `answer`; keuzevragen met twee tot vier keuzes en precies één `ok`; elke foute keuze een `err` uit de lijst; teksten in nl, th en en.
- `drag`: één tot drie paren; `thing` en `to` bestaan in `art.things`, zijn `hot`, zijn verschillend, en geen ding of plek komt twee keer voor; `items[0]` is het `item` van het eerste ding.
- De schrijversopdracht krijgt beide vormen erbij, met een voorbeeld; de reviewer controleert bij `steps` of de foute keuzes echte denkfouten zijn (niet absurd, zoals bij G4 voor luistervragen).

## Wat er voor de leerder verandert

Niets, tot er lesstof is die de vormen gebruikt. Voorstel: de vormen komen niet achter Proefonderdelen (de scènes staan er ook niet meer achter), maar de redactielijn gebruikt ze pas na G4 groep 2. Tot dan staat er alleen een proefscène in de testopslag voor de ontwerpsessie.

## Wat kan breken

- **Voortgang:** niets; geen nieuwe velden in de opslag (de afbouw leest `S.items[id].reps`).
- **EDGE-koppeling:** niets.
- **De les van `test-les`:** niets; de vormen komen alleen in scènes en in de korte ronde als een pakket ze heeft.
- **Slepen op iOS:** Pointer Events werken in Safari vanaf iOS 13; een lange druk mag geen tekstselectie of vergrootglas geven (`user-select:none`, `-webkit-touch-callout:none` op het ding). Te controleren op de telefoon.

## Tests

`tools/test-stappen.mjs` en `tools/test-slepen.mjs`: het nakijken (goed, retry, fout, een antwoord dat ook goed is), de afbouw, de soort fout per stap, de poort (goede en foute pakketten), en dat de schermen `esc`/`SAFE` gebruiken. Daarnaast een proefscène in de browser op 375 px (slepen en tik en tik).

## Wat het wegneemt

Niets.

## Vragen aan de ontwerpsessie

1. **Afbouw van de stappen:** per herhaalitem met de grenzen 2 en 5 (voorstel), of per scène (de eerste rekenscène van een hoofdstuk alles, de latere minder)?
2. **De vorm "kan het kloppen?":** altijd als laatste deelvraag verplicht (de vijfde stap uit 2.8), of door het pakket te kiezen (voorstel)?
3. **Slepen:** is "één tot drie dingen naar een vaste plek in de scènetekening" de bedoeling, of ook sorteren in vakken (bijvoorbeeld "papier, plastic, gft" als drie bakken)? Het tweede kan met hetzelfde formaat als de bakken dingen in de tekening zijn.
4. **Proefonderdelen:** de vormen niet erachter, maar pas lesstof na G4 groep 2 (voorstel), of eerst achter Proefonderdelen?
5. **Rekenen in stappen in de korte ronde:** ja (voorstel), of alleen in scènes?
