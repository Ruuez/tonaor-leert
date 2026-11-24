# Ontwerp: een makkelijke start

Stand: 24 november 2026, ontwerpsessie. Aanleiding: de eigenaar vindt de start niet intuïtief en voor veel starters te moeilijk. Dit ontwerp is gemaakt na een eerste start als nieuwe gebruiker op 375 px, met een lege opslag, gespeeld als iemand die nog geen Nederlands kent.

## 1. Wat een starter nu meemaakt

1. **Welkom.**
   - Het scherm begint met een Nederlandse alinea; de Thaise vertaling staat eronder.
   - Eerst staat er "het streven is 10 uur per week", dan de belofte "elk woord wordt een plantje in je tuin". Het thuisscherm is inmiddels de kaart, dus die belofte klopt niet meer.
   - De keuze van de steuntaal staat pas onderaan, na de tekst die je al in die taal had moeten lezen.
2. **Wanneer leer je?** Vier vaste momenten. Begrijpelijk.
3. **Hoeveel Thai wil je zien?** Altijd, als ik tik, of uit. Voor een starter een vraag zonder betekenis: hij weet nog niet wat er komt.
4. **Startmeting van 8 minuten, 15 vragen.** Ze is niet aangepast aan de leerder:
   - een beginner tikt vijftien keer "Weet ik niet";
   - de vragen gaan al over A2-stof (salaris, leidinggevende, een bijzin met omdat, 50% korting, een verhoudingssom);
   - instructies als "Welke zin is goed?" en "Kies het goede woord" staan alleen in het Nederlands;
   - in de lesstof staan vaste plaatsnamen.
5. **De uitslag:** zes balken op 0%.
6. **"Naar mijn eerste les"** opent geen les, maar de kaart. Daar staan:
   - twee grote keuzes (Verder en Onderweg) zonder uitleg welke je moet nemen;
   - vier tegels;
   - een examendatum in 2027-2028.
7. **De eerste scène** (Verder) vraagt meteen:
   - "Wat is een buur?" met drie Nederlandse zinnen zonder Thai;
   - daarna "Typ het laatste woord dat je hoort".
8. **De les** (Onderweg) vraagt bij het eerste nieuwe woord: "Wat is dit in het Nederlands?". De leerder moet het woord met de of het typen, voordat het ooit getoond is.

## 2. Oordeel

De eigenaar heeft gelijk. Voor iemand die al wat Nederlands kent werkt de start redelijk. Voor een echte beginner is hij te moeilijk, om drie redenen:
- **De eerste tien minuten zijn een toets en geen les.** Het eerste succes komt pas na veertien schermen. Wie nul kent, krijgt vooral "weet ik niet" en balken op 0%. Dat is het tegendeel van "beginnen waar het lukt" (onderbouwing-rekenen 2.9, motivatie D1).
- **De steun valt weg precies waar hij het hardst nodig is.** De instap- en ophaalvragen zijn bewust zonder steuntaal, en een nieuw woord wordt eerst overhoord. Voor gevorderden is dat goed (desirable difficulty). Voor een beginner, zonder enige kennis om op te bouwen, is het raden.
- **Te veel tegelijk:** weekdoel, examen, kaart, Onderweg, vier tegels en drie taalinstellingen op de eerste dag. Er is geen duidelijke eerste stap.

## 3. Wat er verandert

### 3.1 Het eerste scherm: de taal

- Het eerste scherm toont alleen de keuze van de taal, groot, elke taal in zijn eigen schrift: ภาษาไทย, English, Nederlands. Daarboven één regel "Welkom" in de drie talen.
- Vanaf daar staan op de startschermen de steuntaal bovenaan en groot, met het Nederlands klein eronder. Na de start gewoon de gewone volgorde.
- Kiest iemand Nederlands, dan geen steuntaal (S.thai = 'uit').

### 3.2 Welkom in drie korte regels

Elke regel met een icoon, in de steuntaal:
- "Je leert Nederlands, rekenen en Engels."
- "Elke dag een beetje. Een dag overslaan mag."
- "Je kunt niets fout doen: een fout is oefenen."

Geen "10 uur", geen tuin. Het weekdoel komt na de eerste week op Vandaag ("Hoeveel tijd wil je per week?"); tot dan geldt de standaard zonder dat de leerder hem ziet.

### 3.3 "Hoeveel Nederlands ken je al?" in plaats van "Hoeveel Thai wil je zien?"

Drie keuzes met een plaatje, in de steuntaal:

| Keuze | Wat er gebeurt |
|---|---|
| **Nog niets** | Geen startmeting. Steuntaal altijd. De beginnersstart (3.5). De startmeting wordt na zeven dagen op de kaart aangeboden ("Wil je kijken hoe ver je bent?"). |
| **Een beetje** | Een korte startmeting die zich aanpast (3.4). Steuntaal altijd. |
| **Ik kan al een gesprek voeren** | De volledige startmeting (3.4). Steuntaal op "als ik tik". |

De vraag "Hoeveel Thai wil je zien?" vervalt in de start. Hij staat op Ik en volgt na twee weken de bestaande afbouw.

De vraag "Wanneer leer je?" blijft, maar na de eerste les. Een voornemen werkt het best na een eerste ervaring, en zo ziet de starter eerder iets van de app.

### 3.4 De startmeting past zich aan

- **Per onderdeel stoppen:** na twee keer "Weet ik niet" of fout binnen een onderdeel stopt dat onderdeel. Wie niets kent, is in ongeveer vijf vragen klaar in plaats van vijftien.
- **Instructies in de steuntaal:** elke instructie gaat via `T()`, niet alleen in het Nederlands.
- **Uitslag:** geen balken op 0%. Een onderdeel met uitslag 0 heet "Hier begin je". Bovenaan staat één zin: "Je begint bij [onderdeel]. Daar gaan we nu mee aan de slag."
- **Generieke lesstof:** geen vaste plaatsnamen in de meting en in de lesstof (CLAUDE.md, "de app is generiek"). Zie 3.8.

### 3.5 De beginnersstart: de eerste les direct

- "Naar mijn eerste les" (en bij Nog niets de knop na het welkom) start **direct** de eerste scène. Hij opent niet de kaart.
- **De eerste twee weken** (`S.starter` = de datum van de start, alleen als het antwoord Nog niets of Een beetje was):
  - In scènes vervallen de stappen "Wat ken je al?" (instap) zolang een onderdeel nog nooit gezien is. Daar is nog niets om op te halen.
  - De scène begint met Kijken: aantikken en horen.
  - Steuntaal staat bij elke stap, ook bij instap, ophalen en controle.
  - Een nieuw woord in de les wordt eerst getoond: het woord, met lidwoord, geluid en vertaling. Daarna komt kiezen (herkennen), en pas daarna typen. De vraag "Ken je het al? Typ het dan" komt pas na de eerste twee weken.
  - Daarna valt de beginnersstart vanzelf weg; de gewone afbouw neemt het over.
- **Bij Een beetje** geldt de beginnersstart alleen voor de onderdelen met uitslag onder 0,34.

### 3.6 De kaart op de eerste dag

Tot de leerder één scène heeft afgemaakt:
- de kaart toont alleen de groet, de huidige plek met één grote knop **Begin** en het pad;
- de examenregel, Onderweg, de vier tegels en Meer komen pas daarna.

Wat daarna zichtbaar wordt, wordt één keer aangewezen met een korte regel: "Nieuw: Onderweg, hier herhaal je wat je geleerd hebt."

### 3.7 Verder en Onderweg: één duidelijke eerste keuze

- Op de kaart blijft **Verder** de grote knop.
- Onderweg krijgt een tekst die zegt wanneer je hem kiest: "Herhalen en nieuwe woorden (10 minuten)".
- Is er herhaling over tijd, dan staat Onderweg boven Verder met "Eerst even herhalen" (H1, het herhaalmodel). Anders staat Verder boven.

### 3.8 Plaatsnamen uit de lesstof

In `nl-t1` en `en-t1` staan vaste plaatsnamen in voorbeeldzinnen, de startmeting en het verhaal. De redactielijn vervangt ze door een algemene plaats ("in de stad", "in het dorp", "bij de fabriek"). Het geluid wordt opnieuw gemaakt.

Wat al in de openbare geschiedenis staat, blijft daar. De eigenaar beslist of dat erg is (privacy). Dit ontwerp herschrijft de geschiedenis niet.

## 4. Wat kan breken

- **Opslag:**
  - nieuwe velden `S.starter` (datum of null) en `S.startLevel` ('niets', 'beetje' of 'veel');
  - SCHEMA +1, alleen toevoegend;
  - bestaande leerders krijgen `starter: null`, dus voor hen verandert niets.
- **De les van `test-les`:** blijft gelijk voor `starter: null`. Een nieuwe test vergelijkt de beginnersles.
- **De startmeting:** het stoppen per onderdeel verandert de uitslag. Een gestopt onderdeel telt als 0, wat het al betekende.
- **EDGE-koppeling:** niets.
- **Eisen:**
  - A1-A7 blijven gelden.
  - De beginnersstart is een tijdelijke uitzondering op "eerst ophalen" voor wat nog nooit gezien is. Dat is geen ophalen.
  - Pretesten (het voordeel van eerst raden) heeft alleen zin als er iets te raden valt.

## 5. Test

- `tools/test-start.mjs`:
  - de drie routes;
  - het stoppen van de meting na twee keer niet weten;
  - geen 0%;
  - de eerste les start direct;
  - de beginnersstart: geen instap op nieuwe onderdelen, steuntaal overal, een nieuw woord eerst getoond;
  - de kaart op dag 1;
  - de migratie.
- **Daarna speelt de ontwerpsessie de start opnieuw als nieuwe gebruiker op 375 px**, op alle drie de routes.
