const TERMINAL_RESPONSES = {
  'help': '📋 COMANDI DISPONIBILI\n─────────────────────────────────\n  help          → mostra questo elenco\n  ls            → elenca i file nella directory\n  pwd           → mostra la directory corrente\n  whoami        → chi sei tu?\n  date          → che giorno è?\n  echo          → ripeti qualcosa\n  cat           → leggi un file (o un gatto)\n  rm            → cancella qualcosa (forse)\n  rm -rf /      → NON FARLO\n  sudo          → prova a diventare root\n  hack          → accedi al mainframe 🕶️\n  git           → gestione versioni\n  npm install   → installa pacchetti\n─────────────────────────────────\n  java          → linguaggio preferito (forse)\n  c++           → linguaggio pericoloso\n  python        → il linguaggio proibito\n  sql           → interroga il database\n─────────────────────────────────\n  cioccolato    → hai fame?\n  compito       → info sul prossimo compito\n  voto          → calcola il tuo voto\n  pasqua        → un messaggio speciale 🐣\n─────────────────────────────────\n  clear         → pulisci il terminale\n  exit          → esci (o almeno prova)',
  'ls': '\u{1F4C1} compiti_non_fatti/\n\u{1F4C1} scuse_per_il_prof/\n\u{1F4C4} appunti_illeggibili.txt\n\u{1F4C4} copia_di_copia.java\n\u{1F95A} easter_egg.secret',
  'pwd': '/home/studente/panico-pre-esame',
  'whoami': '\u{1F914} Uno studente che dovrebbe studiare invece di giocare con questo terminale...',
  'sudo': '\u{1F6AB} Errore: non hai i permessi di root.\nSuggerimento: prova "sudo get cioccolato"',
  'sudo get cioccolato': '\u{1F36B}\u{1F36B}\u{1F36B} Permesso accordato! Cioccolato in arrivo!\n(purtroppo solo virtuale)',
  'clear': '__CLEAR__',
  'exit': '\u{1F44B} Arrivederci! Ma tanto tornerai...\n(ricarica la pagina)',
  'date': '\u{1F4C5} La data di consegna era IERI. Corri!',
  'echo': '\u{1F50A} echo echo echo... (hai dimenticato cosa scrivere?)',
  'cat': '\u{1F431} Miao! Intendevi "cat file.txt"?\nOppure volevi solo un gatto?',
  'rm': '\u{1F5D1}\uFE0F ATTENZIONE: stai per cancellare tutti i tuoi compiti.\nScherzavo! Non ho quel potere.',
  'rm -rf /': '\u{1F480}\u{1F480}\u{1F480} NOOOOO! Per fortuna questo \u00E8 un terminale finto.\nNon farlo MAI su uno vero!',
  'hack': '\u{1F576}\uFE0F Accesso al mainframe in corso...\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591 75%\n...Errore: il mainframe era spento.\nSuggerimento: prova a studiare, funziona meglio.',
  'cioccolato': '\u{1F36B} Le scorte di cioccolato pasquale sono terminate.\nProva: sudo get cioccolato',
  'compito': '\u{1F4DD} Il prossimo compito sar\u00E0 facilissimo*\n\n*facilissimo secondo i prof',
  'voto': '\u{1F4CA} Calcolando il tuo voto...\nVoto = (ore_studio * 0) + (fortuna * 100)\nRisultato: NaN\n...forse dovresti studiare di pi\u00F9.',
  'pasqua': '\u{1F423}\u{1F430}\u{1F95A} BUONA PASQUA!\nDai Prof. Palma e Prof. Schiavo\n\n...ma prima finisci gli esercizi!',
  'java': '\u2615 Java: scrivi una volta, debugga ovunque.\nEccezione: NullPointerException\n(come sempre)',
  'python': '\u{1F40D} Python non \u00E8 nel programma.\nMa se vuoi: print("Buona Pasqua!")',
  'c++': '\u2699\uFE0F Segmentation fault (core dumped)\n...ah no, \u00E8 solo il terminale finto.',
  'sql': '\u{1F5C4}\uFE0F SELECT * FROM studenti WHERE studio > 0;\n\u2192 0 rows returned',
  'git': '\u{1F4E6} git commit -m "ho copiato da Stack Overflow"\ngit push origin panic-branch',
  'npm install': '\u{1F4E6} Installazione di 847293 pacchetti...\n\u26A0\uFE0F 12847 vulnerabilit\u00E0 trovate\n(come al solito)',
};

const DEFAULT_RESPONSES = [
  '\u{1F937} Comando non riconosciuto. Scrivi "help" per i comandi disponibili.',
  '\u2753 Non capisco... ma apprezzo la creativit\u00E0!',
  '\u{1F430} Il coniglietto pasquale non conosce questo comando.',
  '\u{1F4A1} Suggerimento: prova "help" oppure "pasqua"',
  '\u{1F95A} Questo comando \u00E8 nascosto in un uovo che non hai ancora trovato.',
];

function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  function addLine(text, isCommand) {
    const line = document.createElement('div');
    line.className = isCommand ? 'term-cmd' : 'term-response';
    if (isCommand) {
      line.innerHTML = '<span class="term-prompt">studente@pasqua:~$</span> ' + text;
    } else {
      line.textContent = text;
    }
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function processCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    addLine(cmd, true);

    if (!trimmed) return;

    if (trimmed === 'clear') {
      output.innerHTML = '';
      return;
    }

    const response = TERMINAL_RESPONSES[trimmed];
    if (response) {
      response.split('\n').forEach(line => addLine(line, false));
    } else {
      const random = DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
      addLine(random, false);
    }
  }

  // Welcome message
  addLine('\u{1F5A5}\uFE0F Easter Terminal v1.0 \u2014 Prof. Palma & Prof. Schiavo Edition', false);
  addLine('Digita "help" per i comandi disponibili.', false);
  addLine('', false);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      processCommand(input.value);
      input.value = '';
    }
  });

  // Focus input when terminal is clicked
  document.getElementById('terminal-modal')?.addEventListener('click', () => {
    input.focus();
  });

  window.focusTerminal = () => input.focus();
}

document.addEventListener('DOMContentLoaded', initTerminal);
