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
