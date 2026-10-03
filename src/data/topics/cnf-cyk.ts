import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02c, second part: Chomsky normal form, the CYK algorithm and closure properties. */
export const cnfCyk = topic({
  id: 'cnf-cyk',
  chapter: '02c',
  title: 'Chomsky-Normalform und CYK-Algorithmus',
  summary:
    'CNF, erreichbar, terminierend, kollabierend, ε-Regeln, 1-Variablen-Regeln, CYK, Abschlüsse.',
  definitions: [
    {
      id: 'cnf',
      title: 'Chomsky-Normalform (CNF)',
      ref: '02c · Chomsky-Normalform (CNF)',
      statement: r`Eine CF-Grammatik ist in **Chomsky-Normalform**, wenn alle Produktionen eine dieser Formen haben:

- $A \to a$ – genau **ein Terminal**
- $A \to BC$ – genau **zwei Variablen**
- $S \to \epsilon$ – ausschließlich wenn $\epsilon \in L(G)$; dann darf $S$ jedoch in **keiner** Regel rechts vom Pfeil vorkommen`,
      note: r`Nicht erlaubt sind also: $A \to B$ (eine Variable), $A \to aB$ (gemischt), $A \to BCD$ (drei Variablen), $A \to ab$ (zwei Terminale), $A \to \epsilon$ für $A \ne S$. Die CNF ist ein theoretisches Ergebnis; in der Praxis spezifiziert man mit Regeln beliebiger Struktur.`,
    },
    {
      id: 'erreichbar',
      title: 'Erreichbare Variable',
      ref: '02c · Erreichbare Variablen',
      statement: r`Eine Variable $A \in V$ heißt **erreichbar**, falls $A$ in mindestens einer Satzform vorkommt, die ausgehend von $S$ abgeleitet werden kann.

$$A \text{ erreichbar} \iff A = S \text{ oder } (E \to \alpha A \beta) \in P \text{ und } E \text{ erreichbar}$$`,
      note: r`Nicht erreichbare Variablen kann man entfernen, ohne dass sich die Sprache ändert.`,
    },
    {
      id: 'terminierend',
      title: 'Terminierende (produktive) Variable',
      ref: '02c · Terminierende/produktive Variablen',
      statement: r`Eine Variable $A \in V$ heißt **terminierend** oder **produktiv**, falls aus $A$ eine Satzform erzeugt werden kann, die nur Terminale enthält: $\exists w \in T^*: A \Rightarrow^* w$.

Rekursiv: $A$ ist terminierend, wenn es eine Regel $A \to w$ mit $w \in T^*$ gibt, oder eine Regel $A \to \alpha$, in der alle Variablen terminierend sind.`,
      note: r`Nicht terminierende Variablen kann man entfernen, ohne dass sich die Sprache ändert. Beispiel: $A \to aA$ als einzige Regel – $A$ wird man nie wieder los.`,
    },
    {
      id: 'kollabierend',
      title: 'Kollabierende (nullable) Variable und ε-Regel',
      ref: '02c · Kollabierende/nullable Variablen und ε-Regeln',
      statement: r`- Eine Variable $A \in V$ heißt **kollabierend** oder **nullable**, falls eine Ableitung $A \Rightarrow^* \epsilon$ existiert.
- Jede Regel der Form $A \to \epsilon$ heißt **$\epsilon$-Regel**.`,
      note: r`Achtung: Eine $\epsilon$-Regel ist **eine Produktion** ($A \to \epsilon$, ein einzelner Schritt); kollabierend bezieht sich auf eine **Folge** von Ableitungsschritten ($A \Rightarrow^* \epsilon$). Mit $A \to BB$, $B \to \epsilon$ ist $A$ kollabierend, hat aber keine $\epsilon$-Regel.`,
    },
    {
      id: 'ein-variablen-regel',
      title: '1-Variablen-Regel',
      ref: '02c · 1-Variablen-Regeln',
      statement: r`Alle Regeln der Form $A \to B$ mit $A, B \in V$ sind **1-Variablen-Regeln**. In der CNF sind sie nicht erlaubt.`,
      note: r`Auch Kettenregeln genannt. Sie lassen sich entfernen, ohne dass sich die Sprache ändert.`,
    },
    {
      id: 'cyk-tabelle',
      title: 'CYK-Tabelle',
      ref: '02c · Anwendung des CYK-Algorithmus',
      statement: r`Dreieckstabelle für ein Wort $w$ der Länge $n$: **Zeile $l$** steht für Teilworte der Länge $l$, die **Spalte** für die Startposition. In jeder Zelle stehen alle Variablen, aus denen sich das Teilwort ableiten lässt.

~~~
 2 | S
 1 | A   C
   +--------
     (   )
~~~

Zeile 1: Variablen mit Regel $A \to a$ für das jeweilige Zeichen. Oberste Zelle: das ganze Wort.`,
      note: r`Steht in der obersten Zelle (auch) die Startvariable, gibt es eine Ableitung $S \Rightarrow^* w$, also $w \in L(G)$. Ein Strich bedeutet: aus keiner Variablen ableitbar.`,
    },
  ],
  theorems: [
    {
      id: 'satz-cnf',
      title: 'Satz von Chomsky (Existenz der CNF)',
      ref: '02c · Chomsky-Normalform (CNF)',
      statement: r`Zu **jeder** CF-Grammatik $G$ gibt es eine äquivalente Grammatik $G'$ in Chomsky-Normalform, also mit Produktionen nur der Form $A \to a$, $A \to BC$ und gegebenenfalls $S \to \epsilon$ (wobei $S$ dann nirgends rechts vorkommt).`,
    },
    {
      id: 'epsilon-entfernen',
      title: 'ε-Regeln entfernen',
      ref: '02c · Kollabierende/nullable Variablen und ε-Regeln',
      statement: r`Für jede kollabierende Variable $C$, wiederholt, bis in einer Runde keine neuen Regeln hinzukommen:

- Für jede Produktion der Form $A \to \alpha C \beta$ füge eine neue Regel $A \to \alpha \beta$ hinzu.

Danach: **Streiche alle $\epsilon$-Regeln** (nicht die kollabierenden Variablen!).

Es entsteht $G^+$ mit $L(G^+) = L(G) \setminus \{\epsilon\}$.`,
      note: r`Kommt $C$ mehrfach vor, braucht es **alle Kombinationen**: Für $A \to \alpha C \beta C \gamma$ drei neue Regeln – ohne das erste $C$, ohne das zweite, ohne beide. Enthielt $L(G)$ das leere Wort, ist $G^+$ **nicht** äquivalent zu $G$.`,
    },
    {
      id: 'epsilon-freiheit',
      title: 'ε-Freiheit',
      ref: '02c · ε-Freiheit',
      statement: r`Zu jeder CF-Grammatik $G$ gibt es eine äquivalente $\epsilon$-freie Grammatik.

Sei $G^+$ durch Entfernen aller $\epsilon$-Regeln aus $G$ entstanden.

- Falls $\epsilon \notin L(G)$: $G$ und $G^+$ sind äquivalent.
- Falls $\epsilon \in L(G)$: Ergänze eine **neue Startvariable** $S'$ mit $S' \to \epsilon$ (erzeugt das leere Wort) und $S' \to S$ (Übergang zur ursprünglichen Startvariablen).`,
      note: r`„$\epsilon$-frei“ erlaubt also genau die eine Ausnahme $S' \to \epsilon$ an einer Startvariablen, die rechts nie vorkommt. $S' \to S$ ist eine 1-Variablen-Regel und muss anschließend noch entfernt werden.`,
    },
    {
      id: 'ein-variablen-entfernen',
      title: '1-Variablen-Regeln entfernen',
      ref: '02c · 1-Variablen-Regeln',
      statement: r`Wiederhole, bis keine Änderung mehr auftritt – für jede 1-Variablen-Regel $A \to B$:

- Für jede Produktion der Form $B \to \beta$ füge eine neue Regel $A \to \beta$ hinzu.
- Streiche $A \to B$.

Die Sprache ändert sich dabei nicht.`,
      note: r`$A$ „erbt“ alle rechten Seiten von $B$. Eine Regel $S \to S$ wird einfach gestrichen (alles, was sie bringen würde, ist schon vorhanden).`,
    },
    {
      id: 'cnf-umwandlung',
      title: 'Umwandeln einer CF-Grammatik in CNF',
      ref: '02c · Umwandeln einer CF-Grammatik in Chomsky-Normalform',
      statement: r`1. Entferne **nicht erreichbare** und **nicht terminierende** Variablen.

2. Mache $G$ **$\epsilon$-frei** und entferne alle **1-Variablen-Regeln**. (Wiederhole ggf. Schritt 1.)

3. Löse Produktionen mit **Terminalen in längeren rechten Seiten** auf: In jeder Regel $A \to \alpha$ mit $|\alpha| > 1$ ersetze jedes Terminal $a$ durch eine neue Variable $X_a$ und füge $X_a \to a$ hinzu.

4. Löse Produktionen mit **mehr als zwei Variablen** auf: Ersetze $A \to B_1 B_2 \dots B_n$ mit neuen Variablen durch $A \to B_1 C_1$, $C_1 \to B_2 C_2$, …, $C_{n-2} \to B_{n-1} B_n$.`,
      note: r`Reihenfolge einhalten. Nach Schritt 3 stehen rechts nur noch ein einzelnes Terminal oder nur Variablen; Schritt 4 zerlegt lange Variablenketten in Zweierschritte.`,
    },
    {
      id: 'cyk',
      title: 'CYK-Algorithmus: Jede CF-Sprache ist entscheidbar',
      ref: '02c · Entscheidbarkeit von CF-Sprachen',
      statement: r`Liegt die Grammatik in **Chomsky-Normalform** vor, entscheidet der CYK-Algorithmus das Wortproblem. Er ermittelt systematisch für jedes Teilwort von $w$, aus welchen Variablen es sich ableiten lässt – von kurzen zu langen Teilworten.

- **Zeile 1:** Für jedes Zeichen $a$ alle Variablen $A$ mit $A \to a$.
- **Zeile $l > 1$:** Für jedes Teilwort der Länge $l$ alle Zerlegungen in zwei Teile der Längen $k$ und $l - k$ ($k = 1, \dots, l - 1$) durchgehen. Steht $B$ in der Zelle des linken und $C$ in der Zelle des rechten Teils und gibt es $A \to BC$, trage $A$ ein.
- **Ergebnis:** $w \in L(G)$ genau dann, wenn in der obersten Zelle die Startvariable $S$ steht.`,
      note: r`Für die Zelle (Länge $l$, Start $i$) kombiniert man die Zelle (Länge $k$, Start $i$) mit der Zelle (Länge $l - k$, Start $i + k$): im Dreieck von unten in der eigenen Spalte nach oben und gleichzeitig diagonal nach unten rechts. Nicht in CNF? Dann erst umwandeln.`,
    },
    {
      id: 'ableitung-ablesen',
      title: 'Ableitungsgraph aus der CYK-Tabelle ablesen',
      ref: '02c · Ablesen des Ableitungsgraphen',
      statement: r`Aus der ausgefüllten Tabelle lässt sich der Ableitungsgraph direkt ablesen:

- Beginne bei $S$ in der obersten Zelle.
- Für jede Variable $A$ in einer Zelle: Finde die Zerlegung und die Regel $A \to BC$, durch die $A$ eingetragen wurde. $B$ und $C$ sind die Kinder – in ihren Zellen geht es rekursiv weiter.
- In Zeile 1 endet jeder Zweig mit $A \to a$ am Terminal.`,
    },
    {
      id: 'abschluesse',
      title: 'Abschlüsse und Grenzen von CF-Sprachen',
      ref: '02c · Abschlüsse von CF-Sprachen',
      statement: r`Sind $\cL_1, \cL_2$ kontextfrei, dann auch

- $\cL_1 \cup \cL_2$ (Vereinigung)
- $\cL_1 \cL_2$ (Verkettung)
- $\cL_1^*$ (Kleene-Stern)

**Nicht abgeschlossen** unter:

- **Schnitt:** $\{a^n b^n c^n\} = \{a^n b^n c^k\} \cap \{a^k b^n c^n\}$ – beide rechten Sprachen sind kontextfrei, die linke nicht.
- **Komplement:** Sonst könnte man mit Vereinigung den Schnitt bauen: $\cL_1 \cap \cL_2 = \Sigma^* \setminus \bigl((\Sigma^* \setminus \cL_1) \cup (\Sigma^* \setminus \cL_2)\bigr)$.`,
      note: r`$\cL_{a^n b^n c^n} = \{a^n b^n c^n \mid n \ge 0\}$ ist **nicht kontextfrei** – es gibt keine CF-Grammatik dafür. Der Beweis ginge mit dem Pumping-Lemma für CF-Sprachen, das die Vorlesung überspringt. Reguläre Sprachen sind dagegen unter Schnitt und Komplement abgeschlossen.`,
    },
  ],
  claims: [
    {
      id: 'cnf-aB',
      statement: r`Die Regel $A \to aB$ ist in Chomsky-Normalform erlaubt.`,
      holds: false,
      reason: r`Erlaubt sind nur genau ein Terminal ($A \to a$) oder genau zwei Variablen ($A \to BC$). Abhilfe: $A \to X_a B$, $X_a \to a$.`,
    },
    {
      id: 'cnf-jede',
      statement: r`Zu jeder kontextfreien Grammatik gibt es eine äquivalente Grammatik in Chomsky-Normalform.`,
      holds: true,
      reason: r`Das ist der Satz von Chomsky; die Umwandlung in vier Schritten konstruiert sie.`,
    },
    {
      id: 'kollabierend-streichen',
      statement: r`Beim Entfernen der $\epsilon$-Regeln werden die kollabierenden Variablen aus der Grammatik gestrichen.`,
      holds: false,
      reason: r`Gestrichen werden nur die **$\epsilon$-Regeln**. Die Variablen bleiben; vorher werden Regeln ergänzt, in denen sie weggelassen sind.`,
    },
    {
      id: 'g-plus-aequivalent',
      statement: r`Die Grammatik $G^+$, die durch Entfernen aller $\epsilon$-Regeln entsteht, ist immer äquivalent zu $G$.`,
      holds: false,
      reason: r`$L(G^+) = L(G) \setminus \{\epsilon\}$. Enthält $L(G)$ das leere Wort, braucht es die neue Startvariable $S'$ mit $S' \to \epsilon \mid S$.`,
    },
    {
      id: 'zwei-c',
      statement: r`Ist $C$ kollabierend, so entstehen aus $A \to CbC$ beim Entfernen der $\epsilon$-Regeln die neuen Regeln $A \to bC$, $A \to Cb$ und $A \to b$.`,
      holds: true,
      reason: r`Ohne das erste $C$, ohne das zweite, ohne beide – alle Kombinationen.`,
    },
    {
      id: 'cyk-beliebig',
      statement: r`Der CYK-Algorithmus lässt sich direkt auf jede kontextfreie Grammatik anwenden.`,
      holds: false,
      reason: r`Er setzt die **Chomsky-Normalform** voraus (nur $A \to a$ und $A \to BC$). Andere Grammatiken müssen erst umgewandelt werden.`,
    },
    {
      id: 'cyk-oben',
      statement: r`Beim CYK-Algorithmus gilt $w \in L(G)$ genau dann, wenn in der obersten Zelle die Startvariable steht.`,
      holds: true,
      reason: r`Die oberste Zelle steht für das längste Teilwort – $w$ selbst. Steht dort $S$, gibt es $S \Rightarrow^* w$.`,
    },
    {
      id: 'cf-entscheidbar',
      statement: r`Jede kontextfreie Sprache ist entscheidbar.`,
      holds: true,
      reason: r`Grammatik in CNF bringen, CYK anwenden: Der Algorithmus terminiert immer mit Ja oder Nein.`,
    },
    {
      id: 'cf-schnitt',
      statement: r`Der Schnitt zweier kontextfreier Sprachen ist immer kontextfrei.`,
      holds: false,
      reason: r`Gegenbeispiel: $\{a^n b^n c^k\} \cap \{a^k b^n c^n\} = \{a^n b^n c^n\}$ ist nicht kontextfrei.`,
    },
    {
      id: 'cf-vereinigung',
      statement: r`Die Vereinigung zweier kontextfreier Sprachen ist kontextfrei.`,
      holds: true,
      reason: r`CF-Sprachen sind unter Vereinigung, Verkettung und Kleene-Stern abgeschlossen (z. B. neue Startvariable $S \to S_1 \mid S_2$).`,
    },
    {
      id: 'cf-komplement',
      statement: r`Das Komplement einer kontextfreien Sprache ist immer kontextfrei.`,
      holds: false,
      reason: r`Sonst wäre mit der Vereinigung auch der Schnitt abgeschlossen (De Morgan) – ist er aber nicht.`,
    },
  ],
  problems: [
    {
      id: 'dyck-cnf',
      title: 'Dyck-Grammatik in CNF umwandeln',
      source: 'nach 02c · Beispiel: DYCK-Sprache in CNF umwandeln',
      points: 10,
      task: r`Wandle die Grammatik $K$ mit $T = \{(, )\}$, $V = \{S\}$ und

$$S \to SS \mid (S) \mid \epsilon$$

Schritt für Schritt in Chomsky-Normalform um.`,
      hint: r`$S$ ist kollabierend und $\epsilon \in L(K)$ – du brauchst also eine neue Startvariable $S'$.`,
      solution: r`**1. Erreichbar/terminierend:** Alle Variablen sind erreichbar und terminierend.

**2a. $\epsilon$-Regeln:** $S$ ist kollabierend ($S \to \epsilon$). Aus $S \to SS$ entsteht $S \to S$ (je ein $S$ weggelassen), aus $S \to (S)$ entsteht $S \to ()$. $\epsilon$-Regel streichen → $K^+$:

~~~
S → SS | (S) | S | ()
~~~

$L(K^+) \ne L(K)$, weil $\epsilon$ fehlt. Neue Startvariable → $K_\epsilon$:

~~~
S' → ε | S
S  → SS | (S) | S | ()
~~~

**2b. 1-Variablen-Regeln:** $S \to S$ streichen (bringt nichts Neues). $S' \to S$ ersetzen durch alle rechten Seiten von $S$:

~~~
S' → ε | SS | (S) | ()
S  → SS | (S) | ()
~~~

**3. Terminale auflösen:** $X_( \to ($ und $X_) \to )$ einführen:

~~~
S' → ε | SS | X( S X) | X( X)
S  → SS | X( S X) | X( X)
X( → (
X) → )
~~~

**4. Mehr als zwei Variablen auflösen:** $C \to S X_)$ einführen:

~~~
S' → ε | SS | X( C | X( X)
S  → SS | X( C | X( X)
C  → S X)
X( → (
X) → )
~~~

Das ist $K_{CNF}$: äquivalent zu $K$ und in Chomsky-Normalform ($S'$ kommt rechts nirgends vor).`,
    },
    {
      id: 'cyk-dyck',
      title: 'CYK: zwei Klammerworte prüfen',
      source: 'nach Übung 4 · Aufgabe 1',
      points: 10,
      task: r`$G_{Dyck}$ beschreibt die Dyck-Sprache ohne das leere Wort, $V = \{S, A, B, C\}$, $T = \{(, )\}$:

~~~
S → SS | AB | AC
B → SC
A → (
C → )
~~~

Prüfe mit dem CYK-Algorithmus: (a) $w_2 = ()(())$ und (b) $w_3 = (()(()())$.`,
      solution: r`**(a)** $w_2 \in L(G_{Dyck})$:

~~~
 6 | S
 5 | -   -
 4 | -   -   S
 3 | -   -   -   B
 2 | S   -   -   S   -
 1 | A   C   A   A   C   C
   +------------------------
     (   )   (   (   )   )
~~~

Zeile 2: $AC \to S$ an den Positionen 1 und 4. Zeile 3, Position 4: $S$ (Länge 2) + $C$ → $B$. Zeile 4, Position 3: $A$ + $B$ → $S$. Zeile 6: $S$ (Position 1, Länge 2) + $S$ (Position 3, Länge 4) → $S$. Oben steht $S$ → Wort liegt in der Sprache.

**(b)** $w_3 \notin L(G_{Dyck})$:

~~~
 9 | -
 8 | -   S
 7 | -   -   -
 6 | -   -   -   S
 5 | -   -   -   -   B
 4 | -   -   -   -   S   -
 3 | -   -   -   -   -   -   B
 2 | -   S   -   -   S   -   S   -
 1 | A   A   C   A   A   C   A   C   C
   +------------------------------------
     (   (   )   (   (   )   (   )   )
~~~

In der obersten Zelle steht kein $S$ → nicht in der Sprache. (Das Teilwort ab Position 2, $()(()())$, wäre es – die erste Klammer wird nie geschlossen.)`,
    },
    {
      id: 'cnf-und-cyk',
      title: 'Erst CNF, dann CYK',
      source: 'nach Übung 4 · Hausaufgabe',
      points: 12,
      task: r`Gegeben $G$ mit $V = \{S, A, B\}$, $T = \{a, b, c\}$ und

~~~
S → AB
A → ab | aAb
B → c | cB
~~~

Prüfe, ob $w_5 = aabbc \in L(G)$.`,
      hint: r`$G$ ist nicht in CNF: $ab$, $aAb$ und $cB$ müssen aufgelöst werden. Führe $A' \to a$, $B' \to b$, $C' \to c$ und eine Hilfsvariable für $Ab$ ein.`,
      solution: r`$G$ beschreibt $\{a^n b^n c^m \mid n, m \ge 1\}$. Keine $\epsilon$- und keine 1-Variablen-Regeln, alles erreichbar und terminierend.

**CNF:** Terminale ersetzen ($A' \to a$, $B' \to b$, $C' \to c$), dann $A \to A' A B'$ mit $X \to A B'$ aufspalten:

~~~
S  → AB
A  → A'B' | A'X
X  → AB'
B  → c | C'B
A' → a
B' → b
C' → c
~~~

**CYK:**

~~~
 5 | S
 4 | A     -
 3 | -     X     -
 2 | -     A     -     -
 1 | A'    A'    B'    B'    B,C'
   +------------------------------
     a     a     b     b     c
~~~

Zeile 2, Position 2: $A' B' \to A$ ($ab$). Zeile 3, Position 2: $A$ + $B'$ → $X$ ($abb$). Zeile 4, Position 1: $A'$ + $X$ → $A$ ($aabb$). Zeile 5: $A$ (Länge 4) + $B$ (Position 5) → $S$.

Oben steht $S$ ⇒ $w_5 \in L(G)$.`,
    },
    {
      id: 'ableitung-aus-tabelle',
      title: 'Ableitungsgraph aus der CYK-Tabelle',
      source: 'nach 02c · Ablesen des Ableitungsgraphen',
      points: 5,
      task: r`Für $G_{Dyck}$ ($S \to SS \mid AB \mid AC$, $B \to SC$, $A \to ($, $C \to )$) und $w = (())$ ist die CYK-Tabelle:

~~~
 4 | S
 3 | -   B
 2 | -   S   -
 1 | A   A   C   C
   +----------------
     (   (   )   )
~~~

Lies den Ableitungsgraphen ab und gib die zugehörige Ableitung an.`,
      solution: r`$S$ oben entsteht aus $A$ (Position 1) und $B$ (Position 2, Länge 3): $S \to AB$. $B$ entsteht aus $S$ (Position 2, Länge 2) und $C$ (Position 4): $B \to SC$. Dieses $S$ entsteht aus $A$ und $C$: $S \to AC$.

~~~
        S
      ┌─┴──┐
      A    B
      │  ┌─┴─┐
      (  S   C
       ┌─┴─┐ │
       A   C )
       │   │
       (   )
~~~

Ableitung: $S \Rightarrow AB \Rightarrow (B \Rightarrow (SC \Rightarrow (ACC \Rightarrow ((CC \Rightarrow (()C \Rightarrow (())$.`,
    },
    {
      id: 'schnitt-nicht-cf',
      title: 'Schnitt und Komplement',
      source: 'nach 02c · Abschlüsse von CF-Sprachen',
      points: 6,
      task: r`Begründe, warum kontextfreie Sprachen weder unter Schnitt noch unter Komplement abgeschlossen sind. Du darfst verwenden, dass $\{a^n b^n c^n \mid n \ge 0\}$ nicht kontextfrei ist.`,
      solution: r`**Schnitt:** $L_1 = \{a^n b^n c^k \mid n, k \ge 0\}$ und $L_2 = \{a^k b^n c^n \mid n, k \ge 0\}$ sind kontextfrei (z. B. $S \to XC$, $X \to aXb \mid \epsilon$, $C \to cC \mid \epsilon$ für $L_1$). Ihr Schnitt verlangt gleich viele $a$ wie $b$ **und** gleich viele $b$ wie $c$:

$$L_1 \cap L_2 = \{a^n b^n c^n \mid n \ge 0\}$$

Das ist nicht kontextfrei – also kein Abschluss unter Schnitt.

**Komplement:** Angenommen, CF-Sprachen wären unter Komplement abgeschlossen. Sie sind unter Vereinigung abgeschlossen, also wäre auch

$$\cL_1 \cap \cL_2 = \Sigma^* \setminus \bigl((\Sigma^* \setminus \cL_1) \cup (\Sigma^* \setminus \cL_2)\bigr)$$

immer kontextfrei. Widerspruch zum ersten Teil.`,
    },
  ],
});
