### Vad finns det för krav du måste anpassa dig efter i de olika API:erna?
Man måste alltid hålla sig uppdaterad om några förändringar kommer upp i framtiden. Tillexempel om något i json-objektet skulle byta namn. Eller någon metod i google apiet skulle ändras.

### Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?
Jag har valt att cacha min data i 15 minuter. Dock har jag funderat på att det borde finnas en refrash-knapp. Så om användaren skulle till tunnelbanan kan de välja att göra en uppdatering precis innan de går offline. Denna iden blev dock aldrig av pga tidsbrist.

### Vad finns det för risker kring säkerhet och stabilitet i din applikation?
Min appliaktion använder sig inte utav någon känslig information. Därför ser jag inga säkerhets risker i min applikation. Det finns inte heller några input-rutor där xss kan ske. Som sagt hanteras ingen känsligdata i applikationen och jag ser ingen anleding till att någon skulle vilja hacka den, det vorde enklare för dem att göra en egen appliktion.

### Hur har du tänkt kring säkerheten i din applikation?
Jag har egentligen inte tänkt så mycket på den då jag inte såg någon anledning till någon säkerhet från början. Dock, eftersom jag använt mig helt utav kod på klienten, är jag lite orolig att detta kan medföra problem som jag inte är bekant med.

### Hur har du tänkt kring optimeringen i din applikation?
Jag har velat ha så få förfrågningar mot mitt api som möjligt, för att göra detta har jag cachat min data då användaren är online också.

http://188.166.116.158/1dv449/Lab3/
