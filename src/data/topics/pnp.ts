import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 03b: the classes P and NP, reductions, NP-hardness and NP-completeness. */
export const pnp = topic({
  id: 'pnp',
  chapter: '03b',
  title: 'Ist P = NP?',
  summary:
    'P, NP, Generate and Test, Guess and Check, SAT, CLIQUE, TSP, Reduzierbarkeit, NP-schwer, NP-vollständig.',
  definitions: [
    {
      id: 'problem-algorithmus',
      title: 'Problem, Lösungsweg, Algorithmus',
      ref: '03b · Zusammenhang zwischen Problemen und Algorithmen',
      statement: r`- Ein **Problem** ist eine Aufgabenstellung, an deren Lösung man interessiert ist.
- Der **Lösungsweg** ist ein Verfahren, mit dem man eine Lösung zuverlässig ermitteln kann. Es kann mehrere Lösungswege für das gleiche Problem geben.
- Die formale Beschreibung eines Lösungswegs heißt **Algorithmus**.

Algorithmisch lösbare Probleme sind **entscheidbare Sprachen** $L \subseteq \Sigma^*$; der Algorithmus beschreibt einen Lösungsweg für das Wortproblem $w \in L$.`,
      note: r`In diesem Kapitel geht es um die **Effizienz** von Algorithmen, beschränkt auf totale und berechenbare Funktionen. Betrachtet wird immer die generalisierte Version eines Problems (z. B. Sudoku der Größe $n \times n$).`,
    },
    {
      id: 'p',
      title: 'Polynomielle Zeitkomplexität und die Klasse P',
      ref: '03b · Sortieren mit Bubblesort',
      statement: r`Ein Algorithmus hat **polynomielle (Zeit-)Komplexität**, wenn die Anzahl der Schritte nach oben durch ein Polynom beschränkt ist: $\Oh(n^x)$ mit Problemgröße $n$.

Die Klasse **P** enthält die Probleme, die in Polynomialzeit **lösbar** sind. Ihre Lösungen können auch in Polynomialzeit **überprüft** werden.`,
      note: r`Beispiel Bubblesort: $\Oh(n^2)$, höchstens $c \cdot n^2$ Schritte. Prüfen, ob eine Liste sortiert ist, braucht nur $\Oh(n)$.`,
    },
    {
      id: 'np',
      title: 'Die Klasse NP',
      ref: '03b · Die Problemklassen P und NP sowie NP-schwer',
      statement: r`**NP** = **n**icht-deterministisch **p**olynomial. Probleme in NP

- können von einer **NDTM** in Polynomialzeit gelöst werden (Guess and Check),
- haben Lösungen, die in Polynomialzeit **überprüft** werden können.

Für die schwierigen Probleme in NP kennt man **kein** Lösungsverfahren in Polynomialzeit.`,
      note: r`NP heißt **nicht** „nicht polynomial“. Jedes Problem in P liegt auch in NP ($P \subseteq NP$) – offen ist, ob NP echt größer ist.`,
    },
    {
      id: 'generate-and-test',
      title: 'Generate and Test',
      ref: '03b · Generate and Test',
      statement: r`Kennt man keinen effizienten Algorithmus, findet man eine Lösung durch systematisches Ausprobieren (**brute force**):

1. **Generate:** Erzeuge irgendeinen potenziellen Lösungskandidaten (eine mögliche Konfiguration aller Variablen).

2. **Test:** Überprüfe, ob der Kandidat eine Lösung ist.

3. Wiederhole, falls keine Lösung gefunden wurde.`,
      note: r`Könnte man alle Kandidaten in Polynomialzeit generieren **und** unendlich parallelisieren, wäre das Problem einfach. Es gibt aber nicht unendlich viele Computer – das Problem bleibt schwierig.`,
    },
    {
      id: 'guess-and-check',
      title: 'Guess and Check',
      ref: '03b · Guess and Check',
      statement: r`Generate and Test, optimiert unter Zuhilfenahme von „Glück“:

1. **Guess:** Rate „geschickt“ einen potenziellen Lösungskandidaten.

2. **Check:** Überprüfe, ob der geratene Kandidat eine Lösung ist.

3. Wiederhole, falls keine Lösung gefunden wurde.

Geschicktes Raten entspricht einer **nichtdeterministischen Turingmaschine**, die stets die „richtigen“ Transitionen auswählt. Damit könnte man Lösungen in Polynomialzeit finden.`,
      note: r`Funktioniert in der Praxis nicht, weil es keine NDTM gibt. Aber es definiert die Klasse: Wo Guess and Check in Polynomialzeit funktioniert, liegt das Problem in NP.`,
    },
    {
      id: 'reduzierbar',
      title: 'f-reduzierbar und polynomial reduzierbar',
      ref: '03b · Reduzierbarkeit',
      statement: r`Seien $L \subseteq \Sigma^*$ und $M \subseteq \Gamma^*$ Sprachen und $f: \Sigma^* \to \Gamma^*$ eine berechenbare Funktion.

- $L$ heißt **$f$-reduzierbar** auf $M$, falls $w \in L \Leftrightarrow f(w) \in M$.
- $L$ heißt **polynomial reduzierbar** auf $M$, falls es ein $f$ gibt, sodass $L$ auf $M$ $f$-reduzierbar ist und $f$ in Polynomialzeit berechnet werden kann: $time_f(w) \in \Oh(p(|w|))$ für ein Polynom $p$.

Schreibweise: $L \le_p M$.`,
      note: r`Lesart: „$L$ ist höchstens so schwer wie $M$“ – wer $M$ lösen kann, löst auch $L$, indem er die Eingabe mit $f$ übersetzt. Anschaulich: Number Scrabble lässt sich über das magische Quadrat auf Tic-Tac-Toe reduzieren.`,
    },
    {
      id: 'np-schwer',
      title: 'NP-schwer',
      ref: '03b · Satz von Cook-Levin',
      statement: r`Ein Problem $P$ ist **NP-schwer**, wenn für **jedes** Problem $Q \in NP$ gilt: $Q \le_p P$.

NP-schwere Probleme sind **mindestens so schwierig** wie alle Probleme in NP (untere Schranke).`,
      note: r`Oft irreführend „NP-hart“ genannt (engl. NP-hard). NP-schwere Probleme müssen **nicht** in NP liegen: Auch nicht entscheidbare Probleme wie das Halteproblem zählen dazu.`,
    },
    {
      id: 'np-vollstaendig',
      title: 'NP-vollständig',
      ref: '03b · Die Problemklasse NP-vollständig',
      statement: r`Liegt ein Problem $P$ **in NP** und ist es **NP-schwer**, so bezeichnet man $P$ als **NP-vollständig**.

- Probleme in NP-vollständig liegen in NP **und**
- alle anderen Probleme aus NP lassen sich auf sie reduzieren.`,
      note: r`NP-vollständig = NP ∩ NP-schwer: die schwersten Probleme **innerhalb** von NP. Beispiele: SAT, 3-SAT, CLIQUE, TSP.`,
    },
    {
      id: 'sat',
      title: 'SAT und 3-SAT',
      ref: '03b · Boolean Satisfiability Problem (SAT)',
      statement: r`**SAT** (Boolean Satisfiability Problem): Ist eine aussagenlogische Formel erfüllbar? Gibt es also eine Variablenbelegung $(x_1, \dots, x_n)$ mit $x_i \in \{true, false\}$, sodass der Gesamtterm $true$ wird?

- Bei $n$ Variablen gibt es $2^n$ Kandidaten – exponentielles Wachstum.
- Jeder einzelne Kandidat kann in Polynomialzeit geprüft werden → Guess and Check funktioniert, SAT liegt in NP.

**3-SAT:** dieselbe Frage für Formeln aus 3-Klauseln (Klauseln mit jeweils maximal drei Variablen).`,
    },
    {
      id: 'clique-tsp',
      title: 'CLIQUE und TSP',
      ref: '03b · CLIQUE / Travelling Salesperson Problem (TSP)',
      statement: r`**CLIQUE:** Eine Clique ist eine Teilmenge der Knoten eines Graphen, in der alle Knoten paarweise verbunden sind. Frage: Gibt es in einem Graphen (mindestens) eine $k$-Clique?

- $\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$ Kandidaten mit $k$ Elementen
- Prüfen eines Kandidaten: $k(k-1)$ Kanten finden, in $\Oh(n^2)$

**TSP:** Gibt es einen Hamiltonkreis der Länge $l$ oder kürzer in einem gewichteten Graphen?

- $\frac{(n-1)!}{2}$ Kandidaten
- Prüfen eines Kandidaten: Kantengewichte aufaddieren, in $\Oh(n)$`,
      note: r`Beide: zu viele Kandidaten für Polynomialzeit, aber jeder Kandidat ist schnell geprüft → in NP.`,
    },
  ],
  theorems: [
    {
      id: 'cook-levin',
      title: 'Satz von Cook-Levin',
      ref: '03b · Satz von Cook-Levin',
      statement: r`**SAT ist NP-vollständig.**

Das heißt: SAT liegt in NP, und **jedes** Problem in NP kann in Polynomialzeit auf SAT reduziert werden.`,
      note: r`In der Vorlesung ohne Beweis. Konsequenzen: SAT ist ein schwerstes Problem in NP (es gibt viele schwerste). Um ein weiteres Problem als NP-schwer nachzuweisen, genügt es dank Transitivität, SAT darauf zu reduzieren.`,
    },
    {
      id: 'konsequenzen-reduktion',
      title: 'Eigenschaften und Konsequenzen von ≤ₚ',
      ref: '03b · Konsequenzen aus ≤p',
      statement: r`- $\le_p$ ist **transitiv**: aus $L \le_p M$ und $M \le_p N$ folgt $L \le_p N$.
- Wenn $L \le_p M$ gilt und $M$ **entscheidbar** ist, dann ist auch $L$ entscheidbar.
- Wenn $L \le_p M$ gilt und $M \in NP$, dann gilt auch $L \in NP$.`,
      note: r`Die Eigenschaften „einfach“ vererben sich von rechts nach links ($M$ leicht ⇒ $L$ leicht), die Eigenschaften „schwer“ von links nach rechts ($L$ schwer ⇒ $M$ schwer).`,
    },
    {
      id: 'drei-sat',
      title: '3-SAT ist NP-vollständig',
      ref: '03b · 3-SAT',
      statement: r`- **3-SAT $\le_p$ SAT:** trivial – 3-SAT ist bereits ein Teilproblem von SAT. Also liegt 3-SAT in NP.
- **SAT $\le_p$ 3-SAT:** Mit der **Tseitin-Transformation** (Grigori Zeitin, 1966) kann SAT in Polynomialzeit auf 3-SAT reduziert werden. Da jedes NP-Problem auf SAT reduzierbar ist, ist es (Transitivität) auch auf 3-SAT reduzierbar: 3-SAT ist NP-schwer.

Zusammen: 3-SAT ist NP-vollständig.`,
    },
    {
      id: 'p-vs-np',
      title: 'P = NP?',
      ref: '03b · Sind P und NP die gleiche Menge?',
      statement: r`Die Frage, ob $P = NP$ gilt, ist **bis heute unbeantwortet** (Millennium-Problem).

- Für NP-vollständige Probleme sind nur schwierige Lösungen bekannt; es könnte einfache Lösungen in P geben, die man (noch) nicht kennt.
- Ließe sich auch nur **ein einziges** NP-vollständiges Problem in Polynomialzeit lösen, ließen sich sofort **alle** Probleme in NP in Polynomialzeit lösen. Dann gälte $P = NP$.
- Die Mehrheit der Informatikerinnen und Informatiker vermutet $P \ne NP$.`,
      note: r`Wäre $P = NP$, gäbe es keinen grundsätzlichen Unterschied zwischen dem **Finden** und dem **Erkennen** einer Lösung (Aaronson: Jeder, der eine Symphonie schätzen kann, wäre Mozart).`,
    },
    {
      id: 'landkarte',
      title: 'Landkarte der Problemklassen',
      ref: '03b · Die Problemklasse NP-vollständig',
      statement: r`- **P** liegt in **NP**: Bubblesort (Sortieren), Palindrom-Erkennung.
- **NP-vollständig** = der Teil von NP, der zugleich NP-schwer ist: SAT, 3-SAT, CLIQUE, TSP.
- **NP-schwer** reicht über NP hinaus: z. B. das Halteproblem (nicht entscheidbar).
- Zwischen P und NP-vollständig: Falls $P \ne NP$, gibt es dort weitere Probleme (Satz von Ladner).`,
    },
  ],
  claims: [
    {
      id: 'np-nicht-polynomial',
      statement: r`NP steht für „nicht polynomial“.`,
      holds: false,
      reason: r`NP steht für **nicht-deterministisch polynomial**: von einer NDTM in Polynomialzeit lösbar.`,
    },
    {
      id: 'p-in-np',
      statement: r`Jedes Problem in P liegt auch in NP.`,
      holds: true,
      reason: r`Was man in Polynomialzeit lösen kann, kann man auch in Polynomialzeit überprüfen (und eine NDTM kann alles, was eine TM kann).`,
    },
    {
      id: 'p-ungleich-np-bewiesen',
      statement: r`Es ist bewiesen, dass $P \ne NP$ gilt.`,
      holds: false,
      reason: r`Die Frage ist offen. $P \ne NP$ wird von der Mehrheit nur **vermutet**.`,
    },
    {
      id: 'np-schwer-in-np',
      statement: r`Jedes NP-schwere Problem liegt in NP.`,
      holds: false,
      reason: r`NP-schwer ist nur eine untere Schranke. Das Halteproblem ist NP-schwer, aber nicht einmal entscheidbar.`,
    },
    {
      id: 'sat-vollstaendig',
      statement: r`SAT ist NP-vollständig.`,
      holds: true,
      reason: r`Satz von Cook-Levin.`,
    },
    {
      id: 'sat-kandidaten',
      statement: r`Eine aussagenlogische Formel mit $n$ Variablen hat $n^2$ mögliche Belegungen.`,
      holds: false,
      reason: r`Es sind $2^n$ – jede Variable ist true oder false. Exponentiell, nicht polynomiell.`,
    },
    {
      id: 'loesung-pruefen',
      statement: r`Für Probleme in NP lässt sich eine gegebene Lösung in Polynomialzeit überprüfen.`,
      holds: true,
      reason: r`Das ist der „Check“ in Guess and Check – z. B. ein ausgefülltes Sudoku prüfen oder die Kantengewichte einer Rundreise addieren.`,
    },
    {
      id: 'ein-problem-genuegt',
      statement: r`Fände man für ein einziges NP-vollständiges Problem einen Algorithmus mit polynomieller Laufzeit, so wäre $P = NP$.`,
      holds: true,
      reason: r`Jedes Problem in NP lässt sich in Polynomialzeit darauf reduzieren – und wäre damit selbst in Polynomialzeit lösbar.`,
    },
    {
      id: 'reduktion-richtung',
      statement: r`Aus $L \le_p M$ und $L \in NP$ folgt $M \in NP$.`,
      holds: false,
      reason: r`Falsche Richtung. Es gilt: $L \le_p M$ und $M \in NP$ ⇒ $L \in NP$. $M$ darf beliebig schwerer sein als $L$.`,
    },
    {
      id: 'transitiv',
      statement: r`Die Relation $\le_p$ ist transitiv.`,
      holds: true,
      reason: r`Zwei polynomiale Übersetzungen hintereinander sind wieder eine polynomiale Übersetzung.`,
    },
    {
      id: 'bubblesort',
      statement: r`Sortieren liegt in P, weil Bubblesort höchstens $c \cdot n^2$ Schritte braucht.`,
      holds: true,
      reason: r`$\Oh(n^2)$ ist polynomielle Zeitkomplexität.`,
    },
  ],
  problems: [
    {
      id: 'kandidaten-zaehlen',
      title: 'Kandidaten zählen',
      source: 'nach 03b · SAT / CLIQUE / TSP',
      points: 6,
      task: r`Wie viele Lösungskandidaten müsste Generate and Test im schlimmsten Fall prüfen?

- (a) SAT mit 10 Variablen
- (b) 3-Clique in einem Graphen mit 6 Knoten
- (c) TSP in einem (vollständigen) Graphen mit 5 Knoten

Wie teuer ist jeweils das Prüfen **eines** Kandidaten?`,
      solution: r`- **(a)** $2^{10} = 1024$ Belegungen. Prüfen: Formel einmal auswerten – polynomiell.
- **(b)** $\binom{6}{3} = \frac{6!}{3! \cdot 3!} = 20$ Knotenmengen. Prüfen: $k(k-1) = 6$ Kanten suchen, in $\Oh(n^2)$.
- **(c)** $\frac{(5-1)!}{2} = 12$ Hamiltonkreise. Prüfen: Kantengewichte aufaddieren, $\Oh(n)$.

Das Muster: Die **Anzahl** der Kandidaten wächst exponentiell bzw. faktoriell, das **Prüfen** eines Kandidaten liegt in P. Deshalb liegen alle drei in NP.`,
    },
    {
      id: 'sat-belegung',
      title: 'SAT von Hand',
      source: 'nach 03b · Boolean Satisfiability Problem (SAT)',
      points: 5,
      task: r`Ist die Formel erfüllbar? Gib eine erfüllende Belegung an oder begründe, dass es keine gibt.

- (a) $(\neg x_1 \vee x_2) \wedge (x_3 \vee x_4) \wedge x_5$
- (b) $(x_1 \vee x_2) \wedge (\neg x_1 \vee x_2) \wedge \neg x_2$`,
      solution: r`**(a)** Erfüllbar. $x_5 = true$ ist erzwungen. Für die erste Klausel genügt $x_1 = false$, für die zweite $x_3 = true$. Zum Beispiel: $x_1 = false$, $x_2 = false$, $x_3 = true$, $x_4 = false$, $x_5 = true$. Probe: $(true \vee false) \wedge (true \vee false) \wedge true = true$.

**(b)** Nicht erfüllbar. $\neg x_2$ erzwingt $x_2 = false$. Dann verlangt die erste Klausel $x_1 = true$ und die zweite $x_1 = false$ – Widerspruch. Alle $2^2 = 4$ Belegungen scheitern.`,
    },
    {
      id: 'number-scrabble',
      title: 'Number Scrabble auf Tic-Tac-Toe reduzieren',
      source: 'nach 03b · Reduzierung von Number Scrabble auf Tic-Tac-Toe',
      points: 5,
      task: r`Number Scrabble: Zwei Personen ziehen abwechselnd Zahlen aus $1, \dots, 9$. Wer zuerst **drei** Zahlen mit Summe 15 hat, gewinnt.

Erkläre, wie sich das Spiel auf Tic-Tac-Toe reduzieren lässt. Person 1 hat 2 und 6 gezogen – welche Zahl muss Person 2 ziehen?`,
      solution: r`Ordne die Zahlen als **magisches Quadrat** an – jede Zeile, Spalte und Diagonale hat die Summe 15:

~~~
2  7  6
9  5  1
4  3  8
~~~

Die Dreiergruppen mit Summe 15 sind genau die acht Linien des Quadrats. Eine Zahl ziehen entspricht also dem Setzen eines Kreuzes auf das Feld: Number Scrabble **ist** Tic-Tac-Toe (die Reduktionsfunktion $f$ übersetzt Zahlen in Felder).

2 und 6 liegen in der obersten Zeile; es fehlt die 7 ($2 + 7 + 6 = 15$). Person 2 muss die **7** ziehen, um zu blockieren.`,
    },
    {
      id: 'vollstaendigkeit-zeigen',
      title: 'NP-Vollständigkeit begründen',
      source: 'nach 03b · Satz von Cook-Levin / 3-SAT',
      points: 7,
      task: r`- (a) Was genau muss man zeigen, damit ein Problem $X$ NP-vollständig ist?
- (b) Begründe mit dem Satz von Cook-Levin und der Tseitin-Transformation, dass 3-SAT NP-vollständig ist.
- (c) Angenommen, jemand zeigt CLIQUE $\le_p$ Sortieren. Was würde folgen?`,
      solution: r`**(a)** Zwei Dinge: (1) $X \in NP$ – eine Lösung lässt sich in Polynomialzeit überprüfen. (2) $X$ ist NP-schwer – **jedes** Problem aus NP ist polynomial auf $X$ reduzierbar. Für (2) genügt es, ein bekanntes NP-vollständiges Problem auf $X$ zu reduzieren (Transitivität).

**(b)** (1) 3-SAT ist ein Teilproblem von SAT, also 3-SAT $\le_p$ SAT, und SAT $\in NP$ ⇒ 3-SAT $\in NP$. (2) Nach Cook-Levin gilt $Q \le_p$ SAT für jedes $Q \in NP$. Die Tseitin-Transformation liefert SAT $\le_p$ 3-SAT. Transitivität: $Q \le_p$ 3-SAT für jedes $Q \in NP$ ⇒ 3-SAT ist NP-schwer. Zusammen: NP-vollständig.

**(c)** Sortieren liegt in P. Dann wäre CLIQUE in Polynomialzeit lösbar (Eingabe übersetzen, sortieren). CLIQUE ist NP-vollständig, also wären **alle** Probleme in NP in Polynomialzeit lösbar: $P = NP$.`,
    },
    {
      id: 'einordnen',
      title: 'Probleme einordnen',
      source: 'nach 03b · Die Problemklassen P und NP sowie NP-schwer',
      points: 5,
      task: r`Ordne ein: P, NP-vollständig oder „NP-schwer, aber nicht in NP“?

- (a) Liste sortieren
- (b) SAT
- (c) Halteproblem
- (d) Prüfen, ob ein Wort ein Palindrom ist
- (e) TSP (Rundreise mit Länge $\le l$)
- (f) Prüfen, ob eine gegebene Belegung eine Formel erfüllt`,
      solution: r`- **(a)** P (z. B. Bubblesort in $\Oh(n^2)$)
- **(b)** NP-vollständig (Cook-Levin)
- **(c)** NP-schwer, aber nicht in NP – nicht einmal entscheidbar
- **(d)** P
- **(e)** NP-vollständig
- **(f)** P – das ist nur der „Check“-Schritt, nicht SAT selbst`,
    },
  ],
});
