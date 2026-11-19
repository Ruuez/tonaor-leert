# Ontwerp: de inspreekhulp (werkorder stap 6, vooraan)

Stand: 19 november 2026. Bronnen: `aanbevelingen.md` 6.1, `geluid.md` (bron 1 en "Raakvlak met opnemen en de inspreekhulp"), `werkvormen.md` 4.1 en 4.4, issue #31 (punt 3 van het besluit).

## Welke eisen het dient

- **F7 (geluid met de stilteschakelaar aan):** een opname van een mens is een geluidsbestand en speelt dus door de schakelaar heen.
- **Klankparen en dictee (`werkvormen.md` 4.4, #31 punt 3):** een echte stem voor de woorden waar de gemaakte stem het zwakst is. Ook afwisseling in stemmen.

## Wat er voor de leerder verandert

Niets aan de oefeningen. Waar een mens een tekst heeft ingesproken, hoort de leerder die stem in plaats van de gemaakte stem. Voor alle andere teksten blijft het zoals nu.

## Hoe het werkt

- **Waar:** op Ik, onder Proefonderdelen, een knop "Zinnen inspreken" voor een begeleider. Het scherm is niet voor de leerder bedoeld, maar is ook niet afgeschermd (de pincode uit #5 bestaat nog niet).
- **Welke zinnen:** een rij uit de pakketten op het toestel. Eerst de klankparen, dan de dicteezinnen, dan de kernzinnen van een hoofdstuk. Per zin de tekst groot in beeld, met een knop om op te nemen, terug te luisteren, opnieuw te doen of te bewaren, en een knop voor de volgende zin. De voortgang staat erbij ("12 van 40").
- **Opnemen:** dezelfde MediaRecorder en hetzelfde audio-element als bij de spreekstap (4.1). Opnemen duurt hooguit 10 seconden per zin, en de stilte aan begin en eind gaat er niet af (dat is eenvoudiger en voorkomt afgeknipte woorden).
- **Afspelen:** `playAudio` kijkt eerst of er een opname van een mens is voor de sleutel van de tekst (`PC.audioHash` van dezelfde genormaliseerde tekst). Is die er, dan speelt die opname. Anders gaat het zoals nu (draagzin, gemaakt bestand, de stem van het toestel). Het langzaam afspelen gaat via `playbackRate`, net als nu.
- **Opslag:** een aparte bak in IndexedDB (`leren-stemmen`). Die staat los van de opnamen van de leerder (`leren-opnamen`, grens van 30) en los van de voortgang, dus de opslagsleutel `tonaor-leert-v2` en het schema veranderen niet. Alles wissen wist deze bak niet, want het zijn de opnamen van de begeleider en geen gegevens van de leerder. Een eigen wisknop staat in het scherm zelf.

## Open besluit van de eigenaar (privacy): waar de opnamen heen gaan

Een stem is een persoonsgegeven. Daarom ligt deze keuze bij de eigenaar en niet bij de ontwerpsessie.

| | A. Alleen op het toestel (aanbevolen) | B. Als bestand naar een ander toestel | C. In de openbare repo |
|---|---|---|---|
| Wat | de begeleider spreekt in op de telefoon van de leerder; de opnamen blijven daar | inspreken op een eigen telefoon, delen als bestand, inlezen op de telefoon van de leerder (zoals Voortgang bewaren) | de opnamen gaan als `audio/nl/<naam van de stem>/<hash>.m4a` in de repo, net als de gemaakte stem |
| Wie hoort het | alleen dat toestel | alleen de toestellen die het bestand inlezen | iedereen die de app gebruikt, en iedereen op internet |
| Terug te draaien | ja, met de wisknop | ja, op elk toestel apart | **nee**: wat in de git-geschiedenis staat, blijft openbaar |
| Werk | klein | iets meer (export en import, controle van het bestand) | klein, maar de lijn en de poort moeten een tweede stem kennen |
| Nadeel | weg als het toestel of de browseropslag weg is; geen reservekopie | het bestand bevat de stem, dus het moet privé blijven | de stem van een echt persoon staat voor altijd openbaar; botst met de regel "geen persoonsgegevens in de publieke repo" |

**Aanbevolen: A.** Het is het kleinst en houdt de stem op het toestel. B kan er later bij, zonder dat A verandert. C alleen als de eigenaar dat bewust kiest, en dan met een stem die daar toestemming voor geeft.

Tot het besluit valt, wordt alleen dit ontwerp vastgelegd en wordt er nog niet gebouwd.

## Wat kan breken

- **Voortgang in `localStorage`:** niets, want het staat in een aparte IndexedDB-bak.
- **EDGE-koppeling:** niets, want er gaat geen geluid over de koppeling.
- **De les van `test-les`:** niets, want de samenstelling verandert niet.
- **Afspelen:** een opname die mislukt of leeg is, mag nooit stilte geven. Bij een fout valt de app terug op het gemaakte bestand.
- **Ruimte op het toestel:** 40 zinnen van 3 seconden is ongeveer 0,5 MB. Er komt een grens van 300 opnamen.

## Wat het wegneemt

Niets. Het gemaakte geluid blijft voor alle teksten zonder opname.
