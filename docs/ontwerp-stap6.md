# Ontwerp stap 6: werkvormen

Stand: 18 november 2026. Hoort bij stap 6 van `werkorder.md`. Het ontwerp per werkvorm staat in `werkvormen.md`. Dit bestand houdt per gebouwde vorm bij wat er gekozen is, wat er voor de leerder verandert en wat kan breken. Volgorde volgens de werkorder: eerst opnemen en terugluisteren, dan de luistertekst en de examenvorm, schatten op de getallenlijn, de strook en de verhoudingstabel, dan rekenen in stappen, slepen en tot slot de spellen.

## 4.1 Opnemen en terugluisteren (stap `speak`)

**Eisen:** werkvormen 4.1; masterplan 16 (de app keurt alleen een gesloten antwoord, dus spreken keurt de leerder zelf); F7 (het voorbeeld als geluidsbestand, hoorbaar met de stilteschakelaar aan); de examenvorm uit `scenes.md`; M5 (spreken is trede 3, productief).

**Voor de leerder:**
- De spreekstap toont de situatie en het voorbeeld, met daaronder de knop **Opnemen**. Tijdens het opnemen lopen de tijd en een balk; **Stop** beëindigt de opname. Na hooguit 60 seconden stopt de opname vanzelf.
- Daarna verschijnen **Luister naar jezelf** en **Opnieuw opnemen**, naast het voorbeeld. De checklist is nu af te vinken. De leerder kiest dan zelf **Het klonk goed** (telt als goed) of **Nog niet** (telt als `retry`). Spreken geeft nooit een fout.
- **Examenvorm** (`exam: true`):
  - geen steuntaal;
  - de tijd komt uit de speler: `short` 20, `medium` 30 en `long` 120 seconden;
  - bij `long` gaat er 30 seconden voorbereidingstijd aan vooraf (een aanname, met een knop "Nu beginnen");
  - de opname stopt vanzelf;
  - het voorbeeld verschijnt pas na de opname.
- **Lukt opnemen niet** (geen microfoon, geen toestemming of een oude browser), dan meldt de app dat vriendelijk. De stap gaat dan verder zoals vroeger: voorbeeld, checklist en de twee oude knoppen.

**Opslag en privacy:**
- Opnamen staan alleen op het toestel, in een eigen IndexedDB-bak `leren-opnamen` met de velden tijd, oefening, type en geluid. Ze staan nooit in de voortgang (`S`) en dus niet in de reservekopie of de koppeling.
- Er blijven hooguit 30 opnamen bewaard (`MOTOR.recKeep`).
- **Alles wissen** wist ook de opnamen.
- De app vraagt de microfoon pas bij de eerste tik op Opnemen. Een ander scherm zet de microfoon meteen uit (`recAbort` in `show`, en een controle per seconde in de stap).
- Lukt bewaren niet, bijvoorbeeld in een privévenster, dan kan de leerder alleen deze ene keer terugluisteren.

**Achter Proefonderdelen** (werkvormen: elke vorm tot het ijkmoment). Staat de schakelaar uit, dan is de stap ongewijzigd.

**Wat kan breken:**
- **De voortgang:** niets, er is geen nieuwe migratie.
- **De koppeling:** niets, de opname gaat nergens heen.
- **De les van `test-les`:** niets, want de spreekstap zit alleen in scènes.
- **Risico:** iOS-Safari in de beginschermapp. MediaRecorder bestaat daar sinds iOS 14.3 en maakt `audio/mp4`. Dit moet nog op de telefoon gecontroleerd worden: de microfoonvraag, terugluisteren met de schakelaar op stil en blijvend bewaren.

**Test:** `tools/test-opnemen.mjs`. In de browser gecontroleerd op 375 px met een nagebootste microfoon:
- opnemen, stoppen, terugluisteren en de checklist werken;
- de microfoon gaat uit;
- er is één opname bewaard;
- bij een geweigerde microfoon valt de stap terug op de oude vorm.

## 3.1 De luistertekst (stap `listen`)

**Eisen:** werkvormen 3.1 en 3.2 (meelezen), E-M4 (afbouw), de examenvorm uit `scenes.md`, F7 (geluidsbestanden).

**Voor de leerder:**
- **Eerst de vraag.** Het fragment speelt niet meer vanzelf: de leerder leest de vraag en tikt op **Luister**.
- **Afbouw:**
  - **Meelezen:** in de eerste drie scènes met een luistertekst (`MOTOR.listenFade`, een aanname) staat de tekst erbij, en de zin die klinkt licht op.
  - **Alleen luisteren:** daarna, met opnieuw afspelen. Na het antwoord verschijnt de tekst, om mee te lezen en opnieuw te horen.
  - **De zwaardere vorm** is altijd alleen luisteren.
- **Knoppen** (behalve in de examenvorm): langzaam (0,8), gewoon, iets sneller (1,15) en **Deze zin nog eens**.
- **Examenvorm** (`exam: true`): 25 seconden leestijd, dan speelt het fragment één keer, zonder knoppen. De tekst komt pas na het antwoord.

**Hoe:**
- De tekst wordt per zin afgespeeld met dezelfde opdeling als de geluidsbestanden (`PC.audioParts`). Elke zin heeft al een eigen bestand, dus de zin kan oplichten op het moment dat hij begint.
- Ontbreekt er een bestand, dan leest de stem van het toestel de hele tekst voor, zonder oplichten.
- De tekst gaat via `esc`.

**Wat kan breken:**
- De opslag en de koppeling: niets.
- De les: niets, want luisterteksten zitten alleen in scènes.
- Dat het fragment niet meer vanzelf speelt, is een bewuste verandering volgens het ontwerp.

**Test:** `tools/test-luisteren.mjs`. In de browser gecontroleerd op 375 px: meelezen met een oplichtende zin; alleen luisteren met de tekst pas na het antwoord.

## 1.1 tot 1.3: getallenlijn, strook en verhoudingstabel als vraag

**Eisen:** werkvormen 1.1, 1.2 en 1.3, en masterplan 16 (alleen gesloten nakijken). Het formaat staat in `scenes.md`.

**Voor de leerder:**
- **Getallenlijn:** een schuif van `from` tot `to`. Na **Klaar** verschijnt een streepje op de goede plek, met de afstand.
- **Strook:** delen aantikken om ze te kleuren. Bovenaan staat het bedrag, onderaan het percentage.
- **Verhoudingstabel:** lege vakken invullen. De pijlen tonen de bewerking, afbouwend van 2 naar 1 en 0.
- Bij de strook en de tabel krijgt de leerder een tweede kans. Daarna volgt het antwoord met uitleg.

**Hoe het telt:**
- Eigen vormcodes `getallenlijn`, `strook` en `tabel` (geschiedenis e, f, h).
- Een fout telt in het foutprofiel, pas bij Volgende.
- In een hoofdstuk telt de vorm als rekenen in de situatie.

**Hoe:**
- Het nakijken staat als pure functies in `pakketcheck.js` (`numGrade`, `stripValue`, `ratioFull`, `ratioOps`). App en test gebruiken dezelfde code.
- Eén scherm `sc_num` voor alle drie de vormen.

**Wat kan breken:**
- Niets bestaands: de vormen zijn nieuw.
- Er is nog geen lesstof die ze gebruikt; de redactielijn kan ze nu inzetten.
- Een tekening in `uitleg.js` hoort er nog niet bij: de modellen staan in het scherm zelf.

**Test:** `tools/test-rekenmodellen.mjs`. In de browser gecontroleerd op 375 px met proefvragen: alle drie de vormen, goed, de tweede kans, en een antwoord met een komma.
