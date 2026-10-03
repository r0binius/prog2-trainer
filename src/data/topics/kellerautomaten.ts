import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02c, third part: pushdown automata and how to build an NPDA from a context-free grammar. */
export const kellerautomaten = topic({
  id: 'kellerautomaten',
  chapter: '02c',
  title: 'Kellerautomaten',
  summary:
    'PDA und NPDA, Stack, Transitionsfunktion, Akzeptanz durch leeren Stack, NPDA aus CF-Grammatik.',
  definitions: [
    {
      id: 'pda-idee',
      title: 'Kellerautomat (Stackmaschine, PDA): Idee',
      ref: '02c · Kellerautomat = Stackmaschine = PDA',
      statement: r`Ein **Kellerautomat** (pushdown automaton, PDA) ist ein Automat für CF-Sprachen: Die Idee des DFA/NFA wird um einen **Stack** erweitert, auf dem sich der PDA **beliebig viele** Informationen „merken“ kann.

In jedem Schritt macht der PDA drei Dinge:

- seinen **Zustand** wechseln oder beibehalten,
- wahlweise das aktuelle **Symbol des Wortes lesen** oder nicht,
- das **oberste Symbol des Stacks lesen** und endlich viele neue Symbole auf den Stack schreiben (auch keine).

Beim Lesen wird das oberste Symbol vom Stack **gelöscht** (Pop).`,
      note: r`Der Stack ist genau das, was dem DFA fehlt: ein unbeschränkter Speicher – allerdings nur mit Zugriff auf das oberste Element.`,
    },
    {
      id: 'pda',
      title: 'Deterministischer Kellerautomat (PDA)',
      ref: '02c · Definition: PDA',
      statement: r`Ein **deterministischer Kellerautomat** ist ein 6-Tupel $\mathcal{A} = (Q, \Sigma, \Gamma, \delta, q_0, s_0)$ mit zwei Alphabeten:

- $Q$ – endliche Menge von Zuständen
- $\Sigma$ – endliches **Eingabe-Alphabet**
- $\Gamma$ – endliches **Stack-Alphabet**
- $\delta: Q \times (\Sigma \cup \{\epsilon\}) \times \Gamma \to Q \times \Gamma^*$ – Transitionsfunktion
- $q_0 \in Q$ – Anfangszustand
- $s_0$ – **Startsymbol auf dem Stack**`,
      note: r`Kein $F$: Akzeptiert wird in dieser Vorlesung über den **leeren Stack**, nicht über akzeptierende Zustände.`,
    },
    {
      id: 'npda',
      title: 'Nichtdeterministischer Kellerautomat (NPDA)',
      ref: '02c · Definition: PDA',
      statement: r`Beim **NPDA** ändert sich analog zum NFA lediglich die Transitionsfunktion – sie bildet in die Potenzmenge ab:

$$\delta: Q \times (\Sigma \cup \{\epsilon\}) \times \Gamma \to \Pot(Q \times \Gamma^*)$$`,
      note: r`Anders als bei endlichen Automaten sind NPDAs **mächtiger** als deterministische PDAs: Die kontextfreien Sprachen gehören zum NPDA.`,
    },
    {
      id: 'transition',
      title: 'Transition eines PDA lesen',
      ref: '02c · Ein genauer Blick auf die Transitionsfunktion',
      statement: r`$$\delta(q_7, r, k) = (q_8, ab)$$

bedeutet: Im Zustand $q_7$, beim Lesen des Eingabesymbols $r$ und mit $k$ **oben auf dem Stack**

- wird $k$ vom Stack entfernt,
- das Wort $ab \in \Gamma^*$ auf den Stack geschrieben – erst das $b$, dann das $a$, sodass **$a$ oben** liegt,
- und in den Zustand $q_8$ gewechselt.

Steht statt $r$ ein $\epsilon$, liest der PDA kein Symbol und bleibt auf dem aktuellen Eingabesymbol stehen.`,
      note: r`Kurzschreibweise an Kanten: $(r, k) \to ab$. Mit rechter Seite $\epsilon$ wird nur gepoppt; mit rechter Seite $k$ bleibt der Stack unverändert.`,
    },
    {
      id: 'akzeptanz',
      title: 'Akzeptanzkriterium eines (N)PDA',
      ref: '02c · Akzeptanzkriterium eines (N)PDA',
      statement: r`Ein (N)PDA **akzeptiert** ein Wort $w$ genau dann, wenn

- a) das Wort **vollständig gelesen** ist
- b) **und** der Stack **leer** ist.

Gerät ein PDA in eine Situation ohne gültige $\delta$-Transition, stoppt er; das Wort wird nicht akzeptiert. Ein **NPDA** akzeptiert, wenn es **eine Folge** gültiger Transitionen gibt, die zu a) und b) führt.`,
      note: r`Beide Bedingungen gleichzeitig: Wort zu Ende, aber Stack nicht leer → abgelehnt. Stack leer, aber Wort nicht zu Ende → auch abgelehnt (ohne Stacksymbol gibt es keine Transition mehr).`,
    },
  ],
  theorems: [
    {
      id: 'npda-fuer-cf',
      title: 'Für jede kontextfreie Sprache gibt es einen NPDA',
      ref: '02c · NPDAs für CF-Sprachen',
      statement: r`Für jede kontextfreie Sprache $\cL$ gibt es einen NPDA $M$ mit $L(M) = \cL$.

**Idee:** Baue einen NPDA, der die Produktionen der Grammatik **im Stack simuliert**. Ein Zustand genügt; $\Sigma = T$, $\Gamma = T \cup V$, $s_0 = S$.

1. **Produktionen simulieren:** $\delta(\epsilon, A) \ni \alpha$ für alle Regeln $A \to \alpha$.

2. **„Aufräumregeln“ für Terminale:** $\delta(a, a) = \{\epsilon\}$ für alle $a \in T$.`,
      note: r`Ablauf: Liegt eine **Variable** oben, wird (ohne zu lesen) eine Produktion gewählt und ihre rechte Seite auf den Stack gelegt. Liegt ein **Terminal** oben, muss es mit dem nächsten Eingabesymbol übereinstimmen; beide werden entfernt.`,
    },
    {
      id: 'ein-zustand',
      title: 'Ein Zustand genügt',
      ref: '02c · NPDAs konstruieren',
      statement: r`- Es ist schwierig, direkt einen zu einer Sprache exakt passenden (N)PDA zu konstruieren.
- Eigentlich braucht man keine unterschiedlichen Zustände in NPDAs: Man kann sie auch **auf dem Stack notieren**.
- Die NPDAs aus der Grammatik-Konstruktion haben nur **einen einzigen Zustand** (und den nur, um der Definition zu genügen).
- Die Zustandsübergänge können dann weggelassen werden: statt $\delta: Q \times (\Sigma \cup \{\epsilon\}) \times \Gamma \to \Pot(Q \times \Gamma^*)$ reicht

$$\delta: (\Sigma \cup \{\epsilon\}) \times \Gamma \to \Pot(\Gamma^*)$$`,
    },
    {
      id: 'beispiel-anbm',
      title: 'Beispiel-NPDA: gleich viele a wie b oder ein a mehr',
      ref: '02c · Beispiel: NPDA für die Sprache L(aⁿbⁿ⁺⁰¹)',
      statement: r`NPDA für $\{a^n b^m \mid n = m \text{ oder } n = m + 1\}$ mit $Q = \{q_0, q_1, q_2\}$, $\Sigma = \{a, b\}$, $\Gamma = \{0, 1\}$, $s_0 = 0$:

~~~
δ(q0, a, 0) = { (q1, 0), (q1, 10) }
δ(q1, a, 0) = { (q1, 10) }
δ(q1, a, 1) = { (q1, 11) }
δ(q1, b, 1) = { (q2, ε) }
δ(q2, b, 1) = { (q2, ε) }
δ(q2, ε, 0) = { (q2, ε) }
~~~

Für jedes gezählte $a$ wird eine $1$ auf den Stack gelegt, für jedes $b$ eine $1$ entfernt; am Ende wird die Bodenmarke $0$ entfernt.`,
      note: r`Der Nichtdeterminismus steckt im **ersten** $a$: Es wird entweder nicht gezählt ($(q_1, 0)$, Fall $n = m + 1$) oder gezählt ($(q_1, 10)$, Fall $n = m$). Der NPDA „rät“, welcher Fall vorliegt.`,
    },
    {
      id: 'beispiel-palindrom',
      title: 'Beispiel: NPDA aus einer CF-Grammatik',
      ref: '02c · Beispiel: Konstruktion eines NPDA für eine CF-Grammatik',
      statement: r`Grammatik $S \to \epsilon \mid aSa \mid bSb$ (Palindrome gerader Länge). NPDA mit $\Sigma = T = \{a, b\}$, $\Gamma = \{a, b, S\}$, $s_0 = S$:

~~~
δ(ε, S) = { ε, aSa, bSb }      Produktionen simulieren
δ(a, a) = { ε }                Terminal entfernen
δ(b, b) = { ε }                Terminal entfernen
~~~

Prüfen eines Wortes: Variable auf dem Stack → Produktion simulieren („geschickt“ wählen). Terminal auf dem Stack → Terminal entfernen. Wort vollständig gelesen und Stack leer → $w \in \cL$.`,
    },
  ],
  claims: [
    {
      id: 'akzeptanz-zustand',
      statement: r`Ein PDA (nach Definition der Vorlesung) akzeptiert, wenn er nach dem Lesen des Wortes in einem akzeptierenden Zustand ist.`,
      holds: false,
      reason: r`Das 6-Tupel hat keine Menge $F$. Akzeptiert wird, wenn das Wort vollständig gelesen **und** der Stack leer ist.`,
    },
    {
      id: 'stack-leer-wort-nicht',
      statement: r`Ist der Stack leer, bevor das Wort vollständig gelesen wurde, wird das Wort nicht akzeptiert.`,
      holds: true,
      reason: r`Jede Transition braucht ein oberstes Stacksymbol. Ohne Stack geht es nicht weiter – das Wort bleibt unvollständig gelesen.`,
    },
    {
      id: 'epsilon-transition',
      statement: r`Ein PDA muss in jedem Schritt ein Symbol der Eingabe lesen.`,
      holds: false,
      reason: r`$\delta$ ist auf $\Sigma \cup \{\epsilon\}$ definiert: Mit $\epsilon$ arbeitet der PDA nur auf dem Stack und bleibt in der Eingabe stehen.`,
    },
    {
      id: 'oben-links',
      statement: r`Nach $\delta(q, x, k) = (q', ab)$ liegt $a$ oben auf dem Stack.`,
      holds: true,
      reason: r`Es wird erst $b$, dann $a$ geschrieben – das linke Symbol des Wortes liegt oben.`,
    },
    {
      id: 'pop',
      statement: r`Das oberste Stacksymbol wird beim Lesen vom Stack gelöscht.`,
      holds: true,
      reason: r`Lesen ist ein Pop. Soll das Symbol liegen bleiben, muss die Transition es wieder hinschreiben, z. B. $(a, 0) \to 10$.`,
    },
    {
      id: 'zwei-alphabete',
      statement: r`Eingabe-Alphabet und Stack-Alphabet eines PDA müssen gleich sein.`,
      holds: false,
      reason: r`$\Sigma$ und $\Gamma$ sind zwei unabhängige Alphabete. Im Beispiel ist $\Sigma = \{a, b\}$ und $\Gamma = \{0, 1\}$; bei der Grammatik-Konstruktion ist $\Gamma = T \cup V$.`,
    },
    {
      id: 'npda-cf',
      statement: r`Zu jeder kontextfreien Grammatik lässt sich ein NPDA mit nur einem Zustand konstruieren, der dieselbe Sprache erkennt.`,
      holds: true,
      reason: r`Produktionen als $\epsilon$-Transitionen auf dem Stack simulieren, dazu Aufräumregeln für Terminale. Zustände werden nicht gebraucht.`,
    },
    {
      id: 'aufraeumregel',
      statement: r`Die Aufräumregel $\delta(a, a) = \{\epsilon\}$ liest ein $a$ aus der Eingabe und entfernt ein $a$ vom Stack.`,
      holds: true,
      reason: r`So wird das vom Stack „vorhergesagte“ Terminal mit der Eingabe abgeglichen. Passt es nicht, endet dieser Lauf.`,
    },
    {
      id: 'dfa-zaehlen',
      statement: r`Ein PDA kann $\{a^n b^n\}$ erkennen, weil er sich auf dem Stack beliebig viele Informationen merken kann.`,
      holds: true,
      reason: r`Für jedes $a$ ein Symbol auf den Stack, für jedes $b$ eines herunter – genau das unbeschränkte Zählen, das ein DFA nicht kann.`,
    },
  ],
  problems: [
    {
      id: 'abba-pruefen',
      title: 'Wort im NPDA prüfen: abba',
      source: 'nach 02c · Prüfen des Wortes w = abba',
      points: 7,
      task: r`NPDA zur Grammatik $S \to \epsilon \mid aSa \mid bSb$:

~~~
δ(ε, S) = { ε, aSa, bSb }
δ(a, a) = { ε }
δ(b, b) = { ε }
~~~

Prüfe $w = abba$. Gib nach jedem Schritt die restliche Eingabe und den Stack (oben links) an.`,
      solution: r`~~~
Rest      Stack    Schritt
abba      S        Start
abba      aSa      Variable oben: Produktion S → aSa simulieren
bba       Sa       Terminal oben: a lesen und entfernen
bba       bSba     Variable oben: S → bSb
ba        Sba      Terminal: b entfernen
ba        ba       Variable oben: S → ε
a         a        Terminal: b entfernen
ε         ε        Terminal: a entfernen
~~~

Das Wort ist vollständig gelesen und der Stack ist leer ⇒ $abba \in \cL$. Bei jeder Variablen musste „geschickt“ gewählt werden – der NPDA rät die richtige Produktion.`,
    },
    {
      id: 'npda-sigma-stern',
      title: 'Einfacher NPDA für Σ*',
      source: 'nach Übung 5 · Aufgabe 1',
      points: 5,
      task: r`Konstruiere einen NPDA $(Q, \Sigma, \Gamma, \delta, q_0, s_0)$ für die Sprache $\Sigma^*$ über $\Sigma = \{x, y, z\}$.`,
      hint: r`Jede Eingabe soll akzeptiert werden: Es genügt, das Wort vollständig zu lesen und den Stack zu leeren.`,
      solution: r`- $Q = \{S\}$, $q_0 = S$ (einziger Zustand)
- $\Sigma = \{x, y, z\}$
- $\Gamma = \{S\}$, $s_0 = S$ (ein Symbol genügt, der Stack wird nicht wirklich benutzt)

Weil es nur einen Zustand gibt, lassen wir Zustände in $\delta$ weg.

**Wort lesen**, Stack unverändert:

~~~
δ(x, S) = { S }
δ(y, S) = { S }
δ(z, S) = { S }
~~~

**Stack abbauen:**

~~~
δ(ε, S) = { ε }
~~~

Der NPDA liest das Wort Zeichen für Zeichen und entfernt am Ende nichtdeterministisch das $S$. Dann ist das Wort vollständig gelesen und der Stack leer.`,
    },
    {
      id: 'npda-aus-grammatik',
      title: 'NPDA für aⁿbⁿcc aus der Grammatik',
      source: 'nach Übung 5 · Hausaufgabe 1',
      points: 8,
      task: r`Konstruiere mittels Simulation der Produktionen einen NPDA für $\cL = \{a^n b^n cc\}$ über $\{a, b, c\}$. Die (absichtlich unnötig komplizierte) Grammatik:

~~~
S → cc | XC
C → cc
X → aXb | ε
~~~

Prüfe anschließend das Wort $abcc$.`,
      solution: r`$Q = \{S\}$, $\Sigma = T = \{a, b, c\}$, $\Gamma = T \cup V = \{a, b, c, S, X, C\}$, $q_0 = S$, $s_0 = S$.

Produktionen simulieren (Variable oben):

~~~
δ(ε, S) = { cc, XC }
δ(ε, C) = { cc }
δ(ε, X) = { aXb, ε }
~~~

Terminale entfernen:

~~~
δ(a, a) = { ε }
δ(b, b) = { ε }
δ(c, c) = { ε }
~~~

Prüfung von $abcc$:

~~~
Rest      Stack    Schritt
abcc      S        Start
abcc      XC       S → XC
abcc      aXbC     X → aXb
bcc       XbC      a entfernen
bcc       bC       X → ε
cc        C        b entfernen
cc        cc       C → cc
c         c        c entfernen
ε         ε        c entfernen
~~~

Wort gelesen, Stack leer ⇒ akzeptiert.`,
    },
    {
      id: 'anbm-lauf',
      title: 'Lauf im NPDA mit Zuständen',
      source: 'nach 02c · Beispiel: NPDA für die Sprache L(aⁿbⁿ⁺⁰¹)',
      points: 7,
      task: r`Für den NPDA mit $s_0 = 0$ und

~~~
δ(q0, a, 0) = { (q1, 0), (q1, 10) }
δ(q1, a, 0) = { (q1, 10) }
δ(q1, a, 1) = { (q1, 11) }
δ(q1, b, 1) = { (q2, ε) }
δ(q2, b, 1) = { (q2, ε) }
δ(q2, ε, 0) = { (q2, ε) }
~~~

zeige, dass $aab$ akzeptiert wird, und erkläre, warum $abb$ nicht akzeptiert wird.`,
      solution: r`**$aab$** ($n = 2$, $m = 1$, also $n = m + 1$): Das erste $a$ wird **nicht** gezählt.

~~~
Zustand   Rest    Stack
q0        aab     0
q1        ab      0       (a, 0) → 0
q1        b       10      (a, 0) → 10
q2        ε       0       (b, 1) → ε
q2        ε       ε       (ε, 0) → ε
~~~

Wort gelesen, Stack leer ⇒ akzeptiert.

**$abb$:** Nach dem $a$ ist der Stack entweder $0$ (dann gibt es für $b$ mit $0$ oben in $q_1$ keine Transition) oder $10$. Im zweiten Fall entfernt das erste $b$ die $1$, es bleibt $0$ in $q_2$. Für das zweite $b$ gibt es mit $0$ oben keine Transition; entfernt man die $0$ per $\epsilon$-Transition, ist der Stack leer, aber das Wort nicht zu Ende. Kein Lauf erfüllt beide Bedingungen ⇒ nicht akzeptiert.`,
    },
  ],
});
