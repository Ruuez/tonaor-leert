# Ontwerp werkorder stap 7: rekenen en Engels, met de leerlijn per onderwerp

Stand: 24 november 2026, concept voor de ontwerpsessie (nog niet gebouwd). Bronnen: `docs/werkorder.md` (7), `docs/masterplan.md` (stap 7, eisen D1, E5, G1 tot G5, H1), `docs/eindtermen.md` (2. Rekenen, 3. Engels), `docs/STATUS.md` (dekkingstabel: rekenen ongeveer 25%).

## Welke eisen het dient

| Eis | Hoe |
|---|---|
| Masterplan stap 7: rekenen en Engels als eigen route | per vak een scherm Leerlijn met de onderwerpen uit de eindtermen, in de volgorde van het niveau |
| D1: keuze, zichtbaar wat je kunt | per onderwerp wat de leerder al kan (de vier sterktes van het album) en een knop om dat onderwerp te oefenen |
| G-eisen en de dekkingstabel | het scherm laat ook zien welke onderwerpen nog geen lesstof hebben (grijs, "komt nog"); zo ziet de leerder eerlijk wat er nog niet is, en de redactielijn wat er moet komen |
| H1: losse herhaling hooguit een vijfde | Oefenen per onderwerp is losse herhaling en telt mee in de streng; de knop staat er, maar de kaart blijft de weg in |

## Wat er voor de leerder verandert

- Op de kaart, naast Ontdek en Spelletje, twee tegels: **Rekenen** en **Engels**. Op Vandaag (onder Meer) dezelfde twee.
- Een tegel opent de **leerlijn** van dat vak:
  - **Rekenen:** de vijf domeinen van mbo-rekenniveau 2 (eerst) tot 4, plus de ondersteunende vaardigheden: rekenen met geld en tijd, getallen en bewerkingen (steun), grootheden en eenheden, verhoudingen, procenten, informatie (tabellen en grafieken), ruimte. Per domein:
    - de vaardigheden en rekenscènes die er al zijn, met hun sterkte (nieuw, bezig, zit, stevig);
    - een knop **Oefen** (zie hieronder) als er iets bekends is;
    - "komt nog" als er nog niets is.
  - **Engels:** bovenaan de knop **Engelse les** (de bestaande les, `startEnglish`), daaronder de onderwerpen: woorden per thema (werk, …), en de vaardigheden lezen, luisteren, spreken, schrijven en gesprekken met de eindtermen A2 en B1. Ook hier per onderwerp wat er is en wat nog komt.
- **Oefen** start een korte ronde met alleen dat onderwerp: eerst wat aan de beurt is, dan ander bekends, hooguit acht oefeningen (`chooseEx`, `exQ`, zoals de korte ronde). Niets nieuws: nieuwe stof komt via de les en de scènes.

## Waar de indeling vandaan komt

- Elk item kan een veld `goals` krijgen met codes uit `docs/eindtermen.md` (`rekenen-2-procenten`, `en-A2-schrijven`, …). Dat is lesstof: de redactielijn vult het aan, eerst voor `rk-1` en `en-t1`.
- Rekenscènes hebben al `goals`; hun doelen (`targets`) tellen mee bij hun domein.
- Een item zonder `goals` staat onder "Overig" (eerlijk, en een opdracht voor de lijn).
- De onderwerpen en hun volgorde staan in de code als vaste lijst per vak, met de codes uit de eindtermen (één plek, met bron).
- `pakketcheck`: `goals` op een item is een lijst codes die beginnen met `rekenen-`, `en-` of `nt2-`. Geen weigering voor een ontbrekend veld, alleen een melding in de redactielijn.

## Wat kan breken

- **Voortgang:** niets; geen nieuwe velden in de opslag.
- **De les van `test-les`:** niets; Oefen is een losse ronde.
- **De kaart op 375×667:** de tegels staan onder Onderweg; Verder en Onderweg blijven in beeld (test zoals bij G3).

## Tests

`tools/test-leerlijn.mjs`: de indeling naar onderwerp (met en zonder `goals`, via scènes), Oefen kiest alleen bekende onderdelen van dat onderwerp en hooguit acht, de poort voor `goals`, en de plek van Verder en Onderweg.

## Wat het wegneemt

Niets. De Engelse les en de rekenvaardigheden blijven waar ze zijn; dit is een tweede ingang.

## Vragen aan de ontwerpsessie

1. **Indeling rekenen:** de vijf domeinen plus steun (voorstel), of de indeling R1 tot R4 uit de dekkingstabel?
2. **Oefen:** hooguit acht oefeningen, niets nieuws (voorstel), of ook één nieuw onderdeel per ronde als er stof is?
3. **"Komt nog" tonen** (voorstel), of alleen wat er is? Tonen is eerlijk, maar laat nu veel grijs zien (rekenen ongeveer 25% gedekt).
4. **Engels:** de vaardigheden met de eindtermen (voorstel), of woorden per thema als hoofdindeling?
5. **Tegels:** op de kaart én onder Meer (voorstel), of alleen op de kaart?
