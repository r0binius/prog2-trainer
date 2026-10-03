import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02a, third part: non-regular languages, Nerode and pumping proofs, automata with output. */
export const grenzen = topic({
  id: 'grenzen',
  chapter: '02a',
  title: 'Grenzen regulärer Sprachen',
  summary:
    'Nicht reguläre Sprachen, Widerspruchsbeweise mit Nerode- und Pumping-Lemma, Mealy, Moore, Scanner.',
  definitions: [
    {
      id: 'intuition',
      title: 'Intuition: Was ein DFA sich „merken“ kann',
      ref: '02a · Intuition',
      statement: r`- Ein DFA „weiß“, in welchem Zustand er sich befindet.
- Ein DFA „erinnert“ sich **nicht**, wieso er in diesem Zustand ist: Er kann nicht auf bereits gelesene Symbole zugreifen.
- Der Zustand $q$ ist die **einzige Information**, die sich ein DFA merken kann.
- Führen zwei verschiedene Pfade nach $q$, kann der DFA sie nachträglich nicht mehr unterscheiden: Aus $\delta^*(q_0, w_1) = \delta^*(q_0, w_2)$ folgt $\delta^*(q_0, w_1 v) = \delta^*(q_0, w_2 v)$ für jedes $v$.

DFAs können sich also nur **endlich viele** Informationen merken.`,
      note: r`Als Anfangsverdacht: Muss ein Automat unbeschränkt **zählen** oder sich beliebig viel merken ($a^n b^n$, Dyck-Sprache, $a^{n \cdot n}$), ist die Sprache vermutlich nicht regulär. Ein Verdacht ist aber kein Beweis.`,
    },
    {
      id: 'zerlegung',
      title: 'Zyklus im Lauf und Zerlegung w = xyz',
      ref: '02a · Läufe langer Worte in kurzen Automaten',
      statement: r`Sei $\mathcal{A}$ ein DFA mit $k$ Zuständen. Jeder Lauf für ein „langes“ Wort mit $|w| \ge k$ hat irgendwo **mindestens einen Zyklus**: Ein Wort mit $k$ Symbolen besucht $k + 1$ Zustände, also muss ein Zustand mehrfach besucht werden.

$w$ lässt sich zerlegen in $w = xyz$ mit $|xy| \le k$ und $|y| \ge 1$:

- $x$ – der Teil vor Beginn des (ersten) Zyklus
- $y$ – der Zyklus
- $z$ – der Rest des Wortes`,
      note: r`Schubfachprinzip: $k + 1$ besuchte Zustände, aber nur $k$ verschiedene vorhanden.`,
    },
    {
      id: 'pumpen',
      title: 'Aufpumpen und Abpumpen',
      ref: '02a · Pumping-Lemma',
      statement: r`Der Zyklus $y$ kann beliebig oft durchlaufen werden, ohne dass sich die Zugehörigkeit zur Sprache ändert.

- **Aufpumpen:** $y$ wiederholen, $x y^n z$ mit $n > 1$
- **Abpumpen:** auf $y$ verzichten, $n = 0$, also $xz$`,
    },
    {
      id: 'akzeptor-transducer',
      title: 'Akzeptor und Transducer',
      ref: '02a · Automaten mit Ausgabe',
      statement: r`- **Akzeptoren** erkennen, ob ein Wort in einer Sprache liegt oder nicht.
- **Transducer** haben eine komplexere Ausgabe: Sie erzeugen ein Wort über einem zweiten Alphabet.

Transducer erweitern Akzeptoren um ein **Ausgabealphabet** $\Gamma$ und eine **Ausgabefunktion** $\gamma$.`,
    },
    {
      id: 'mealy-moore',
      title: 'Mealy-Automat und Moore-Automat',
      ref: '02a · Automaten mit Ausgabe',
      statement: r`Beide haben $\delta: Q \times \Sigma \to Q$.

- **Mealy-Automat:** $\gamma: Q \times \Sigma \to \Gamma$ – erzeugt in jeder **Transition** ein Symbol des Ausgabewortes (Kantenbeschriftung $a / x$).
- **Moore-Automat:** $\gamma: Q \to \Gamma$ – erzeugt in jedem **Zustand** ein Symbol des Ausgabewortes.`,
      note: r`Merkhilfe: Bei Mealy hängt die Ausgabe von Zustand **und** Eingabe ab, bei Moore nur vom Zustand.`,
    },
    {
      id: 'scanner',
      title: 'Scanner',
      ref: '02a · Scanner',
      statement: r`**Scanner** sind Automaten, die **mehrere Sprachen** erkennen.

- Jede Sprache entspricht einer Teilmenge der akzeptierenden Zustände.
- Z. B. als Moore-Automat: In den akzeptierenden Zuständen wird ein **Token** ausgegeben, das festhält, aus welcher Sprache das erkannte Wort stammt.
- Es wird versucht, ein **möglichst langes Präfix** zu erkennen, dann wird „abgeschnitten“.`,
      note: r`Anwendung: Token in Quellcode erkennen (identifierToken, ifToken, numberToken, syntaxErrorToken) – jede Sprache beschreibt einen Begriffstyp.`,
    },
  ],
  theorems: [
    {
      id: 'nicht-jede-regulaer',
      title: 'Nicht jede Sprache ist regulär',
      ref: '02a · Nicht jede Sprache ist eine reguläre Sprache',
      statement: r`Nicht jede Sprache $\cL \subset \Sigma^*$ lässt sich durch einen regulären Ausdruck oder einen DFA beschreiben. Standardbeispiel:

$$\cL = \{a^n b^n \mid n \in \N_0\}$$

Ein Automat dafür bräuchte für jede Anzahl gelesener $a$ einen eigenen Zustand – unendlich viele Zustände, also kein **endlicher** Automat.`,
      note: r`Weitere nicht reguläre Sprachen der Folien: $\{a^i b^k \mid i \ne k\}$, die Dyck-Sprache, $\{a^{n \cdot n}\}$, $\{a^{m!}\}$.`,
    },
    {
      id: 'pumping-lemma',
      title: 'Pumping-Lemma',
      ref: '02a · Pumping-Lemma',
      statement: r`Für die Sprache $\cL$ eines endlichen Automaten gibt es eine Zahl $k$, sodass sich **jedes** Wort $w \in \cL$ mit $|w| \ge k$ zerlegen lässt in $w = xyz$, sodass

1. $0 < |y| \le |xy| \le k$

2. $\forall n \in \N_0: x y^n z \in \cL$`,
      note: r`In Worten: Jedes hinreichend lange Wort hat im **vorderen Bereich** $xy$ (höchstens $k$ Zeichen) ein **nichtleeres** Teilwort $y$, das beliebig oft wiederholt oder weggelassen werden kann. Das Lemma gilt für alle regulären Sprachen – es beweist aber nie, dass eine Sprache regulär **ist**.`,
    },
    {
      id: 'beweis-pumping',
      title: 'Widerspruchsbeweis mit dem Pumping-Lemma',
      ref: '02a · Widerspruchsbeweis mit dem Pumping-Lemma',
      statement: r`1. **Annahme:** $\cL$ ist regulär. Dann gilt das Pumping-Lemma mit einer (unbekannten) Zahl $k$.

2. **Wähle ein Wort** $w \in \cL$ mit $|w| \ge k$ – in Abhängigkeit von $k$.

3. **Betrachte alle Zerlegungen** $w = xyz$ mit $|xy| \le k$, $|y| \ge 1$: Was weiß man über $y$?

4. **Pumpe:** Zeige, dass für ein $n$ das Wort $x y^n z \notin \cL$ ist.

5. **Widerspruch** zum Pumping-Lemma → $\cL$ ist nicht regulär.`,
      note: r`Drei Hürden: $k$ ist **nicht bekannt** (also kein konkretes Wort wählen, sondern eines mit $k$ im Exponenten); Länge und Position von $y$ sind **unbekannt** (man weiß nur: innerhalb der ersten $k$ Symbole, mindestens ein Symbol); der Beweis muss für **jede** zulässige Zerlegung funktionieren.`,
    },
    {
      id: 'beweis-nerode',
      title: 'Widerspruchsbeweis mit dem Nerode-Lemma',
      ref: '02a · Widerspruchsbeweis mit dem Nerode-Lemma',
      statement: r`1. **Annahme:** $\cL$ ist regulär. Dann gibt es einen DFA, der $\cL$ erkennt.

2. Finde **unendlich viele** paarweise $\cL$-trennbare Worte: Gib die Menge an und zu je zwei Worten ein trennendes Suffix.

3. Nach dem Nerode-Lemma hat dann jeder Automat für $\cL$ mindestens unendlich viele Zustände.

4. **Widerspruch:** Ein DFA hat nur endlich viele Zustände → $\cL$ ist nicht regulär.`,
      note: r`Typische Wahl: Die Präfixe, bei denen der Automat „zählen“ müsste, z. B. $\{a^n \mid n \ge 0\}$ oder $\{(^n \mid n \ge 0\}$. Man sagt auch: $\cL$ hat unendlichen Index.`,
    },
    {
      id: 'beweis-abschluss',
      title: 'Beweis über Abschlusseigenschaften',
      ref: '02a · Geschickte Wahl des Beweisverfahrens',
      statement: r`Reguläre Sprachen sind unter **Komplement** (Komplementautomat) und **Schnitt** (Produktautomat) abgeschlossen. Daraus lässt sich ein Widerspruch bauen.

Beispiel $\cL_{diff} = \{a^n b^m \mid n \ne m\}$: Wäre $\cL_{diff}$ regulär, dann auch

$$\cL_{a^n b^n} = (\Sigma^* \setminus \cL_{diff}) \cap \{a^x b^y\}$$

- $\Sigma^* \setminus \cL_{diff}$ wäre regulär (Komplementautomat)
- $\{a^x b^y\}$ ist regulär (@@a*b*@@)
- der Schnitt wäre regulär (Produktautomat)

Aber $\cL_{a^n b^n}$ ist bekanntermaßen nicht regulär. Widerspruch.`,
      note: r`Nerode- und Pumping-Lemma eignen sich beide; oft bietet sich eines an. Für $\cL_{diff}$ ist Pumpen schwierig (man müsste genau $n = m$ treffen), Nerode einfach: $a^i$ und $a^j$ trennt $b^i$.`,
    },
  ],
  claims: [
    {
      id: 'pumping-beweist-regulaer',
      statement: r`Erfüllt eine Sprache die Aussage des Pumping-Lemmas, so ist sie regulär.`,
      holds: false,
      reason: r`Das Lemma ist nur eine **notwendige** Bedingung: regulär ⇒ pumpbar. Man kann damit nur zeigen, dass eine Sprache **nicht** regulär ist.`,
    },
    {
      id: 'k-waehlen',
      statement: r`Im Widerspruchsbeweis mit dem Pumping-Lemma darf man $k$ frei wählen, z. B. $k = 5$.`,
      holds: false,
      reason: r`$k$ ist unbekannt – es hängt vom (angenommenen) Automaten ab. Das Wort muss in Abhängigkeit von $k$ gewählt werden, z. B. $a^k b^k$.`,
    },
    {
      id: 'y-waehlen',
      statement: r`Im Widerspruchsbeweis mit dem Pumping-Lemma darf man die Zerlegung $w = xyz$ selbst festlegen.`,
      holds: false,
      reason: r`Position und Länge von $y$ sind unbekannt. Man weiß nur $|xy| \le k$ und $|y| \ge 1$ und muss für **jede** solche Zerlegung argumentieren.`,
    },
    {
      id: 'y-nichtleer',
      statement: r`Im Pumping-Lemma darf $y$ das leere Wort sein.`,
      holds: false,
      reason: r`Es gilt $0 < |y|$. Mit $y = \epsilon$ wäre die Aussage trivial und nutzlos.`,
    },
    {
      id: 'abpumpen',
      statement: r`Das Pumping-Lemma erlaubt auch $n = 0$, also das Weglassen von $y$.`,
      holds: true,
      reason: r`$\forall n \in \N_0: x y^n z \in \cL$ schließt $xz$ ein. Beim Beweis für $\{a^{m!}\}$ wird genau dieses Abpumpen verwendet.`,
    },
    {
      id: 'anbn-regulaer',
      statement: r`$\{a^n b^m \mid n, m \in \N_0\}$ ist nicht regulär.`,
      holds: false,
      reason: r`Die Anzahlen sind unabhängig: @@a*b*@@. Nicht regulär ist erst $\{a^n b^n\}$ mit **gleicher** Anzahl.`,
    },
    {
      id: 'dyck-nicht-regulaer',
      statement: r`Die Dyck-Sprache der wohlgeformten Klammerausdrücke ist nicht regulär.`,
      holds: true,
      reason: r`$\{(^n \mid n \in \N_0\}$ ist eine unendliche Menge paarweise trennbarer Worte: $)^m$ trennt $(^k$ und $(^m$ für $k \ne m$.`,
    },
    {
      id: 'zyklus',
      statement: r`In einem DFA mit $k$ Zuständen besucht der Lauf jedes Wortes der Länge $\ge k$ mindestens einen Zustand mehrfach.`,
      holds: true,
      reason: r`Ein Wort mit $k$ Symbolen besucht $k + 1$ Zustände, es gibt aber nur $k$ verschiedene.`,
    },
    {
      id: 'mealy-zustand',
      statement: r`Ein Mealy-Automat erzeugt seine Ausgabe in den Zuständen, ein Moore-Automat in den Transitionen.`,
      holds: false,
      reason: r`Umgekehrt: Mealy in jeder **Transition** ($\gamma: Q \times \Sigma \to \Gamma$), Moore in jedem **Zustand** ($\gamma: Q \to \Gamma$).`,
    },
    {
      id: 'scanner-praefix',
      statement: r`Ein Scanner versucht, ein möglichst langes Präfix zu erkennen.`,
      holds: true,
      reason: r`Erst dann wird „abgeschnitten“ und das Token ausgegeben. So wird z. B. @@if1@@ als ein Identifier erkannt und nicht als if-Token plus Zahl.`,
    },
  ],
  problems: [
    {
      id: 'anbn-pumping',
      title: 'aⁿbⁿ ist nicht regulär (Pumping-Lemma)',
      source: 'nach 02a · Nicht-Regularität von aⁿbⁿ',
      points: 8,
      task: r`Zeige mit dem Pumping-Lemma, dass $\cL = \{a^n b^n \mid n \ge 0\}$ über $\{a, b\}$ nicht regulär ist.`,
      hint: r`Wähle $w = a^k b^k$. Woraus besteht dann $xy$, woraus $y$?`,
      solution: r`**Annahme:** $\cL$ ist regulär. Dann gibt es ein $k$ wie im Pumping-Lemma.

**Wort:** $w = a^k b^k \in \cL$ mit $|w| = 2k \ge k$.

**Zerlegung:** Für jede Zerlegung $w = xyz$ mit $|xy| \le k$ besteht $xy$ **nur aus $a$**. Also ist $y = a^q$ mit $q \ge 1$.

**Pumpen:** Einmal aufpumpen ergibt $xyyz = a^{k+q} b^k$. Wegen $q \ge 1$ sind das mehr $a$ als $b$, also $xyyz \notin \cL$.

**Widerspruch** zum Pumping-Lemma. Also ist $\cL$ nicht regulär.`,
    },
    {
      id: 'anbn-nerode',
      title: 'aⁿbⁿ ist nicht regulär (Nerode-Lemma)',
      source: 'nach 02a · Weitere Beispiele',
      points: 6,
      task: r`Zeige mit dem Nerode-Lemma, dass $\cL = \{a^n b^n \mid n \ge 0\}$ nicht regulär ist.`,
      solution: r`**Annahme:** $\cL$ ist regulär, es gibt also einen DFA für $\cL$.

Die Menge $\{a^n \mid n \ge 0\}$ ist unendlich und paarweise $\cL$-trennbar: Für $i \ne j$ trennt $w = b^i$ die Worte $a^i$ und $a^j$, denn

- $a^i b^i \in \cL$, aber
- $a^j b^i \notin \cL$.

Nach dem Nerode-Lemma hätte jeder Automat für $\cL$ unendlich viele Zustände. Widerspruch: Ein DFA hat nur endlich viele. Also ist $\cL$ nicht regulär.`,
    },
    {
      id: 'dyck-nerode',
      title: 'Die Klammersprache ist nicht regulär',
      source: 'nach 02a · Nicht-Regularität der Klammersprache',
      points: 6,
      task: r`$\cL_{Dyck}$ über $\Sigma = \{(, )\}$ ist die Menge aller wohlgeformten Klammerausdrücke. Zeige mit dem Nerode-Lemma, dass es keinen DFA für $\cL_{Dyck}$ gibt.`,
      solution: r`Betrachte die unendliche Menge $\{(^n \mid n \in \N_0\} = \{\epsilon, (, ((, (((, \dots\}$.

Für alle $m \ne k$ trennt $w = )^m$ die Worte $(^k$ und $(^m$:

- $(^m )^m \in \cL_{Dyck}$
- $(^k )^m \notin \cL_{Dyck}$ (ungleich viele öffnende und schließende Klammern)

Die Worte sind also paarweise $\cL_{Dyck}$-trennbar. Nach dem Nerode-Lemma hat jeder Automat, der $\cL_{Dyck}$ erkennt, unendlich viele Zustände ⇒ es gibt keinen DFA für $\cL_{Dyck}$.`,
    },
    {
      id: 'fakultaet',
      title: 'a^(m!) ist nicht regulär',
      source: 'nach 02a · Nicht-Regularität von a^(m!)',
      points: 8,
      task: r`Sei $\cL_{fact} = \{a^{m!} \mid m \ge 3\}$ über $\Sigma = \{a\}$. Zeige mit dem Pumping-Lemma, dass $\cL_{fact}$ nicht regulär ist.`,
      hint: r`Hier hilft **Abpumpen**: Entferne $y$ und vergleiche die neue Länge mit $(k-1)!$ und $k!$.`,
      solution: r`**Annahme:** $\cL_{fact}$ ist regulär mit Pumping-Zahl $k$; o. B. d. A. $k \ge 3$.

**Wort:** $w = a^{k!} \in \cL_{fact}$, hinreichend lang: $k! \ge k$.

**Zerlegung:** $w = xyz$ mit $|y| = j$, $1 \le j \le k$.

**Abpumpen:** $xz$ hat die Länge $k! - j$. Es gilt

$$(k-1)! < k! - k \le k! - j < k!$$

(die erste Ungleichung, weil $k! - k = k \cdot ((k-1)! - 1) > (k-1)!$ für $k \ge 3$). Die Länge liegt echt zwischen zwei aufeinanderfolgenden Fakultäten, ist also selbst keine Fakultät: $xz \notin \cL_{fact}$.

**Widerspruch** zum Pumping-Lemma ⇒ $\cL_{fact}$ ist nicht regulär.`,
    },
    {
      id: 'palindrome',
      title: 'Palindrome gerader Länge',
      source: 'nach Übung 2 · Hausaufgabe 2',
      points: 8,
      task: r`Sei $\Sigma = \{a, b\}$ und $L_1 = \{w w^R \mid w \in \Sigma^*\}$ die Sprache der Palindrome gerader Länge ($w^R$ ist das Reverse von $w$, z. B. $abba \in L_1$). Zeige oder widerlege mit dem Pumping-Lemma, dass $L_1$ regulär ist.`,
      hint: r`Wähle ein Palindrom, dessen erste $k$ Zeichen alle gleich sind, mit einer „Mitte“, die sich nicht verschieben darf.`,
      solution: r`**Intuition:** Nicht regulär – der Automat müsste sich $w$ samt Reihenfolge merken.

**Annahme:** $L_1$ regulär mit Pumping-Zahl $k$.

**Wort:** Aus $a^k b$ bilde das Palindrom $v = a^k b \circ b a^k = a^k b b a^k \in L_1$, $|v| = 2k + 2 \ge k$.

**Zerlegung:** $v = xyz$ mit $|xy| \le k$. Dann besteht $xy$ ausschließlich aus $a$ (die beiden $b$ stehen erst an den Stellen $k + 1$ und $k + 2$), also $y = a^p$ mit $p \ge 1$.

**Pumpen:** $xyyz = a^{k+p} b b a^k$. Vorne stehen mehr $a$ als hinten; das Wort ist kein Palindrom mehr, also $xyyz \notin L_1$.

**Widerspruch** zum Pumping-Lemma ⇒ $L_1$ ist nicht regulär.`,
    },
    {
      id: 'albnam',
      title: 'aˡbⁿaᵐ mit l ≤ m ≤ n',
      source: 'nach Übung 2 · Aufgabe 3',
      points: 8,
      task: r`Sei $\Sigma = \{a, b\}$ und $L_1 = \{a^l b^n a^m \mid l \le m \le n\}$. Zeige oder widerlege unter Verwendung des Nerode-Lemmas, dass $L_1$ regulär ist.`,
      solution: r`**Intuition:** Nicht regulär – beim ersten $b$ müsste sich der Automat die Anzahl der $a$ gemerkt haben.

Wähle die unendliche Menge $\{a^l \mid l \ge 0\}$. Für zwei Worte $u = a^l$ und $v = a^k$ mit $k > l$ wähle das Suffix $x = b^l a^l$:

- $ux = a^l b^l a^l \in L_1$ (denn $l \le l \le l$)
- $vx = a^k b^l a^l \notin L_1$ (denn $k > l$ verletzt $k \le l$)

Je zwei verschiedene Worte der Menge sind also $L_1$-trennbar. Nach dem Nerode-Lemma bräuchte ein Automat für $L_1$ unendlich viele Zustände – in einem endlichen Automaten nicht abbildbar. $L_1$ ist **nicht regulär** (unendlicher Index).`,
    },
    {
      id: 'diff',
      title: 'aⁿbᵐ mit n ≠ m: drei Wege',
      source: 'nach 02a · Geschickte Wahl des Beweisverfahrens',
      points: 7,
      task: r`Zeige, dass $\cL_{diff} = \{a^n b^m \mid n \ne m\}$ nicht regulär ist – einmal mit dem Nerode-Lemma und einmal über Abschlusseigenschaften. Warum ist das Pumping-Lemma hier unhandlich?`,
      solution: r`**Nerode:** $\{a^n \mid n \ge 0\}$ ist unendlich und paarweise $\cL_{diff}$-trennbar: Für $i \ne j$ trennt $b^i$, denn $a^i b^i \notin \cL_{diff}$, aber $a^j b^i \in \cL_{diff}$. Also bräuchte ein Automat unendlich viele Zustände.

**Abschluss:** Wäre $\cL_{diff}$ regulär, dann auch $\Sigma^* \setminus \cL_{diff}$ (Komplementautomat) und der Schnitt mit der regulären Sprache @@a*b*@@ (Produktautomat). Dieser Schnitt ist genau $\{a^n b^n\}$ – bekanntermaßen nicht regulär. Widerspruch.

**Pumping-Lemma:** Man müsste durch Pumpen ein Wort mit **genau** $n = m$ treffen, obwohl man die Länge von $y$ nicht kennt. Das geht, ist aber schwierig.`,
    },
  ],
});
