# Inledning
Först ville jag egentligen skapa en applikation som hade en karta från google-maps då den var så rolig att arbeta mot. Jag såg också så många möjligheter med det APIet. Dock bestämde jag ändå mig för att göra något som jag hoppades på att vara ganska unikt.
I min applikation kan användaren skriva in ett användarnamn som den vill söka upp. Användarnamnet kollas sedan mot olika APIer och användaren får en lista presenterad för sig. I listan står det om användarnamnet är ledigt eller upptaget på den specifika tredje-parts applikationen. I listan presenteras också en knapp som låter användaren gå till tredje-parts applikationens inloggingssida för att skapa ett konto. Eller om användarnamnet redan var upptaget så tar knappen användaren till tredje-parts applikationens profilsida för den användare med det användarnamnet som min användare skrivit in.
Så min applikation är till för att en användare både skall kunna söka vilka användarnamn som är lediga och leta upp användare på olika tredje-parts applikationer.

Det finns en liknande applikation som heter [namechk](https://namechk.com/). Denna applikation stödjer många fler tredje-parts applikationer än min applikation. Men den låter inte användaren kolla upp olika användares profiler på dess tredje-parts applikationer.

### [Inspelad video](https://www.youtube.com/watch?v=1Ev-8ArtLuE)

#### Tekniker
Jag valde att använda mig utav node.js på servern då jag tycker det är roligt och gärna vill lära mig mer om det!
###### Servern
* Node.js
* Express (npm) - Hjälper mig organisera mitt projekt("Routes", "requests" och vyer)
* Request (npm) - Underlättar anrop till tredje-parts applikationer
* Twitter (npm) - Underlättar anropet till twitters API och håller reda på access-tokens.
* Promises - Hjälper till att avvakta ett svar innan data skickas till klienten

###### Klienten
* Javascript
* JQuery ajax (biblotek)
* Offline.js (biblotek)

![SchematiskBild](https://github.com/RebeccaFransson/rf222cz-1DV449-laborationer/blob/master/Projekt/SchematiskBild.png?raw=true)


# Offline först
I applikationen valde jag att ta hjälp utav ett bibliotek som jag har haft ögonen på ett tag, [Offline.js](http://github.hubspot.com/offline/docs/welcome/). Detta bibliotek hjälper mig att hålla koll på när användaren förloar uppkopplingen. Den meddelar också mina användare på ett smart och snyggt vis.
Den fungerar på så sätt att den fångar AJAX-anrop och på så sätt kan se när användaren förlorat uppkopplingen eller när min server gått ned.

Offline.js var väldigt enkelt och snyggt och använda, jag tyckte det täckte allt som har med offline-first att göra. Den meddelar användaren när den tappat uppkopplingen och presenterar också att den väntar på återuppkoppling. Samma presentation uppstår för användaren när min server gått ned.

Då min applikation inte fugnerar offline har jag valt att cacha-data för andra andledningar, läs under rubriken "Cachade lösningar". Men eftersom lite data ändå är cachat kan användaren fortfarande se vilket användarnamn den senast sökt på.

# Säkerhet
Då applikationen har ett input-fält har jag satsat på att förhindra "cross site scripting"[1]. Detta genom att använda sig utav mycket validering på klienten. När applikationen sedan presenterar användarens inmatade användarnamn så använder den utav textContent istället för innerHTML för att försäkra sig om att texten inte kan tolkas som HTML utav webbläsaren. Applikationen validerar indata och filtrerar utdata för att förebygga mot xss-attacker.

Jag hade också kunnat förebygga mot CSRF-attacker med ett syncronized token pattern, men då min applikation inte har någon inlogging och inget "hemligt" används i applikationen struntade jag i detta extra arbetet.[2]

# Risker
Risken med sådana här applikationer är att dem förlitar sig på tredje-parts applikationerna för att fungera.
Om någon utav APIerna skulle ändras eller tas ned så orskar det funktionalitets-brister i min applikation. Som tur är meddelas användaren om detta skulle hända.

Då applikationen bara berstår utav en input-ruta har jag försökt att göra den så säker som möjligt! Genom att se till att inga taggar kan skrivas in, därmed förhindrat XSS-attacker.
Dock kände jag att det inte var lönt att försöka förbygga mot CSRF-attacker.

# Felhantering
Felhantering för användaren är en viktig funktionalitet i min applikation för att underlätta för användaren så mycket som möjligt.
Applikationen kollar om input-fältet är tomt, om den innehåller html-taggar och om det finns mellanrum mellan bokstäverna. När något av dessa fall inträffar presenterar applikationen ett felmeddelande.[3]

Applikationen meddelar också användaren ifall något utav tredje-parts applikationerna skulle gå ned eller om requestet till APIerna skulle ge en dålig responskod.
Applikationen meddelar också användaren, m.h.a. Offline.js, om den skulle tappa uppkopplingen eller applikationens server skulle gå ned.[3]

# Cachade lösningar
Applikationen går inte att använda offline. Eftersom detta inte går lades en annan cach-funktionallitet till. Användaren har istället möjlighet att gå tillbaka till applikationen med den sparade datan efter den besökt en utav länkarna som applikationen presenterar. Den sparade datan är då användarnamnet användaren sökte på sist. På så sätt kan användaren besöka en profil hos en tredje-parts applikation, gå tillbaka till huvudapplikationen och fortsätta besöka dem andra länkarna utan att behöva göra en ny sökning(Som hade begärt att servern skickade anrop till APIerna igen).[4] [5]

Jag valde att använda mig utav LocalStorage istället för SessionStorgae. Detta för att underlätta ännu mer för användaren och minska anropen till tredje-parts applikationerna På så sätt om användaren stängt ner webbläsar-fönstret och vill ta upp applikationen igen för att se vad den sist sökte på, så slipper servern göra extra anrop till APIerna och användaren får snabbt svar på vad den sökte på sist.

# Prestandaoptimering
Appliaktionens CSS-filer länkas in längst upp i HTML-filen. Scripten som länkas in i applikationen  länkas in i slutet, detta för att optimera renderingen utav applikationen för att renderingen utav sidan stannar upp när den läser in ett script. [6]

Med hjälp utav cach-lösnignen jag kunnat minska applikationens anrop till tredje-parts applikationerna.

Kod relaterat finns det ingen duplicerad kod.

Jag kollade också hur snabb min applikation är på "[Pingdom Website Speed test](http://tools.pingdom.com/fpt/)". Dock är min appliktion inte så stor så det var rätt enkelt att få den rätt snabb. Såklart gör dessa prestanda optimeringar större skillnad vid större applikationer.

Jag valde dock att inte göra någon minimalisering på all min kod då det inte är mycket kod som ligger bakom min applikation. Men jag provade [CSS minifier](cssminifier.com) på min CSS-kod. Annars hade det varit det varit en bra ide att låta all kod gå igenom en "Minification". På så sätt förminskas koden och går snabbare för webbläsaren att läsa. Det är en bra ide att göra på större projekt, där denna optimering gör större skillnad. [7]

Applikationen använder sig inte heller utav något font-ramverk vilket också ökar prestandan.

# Reflektioner
Projektet har gått väldigt bra, dock har jag haft en till tuff kurs vid sidan om denna kursen. Det har resulterat i att jag kunnat lägga ner den tiden som jag egentligen ville på detta projekt. Dem problemen jag stött på har varit några fundering på hur jag skulle lösa offline-first och cachningar. Twitter krävde en hel del läsning kring deras API men jag tog hjälp utav ett npm som förenklade anropen till APIet.

Man ser också på mina commits på github att jag började använda socket.io som en bra kommunikation mellan klient och server. Men kom senare på att den är gjort till real-tids-applikationer och fungerar inte på denna applikationen som jag tänkte programmera. Använde mig istället utav en AJAX-förfrågan till servern. Läste samtidigt lite om Promises och insåg att det var en väldigt bra ide att använda så att servern hann hämta all data från APIerna innan den skickade tillbaka datan till klienten.

Jag har helt klart velat implementera fler anrop till flera olika APIer. På så sätt skulle min applikation kanske inte bli mer avancerad, för det är den inte. Men applikationen skulle få mer funktionalitet och därmed också bli något större. När ett användarnamn är ledigt kommer det upp en länk där man kan registrera sig på tredje-parts applikationen. Denna länk hade jag velat utveckla och på något sätt skicka med det inskriva användarnamnet till en registrerings-sida så användaren redan påbörjat registeringen när den går ifrån min applikation. Jag hade också gärna velat förbättra implementeringen utav det som applikationen får tillbaka från APIet. Om man tillexempel får tillbaka något som är null, så skall applikationen kolla så att det inte skrivs ut "null" för användaren

Jag hade gärna velat arbeta vidare med min applikation så den blir lika stor som [namechk](https://namechk.com/) - fast på min applikation skall användaren ha möjlighet att kunna gå in på de upptagna användarnamnens profiler. Men den sådan applikation hade en användare kunnat kolla upp andras användarnamn på flera olika tredje-parts applikationer.

Jag vill såklart också jobba vidare på utseendet på applikationen.

# Betygshöjande motivation
Jag ska inte ljuga, min applikation är inte så stor eller avancerad. Men det är mycket enkelt att bygga ut. Då allt på klienten är responsiv så är allt som behövs fler anrop till fler tredje-pars applikationer.

Applikationen är också väldigt säker och enkelt att hålla säker då det inte krävs någon sorts inloggning eller liknande.

Applikationen är också väldigt enkelt för användare att använda och ser trevlig ut.
Användaren blir också meddelad om något gått fel(inmatningen utav ett användarnamn, tappat uppkoppplingen eller när något dåligt har hänt på tredje-parts applikationerna).

# Referenser

1. The Open Web Application Security Project, "OWASP Periodic Table of Vulnerabilities", "www.owasp.org", 15 November 2013, Tillgänglig: [Cross Site Scripting](https://www.owasp.org/index.php/OWASP_Periodic_Table_of_Vulnerabilities_-_Cross-Site_Scripting_(XSS)).

2. The Open Web Application Security Project, "OWASP Periodic Table of Vulnerabilities", "www.owasp.org", 15 November 2013, Tillgänglig: [Cross Site Scripting](https://www.owasp.org/index.php/OWASP_Periodic_Table_of_Vulnerabilities_-_Cross-Site_Request_Forgery).

3. "A field guide to static apps", "Front-End Error Handling",  "staticapps.org", publicerings-datum ej känt, Tillgänglig: [Error Handling](https://staticapps.org/articles/front-end-error-handling/).

4. Kalid Azad, "How To Optimize Your Site With HTTP Caching", "betterexplained.com/", publicerings-datum ej känt, Tillgänglig: [How To Optimize Your Site With HTTP Caching](http://betterexplained.com/articles/how-to-optimize-your-site-with-http-caching/).

5. Ilya Grigorik, "HTTP caching", "developers.google.com/", publicerings-datum ej känt, Tillgänglig:  [HTTP caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=en).

6. "FRONT END OPTIMIZATION (FEO)", "Akamai", publicerings-datum ej känt, Tillgänglig: [Font end optimazation](https://www.akamai.com/us/en/resources/front-end-optimization-feo.jsp).

7. "Best Practices for speeding up your website", yahoo developers, publicerings-datum ej känt, Tillgänglig: [Minimize](https://developer.yahoo.com/performance/rules.html#Minimize=)
