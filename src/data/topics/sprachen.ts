import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 01a, first part: alphabets, words, languages, operations on words and induction. */
export const sprachen = topic({
  id: 'sprachen',
  chapter: '01a',
  title: 'Alphabete, Worte, Sprachen',
  summary: 'Alphabet, Wort, leeres Wort, Σ*, formale Sprache, Länge, Konkatenation, Induktion.',
  definitions: [
    {
      id: 'alphabet',
      title: 'Alphabet',
      ref: '01a · Alphabete',
      statement: r`Ein **Alphabet** $\Sigma$ ist eine **endliche Menge**. Ihre Elemente heißen **Symbole** oder **Zeichen**.

Alphabete werden üblicherweise mit großen griechischen Buchstaben benannt: $\Sigma, \Gamma, \dots$`,
      note: r`Beispiele: das unäre Alphabet $\{1\}$, das Binäralphabet $\{0, 1\}$, das Morsealphabet $\{\text{lang}, \text{kurz}, \text{Pause}\}$, das Hex-Alphabet $\{0, \dots, 9, A, \dots, F\}$. Ein Alphabet ist eine Menge – die Symbole haben **keine Reihenfolge**.`,
    },
    {
      id: 'wort',
      title: 'Wort und leeres Wort',
      ref: '01a · Worte',
      statement: r`Ein **Wort** über einem Alphabet $\Sigma$ ist eine **endliche Folge** von Symbolen aus $\Sigma$.

Spezialfall: Das **leere Wort** $\epsilon$ ist die leere Folge von Symbolen.`,
      note: r`Andere Literatur schreibt $\lambda$ statt $\epsilon$, Programmiersprachen schreiben @@""@@. Wichtig ist „endlich“: $\pi = 3{,}1415926\dots$ ist **kein** Wort über den Ziffern.`,
    },
    {
      id: 'sigma-stern',
      title: 'Menge aller Worte Σ*',
      ref: '01a · Menge aller Worte über Σ',
      statement: r`Die Menge aller Worte mit Zeichen aus dem Alphabet $\Sigma$ heißt $\Sigma^*$. Sie ist die **kleinste** Menge mit

- $\epsilon \in \Sigma^*$
- $\forall a \in \Sigma,\ \forall u \in \Sigma^*: a.u \in \Sigma^*$

Jedes nicht-leere Wort $w \in \Sigma^*$ lässt sich **eindeutig** darstellen als $w = a.u$ mit $a \in \Sigma$ (erstes Symbol) und $u \in \Sigma^*$ (Restwort).`,
      note: r`Beispiel: $abra = a.bra = a.b.ra = a.b.r.a = a.b.r.a.\epsilon$. Genau diese rekursive Bauweise ($\epsilon$ oder $a.u$) macht strukturelle Induktion über Worte möglich.`,
    },
    {
      id: 'gleichheit',
      title: 'Gleichheit von Worten',
      ref: '01a · Menge aller Worte über Σ',
      statement: r`Für $u, v \in \Sigma^*$ gilt $u = v$ genau dann, wenn

- $u = \epsilon = v$, **oder**
- $u = a.u'$ und $v = a.v'$ und $u' = v'$.`,
      note: r`Zwei Worte sind gleich, wenn sie beide leer sind oder mit demselben Symbol beginnen und gleiche Restworte haben – zeichenweiser Vergleich, rekursiv formuliert.`,
    },
    {
      id: 'sprache',
      title: 'Formale Sprache',
      ref: '01a · Formale Sprachen',
      statement: r`Eine **(formale) Sprache** über einem Alphabet $\Sigma$ ist eine Menge von Worten aus $\Sigma^*$. Jede Teilmenge $\cL \subseteq \Sigma^*$ ist eine formale Sprache.

Das gilt insbesondere auch für

- die Menge aller Worte $\Sigma^*$
- die leere Menge $\emptyset = \{\}$
- die Menge $\{\epsilon\}$, die nur das leere Wort enthält
- jede einelementige Menge $\{a\}$ mit einem Wort der Länge 1`,
      note: r`$\emptyset$ enthält **kein** Wort, $\{\epsilon\}$ enthält **ein** Wort (das leere). Beispiele: $\{a^n b^n \mid n \in \N_0\}$, alle Worte, die ein $c$ enthalten, die Dyck-Sprache der wohlgeformten Klammerausdrücke.`,
    },
    {
      id: 'laenge',
      title: 'Länge eines Wortes',
      ref: '01a · Typische Operationen auf Worten',
      statement: r`Die **Länge** $|w|$ ist die Anzahl der Zeichen in $w$, induktiv definiert:

- $|\epsilon| = 0$ (Induktionsanfang: leeres Wort)
- $|a.v| = 1 + |v|$ (Induktionsschritt: von $v$ nach $a.v$)`,
    },
    {
      id: 'konkatenation',
      title: 'Konkatenation',
      ref: '01a · Typische Operationen auf Worten',
      statement: r`Das **Konkatenieren** (Aneinanderhängen) zweier Worte $u \circ v = uv$ ist induktiv über das **erste** Wort definiert:

- $\epsilon \circ v = v$
- $(a.u) \circ v = a.(u \circ v)$

Das Zeichen $a$ wird mit dem Wort $a.\epsilon$ (Länge 1) identifiziert; man schreibt $au$ statt $a.u$ und $ua$ statt $u \circ (a.\epsilon)$.`,
      note: r`Der Kringel wird später meist weggelassen. Programmiersprachen sind pingeliger: Char @@'a'@@ ist nicht String @@"a"@@. Für Sprachen: $L_1 \circ L_2 = \{u \circ v \mid u \in L_1, v \in L_2\}$.`,
    },
  ],
  theorems: [
    {
      id: 'saetze-konkatenation',
      title: 'Sätze über die Konkatenation',
      ref: '01a · Beweisen von Operationen auf Worten',
      statement: r`**Assoziativität:**

$$\forall u, v, w \in \Sigma^*: (u \circ v) \circ w = u \circ (v \circ w)$$

**Längenerhalt:** Die Länge eines konkatenierten Wortes ist die Summe der Längen.

$$\forall u, v \in \Sigma^*: |u \circ v| = |u| + |v|$$

**Rechtsneutrales Element:** $\forall w \in \Sigma^*: w \circ \epsilon = w$`,
      note: r`$\epsilon \circ v = v$ gilt **per Definition**, $w \circ \epsilon = w$ muss dagegen **bewiesen** werden (strukturelle Induktion) – die Definition läuft nur über das linke Wort. Kommutativ ist $\circ$ nicht: $ab \ne ba$.`,
    },
    {
      id: 'vollstaendige-induktion',
      title: 'Vollständige Induktion (über ℕ⁺)',
      ref: '01a · Vollständige Induktion',
      statement: r`Schema, um eine Behauptung für alle $n \in \N^+$ zu zeigen:

- **Behauptung / Induktionsannahme** aufstellen, z. B. $\sum_{i=1}^{n} i = \frac{(n+1) \cdot n}{2}$
- **Induktionsanfang:** Zeige die Behauptung für ein bestimmtes Element, z. B. $n = 1$.
- **Induktionsschritt:** Zeige, dass die Behauptung für ein beliebiges $n + 1$ gilt, **falls** sie bereits für $n$ gilt.
- **Induktionsschluss:** Weil sie für $n = 1$ gilt und für jedes $n$ vom Vorgänger auf den Nachfolger übergeht, gilt sie für alle $n$.`,
      note: r`Intuitiv: gilt für 1, deshalb für 2, deshalb für 3, usw. Typischer Fehler (Einhornbeweis): Der Schritt muss wirklich für **jedes** $n$ funktionieren, auch von 1 auf 2.`,
    },
    {
      id: 'strukturelle-induktion',
      title: 'Strukturelle Induktion (über rekursiv definierte Mengen)',
      ref: '01a · Strukturelle Induktion',
      statement: r`Um eine Behauptung $P(w)$ für alle $w \in \Sigma^*$ zu zeigen, folgt man dem Aufbau von $\Sigma^*$:

- **Induktionsanfang:** Zeige $P(\epsilon)$.
- **Induktionsschritt:** Zeige für beliebige $a \in \Sigma$, $v \in \Sigma^*$: $P(v) \Rightarrow P(a.v)$.
- **Induktionsschluss:** $\forall w \in \Sigma^*: P(w)$.

Beispiel $w \circ \epsilon = w$: Anfang $\epsilon \circ \epsilon = \epsilon$ (Fall 1 der Definition von $\circ$). Schritt: $(a.v) \circ \epsilon = a.(v \circ \epsilon)$ (Fall 2) $= a.v$ (laut Annahme).`,
      note: r`In jedem Umformungsschritt die Begründung dazuschreiben: „Definition von $\circ$“, „Definition von $|\cdot|$“ oder „laut Annahme“. Genau das wird in der Übung verlangt.`,
    },
  ],
  claims: [
    {
      id: 'pi-wort',
      statement: r`$\pi = 31415926\dots$ ist ein Wort über dem Alphabet $\{0, 1, \dots, 9\}$.`,
      holds: false,
      reason: r`Ein Wort ist eine **endliche** Folge von Symbolen. $\pi$ hat unendlich viele Stellen und ist deshalb kein Wort – jedes Präfix von $\pi$ aber schon.`,
    },
    {
      id: 'leere-sprache',
      statement: r`Die Sprachen $\emptyset$ und $\{\epsilon\}$ sind gleich.`,
      holds: false,
      reason: r`$\emptyset$ enthält kein Wort, $\{\epsilon\}$ enthält genau ein Wort, nämlich das leere. $|\emptyset| = 0$, aber $|\{\epsilon\}| = 1$.`,
    },
    {
      id: 'leeres-alphabet',
      statement: r`Für das leere Alphabet gilt $\emptyset^* = \{\epsilon\}$.`,
      holds: true,
      reason: r`Ohne Symbole lässt sich nur die leere Folge bilden. $\epsilon \in \Sigma^*$ gilt für **jedes** Alphabet, auch für das leere.`,
      ref: 'Übung 1 · Aufgabe 1',
    },
    {
      id: 'epsilon-in-jeder-sprache',
      statement: r`Das leere Wort liegt in jeder formalen Sprache.`,
      holds: false,
      reason: r`$\epsilon$ liegt in $\Sigma^*$, aber eine Sprache ist eine beliebige **Teilmenge** von $\Sigma^*$. Gegenbeispiele: $\emptyset$ oder $\{a\}$.`,
    },
    {
      id: 'sigma-stern-unendlich',
      statement: r`Für jedes nicht-leere Alphabet $\Sigma$ ist $\Sigma^*$ unendlich, obwohl $\Sigma$ endlich ist und jedes Wort endlich lang ist.`,
      holds: true,
      reason: r`Schon über $\{1\}$ gibt es $\epsilon, 1, 11, 111, \dots$ – unendlich viele Worte, jedes davon endlich.`,
    },
    {
      id: 'kommutativ',
      statement: r`Die Konkatenation ist kommutativ: $u \circ v = v \circ u$ für alle $u, v \in \Sigma^*$.`,
      holds: false,
      reason: r`Gegenbeispiel: $u = a$, $v = b$, dann $ab \ne ba$. Die Konkatenation ist assoziativ, aber nicht kommutativ.`,
    },
    {
      id: 'laenge-summe',
      statement: r`Für alle Worte gilt $|u \circ v| = |u| + |v|$.`,
      holds: true,
      reason: r`Satz der Folien, bewiesen durch strukturelle Induktion über $u$ (Übung 1, Aufgabe 3).`,
    },
    {
      id: 'zerlegung-eindeutig',
      statement: r`Jedes Wort $w \in \Sigma^*$ lässt sich eindeutig als $w = a.u$ mit $a \in \Sigma$, $u \in \Sigma^*$ schreiben.`,
      holds: false,
      reason: r`Das gilt nur für **nicht-leere** Worte. $\epsilon$ hat kein erstes Symbol.`,
    },
    {
      id: 'll-gleich-l',
      statement: r`Für jede Sprache $L$ gilt $L \circ L = L$.`,
      holds: false,
      reason: r`Gegenbeispiel: $L = \{a\}$, dann $L \circ L = \{aa\} \ne L$. (Für $L = \Sigma^*$ oder $L = \{\epsilon\}$ stimmt es – aber eben nicht allgemein.)`,
      ref: 'Übung 1 · Aufgabe 2',
    },
    {
      id: 'teilmenge-sprache',
      statement: r`Die Menge aller Worte über $\{a, b, c\}$, die ein $c$ enthalten, ist eine formale Sprache.`,
      holds: true,
      reason: r`Jede Teilmenge von $\Sigma^*$ ist eine formale Sprache; hier $\{ucv \mid u, v \in \Sigma^*\}$.`,
    },
  ],
  problems: [
    {
      id: 'leer-leer-leer',
      title: 'ε, ∅ und {∅}',
      source: 'nach Übung 1 · Aufgabe 1',
      points: 4,
      task: r`- (a) Bestimme die Sprache $L_1 = \emptyset^*$ durch Angabe aller Worte.
- (b) Wie viele Worte enthält $L_2 = \{w \mid w \in \Sigma_2^* \wedge |w| = 1\}$ über dem Alphabet $\Sigma_2 = \emptyset$?
- (c) Erläutere den Unterschied zwischen $\epsilon$, $\emptyset$ und $\{\emptyset\}$.`,
      solution: r`- **(a)** Das Alphabet $\emptyset$ hat keine Symbole, also bleibt nur das leere Wort: $L_1 = \{\epsilon\}$.
- **(b)** $\Sigma_2^* = \emptyset^* = \{\epsilon\}$, und $\epsilon$ hat nicht die Länge 1. Also ist $L_2$ leer: **0 Worte**.
- **(c)** $\epsilon$ ist das leere **Wort** (eine leere Folge von Zeichen). $\emptyset = \{\}$ ist die leere **Menge**. $\{\emptyset\} = \{\{\}\}$ ist eine Menge, die als einziges Element die leere Menge enthält. Achtung: Das ist etwas anderes als $\{\epsilon\}$, denn $\{\}$ ist eine Menge, $\epsilon$ eine Folge von Symbolen.`,
    },
    {
      id: 'gegenbeispiele',
      title: 'Gegenbeispiele für Sprachgleichungen',
      source: 'nach Übung 1 · Aufgabe 2',
      points: 4,
      task: r`Seien $L, L' \subseteq \Sigma^*$ beliebige Sprachen. Zeige durch je ein Gegenbeispiel, dass die folgenden Gleichungen im Allgemeinen nicht gelten:

- $L \circ L = L$
- $L \circ L' = L' \circ L$`,
      hint: r`Die kleinsten Sprachen reichen: einelementige Sprachen mit Worten der Länge 1.`,
      solution: r`- **$L \circ L = L$:** Wähle $L = \{a\}$. Dann ist $L \circ L = \{aa\}$ – ein Wort der Länge 2, das nicht in $L$ liegt. Also $L \circ L \ne L$.
- **$L \circ L' = L' \circ L$:** Wähle $L = \{a\}$ und $L' = \{b\}$. Mit $L_1 \circ L_2 = \{u \circ v \mid u \in L_1, v \in L_2\}$ ist $L \circ L' = \{ab\}$, aber $L' \circ L = \{ba\}$. Wegen $ab \ne ba$ sind die Sprachen verschieden.`,
    },
    {
      id: 'laengenerhalt',
      title: 'Beweis: Längenerhalt bei Konkatenation',
      source: 'nach Übung 1 · Aufgabe 3',
      points: 8,
      task: r`Beweise $|u \circ v| = |u| + |v|$ für alle $u, v \in \Sigma^*$. Nutze die Definitionen von $|\cdot|$ und $\circ$ und begründe jeden Schritt.`,
      hint: r`Strukturelle Induktion über $u$ (das linke Wort – über das ist $\circ$ definiert). Wähle $P(u) = \forall v \in \Sigma^*: |u \circ v| = |u| + |v|$.`,
      solution: r`Induktion über $u$ mit $P(u) = \forall v \in \Sigma^*: |u \circ v| = |u| + |v|$.

**Anfang** $P(\epsilon)$:

~~~
|ε ∘ v| = |v|            Definition von ∘ (Fall 1)
        = 0 + |v|
        = |ε| + |v|      Definition von | | (Fall 1)
~~~

**Schritt** $P(u') \Rightarrow P(a.u')$ für beliebige $a \in \Sigma$, $u' \in \Sigma^*$:

~~~
|(a.u') ∘ v| = |a.(u' ∘ v)|      Definition von ∘ (Fall 2)
             = 1 + |u' ∘ v|      Definition von | | (Fall 2)
             = 1 + |u'| + |v|    Induktionsannahme P(u')
             = |a.u'| + |v|      Definition von | | (Fall 2)
~~~

**Schluss:** Damit gilt $P(w)$ für alle $w \in \Sigma^*$.`,
    },
    {
      id: 'rechtsneutral',
      title: 'Beweis: w ∘ ε = w',
      source: 'nach 01a · Strukturelle Induktion',
      points: 5,
      task: r`Beweise durch strukturelle Induktion: $\forall w \in \Sigma^*: w \circ \epsilon = w$. Warum ist das nicht einfach die Definition?`,
      solution: r`Die Definition liefert nur $\epsilon \circ v = v$ – das leere Wort steht **links**. Für $\epsilon$ rechts braucht es einen Beweis.

- **Anfang** ($w = \epsilon$): $\epsilon \circ \epsilon = \epsilon$ nach Fall 1 der Definition von $\circ$.
- **Schritt:** Für beliebige $a \in \Sigma$, $v \in \Sigma^*$ gelte $v \circ \epsilon = v$ (Annahme). Dann $(a.v) \circ \epsilon = a.(v \circ \epsilon)$ nach Fall 2 der Definition, und das ist $a.v$ laut Annahme.
- **Schluss:** $\forall w \in \Sigma^*: w \circ \epsilon = w$.`,
    },
    {
      id: 'gauss',
      title: 'Vollständige Induktion: Gaußsche Summe',
      source: 'nach 01a · Wiederholung: Induktionsbeweise',
      points: 5,
      task: r`Beweise durch vollständige Induktion: $\forall n \in \N^+: \sum_{i=1}^{n} i = \frac{(n+1) \cdot n}{2}$.`,
      solution: r`- **Anfang** ($n = 1$): $\sum_{i=1}^{1} i = 1$ und $\frac{(1+1) \cdot 1}{2} = 1$. ✓
- **Schritt:** Die Behauptung gelte für $n$. Zu zeigen: $\sum_{i=1}^{n+1} i = \frac{(n+2)(n+1)}{2}$.

$$\sum_{i=1}^{n+1} i = \sum_{i=1}^{n} i + (n+1) = \frac{(n+1) n}{2} + (n+1) = \frac{n^2 + n + 2n + 2}{2} = \frac{n^2 + 3n + 2}{2} = \frac{(n+2)(n+1)}{2}$$

- **Schluss:** Die Behauptung gilt für $n = 1$ und überträgt sich von jedem $n$ auf $n + 1$, also für alle $n \in \N^+$.`,
    },
    {
      id: 'einhorn',
      title: 'Einhornbeweis: Wo steckt der Fehler?',
      source: 'nach Übung 1 · Hausaufgabe 1',
      points: 4,
      task: r`„Behauptung: Ist in einer Gruppe von $n$ Einhörnern eines rosa, so sind alle rosa. Anfang: $n = 1$ stimmt. Schritt: Unter $n + 1$ Einhörnern stehe das rosa Einhorn an Position 1. Nach Annahme sind die Einhörner $1, \dots, n$ rosa. Unter den Einhörnern $2, \dots, n + 1$ gibt es dann auch rosa Einhörner, also sind nach Annahme auch diese $n$ alle rosa. Somit sind alle $n + 1$ rosa.“

Finde den Fehler und begründe kurz.`,
      solution: r`Der Schritt funktioniert schon von $n = 1$ auf $n = 2$ nicht: Die Gruppen $\{1\}$ und $\{2\}$ überlappen nicht, also gibt es in der zweiten Gruppe kein nachweislich rosa Einhorn („offensichtlich existieren auch hier rosa Einhörner“ ist für $n = 1$ falsch).

Allgemein: Der Beweis zeigt nie den Transfer von $n$ auf $n + 1$. Er argumentiert einmal für $n$ Einhörner ($1 \dots n$) und dann für $n$ **andere** Einhörner ($2 \dots n + 1$) statt für $n + 1$ Einhörner. (Vgl. Pferde-Paradox.)`,
    },
  ],
});
