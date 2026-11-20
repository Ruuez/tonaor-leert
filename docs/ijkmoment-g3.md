# IJkmoment G3: de kaart als thuisscherm

Stand: 20 november 2026, cache v2-90. Uitgevoerd door de ontwerpsessie (masterplan stap 5; G3 vervangt de geschrapte proefweek).

**Wat is bekeken:**
- het ontwerp (`ontwerp-stap5-kaart.md`) met de antwoorden van de ontwerpsessie;
- de code (`vKaart`, `kPlaces`, `kSheet`, `vAlbum`, `wereld.js`, `MIGRATE[10]`);
- alle 22 tests (groen);
- in de browser op 375 × 812 gespeeld als leerder, met een voortgang waarin het eerste hoofdstuk af is: de kaart, een plek die af is, de volgende plek (dicht), Meer en terug, het album.

## 1. Wat goed is

- **Niets afgepakt (D2, stap 5):** de standaard blijft Vandaag; met de schakelaar ziet de leerder alles van Vandaag terug via Meer, en de tuin via het album. De migratie (schema 11) voegt alleen toe.
- **Het pad leest goed:** een vinkje op de plek die af is, het figuurtje bij de huidige plek, een slot op de volgende, verder alleen silhouetten (zoals besloten). Stippen per scène, geel voor rekenen, lila voor de kennisles.
- **Onderweg** staat direct onder de huidige plek, met het aantal dat wacht (23).
- **De examenregel** toont de bandbreedte ("tussen november 2027 en april 2028"), net als Route (E5).
- **Een plek aantikken** geeft de scènes met Gedaan en Nog eens; de volgende plek zegt eerlijk dat hij nog dicht is, met één regel.
- **Het album** toont per plek wat er geleerd wordt, in vier sterktes, zonder rood, met de tuin erbij.
- **Toegankelijk:** elke plek is een knop met een label ("Op het werk, 0 van 7 scènes").

## 2. Bevindingen

**2.1 De kaart staat niet in beeld (D1).** Op 375 × 812 vullen de groet, de weekring en de examenregel het hele eerste scherm. "Je bent hier" met Verder begint pas na het scrollen, het pad na anderhalf scherm. Een leerder die de app opent, ziet geen kaart en geen volgende stap.

**2.2 Het pad is lang.** Met 11 hoofdstukken is de tekening 1755 px hoog; acht daarvan zijn silhouetten. Ontdek en Meer (uitleg, activiteiten, berichten) staan pas daaronder, na ruim drie schermen scrollen.

**2.3 Het kaartje van een plek valt ver weg.** Een tik op een plek opent het kaartje onder de hele tekening: de pagina springt ruim een scherm omlaag en de leerder ziet de kaart niet meer. Het kaartje zelf is lang (986 px voor 7 scènes), want elke Nog eens-knop staat op een eigen regel.

**2.4 Onderweg is de gewone les.** De knop start de les van vandaag (eerste ronde vol, met nieuwe stof). Dat wijkt af van het concept ("de korte ronde tussen twee plekken"), maar alleen herhalen zou de nieuwe stof buiten de scènes (basiswoorden, rekenen, Engels) zijn ingang ontnemen. De tekst zegt het nu eerlijk.

## 3. Besluiten (ontwerpsessie)

1. **Bij 2.1:** op de kaart een smalle weekring (één regel: kleine ring, minuten van het weekdoel, een tik opent het hele blok) en de examenregel klein eronder. Dan "Je bent hier" met Verder, Onderweg en het pad. Doel: op 375 × 667 (de kleinste iPhone) staan Verder en Onderweg zonder scrollen in beeld. De meldingen (`kNotes`) blijven, maar onder Onderweg.
2. **Bij 2.2:** hooguit twee silhouetten na de dichte plek, met één regel "nog n plekken" eronder. Ontdek en Meer komen direct onder Onderweg, vóór het pad.
3. **Bij 2.3:** het kaartje opent als blad van onderen (zoals een iOS-blad), met een sluitknop, boven de kaart; de pagina scrolt niet. Per scène één regel: titel links, de knop klein rechts.
4. **Bij 2.4:** Onderweg blijft de gewone les (`startLesson(false)`), met de eerlijke tekst. Geen aparte herhaalknop: een tweede ingang voor de les maakt de kaart drukker zonder iets toe te voegen. Plekjes op het pad mogen later.

Test bij 1 tot 3: de positie van Verder en Onderweg op 375 × 667 in `tools/test-thuiskaart.mjs` (of een controle in de browser die in het releaseverslag staat).

## 4. Advies aan de eigenaar

De kaart werkt en neemt niets weg. Na de drie aanpassingen hierboven adviseer ik de kaart het standaard thuisscherm te maken, voor nieuwe en bestaande installaties. Het oude thuisscherm en de tuin blijven op Ik te kiezen. De cijfers per week (meekijken) lopen door: valt de leertijd in de twee weken erna duidelijk terug, dan stelt de ontwerpsessie bij.

Dat besluit is van de eigenaar.

**Besluit eigenaar (21 november 2026): de kaart wordt standaard**, voor nieuwe en bestaande installaties, na de aanpassingen (live als v2-91 en v2-92, nagekeken op 375 × 667). Het oude thuisscherm en de tuin blijven op Ik te kiezen.
