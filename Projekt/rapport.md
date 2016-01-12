# Inledning
Först ville jag egentligen skapa en applikation som hade en karta från google-maps då den var så rolig att arbeta mot. Jag såg också så många möjligheter med det APIet. Dock bestämde jag ändå mig för att göra något som jag hoppades på att vara ganska unikt.
I min applikation kan användaren skriva in ett användarnamn som den vill söka upp. Användarnamnet kollas sedan mot de olika APIerna och användaren får en lista presenterad för sig. I listan står det om användarnamnet är ledigteller inte på den specifika tredje-parts applikationen. I listan presenteras också en knapp som antingen låter användaren gå till tredje-parts applikationens inloggingssida för att skapa ett konto. Eller om användarnamnet redan var upptaget så tar knappen användaren till tredje-parts applikationens profilsida för den användare med det användarnamnet som min användare skrivit in.
Så min applikation är till för att en användare både skall kunna söka vilka användarnamn som är lediga och leta upp användare på olika tredje-parts applikationer.

Det finns en liknande applikation som heter "Namechk.com". Denna appliktion stödjer många fler tredje.parts applikationer än min applikation. Men den låter inte användaren kolla upp olika användares profiler på dessa appliktioner.

#### Tekniker
Jag valde att använda mig utav node.js på servern då jag tycker det är roligt och gärna vill lära mig mer om det!
###### Servern
* Node.js
* Express (npm) - Hjälper mig organisera mitt projekt("Routes", "requests" och vyer)
* Request (npm) - Underlättar anrop till tredje-parts applikationer
* Twitter (npm) - Underlättar anropet till twitters API och håller reda på access-tokens.

###### Klienten
* Javascript
* JQuery ajax (biblotek)
* Offline.js (biblotek)

# Offline först
Jag valde att ta hjälp utav ett biblotekt som jag har haft ögonen på ett tag, Offline.js. Detta biblotek hjälper mig att hålla koll på när jag förloar uppkopplingen. Den meddelar också mina användare på ett smart och snyggt vis.
Den fungerar på det viset att den fångar AJAX-anrop och på så sätt kan se när användaren förlorat uppkopplingen eller när min server gått ned.
Offline.js var väldigt enkelt och använda och jag tyckte det täckte allt som har med offline-first att göra.

# Säkerhet
ingen xss, textContent(istllet för innerhtml) när jag skriver ut saker
mycket validering på klienten innan den skcikas vidare
# Risker
Risken med sådana här applikatoner är att dem förlitar sig på tredje-parts appliktionerna för att fungera.
Om någon utav APIerna skulle ändras eller tas ned så orskar det funktionellitets-brister i min applikation. Som tur är meddelas användaren om detta skulle hända.
Då min appliktion bara berstår utav en input-ruta har jag försökt att göra den så säker som möjligt! Jag har sett till att inga taggar kan skrivas in, därmed förhindrat XSS-attacker.

#### SKRIV!!!! *CSRF*
Egentligen itne så jättelönt i min applikation men valde att göra det för att jag ville ha kunskapen om hur man utför ett syncronized token pattern

# Felhantering
meddelar användaren när den gjort fel och hjälper till att rätta till det och när uppkopplingen tappas
Felhantering för användaren är en viktig funktionallitet i min applikation för att underlätta för användaren så mycket som möjligt.
Appliktionen kollar om input-fältet är tomt, om den innehåller html-taggar och om det finns mellanrum mellan bokstäverna. När något av dessa fall inträffar presenterar applikationen ett felmeddelande
Applikationen meddelar också användaren ifall något utav tredje-parts applikationerna skulle gå ned eller om requestet till APIerna skulle ge en dålig responskod.
Applikationen meddelar också användaren, mha Offline.js, om den skulle tappa uppkopplingen eller applikationens server skulle gå ned.

# Chachade lösningar
applikationen går ej att använda offline. men jag tänkte att användaren iallfall skall ha möjlighet att besöka siderna som applikationen presenterar och sedan kunna gå tillbaka till min applikationen och kunna kolla vidare på de andra länkarna
# Optimering
Ingen kod skriv två ggr.
Appliaktionen behöver inte fråga apierna om data igen om användaren har gått tillbaka till applikationen efter att ha besökt en annan sida
# Reflektioner
# Betygshöjande motivation
lätt att lägga till fler apierna
enkelt att bygga ut
mycket validering - säker
