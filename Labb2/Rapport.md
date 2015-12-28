_Rebecca Fransson_
_rf222cz_


# Säkerhetsproblem
### CSRF
_Teori_
I denna applikationen kan en icke befogande användare göra en http request från en annan webbplats och använda sig utav den inloggade användarens kaka för att identifiera sig som en inloggad användare. Detta kallas CSRF.
CSRF kan gå till så att en icke befogande användare använder sig utav en tredje-part webbplats(tex en chatt) för att lura en användare att klicka på tex en bild som innehåller elaka requests till andra webbplatser. [1] [2]

_Konsekvenser_
Eftersom dessa request skickas från användaren webbläsare kan den ickebefogade användaren komma åt tex användaren kaka som är sparad i webbläsaren. På så sätt kan den ickebefogande användaren göra request med en annan identitet.
Dessa requesten kan tex ändra användaren personliga information på en inloggnings-sida eller (med en osäker bank-sida) göra request att över pengar till den icke befogande användaren.[1] [2]

_Åtgärder_
CSRF-attacker skyddar man sin webbplats mot genom att använda ett "syncronized token pattern".
Detta mönsker går till så att man skickar med ett token som skickas med vid en ny request(tex ett formlär), på så sätt kan man se att requestet faktiskt kommer från den rätta webbplatsen och inte ett elakt request från en annan webbplats.[1] [2]

### Kakan förstörs ej vid utlogging
_Teori_
Kakan förstörs inte när användaren har loggat ut, detta gör att en icke befogad användare har längre tid på sig att hijacka en användaren.

_Konsekvenser_
På grund av att kakan ej förstörs vid utloggning kan en icke befogande användare som har kommit åt kakan genom tex en CSRF-attack fortsätta vara inloggad, fast användaren som kakan tillhör har loggat ut.
När den icke befogade användaren fått tag på en kaka kan denna också komma åt meddelanden genom att skriva /messages i urlen.[1]

_Åtgärder_
Skriv kod så att kakan förstörs vid utlogging.

### Sql-injections
_Teori_

I denna applikationen kan en användare skriva in en sql-fråga så att den passar sql-frågan som ställs vid inloggning. På så sätt kan den manipulera frågan och få ett helt annorlunda svar. Tex vid inloggning skriver  användaren frågan “om 1 är lika med 1 låt mig logga in”.[3]


_Konsekvenser_

På detta sätt kan användaren logga in utan att veta lösenordet till kontot.
Den kan också se, ändra eller förstöra innehållet i databasen.


_Åtgärder_

Programmeren kan använda sig utav lagrade procedurer och inte en query.
Eller kan programmeraren kommunicera med ett API som ger programmeraren information istället för att direkt kommunicera med databasen.[4]


### XSS
_Teori_

Användaren kan skriva in taggar och kod i denna applikationen. Detta sker när text eller ett script skickas till applikationen utan att ha blivit validerat ordentligt. Med andra ord kan en användare skicka in skadlig kod i applikationen.[5]


_Konsekvenser_

Användaren kan då manipulera koden och få applikationen att göra något helt annat. Tex skriva ut en länk som tar användaren till en annan sida och samtidigt hijackar dess sessions/cookies och samlar användarens information. Som följd utav detta kan den icke befogade användaren ta kontroll över ditt konto eller i värsta fall hela applikationen.


_Åtgärder_

“Validera indata, filtrera utdata” - som Johan Leitet sa i sin föreläsning, 25 November 2013. När det gäller att bara skriva in taggar så kan man som programmerare göra om taggarna till text så att webbläsaren inte tolkar det som kod.
Man kan också göra en whitelist - då man bara tilllåter ett visst antal tecken från användaren.
[6]

### Osäkra objekt referenser / Icke-hashade lösenord
_Teori_

I applikationen kan användaren komma åt databasen genom att skriva in /static/message.db i urlen. En icke befogad användare kan gissa sig till denna sökvägen(jag såg det i min GITBash när jag startade applikationen). Den behöver inte vara inloggad för att kunna se detta.
En användare kan också hämta mer publik data på detta viset.
I konsolen skrivs också /message/data ut. Om man går in på den länken kan man se alla meddelanden i chatten utan att vara inloggad.
Dessa fallen/riskerna kallas för "Insecure Direct Object References".[8], [9]
I databasen kunde jag se att lösenorden inte var krypterade eller hashade. Detta kunde jag också se när jag läste koden.[10]


_Konsekvenser_

Genom att en icke befogad användare kan komma åt /message/data så pass lätt, behöver den inte logga in för att ta del av meddelanden som andra användare skriver.
Med den risken att hitta databasen och icke-hashade lösenord, är det lätt för en icke befogad användare att få tag på alla andras konton och kanske till och med hela applikationen!


_Åtgärder_

Som programmerare kan man skriva kod som gör att en icke befogad användare inte kommer åt dessa sökvägar om den inte har tillgång till det.[8]
Det är också viktigt att hasha lösenord innan man lägger in dem i databasen. Inte kryptera, för krypterar man ett ord kan man alltid kryptera tillbaka det. Så när användaren sedan loggar in så hashas det inskriva lösenordet och jämnförs det med det sparade hashade lösenordet.


# Prestandaproblem

### Script och css-länkar
Script-länkar länkas in i headern tillsammans med css-länkarna. Dock borde dessa script-länkarna länkas in i slutet av html-filen. Detta för att de ej skall störa renderingen utav resten av sidan. Då all rendering av sidan stannar upp när applikationen laddar igenom ett script.
Några css länkar länkas in mitt i koden, detta gör att sidan stannar upp och lärser in dessa css-filerna. För användaren kan detta visas som en vit sida innan allt renderats ut. Detta borde självfallet läggas i headern, där dem andra css-länkarna är placerade. [11]

### HTTP / Cacha resurser
I applikationen sker det väldigt många HTTP-anrop, vilket är negativt för applikationen.[11]
Det är också flera anrop applikationen inte kommer åt, tex Materialize.js. Även om det är små saker hade detta påverkat applikationen om den hade varit större.
Bilder är också en bra ide att lägga ihop till en stor bild för att minska anrop och storleken på alla filer tillsammans.[12]
Det finns bilder som laddas in, men som aldrig används i applikationen.
Om man skulle välja att cacha extern javascript och css så hade applikationen inte behövt göra lika många anrop, på så sätt fungerat något snabbare. Till detta kan man också lägga till en "Expires header" för att tala om för webbläsaren hur länge sådan här information skall sparas.[13]

### JS och CSS-filer
Applikationen hade laddats mycket snabbare om man hade förminskat dem stora javascript och css-filerna. Man kan då ta hjälp utav olika program som tar bort onödiga tecken och förminskar storleken på dokumenten. [7]

## Mindre viktiga
### Nytt meddelande
När ett nytt meddelande skrivs, läggs det till i en json-fil. Sedan raderas alla meddelanden i messageArea och alla meddelanden i jsonfilen läggs till. Istället kan man koda så att det nya meddelandet läggs till ovanpå dem andra, så att applikationen slipper skriva ut alla meddelanden igen.

### Kaka fastän användaren ej inloggad
En kaka skapas när användaren försöker logga in, fast än den inte lyckades.


# Egna övergripande reflektioner
### Applikationen
Förutom det uppenbara som jag skrivit i ovanstående rubriker tycker jag att det fattas rätt och fel meddelande i applikationen. "Logout"-knappen visar sig när man både är inloggad och utloggad. Knappen borde bara visas när man är inloggad. Annars blir det förvirrande.
Det är alldeles för många app_moduler som finns i applikationen som inte används.

### Laborationen
Laborationen har varit rolig och lärorik. Det var skönt men samtidigt svårt att byta lärosätt(att inte programmera). Jag tror dock att jag lärt mig mycket mer genom denna laborationen än om vi skulle provat programmera allt detta. Det hade dessutom tagit mycket längre tid. Vi har dock aldrig gått igenom säkerhet så här detaljerat så det var mycket att ta till sig. Med denna laborationen kunde jag också koppla teorin till praktiken och det är alltid ett bra sätt att lära sig på tycker jag!
Informationen jag tagit till sig under denna laborationen kommer jag att ha stor glädje av resten utav min karriär som webbprogrammerare. Säkerheten är livsviktig för en hållbar applikation!


# Referenser / källa
[1] The Open Web Application Security Project, "OWASP Top 10 The ten most critical web application security risks”, Creative Commons(CC) Attribution Share-Alike, June 12 2013, s. 8.

[2] The Open Web Application Security Project, "OWASP Periodic Table of Vulnerabilities", "www.owasp.org", 14 Augusti 2013, Tillgänglig: [Cookie Theft/Session Hijacking](https://www.owasp.org/index.php/OWASP_Periodic_Table_of_Vulnerabilities_-_Cookie_Theft/Session_Hijacking).

[3] The Open Web Application Security Project, "OWASP Top 10 The ten most critical web application security risks”, Creative Commons(CC) Attribution Share-Alike, June 12 2013, s. 7.

[4] The Open Web Application Security Project, "OWASP Periodic Table of Vulnerabilities", "www.owasp.org", 20 Juli 2013, Tillgänglig: [SQL Injections](https://www.owasp.org/index.php/OWASP_Periodic_Table_of_Vulnerabilities_-_SQL_Injection).

[5] The Open Web Application Security Project, "OWASP Top 10 The ten most critical web application security risks”, Creative Commons(CC) Attribution Share-Alike, June 12 2013, s. 9.

[6] The Open Web Application Security Project, "OWASP Periodic Table of Vulnerabilities", "www.owasp.org", 15 November 2013, Tillgänglig: [Cross.Site Scripting]( https://www.owasp.org/index.php/OWASP_Periodic_Table_of_Vulnerabilities_-_Cross-Site_Scripting_(XSS) ).

[7] Best Practices for speeding up your website, yahoo developers, publicerings-datum ej känt, Tillgänglig: [Minify](http://developer.yahoo.com/performance/rules.html#minify)

[8] The Open Web Application Security Project, "OWASP Top 10 The ten most critical web application security risks”, Creative Commons(CC) Attribution Share-Alike, June 12 2013, s. 11.

[9] The Open Web Application Security Project, "www.owasp.org", 21 Juli 2013, Tillgänglig: “[Improper Filsystem Permissions](https://www.owasp.org/index.php/OWASP_Periodic_Table_of_Vulnerabilities_-_Improper_Filesystem_Permissions).

[10] The Open Web Application Security Project, "OWASP Top 10 The ten most critical web application security risks”, Creative Commons(CC) Attribution Share-Alike, June 12 2013, s. 12.

[11] "FRONT END OPTIMIZATION (FEO)", "Akamai", publicerings-datum ej känt, Tillgänglig: [Font end optimazation](https://www.akamai.com/us/en/resources/front-end-optimization-feo.jsp)

[12] Best Practices for speeding up your website, yahoo developers, publicerings-datum ej känt, Tillgänglig: [Minimize](https://developer.yahoo.com/performance/rules.html#Minimize)

[13] Best Practices for speeding up your website, yahoo developers, publicerings-datum ej känt, Tillgänglig: [Add an Expires or a Cache-Control Header](https://developer.yahoo.com/performance/rules.html)
