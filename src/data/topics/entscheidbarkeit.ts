import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 01a, second part: decidability, semi-decidability and the word problem. */
export const entscheidbarkeit = topic({
  id: 'entscheidbarkeit',
  chapter: '01a',
  title: 'Entscheidbarkeit und Wortproblem',
  summary:
    'Entscheidbar, semi-entscheidbar, Komplementsprache, charakteristische Funktion, Wortproblem.',
  definitions: [
    {
      id: 'entscheidbar',
      title: 'Entscheidbare Sprache',
      ref: '01a · Entscheidbarkeit',
      statement: r`Eine Sprache $\cL \subseteq \Sigma^*$ heißt **entscheidbar**, wenn es einen „Algorithmus“ $E_\cL$ gibt, der zu **jedem** Wort $w \in \Sigma^*$ entscheidet, ob $w \in \cL$ oder ob $w \in \Sigma^* \setminus \cL$.

- $w \in \cL \Leftrightarrow E_\cL(w) = \text{True}$
- $w \notin \cL \Leftrightarrow E_\cL(w) = \text{False}$`,
      note: r`Entscheidend: $E_\cL$ **terminiert immer** – mit Ja oder mit Nein. Er berechnet im Wesentlichen die charakteristische Funktion von $\cL$.`,
    },
    {
      id: 'charakteristische-funktion',
      title: 'Charakteristische Funktion',
      ref: '01a · Entscheidbarkeit',
      statement: r`Die **charakteristische Funktion** einer Sprache $\cL$ ist

$$\chi_\cL(w) = \begin{cases} 1 & \text{falls } w \in \cL \\ 0 & \text{falls } w \notin \cL \end{cases}$$

Ein Entscheider $E_\cL$ berechnet im Wesentlichen $\chi_\cL$.`,
    },
    {
      id: 'komplementsprache',
      title: 'Komplementsprache',
      ref: '01a · Entscheidbarkeit',
      statement: r`Die **Komplementsprache** $\Sigma^* \setminus \cL$ enthält genau all jene Worte über $\Sigma$, welche die Sprache $\cL$ **nicht** enthält.`,
    },
    {
      id: 'semi-entscheidbar',
      title: 'Semi-entscheidbare Sprache',
      ref: '01a · Semi-Entscheidbarkeit',
      statement: r`Eine Sprache $\cL \subseteq \Sigma^*$ heißt **semi-entscheidbar**, wenn es einen „Algorithmus“ $S_\cL$ gibt, der zu jedem Wort $w \in \Sigma^*$ **bestätigen** kann, falls $w \in \cL$.

- $w \in \cL \Leftrightarrow S_\cL(w) = \text{True}$
- $w \notin \cL \Leftrightarrow S_\cL(w) = \text{False}$ **oder** $S_\cL(w)$ terminiert nicht`,
      note: r`Das „Ja“ kommt garantiert irgendwann. Beim „Nein“ darf der Algorithmus ewig weitersuchen – man weiß dann nie, ob die Antwort noch kommt.`,
    },
    {
      id: 'pi-sprachen',
      title: 'Die Sprachen L_pre-π und L_in-π',
      ref: '01a · Zwei „exotische“ Sprachen',
      statement: r`Über $\Sigma = \{0, 1, \dots, 9\}$ mit $\pi = 31415926\dots$:

- $\cL_{pre\text{-}\pi} = \{w \in \Sigma^* \mid w \text{ ist Präfix von } \pi\}$ – **entscheidbar**: berechne die ersten $|w|$ Stellen von $\pi$ und vergleiche zeichenweise.
- $\cL_{in\text{-}\pi} = \{w \in \Sigma^* \mid w \text{ ist Teilwort von } \pi\}$ – **semi-entscheidbar**: berechne immer mehr Stellen von $\pi$; wird $w$ gefunden, terminiere mit True, sonst suche weiter.`,
      note: r`Bei $\cL_{in\text{-}\pi}$ gibt es für ein nicht vorkommendes Wort keinen Zeitpunkt, an dem die Suche „Nein“ sagen dürfte – $\pi$ hat unendlich viele Stellen.`,
    },
    {
      id: 'wortproblem',
      title: 'Wortproblem',
      ref: '01a · Wortproblem',
      statement: r`Das **Wortproblem** bezeichnet die Fragestellung, ob ein Wort in einer Sprache liegt: $w \in \cL$ oder $w \notin \cL$.

Für eine konkrete Sprache $\cL$ über $\Sigma$ ist die Lösung ein Algorithmus $\mathcal{A}: \Sigma^* \to \{\text{True}, \text{False}\}$, der ein Wort $w$ als Eingabe erhält und True oder False liefert – je nachdem, ob $w \in \cL$ gilt.`,
      note: r`Das Wortproblem zieht sich durch die ganze Vorlesung: DFA/NFA lösen es für reguläre Sprachen, CYK und NPDA für kontextfreie, Turingmaschinen für den Rest.`,
    },
  ],
  theorems: [
    {
      id: 'entscheidbar-semi',
      title: 'Zusammenhang Entscheidbarkeit und Semi-Entscheidbarkeit',
      ref: '01a · Zusammenhang zwischen Semi-Entscheidbarkeit und Entscheidbarkeit',
      statement: r`$$\cL \text{ entscheidbar} \iff \cL \text{ und } \Sigma^* \setminus \cL \text{ sind semi-entscheidbar}$$

**Beweis „⇒“:**

- Ist $\cL$ entscheidbar, so ist $\cL$ semi-entscheidbar: wähle $S_\cL := E_\cL$.
- Ist $\cL$ entscheidbar, so ist $\Sigma^* \setminus \cL$ semi-entscheidbar: wähle $S_{\Sigma^* \setminus \cL} := \text{not}(E_\cL)$.

**Beweis „⇐“:** Lasse $S_\cL$ und $S_{\Sigma^* \setminus \cL}$ **parallel** laufen (oder quasi-parallel mit einem Scheduler).

- Falls $w \in \cL$, terminiert irgendwann $S_\cL$ mit True → Antwort True.
- Falls $w \notin \cL$, terminiert irgendwann $S_{\Sigma^* \setminus \cL}$ mit True → Antwort False.`,
      note: r`Die beiden Semi-Entscheider **nacheinander** laufen zu lassen, wäre falsch: Der erste könnte nie terminieren. Deshalb parallel oder abwechselnd Schritt für Schritt.`,
    },
    {
      id: 'wortproblem-motivation',
      title: 'Warum das Wortproblem spannend ist',
      ref: '01a · Wortproblem – Motivation',
      statement: r`- Eine Sprache ist eine (potenziell unendliche) Menge von Worten, also von Symbolketten.
- Jedes Computerprogramm / jede Funktion ist ein Algorithmus $\mathcal{A}: A \to B$, der eine Eingabe erhält und eine Ausgabe erzeugt. $A$ ist die Menge aller potenziellen Eingabeparameter, $B$ die aller möglichen Rückgabewerte.
- Damit lässt sich **jedes Computerprogramm auf das Wortproblem zurückführen**.
- $B$ ist meist nicht $\{\text{True}, \text{False}\}$, sondern eine zweite Sprache über einem zweiten Alphabet (vgl. Transducer).

Gäbe es eine Möglichkeit, das Wortproblem automatisch zu lösen, könnte man **automatisch programmieren** (lassen).`,
    },
    {
      id: 'chomsky-entscheidbar',
      title: 'Welche Sprachklassen entscheidbar sind',
      ref: '02c/02d · Entscheidbarkeit',
      statement: r`- **Reguläre Sprachen** (Typ 3): entscheidbar – ein DFA liest das Wort einmal und antwortet.
- **Kontextfreie Sprachen** (Typ 2): entscheidbar – CYK-Algorithmus auf der Grammatik in Chomsky-Normalform.
- **Kontextabhängige Sprachen** (Typ 1): entscheidbar – Produktionen sind nicht verkürzend, also genügt es, alle Ableitungen bis zur Länge $|w|$ zu erzeugen.
- **Typ 0** (allgemeine Grammatiken): Es gibt Sprachen, die rekursiv aufzählbar, aber **nicht entscheidbar** sind.`,
      note: r`Überblickskarte: Die Einzelheiten stehen in den Kapiteln 02c und 02d.`,
    },
  ],
  claims: [
    {
      id: 'entscheidbar-ist-semi',
      statement: r`Jede entscheidbare Sprache ist auch semi-entscheidbar.`,
      holds: true,
      reason: r`Wähle $S_\cL := E_\cL$. Der Entscheider bestätigt jedes $w \in \cL$ und terminiert sogar immer.`,
    },
    {
      id: 'semi-ist-entscheidbar',
      statement: r`Jede semi-entscheidbare Sprache ist auch entscheidbar.`,
      holds: false,
      reason: r`Dafür müsste zusätzlich das **Komplement** semi-entscheidbar sein. Ein Semi-Entscheider darf bei $w \notin \cL$ endlos laufen.`,
    },
    {
      id: 'komplement-entscheidbar',
      statement: r`Ist $\cL$ entscheidbar, dann ist auch $\Sigma^* \setminus \cL$ entscheidbar.`,
      holds: true,
      reason: r`$\text{not}(E_\cL)$ terminiert immer und entscheidet das Komplement: einfach die Antwort umdrehen.`,
    },
    {
      id: 'pre-pi',
      statement: r`$\cL_{pre\text{-}\pi}$ ist entscheidbar.`,
      holds: true,
      reason: r`Die ersten $|w|$ Stellen von $\pi$ lassen sich berechnen; danach genügt ein zeichenweiser Vergleich. Das terminiert immer.`,
    },
    {
      id: 'in-pi-verfahren',
      statement: r`Das Verfahren „berechne immer mehr Stellen von $\pi$ und suche $w$ darin“ ist ein Entscheider für $\cL_{in\text{-}\pi}$.`,
      holds: false,
      reason: r`Es ist nur ein **Semi-Entscheider**: Kommt $w$ vor, terminiert es mit True. Kommt $w$ nicht vor, sucht es ewig weiter und sagt nie False.`,
    },
    {
      id: 'nacheinander',
      statement: r`Um aus $S_\cL$ und $S_{\Sigma^* \setminus \cL}$ einen Entscheider zu bauen, genügt es, erst $S_\cL$ vollständig und danach $S_{\Sigma^* \setminus \cL}$ auszuführen.`,
      holds: false,
      reason: r`Für $w \notin \cL$ terminiert $S_\cL$ möglicherweise nie – dann kommt der zweite nie dran. Beide müssen **parallel** (oder verzahnt per Scheduler) laufen.`,
    },
    {
      id: 'endliche-sprache',
      statement: r`Jede endliche Sprache ist entscheidbar.`,
      holds: true,
      reason: r`Vergleiche $w$ nacheinander mit den endlich vielen Worten der Sprache. Das terminiert immer.`,
    },
    {
      id: 'wortproblem-funktion',
      statement: r`Die Lösung des Wortproblems für eine Sprache $\cL$ über $\Sigma$ ist eine Funktion $\Sigma^* \to \{\text{True}, \text{False}\}$.`,
      holds: true,
      reason: r`Genau so definieren es die Folien: $\mathcal{A}$ erhält ein Wort und liefert True oder False, je nachdem, ob $w \in \cL$.`,
    },
  ],
  problems: [
    {
      id: 'satz-beweisen',
      title: 'Entscheidbar ⇔ beide Seiten semi-entscheidbar',
      source: 'nach 01a · Zusammenhang zwischen Semi-Entscheidbarkeit und Entscheidbarkeit',
      points: 6,
      task: r`Beweise: Eine Sprache $\cL \subseteq \Sigma^*$ ist genau dann entscheidbar, wenn $\cL$ und $\Sigma^* \setminus \cL$ semi-entscheidbar sind.`,
      hint: r`Zwei Richtungen. Für „⇐“ musst du aus zwei Semi-Entscheidern einen Entscheider bauen – wie laufen die beiden?`,
      solution: r`**„⇒“:** Sei $E_\cL$ ein Entscheider.

- $S_\cL := E_\cL$ bestätigt jedes $w \in \cL$ → $\cL$ ist semi-entscheidbar.
- $S_{\Sigma^* \setminus \cL} := \text{not}(E_\cL)$ bestätigt jedes $w \notin \cL$ → das Komplement ist semi-entscheidbar.

**„⇐“:** Seien $S_\cL$ und $S_{\Sigma^* \setminus \cL}$ gegeben. Lasse beide **parallel** (oder quasi-parallel mit einem Scheduler) auf $w$ laufen.

- Jedes $w$ liegt entweder in $\cL$ oder im Komplement, also terminiert genau einer der beiden irgendwann mit True.
- Terminiert $S_\cL$ mit True: Ausgabe True. Terminiert $S_{\Sigma^* \setminus \cL}$ mit True: Ausgabe False.

Dieser Algorithmus terminiert für jedes $w$ mit der richtigen Antwort – er ist ein Entscheider $E_\cL$.`,
    },
    {
      id: 'pi-einordnen',
      title: 'Präfix und Teilwort von π',
      source: 'nach 01a · Zwei „exotische“ Sprachen',
      points: 5,
      task: r`Gegeben $\Sigma = \{0, \dots, 9\}$ und $\pi = 31415926\dots$

- (a) Liegen $314$, $315$ und $159$ in $\cL_{pre\text{-}\pi}$ bzw. $\cL_{in\text{-}\pi}$?
- (b) Beschreibe einen Entscheider für $\cL_{pre\text{-}\pi}$.
- (c) Beschreibe einen Semi-Entscheider für $\cL_{in\text{-}\pi}$ und erkläre, warum er kein Entscheider ist.`,
      solution: r`**(a)**

- $314$: Präfix ✓, Teilwort ✓
- $315$: kein Präfix (dritte Stelle ist 4). Ob es Teilwort ist, zeigt erst die Suche.
- $159$: kein Präfix, aber Teilwort ✓ ($3\,14\,\mathbf{159}\,26$)

**(b)** $E$: Berechne die ersten $|w|$ Stellen von $\pi$, vergleiche zeichenweise mit $w$, gib True bei Gleichheit, sonst False. Terminiert immer.

**(c)** $S$: Berechne immer mehr Stellen von $\pi$ und prüfe nach jeder neuen Stelle, ob $w$ in den bisher berechneten Stellen vorkommt. Wird $w$ gefunden: True. Sonst: weitersuchen. Kommt $w$ nie vor, terminiert $S$ nicht – es gibt keinen Zeitpunkt, an dem $S$ sicher „False“ antworten könnte. Also nur Semi-Entscheider.`,
    },
    {
      id: 'programm-als-wortproblem',
      title: 'Programm und Wortproblem',
      source: 'nach 01a · Motivation: Erkennen von Zahlenliteralen',
      points: 4,
      task: r`Ein Programm soll prüfen, ob ein String eine in Java gültige positive Integerzahl ist (dezimal, oktal mit führender 0, hexadezimal mit @@0x@@, Unterstriche nur **zwischen** Ziffern).

- (a) Formuliere die Aufgabe als Wortproblem: Was ist $\Sigma$, was ist $\cL$, was berechnet der Algorithmus?
- (b) Welche der Tests sind gültig: @@007@@, @@008@@, @@7_7@@, @@_77@@, @@1__0@@, @@0x_ab@@, @@0xa_B@@?`,
      solution: r`**(a)** $\Sigma$ = die erlaubten Zeichen (Ziffern, Buchstaben a–f/A–F, x, Unterstrich, …). $\cL \subseteq \Sigma^*$ = die Menge aller gültigen Integer-Literale. Der Algorithmus ist $\mathcal{A}: \Sigma^* \to \{\text{True}, \text{False}\}$ mit $\mathcal{A}(w) = \text{True} \Leftrightarrow w \in \cL$. Die Sprache ist regulär – ein regulärer Ausdruck löst das Wortproblem.

**(b)**

- @@007@@ gültig (oktal)
- @@008@@ ungültig (8 ist keine Oktalziffer)
- @@7_7@@ gültig
- @@_77@@ ungültig (Unterstrich nicht zwischen zwei Ziffern)
- @@1__0@@ gültig (beliebig viele Unterstriche zwischen Ziffern)
- @@0x_ab@@ ungültig (Unterstrich direkt nach dem Präfix)
- @@0xa_B@@ gültig`,
    },
  ],
});
