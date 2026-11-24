# Stand van zaken

Kort en feitelijk. De werkende sessie houdt dit bestand bij; een eventuele extra ontwerp- of reviewsessie leest het. Geen privégegevens.

Bijgewerkt: 14 november 2026.

## Werkverdeling

- Sinds 14 november 2026 (bevestigd door de eigenaar): de ontwerpsessie stuurt via `docs/masterplan.md`; de bouwsessie voert uit (code, tests, releases, de redactielijn) en vraagt de ontwerpsessie bij een vraag over een eis. Zie `CLAUDE.md`, "Werkverdeling".
- De eigenaar beslist over pushen van code, beveiliging en privacy, geld, wat niet terug te draaien is, en de overgang naar de kaart.

## Live (GitHub Pages)

- Fase 1, voortgang beveiligen (#30): gesloten.
- Fase 2, inhoud uit de code en lessamensteller (#26): gesloten.
- Uitleg (speler, drie ingangen, 32 uitleggen) en het weekdoel (standaard 10 uur, merktekens op 3,5, 7 en 10 uur).
- Fase 3, het herhaalmodel (docs/herhaalmodel.md), inclusief de verwerkte review: live sinds 13 november 2026.
- Na gebruik: herhaling met tijd ertussen, dagbudget voor nieuwe woorden (eerst als vraag), Bijsturen op Ik, na de ronde te makkelijk/goed/te moeilijk en leuk/saai, vertaling melden, ervaringstest: live sinds 14 november 2026, cache v2-34 (t/m bad647d).
- M6/N-M6 (de vier strengen), cache v2-78: de klok telt per streng (SCHEMA 10, alleen toevoegend); Vandaag meldt een streng onder 12,5% in 7 dagen, of dat er vandaag nog niets gelezen of geluisterd is (met een knop naar een verhaal); bij meekijken de verdeling. Nog open: de keuze van de volgende scène laten meewegen. Besluit ontwerpsessie (18 november 2026): de strengen tellen alleen Nederlands; Engels krijgt later zijn eigen vier strengen (onderbouwing-engels), zodra er genoeg Engelse lesstof is; een gezamenlijke verdeling komt er niet. E-M2 (geen Nederlands in de Engelse oefeningen, de brug alleen bij gelijkenis, geen brug na een fout) akkoord.
- Cache v2-102 (24 november 2026): antwoorden van de ontwerpsessie op de makkelijke start, plus haar speelronde.
  - **Beginnersstart:** een instap- of ophaalvraag over iets wat nooit is aangeboden, wordt vervangen door het tonen ervan.
    - Een woord of vaste zin verschijnt als woordkaart met lidwoord, geluid en vertaling.
    - Bij een regel verschijnt de uitlegkaart van de scène.
    - Een maakstap toont eerst het onderdeel.
    - Bij open invoer en bij een maakstap staat de knop Weet ik niet; daarna volgt het antwoord of het voorbeeld, en de scène gaat door.
  - **Na een week, alleen op de kaart:**
    - Bij Nog niets komt één keer het aanbod van de startmeting. Het is weg te tikken en staat daarna op Route als knop Startmeting doen. Bij Nog niets staat de meting niet meer als taak op de kaart.
    - Daarna komt één keer de vraag naar het weekdoel, met de vier keuzes en Later. Die vraag komt niet op dezelfde dag als het aanbod.
    - De vraag geldt alleen voor nieuwe starters: S.startT, SCHEMA 17, alleen toevoegend. Wie al met de start van v2-101 begon, krijgt startT gelijk aan starter.
  - **Overig:**
    - Dag-1-kaart: de titel van de plek staat er ook in de steuntaal.
    - Onderweg heeft geen minuten meer.
    - Staat alles op het begin, dan toont de meting één zin: "Je begint bij het begin."
  - **Getest:** tests uitgebreid (test-start, migratie 16 naar 17). Browsercontrole op 375 px: Nog niets door de eerste scène, het aanbod en de vraag na acht dagen, Route, en een meting met alles op Weet ik niet.
  - **Bewust niet gedaan:**
    - Het aanbod en de vraag staan alleen op de kaart, niet op Vandaag. De kaart is het thuisscherm.
    - Wie op Ja tikt en de meting afbreekt, krijgt geen tweede aanbod; de meting blijft via Route te doen.
- Cache v2-101 (24 november 2026): de makkelijke start (docs/ontwerp-start.md).
  - De start bestaat uit drie schermen: de taal, een kort welkom, en "hoeveel Nederlands ken je al?".
    - Nog niets: direct de eerste les.
    - Een beetje: een korte meting die per onderdeel stopt na twee keer niet weten. Een gestopt onderdeel telt als 0.
    - Veel: de volledige meting.
  - Na de meting staat er "Hier begin je" in plaats van 0%-balken, gevolgd door de eerste les.
  - Beginnersstart van 14 dagen (S.starter, SCHEMA 16, alleen toevoegend; bestaande leerders null, hun les is ongewijzigd):
    - geen instapvraag over nooit geziene stof;
    - steuntaal bij instap en controle;
    - een nieuw woord eerst tonen.
  - Bij Een beetje geldt de beginnersstart alleen voor het vak of onderwerp van de scène met een uitslag onder 0,34. Wie de meting afbreekt, krijgt de beginnersstart overal.
  - Kaart op dag 1: alleen de groet, de eerste plek met Begin, en het pad. Daarna één keer "Nieuw: Onderweg" en een vraag naar het leermoment.
  - In nl-t1 en en-t1 zijn de vaste plaatsnamen vervangen; daarom is de les van test-les opnieuw vastgelegd en het geluid opnieuw gemaakt.
  - Test: tools/test-start.mjs; migratietest 15 naar 16.
  - Codereview verwerkt:
    - starterOn per vak;
    - een afgebroken meting;
    - de tekst "hooguit 15" en een teller zonder sprongen;
    - een gestopt onderdeel telt als 0;
    - dag 1 alleen als er een plek is;
    - lang per taal in het welkom;
    - aria en geen tweede h1 bij het leermoment;
    - een opmerking uit de code die zichtbaar werd.
  - Browsercontrole op 375 px: alle drie de routes.
- Cache v2-100 (24 november 2026): werkorder stap 8 (docs/ontwerp-stap8-melden.md). Eén knop Vraag het bovenaan elk oefenscherm (niet op eindschermen) met een blad: de uitleg bij de stap, Vraag je begeleider (de bestaande hulpvraag), Fout melden (zes soorten, toelichting hooguit 200 tekens met de waarschuwing geen namen of telefoonnummers). Besluit eigenaar (privacy, B): een melding gaat versleuteld als hulpvraag met de soort naar de begeleider en blijft in de wachtrij op het toestel (Mijn meldingen op Ik, bewaard/verstuurd, wissen met bevestiging). Geen naam; buiten STORE ok niets bewaard of verstuurd (en dat wordt gezegd). Punten 2 per plek, hooguit 10 per dag, niet in proef of les. SCHEMA 15 (reports, reportPts). Codereview verwerkt (inert achter het blad, steuntaal in het blad opent geen vertaalmelding, plek per scherm). Test: test-melden.
- Cache v2-99 (24 november 2026): werkorder stap 7, de leerlijn per vak (docs/ontwerp-stap7-leerlijnen.md, akkoord ontwerpsessie). Tegels Rekenen en Engels op de kaart (2x2 met Ontdek en Spelletje; Onderweg op 375x667 499 px) en onder Meer. Rekenen: zes onderwerpen met namen voor de leerder (Geld en tijd, Getallen, Meten, Verhoudingen en procenten, Tabellen en grafieken, Ruimte en vorm), indeling via goals op items of de goals van een rekenscène (alleen rekenvaardigheden en -regels), Komt nog als één regel. Engels: de Engelse les bovenaan, thema per pakket met merktekens lezen/luisteren/spreken/schrijven. Oefen per onderwerp: hooguit acht, alleen bekend met een oefening, telt als losse herhaling, geen ronde van de dag, minuten bij het eigen vak. Poort: goals is een melding. Lesstof: goals in rk-1 en en-t1 (redactielijn). Codereview verwerkt. Test: test-leerlijn.
- Cache v2-98 (24 november 2026): lesstof, twaalf extra klankparen (content/nl-klanken.json, redactielijn: schrijver en reviewer sonnet, één herstelronde): slap/slaap, les/lees, vis/vies, zon/zoon, boer/buur, huid/hout, keus/kus, zijn/zien, gat/kat, wijn/fijn, ben/pen, weer/veer; per paar twee keer luisteren (beide richtingen) en één keer horen en opschrijven, met geluid. Afwijking van de gevraagde contrasten op advies van de reviewer: v/f en z/s zijn in het Nederlands van Nederland zwak (veel sprekers zeggen v als f en z als s), daarom w/f (wijn/fijn) en b/p (ben/pen); u/uu als oe/uu (boer/buur, het enige echte minimale paar op A1-A2); ij tegenover ie (zijn/zien), omdat ij en ei hetzelfde klinken. Test samensteller: de belofte alles binnen zeven dagen geldt voor de basis, de extra klankparen komen geleidelijk.
- Cache v2-97 (24 november 2026): na ijkmoment G4 voor de spellen (docs/ijkmoment-g4.md). Zet de klok: de gezette tijd in woorden pas na Controleer (voor VoiceOver altijd), geen tijd twee keer. Klankduel: kiezen pas als het woord klinkt, alleen paren die kunnen klinken, gehusseld. Wisselgeld: twee beurten leggen met teller, daarna echt wisselgeld (het kost, je betaalt met, leg het wisselgeld) met de teller pas na Klaar. De of het: de vorm vooraf tot twee goede beurten over de dagen (S.dhOk, SCHEMA 14), een misser zet hem terug; niet hetzelfde woord binnen drie beurten. De tegel Spelletje ook op de kaart (Onderweg blijft op 375x667 in beeld: 499 px, tabbalk 586). De redactielijn mag alle vijf spellen gebruiken. Open voor de lijn: minstens twaalf klankparen in beide richtingen met geluid (a/aa, e/ee, i/ie, o/oo, u/uu, ui/ou, eu/u, ij/ei, g/k, v/f, z/s, w/v).
- Cache v2-96 (24 november 2026): de spellen (docs/ontwerp-spellen.md, akkoord ontwerpsessie). Vijf spellen in één kader: de of het (vorm vooraf de eerste twee keer per sessie en na een misser), klankduel (per paar; valt weg in de stille stand), koppelen (woord en omschrijving tot 40 tekens, 2x3 kaarten, voorgelezen), zet de klok, wisselgeld (tikken). Beurten in plaats van aftellen (MOTOR.gameTurns, aanname); record = snelste tijd met hooguit één misser (S.gameBest, SCHEMA 13, speedBest blijft als vorig record). Misser geen fout; de eerste goede beurt per onderdeel telt passief als spel, zonder exid (geen variant voor bloei). De tegel Spelletje start het spel dat het meest oplevert, met Of kies zelf. Proefscène met de vijf spellen in proef-g4b. Codereview verwerkt (hulp afbouwen per sessie omdat een spel passief telt, geen bloei via exid, koppelen telt een misser alleen als de andere helft al open lag, geen record in een les of proef, timers per spel en beurt, dubbel tikken, klok nooit op de beginstand, eerst wijzers zetten, labels). Test: test-spellen.
- Cache v2-95 (24 november 2026): na ijkmoment G4 groep 2 (docs/ijkmoment-g4.md). rekenen krijgt wrong: hooguit twee verwachte foute getallen met eigen uitleg en soort fout (de poort weigert een wrong gelijk aan answer of accept). De G2-maat telt ook de keuzes in steps. De poort meldt een rekenscène zonder steps. Tik en tik met aria-pressed. Schrijver en reviewer: rekenen is de echte vraag, wrong bij elke rekenen, klopt met een afgeronde schatting en een grens, labels passen bij de tekening; de vormen mogen vanaf het volgende hoofdstuk (minstens één steps per rekenscène, drag waar het past). Proefscènes blijven tot de telefoontest van slepen.
- Cache v2-94 (24 november 2026): werkorder stap 6 groep 2 (docs/ontwerp-stap6-groep2.md, akkoord ontwerpsessie). Rekenen in stappen (steps, vorm stappen): 2 tot 4 gesloten deelvragen, altijd rekenen en als laatste klopt; per deelvraag een tweede kans, dan het antwoord en door; soort fout per stap; afbouw per onderdeel uit de geslaagde pogingen (MOTOR.stepsFade [2,5], aanname) met één niveau terug na een fout; bij model een plaatje; in de korte ronde hooguit één. Slepen en sorteren in de scènetekening (drag, vorm slepen): 1 tot 3 paren, een plek mag vaker voorkomen; tik en tik als gelijkwaardige weg (toetsenbord, VoiceOver); twee missers: de app zet het neer. Poort: pakketcheck en controleer.mjs. Proefpakket proef-g4b (type proef): laadt alleen met Proefonderdelen aan, start op Ik, speelt in een proefstand die nergens meetelt (geen herhaling, punten, foutprofiel, ronde, kaart of leertijd; woorden niet in de opslag). Nieuwe test test-syntaxis (een syntaxfout gaf een leeg scherm en viel buiten de andere tests). Codereview verwerkt; open kleine punten: een pointerup buiten het ding zonder pointercapture, het scènelabel bij steps in de korte ronde, het uitlegaanbod telt fouten over deelvragen samen. Schrijversopdracht: de vormen pas na G4 groep 2. Test: test-stappen, test-slepen.
- Cache v2-93 (21 november 2026): besluit eigenaar (ijkmoment G3, docs/ijkmoment-g3.md): de kaart is het standaard thuisscherm, voor nieuwe en bestaande installaties. SCHEMA 12: een migratiestap zet één keer S.home op kaart en S.homeSet; daarna beslist alleen de keuze op Ik (die zet ook homeSet). Vandaag en de tuin blijven te kiezen; zonder wereld.js valt kaartOn() terug op Vandaag. Wat is nieuw aangepast. Browser: een opslag op schema 11 met Vandaag gaat naar de kaart, met reservekopie.
- Cache v2-92 (20 november 2026): de examenregel op de kaart is één regel in de leertaal (Examen: tussen nov 2027 en apr 2028); programmanaam en steuntaal staan op Route. Op 375×667: Verder eindigt op 323 px, Onderweg op 499 px, tabbalk op 586 px.
- Cache v2-91 (20 november 2026): de drie aanpassingen uit G3 (docs/ijkmoment-g3.md). Smalle weekring (tik: het hele blok), examenregel klein eronder, dan Je bent hier met Verder en Onderweg; browsercontrole op 375×667: Verder eindigt op 403 px en Onderweg op 578 px, de tabbalk begint op 586 px (krap: een langere titel kan Onderweg net onder de rand duwen). Ontdek en Meer vóór het pad, daarna de meldingen; het pad toont hooguit twee silhouetten na de dichte plek en dan nog n plekken. Het plekblad komt van onderen, met sluitknop, Escape of tikken ernaast, zonder de pagina te scrollen; per scène één regel, latere scènes met een slotje. Review verwerkt (één set listeners, focus terug, aria-modal, dvh, meervoud). Test: test-thuiskaart.
- Cache v2-90 (20 november 2026): masterplan stap 5, de kaart als thuisscherm met album (docs/ontwerp-stap5-kaart.md, akkoord ontwerpsessie). Op Ik: Thuisscherm Vandaag (standaard) of Kaart, en de kleur van het figuurtje. Kaart: weekring, examenregel, meldingen, de huidige plek met Verder, Onderweg (de les van vandaag) met het aantal dat wacht, het pad met plekken (hoofdstukken) en stippen per scène, Ontdek en Meer (het hele scherm Vandaag). Album: wat je kunt per plek in vier sterktes, met Tuin bekijken. SCHEMA 11 (alleen toegevoegd). wereld.js tekent de kaart. Codereview verwerkt (zonder wereld.js het oude scherm, knoppen overlappen niet, dezelfde volgorde als nextScene, bijsturen op de kaart, terug vanuit Meer, woorden van dichte plekken bij Basiswoorden, het figuurtje loopt niet terug als alles gedaan is). Wacht op G3 (ontwerpsessie speelt als leerder) en het besluit van de eigenaar over standaard maken. Test: test-thuiskaart, test-migratie.
- Cache v2-89 (20 november 2026): proefweek geschrapt (besluit eigenaar): scènes en Ontdek standaard op Vandaag, niet meer achter Proefonderdelen. Daarachter blijft alleen wat op de telefoontest wacht: opnemen in de spreekstap, het spraakdagboek en de inspreekhulp. Tip bij Proefonderdelen aangepast, Wat is nieuw (drie punten). Test: test-scenes.
- Cache v2-88 (20 november 2026): ijkmoment G4 groep 1, opdrachten 1 tot 4 (zie hieronder). Luistertekst pas na afspelen; bedragen met twee decimalen; poort meldt rekenmodel en examen-luistertekst (en bedragen met meer dan twee decimalen); 15 luistervragen van thema 2 herschreven (twee reviewrondes, sonnet), nieuw geluid. Codereview verwerkt (een foute keuze blijft uit na opnieuw afspelen, één keer afspelen per tekst, geen tekst voorzeggen bij een lege stemmenlijst, hint pas na afspelen, afronding van halve centen, euro als woord).
- Cache v2-87 (20 november 2026): het Spraakdagboek neemt echt op (melding van de eigenaar bij de telefoontest: de knop verwees naar een iPhone-app die er niet is). Opnemen tot 1 minuut, terugluisteren, opnieuw, bewaren in de eigen bak op het toestel (zelfde regels als de spreekstap: grens 30, wisknop op Ik, mee weg bij Alles wissen), +15 punten. Achter Proefonderdelen, zoals al het opnemen tot de telefoontest. Ook de andere teksten over een iPhone-app weg (gesprek, meekijken, delen). Test: test-opnemen 5c.
- Cache v2-86 (19 november 2026): de inspreekhulp (werkorder stap 6, vooraan; docs/ontwerp-inspreekhulp.md). Op Ik onder Proefonderdelen: Zinnen inspreken (voor een begeleider). 877 kernzinnen (klankparen, dictee, en per hoofdstuk say, them en model), opnemen, terugluisteren, bewaren, wissen. Een ingesproken opname speelt vóór het gemaakte geluid, met het gemaakte bestand als terugval. Besluit eigenaar (privacy): alleen op het toestel, eigen IndexedDB-bak, hooguit 1000, Alles wissen laat ze staan.
- Cache v2-85 (19 november 2026): geen vaste namen meer in de app (begeleider, iemand thuis).
- Cache v2-84 (19 november 2026): besluit eigenaar over de opnamen van de spreekstap: bewaren voor de tijdcapsule, met een eigen wisknop op Ik (aantal en Opnamen wissen, met bevestiging; docs/ontwerp-stap6.md).
- Cache v2-83 (19 november 2026):
  - Losse woorden in een draagzin, met dezelfde stem ("Het woord is man."; issue #31, besluit eigenaar via de ontwerpsessie, docs/geluid.md).
  - Lesstof: nl-klacht en nl-afspraak (thema 2) uitgebracht na review goed, met geluid.
  - Vier regels hebben nu een eigen zin: vjd.regel.met, mdl.regel.voelen, kla.regel.zodat en afs.regel.te staan bij de items van een bestaande make- of speak-opdracht die de regel uitlokt (review opus: goed).
  - De poort kent de rekenvormen numline, strip en ratio.
- Meting losse woorden (#31, punt 1 en 2): lokale spraakherkenning (Whisper medium, zonder download), met als uitslag goed, alleen lidwoord anders, of anders verstaan.
  - Meting 1, oude bestanden: woorden 622 goed, 4 lidwoord, 388 anders (38%); klankparen 2 goed, 4 anders (maan → "WAM", man → "Moe", keel → "K.O.", geel → "Geo"); overig (labels, bedragen, zinsdelen; blijft zonder draagzin) 194 goed, 170 anders.
  - Meting 2, dezelfde 1019 woorden in de draagzin: 921 goed, 2 lidwoord, 96 anders (9%); klankparen 6 van de 6 goed.
  - Van de 393 woorden die eerst anders klonken, worden er nu 316 goed verstaan; 24 die eerst goed waren, nu niet.
  - Wat overblijft is grotendeels een spellingsfout van de herkenner (onderpant, reist, mantje, regerakkoord); een paar korte woorden zijn twijfelachtig (zon → "som", bron → "Brom", dam → "done").
  - Conclusie: het probleem was het losse woord, niet de stem. Een betaalde stem is op grond hiervan niet nodig (punt 4 blijft bij de eigenaar). Een spraakherkenner is strenger dan een mens: de getallen zijn een bovengrens van het probleem.
- Werkorder stap 6, derde groep: getallenlijn, strook en verhoudingstabel als vraag in een scène (docs/ontwerp-stap6.md, formaat in docs/scenes.md), cache v2-82; nakijken in pakketcheck, poort controleert de velden. Nog geen lesstof die ze gebruikt. Lesstof: nl-medeleven (thema 2) uitgebracht na eindreview goed.
- Werkorder stap 6, tweede vorm: de luistertekst (docs/ontwerp-stap6.md), cache v2-81: eerst de vraag, dan zelf afspelen; meelezen met oplichtende zin in de eerste 3 scènes met een luistertekst, daarna alleen luisteren (tekst na het antwoord); langzaam/gewoon/iets sneller en deze zin nog eens; examenvorm met 25 seconden leestijd en één keer afspelen. Niet achter Proefonderdelen: de scènes zelf staan daar al achter.
- Werkorder stap 6, eerste vorm: opnemen en terugluisteren in de stap speak (docs/ontwerp-stap6.md), cache v2-80. Achter Proefonderdelen. Opnamen alleen op het toestel (eigen IndexedDB-bak, hooguit 30, niet in de voortgang of reservekopie, weg bij Alles wissen); de leerder keurt zelf (klonk goed = goed, nog niet = retry); examenvorm met 20/30/120 seconden en 30 seconden voorbereiding bij long (aanname). Zonder microfoon blijft de stap zoals hij was. Nog te doen: proef op de iPhone (microfoon, terugluisteren met de schakelaar op stil). Lesstof: nl-verjaardag (thema 2) uitgebracht na review ronde 2 goed.
- E-M1/E-M2 (Engels via de steuntaal), cache v2-79: een Engels woord en zijn Nederlandse tegenhanger worden niet in dezelfde week nieuw (7 dagen, ook in de Engelse les); het Nederlandse woord verschijnt alleen als brug als het erop lijkt (`nlLike`, met waarschuwing bij een valse vriend), anders niet meer in de Engelse oefeningen (behalve bij alleen Nederlands of steuntaal Engels). Codereview M6 verwerkt: alleen Nederlandse tijd telt voor de strengen, gesprek en dagboek tellen als output, kijken en luisteren als input, het introscherm van een moeilijke scène niet als vloeiendheid. Stap 5 van de werkorder is klaar.
- MO-M6 bij scènes, cache v2-77: de tik na een scène is over te slaan; twee keer te moeilijk geeft meer steun (steuntaal aan, de eerste hint al zichtbaar, extra na de eerste fout); twee keer saai geeft de zwaardere vorm. Ontdek heeft geen tik.
- MO-M6 (sneller bijsturen in de eerste twaalf weken), cache v2-76: twee keer te moeilijk (les, Engels) maakt de volgende ronde korter en kiezen; twee keer saai (les, Engels, scène) maakt hem uitdagender en afwisselender, met een voorstel op Vandaag. Het protocol is ongewijzigd. Codereview (Opus) over MO-M2, M4 en M6: 1 blokkerend (de sturing lekte naar het bericht voor de begeleider) en 9 klein, verwerkt.
- MO-M4 (gedrag meten), cache v2-75: doorgaan na een ronde per dag (SCHEMA 9, alleen toevoegend); bij meekijken een tabel van vier weken met dagen, minuten, rondes, doorgaan en de tikken. MO-M6 wacht op een besluit over wat een soort onderdeel is.
- MO-M2 (punten alleen achteraf), cache v2-74: er hangt geen inhoud aan punten en ze zakken nooit. Het scherm Route beloofde nog een beloning vooraf; dat is nu terugkijken achteraf. Test: tools/test-motivatie.mjs.
- Tweede reeks losse lessen (volgorde 21 tot 40, zeven met kaart of tijdlijn), cache v2-73:
  - Alle twintig zijn uitgebracht na review Opus, herstel, nacontrole en de G2-maat voor een losse les. Ook bijgewerkt: zeespiegel, mekong, tijdzones en karma (foute keuzes langer).
  - De lijst van veertig lessen is in orde (checkLessen). Het geluid is erbij.
  - Open (klein, in de reviews): Thai van een paar nieuwe zinnen door een Thaise lezer laten nalopen.
- Herstelronde thema 1 op G2 en nl-buren, cache v2-69:
  - nl-thuis (goed = langste 60% naar 20%) en nl-werk (72% naar 28%) met een nieuwe leestekst van ruim 160 woorden en een eigen zin per regel. Review Opus goed; de kleine punten zijn verwerkt.
  - nl-buren (thema 2, order 70): live na drie reviewrondes (ronde 3 op G2: 25%).
  - nl-dokter (33%), nl-markt (29%), nl-onderweg (29%) en nl-opleiding (32%): na de herstelronde goed bevonden (review Opus), met de kleine punten verwerkt. Make-frames laten de plek van de regel open, zodat de eigen zin echt telt. Live als cache v2-70.
  - De herstelronde van thema 1 is klaar.
  - Basisregels (uitleg 19, besluit ontwerpsessie): nl.regel.plek2 telt via de eigen zin met inversie in nl-werk (werk-1), nl.regel.heb via die met zijn/hebben in nl-thuis (thu-3).
  - Open: en.regel.s wacht op de eerste Engelse scène. Een make-oefening in een basispakket kan de samensteller niet aan zonder een grote ingreep.
  - De poort G2 blijft in de app een melding, geen weigering (besluit ontwerpsessie); in de redactiepoort weigert hij.
  - G2 punt 5: tools/dekking.mjs telt per eindterm (tabel hieronder, bij elke release opnieuw). Gaten: lezen-5, schrijven-2 en rekenen-4-procenten hebben nog geen lesstof; examenvorm alleen bij luisteren.
  - G2 punt 7 (N-M3): een nieuwe regel komt na 3 dagen terug (MOTOR.ruleFirstDays, Suzuki 2017); na een mislukte poging korter. De vergelijking met het Thais alleen waar die past staat in de schrijversopdracht.
  - Redactiepoort: een Latijnse letter vast aan Thaise tekst is een fout.
- Werkorder stap 5 vervolg en ijkmoment G2 (docs/ijkmoment-g2.md), cache v2-68:
  - M5/N-M4: de trede per regel (kiezen, afmaken, een eigen zin).
    - Een regel bloeit pas als trede 2 in een gesloten productieve vorm op twee dagen goed ging, plus een eigen zin (make of speak). Besluit ontwerpsessie na G2.
    - De trede en de eigen zin worden bewaard per regel, dus inkorten van de reeks pakt niets af.
  - N-M2: herkennen groeit met 0,6, met een rem op volle bloei (nooit voor dag 21; besluit A2, herhaalmodel 10b).
  - SCHEMA 8, alleen toevoegend: gf voor wat al bloeide.
  - G2 punt 1: de fout in de kennisles van nl-werk is hersteld.
  - G2 punt 2:
    - checkG2 in de redactiepoort: goed = langste hooguit 40%, geen gelijke stappenreeks, een lange tekst, guess bij raden, tol bij schatten., en sinds 19 november 2026 een eigen zin per regel (besluit ontwerpsessie: elke regel staat bij de items van een stap make of speak; en.regel.s uitgezonderd tot de eerste Engelse scène). De app weigert er niets op; daar blijft het een melding.
    - De schrijvers- en revieweropdracht zijn bijgewerkt.
    - Raadvragen in alle lesstof hebben guess: true; in de app telt raden niet als fout.
    - De zin 'Dat past ook' staat nu in I18N.
  - Codereviews (Opus):
    - trede: 1 blokkerend (bestaande bloei afgepakt), opgelost met bewaarde trede en gf;
    - bloei-ombouw: 1 blokkerend (geen regel kon bloeien: een eigen zin telde alleen als hoofddoel), opgelost; een extra groeistap bij de terugkeer op dag 22 is ook opgelost.
  - Lesstof: op en.regel.s na hebben alle 63 regels een opdracht voor een eigen zin (19 november 2026; test-herhaal meldt de rest).
  - Open (lesstof): de herstelronde van thema 1 op G2 (goed = langste 60-74%, geen lange tekst in de meeste hoofdstukken).
  - Open (lesstof): nl-buren (74%) terug in redactie/uit voor herstel volgens de nieuwe opdracht.
- Werkorder stap 5, eerste deel (docs/ontwerp-stap5a.md), cache v2-66 en v2-67:
  - N-M1: een woord in een lees- of gesprekstekst aantikken geeft eerst drie betekenissen in de steuntaal, daarna het woord met de omschrijving. Een goede keuze is een ontmoeting, alleen voor een woord in de herhaling. Niet zonder steuntaal.
  - R-M3: in de herhaling nooit twee sommen met dezelfde aanpak achter elkaar (veld `approach`, anders de vorm). Nieuw mag geblokt.
  - Tests: tools/test-tik.mjs en test-samensteller.
  - Codereview (Opus): 2 blokkerend (een nieuw woord verweesd, aantikken waar de steuntaal bewust uit staat) en 6 klein, verwerkt.
  - Besluiten van de ontwerpsessie (cache v2-67):
    - een nieuw woord aantikken levert niets op;
    - rk-1 krijgt een eigen aanpak per som (money, decimal, percent-tenth, percent-fraction);
    - met de steuntaal op altijd toont aantikken meteen de betekenis.
  - IJkmoment G2 is uitgesteld tot de eigenaar het vrijgeeft (tokens sparen).
- Lesstof in redactie/uit (niet in content, wacht op een volgende sessie; gestopt om tokens te sparen, besluit eigenaar 15 november 2026):
  - nl-buren: review 1 verbeteren (3 blokkerend), hersteld, nacontrole nog te doen.
  - Lessen 21 tot 26 (tweede reeks): review 1 (4 goed, 2 verbeteren), hersteld, ronde 2 alle zes goed (<id>.review2.json). Er staan nog kleine punten in de review.
  - Lessen 27 tot 32: review 1 vijf goed, ao-vrijmetselaar verbeteren (blokkerend: de bron zegt niet dat namen van leden niet bekend worden; een onafhankelijke bron is gewenst). De kleine punten staan in de reviews.
  - Lessen 33 tot 40: nog niet geschreven.
  - Uitbrengen kan pas als alle draden bestaan.
- Werkorder stap 4, de route met tijd (docs/route-en-prognose.md, bouwontwerp docs/ontwerp-stap4.md), cache v2-65:
  - Vandaag toont de eerstvolgende poort met maand, bandbreedte en hoeveel eerder of later dan vorige maand.
  - Route toont alle poorten (tot stap 10 één datum voor programma I, met de vier onderdelen eronder), het tempo naast het weekdoel, 'wat als' met een schuif, per vak de blokken met duur en voortgang, tijd buiten de app (hooguit 60 minuten per dag) en één keer per maand waarom de datum verschoof.
  - De route staat in het pakket content/route-nt2.json (type route, gecontroleerd door route.js) en het rekenen in route.js.
  - De klok telt per vak.
  - SCHEMA 6 naar 7, alleen toevoegend: minsV, outside, prog en blockAdj.
  - Startpunt volgens de ontwerpsessie: de leertijd die al in de app staat.
  - Test: tools/test-route.mjs, plus de migratietest.
  - Codereview (Opus): niets blokkerend, 14 punten, verwerkt. Uitzondering: de bijstelling na een afgerond blok, die gaat pas werken met stap 10.
  - De oude routekaart met vaste teksten en een naam is weg.
- Hoofdstukken nl-onderweg ("Onderweg", order 50) en nl-opleiding ("Een opleiding kiezen", order 60) achter Proefonderdelen, cache v2-63. Schrijver Sonnet, review Opus. nl-onderweg: ronde 1 verbeteren (3 blokkerend: heb/ben-regel te stellig, goed antwoord als bijna-fout, reden zonder bron), ronde 2 goed, ronde 3 nacontrole van 5 kleine punten goed (route in de stap gelijk aan het gesprek, leestekst 118 woorden; 70 procent verlichte fietspaden letterlijk in de CBS-bron). nl-opleiding: ronde 1 verbeteren (5 blokkerend: "worden wil" ten onrechte fout, bouwzinnen met twee goede volgordes), ronde 2 verbeteren (1 nieuwe bouwzin met twee volgordes), ronde 3 goed. Klein open: drie bouwzinnen na want laten een gemarkeerde volgorde toe; Thai van de langere zinnen nog niet door een moedertaalspreker gezien. Geluid: 13306 teksten.
- Kaart en tijdlijn als bouwsteen (docs/kaart-en-tijdlijn.md, stap 1-3 van de bouwvolgorde), cache v2-63: kaart.js (projectie eqr en kegel, afstand, richting, tekenen, nakijken, poort), vier kaarten uit Natural Earth (publiek domein, tools/bouw-kaart.mjs, elk onder 80 kB, ook in de offline-cache), `do` met vorm `map` (gebied of plek met tol in km; de app zegt afstand en richting) en `timeline` (twee tot vijf kaartjes leggen, volgorde en tol), poort in pakketcheck en controleer (in Node ook ids en maat: het goede gebied minstens 24 px op ongeveer 300 px breed; kleinere gebieden zijn niet aan te tikken), test tools/test-kaart.mjs. Codereview (Opus): 4 blokkerend (24 px-maat zonder knippen, tijdlijn zonder kaartjes gaf goed, kaarten niet zeker offline, tekst als getal) en 10 klein; de blokkerende en de meeste kleine verwerkt. Na de ontwerpsessie: bij de vraag is alleen de naam van het antwoord verborgen (andere namen geven houvast); namen alleen in de leertaal is zo bedoeld. Open: geluid bij namen op de kaart en de kaartjes (volgende geluidsronde); toetsenbord voor plek en tijdlijn (toegankelijkheidsronde); lange labels op de tijdlijn breken niet af. Stap 4 klaar: de lessen aardappel (Titicacameer aantikken, tijdlijn 1567-1750), wet (tijdlijn met 1830 als anker), Mekong (delta aantikken, land van Tonlé Sap, rivier langs de grens) en zijderoute (kaart met de route, tijdlijn, Samarkand aantikken) door de review Opus: ronde 1 Mekong verbeteren (rivier dwars door Thailand), ronde 2 alle vier goed. De ontwerpsessie stemde in met de twee keuzes (alleen het goede gebied moet 24 px zijn; tol verplicht bij log). Kaart: land warm crème tegen blauw water. Live als cache v2-64.
- Twintig losse lessen algemene ontwikkeling achter Proefonderdelen (tegel Ontdek) en hoofdstuk nl-markt ("Boodschappen doen"): live 15 november 2026, cache v2-62. Lessen volgens docs/algemene-ontwikkeling.md (geen stramien, dieper, geen grind, draden, standpunt); schrijvers Sonnet, review Opus per groep van zes, elke les "goed" na hooguit twee rondes en een nacontrole (feiten tegen de bronnen, toon bij geloof en politiek). nl-markt: twee rondes, goed. Code: type les, tegel Ontdek, standpunt, build zonder verb, wrong; codereview (Opus) 1 blokkerend (lesswoorden in de gewone les) en 11 klein, verwerkt. Bewust streng gelaten (besluit eigenaar mogelijk): redactie/uitbrengen.mjs stopt ook bij een les met een mogelijke eigennaam; lessen met plaatsnamen gaan daarom met een gewone release. Kaart en tijdlijn als bouwsteen ontbreken nog (ontwerpsessie): vier lessen benaderen die met volgorde leggen.
- Hoofdstuk nl-werk ("Op het werk") achter Proefonderdelen, en masterplan uitleg 20-22: live 15 november 2026, cache v2-60. nl-werk: drie rondes en een nacontrole, review goed (Opus); woorden uit nl-t1 als doel (uitleg 19); order 20 rechtgezet (stond op 40). Uitleg 20-21: foute keuzes bij herkennen uit een eigen lijst `wrong` bij de gatzin (pakketcheck controleert: 2-3 woorden, geen lidwoord, geen dubbel, geen goed antwoord), anders alleen uit hetzelfde pakket en dezelfde soort; de les van test-les verandert niet. Uitleg 22: een begonnen hoofdstuk gaat voor (wie in de dokter zat, blijft daar tot het af is); een scène met een woord zonder item (ontbrekend pakket uit requires) wordt niet getoond. Codereview (Opus): niets blokkerend, 6 klein, 5 opgelost; vraag naar de ontwerpsessie: telt een hoofdstuk pas als begonnen na een afgemaakte scène?
- Hoofdstuk nl-thuis ("Over jezelf vertellen", thema 1) achter Proefonderdelen: live 15 november 2026, cache v2-59. Schrijver Sonnet, review Opus: review 1 verbeteren (14 blokkerend), review 2 verbeteren (3), nacontrole goed. Herstel ging ook langs nl-basis (moeder, vader, stad, morgen, brief) en nl-t1 (salaris): strakkere gatzinnen, zodat Herkennen geen goed antwoord fout rekent. Code in deze stand: scènes in de volgorde van de route (order, dan pakket, dan n), tegel met de titel van het hoofdstuk, teller alleen over geladen scènes, poort: bestaand woord als doel alleen uit requires (masterplan uitleg 19). Codereview (Opus): niets blokkerend, 7 klein; 2 opgelost, open: hoofdstuk laadt ook als een required pakket ontbreekt (lenient, bestaand gedrag), wie al in de dokter bezig was, gaat na de release eerst naar thuis (volgt de route), hoofdstuktitel op de tegel alleen in het Nederlands.
- Voorlezen uit geluidsbestanden (docs/geluid.md, eis F7, werkorder stap 1b): live sinds 15 november 2026, cache v2-58 (c0b5e56). Proef op de iPhone met de schakelaar op stil geslaagd (zinnen hoorbaar, bedrag uit drie stukjes goed, stem goed genoeg). Stem: Piper, pim (CC0, geen bronvermelding nodig), lokaal op de pc van de eigenaar met zijn toestemming geïnstalleerd. 3022 bestanden voor alle bestaande lesstof en de vaste zinnen van de app; lijnstap redactie/geluid.mjs (TONAOR_STEM wijst naar het programma buiten de repo), poort tools/test-geluid.mjs. Onafhankelijke review: 2 blokkerend (dekking van samengestelde en vaste teksten; iOS-bytebereik via de service worker), 8 klein, alle verwerkt. Nog open uit het ontwerp: stap 5 (eigen geluidscache voor offline, met bytebereik; nu gaat geluid buiten de service worker om, dus offline valt het terug op de stem van het toestel), stap 6 (getallen uit stukken voor sommen met gen), stap 7 (opnemen en de inspreekhulp). Nog niet bevestigd in de app zelf op de iPhone met de schakelaar op stil.
- Stap 3a, lesstof los van de code (content/index.json, redactie/uitbrengen.mjs): live, cache v2-56 (2800960); review verwerkt (1 blokkerend: hoofdstukken uit de index offline na installatie).
- Geluidspogingen weggehaald, voorlezen weer zoals vóór 15 november: live, cache v2-55. Geluid met de stilteschakelaar aan is een open eis (zie hieronder).
- Proefhoofdstuk bij de dokter achter Proefonderdelen, knop Mijn antwoord is ook goed, standreview verwerkt: live sinds 15 november 2026, cache v2-53 (b1e209e), gepusht met akkoord van de eigenaar (in de testfase zo vaak als nodig).
- Herstel geluid met de stilteschakelaar aan: live sinds 15 november 2026, cache v2-51 (c6f67db) werkte niet; tweede poging (stil geluid loopt mee) live als cache v2-52 (9791c0e), te testen op de iPhone.
- Release A+B (stap 2 en 2b: motor, compacte geschiedenis, rust, aanvullen, scènespeler achter Proefonderdelen, Wat is nieuw, reservekopie vóór nieuwe vorm, opslag blijvend, de/het met vorm, 100 basiswoorden na review door een groter model): live sinds 15 november 2026, cache v2-50 (a489e40), gepusht door de ontwerpsessie na eigen controle (overgang vorm 4 naar 6 met gelijke voortgang). Het proefhoofdstuk is in deze stand onzichtbaar.

## IJkmoment G4, groep 1 (19 november 2026, docs/ijkmoment-g4.md): opdrachten voor de bouwsessie

In deze volgorde, na de inspreekhulp:
1. (code) Luistertekst, meelezen en alleen luisteren: keuzes en invulveld pas actief als het afspelen begonnen is; kan er niets klinken (stille stand, geen geluid en geen stem), dan de tekst en de vraag meteen actief. Met een test. **Klaar (v2-88).** lisBind vergrendelt tot de tik op afspelen (dezelfde lock als de examenvorm, die alleen weghaalt wat ze zelf zette; één keer afspelen geldt voor alle vragen bij de tekst); stille stand of geen bestanden en geen stem: tekst en meteen antwoorden. Test: test-luisteren 3b; browser 375 px (bur-2).
2. (lesstof) Schrijversopdracht: de luistervraag gaat over iets wat alleen in het fragment staat, elke afleider pas na het luisteren uit te sluiten; revieweropdracht: te beantwoorden zonder te luisteren? kla-3 en de andere luistervragen van thema 2 daarlangs. **Klaar (v2-88).** Opdrachten aangevuld. Review (sonnet): 12 van 19 luistervragen niet goed (kla-3, afs-3, bur-2); herschreven door de schrijver, tweede review. Open: in bur-2 spreken inleiding en fragment elkaar tegen (wie gooide de fiets om); de inleiding aanpassen vraagt nieuw geluid.
3. (code) Verhoudingstabel en strook met €: bedragen met twee decimalen in beeld (2,50); nakijken gelijk. **Klaar (v2-88).** numFmt(x,eur): een rij of eenheid met € toont 2,50 en 3,00, ook bij het goede antwoord; nakijken ongewijzigd. Test: test-rekenmodellen 5b.
4. (redactie en poort) Vanaf het volgende hoofdstuk: elke rekenscène minstens één rekenmodel, elk hoofdstuk één luistertekst met exam: true in de laatste scène voor de kennisles; de poort meldt het (geen weigering). **Klaar (v2-88).** PC.checkG4, in controleer.mjs als waarschuwing. Uitleg van "laatste scène vóór de kennisles": de laatste scène Nederlands (de rekenscène staat ertussen). Huidige hoofdstukken: klacht en buren missen beide, afspraak heeft het examen in afs-3.
5. Opnemen blijft achter Proefonderdelen tot de telefoontest van de eigenaar goed is; daarna eruit zonder nieuw ijkmoment.

G4 groep 2 volgt na rekenen in stappen en slepen (één bericht aan de ontwerpsessie).

## Open eis: geluid met de stilteschakelaar aan (eigenaar, 15 november 2026)

**De eis, in de woorden van de eigenaar:** "Silent is echt voor telefoon en bericht notificaties. Niet voor geluid in een app." Geluid moet werken met de stilteschakelaar aan. Niet als snelle lap: "Fix het op de juiste manier. Neem dit mee in de breedere ontwikkeling."

**Wat vaststaat (getest op de iPhone van de leerder, iOS met Audio Session API):** het voorlezen van de browser (speechSynthesis) volgt de stilteschakelaar. Drie pogingen (v2-51 geluidje bij de eerste tik; v2-52 stil geluid in een lus; v2-54 geluidje vóór elk voorlezen, plus audiosessie op afspelen) en een test met vier aanpakken op de telefoon: allemaal stil met de schakelaar aan, allemaal hoorbaar zonder. Ook de oude manier (alleen voorlezen) is nu stil; dat het eerder werkte, komt vermoedelijk door iOS. De pogingen zijn weer weggehaald (v2-55): ze hielpen niet en lieten wel muziek uit andere apps pauzeren.

**Wat wel door de schakelaar heen speelt:** een echt geluidsbestand via een audio-element (zoals een video op een website). De goede oplossing is dus voorlezen uit geluidsbestanden, met het voorlezen van de browser alleen als terugval. Omvang nu: ongeveer 1.800 unieke Nederlandse teksten, 75.000 tekens. Sommen met wisselende getallen vragen een eigen oplossing (losse getallen en vaste zinsdelen aan elkaar).

**Voor de ontwerpsessie:** inpassen in het plan (masterplan, werkvormen: opnamen staan al in IndexedDB-ontwerp; redactielijn: bestanden maken bij nieuwe lesstof; offline-cache; grootte; welke stem en snelheid; Thaise steunregel). **Voor de eigenaar:** de keuze voor een spraakdienst (Google, Microsoft, OpenAI) of zelf inspreken, en een sleutel; kosten naar schatting enkele euro's of binnen een gratis laag. Een sleutel komt nooit in de repo of de app.

## Klaar, lokaal gecommit, nog niet gepusht

- Lesstof: 100 basiswoorden (nl-basis), concept stap 1 (kleur per vak) en stap 2 (scènespeler met scène 1 van "bij de dokter").
- Scènespeler voor diepte en diagnose (docs/scenes.md), 14 november 2026: stappen `quiz` (instap, ophalen, controle), `rule` (voorbeeld, dan afbouwende oefeningen) en `extra` (alleen na een tweede fout van dezelfde soort, direct erna); vragen `choose`, `hear`, `type`, `number`; `do` met keuzes; `nosup` (instap en controle altijd zonder steuntaal tot de eerste poging); bronnen bij een leestekst (link met `https`, opent apart); `make` met een vraag en een kader met `___` dat in het invulvak klaarstaat; rekenen en kennis zonder `n` (na scène 5).
- Foutprofiel: elke foute keuze met `err` telt per soort in `S.errs` (recent weegt zwaarder: halveert in 14 dagen; de laatste 8 onderdelen per soort). Een open plek in een scène vult eerst de helft met onderdelen van de vaakste soort fout (vanaf gewicht 2, alleen al geoefende onderdelen), daarna wat aan de beurt is. Instap goed bij de eerste poging: een nieuw woord maakt de grote sprong en het ophalen (en de regel) van dat onderdeel valt weg. De controle bepaalt `S.world.ok[scène]` (beheerst). Opslag: SCHEMA 6 (migratie 5 → 6 voegt `errs` en `world.ok` toe, gooit niets weg).
- `phrase` (vaste zin) is een woord zonder lidwoord; `art: ""` geldt als geen lidwoord.
- De versie van "bij de dokter" uit de redactielijn wordt leidend (besluit eigenaar 14 november 2026); de eigen scènes 2 tot en met 5 van de bouwsessie zijn teruggedraaid. Overnemen zodra de review klaar is.
- Getest in de browser op 375 px met een tijdelijke kopie van `redactie/uit/nl-dokter.json`: scène 1, 2, de rekenscène en de kennisles spelen door; de extra stap komt na de tweede lidwoordfout; foutprofiel en "beheerst" worden bewaard.
- Stap 2 van het masterplan, de rest (docs/ontwerp-stap2.md): elke bestaande oefenvorm als vraag in een scène (`build`, `gap`, `listen`, `money`, `clock`, `discount`; hetzelfde scherm als in de les, een fout telt in het foutprofiel); `hear-type` en `complete`; hint in twee stappen (goed na een hint telt als `'retry'`; niet bij instap, controle en de zwaardere vorm); stap `speak` (voorbeeld om te horen, checklist; opnemen volgt in stap 6); stap `game` met `dehet` (60 seconden, woorden van de scène en wat aan de beurt is, vorm `spel` telt niet voor bloei); de zwaardere vorm (een gespeelde scène opnieuw zonder steuntaal, typen waar een vraag ook `answer` heeft, eigen record in `S.world.best`, in dezelfde migratie 5 → 6). Hoofdstukcontrole `PakketCheck.checkChapter` (A6, B1, B2, C1, C2, E2, E3, G2), gebruikt door de poort en de scènetest. Migratie 5 → 6 getest. Getest in de browser op 375 px: spreken, spel, zwaarder met nieuw record.
- Stap 2 is af als het proefhoofdstuk uit de redactielijn in `content/` staat en de hoofdstukcontrole haalt (de scènetest meldt het nu als "NOG"); dan volgt ijkmoment G1.

## Nacht van 14 op 15 november 2026 (bouwsessie)

De eigenaar sliep; de ontwerpsessie gaf zijn opdracht door om met de aanbevolen keuzes door te werken (docs/werkorder.md). De bouwsessie pusht niet zelf: zij zet een stand klaar en meldt de commit aan de ontwerpsessie, die pusht.

**Besloten (door de ontwerpsessie, met de reden):**
- Rust is geen eindpunt: telt niet als dorst, komt terug als het aan de beurt is (anders loopt de dorst-teller op en wordt vergeten nooit opgemerkt).
- Rust pas na drie goede pogingen op drie dagen met zeven dagen ertussen (spreiding telt, didactisch plan 3.2).
- H4: sommen met nieuwe getallen mogen aanvullen, hooguit een derde; een korte ronde wordt benoemd (nieuwe getallen zijn geen herhaling).
- "pijn aan / pijn in" is één onderdeel (twee onderdelen rekenden elkaars antwoord fout).
- purpose verplicht bij een hoofdstuk, zichtbaar bij begin en slot (masterplan G5).

**Besloten door de bouwsessie (aanbevolen optie):**
- De rem op nieuw laat elke dag twee nieuwe woorden door (H4 "elke dag iets nieuws" ging anders verloren bij veel herhaling).
- Een ronde vult eerst aan met wat echt aan de beurt is, dan pas met nieuw of sommen.
- Een hoofdstuk dat de hoofdstukcontrole niet haalt, staat helemaal buiten de app, ook zijn woorden (codereview B3).

**Besloten door de eigenaar (gisteravond):** zonder reservekopie geen nieuwe vorm wegschrijven (gebouwd); nog één ronde voor het proefhoofdstuk.

**Gebouwd en getest:** codereview stap 2/2b en nareview verwerkt (99154cc, 425126f); rust en H4 volgens besluit (09395f0); schakelaar Proefonderdelen op Ik, standaard uit, de scènes erachter (7b9472c); tolerant typen: geen fout om hoofdletter, accent of trema, behalve in het dictee (425126f). Alle 13 testsuites groen; op 375 px een volle les foutloos; migratie van schema 4 naar 6 in de browser met gelijke voortgang.

**Klaar om uit te brengen: release A = 425126f (cache v2-44).** Gemeld aan de ontwerpsessie.

**Daarna gebouwd:** "Wat is nieuw" na de update, één keer, in de steuntaal (caa18ab; release A mag ook op caa18ab).

**Release B = 76cbd2e (cache v2-46), gemeld aan de ontwerpsessie voor ijkmoment G1:** het proefhoofdstuk "bij de dokter" in de app, achter Proefonderdelen (standaard uit, dus de leerder ziet het pas als die schakelaar aan gaat). Review 4: "goed" (0 blokkerend, 5 klein; redactie/uit/nl-dokter.review4.json). Beslist door de bouwsessie: de gewone les biedt hoofdstukstof niet als nieuw aan, alleen de scènes doen dat (anders kwamen de woorden ook met de schakelaar uit al in de les). Drie scènes gespeeld op 375 px; voortgang en "beheerst" bewaard. Let op: review 3 en 4 zijn door het goedkopere model gedaan (ontwerpsessie: kosten laag houden); docs/automatische-redactie.md vraagt een groter model dan de schrijver; de steekproef bij G1 is de controle daarop.

**Na release B gebouwd en getest (alle tests groen, browser op 375 px):**
- fc54da3: de browser vragen de opslag blijvend te maken (stil) en één keer per maand een herinnering op Vandaag om een kopie van de voortgang te bewaren (aanbeveling 1.1 a en c). Bestaande leerders: de eerste herinnering na een maand.
- 51b77de: een vaste kleur met een vorm voor de (rondje) en het (vierkantje), ook in de terugkoppeling bij typen en luisteren (aanbeveling 10.3).
Deze twee zijn nog niet aan de ontwerpsessie gemeld als releasestand; ze kunnen mee met de volgende.

**Release A nog niet uit (ontwerpsessie):** de onafhankelijke review van content/nl-basis.json (100 woorden) zei "verbeteren": twaalf gatzinnen lieten ook een ander woord uit de lijst toe, vier omschrijvingen gebruikten het woord zelf, zeggen en spreken hadden dezelfde Thaise vertaling. Hersteld door de schrijver; review 2 door een groter model loopt. App: herkennen kiest geen afleider meer met dezelfde vertaling of uit also (63699fc). De opdracht voor de reviewer vraagt nu uitdrukkelijk naar meer dan één goed antwoord.

**Review 2 van nl-basis (groter model): verbeteren**, 18 gatzinnen met een tweede goed antwoord, ook met woorden uit nl-t1 en nl-dokter. Besloten door de bouwsessie: `also` mag naar een woord uit een ander pakket verwijzen (8fd9f27, test bd1a49b); de app telde het al zo, alleen de controle hield het tegen. Herstelronde 3 door de schrijver loopt, daarna review door een groter model.

**15 november, later: herstel geluid live (c6f67db, cache v2-51), gepusht met akkoord van de eigenaar.** Met de stilteschakelaar van de iPhone aan was het voorlezen stil; de eigenaar wil geluid ook dan (wie de telefoon op stil zet, wil geen meldingen, wel de app horen). Afspelen als playback (Audio Session API, iOS 16.4+) en bij de eerste tik een stil geluidje (oudere iOS). Als losse herstelrelease bovenop a489e40, zonder de andere lokale commits. Nog te testen op de iPhone met de schakelaar op stil.

**Besluit ontwerpsessie na drie rondes zonder goed (masterplan, uitleg bij de eisen 16 tot 18), uitgevoerd:** poort weigert een typvraag van meer dan twee woorden (1cea854); knop "Mijn antwoord is ook goed" (04655ba: een fout getypt antwoord telt pas bij Volgende; met de knop telt het niet en gaat het naar een lijst op het toestel, laatste vijftig, op Ik bij Voortgang bewaren; niet bij het dictee en de proefvragen); opdrachten schrijver en reviewer (df0e394). Ronde 9: 21 zin-typvragen omgezet (7 zin bouwen, 3 kort typen, 11 luisteren naar één woord). Review 7 (groter model): 1 blokkerend, in de app (zin bouwen ging uit van het werkwoord op plek 2; een vraag begint met het werkwoord), opgelost in ce22233; nacontrole: goed, 8 klein (redactie/uit/nl-dokter.review7.json). De zes bouwvragen geven nu de situatie in plaats van de volgorde (door de bouwsessie, klein punt uit de nacontrole). **Stand met het proefhoofdstuk zichtbaar achter Proefonderdelen: bbb517a (cache v2-52).** Op 375 px gezien: tegel op Vandaag, label "Wat ken je al?", de knop in een scène, gesprek. De ontwerpsessie heeft geen tokens meer; de controle van de stand deed een ander model (groter model, alleen de code): niets blokkerend, 9 klein; 8 opgelost in cbb9226, het negende (muziek van een andere app pauzeert tijdens het tikken) is de door de eigenaar aanvaarde prijs van geluid met de stilteschakelaar aan. **Klaar om uit te brengen: cbb9226 (cache v2-53)**; volgens de ontwerpsessie hooguit één release per dag, dus op zijn vroegst morgen, met akkoord van de eigenaar. **Telefooncheck na deze release (grote wijziging): docs/controle-bij-release.md, deel 1**; let bij punt 3 en 5 op het geluid met de stilteschakelaar aan, en zet voor het proefhoofdstuk Ik → Proefonderdelen aan. Toets op trucs (deel 2) langs deze stand: nee op alle acht vragen (de knop neemt niets af en telt niet als fout; het proefhoofdstuk staat standaard uit).

**De les voor de lijn:** schrijf vragen zo dat er maar één goed antwoord kán zijn, in plaats van achteraf alle goede antwoorden op te sommen (staat in redactie/opdracht-schrijver.md).

**Vervolgpunt:** in content/nl-t1.json staat een plaatsnaam in een zin; bestaande vaste invulling, hoort bij #7.

**Live: release A+B = a489e40 (cache v2-50), gepusht door de ontwerpsessie.** Daarna lokaal: a605423 (review dokter 5: also ook bij typen vanuit de steuntaal, de vraag van de stap boven een rekenoefening in een scène, in de zwaardere vorm telt keel voor de keel en 45 voor 45 minuten). Proefonderdelen: de keuze op Ik blijft na herladen bewaard (gecontroleerd in de browser); wie de opslag met de hand wijzigt terwijl de app open is, ziet die wijziging overschreven door de app zodra de pagina verborgen wordt (bewust: de app bewaart haar eigen stand).

**nl-basis goed (cb96368, cache v2-50):** ronde 3 door de schrijver, review 3 (3 blokkerend) hersteld, review 4 door een groter model: goed, 0 blokkerend, 3 klein (gatzinnen nacht, drinken, hoofd; volgende ronde). Alle tests groen, app laadt op 375 px zonder fouten. **Klaar om uit te brengen: release A+B = cb96368**, gemeld aan de ontwerpsessie. Bij de dokter staat in deze stand nog onzichtbaar (geen review); ronde 7 is geschreven, review 5 door een groter model loopt.

**G1-punt opgelost (2dcb693):** de voortgang in een scène telt en noemt alleen de delen die de scène heeft ("Stap 1 van 4 · Kijken" tijdens de instap was fout); de instap heet "Wat ken je al?". Getest; in de browser te bekijken zodra een hoofdstuk de poort haalt.

**De ervaring van vannacht:** de poort ving de vorm, de review ving de inhoud; zonder review van een groter model gaat lesstof niet uit.

**Nog te doen uit de kleine voorstellen:** 5, 15 of 30 minuten bij het openen (5.2), de pauzeknop voor het weekdoel (5.3), de steuntaal ook voorgelezen (10.24), een voorstel voor een pauze na een half uur (10.28). Daarna de rest van de werkorder.

**Kleine punten uit review 4, voor een volgende ronde:** een gatzin met meer dan één goed antwoord (dok.morgenniet), drie keuzes als "bijna" die goed Nederlands zijn, de Thaise tijd bij tijd.half, één onnatuurlijke afleider, een onduidelijke reden in de rekenscène.

**Redactielijn:** "bij de dokter" ronde 6 en samenvoegen pijn aan/in klaar (poort 0 fouten); review 4 loopt.

**Blijft liggen:** de migratie op een kopie van een echte opslag (eigenaar levert eventueel aan); de rest van de werkorder volgt.

## Klaar om uit te brengen?

Stand 99154cc, 14 november 2026. **Nog niet.** Gedaan: onafhankelijke codereview van stap 2 en 2b (geen beveiligingsproblemen; veilig tonen en opslag in orde), de fouten eruit verwerkt (A2, A3, B1, B2, B3, B5 en de kleine punten), alle tests groen, browsercontrole op 375 px en migratie 4 → 6 in de browser.
Open voor de release:
- A1 (vraag aan de ontwerpsessie): een onderdeel in rust telt nog als dorst en verloopt nooit; raakt de leerder na ongeveer negen dagen.
- B4 (vraag aan de ontwerpsessie): na de laatste nieuwe woorden vult de ronde geen sommen met nieuwe getallen meer aan.
- B6 (besluit eigenaar, opslag): lukt de reservekopie vóór de migratie niet (bijna volle telefoon), dan schrijft de eerste save() de gemigreerde opslag toch weg, zonder kopie. Bestond al.
- Een kopie van een echte opslag (Ik → Voortgang bewaren) als de eigenaar die wil aanleveren; blijft lokaal.
- Het proefhoofdstuk staat helemaal buiten de app (ook zijn woorden) tot het de hoofdstukcontrole haalt.

## Redactielijn: "bij de dokter" na drie reviews

Review 1 en 2: verbeteren. Review 3 (redactie/uit/nl-dokter.review3.json): **verbeteren**, 2 blokkerend en 11 klein; alle blokkerende fouten van review 2 zijn opgelost. Blokkerend nu: dok.pijnaan en dok.pijnin overlappen (recall en recog kunnen "pijn in" fout rekenen), en de cent-vraag rekent "25 cent" fout (deels de getallenlezer van de app). Na drie rondes zonder "goed" stopt de lijn en gaat het hoofdstuk naar de eigenaar (docs/automatische-redactie.md). Ook nog: purpose ontbreekt.

## Nooit een grind (H2 tot H4) en M12, 14 november 2026

- M12: elke poging staat per onderdeel in `S.items[id].h` als één korte tekenreeks (dagen sinds de vorige poging, vormcode, uitkomst), 24 pogingen en 6 in volle bloei, met `f1`, `na` en `nk` voor wat afvalt; in migratie 5 → 6 (nog niet uitgebracht). F1 (antwoord ontwerpsessie): alle reeksen samen hooguit 300.000 tekens (eerst de oudste pogingen van onderdelen in volle bloei weg, nooit de stand); na drie nagebootste jaren met de reservekopie 1,36 miljoen tekens (grens in de test: 2 miljoen); lukt wegschrijven niet, dan maakt `save()` eerst ruimte in de reeksen, anders één melding, en de bestaande opslag blijft heel. IndexedDB is niet nodig.
- H2: `pickForm` en `chooseEx` kiezen niet de vorm van de vorige poging (ook van een vorige dag); `noSameForm` en `breakTriples` als vangnet. Wat overblijft in de ervaringstest zijn onderdelen met maar één vorm in de lesstof (klanken met alleen luisteren, rekenvaardigheden met alleen één soort som): een lesstoftekort voor de redactielijn (LET OP).
- H3: wat drie keer op rij goed ging bij de eerste poging in drie vormen (`rests`), komt niet meer in Onderweg; wel in scènes (de open plek).
- H4: is alle nieuwe lesstof aangeboden (`stockOut`), dan staat dat op Vandaag en vult de ronde niet aan met sommen die niet aan de beurt zijn.
- De ervaringstest: H2, H3 en H4 nu als FOUT en groen; H1 LET OP tot stap 5. De test rekent met de stem van het toestel (iPhone).
- Hoofdstukcontrole aangescherpt (antwoord ontwerpsessie): een gesprek hooguit zes beurten, een tekst hooguit tien vragen, twee blokken van dezelfde soort niet direct na elkaar, vragen bij een tekst in de nieuwe vorm (met `err`), een luistertekst met vijf tot tien vragen.

## Redactielijn: "bij de dokter"

- Ronde 3 (schrijver, goedkoper model): poort 0 fouten. Review (ander, groter model): **verbeteren**, 3 blokkerend en 26 klein (`redactie/uit/nl-dokter.review.json`). Blokkerend: de regel "pijn aan, niet pijn in" is onjuist; open typvragen in de controle keuren goede antwoorden af; vragen bij lees- en luisterteksten in de oude vorm zonder `err`. Verder o.a. rollen en tijden die niet kloppen, alle de/het-oefeningen met antwoord "de", een kennistekst ver boven A2, labels in de tekening die niet passen, en Thaise tijdsaanduidingen. De kennisles klopt met de bron.
- De poort vangt het derde blokkerende punt nu zelf af. Ronde 4: de schrijver herstelt op de review.

## Stap 2b: de motor langs het didactisch plan

De stand per eis M1 tot M12 (wat er is, wat ontbreekt) staat in `docs/ontwerp-stap2b.md`. Kort: M1 en M2 bestaan; M3, M4, M7, M9, M11 en M12 deels; M5, M6, M8 en M10 nieuw. Alle waarden van de motor staan nu op één plek (`MOTOR` in `index.html`) met bron of "aanname"; `test-herhaal` bewaakt dat, en de les van `test-les` is ongewijzigd. Volgende bouw: M12 (reeks pogingen per onderdeel), M5 (trede per regel), M6 (vier strengen), M10 (na `docs/eindtermen.md`); drie vragen aan de ontwerpsessie staan onderaan het ontwerp.

## Afstemming redactielijn en app (voor de schrijversopdracht)

`redactie/controleer.mjs` draait nu ook `pakketcheck.js` tegen de ingebouwde pakketten: wat de app weigert, keurt de lijn af. De schrijversopdracht moet daarom overnemen:

1. Bovenaan het pakket: `type: "hoofdstuk"`, `version`, `order` (getal; de dokter: 30) en `requires` (de pakketten waarvan het items gebruikt, bijvoorbeeld `nl-t1`, `nl-basis`, `rk-1`).
2. Elk woord en elke vaste zin (`phrase`) heeft `gap`: een zin met precies één `___`, die niet met het gat begint en met een leesteken eindigt. Bij een woord met lidwoord staat het lidwoord zichtbaar vóór het gat (`De ___ is vol.`), of `askArt: true` als de leerder het lidwoord moet typen. De app gebruikt `gap` voor de oefening "vul in".
3. `art` is `de`, `het`, of weglaten (leeg mag ook); een `phrase` heeft geen lidwoord.
4. Elke vraag bij een lees- of luistertekst heeft `why`, ook in de oude vorm (`q`, `o`, `a`).
5. Een stap `explain` verwijst naar een uitleg die bestaat (`content/uitleg-*.json`); anders slaat de speler hem stil over.
6. Bronnen: `{ "url": "https://…", "title": "…" }`.
7. De hoofdstukcontrole (`checkChapter`, ook in de poort): per scène minstens zes werkvormen en nooit drie keer dezelfde vorm achter elkaar (een gesprek en een lees- of luistertekst tellen als één blok); per hoofdstuk minstens twaalf werkvormen, een leestekst met vijf tot tien vragen, een luistertekst (stap `listen`), een stap `speak`, een stap `game` (nu alleen `kind: "dehet"`), schrijven (`make`) en rekenen in de situatie; `goals` bij het hoofdstuk en elke scène Nederlands; een hint in twee stappen bij elke typvraag (`type`, `hear-type`, `complete`) behalve in instap en controle; een `err` bij elke foute keuze; een `extra` in elke scène met een `rule`.
8. Vormen die nog niet in een scène kunnen (stap 6): `own`, `match`, `spot`, `dictee`, `mc`. De controle weigert ze.
9. Voor de zwaardere vorm (B4): geef een keuzevraag waar dat kan ook een `answer`, dan wordt het in de zwaardere vorm een typvraag.

Opmerking na het spelen: de leestekst van de kennisles is lang en staat bij elke vraag opnieuw boven in beeld; op 375 px moet de leerder ver scrollen. Korter, of in twee delen met elk eigen vragen.

Nog niet gebouwd uit "Diepte en diagnose": de hoofdstuktoets met de uitkomst door, gericht extra of sneller; het foutprofiel op het scherm van de begeleider (hoort bij docs/aanvoer-en-begeleider.md); de schatting van de route bijstellen.

## Dekking van de lesstof (bijgewerkt 14 november 2026)

Wat er is, naast wat het kwaliteitskader en de leerroute vragen. Bepaalt de volgende stap: een motor zonder lesstof levert herhaling op, geen leren.

| Lijn | Onderdeel | Er is | Gevraagd | Dekking |
|---|---|---|---|---|
| Nederlands thema 1 | Woorden | 18 (zonder Nederlandse omschrijving) | ±75 met lidwoord, omschrijving en eigen voorbeeldzin | ±25% |
| | Teksten (cycli) | 1 verhaal (2 teksten), los van de les | 2 tot 3 cycli rond een eigen tekst | ±10% |
| | Grammatica | 2 punten (plek twee, hebben), alleen gesloten | de punten van het thema in 3 treden (o.a. verleden tijd, inversie) | ±15% |
| | Uitspraak | 3 klankparen, 9 oefeningen | knelpunten van de moedertaal als eigen lijn | begin |
| | Luisteren | 1 dictee, klankoefeningen | minstens 1 luistertekst met vragen | 0% |
| | Schrijven | spraakdagboek | 3 treden met schrijfkader | 0% |
| | Spreken | gesprekskaart aan tafel | spreeksituaties, opnemen en terugluisteren | ±5% |
| | Taalfuncties | 0 | kaders met standaardzinnen | 0% |
| | Afsluitende mix | 0 | mix die 70% van de doelwoorden raakt | 0% |
| Nederlands woordenschat | Frequentielijst | 100 basiswoorden (nl-basis): 50 zelfstandige naamwoorden, 30 werkwoorden, 20 bijvoeglijke naamwoorden en tijdwoorden, met omschrijving | ±8 per lesdag, op weg naar 3.000–5.000 (B1) | ±3% van B1 |
| Rekenen | Onderwerpen R1–R4 | 5 vaardigheden (geld, komma, klok, 10%, 25%), 11 oefeningen, wisselende getallen | R1 tot R4 volledig (±20 onderwerpen) | ±25% |
| | Uitleg | 17 uitleggen | per onderwerp | ±60% voor R1–R2 |
| Engels | Woorden en regels | 8 woorden, 1 regel, 1 klank, 8 oefeningen | route tot A2 | ±5% |
| Uitleg | Totaal | 32 (rekenen 17, Nederlands 11, Engels 4) | catalogus R1–R4, thema 1–3, Engels A2 | ±35% |
| Kwaliteit | Meldingen pakketcontrole | 115 open | 0 | – |

De ervaringstest (`node tools/test-ervaring.mjs --streng`): met thema 1 en de 100 basiswoorden is de nieuwe lesstof bij 16 per dag na 6 dagen op; gemiddeld 8,4 verschillende onderdelen per ronde.

## Leidend plan

docs/didactisch-plan.md is het fundament (leeruitkomsten per jaar, leerweg, onderbouwing met bronnen, eisen M1 tot M12 aan de motor). docs/masterplan.md (14 november 2026): de eisen die onverminderd gelden, de catalogus van werkvormen, de stappen 1 tot 13 met wie bouwt en wanneer iets klaar is, en de ijkmomenten G1 tot G5 van de ontwerpsessie. De volgorde daar vervangt de volgorde hieronder en die in docs/bouwplan.md en docs/plan-herzien.md.

## Dekking per eindterm (G2)

<!-- dekking -->
| Eindterm | Scènes | Vragen | In examenvorm | Toetsvragen |
|---|---|---|---|---|
| kennis-aardrijkskunde | 1 | 9 | 0 | 0 |
| kennis-geschiedenis | 2 | 19 | 0 | 0 |
| kennis-maatschappij | 2 | 16 | 0 | 0 |
| kennis-nederland | 39 | 348 | 0 | 14 |
| nt2-I-lezen-1 | 3 | 72 | 0 | 6 |
| nt2-I-lezen-2 | 8 | 74 | 0 | 4 |
| nt2-I-lezen-3 | 8 | 146 | 0 | 12 |
| nt2-I-lezen-4 | 46 | 524 | 0 | 22 |
| nt2-I-lezen-5 | 0 | 0 | 0 | 0 |
| nt2-I-luisteren-1 | 14 | 377 | 6 | 28 |
| nt2-I-luisteren-2 | 4 | 110 | 6 | 8 |
| nt2-I-schrijven-1 | 17 | 472 | 0 | 34 |
| nt2-I-schrijven-2 | 0 | 0 | 0 | 0 |
| nt2-I-schrijven-3 | 0 | 0 | 0 | 0 |
| nt2-I-spreken-1 | 20 | 539 | 0 | 40 |
| nt2-I-spreken-2 | 7 | 165 | 0 | 14 |
| nt2-I-spreken-3 | 1 | 27 | 0 | 2 |
| rekenen-2-grootheden | 3 | 67 | 0 | 6 |
| rekenen-2-informatie | 4 | 86 | 0 | 8 |
| rekenen-2-procenten | 1 | 22 | 0 | 2 |
| rekenen-2-ruimte | 1 | 24 | 0 | 2 |
| rekenen-2-verhoudingen | 3 | 59 | 0 | 6 |
| rekenen-4-procenten | 0 | 0 | 0 | 0 |
| rekenen-steun | 6 | 121 | 0 | 12 |

Geteld door `node tools/dekking.mjs` op 2026-11-18. Toetsvragen = controlevragen aan het eind van een scène; de themaoefentoets volgt in stap 10.
<!-- /dekking -->

## Open punten per stap van de werkorder

- **Stap 10 (toetsen die bijsturen):** de bijstelling na een afgerond blok (`RC.adjusted`, `S.blockAdj` per baan) gaat werken zodra een blok als af gemarkeerd wordt. De factor geldt dan alleen voor de blokken ná het afgeronde blok (codereview route 9, akkoord ontwerpsessie 15 november 2026).

## Open besluiten voor de eigenaar

- Nieuw concept (kaart, scènes, album): docs/concept-leerwereld.md. Richting goedgekeurd op 14 november 2026; vier besluiten staan onderaan dat ontwerp. Akkoord op alle vier (14 november 2026): stap 1 en 2 mogen gebouwd worden; formaat en tekencatalogus in docs/scenes.md, `scene.js` en docs/voorbeeld-scene.json. Pushen en stap 4 blijven een apart akkoord.
- Route met tijd en een verwachte examendatum: docs/route-en-prognose.md. Akkoord op de vier besluiten (14 november 2026); bouwen na de scènespeler.
- Scherm van de begeleider: docs/aanvoer-en-begeleider.md, deel 2. Akkoord (14 november 2026): in één keer, na de scènespeler; eerst de widget, dan de app.
- Automatische redactie (lesstof, fout melden met punten, vragen van de leerder, wie doet wat): docs/automatische-redactie.md, werkbestanden in redactie/. Richting akkoord; de proef met het hoofdstuk "bij de dokter" loopt. Voor de bouwsessie volgt hieruit: lesstof los van de code (content/index.json) en redactie/uitbrengen. Zelf uitbrengen door de lijn gaat pas in als de regel in CLAUDE.md staat.
- Wereld en kennis: geen vast stramien per stroming; één specifieke vraag per les (docs/concept-leerwereld.md).

- Herzien plan na gebruik: docs/plan-herzien.md (sporen A tot F, zes open besluiten). Onderzoek: docs/onderzoek-beloning.md.

- Test op de telefoon: een volle les, "luister en schrijf op" met echte stem, een tweede ronde op dezelfde dag, en de Engelse les op dinsdag of donderdag. Daarna #28 en #29 sluiten (alleen met akkoord).

## Volgorde

1. Uitlegcatalogus, per groep: wat de huidige oefeningen raken (klaar), dan rekenen R1 t/m R4, dan grammatica en leestekens van thema 1 t/m 3, dan Engels tot A2. Rekenen volgt strook of getallenlijn, dan tabel, dan de kale som.
2. Fase 3, het herhaalmodel (`docs/herhaalmodel.md`): akkoord 13 november 2026, bouw loopt (8 stappen). Stap 1 klaar: herhaalitems voor alle soorten, doelitem, gespreid ophalen, migratie 3 → 4. Stap 2 klaar: luisteren en typen (NL, EN), Engels herkennen, vorm kiezen die het woord nog mist. Stap 3 klaar: sommen die niet opraken (geld, klok, korting met wisselende getallen). Stap 4 klaar: eis voor bloei per soort. Stap 5 klaar: de les kiest wat bijna vergeten is (oefenen per onderdeel, uitleg vóór iets nieuws, afbouwend kortingsvoorbeeld, afwisseling, korte latere rondes), plus oefeningen zodat elk onderdeel kan bloeien. Stap 6 klaar: bijsturen binnen een ronde, hardnekkige onderdelen, uitleg in de tuin. Stap 7 klaar: de startmeting zet basisonderdelen bij een hoge score als plantje; lage woordscore geeft minder nieuwe woorden. Stap 8: review door de ontwerpsessie; vijf punten opgelost (volle bloei komt terug, wachttijd vanaf de laatste poging, bij-items zonder vorm, bijsturen ook voor regels en sommen, service worker bewaart alleen geslaagde antwoorden), de zesde (langere startmeting) staat bij fase 9. Volgt: eindcontrole in de browser, ook de Engelse les, dan release met akkoord.
3. Lesstof thema 2 volgens het kwaliteitskader.
4. Daarna pas spellen en vormgeving.

## Wachtlijst (niet nu bouwen)

- Knop "vertaling klopt niet" bij elke steunregel, zodat de leerder een fout in de vertaling meldt aan de begeleider.
- Spellen (fase 8).
- Vormgeving en animaties (fase 7).
- Nieuwe wensen van de eigenaar.
