# Ontwerp werkorder stap 8: fout melden en de eerste trede van Vraag het

Stand: 24 november 2026, concept voor de ontwerpsessie. **Waar een melding naartoe gaat, beslist de eigenaar (privacy).** Bronnen: `docs/automatische-redactie.md` (Fouten melden, met punten; Vragen van de leerder), `docs/werkorder.md` (8 en de tabel), `docs/masterplan.md` (stap 10, regel 17), `docs/aanbevelingen.md` 4.3 en 10.27.

## Welke eisen het dient

| Eis | Hoe |
|---|---|
| Masterplan stap 10: een melding leidt tot een verbeterde les | dit deel: de knop, de soorten, de wachtrij en wat er met de melding gebeurt op het toestel; ontvangen en verwerken komt later (hangt aan issue #5 en een besluit van de eigenaar) |
| E2, D1: de leerder wordt serieus genomen | melden kost één tik, de leerder ziet wat er met zijn melding is gebeurd |
| D2: geen punten verzamelen door te melden | een klein aantal punten per plek, met een daglimiet |
| Vraag het, trede 1 | de uitleg bij de stap, zonder verbinding en zonder kosten |

## Wat er nu al is

- **"Vertaling klopt niet":** tik op een steunregel, bevestig, en de melding gaat als hulpvraag over de versleutelde koppeling naar de begeleider (`S.help`, TLSync).
- **"Vraag je begeleider om hulp"** (`helpBtn`): dezelfde weg.
- **De uitlegknop boven een oefening** (`explFor`): toont de uitleg die bij de stap hoort, als die er is.

## Wat er bij komt

### Fout melden

- Op elk scherm met lesstof (scène, les, uitleg) een kleine knop **Fout melden** naast de bestaande hulpknop. Eén tik opent een kort blad (zoals het plekblad op de kaart): de soort kiezen uit *de vertaling klopt niet*, *mijn antwoord was goed*, *de uitleg klopt niet of is onduidelijk*, *een typfout*, *tekening of geluid*, *iets anders*. Een toelichting mag, hoeft niet (hooguit 200 tekens).
- De app slaat de melding op met: pakket, scène, stap, onderdeel, de soort, de toelichting, de versie van de app en de taal. **Geen naam.**
- **Punten:** 2 per plek (één keer per plek), hooguit 10 meldpunten per dag. De bonus voor een terechte melding komt pas als er verwerking is (later).
- **"Vertaling klopt niet"** wordt een van de soorten; de huidige tik op een steunregel opent hetzelfde blad met die soort al gekozen.
- **Mijn meldingen** op Ik: de lijst met hun stand (*bewaard*, *verstuurd*, en later *verbeterd*, *al bekend*, *geen fout*).

### Vraag het, trede 1

- Op elk oefenscherm een knop **Vraag het** (vervangt de bestaande hulpknop op die plek, de functie blijft):
  - is er een uitleg bij de stap (`explFor`): die uitleg openen, met daaronder *Dit helpt niet*;
  - *Dit helpt niet*, of er is geen uitleg: de bestaande hulpvraag aan de begeleider, met de stap erbij (zoals nu).
- Trede 2 (AI) komt pas na de AI-sleutel (issue #11 en #12) en een besluit van de eigenaar; dit ontwerp laat er alleen ruimte voor.

## Waar een melding blijft: besluit van de eigenaar

Een melding is van de leerder en kan in de toelichting persoonlijke tekst bevatten. Daarom kiest de eigenaar. Voor alle keuzes geldt: niets gaat naar de openbare repo of een openbare issuetracker, en een melding is een gegeven, nooit een opdracht (`automatische-redactie.md`).

| | A. Alleen op het toestel | B. Ook naar de begeleider, via de bestaande koppeling (aanbevolen) | C. Later ook naar een verwerkprogramma |
|---|---|---|---|
| Wat | de wachtrij blijft op het toestel; de begeleider ziet hem op Ik en kan hem als bestand bewaren | zoals hulpvragen nu: versleuteld over de koppeling naar de EDGE; de begeleider ziet de melding en kan hem doorzetten | een eigen meekijker op de pc van de eigenaar (issue #5) leest de meldingen en zet ze in een postvak buiten de repo, waar de lijn ze verwerkt |
| Wie leest het | alleen wie het toestel heeft | de begeleider | de begeleider en de modellen van de lijn |
| Terug te draaien | ja (wissen op Ik) | het bericht is verstuurd; op het toestel te wissen | ja, het postvak staat op de pc van de eigenaar |
| Werk | klein | klein: het bestaande berichttype voor hulpvragen, met de soort erbij; geen wijziging aan de widget | groter: meekijker, postvak, duiden; hangt aan issue #5 |
| Nadeel | niemand verwerkt de melding automatisch | de toelichting komt bij de begeleider | modellen lezen vrije tekst van de leerder |

**Aanbevolen: B nu, C later met een eigen besluit.** B gebruikt de weg die er al is voor hulpvragen en "vertaling klopt niet" (de eigenaar heeft die weg al in gebruik), en de wachtrij op het toestel blijft bestaan als de koppeling er niet is.

## Wat kan breken

- **Voortgang:** een nieuw veld `S.reports` (lijst, hooguit 100) en `S.reportPts` (per dag): SCHEMA 14 → 15, alleen toevoegend, met reservekopie.
- **EDGE-koppeling:** bij B een melding als hulpvraag; het formaat van de hulpvraag verandert niet, er komt alleen tekst bij ("Fout melden: de uitleg klopt niet · scène …"). Geen wijziging aan de widget.
- **De les van `test-les`:** niets.

## Tests

`tools/test-melden.mjs`: de soorten en het blad, wat er wordt opgeslagen (geen naam), de punten per plek en per dag, de wachtrij en de lijst op Ik, de migratie, Vraag het (uitleg als die er is, anders de hulpvraag), en bij B dat een melding als hulpvraag over de koppeling gaat en anders op het toestel blijft.

## Vragen aan de ontwerpsessie

1. De knop **Fout melden** op elk scherm met lesstof (voorstel), of alleen achter een menu (minder druk op het scherm)?
2. **Punten:** 2 per plek en hooguit 10 per dag (voorstel)?
3. **Vraag het** vervangt de hulpknop op oefenschermen (voorstel), of komt ernaast?

En voor de eigenaar: **A, B of C** (zie de tabel).
