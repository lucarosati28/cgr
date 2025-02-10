CGR Repository
Questo repository contiene [breve descrizione del progetto].
Prerequisiti
Prima di iniziare, assicurati di avere installato:

Git
Visual Studio Code
L'estensione Git per Visual Studio Code
Un account GitHub

Come clonare il repository

Apri il terminale sul tuo computer
Naviga nella directory dove vuoi clonare il repository
Esegui il comando:
bashCopygit clone https://github.com/lucarosati28/cgr.git

Attendi che il clone sia completato

Configurazione del tuo nuovo repository
Dopo aver clonato il repository, segui questi passaggi per collegarlo al tuo spazio GitHub:

Crea un nuovo repository vuoto su GitHub

Vai su GitHub.com e accedi al tuo account
Clicca sul pulsante "+" in alto a destra e seleziona "New repository"
Dai un nome al repository
NON inizializzare il repository con README, .gitignore o licenza
Clicca "Create repository"


Rimuovi il remote origin esistente
bashCopygit remote remove origin

Aggiungi il tuo nuovo repository come remote
bashCopygit remote add origin https://github.com/TUO-USERNAME/NOME-REPOSITORY.git

Carica il codice sul tuo repository
bashCopygit branch -M main
git push -u origin main


Configurazione in Visual Studio Code

Apri Visual Studio Code
Vai su File > Open Folder (o Apri Cartella) e seleziona la cartella del repository
Alla prima apertura, VS Code dovrebbe riconoscere automaticamente il repository Git

Configurazione Git (solo la prima volta)
Se non l'hai già fatto, configura Git con le tue credenziali:
bashCopygit config --global user.name "Il tuo nome"
git config --global user.email "tua.email@example.com"
Come fare commit delle modifiche

Dopo aver fatto delle modifiche ai file, apri il Source Control panel in VS Code (icona con i tre cerchi collegati o premi Ctrl+Shift+G)
Vedrai la lista dei file modificati
Fai hover su un file e clicca sul + per "stage" delle modifiche
Scrivi un messaggio di commit che descriva le modifiche apportate
Premi Ctrl+Enter o clicca sul segno di spunta ✓ per fare il commit

Come pubblicare i commit su GitHub
Per inviare i tuoi commit al repository remoto:

Clicca sull'icona "Sync Changes" (↻) nella barra in basso o usa il comando
bashCopygit push

Se richiesto, inserisci le tue credenziali GitHub

Branch management
Per creare un nuovo branch:

Clicca sul nome del branch corrente nella barra in basso
Seleziona "Create new branch..."
Inserisci il nome del nuovo branch

Per cambiare branch:

Clicca sul nome del branch corrente nella barra in basso
Seleziona il branch desiderato dalla lista

Verifica della configurazione
Per verificare che tutto sia configurato correttamente:

Controlla i repository remoti configurati:
bashCopygit remote -v
Dovresti vedere il tuo nuovo repository URL come origin
Verifica lo stato del repository:
bashCopygit status


Problemi comuni
Se incontri problemi con le credenziali:

Su Windows, usa Credential Manager
Su macOS, usa Keychain Access
Su Linux, configura git-credential-store

Per ulteriore assistenza, consulta la documentazione di Git o la documentazione di VS Code.
