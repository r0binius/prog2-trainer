import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02c, first part: the Chomsky hierarchy, grammars, regular and context-free grammars. */
export const grammatiken = topic({
  id: 'grammatiken',
  chapter: '02c',
  title: 'Grammatiken und kontextfreie Sprachen',
  summary:
    'Chomsky-Hierarchie, Grammatik als Quadrupel, Satzform, Ableitung, reguläre und CF-Grammatiken.',
  definitions: [
    {
      id: 'chomsky-hierarchie',
      title: 'Chomsky-Hierarchie formaler Sprachen',
      ref: '02c · Chomsky-Hierarchie formaler Sprachen',
      statement: r`Von innen nach außen, jede Klasse enthält die vorige:

- **Typ 3 – reguläre Sprachen:** reguläre Ausdrücke, DFA, NFA. Beispiel $\{a^n\}$
- **Typ 2 – kontextfreie Sprachen:** CF-Grammatiken, (N)PDA. Beispiel $\{a^n b^n\}$
- **Typ 1 – kontextabhängige Sprachen:** CS-Grammatiken, LBA. Beispiel $\{a^n b^n c^n\}$
- **Typ 0 – entscheidbare + aufzählbare Sprachen:** allgemeine Grammatiken, (ND)TM. Beispiel $\{a^{2^n}\}$
- **beliebige Sprachen:** nicht algorithmisch formulierbar`,
      note: r`Merkhilfe: Je höher die Typnummer, desto **eingeschränkter** die Grammatik und desto **einfacher** die Maschine. Die Beispiele liegen jeweils in ihrer Klasse, aber nicht in der nächstkleineren.`,
    },
    {
      id: 'syntax-semantik',
      title: 'Syntax und Semantik',
      ref: '02c · Formale Grammatiken',
      statement: r`Grammatiken beschreiben die **Syntax** (Struktur) von Sprachen, nicht die **Semantik** (Bedeutung).

- syntaktisch falsch: „gestohlen der. hat Gans Fuchs die“
- syntaktisch richtig, semantisch falsch: „Die Gans hat den Fuchs gestohlen.“
- syntaktisch und semantisch richtig: „Der Fuchs hat die Gans gestohlen.“

Im Kontext formaler Sprachen geht es nur um die syntaktische Beschreibung.`,
    },
    {
      id: 'grammatik',
      title: 'Grammatik',
      ref: '02c · Grammatiken',
      statement: r`Eine **Grammatik** ist ein Quadrupel $G = (V, T, P, S)$ mit $T \cap V = \emptyset$.

- $V$ – Menge von **Variablen** (auch Nonterminale)
- $T$ – Alphabet aus **Terminalen** (auch Token)
- $P \subseteq V \times (T \cup V)^*$ – **Produktionen** (auch Regeln), Schreibweise $A \to \alpha$ für $(A, \alpha) \in P$
- $S \in V$ – **Startvariable**`,
      note: r`Mit einer Grammatik **erzeugt** man Worte (Ableitungen); alle ableitbaren Worte bilden $L(G)$. Umgekehrt prüft man beim Wortproblem, ob sich ein Wort mit der Grammatik zerlegen lässt. Mehrere Regeln mit gleicher linker Seite fasst man zusammen: $B \to 0 \mid 1 \mid 0B \mid 1B$.`,
    },
    {
      id: 'satzform',
      title: 'Satzform und Ableitung',
      ref: '02c · Satzformen und Ableitungen',
      statement: r`Eine Mischung aus Variablen und Terminalen, also ein Element von $(V \cup T)^*$, nennt man **Satzform**.

Eine Produktion $B \to \beta$ erlaubt es, in einer Satzform $\alpha B \gamma$ an einer Stelle die Variable $B$ durch $\beta$ zu ersetzen:

$$\alpha B \gamma \Rightarrow \alpha \beta \gamma$$

$\sigma \Rightarrow^* \tau$, falls es Satzformen $\alpha_1, \dots, \alpha_n$ gibt mit $\sigma = \alpha_1 \Rightarrow \alpha_2 \Rightarrow \dots \Rightarrow \alpha_n = \tau$.`,
      note: r`Zwei Pfeile auseinanderhalten: $\to$ steht in **Produktionen** (Regeln der Grammatik), $\Rightarrow$ ist ein **Ableitungsschritt** (Anwendung einer Regel), $\Rightarrow^*$ sind beliebig viele Schritte.`,
    },
    {
      id: 'sprache-grammatik',
      title: 'Sprache einer Grammatik',
      ref: '02c · Sprache einer Grammatik',
      statement: r`Ist $G = (V, T, P, S)$ eine Grammatik, so ist

$$L(G) = \{w \in T^* \mid S \Rightarrow^* w\}$$

die **von $G$ erzeugte Sprache**: alle Satzformen, die nur aus Terminalen bestehen und ausgehend von der Startvariablen abgeleitet werden können.`,
    },
    {
      id: 'ableitungsgraph',
      title: 'Ableitungsgraph',
      ref: '02c · Beispiel: Binärzahlen',
      statement: r`Der **Ableitungsgraph** (Ableitungsbaum) stellt eine Ableitung dar: Wurzel ist die Startvariable; die Kinder eines Variablen-Knotens sind die Symbole der rechten Seite der angewendeten Produktion.

Traversiert man den Ableitungsgraphen mittels **Tiefensuche**, ergeben die **Blätter von links nach rechts** das abgeleitete Wort.`,
    },
    {
      id: 'regulaere-grammatik',
      title: 'Rechtsreguläre (reguläre) Grammatik',
      ref: '02c · Grammatiken für reguläre Sprachen',
      statement: r`Eine **rechtsreguläre Grammatik** ist eine Grammatik $G = (V, T, P, S)$, für deren Produktionen gilt:

- Links vom Pfeil steht **exakt eine Variable**.
- Rechts vom Pfeil steht entweder das leere Wort $\epsilon$ oder **ein oder mehrere Terminale, gefolgt von einer oder keiner Variablen**.`,
      note: r`Übersichtsform: $A \to tB$. Analog **linksregulär**: Die eine Variable steht links vor den Terminalen. Reguläre Grammatiken beschreiben genau die regulären Sprachen (Typ 3).`,
    },
    {
      id: 'cf-grammatik',
      title: 'Kontextfreie Grammatik und kontextfreie Sprache',
      ref: '02c · CF-Grammatiken',
      statement: r`Eine **kontextfreie Grammatik** (context-free grammar, CF-Grammatik) ist eine Grammatik $G = (V, T, P, S)$, für deren Produktionen gilt:

- Links vom Pfeil steht **exakt eine Variable**.
- Rechts vom Pfeil darf eine **beliebige Satzform** stehen.

Eine Sprache $\cL \subseteq T^*$ heißt **kontextfrei**, falls es eine kontextfreie Grammatik $G$ gibt mit $\cL = L(G)$.`,
      note: r`Unterschied zur regulären Grammatik: rechts beliebige Mischungen aus Terminalen und **mehreren** Variablen. „Kontextfrei“: Die Variable wird ersetzt, egal was um sie herum steht.`,
    },
    {
      id: 'aequivalenz',
      title: 'Äquivalente Grammatiken',
      ref: '02c · Äquivalenz',
      statement: r`Zwei Grammatiken $G_1$ und $G_2$ heißen **äquivalent**, falls $L(G_1) = L(G_2)$.`,
      note: r`Beispiel: $G_1$ mit $S \to S + S \mid 1$ und $G_2$ mit $S \to S + 1 \mid 1$ erzeugen beide @@1(\+1)*@@.`,
    },
  ],
  theorems: [
    {
      id: 'g-binary',
      title: 'Beispielgrammatik: Binärzahlen',
      ref: '02c · Beispiel: Binärzahlen',
      statement: r`Alle Binärzahlen mit mindestens einer Ziffer, @@(0|1){1,}@@:

$G_{binary} = (V, T, P, S)$ mit $V = \{B\}$, $T = \{0, 1\}$, $S = B$ und

$$B \to 0 \mid 1 \mid 0B \mid 1B$$

Ableitung von $101$: $B \Rightarrow 1B \Rightarrow 10B \Rightarrow 101$ (Regeln $B \to 1B$, $B \to 0B$, $B \to 1$).`,
      note: r`In jedem Ableitungsschritt wird eine Variable gemäß einer Produktion ersetzt. Diese Grammatik ist rechtsregulär.`,
    },
    {
      id: 'g-bininteger',
      title: 'Reguläre Grammatik für BinInteger',
      ref: '02c · Reguläre Grammatik für die Sprache BinInteger',
      statement: r`Gültige Integer in Binärschreibweise, @@[+-]?(0|1(0|1)*)@@: optionales Vorzeichen, keine führenden Nullen.

$V = \{S, X, Y\}$, $T = \{0, 1, +, -\}$, Startvariable $S$:

~~~
S → 0 | 1Y | +X | -X
X → 0 | 1Y
Y → 0Y | 1Y | ε
~~~

Ableitung von $+1010$: $S \Rightarrow +X \Rightarrow +1Y \Rightarrow +10Y \Rightarrow +101Y \Rightarrow +1010Y \Rightarrow +1010$.`,
      note: r`Die Variablen entsprechen Zuständen eines Automaten: $S$ = Anfang, $X$ = nach dem Vorzeichen, $Y$ = nach der führenden 1. Jede Regel $A \to tB$ ist eine Transition.`,
    },
    {
      id: 'g-anbn',
      title: 'CF-Grammatik für aⁿbⁿ',
      ref: '02c · CF-Grammatik für aⁿbⁿ',
      statement: r`$\cL_{a^n b^n} = \{a^n b^n \mid n \ge 0\}$ ist eine kontextfreie Sprache: $V = \{S\}$, $T = \{a, b\}$,

$$S \to aSb \mid \epsilon$$

Ableitung von $aabb$: $S \Rightarrow aSb \Rightarrow aaSbb \Rightarrow aabb$.`,
      note: r`Die Regel $aSb$ erzeugt $a$ und $b$ **gleichzeitig** – so bleibt die Anzahl gleich, ohne zu zählen. Die Variable in der Mitte ist genau das, was eine reguläre Grammatik nicht darf.`,
    },
    {
      id: 'g-dyck',
      title: 'CF-Grammatik für die Dyck-Sprache',
      ref: '02c · CF-Grammatik für die Dyck-Sprache',
      statement: r`$\cL_{DYCK}$ ist eine kontextfreie Sprache: $V = \{S\}$, $T = \{(, )\}$,

$$S \to (S) \mid SS \mid \epsilon$$

- $(S)$ – ein Klammerpaar um einen wohlgeformten Ausdruck
- $SS$ – zwei wohlgeformte Ausdrücke hintereinander
- $\epsilon$ – der leere Ausdruck`,
      note: r`Schachtelung kommt von $(S)$, Aneinanderreihung von $SS$. Die Folien leiten damit $((())())$ ab.`,
    },
    {
      id: 'regulaer-in-cf',
      title: 'Nicht jede Sprache ist regulär – aber jede reguläre ist kontextfrei',
      ref: '02c · Kontextfreie Sprachen',
      statement: r`- Nicht jede Sprache kann durch einen regulären Ausdruck, einen DFA/NFA oder eine reguläre Grammatik beschrieben werden (Beispiel $a^n b^n$).
- Ändert man die Art, wie Produktionen aussehen dürfen, erhält man **kontextfreie Grammatiken**.
- Jede reguläre Grammatik erfüllt die Bedingungen einer CF-Grammatik (links eine Variable, rechts eine Satzform). Also ist jede reguläre Sprache auch kontextfrei.`,
    },
  ],
  claims: [
    {
      id: 'typ3-in-typ2',
      statement: r`Jede reguläre Sprache ist auch kontextfrei.`,
      holds: true,
      reason: r`Typ 3 ⊂ Typ 2 in der Chomsky-Hierarchie: Jede reguläre Grammatik ist eine spezielle CF-Grammatik.`,
    },
    {
      id: 'anbn-regulaere-grammatik',
      statement: r`Die Grammatik $S \to aSb \mid \epsilon$ ist rechtsregulär.`,
      holds: false,
      reason: r`In $aSb$ steht nach der Variablen noch ein Terminal. Rechtsregulär erlaubt nur Terminale, gefolgt von höchstens einer Variablen am Ende.`,
    },
    {
      id: 'v-t-disjunkt',
      statement: r`In einer Grammatik dürfen Variablen und Terminale gemeinsame Elemente haben.`,
      holds: false,
      reason: r`Es wird $T \cap V = \emptyset$ verlangt – sonst wäre unklar, was noch ersetzt werden darf.`,
    },
    {
      id: 'sprache-nur-terminale',
      statement: r`Zu $L(G)$ gehören nur Satzformen, die ausschließlich aus Terminalen bestehen.`,
      holds: true,
      reason: r`$L(G) = \{w \in T^* \mid S \Rightarrow^* w\}$. Satzformen mit Variablen sind nur Zwischenschritte.`,
    },
    {
      id: 'semantik',
      statement: r`Eine Grammatik stellt sicher, dass die erzeugten Sätze auch sinnvoll sind.`,
      holds: false,
      reason: r`Grammatiken beschreiben nur die Syntax. „Die Gans hat den Fuchs gestohlen.“ ist syntaktisch richtig, semantisch falsch.`,
    },
    {
      id: 'cf-links',
      statement: r`In einer kontextfreien Grammatik steht links vom Pfeil immer genau eine Variable.`,
      holds: true,
      reason: r`Das ist die definierende Bedingung. Erst bei CS-Grammatiken steht links eine Satzform mit Kontext.`,
    },
    {
      id: 'dyck-cf',
      statement: r`Die Dyck-Sprache ist kontextfrei, aber nicht regulär.`,
      holds: true,
      reason: r`Kontextfrei durch $S \to (S) \mid SS \mid \epsilon$; nicht regulär nach dem Nerode-Lemma (unendlich viele trennbare Präfixe $(^n$).`,
    },
    {
      id: 'aequivalent-gleich',
      statement: r`Zwei äquivalente Grammatiken haben dieselben Produktionen.`,
      holds: false,
      reason: r`Äquivalent heißt nur $L(G_1) = L(G_2)$. $S \to S + S \mid 1$ und $S \to S + 1 \mid 1$ sind verschieden, aber äquivalent.`,
    },
    {
      id: 'blaetter',
      statement: r`Im Ableitungsgraphen ergeben die Blätter von links nach rechts gelesen das abgeleitete Wort.`,
      holds: true,
      reason: r`Tiefensuche über den Graphen liefert die Blätter in dieser Reihenfolge (leere Blätter $\epsilon$ tragen nichts bei).`,
    },
    {
      id: 'typ-maschine',
      statement: r`Kontextfreie Sprachen werden von DFAs erkannt, reguläre von Kellerautomaten.`,
      holds: false,
      reason: r`Umgekehrt: Reguläre Sprachen ↔ DFA/NFA, kontextfreie ↔ (N)PDA. (Ein PDA kann natürlich auch reguläre Sprachen.)`,
    },
  ],
  problems: [
    {
      id: 'ableiten',
      title: 'Ableitungen angeben',
      source: 'nach 02c · Reguläre Grammatik für die Sprache BinInteger',
      points: 5,
      task: r`Gegeben die BinInteger-Grammatik:

~~~
S → 0 | 1Y | +X | -X
X → 0 | 1Y
Y → 0Y | 1Y | ε
~~~

- (a) Leite $-110$ ab und nenne in jedem Schritt die Regel.
- (b) Warum ist $+01$ nicht ableitbar?
- (c) Von welchem Typ ist die Grammatik?`,
      solution: r`**(a)**

~~~
S ⇒ -X       S → -X
  ⇒ -1Y      X → 1Y
  ⇒ -11Y     Y → 1Y
  ⇒ -110Y    Y → 0Y
  ⇒ -110     Y → ε
~~~

**(b)** Nach $+X$ gibt es für $X$ nur $0$ (dann ist das Wort zu Ende) oder $1Y$. Eine 0 gefolgt von weiteren Ziffern ist nicht erzeugbar – keine führenden Nullen.

**(c)** Rechtsregulär (Typ 3): links je eine Variable, rechts Terminale gefolgt von höchstens einer Variablen, oder $\epsilon$.`,
    },
    {
      id: 'dyck-ableiten',
      title: 'Ableitung in der Dyck-Grammatik',
      source: 'nach 02c · CF-Grammatik für die Dyck-Sprache',
      points: 5,
      task: r`Leite mit $S \to (S) \mid SS \mid \epsilon$ das Wort $(())()$ ab und skizziere den Ableitungsgraphen.`,
      solution: r`~~~
S ⇒ SS            S → SS
  ⇒ (S)S          S → (S)
  ⇒ ((S))S        S → (S)
  ⇒ (())S         S → ε
  ⇒ (())(S)       S → (S)
  ⇒ (())()        S → ε
~~~

Ableitungsgraph:

~~~
            S
        ┌───┴────┐
        S        S
      ┌─┼─┐    ┌─┼─┐
      ( S )    ( S )
      ┌─┼─┐      │
      ( S )      ε
        │
        ε
~~~

Blätter von links nach rechts: $( ( \epsilon ) ) ( \epsilon )$ = $(())()$.`,
    },
    {
      id: 'grammatik-finden',
      title: 'Grammatiken entwerfen',
      source: 'nach Übung 4 · Hausaufgabe',
      points: 6,
      task: r`Gib jeweils eine Grammatik an und nenne ihren Typ.

- (a) $\{a^n b^n c^m \mid n, m \ge 1\}$
- (b) Alle Worte über $\{a, b, c\}$, die mit $c$ beginnen.
- (c) Palindrome gerader Länge über $\{a, b\}$: $\{w w^R\}$.`,
      solution: r`**(a)** Kontextfrei (Typ 2):

~~~
S → AB
A → ab | aAb
B → c | cB
~~~

$A$ erzeugt $a^n b^n$, $B$ erzeugt $c^m$.

**(b)** Rechtsregulär (Typ 3):

~~~
S → cX
X → aX | bX | cX | ε
~~~

**(c)** Kontextfrei (Typ 2):

~~~
S → aSa | bSb | ε
~~~

Die Sprache ist nicht regulär (Pumping-Lemma), eine reguläre Grammatik kann es also nicht geben.`,
    },
    {
      id: 'typ-bestimmen',
      title: 'Grammatiktyp bestimmen',
      source: 'nach 02c · Grammatiken für reguläre Sprachen / CF-Grammatiken',
      points: 4,
      task: r`Welche der Regelmengen sind rechtsregulär, welche nur kontextfrei?

- (a) $S \to aS \mid b$
- (b) $S \to Sa \mid b$
- (c) $S \to aSb \mid ab$
- (d) $S \to abS \mid \epsilon$
- (e) $S \to AB,\ A \to a,\ B \to b$`,
      solution: r`- **(a)** rechtsregulär: Terminal, dann eine Variable.
- **(b)** nicht rechtsregulär (die Variable steht **vor** dem Terminal) – das ist **linksregulär**; kontextfrei ist es ohnehin.
- **(c)** nur kontextfrei: nach der Variablen folgt noch ein Terminal.
- **(d)** rechtsregulär: **mehrere** Terminale gefolgt von einer Variablen sind erlaubt, $\epsilon$ auch.
- **(e)** nur kontextfrei der Form nach: $AB$ hat zwei Variablen. (Die erzeugte Sprache $\{ab\}$ ist trotzdem regulär – der Typ der Grammatik und der Typ der Sprache sind zweierlei.)`,
    },
  ],
});
