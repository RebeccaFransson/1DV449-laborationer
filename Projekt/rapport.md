# Inledning
Först ville jag egentligen skapa en applikation som hade en karta från google-maps då den var så rolig att arbeta mot. Jag såg också så många möjligheter med det APIet. Dock bestämde jag ändå mig för att göra något som jag hoppades på att vara ganska unikt.
I min applikation kan användaren skriva in ett användarnamn som den vill söka upp. Användarnamnet kollas sedan mot de olika APIerna och användaren får en lista presenterad för sig. I listan står det om användarnamnet är ledigt eller inte på den specifika tredje-parts applikationen. I listan presenteras också en knapp som antingen låter användaren gå till tredje-parts applikationens inloggingssida för att skapa ett konto. Eller om användarnamnet redan var upptaget så tar knappen användaren till tredje-parts applikationens profilsida för den användare med det användarnamnet som min användare skrivit in.
Så min applikation är till för att en användare både skall kunna söka vilka användarnamn som är lediga och leta upp användare på olika tredje-parts applikationer.

Det finns en liknande applikation som heter "Namechk.com". Denna applikation stödjer många fler tredje.parts applikationer än min applikation. Men den låter inte användaren kolla upp olika användares profiler på dessa applikationer

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
I applikationen valde jag att ta hjälp utav ett bibliotek som jag har haft ögonen på ett tag, Offline.js. Detta bibliotek hjälper mig att hålla koll på när användaren förloar uppkopplingen. Den meddelar också mina användare på ett smart och snyggt vis.
Den fungerar på så sätt att den fångar AJAX-anrop och på så sätt kan se när användaren förlorat uppkopplingen eller när min server gått ned.
Offline.js var väldigt enkelt och använda och jag tyckte det täckte allt som har med offline-first att göra.

# Säkerhet
Då applikationen har ett input-fält har jag satsat på att förhindra "cross site scripting". Detta genom att använda sig utav mycket validering på klienten. När applikationen sedan presenterar användarens inmatade användarnamn så använder den utav textContent istället för innerHTML för att försäkra sig om att texten inte kan tolkas som HTML utav webbläsaren. Applikationen validerar indata och filtrerar utdata för att förebygga mot xss-attacker.
#### SKRIV!!!! *CSRF*
förhindra CSRF genom token pattern

# Risker
Risken med sådana här applikationer är att dem förlitar sig på tredje-parts applikationerna för att fungera.
Om någon utav APIerna skulle ändras eller tas ned så orskar det funktionalitets-brister i min applikation. Som tur är meddelas användaren om detta skulle hända.
Då applikationen bara berstår utav en input-ruta har jag försökt att göra den så säker som möjligt! Genom att se till att inga taggar kan skrivas in, därmed förhindrat XSS-attacker.

#### SKRIV!!!! *CSRF*
Egentligen itne så jättelönt i min applikation men valde att göra det för att jag ville ha kunskapen om hur man utför ett syncronized token pattern

# Felhantering
meddelar användaren när den gjort fel och hjälper till att rätta till det och när uppkopplingen tappas
Felhantering för användaren är en viktig funktionalitet i min applikation för att underlätta för användaren så mycket som möjligt.
Applikationen kollar om input-fältet är tomt, om den innehåller html-taggar och om det finns mellanrum mellan bokstäverna. När något av dessa fall inträffar presenterar applikationen ett felmeddelande
Applikationen meddelar också användaren ifall något utav tredje-parts applikationerna skulle gå ned eller om requestet till APIerna skulle ge en dålig responskod.
Applikationen meddelar också användaren, m.h.a. Offline.js, om den skulle tappa uppkopplingen eller applikationens server skulle gå ned.

# Cachade lösningar
Applikationen går inte att använda offline. Eftersom detta inte går lades en annan cach-funktionallitet till. Användaren har istället möjlighet att gå tillbaka till applikationen med den sparade datan efter den besökt en utav länkarna som applikationen presenterar. Den sparade datan är då användarnamnet användaren sökte på sist. På så sätt kan användaren besöka en profil hos en tredje-parts applikation, gå tillbaka till huvudapplikationen och fortsätta besöka dem andra länkarna utan att behöva göra en ny sökning(Som hade begärt att servern skickade anrop till APIerna igen).

Jag valde att använda mig utav LocalStorage istället för SessionStorgae. Detta för att underlätta ännu mer för användaren och minska anrpoen till tredje-parts applikationerna. På så sätt om användaren stängt ner webbläsar-fönstret och vill ta upp applikationen igen för att se vad den sist sökte på, så slipper servern göra extra anrop till APIerna och användaren får snabbt svar på vad den sökte på sist.

# Prestandaoptimering
Ingen kod skriv två ggr.
Appliaktionen behöver inte fråga apierna om data igen om användaren har gått tillbaka till applikationen efter att ha besökt en annan sida

# Reflektioner
# Betygshöjande motivation
lätt att lägga till fler apierna
enkelt att bygga ut
mycket validering - säker
