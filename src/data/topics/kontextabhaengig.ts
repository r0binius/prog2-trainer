import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02d, first part: context-sensitive grammars and the overview of the Chomsky types. */
export const kontextabhaengig = topic({
  id: 'kontextabhaengig',
  chapter: '02d',
  title: 'Kontextabhängige Sprachen',
  summary:
    'CS-Grammatik, nicht verkürzende Produktionen, aⁿbⁿcⁿ, Entscheidbarkeit, Übersicht der Sprachtypen.',
  definitions: [
    {
      id: 'cs-grammatik',
      title: 'Kontextabhängige Grammatik (CS-Grammatik)',
      ref: '02d · CS-Grammatiken',
      statement: r`Eine **kontextabhängige Grammatik** (context-sensitive grammar, auch kontextsensitiv) ist eine Grammatik $G = (V, T, P, S)$ mit $T \cap V = \emptyset$, deren Produktionen die Form

$$\alpha B \gamma \to \alpha \beta \gamma \quad \text{mit } \alpha, \beta, \gamma \in (T \cup V)^* \text{ und } |\beta| \ge 1$$

haben. Die Satzform darf durch Anwendung einer Produktion also **nicht kürzer** werden.

Die Produktion $S \to \epsilon$ ist nur erlaubt, falls $S$ in keiner Produktion auf der rechten Seite vorkommt.`,
      note: r`Die Variable $B$ darf nur ersetzt werden, wenn sie im richtigen **Kontext** steht: umgeben von $\alpha$ und $\gamma$. Bei einer CF-Grammatik sind $\alpha$ und $\gamma$ leer – daher „kontextfrei“.`,
    },
    {
      id: 'cs-sprache',
      title: 'Kontextabhängige Sprache',
      ref: '02d · CS-Grammatiken',
      statement: r`Eine Sprache $\cL \subseteq T^*$ heißt **kontextabhängig**, falls es eine kontextabhängige Grammatik $G$ gibt mit $\cL = L(G)$.`,
      note: r`Typ 1 der Chomsky-Hierarchie. Standardbeispiel: $\{a^n b^n c^n \mid n \ge 0\}$ – kontextabhängig, aber nicht kontextfrei.`,
    },
    {
      id: 'nicht-verkuerzend',
      title: 'Nicht verkürzende Produktionen',
      ref: '02d · Entscheidbarkeit kontextabhängiger Sprachen',
      statement: r`Mit Ausnahme von $S \to \epsilon$ sind sämtliche Produktionen einer CS-Grammatik **nicht verkürzend**:

$$\forall (\alpha \to \beta) \in P: |\alpha| \le |\beta|$$

Leitet man ein Wort $w$ mittels $S \Rightarrow^* w$ ab, entstehen in den Zwischenschritten ausschließlich Satzformen, die **kleiner oder gleich lang** wie $w$ sind.`,
      note: r`Genau diese Eigenschaft macht kontextabhängige Sprachen entscheidbar.`,
    },
    {
      id: 'uebersicht',
      title: 'Übersicht: Grammatiken, Sprachtypen, Wortproblem',
      ref: '02d · Übersicht über Typen von Sprachen und Grammatiken',
      statement: r`~~~
Grammatik        Produktionen    Sprachen                    Lösung Wortproblem
---------------  --------------  --------------------------  ------------------------------
–                –               beliebige Sprachen          –
allgemeine       α → β           Typ 0 – aufzählbar +        TM, NDTM
                                 entscheidbar
CS-Grammatik     αBγ → αβγ       Typ 1 – kontextabhängig     prinzipiell LBA,
                                                             de facto Turingmaschine
CF-Grammatik     A → α           Typ 2 – kontextfrei         CYK-Algorithmus, (N)PDA
reguläre         A → tB          Typ 3 – regulär             regulärer Ausdruck, DFA, NFA
~~~

mit Satzformen $\alpha, \beta, \gamma$, Terminal $t$ und Variablen $A, B$.`,
      note: r`Es gibt Sprachen, die zwar rekursiv aufzählbar sind (durch eine allgemeine Grammatik definierbar), aber **nicht entscheidbar** – mehr dazu im Vorlesungsteil 03a.`,
    },
  ],
  theorems: [
    {
      id: 'anbncn',
      title: 'CS-Grammatik für aⁿbⁿcⁿ',
      ref: '02d · Beispiel: aⁿbⁿcⁿ ist kontextabhängig',
      statement: r`$\cL_{a^n b^n c^n} = \{a^n b^n c^n \mid n \ge 0\}$ ist kontextabhängig. $V = \{S, X, B, C\}$, $T = \{a, b, c\}$, Startsymbol $S$:

~~~
S  → X | ε
X  → aXBC | aBC
CB → BC          Vertauschen von C und B
aB → ab
bB → bb
bC → bc
cC → cc
~~~`,
      note: r`Drei Phasen: (1) $X$ erzeugt $a^n (BC)^n$. (2) $CB \to BC$ sortiert alle $B$ vor alle $C$. (3) Von links nach rechts werden $B$ und $C$ in Terminale umgewandelt – aber nur im richtigen Kontext (ein $B$ nur nach $a$ oder $b$, ein $C$ nur nach $b$ oder $c$). So kann kein $c$ vor einem $b$ entstehen.`,
    },
    {
      id: 'cs-entscheidbar',
      title: 'Kontextabhängige Sprachen sind entscheidbar',
      ref: '02d · Entscheidbarkeit kontextabhängiger Sprachen',
      statement: r`**Begründung:**

1. Mit Ausnahme von $S \to \epsilon$ sind alle Produktionen nicht verkürzend. (Die Prüfung auf $\epsilon \in \cL$ ist trivial.)

2. Bei einer Ableitung $S \Rightarrow^* w$ entstehen als Zwischenschritte nur Satzformen, die höchstens so lang wie $w$ sind.

3. Da es nur endlich viele Produktionen gibt, kann man **systematisch alle Ableitungen** bis zur Länge $|w|$ erzeugen und muss dabei zwangsläufig auf $w$ treffen, falls $w \in \cL$.`,
      note: r`Es gibt nur endlich viele Satzformen der Länge $\le |w|$ – die Suche terminiert also immer, auch bei $w \notin \cL$. Bei allgemeinen Grammatiken (Typ 0) dürfen Satzformen schrumpfen; dort fehlt diese Schranke.`,
    },
    {
      id: 'relevanz',
      title: 'Praktische Relevanz',
      ref: '02d · Praktische Relevanz von kontextabhängigen Sprachen',
      statement: r`- Reguläre und kontextfreie Sprachen haben in der Praxis Bedeutung, weil ihr Wortproblem **automatisiert** (und effizient) entschieden werden kann.
- Bei kontextabhängigen Sprachen hat die automatisierte Entscheidbarkeit nur **geringe Bedeutung**.
- Kontextabhängige Sprachen werden im Allgemeinen durch (mächtigere) **Turingmaschinen** implementiert.`,
    },
  ],
  claims: [
    {
      id: 'verkuerzen',
      statement: r`In einer kontextabhängigen Grammatik darf eine Produktion die Satzform verkürzen.`,
      holds: false,
      reason: r`Wegen $|\beta| \ge 1$ sind die Produktionen nicht verkürzend. Einzige Ausnahme: $S \to \epsilon$, wenn $S$ rechts nirgends vorkommt.`,
    },
    {
      id: 'anbncn-cf',
      statement: r`$\{a^n b^n c^n \mid n \ge 0\}$ ist kontextfrei.`,
      holds: false,
      reason: r`Die Sprache ist kontextabhängig (Typ 1), aber nicht kontextfrei – es gibt keine CF-Grammatik für sie.`,
    },
    {
      id: 'cs-entscheidbar',
      statement: r`Jede kontextabhängige Sprache ist entscheidbar.`,
      holds: true,
      reason: r`Weil Produktionen nicht verkürzen, genügt es, alle Ableitungen mit Satzformen bis zur Länge $|w|$ zu durchsuchen – endlich viele.`,
    },
    {
      id: 'cf-ist-cs',
      statement: r`Eine kontextfreie Regel $B \to \beta$ mit $|\beta| \ge 1$ ist ein Spezialfall der Form $\alpha B \gamma \to \alpha \beta \gamma$.`,
      holds: true,
      reason: r`Mit leerem Kontext ($\alpha = \gamma = \epsilon$) bleibt genau „eine Variable wird durch eine nichtleere Satzform ersetzt“.`,
    },
    {
      id: 'typ0-entscheidbar',
      statement: r`Jede durch eine allgemeine Grammatik (Typ 0) definierte Sprache ist entscheidbar.`,
      holds: false,
      reason: r`Es gibt Sprachen, die rekursiv aufzählbar, aber nicht entscheidbar sind.`,
    },
    {
      id: 'cs-praxis',
      statement: r`In der Praxis löst man das Wortproblem kontextabhängiger Sprachen de facto mit Turingmaschinen.`,
      holds: true,
      reason: r`Prinzipiell genügt ein LBA; implementiert werden sie im Allgemeinen durch (mächtigere) Turingmaschinen.`,
    },
    {
      id: 'wortproblem-cf',
      statement: r`Das Wortproblem kontextfreier Sprachen löst man mit dem CYK-Algorithmus oder einem (N)PDA.`,
      holds: true,
      reason: r`So steht es in der Übersicht: Typ 2 ↔ CYK-Algorithmus, (N)PDA.`,
    },
    {
      id: 'kontext-bleibt',
      statement: r`Bei der Anwendung von $aB \to ab$ wird das $a$ verändert.`,
      holds: false,
      reason: r`Das $a$ ist nur **Kontext** und bleibt stehen. Ersetzt wird allein $B$ durch $b$ – aber eben nur, wenn links davon ein $a$ steht.`,
    },
  ],
  problems: [
    {
      id: 'aabbcc',
      title: 'Ableitung von aabbcc',
      source: 'nach 02d · Beispiel: aⁿbⁿcⁿ ist kontextabhängig',
      points: 7,
      task: r`Leite mit der Grammatik

~~~
S  → X | ε
X  → aXBC | aBC
CB → BC
aB → ab
bB → bb
bC → bc
cC → cc
~~~

das Wort $aabbcc$ ab. Nenne in jedem Schritt die Regel.`,
      solution: r`~~~
S ⇒ X            S → X
  ⇒ aXBC         X → aXBC
  ⇒ aaBCBC       X → aBC
  ⇒ aabCBC       aB → ab
  ⇒ aabBCC       CB → BC
  ⇒ aabbCC       bB → bb
  ⇒ aabbcC       bC → bc
  ⇒ aabbcc       cC → cc
~~~

Jede Satzform ist höchstens so lang wie das Zielwort (Länge 6) – die Produktionen verkürzen nie.`,
    },
    {
      id: 'aaabbbccc',
      title: 'Ableitung von aaabbbccc',
      source: 'nach 02d · Beispiel: aⁿbⁿcⁿ ist kontextabhängig',
      points: 8,
      task: r`Leite mit derselben Grammatik $aaabbbccc$ ab. Wie oft brauchst du die Regel $CB \to BC$, und warum?`,
      solution: r`~~~
S ⇒ X
  ⇒ aXBC
  ⇒ aaXBCBC
  ⇒ aaaBCBCBC      X → aBC
  ⇒ aaaBBCCBC      CB → BC
  ⇒ aaaBBCBCC      CB → BC
  ⇒ aaaBBBCCC      CB → BC
  ⇒ aaabBBCCC      aB → ab
  ⇒ aaabbBCCC      bB → bb
  ⇒ aaabbbCCC      bB → bb
  ⇒ aaabbbcCC      bC → bc
  ⇒ aaabbbccC      cC → cc
  ⇒ aaabbbccc      cC → cc
~~~

**Dreimal** $CB \to BC$: In $BCBCBC$ steht das zweite $B$ hinter einem $C$ und das dritte $B$ hinter zwei $C$ – zusammen $1 + 2 = 3$ Vertauschungen (allgemein $\frac{n(n-1)}{2}$).`,
    },
    {
      id: 'warum-entscheidbar',
      title: 'Wortproblem durch Aufzählen',
      source: 'nach 02d · Entscheidbarkeit kontextabhängiger Sprachen',
      points: 5,
      task: r`Erkläre, wie man für eine CS-Grammatik $G$ und ein Wort $w$ entscheidet, ob $w \in L(G)$. Warum terminiert das Verfahren immer – und warum funktioniert dasselbe Argument bei Typ-0-Grammatiken nicht?`,
      solution: r`**Verfahren:** Ist $w = \epsilon$, prüfe, ob $S \to \epsilon$ existiert. Sonst erzeuge ausgehend von $S$ systematisch alle ableitbaren Satzformen, verwirf dabei jede Satzform, die länger als $|w|$ ist, und merke dir bereits erzeugte Satzformen. Taucht $w$ auf: Ja. Kommt nichts Neues mehr hinzu: Nein.

**Terminierung:** Produktionen sind nicht verkürzend, also kann eine Satzform, die länger als $w$ ist, nie mehr zu $w$ werden – sie darf verworfen werden. Über dem endlichen Alphabet $T \cup V$ gibt es nur **endlich viele** Satzformen der Länge $\le |w|$; irgendwann ist alles durchsucht.

**Typ 0:** Dort dürfen Produktionen verkürzen ($\alpha \to \beta$ beliebig). Eine Ableitung von $w$ kann über beliebig lange Zwischenformen führen – es gibt keine Längenschranke, die Suche muss nicht terminieren.`,
    },
    {
      id: 'typen-zuordnen',
      title: 'Sprachen in die Chomsky-Hierarchie einordnen',
      source: 'nach 02d · Übersicht über Typen von Sprachen und Grammatiken',
      points: 6,
      task: r`Gib für jede Sprache den höchsten zutreffenden Typ (3, 2, 1) an und nenne ein passendes Werkzeug für das Wortproblem.

- (a) $\{a^n \mid n \ge 0\}$
- (b) $\{a^n b^n \mid n \ge 0\}$
- (c) $\{a^n b^n c^n \mid n \ge 0\}$
- (d) wohlgeformte Klammerausdrücke
- (e) Binärzahlen ohne führende Nullen
- (f) $\{a^n b^m \mid n, m \ge 0\}$`,
      solution: r`- **(a)** Typ 3 (regulär), @@a*@@ – DFA
- **(b)** Typ 2 (kontextfrei), $S \to aSb \mid \epsilon$ – CYK oder NPDA
- **(c)** Typ 1 (kontextabhängig) – LBA, de facto Turingmaschine
- **(d)** Typ 2 (Dyck-Sprache), $S \to (S) \mid SS \mid \epsilon$ – CYK oder NPDA
- **(e)** Typ 3, @@0|1(0|1)*@@ – DFA
- **(f)** Typ 3, @@a*b*@@ – DFA (die Anzahlen sind unabhängig)`,
    },
  ],
});
