import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02a, first part: DFAs, runs, construction, complement, product and sum automaton. */
export const dfa = topic({
  id: 'dfa',
  chapter: '02a',
  title: 'Deterministische endliche Automaten',
  summary:
    'DFA als 5-Tupel, Lauf, δ*, Sprache eines DFA, Konstruktion, Komplement-, Produkt- und Summenautomat.',
  definitions: [
    {
      id: 'dfa',
      title: 'Deterministischer endlicher Automat (DFA)',
      ref: '02a · Definition: DFA',
      statement: r`Sei $\Sigma$ ein Alphabet. Ein **deterministischer endlicher $\Sigma$-Automat** ist ein 5-Tupel $\mathcal{A} = (Q, \Sigma, \delta, q_0, F)$ mit

- $Q$ – **endliche** Menge von Zuständen
- $\delta: Q \times \Sigma \to Q$ – Transitionsfunktion, definiert die Zustandsänderungen
- $q_0 \in Q$ – Anfangszustand
- $F \subseteq Q$ – akzeptierende Zustände (manchmal: Endzustände)`,
      note: r`Denkmodell: Der DFA hat einen internen Zustand und liest das Wort **symbolweise**. Er kann stets nur das nächste Zeichen lesen – kein Zugriff auf bereits Gelesenes. Am Wortende prüft er, ob der aktuelle Zustand akzeptierend ist. $\delta$ ist **total**: für jeden Zustand und jedes Symbol genau ein Folgezustand.`,
    },
    {
      id: 'zustandsgraph',
      title: 'Zustandsübergangsgraph und Tabelle',
      ref: '02a · Zustandsübergangsgraph / Implementierung',
      statement: r`**Graph:** Zustände sind Knoten, Zustandsübergänge beschriftete Kanten ($\delta(q, a) = q'$ ist eine Kante von $q$ nach $q'$ mit Beschriftung $a$). Der Anfangszustand ist markiert, akzeptierende Zustände haben eine **doppelte Umrahmung**.

**Tabelle:** $\delta$ als Tabelle mit einer Zeile je Zustand und einer Spalte je Symbol, dazu $q_0$ und $F$. Mehr braucht eine Implementierung nicht.

~~~
        a    b    c
→ q0    q1   q3   q3
  q1    q3   q2   q3
* q2    q2   q2   q2
  q3    q3   q3   q3
~~~`,
      note: r`Schreibweise in diesem Trainer: Der Pfeil → markiert den Anfangszustand, der Stern * die akzeptierenden Zustände. Die Tabelle oben ist der DFA für „alle Worte, die mit $ab$ beginnen“; $q_3$ ist der Fangzustand. In der Klausur den Graphen zeichnen.`,
    },
    {
      id: 'lauf',
      title: 'Lauf',
      ref: '02a · Lauf',
      statement: r`Ein **Lauf** ist die Folge der Zustände, die beim Auswerten eines Wortes in einem DFA besucht werden.

Beginnt der Lauf eines Wortes $w \in \Sigma^*$ im Anfangszustand und endet in einem akzeptierenden Zustand, so wird das Wort **akzeptiert**.`,
      note: r`Weil $\delta$ total ist, hat **jedes** Wort aus $\Sigma^*$ genau einen Lauf – auch Worte, die nicht in der Sprache liegen. Ein Wort der Länge $n$ hat einen Lauf mit $n + 1$ Zuständen.`,
    },
    {
      id: 'delta-stern',
      title: 'Ausdehnung von δ auf Worte: δ*',
      ref: '02a · Ausdehnung von δ auf Worte',
      statement: r`$\delta^*: Q \times \Sigma^* \to Q$ beschreibt den Lauf eines Wortes durch mehrfache Anwendung von $\delta$:

- $\delta^*(q, \epsilon) = q$
- $\delta^*(q, a.u) = \delta^*(\delta(q, a), u)$

$$\mathcal{A} \text{ akzeptiert } w \iff \delta^*(q_0, w) \in F$$`,
      note: r`Rekursion über den Aufbau des Wortes ($\epsilon$ oder $a.u$) – dieselbe Struktur wie bei Länge und Konkatenation.`,
    },
    {
      id: 'sprache-dfa',
      title: 'Sprache eines DFA',
      ref: '02a · Sprache eines DFA',
      statement: r`Die **Sprache** eines DFA $\mathcal{A}$ ist die Menge aller Worte, die er akzeptiert:

$$\cL(\mathcal{A}) = \{w \in \Sigma^* \mid \delta^*(q_0, w) \in F\}$$`,
      note: r`Beobachtung: $\epsilon \in \cL(\mathcal{A}) \Leftrightarrow q_0 \in F$.`,
    },
    {
      id: 'erreichbar',
      title: 'Erreichbarer Zustand',
      ref: '02a · Erreichbarkeit',
      statement: r`Ein Zustand $q$ heißt **erreichbar**, falls es mindestens ein Wort $w$ gibt mit $\delta^*(q_0, w) = q$.`,
      note: r`Nicht erreichbare Zustände können entfernt werden, ohne dass sich die Sprache ändert: $\cL(\mathcal{A}') = \cL(\mathcal{A})$.`,
    },
    {
      id: 'fangzustand',
      title: 'Fangzustand („Müllzustand“, Error-Zustand)',
      ref: '02a · Intuitive Konstruktion',
      statement: r`Ein **Fangzustand** ist ein nicht akzeptierender Zustand, der nicht mehr verlassen werden kann: Alle Symbole führen zu ihm selbst zurück. Ein Wort, das ihn erreicht, wird niemals akzeptiert.

Er dient dazu, die fehlenden Transitionen eines „happy path“ zu ergänzen, damit $\delta$ total wird.`,
    },
  ],
  theorems: [
    {
      id: 'dfa-regulaer',
      title: 'DFAs erkennen reguläre Sprachen',
      ref: '02a · Deterministische endliche Automaten',
      statement: r`- DFAs **erkennen** reguläre Sprachen – sie lösen also das Wortproblem.
- Für jede reguläre Sprache gibt es mindestens einen DFA, der sie erkennt.
- Genau genommen gibt es zu jeder regulären Sprache sogar **unendlich viele** DFAs.`,
      note: r`Unendlich viele, weil man immer überflüssige (unerreichbare oder verhaltensgleiche) Zustände hinzufügen kann. Eindeutig ist erst der Minimalautomat (bis auf Isomorphie).`,
    },
    {
      id: 'intuitive-konstruktion',
      title: 'Intuitive Konstruktion eines DFA',
      ref: '02a · Intuitive Konstruktion',
      statement: r`1. Konstruiere zuerst einen (unvollständigen) Automaten für die Worte, die **in** der Sprache liegen („happy path“). Das ist noch kein DFA, da $\delta$ nicht total ist.

2. Ergänze die fehlenden Transitionen sinngemäß, z. B. durch Einführung eines **Fangzustands**.

Beispiel „beginnt mit $ab$“ über $\{a, b, c\}$: happy path $q_0 \xrightarrow{a} q_1 \xrightarrow{b} q_2$ mit Schleife $a, b, c$ an $q_2$; dann alle fehlenden Kanten ($q_0$ mit $b, c$; $q_1$ mit $a, c$) in den Fangzustand $q_3$.`,
      note: r`Kontrolle am Ende: Aus **jedem** Zustand geht für **jedes** Symbol genau eine Kante heraus. Vergessene Kanten am Fangzustand selbst sind ein typischer Fehler.`,
    },
    {
      id: 'induktive-konstruktion',
      title: 'Induktive Konstruktion: DFAs der Basissprachen',
      ref: '02a · Induktive Konstruktion',
      statement: r`Alternativ kombiniert man DFAs der kleinstmöglichen Sprachen (laut Definition regulärer Sprachen):

- **Leere Sprache:** ein Zustand $q_0$, nicht akzeptierend, alle Symbole führen zu $q_0$ zurück.
- **$\{\epsilon\}$:** $q_0$ akzeptierend; jedes Symbol führt in einen Fangzustand $q_1$.
- **$\{a\}$:** $q_0 \xrightarrow{a} q_1$ (akzeptierend); alles andere, und alles ab $q_1$, führt in den Fangzustand $q_2$.

Komplement, Vereinigung und Schnitt gehen direkt mit DFAs; Konkatenation ist bei NFAs deutlich einfacher.`,
    },
    {
      id: 'komplementautomat',
      title: 'Komplementautomat',
      ref: '02a · Komplementautomat',
      statement: r`Zu jedem DFA $\mathcal{A}$ für eine Sprache $\cL(\mathcal{A})$ gibt es einen **Komplementautomaten** $\overline{\mathcal{A}}$, der $\Sigma^* \setminus \cL(\mathcal{A})$ erkennt.

**Konstruktion:** Vertausche akzeptierende und nicht akzeptierende Zustände: $\overline{\mathcal{A}} = (Q, \Sigma, \delta, q_0, Q \setminus F)$.

**Beweis:** $w \in \cL(\overline{\mathcal{A}}) \Leftrightarrow \delta^*(q_0, w) \in Q \setminus F \Leftrightarrow \delta^*(q_0, w) \notin F \Leftrightarrow w \notin \cL(\mathcal{A})$.`,
      note: r`Das klappt nur, weil $\delta$ total ist und jedes Wort genau einen Lauf hat. Bei einem unvollständigen Automaten oder einem NFA ist Vertauschen **falsch**.`,
    },
    {
      id: 'produktautomat',
      title: 'Produktautomat (Schnitt zweier Sprachen)',
      ref: '02a · Produktautomat (Schnitt zweier Sprachen)',
      statement: r`Seien $\mathcal{A} = (Q_A, \Sigma, \delta_A, q_0, F_A)$ und $\mathcal{B} = (Q_B, \Sigma, \delta_B, q_\alpha, F_B)$ zwei DFAs. Der **Produktautomat** für $\cL_A \cap \cL_B$ führt beide „parallel“ aus:

1. Erstelle einen Zustand für jeden „Schnittpunkt“: $Q = Q_A \times Q_B$.

2. Anfangszustand ist $(q_0, q_\alpha)$. Akzeptierend sind alle Zustände, in denen **beide** Automaten akzeptieren: $F = F_A \times F_B$.

3. Ergänze die Transitionen: $\delta((p, q), a) = (\delta_A(p, a), \delta_B(q, a))$.`,
      note: r`$|Q_A| \cdot |Q_B|$ Zustände. Der Produktautomat ist in der Regel **nicht minimal**: Unerreichbare Zustände entfernen, verhaltensgleiche verschmelzen.`,
    },
    {
      id: 'summenautomat',
      title: 'Summenautomat (Vereinigung zweier Sprachen)',
      ref: '02a · Summenautomat (Vereinigung zweier Sprachen)',
      statement: r`Der „Summenautomat“ für $\cL_A \cup \cL_B$ wird **analog zum Produktautomaten** konstruiert – gleiche Zustände, gleicher Anfangszustand, gleiche Transitionen.

Einziger Unterschied: Er akzeptiert, wenn **mindestens einer** der ursprünglichen Automaten akzeptiert:

$$F = \{(p, q) \mid p \in F_A \text{ oder } q \in F_B\}$$`,
      note: r`Schnitt: „beide“. Vereinigung: „mindestens einer“. Nur $F$ ändert sich.`,
    },
  ],
  claims: [
    {
      id: 'delta-total',
      statement: r`In einem DFA gibt es für jeden Zustand und jedes Symbol des Alphabets genau eine Transition.`,
      holds: true,
      reason: r`$\delta: Q \times \Sigma \to Q$ ist eine totale Funktion. Fehlt eine Kante, ist es (noch) kein DFA.`,
    },
    {
      id: 'lauf-nur-sprache',
      statement: r`Nur Worte, die in der Sprache des DFA liegen, haben einen Lauf durch den DFA.`,
      holds: false,
      reason: r`Weil $\delta$ total ist, hat **jedes** Wort aus $\Sigma^*$ einen Lauf. Er endet nur eben in einem nicht akzeptierenden Zustand.`,
    },
    {
      id: 'epsilon-q0',
      statement: r`$\epsilon \in \cL(\mathcal{A})$ gilt genau dann, wenn der Anfangszustand akzeptierend ist.`,
      holds: true,
      reason: r`$\delta^*(q_0, \epsilon) = q_0$, also $\epsilon \in \cL(\mathcal{A}) \Leftrightarrow q_0 \in F$.`,
    },
    {
      id: 'ein-akzeptierender',
      statement: r`Ein DFA hat genau einen akzeptierenden Zustand.`,
      holds: false,
      reason: r`$F \subseteq Q$ ist eine beliebige Teilmenge – auch leer oder ganz $Q$. Der BinInteger-DFA hat $F = \{q_1, q_3\}$. Genau einen gibt es nur vom **Anfangszustand**.`,
    },
    {
      id: 'ein-dfa-pro-sprache',
      statement: r`Zu jeder regulären Sprache gibt es genau einen DFA.`,
      holds: false,
      reason: r`Es gibt unendlich viele. Eindeutig (bis auf Isomorphie) ist nur der minimale DFA.`,
    },
    {
      id: 'unerreichbar-entfernen',
      statement: r`Entfernt man aus einem DFA einen nicht erreichbaren akzeptierenden Zustand, ändert sich die erkannte Sprache.`,
      holds: false,
      reason: r`Kein Lauf ab $q_0$ kommt dort je an – egal, ob der Zustand akzeptierend ist. Die Sprache bleibt gleich.`,
    },
    {
      id: 'komplement-nfa',
      statement: r`Den Komplementautomaten erhält man, indem man im DFA akzeptierende und nicht akzeptierende Zustände vertauscht; $\delta$ und $q_0$ bleiben unverändert.`,
      holds: true,
      reason: r`$\overline{\mathcal{A}} = (Q, \Sigma, \delta, q_0, Q \setminus F)$.`,
    },
    {
      id: 'produkt-zustaende',
      statement: r`Der Produktautomat zweier DFAs mit 3 und 2 Zuständen hat (vor dem Vereinfachen) 5 Zustände.`,
      holds: false,
      reason: r`Er hat $3 \cdot 2 = 6$ Zustände – einen für jedes Paar.`,
    },
    {
      id: 'summe-nur-f',
      statement: r`Produkt- und Summenautomat zweier DFAs unterscheiden sich nur in der Menge der akzeptierenden Zustände.`,
      holds: true,
      reason: r`Produkt: beide akzeptieren ($F_A \times F_B$). Summe: mindestens einer akzeptiert.`,
    },
    {
      id: 'gedaechtnis',
      statement: r`Ein DFA kann beim Lesen auf bereits gelesene Zeichen des Wortes zurückgreifen.`,
      holds: false,
      reason: r`Er liest nur das nächste Zeichen. Alles, was er über die Vergangenheit „weiß“, steckt im aktuellen Zustand.`,
    },
  ],
  problems: [
    {
      id: 'bininteger-lauf',
      title: 'Läufe im BinInteger-DFA',
      source: 'nach 02a · Beispiel: Die Sprache BinInteger',
      points: 5,
      task: r`Der DFA über $\Sigma = \{0, 1, +, -\}$ erkennt gültige binäre Integer (optionales Vorzeichen, keine führenden Nullen), regulärer Ausdruck @@[+-]?(0|1(0|1)*)@@.

~~~
        0    1    +    -
→ q0    q1   q3   q2   q2
* q1    q4   q4   q4   q4
  q2    q1   q3   q4   q4
* q3    q3   q3   q4   q4
  q4    q4   q4   q4   q4
~~~

Gib die Läufe von $+1011$ und $-0100$ an und entscheide, ob die Worte akzeptiert werden. Welche Rolle hat $q_4$?`,
      solution: r`- $+1011$: Lauf $q_0, q_2, q_3, q_3, q_3, q_3$. Also $\delta^*(q_0, +1011) = q_3 \in F$ → **akzeptiert**.
- $-0100$: Lauf $q_0, q_2, q_1, q_4, q_4, q_4$. Also $\delta^*(q_0, -0100) = q_4 \notin F$ → **nicht akzeptiert** (führende Null).

$q_4$ ist eine Art **Error-Zustand** (Fangzustand): Er kann nicht verlassen werden, ein Wort, das ihn erreicht, wird niemals akzeptiert.`,
    },
    {
      id: 'dfa-bauen',
      title: 'DFAs konstruieren',
      source: 'nach Übung 2 · Aufgabe 1',
      points: 8,
      task: r`Konstruiere über $\Sigma = \{a, b, c\}$ je einen DFA.

- (a) $L_1$: alle Worte, die mit $c$ beginnen.
- (b) $L_2$: alle Worte, die das Teilwort $ac$ enthalten.
- (c) $L_3$: alle Worte, die mit $a$ beginnen und auf $b$ enden.`,
      hint: r`Erst den happy path, dann fehlende Kanten ergänzen. Bei (b) und (c): Was muss sich der Automat merken? „Gerade ein a gelesen“ bzw. „letztes Zeichen war b“.`,
      solution: r`**(a)** $q_1$: mit $c$ begonnen (bleibt), $q_2$: Fangzustand.

~~~
        a    b    c
→ q0    q2   q2   q1
* q1    q1   q1   q1
  q2    q2   q2   q2
~~~

**(b)** $q_1$: zuletzt ein $a$ gelesen, $q_2$: $ac$ gesehen. Kein Fangzustand nötig.

~~~
        a    b    c
→ q0    q1   q0   q0
  q1    q1   q0   q2
* q2    q2   q2   q2
~~~

**(c)** $q_1$: beginnt mit $a$, letztes Zeichen kein $b$; $q_2$: beginnt mit $a$, letztes Zeichen $b$; $q_3$: Fangzustand.

~~~
        a    b    c
→ q0    q1   q3   q3
  q1    q1   q2   q1
* q2    q1   q2   q1
  q3    q3   q3   q3
~~~`,
    },
    {
      id: 'dfa-korrigieren',
      title: 'Fehlerhaften DFA korrigieren',
      source: 'nach Übung 2 · Hausaufgabe 1',
      points: 5,
      task: r`Jemand wollte einen DFA für alle Worte über $\Sigma = \{a, b, x\}$ bauen, die mit $ab$ beginnen. Finde, benenne und korrigiere die Fehler.

~~~
        a    b    x    c
→ q1    q2   q1   q1
  q2    q4   q3   q4
* q3    q3   q3        q3
  q4
~~~`,
      solution: r`Drei Fehler:

1. $\delta(q_1, b)$ und $\delta(q_1, x)$ dürfen nicht wieder nach $q_1$ führen – sonst würde z. B. $bab$ akzeptiert. Sie müssen in den Fehlerzustand $q_4$.

2. Es gibt eine Transition $\delta(q_3, c)$, aber $c$ ist nicht Teil des Alphabets. Dafür fehlt $\delta(q_3, x)$.

3. Im Zustand $q_4$ fehlen die Transitionen für sämtliche Symbole. Es braucht je eine von $q_4$ nach $q_4$.

~~~
        a    b    x
→ q1    q2   q4   q4
  q2    q4   q3   q4
* q3    q3   q3   q3
  q4    q4   q4   q4
~~~`,
    },
    {
      id: 'produkt-summe',
      title: 'Produkt-, Summen- und Komplementautomat',
      source: 'nach 02a · Produktautomat / Summenautomat',
      points: 8,
      task: r`Über $\Sigma = \{0, 1\}$: $\mathcal{A}$ erkennt Worte mit **gerader Anzahl von 0en**, $\mathcal{B}$ erkennt Worte, die **auf 1 enden**.

~~~
A       0    1          B       0    1
→* g    u    g          → n     n    e
   u    g    u            * e   n    e
~~~

- (a) Konstruiere den Produktautomaten für $\cL_A \cap \cL_B$.
- (b) Welche Zustände akzeptieren im Summenautomaten für $\cL_A \cup \cL_B$?
- (c) Gib den Pfad von $1001$ im Produktautomaten an.
- (d) Wie erhältst du einen DFA für die Worte mit **ungerader** Anzahl von 0en?`,
      solution: r`**(a)** Zustände sind die vier Paare, Anfang $(g, n)$, akzeptierend nur $(g, e)$:

~~~
          0      1
→ (g,n)   (u,n)  (g,e)
* (g,e)   (u,n)  (g,e)
  (u,n)   (g,n)  (u,e)
  (u,e)   (g,n)  (u,e)
~~~

**(b)** Alle Paare, in denen mindestens eine Komponente akzeptiert: $(g, n)$, $(g, e)$, $(u, e)$. Nur $(u, n)$ akzeptiert nicht.

**(c)** $(g,n) \xrightarrow{1} (g,e) \xrightarrow{0} (u,n) \xrightarrow{0} (g,n) \xrightarrow{1} (g,e)$ – akzeptiert: zwei 0en und Ende auf 1. Die erste Komponente ist der Lauf in $\mathcal{A}$, die zweite der in $\mathcal{B}$.

**(d)** Komplementautomat von $\mathcal{A}$: akzeptierende und nicht akzeptierende Zustände vertauschen, also $F = \{u\}$.`,
    },
    {
      id: 'delta-stern-rechnen',
      title: 'δ* ausrechnen',
      source: 'nach 02a · Ausdehnung von δ auf Worte',
      points: 3,
      task: r`Für den DFA „beginnt mit $b$“ über $\{a, b, c\}$ ($q_0 \xrightarrow{b} q_1$, $q_0 \xrightarrow{a, c} q_2$, Schleifen an $q_1$ und $q_2$, $F = \{q_1\}$): Berechne $\delta^*(q_0, bab)$ Schritt für Schritt mit der Definition von $\delta^*$.`,
      solution: r`~~~
δ*(q0, bab) = δ*(δ(q0, b), ab) = δ*(q1, ab)
            = δ*(δ(q1, a), b)  = δ*(q1, b)
            = δ*(δ(q1, b), ε)  = δ*(q1, ε)
            = q1
~~~

$q_1 \in F$, also wird $bab$ akzeptiert. Der Lauf ist $q_0, q_1, q_1, q_1$.`,
    },
  ],
});
