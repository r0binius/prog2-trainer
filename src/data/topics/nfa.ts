import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02b: nondeterministic finite automata, equivalence with DFAs and the powerset construction. */
export const nfa = topic({
  id: 'nfa',
  chapter: '02b',
  title: 'Nichtdeterministische endliche Automaten',
  summary:
    'NFA als 5-Tupel, akzeptierender Lauf, Äquivalenz zu DFAs, Zustandsmengen, Potenzmengenkonstruktion.',
  definitions: [
    {
      id: 'nfa',
      title: 'Nichtdeterministischer endlicher Automat (NFA)',
      ref: '02b · Definition: NFA',
      statement: r`Sei $\Sigma$ ein Alphabet. Ein **nichtdeterministischer endlicher $\Sigma$-Automat** ist ein 5-Tupel $\mathcal{A} = (Q, \Sigma, \delta, q_0, F)$ mit

- $Q$ – endliche Menge von Zuständen
- $\delta: Q \times \Sigma \to \Pot(Q)$ – Transitionsfunktion
- $q_0 \in Q$ – Anfangszustand
- $F \subseteq Q$ – akzeptierende Zustände`,
      note: r`Der zentrale Unterschied zum DFA ist die Bildmenge von $\delta$: die **Potenzmenge** der Zustände. Von einem Zustand können mehrere Transitionen für das gleiche Symbol ausgehen – oder gar keine: $\delta(q_0, s) = \{q_0, q_1, q_2\}$, aber auch $\delta(q_0, x) = \emptyset$.`,
    },
    {
      id: 'abweichungen',
      title: 'Abweichungen des NFA vom DFA',
      ref: '02b · Ein einfacher, nichtdeterministischer Tantenautomat',
      statement: r`- Von Zuständen muss **nicht für jedes Zeichen** eine Transition ausgehen.
- Von einem Zustand können **mehrere Transitionen für das gleiche Zeichen** ausgehen.
- $\delta: Q \times \Sigma \to Q$ ist deshalb keine Funktion mehr (sondern bildet nach $\Pot(Q)$ ab).
- Ein Wort wird akzeptiert, wenn **ein** akzeptierender Lauf existiert – egal, ob es weitere Läufe gibt, die nicht akzeptierend enden oder gar nicht zu Ende geführt werden können.`,
      note: r`Tantenautomat für @@.*tante.*@@: Schleife mit allen Symbolen an $q_0$, dann $q_0 \xrightarrow{t} q_1 \xrightarrow{a} q_2 \xrightarrow{n} q_3 \xrightarrow{t} q_4 \xrightarrow{e} q_5$, Schleife an $q_5$. Bei einem $t$ in $q_0$ „rät“ der NFA, ob hier die Tante beginnt.`,
    },
    {
      id: 'lauf-nfa',
      title: 'Lauf und Sprache eines NFA',
      ref: '02b · Sprache eines NFA',
      statement: r`Ein **Lauf** für ein Wort $w = w_1 w_2 \dots w_n$ ist eine Folge von Zuständen $q_0 q_1 \dots q_n$ mit $q_{i+1} \in \delta(q_i, w_{i+1})$. Er ist **akzeptierend**, falls $q_n \in F$.

Die **Sprache** eines NFA umfasst alle Worte, für die es einen akzeptierenden Lauf gibt:

$$L(\mathcal{A}) = \{w \in \Sigma^* \mid \exists \text{ akzeptierender Lauf für } w\}$$`,
      note: r`Unerheblich, ob es auch nicht akzeptierende Läufe für dasselbe Wort gibt: **Einer genügt.** Ein Wort wird nur dann abgelehnt, wenn **alle** Läufe scheitern.`,
    },
    {
      id: 'backtracking-zustandsmengen',
      title: 'Wortproblem im NFA: Backtracking oder Zustandsmengen',
      ref: '02b · Lauf im NFA mit Zustandsmengen statt Backtracking',
      statement: r`Zwei Arten, ein Wort in einem NFA zu prüfen:

- **Backtracking:** Einem Lauf folgen; bleibt er stecken oder endet nicht akzeptierend, zur letzten Wahlmöglichkeit zurück und die andere Transition probieren. Aufwendig.
- **Zustandsmengen:** Alle Läufe gleichzeitig verfolgen. Man merkt sich die **Menge** der Zustände, in denen sich der NFA nach dem bisher gelesenen Präfix befinden kann. Liegt am Ende mindestens ein akzeptierender Zustand in der Menge, wird das Wort akzeptiert.`,
      note: r`Beispiel: Nach $tantanten$ ist die Zustandsmenge des Tantenautomaten $\{q_0, q_5\}$ – sie enthält $q_5 \in F$, also akzeptiert. Die Zustandsmengen sind genau die Zustände des Potenzmengenautomaten.`,
    },
    {
      id: 'potenzmengenautomat',
      title: 'Potenzmengenautomat',
      ref: '02b · Potenzmengenautomat',
      statement: r`Der **Potenzmengenautomat** zu einem NFA $\mathcal{A} = (Q, \Sigma, \delta_A, q_0, F_A)$ ist der DFA $\mathcal{B} = (\Pot(Q), \Sigma, \delta_B, \{q_0\}, F_B)$ mit

$$\delta_B(Z, e) = \bigcup_{q \in Z} \delta_A(q, e) \qquad F_B = \{Z \subseteq Q \mid Z \cap F_A \ne \emptyset\}$$

Seine Zustände sind alle denkbaren **Zustandsmengen** des NFA.`,
      note: r`Weil jede Zustandsmenge ein einzelner DFA-Zustand ist, befindet sich der DFA immer in genau einem Zustand, und für jedes Symbol gibt es genau eine Transition. Auch $\emptyset$ ist ein Zustand: der Fangzustand.`,
    },
  ],
  theorems: [
    {
      id: 'dfa-ist-nfa',
      title: 'Jeder DFA erfüllt die Kriterien für NFAs',
      ref: '02b · Äquivalenz von NFA und DFA (1/2)',
      statement: r`DFAs sind ein **Spezialfall** von NFAs: Im NFA darf es je Zustand und Symbol mehrere oder keine Transitionen geben – exakt eine ist ebenfalls erlaubt.

Formal „verpackt“ man die Zustände eines DFA $\mathcal{B}$ in einelementige Mengen:

- $Q_A := \{\{q\} \mid q \in Q_B\}$
- $\delta_A(q, a) := \{\delta_B(q, a)\}$ für alle $a \in \Sigma$, $q \in Q$
- $F_A := \{\{q\} \mid q \in F_B\}$`,
      note: r`Wie die Zustände im NFA heißen, ist egal: Man könnte $\{q_3\}$ auch $q_3$ nennen und würde den Unterschied nicht bemerken. Praktisch: Jede DFA-Lösung ist auch eine NFA-Lösung.`,
    },
    {
      id: 'nfa-zu-dfa',
      title: 'Zu jedem NFA gibt es einen äquivalenten DFA',
      ref: '02b · Äquivalenz von NFA und DFA (2/2)',
      statement: r`Zu jedem NFA gibt es einen DFA, der die gleiche Sprache erkennt – den Potenzmengenautomaten $\mathcal{B}$.

**Beweisskizze:**

- **$w \in L(\mathcal{A}) \Rightarrow w \in L(\mathcal{B})$:** Sei $q_0 q_1 \dots q_n$ ein akzeptierender Lauf in $\mathcal{A}$. Definiere $Z_0 := \{q_0\}$, $Z_{i+1} := \delta_B(Z_i, w_{i+1})$. Dann ist $Z_0 Z_1 \dots Z_n$ der Lauf in $\mathcal{B}$ mit $q_i \in Z_i$. Wegen $q_n \in Z_n \cap F_A$ ist $Z_n \in F_B$.
- **$w \in L(\mathcal{B}) \Rightarrow w \in L(\mathcal{A})$:** Sei $Z_0 \dots Z_n$ ein akzeptierender Lauf in $\mathcal{B}$. Wähle $q_n \in Z_n \cap F_A$ (Definition von $F_B$) und rückwärts $q_i \in Z_i$ mit $q_{i+1} \in \delta_A(q_i, w_{i+1})$ (Definition von $\delta_B$). Das ist ein akzeptierender Lauf in $\mathcal{A}$.`,
      note: r`Folge: NFAs erkennen genau die regulären Sprachen – Nichtdeterminismus macht endliche Automaten nicht mächtiger, nur bequemer.`,
    },
    {
      id: 'potenzmengenkonstruktion',
      title: 'Potenzmengenkonstruktion (Verfahren)',
      ref: '02b · Potenzmengenautomat',
      statement: r`1. Die **Zustände** des DFA sind alle Elemente aus $\Pot(Q)$ des NFA.

2. Der **Anfangszustand** des DFA ist der Zustand, der nur den Anfangszustand des NFA enthält: $\{q_0\}$.

3. **Akzeptierend** sind alle Zustände, in denen mindestens ein akzeptierender Zustand des NFA enthalten ist.

4. Für jeden Zustand $Z$ und jedes Symbol $e$: Ergänze die **Transition** nach $\bigcup_{q \in Z} \delta_A(q, e)$.`,
      note: r`Praktisch beginnt man bei $\{q_0\}$ und berechnet nur die Mengen, die tatsächlich auftreten – so entstehen gleich nur die erreichbaren Zustände. Gibt es für ein Symbol keinen Folgezustand, ist das Ziel $\emptyset$.`,
    },
    {
      id: 'workflow',
      title: 'Vom NFA zum DFA: Idee, Nutzen und Preis',
      ref: '02b · Vom NFA zum DFA',
      statement: r`- Wortproblem im **NFA**: erfordert Backtracking (Aufwand). Dafür sind NFAs einfach zu konstruieren.
- Wortproblem im **DFA**: effizient, tabellengesteuert. Dafür sind DFAs weniger einfach zu konstruieren.

**Idee:** (1) Sprache als NFA spezifizieren (einfach). (2) NFA in äquivalenten DFA umwandeln (automatisiert). (3) Wortproblem im DFA lösen (einfach).

**Nachteil:** Hat der NFA $n$ Zustände, kann der äquivalente DFA bis zu $2^n$ Zustände haben.`,
      note: r`$|\Pot(Q)| = 2^{|Q|}$. In der Praxis sind viele dieser Mengen unerreichbar.`,
    },
  ],
  claims: [
    {
      id: 'ein-lauf-genuegt',
      statement: r`Ein NFA akzeptiert ein Wort, sobald es mindestens einen akzeptierenden Lauf dafür gibt.`,
      holds: true,
      reason: r`Die Sprache eines NFA umfasst alle Worte, für die ein akzeptierender Lauf **existiert**. Andere, scheiternde Läufe sind unerheblich.`,
    },
    {
      id: 'alle-laeufe',
      statement: r`Ein NFA akzeptiert ein Wort nur, wenn alle möglichen Läufe für das Wort akzeptierend enden.`,
      holds: false,
      reason: r`Einer genügt. Abgelehnt wird nur, wenn **kein** Lauf akzeptierend endet.`,
    },
    {
      id: 'nfa-maechtiger',
      statement: r`Es gibt Sprachen, die ein NFA erkennt, aber kein DFA.`,
      holds: false,
      reason: r`Zu jedem NFA gibt es einen äquivalenten DFA (Potenzmengenautomat). Beide erkennen genau die regulären Sprachen.`,
    },
    {
      id: 'dfa-ist-nfa',
      statement: r`Jeder DFA ist auch ein NFA.`,
      holds: true,
      reason: r`„Genau eine Transition je Zustand und Symbol“ ist im NFA erlaubt. Formal: Zustände in einelementige Mengen verpacken.`,
    },
    {
      id: 'fehlende-transition',
      statement: r`In einem NFA muss von jedem Zustand für jedes Symbol mindestens eine Transition ausgehen.`,
      holds: false,
      reason: r`$\delta(q, a) = \emptyset$ ist erlaubt. Der Lauf endet dann dort, ohne zu akzeptieren – ein Fangzustand ist nicht nötig.`,
    },
    {
      id: 'zwei-hoch-n',
      statement: r`Der Potenzmengenautomat eines NFA mit 4 Zuständen hat (ohne Vereinfachung) 8 Zustände.`,
      holds: false,
      reason: r`$|\Pot(Q)| = 2^4 = 16$. Der DFA kann bis zu $2^n$ Zustände haben, nicht $2n$.`,
    },
    {
      id: 'akzeptierend-potenz',
      statement: r`Im Potenzmengenautomaten ist eine Zustandsmenge nur dann akzeptierend, wenn alle enthaltenen NFA-Zustände akzeptierend sind.`,
      holds: false,
      reason: r`Es genügt **mindestens ein** akzeptierender NFA-Zustand: $F_B = \{Z \mid Z \cap F_A \ne \emptyset\}$.`,
    },
    {
      id: 'anfang-potenz',
      statement: r`Der Anfangszustand des Potenzmengenautomaten ist $\{q_0\}$.`,
      holds: true,
      reason: r`Die Menge, die nur den Anfangszustand des NFA enthält – vor dem ersten Zeichen kann der NFA nirgends sonst sein.`,
    },
    {
      id: 'leere-menge-zustand',
      statement: r`Die leere Menge kann ein Zustand des Potenzmengenautomaten sein und wirkt dort als Fangzustand.`,
      holds: true,
      reason: r`$\delta_B(\emptyset, e) = \emptyset$ für jedes Symbol, und $\emptyset \cap F_A = \emptyset$: nicht akzeptierend, nicht verlassbar.`,
    },
    {
      id: 'komplement-nfa',
      statement: r`Vertauscht man in einem NFA akzeptierende und nicht akzeptierende Zustände, erkennt er die Komplementsprache.`,
      holds: false,
      reason: r`Das klappt nur beim DFA. Im NFA kann ein Wort sowohl akzeptierende als auch nicht akzeptierende Läufe haben – es würde dann vorher und nachher akzeptiert. Erst in einen DFA umwandeln.`,
    },
  ],
  problems: [
    {
      id: 'potenzmenge-vorletztes',
      title: 'Potenzmengenkonstruktion: vorletztes Zeichen ist 1',
      source: 'nach 02b · Potenzmengenkonstruktion',
      points: 8,
      task: r`Der NFA über $\{0, 1\}$ erkennt alle Worte, deren **vorletztes** Zeichen eine 1 ist ($F = \{q_2\}$):

~~~
        0        1
→ q0    {q0}     {q0,q1}
  q1    {q2}     {q2}
* q2    {}       {}
~~~

Konstruiere den äquivalenten DFA (nur erreichbare Zustände). Prüfe das Wort $0110$ mit Zustandsmengen.`,
      solution: r`Start bei $\{q_0\}$, für jede neue Menge beide Symbole auswerten:

~~~
               0           1
→ {q0}         {q0}        {q0,q1}
  {q0,q1}      {q0,q2}     {q0,q1,q2}
* {q0,q2}      {q0}        {q0,q1}
* {q0,q1,q2}   {q0,q2}     {q0,q1,q2}
~~~

Akzeptierend sind die Mengen, die $q_2$ enthalten. Von 8 möglichen Zustandsmengen sind nur 4 erreichbar.

$0110$: $\{q_0\} \xrightarrow{0} \{q_0\} \xrightarrow{1} \{q_0, q_1\} \xrightarrow{1} \{q_0, q_1, q_2\} \xrightarrow{0} \{q_0, q_2\}$ – enthält $q_2$, also akzeptiert (vorletztes Zeichen ist 1).`,
    },
    {
      id: 'nfa-zu-dfa-ac',
      title: 'NFA in DFA umwandeln',
      source: 'nach Übung 3 · Aufgabe 2',
      points: 8,
      task: r`Sei $\Sigma = \{a, b, c\}$. Der NFA $\mathcal{A}_3$ erkennt $L_3$ = @@[abc]*ac+@@:

~~~
        a          b       c
→ q0    {q0,q1}    {q0}    {q0}
  q1    {}         {}      {q2}
* q2    {}         {}      {q2}
~~~

Konstruiere mittels Potenzmengenkonstruktion einen DFA für $L_3$.`,
      solution: r`~~~
             a          b       c
→ {q0}       {q0,q1}    {q0}    {q0}
  {q0,q1}    {q0,q1}    {q0}    {q0,q2}
* {q0,q2}    {q0,q1}    {q0}    {q0,q2}
~~~

Nur drei der acht Zustandsmengen sind erreichbar. Der DFA ist isomorph zum Automaten $\mathcal{A}_1$ aus Übung 2 ($q_1 \mathrel{\hat=} \{q_0\}$, $q_2 \mathrel{\hat=} \{q_0, q_1\}$, $q_3 \mathrel{\hat=} \{q_0, q_2\}$).`,
    },
    {
      id: 'nfa-bauen',
      title: 'NFAs konstruieren',
      source: 'nach Übung 3 · Hausaufgabe',
      points: 6,
      task: r`- (a) $L_4$ über $\Sigma = \{a, b, m, n, t, u, v, w, x, y, z\}$ enthält nur das Wort $batman$. Gib einen NFA an. Warum ist er einfacher als ein DFA?
- (b) $L_5$ über $\{a, m, n, t\}$ wird durch @@(na)*natman@@ beschrieben. Gib einen NFA an.`,
      solution: r`**(a)** Sieben Zustände in einer Kette, $q_6$ akzeptierend, sonst **keine** Transitionen:

$$q_0 \xrightarrow{b} q_1 \xrightarrow{a} q_2 \xrightarrow{t} q_3 \xrightarrow{m} q_4 \xrightarrow{a} q_5 \xrightarrow{n} q_6$$

Ein DFA bräuchte an jedem Zustand Transitionen für alle 11 Symbole, fast alle in einen Fangzustand.

**(b)** Schleife für $(na)^*$ am Anfang, dann die Kette für $natman$:

~~~
        n          a       t       m
→ q0    {q0',q1}   {}      {}      {}
  q0'   {}         {q0}    {}      {}
  q1    {}         {q2}    {}      {}
  q2    {}         {}      {q3}    {}
  q3    {}         {}      {}      {q4}
  q4    {}         {q5}    {}      {}
  q5    {q6}       {}      {}      {}
* q6    {}         {}      {}      {}
~~~

In $q_0$ gibt es zwei Transitionen für $n$: zurück in die Schleife ($q_0'$) oder in die Kette ($q_1$). Der NFA „rät“, ob das aktuelle $na$ noch zum Vorspann gehört.`,
    },
    {
      id: 'tante-lauf',
      title: 'Tantenautomat: Zustandsmengen verfolgen',
      source: 'nach 02b · Lauf im NFA mit Zustandsmengen statt Backtracking',
      points: 6,
      task: r`Tantenautomat über $\{a, e, n, t\}$: Schleife mit allen Symbolen an $q_0$; $q_0 \xrightarrow{t} q_1 \xrightarrow{a} q_2 \xrightarrow{n} q_3 \xrightarrow{t} q_4 \xrightarrow{e} q_5$; Schleife mit allen Symbolen an $q_5$; $F = \{q_5\}$.

Verfolge für das Wort $tantante$ die Zustandsmengen. Wird es akzeptiert?`,
      solution: r`~~~
gelesen     Zustandsmenge
(Start)     {q0}
t           {q0,q1}
a           {q0,q2}
n           {q0,q3}
t           {q0,q1,q4}
a           {q0,q2}        q4 hat kein a: dieser Lauf endet
n           {q0,q3}
t           {q0,q1,q4}
e           {q0,q5}
~~~

Die letzte Menge enthält $q_5 \in F$ → **akzeptiert**. Beim zweiten $t$ ist der NFA gleichzeitig „im zweiten t einer Tante“ ($q_4$) und „am Beginn einer neuen Tante“ ($q_1$) – genau die Mehrdeutigkeit, die den DFA schwierig macht.`,
    },
    {
      id: 'zwei-nfas',
      title: 'Zwei NFAs für dieselbe Sprache',
      source: 'nach Übung 3 · Aufgabe 1',
      points: 4,
      task: r`Konstruiere für $L_1$ (alle Worte über $\{a, b, c\}$, die mit $c$ beginnen) zwei verschiedene NFAs. Worauf musst du achten?`,
      solution: r`**NFA 1:** Der DFA aus Übung 2 ist bereits ein NFA (jeder DFA ist ein NFA).

**NFA 2:** Ohne Fangzustand – nur $q_0 \xrightarrow{c} q_1$ und eine Schleife mit $a, b, c$ an $q_1$ (akzeptierend). Für $a$ und $b$ gibt es in $q_0$ keine Transition.

**Zu beachten:** Auch ein NFA darf nur Worte der Sprache akzeptieren. Worte außerhalb enden entweder in einem nicht akzeptierenden Zustand oder in einer Situation, in der für das nächste Symbol keine Transition existiert. Legitim sind auch eine nicht minimale Variante des DFA oder eine zusätzliche Transition, die die Sprache nicht ändert.`,
    },
  ],
});
