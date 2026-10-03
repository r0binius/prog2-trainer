import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02a, second part: separable states, the quotient automaton and the Nerode lemma. */
export const minimierung = topic({
  id: 'minimierung',
  chapter: '02a',
  title: 'Minimalautomat und Nerode-Lemma',
  summary:
    'Trennbarkeit, Verhaltensgleichheit, Faktorautomat, Tabellierung, L-Trennbarkeit, Nerode-Lemma.',
  definitions: [
    {
      id: 'trennbar',
      title: 'Trennbare Zustände',
      ref: '02a · Trennbarkeit',
      statement: r`Zwei Zustände $p$ und $q$ heißen **trennbar**, wenn es ein Wort $w$ gibt mit

- $\delta^*(p, w) \in F$, aber $\delta^*(q, w) \notin F$, **oder**
- $\delta^*(p, w) \notin F$, aber $\delta^*(q, w) \in F$.`,
      note: r`Ein einziges passendes Wort genügt – egal, wie viele nicht passen. Akzeptierende und nicht akzeptierende Zustände sind immer trennbar, nämlich durch $w = \epsilon$.`,
    },
    {
      id: 'verhaltensgleich',
      title: 'Verhaltensgleiche (ununterscheidbare) Zustände',
      ref: '02a · Trennbarkeit',
      statement: r`Zwei Zustände $p$ und $q$ heißen **verhaltensgleich** oder **ununterscheidbar**, falls sie nicht trennbar sind. Man schreibt $p \sim q$.

$$p \sim q \iff \forall w \in \Sigma^*: \bigl(\delta^*(p, w) \in F \Leftrightarrow \delta^*(q, w) \in F\bigr)$$

$\sim$ ist eine **Äquivalenzrelation**.`,
      note: r`Problem beider Definitionen: Es gibt i. A. unendlich viele Worte in $\Sigma^*$, die man nicht alle prüfen kann. Die Lösung ist der Satz zu $\sim$, der auf einzelne Symbole reduziert.`,
    },
    {
      id: 'faktorautomat',
      title: 'Faktorautomat',
      ref: '02a · Faktorautomat und minimaler Automat',
      statement: r`Der **Faktorautomat** $\mathcal{A}/{\sim}$ entsteht aus $\mathcal{A}$, indem alle verhaltensgleichen Zustände zu jeweils einem Zustand **zusammengefasst** werden.

Im Faktorautomaten sind alle Zustände **paarweise trennbar**.`,
      note: r`Die Zustände des Faktorautomaten sind die Äquivalenzklassen von $\sim$. Trennbare Zustände müssen getrennt bleiben, verhaltensgleiche müssen zusammengefasst werden.`,
    },
    {
      id: 'minimaler-automat',
      title: 'Minimaler Automat',
      ref: '02a · Minimalität eines Automaten beweisen',
      statement: r`Ein DFA ist **minimal**, wenn es keinen anderen DFA mit weniger Zuständen gibt, der die gleiche Sprache erkennt.

Im minimalen Automaten sind **alle Zustände erreichbar** und **alle Zustände paarweise trennbar**.`,
      note: r`Es gibt viele minimale DFAs für eine Sprache, die jedoch alle **isomorph** sind – sie unterscheiden sich nur in den Namen der Zustände.`,
    },
    {
      id: 'l-trennbar',
      title: 'L-trennbare Worte',
      ref: '02a · L-Trennbarkeit',
      statement: r`Sei $\cL$ eine Sprache. Zwei Worte $u, v \in \Sigma^*$ heißen **$\cL$-trennbar**, falls es ein $w \in \Sigma^*$ gibt mit $uw \in \cL$, aber $vw \notin \cL$ (oder umgekehrt).`,
      note: r`Trennbarkeit von **Zuständen** bezieht sich auf einen Automaten, $\cL$-Trennbarkeit von **Worten** nur auf die Sprache. Beispiel $\cL = \{0, 010, 0110, 01110, \dots\}$: $0$ und $01$ sind trennbar mit $w = 0$ ($00 \notin \cL$, $010 \in \cL$); $01$ und $011$ sind nicht trennbar.`,
    },
  ],
  theorems: [
    {
      id: 'satz-tilde',
      title: 'Satz zu ∼ (rekursive Charakterisierung)',
      ref: '02a · Satz zu ~',
      statement: r`Für alle Zustände $p, q$ gilt:

$$p \sim q \iff (p \in F \Leftrightarrow q \in F) \ \text{ und } \ \forall a \in \Sigma: \delta(p, a) \sim \delta(q, a)$$

**Beweis „⇒“:** (1) $p \in F \Leftrightarrow \delta^*(p, \epsilon) \in F \Leftrightarrow \delta^*(q, \epsilon) \in F \Leftrightarrow q \in F$. (2) Sei $\delta^*(\delta(p, a), w) \in F$. Dann $\delta^*(p, a.w) \in F$, somit $\delta^*(q, a.w) \in F$, also $\delta^*(\delta(q, a), w) \in F$. Folglich $\delta(p, a) \sim \delta(q, a)$.

**„⇐“:** Fallunterscheidung $w = \epsilon$ und $w = a.u$.`,
      note: r`Der Satz reduziert die Prüfung unendlich vieler Worte aus $\Sigma^*$ auf die rekursive Prüfung endlich vieler **Symbole** aus $\Sigma$. Umgekehrt gelesen: Sind $\delta(p, a)$ und $\delta(q, a)$ trennbar, dann auch $p$ und $q$.`,
    },
    {
      id: 'minimierung',
      title: 'Konstruktion des minimalen Automaten',
      ref: '02a · Faktorautomat und minimaler Automat',
      statement: r`Zu jedem DFA gibt es einen äquivalenten minimalen Automaten, der die gleiche Sprache erkennt.

1. **Entferne nicht erreichbare Zustände** aus dem DFA. (Das ist einfach.)

2. **Konstruiere den Faktorautomaten** aus dem verbleibenden Automaten: Trennbarkeitsrelation tabellieren, nicht trennbare Zustände zusammenfassen.`,
      note: r`Reihenfolge beachten: erst Unerreichbares weg, dann tabellieren – sonst füllt man Tabellenzeilen für Zustände aus, die es gar nicht mehr gibt.`,
    },
    {
      id: 'tabellierung',
      title: 'Tabellierung der Trennbarkeitsrelation',
      ref: '02a · Tabellierung der Trennbarkeitsrelation',
      statement: r`Dreieckstabelle mit einem Feld je Zustandspaar; X bedeutet „getrennt“.

1. **Trenne $F$ und $Q \setminus F$.** Akzeptierende und nicht akzeptierende Zustände sind mittels $\epsilon$ trennbar.

2. **Für alle $x \in \Sigma$, für alle noch nicht getrennten Paare $(p, q)$:** Falls $\delta(p, x)$ und $\delta(q, x)$ bereits getrennt sind, trenne auch $p$ und $q$.

3. **Wiederhole** Schritt 2, bis eine Runde lang keine neuen Trennungen dazugekommen sind.

Die Felder ohne X sind die nicht trennbaren Paare: Sie werden zusammengefasst – es entsteht der Faktorautomat.`,
      note: r`Abbruchbedingung genau lesen: Erst wenn eine **komplette** Runde (alle Symbole, alle Paare) nichts Neues bringt, ist die Tabelle vollständig. Führen $\delta(p, x)$ und $\delta(q, x)$ in **denselben** Zustand, ist das kein Grund zu trennen.`,
    },
    {
      id: 'nerode-lemma',
      title: 'Nerode-Lemma',
      ref: '02a · Nerode-Lemma',
      statement: r`Sei $\cL$ eine Sprache. Gibt es $n$ Worte in $\Sigma^*$, die **paarweise $\cL$-trennbar** sind, so hat jeder Automat, der $\cL$ erkennt, **mindestens $n$ Zustände**.

**Beweis:** Seien $w_1, \dots, w_n$ paarweise $\cL$-trennbar und $\cL = \cL(\mathcal{A})$. Dann sind $\delta^*(q_0, w_1), \dots, \delta^*(q_0, w_n)$ paarweise verschieden (denn $p, q$ trennbar $\Rightarrow p \ne q$). Also hat $\mathcal{A}$ mindestens $n$ verschiedene Zustände.`,
      note: r`Das Lemma liefert eine **untere Schranke**. Zwei Anwendungen: (1) Minimalität eines DFA zeigen, (2) mit unendlich vielen paarweise trennbaren Worten zeigen, dass eine Sprache nicht regulär ist.`,
    },
    {
      id: 'minimalitaet-zeigen',
      title: 'Minimalität beweisen: zwei Wege',
      ref: '02a · Minimalität eines Automaten beweisen',
      statement: r`**Weg 1 – Minimieren:** Unerreichbare Zustände entfernen, Faktorautomat konstruieren. Ändert sich der DFA dabei nicht, war er bereits minimal.

- Vorteil: Ist er nicht minimal, kennt man danach einen bewiesen minimalen DFA.
- Nachteil: hoher Aufwand durch die Konstruktion.

**Weg 2 – Nerode-Lemma:** Für einen DFA mit $n$ Zuständen zeige (a) der DFA erkennt die Sprache und (b) es gibt $n$ paarweise $\cL$-trennbare Worte.

- Vorteil: schnelle Beweisführung.
- Nachteil: Ist der DFA nicht minimal, kennt man den minimalen nicht.`,
      note: r`Bedingung (a) nicht vergessen: Das Lemma gibt nur eine untere Schranke. Erst weil der DFA die Sprache mit genau $n$ Zuständen erkennt, ist er minimal.`,
    },
    {
      id: 'trennbare-worte-finden',
      title: 'Paarweise L-trennbare Worte in einem DFA finden',
      ref: '02a · Finden paarweise L-trennbarer Worte in einem DFA',
      statement: r`1. Suche zu **jedem Zustand** das jeweils **kürzeste Wort**, das vom Anfangszustand dorthin führt. Das sind die Kandidaten.

2. Prüfe, ob die Kandidaten tatsächlich paarweise $\cL$-trennbar sind: Gib für jedes Paar ein trennendes Wort $w$ an (Dreieckstabelle).

Gelingt das für alle Paare, ist der DFA minimal.`,
      note: r`Fehlschlag bei nicht-minimalen Automaten: Findet sich für ein Paar kein trennendes Wort (z. B. $00$ und $000$ bei $\cL_{bin}$), sind die zugehörigen Zustände nicht trennbar – der DFA ist nicht minimal.`,
    },
  ],
  claims: [
    {
      id: 'f-und-nicht-f',
      statement: r`Ein akzeptierender und ein nicht akzeptierender Zustand sind immer trennbar.`,
      holds: true,
      reason: r`Das leere Wort trennt sie: $\delta^*(p, \epsilon) = p \in F$, aber $\delta^*(q, \epsilon) = q \notin F$.`,
    },
    {
      id: 'beide-akzeptierend',
      statement: r`Zwei akzeptierende Zustände sind immer verhaltensgleich.`,
      holds: false,
      reason: r`Sie werden von $\epsilon$ nicht getrennt, aber vielleicht von einem längeren Wort. Erst die Tabellierung zeigt es.`,
    },
    {
      id: 'ein-wort-genuegt',
      statement: r`Um zwei Zustände zu trennen, genügt ein einziges trennendes Wort.`,
      holds: true,
      reason: r`Trennbar heißt: Es **gibt** ein Wort $w$, das den einen in $F$ und den anderen nicht in $F$ führt. Für Verhaltensgleichheit müssen dagegen **alle** Worte passen.`,
    },
    {
      id: 'minimal-eindeutig',
      statement: r`Zwei minimale DFAs für dieselbe Sprache sind isomorph.`,
      holds: true,
      reason: r`So sagen es die Folien: Es gibt viele minimale DFAs, die sich nur in der Benennung der Zustände unterscheiden.`,
    },
    {
      id: 'nerode-obere-schranke',
      statement: r`Findet man vier paarweise $\cL$-trennbare Worte, so hat der minimale DFA für $\cL$ genau vier Zustände.`,
      holds: false,
      reason: r`Das Nerode-Lemma gibt nur eine **untere** Schranke: mindestens vier. Der minimale DFA könnte mehr haben. Erst ein DFA mit vier Zuständen, der $\cL$ erkennt, schließt die Lücke.`,
    },
    {
      id: 'eine-runde',
      statement: r`Die Tabellierung ist fertig, sobald Schritt 2 für ein Symbol $x$ keine neue Trennung ergibt.`,
      holds: false,
      reason: r`Erst wenn eine **ganze Runde** über alle Symbole und alle Paare nichts Neues bringt. Ein anderes Symbol kann noch trennen.`,
    },
    {
      id: 'faktorautomat-minimal',
      statement: r`Der Faktorautomat eines DFA ohne unerreichbare Zustände ist minimal.`,
      holds: true,
      reason: r`Alle Zustände sind dann erreichbar und paarweise trennbar – genau die Eigenschaften des minimalen Automaten.`,
    },
    {
      id: 'tilde-aequivalenz',
      statement: r`$\sim$ ist reflexiv, symmetrisch und transitiv.`,
      holds: true,
      reason: r`$\sim$ ist eine Äquivalenzrelation. Deshalb lassen sich verhaltensgleiche Zustände zu Klassen zusammenfassen.`,
    },
    {
      id: 'gleiche-folgezustaende',
      statement: r`Gilt $\delta(p, a) = \delta(q, a)$ für alle $a \in \Sigma$ und sind $p, q$ beide akzeptierend oder beide nicht akzeptierend, dann ist $p \sim q$.`,
      holds: true,
      reason: r`Nach dem Satz zu $\sim$: Bedingung 1 ist erfüllt, und $\delta(p, a) \sim \delta(q, a)$ gilt trivial, weil es derselbe Zustand ist.`,
    },
  ],
  problems: [
    {
      id: 'minimieren',
      title: 'DFA minimieren',
      source: 'nach 02a · Tabellierung der Trennbarkeitsrelation',
      points: 10,
      task: r`Minimiere den folgenden DFA über $\Sigma = \{a, b\}$. Gib die Tabelle nach jedem Schritt und den minimalen Automaten an. Welche Sprache erkennt er?

~~~
        a    b
→ q0    q1   q2
  q1    q1   q3
  q2    q1   q0
* q3    q4   q3
* q4    q3   q4
  q5    q3   q0
~~~`,
      hint: r`Zuerst: Welcher Zustand ist gar nicht erreichbar? Danach $F$ von $Q \setminus F$ trennen und Runde für Runde prüfen.`,
      solution: r`**1. Unerreichbare Zustände:** $q_5$ wird von keiner Transition erreicht → entfernen.

**2. Tabellierung.** Schritt 1 trennt $F = \{q_3, q_4\}$ von $\{q_0, q_1, q_2\}$ (X). Runde 1 mit $b$: $\delta(q_0, b) = q_2$ und $\delta(q_1, b) = q_3$ sind getrennt → trenne $(q_0, q_1)$; ebenso $\delta(q_1, b) = q_3$, $\delta(q_2, b) = q_0$ → trenne $(q_1, q_2)$ (jeweils 1).

~~~
      q1   q2   q3   q4
q0    1    .    X    X
q1         1    X    X
q2              X    X
q3                   .
~~~

Runde 2 bringt nichts Neues: $(q_0, q_2)$ führt mit $a$ nach $(q_1, q_1)$, mit $b$ nach $(q_2, q_0)$; $(q_3, q_4)$ führt nach $(q_4, q_3)$ bzw. $(q_3, q_4)$ – alles ungetrennt. Die Tabelle ist vollständig.

**3. Zusammenfassen:** $q_0 \sim q_2$ und $q_3 \sim q_4$.

~~~
            a        b
→ {q0,q2}   {q1}     {q0,q2}
  {q1}      {q1}     {q3,q4}
* {q3,q4}   {q3,q4}  {q3,q4}
~~~

Sprache: alle Worte, die das Teilwort $ab$ enthalten.`,
    },
    {
      id: 'produkt-minimieren',
      title: 'Produktautomat konstruieren und minimieren',
      source: 'nach Übung 2 · Aufgabe 2',
      points: 12,
      task: r`Sei $\Sigma = \{a, b, c\}$. $\mathcal{A}_1$ erkennt $L_1$ = @@[abc]*ac+@@ (endet mit einem $a$ und danach mindestens einem $c$), $\mathcal{A}_2$ erkennt $L_2$ = @@b[abc]*@@ (beginnt mit $b$).

~~~
A1      a    b    c         A2      a    b    c
→ q1    q2   q1   q1        → α     γ    β    γ
  q2    q2   q1   q3        * β     β    β    β
* q3    q2   q1   q3          γ     γ    γ    γ
~~~

Konstruiere einen Automaten für $L_3 = L_1 \cap L_2$ und minimiere ihn.`,
      hint: r`Neun Paare. Welche davon sind vom Anfangszustand $q_{1\alpha}$ aus überhaupt erreichbar? Und was haben alle Zustände mit $\gamma$ gemeinsam?`,
      solution: r`**Produktautomat**, akzeptierend nur $q_{3\beta}$:

~~~
          a      b      c
→ q1α     q2γ    q1β    q1γ
  q2α     q2γ    q1β    q3γ      nicht erreichbar
  q3α     q2γ    q1β    q3γ      nicht erreichbar
  q1β     q2β    q1β    q1β
  q2β     q2β    q1β    q3β
* q3β     q2β    q1β    q3β
  q1γ     q2γ    q1γ    q1γ
  q2γ     q2γ    q1γ    q3γ
  q3γ     q2γ    q1γ    q3γ
~~~

**Minimierung.** $q_{2\alpha}$ und $q_{3\alpha}$ sind unerreichbar (nach dem ersten Symbol ist $\mathcal{A}_2$ nie mehr in $\alpha$) → entfernen. Tabellierung der übrigen sieben (X = Schritt 1, Zahl = Runde):

~~~
       q1β  q2β  q3β  q1γ  q2γ  q3γ
q1α    2    1    X    2    2    2
q1β         1    X    2    2    2
q2β              X    1    1    1
q3β                   X    X    X
q1γ                        .    .
q2γ                             .
~~~

Runde 1 trennt mit $c$ alles von $q_{2\beta}$ (nur $q_{2\beta}$ kommt mit $c$ nach $q_{3\beta}$). Runde 2 trennt mit $a$ den Zustand $q_{1\beta}$ von den anderen und mit $b$ den Zustand $q_{1\alpha}$ von den $\gamma$-Zuständen. Runde 3 ändert nichts mehr.

$q_{1\gamma} \sim q_{2\gamma} \sim q_{3\gamma}$: Sie bilden zusammen den Fangzustand $q_\gamma$ (Wort beginnt nicht mit $b$).

~~~
          a      b      c
→ q1α     qγ     q1β    qγ
  q1β     q2β    q1β    q1β
  q2β     q2β    q1β    q3β
* q3β     q2β    q1β    q3β
  qγ      qγ     qγ     qγ
~~~

Das geübte Auge sieht: Die $\beta$-Zustände sind $\mathcal{A}_1$, davor steht der Wortbeginn mit $b$.`,
    },
    {
      id: 'nerode-drei',
      title: 'Nerode-Lemma: durch 3 teilbare Binärzahlen',
      source: 'nach 02a · Anwendung des Nerode-Lemmas',
      points: 8,
      task: r`$\cL_{drei} = \{0, 00, 11, 011, 110, 1001, \dots\}$ über $\{0, 1\}$ ist die Sprache aller Binärzahlen, die ohne Rest durch 3 teilbar sind. Der folgende DFA erkennt $\cL_{drei}$:

~~~
        0    1
→ q0    q1   q2
* q1    q1   q2
  q2    q3   q1
  q3    q2   q3
~~~

Zeige mit dem Nerode-Lemma, dass er minimal ist.`,
      hint: r`Kürzeste Worte zu jedem Zustand: $\epsilon$, $0$, $1$, $10$. Dann sechs Paare trennen.`,
      solution: r`Kandidaten (kürzeste Worte zu $q_0, q_1, q_2, q_3$): $\{\epsilon, 0, 1, 10\}$. Trennende Worte:

~~~
        0     1     10
ε       ε     1     01
0             0     0
1                   1
~~~

- $\epsilon$ / $0$ mit $w = \epsilon$: $\epsilon \notin \cL_{drei}$, aber $0 \in \cL_{drei}$
- $\epsilon$ / $1$ mit $w = 1$: $1 \notin \cL_{drei}$, aber $11 \in \cL_{drei}$ (3)
- $\epsilon$ / $10$ mit $w = 01$: $01 \notin \cL_{drei}$, aber $1001 \in \cL_{drei}$ (9)
- $0$ / $1$ mit $w = 0$: $00 \in \cL_{drei}$, aber $10 \notin \cL_{drei}$ (2)
- $0$ / $10$ mit $w = 0$: $00 \in \cL_{drei}$, aber $100 \notin \cL_{drei}$ (4)
- $1$ / $10$ mit $w = 1$: $11 \in \cL_{drei}$, aber $101 \notin \cL_{drei}$ (5)

Es gibt also 4 paarweise $\cL_{drei}$-trennbare Worte → jeder Automat für $\cL_{drei}$ hat nach dem Nerode-Lemma **mindestens 4** Zustände. Der gegebene DFA erkennt $\cL_{drei}$ mit genau 4 Zuständen, also ist er minimal.`,
    },
    {
      id: 'nerode-bin',
      title: 'Minimal oder nicht? Binärzahlen ohne führende Nullen',
      source: 'nach 02a · Fehlschlag bei nicht-minimalen Automaten',
      points: 7,
      task: r`$\cL_{bin} = \{0, 1, 10, 11, 101, \dots\}$: Binärzahlen ohne führende Nullen. Der DFA $\mathcal{A}$ erkennt $\cL_{bin}$:

~~~
        0    1
→ q0    q1   q3
* q1    q2   q2
  q2    q2   q2
* q3    q3   q3
~~~

- (a) Zeige mit paarweise $\cL_{bin}$-trennbaren Worten, dass $\mathcal{A}$ minimal ist.
- (b) Ein zweiter DFA hat zusätzlich $q_4$ mit $\delta(q_2, 0) = \delta(q_2, 1) = q_4$ und Schleife an $q_4$. Was passiert beim selben Vorgehen?`,
      solution: r`**(a)** Kürzeste Worte: $\epsilon$ ($q_0$), $0$ ($q_1$), $00$ ($q_2$), $1$ ($q_3$). Trennende Worte:

~~~
        0     00    1
ε       ε     0     ε
0             ε     0
00                  ε
~~~

Z. B. $\epsilon$ / $00$ mit $w = 0$: $0 \in \cL_{bin}$, $000 \notin \cL_{bin}$. Und $0$ / $1$ mit $w = 0$: $00 \notin \cL_{bin}$, $10 \in \cL_{bin}$. Vier paarweise trennbare Worte, $\mathcal{A}$ hat vier Zustände und erkennt $\cL_{bin}$ → minimal.

**(b)** Kandidaten: $\epsilon, 0, 00, 1, 000$. Für $00$ und $000$ gibt es **kein** trennendes Wort: Beide haben eine führende Null, jede Verlängerung liegt außerhalb von $\cL_{bin}$. Der Nachweis schlägt fehl; man erkennt, dass $q_2$ und $q_4$ nicht trennbar sind – der DFA ist nicht minimal.`,
    },
    {
      id: 'l-trennbar-pruefen',
      title: 'L-Trennbarkeit prüfen',
      source: 'nach 02a · L-Trennbarkeit',
      points: 4,
      task: r`Sei $\cL = \{0, 010, 0110, 01110, \dots\}$ über $\{0, 1\}$ (regulärer Ausdruck @@0|01+0@@).

- (a) Sind $u = 0$ und $v = 01$ $\cL$-trennbar?
- (b) Sind $01$ und $011$ $\cL$-trennbar?
- (c) Sind $\epsilon$ und $1$ $\cL$-trennbar?`,
      solution: r`- **(a)** Ja, mit $w = 0$: $uw = 00 \notin \cL$, aber $vw = 010 \in \cL$. (Auch $w = \epsilon$ trennt: $0 \in \cL$, $01 \notin \cL$.)
- **(b)** Nein. Nach $01$ und nach $011$ führen genau dieselben Fortsetzungen in die Sprache: $1^k 0$ für $k \ge 0$. Es gibt kein passendes $w$.
- **(c)** Ja, mit $w = 0$: $0 \in \cL$, aber $10 \notin \cL$.`,
    },
  ],
});
