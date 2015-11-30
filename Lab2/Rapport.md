_Rebecca Fransson_
_rf222cz_


# Säkerhetsproblem
### Manipulera kakorna / Hijacking
_Teori_

Användaren kan komma åt sin kaka och ändra den.

_Konsekvenser_

Användaren kan komma åt konton, lösenord osv genom att ändra sin kaka, och på så sätt låtsas vara någon den inte är.
Sida 8 på “OWASP Top 10”.

_Åtgärder_

Man borde spara all data i en server-cookie, inte en klient-cookie för då kan hackers lätt manipulera den.
Man borde också använda sig utav HTTPS. Om man inte vill göra SSL på hela sin sida kan man välja att göra det på dem känsliga/svaga sidorna, tex login. Och när användaren sedan loggat in sätt en secure cookie(inte en session cookie som det är nu).

### Kakorna förstörs ej vid utlogging
_Teori_

Genom detta kan en användare komma åt en kaka och vara inloggad fast användaren som kakan tillhör har loggat ut.

_Konsekvenser_

Då kan användaren låtsas den är någon den inte är och fortfarande vara inloggad fast den riktiga användaren har loggat ut.

_Åtgärder_

Skriv kod så att när användaren loggar ut förstörs dess kaka.

###Sql-injections
_Teori_

Användaren skriver in en sql-fråga så att den passar sql-frågan som ställs vid inlogging, på så sätt kan den manipulera frågan och få ett helt annorlunda svar. Tex vid inlogging skriver  användaren frågan “om 1 är lika med 1 låt mig logga in”.
Sida 7 på “OWASP Top 10”.

_Konsekvenser_

På detta sätt kan användaren logga in utan att veta lösenordet till kontot.
Den kan också se, ändra eller förstöra innehållet i databasen.

_Åtgärder_

Istället kan programmeren använda sig utav lagrade procedurer och inte en query. 
Eller kommunicera med ett API som ger programmeraren information istället för databasen.

### XSS
_Teori_

Användaren kan skriva in taggar och skadlig kod i applikationen. Detta händer när text eller ett script skickas till applikationen utan att ha validerats ordentligt.

_Konsekvenser_

Användaren kan då manipulera koden och få den att göra något helt annat. Text skriva ut en länk som tar en till en annan sida och samtidigt hijackar dina sessions och samlar din information. Som följd utav detta kan användaren ta kontroll av ditt konto.

_Åtgärder_

# Prestandaproblem

#Egna övergripande reflektioner
