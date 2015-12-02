_Rebecca Fransson_
_rf222cz_


# Säkerhetsproblem
### Manipulera kakorna / Hijacking / Kakorna förstörs ej vid utlogging
_Teori_

I denna appliaktionen kan användaren kan komma åt sin kaka och ändra den. Detta beror på att kakan är sparad eller sänd på ett osäkert sätt.
På grund av att kakorna ej förstörs vid utloggning kan en användare komma åt en kaka och vara inloggad fast användaren som kakan tillhör har loggat ut.
[1].


_Konsekvenser_

Användaren kan komma åt konton genom att ändra sin kaka, och på så sätt låtsas vara någon den inte är och ta reda på personlig information om den andvändaren den har "hijacked".
Den elaka användaren behöver inte oroa sig, och har längre tid på sig att hijacka den attackerade personen då kakan inte förstörs vid utlogging.


_Åtgärder_

Man borde spara all data i en server-cookie, inte en klient-cookie för då kan hackers lätt manipulera den.
Man borde också använda sig utav HTTPS. Om man inte vill göra SSL på hela sin sida kan man välja att göra det på dem känsliga/svaga sidorna, tex login. Och när användaren sedan loggat in sätt en secure cookie(inte en session cookie som det är i applikationen nu).
Och se till att kakans identifierare sänds med ett krypterat protokoll!
Skriv kod så att när användaren loggar ut förstörs dess kaka.
[1], [2].


### Sql-injections
_Teori_

Idenna applikationen kan en användare skriva in en sql-fråga så att den passar sql-frågan som ställs vid inlogging, på så sätt kan den manipulera frågan och få ett helt annorlunda svar. Tex vid inlogging skriver  användaren frågan “om 1 är lika med 1 låt mig logga in”.
[3]


_Konsekvenser_

På detta sätt kan användaren logga in utan att veta lösenordet till kontot.
Den kan också se, ändra eller förstöra innehållet i databasen.


_Åtgärder_

Istället kan programmeren använda sig utav lagrade procedurer och inte en query.
Eller kommunicera med ett API som ger programmeraren information istället för databasen.
[4]


### XSS
_Teori_

Användaren kan skriva in taggar och skadlig kod i denna applikationen. Detta händer när text eller ett script skickas till applikationen utan att ha validerats ordentligt. Med andra ord kan en användare skicka in skadlig kod i applikationen.[5]


_Konsekvenser_

Användaren kan då manipulera koden och få den att göra något helt annat. Text skriva ut en länk som tar en till en annan sida och samtidigt hijackar dina sessions/cookies och samlar din information. Som följd utav detta kan användaren ta kontroll av ditt konto eller i värsta fall hela applikationen.


_Åtgärder_

“Validera indata, filtrera utdata” - som Johan sa i sin föreläsning.[7]
När det gäller att bara skriva in taggar så kan man som programmerare göra om taggarna till text så att webbläsaren inte tolkar det som kod.
Man kan också göra en whitelist - då man bara tilllåter ett visst antal tecken från användaren.
[6]

### Osäkra object referenser / Icke-hashade lösenord
_Teori_

I applikationen kan användaren komma åt databasen genom att skriva in /static/message.db i urlen. En användare kanske gissa sig till(jag såg det i min GITBash när jag startade applikationen) denna sökvägen.
I consolen skrivs också /message/data ut. Om man går in på den länken kan man se alla meddelanden i chatten utan att vara inloggad. Detta kallas "Insecure Direct Object References".[8]
I databasen kunde jag se att lösenorden inte var krypterade eller hashade, detta kudne jag också se när jag läste koden.[9]



_Konsekvenser_

Genom att en användaren kan komma åt /message/data så pass lätt behöver den inte logga in för att ta del av meddelanden som andra användere skriver.
Med riskerna att hitta databsen och icke-hashade lösenord är det lätt för en användare att få tag på allas konton och kanske till och med hela applikationen!


_Åtgärder_

Som programmerare kan man skriva kod som gör att en användare inte kommer åt detta sökvägarna om den inte har tillgång till det.[8]

# Prestandaproblem

# Egna övergripande reflektioner

# Referenser

[1] The Open Web Application Security Project, "OWASP Top 10 The ten most critical web application security risks”, s. 8.

[2] The Open Web Application Security Project, "OWASP Periodic Table of Vulnerabilities", Tillgänglig: [Cookie Theft/Session Hijacking](https://www.owasp.org/index.php/OWASP_Periodic_Table_of_Vulnerabilities#Periodic_Table_of_Vulnerabilities).

[3] The Open Web Application Security Project, "OWASP Top 10 The ten most critical web application security risks”, s. 7.

[4] OWASP, "OWASP Periodic Table of Vulnerabilities", Tillgänglig: [SQL Injections](https://www.owasp.org/index.php/OWASP_Periodic_Table_of_Vulnerabilities_-_SQL_Injection).

[5] The Open Web Application Security Project, "OWASP Top 10 The ten most critical web application security risks”, s. 9.

[6] The Open Web Application Security Project, "OWASP Periodic Table of Vulnerabilities", Tillgänglig: [Cross.Site Scripting](https://www.owasp.org/index.php/OWASP_Periodic_Table_of_Vulnerabilities_-_Cross-Site_Scripting_(XSS)).

[7] Johan Leitet, Tillgänglig: “[Webbteknik II - HT13 - Webbsäkerhet](https://www.youtube.com/watch?v=Gc_pc9TMEIk)”.

[8] The Open Web Application Security Project, "OWASP Top 10 The ten most critical web application security risks”, s. 10.

[9] The Open Web Application Security Project, "OWASP Top 10 The ten most critical web application security risks”, s. 12.
