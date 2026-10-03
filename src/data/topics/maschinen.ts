import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02d, second part: Turing machines, Turing-Post programs and register machines. */
export const maschinen = topic({
  id: 'maschinen',
  chapter: '02d',
  title: 'Turing- und Registermaschinen',
  summary:
    'Turingmaschine, Turing-Tabelle, NDTM, Turing-Post-Programme, Registermaschine (RAM), Befehlssatz.',
  definitions: [
    {
      id: 'tm-idee',
      title: 'Turingmaschine: Idee',
      ref: '02d · Turingmaschine',
      statement: r`Mit der Turingmaschine hat Alan Turing erstmals die Begriffe **Algorithmus** und **partiell berechenbare Funktion** mathematisch präzisiert. Ein Algorithmus wird als mechanische Maschine verstanden.

Vorbild: ein Mensch, der auf Karopapier rechnet. Abstraktion:

- ein eindimensionales (unendliches) **Band** mit Zellen,
- zu jedem Zeitpunkt kann nur **eine Zelle** gelesen oder beschrieben werden,
- eine endliche Menge von **Zuständen** (z. B. Berechnungsphasen),
- Zustand + Wert der aktuellen Zelle bestimmen die Rechenoperation.`,
    },
    {
      id: 'tm',
      title: 'Turingmaschine (TM)',
      ref: '02d · Definition Turingmaschine',
      statement: r`Eine **Turingmaschine** ist ein 5-Tupel $M = (Q, \Sigma, B, \delta, q_0)$ mit

- $Q$ – eine Menge von Zuständen
- $\Sigma$ – ein Alphabet
- $B$ – eine unendliche Folge von Speicherzellen (das **Band**)
- $\delta: Q \times \Sigma \to \Sigma \times Q \times \{L, R\}$ – **Turing-Tabelle**, welche den Algorithmus kodiert
- $q_0 \in Q$ – Startzustand`,
      note: r`Es gibt viele äquivalente Definitionen. Ist $\delta$ für die aktuelle Kombination aus Zustand und Symbol **nicht definiert**, hält die TM an.`,
    },
    {
      id: 'ndtm',
      title: 'Nichtdeterministische Turingmaschine (NDTM)',
      ref: '02d · Definition Turingmaschine',
      statement: r`Die **NDTM** definiert man analog zu NFA und NPDA durch Anpassung der Turing-Tabelle – sie bildet in die Potenzmenge ab:

$$\delta: Q \times \Sigma \to \Pot(\Sigma \times Q \times \{L, R\})$$`,
      note: r`Die NDTM taucht bei P und NP wieder auf: „Guess and Check“ entspricht einer NDTM, die stets die richtigen Transitionen wählt.`,
    },
    {
      id: 'turing-tabelle',
      title: 'Eintrag der Turing-Tabelle lesen',
      ref: '02d · Ein genauer Blick auf die Transitionsfunktion',
      statement: r`Ein Eintrag $\delta(z_1, 1) = (1, z_1, R)$ bedeutet: Ist die TM im Zustand $z_1$ und steht der Schreib-Lese-Kopf über einer Zelle mit dem Wert $1$, dann

- **schreibt** sie das angegebene Symbol in die Zelle (hier wieder $1$),
- wechselt in den angegebenen **neuen Zustand** (hier $z_1$),
- und bewegt den Kopf eine Zelle nach rechts ($R$) oder links ($L$).`,
      note: r`Reihenfolge im Tripel: **Symbol, Zustand, Richtung**. In jedem Schritt passiert alles drei – schreiben, Zustand wechseln, bewegen.`,
    },
    {
      id: 'tpp',
      title: 'Turing-Post-Programm (TPP)',
      ref: '02d · Turing-Post-Programme',
      statement: r`Eine Programmiersprache für Turingmaschinen, die die Turing-Tabelle ersetzt. Programme bestehen aus nummerierten Zeilen und Befehlen (analog zu BASIC):

- @@LEFT@@ – bewegt den Schreib-Lese-Kopf nach links
- @@RIGHT@@ – bewegt den Schreib-Lese-Kopf nach rechts
- @@WRITE a@@ – schreibt den Wert $a \in \Sigma$ in die aktuelle Zelle
- @@CASE a JUMP n@@ – falls in der aktuellen Zelle $a$ steht, setze die Ausführung in Zeile $n$ fort
- @@HALT@@ – beendet das TPP`,
      note: r`Zeilennummern übernehmen die Rolle der Zustände. Anders als in der Turing-Tabelle sind Lesen, Schreiben und Bewegen **unabhängige** Befehle. Trifft kein CASE zu, geht es in der nächsten Zeile weiter.`,
    },
    {
      id: 'tpp-erweiterungen',
      title: 'Erweiterungen für TPP: Label und JUMP',
      ref: '02d · Erweiterungen für TPP',
      statement: r`- **Symbolische Label** statt Zeilennummern.
- **Makros:** neue Befehle als Abkürzungen für Folgen vorhandener Befehle.
- @@JUMP m@@ – setze die Ausführung in Zeile $m$ fort (ohne Bedingung). Für $\Sigma = \{a_1, \dots, a_n\}$ ist das nur eine Abkürzung für

~~~
CASE a1 JUMP m
CASE a2 JUMP m
...
CASE an JUMP m
~~~`,
    },
    {
      id: 'registermaschine',
      title: 'Registermaschine (RM, als RAM)',
      ref: '02d · Nachteil von Turingmaschinen',
      statement: r`Realistischeres Modell als die TM, hier als **Random Access Machine**:

- **Direkter** Lese-/Schreibzugriff auf beliebige Speicherzellen (keine Kopfbewegung).
- Das Band ist ein einseitig unendliches **Array** c[1], c[2], c[3], …; jede Zelle speichert eine **natürliche Zahl** (Entkopplung vom Alphabet).
- Die erste Zelle **c[0]** ist der **Akkumulator**, in dem gerechnet wird.
- Ein **Programmzähler** (PC) speichert, welche Anweisung als nächste ausgeführt wird.`,
      note: r`Nachteil der TM: Zwischenergebnisse auf dem Band abzulegen und wieder zu lesen, erfordert viele Kopfbewegungen – umständlich zu programmieren, aufwendig zu bauen.`,
    },
    {
      id: 'rm-befehle',
      title: 'Befehle der Registermaschine',
      ref: '02d · Registermaschinen',
      statement: r`~~~
Load n      c[0] := n                    Wert n in den Akkumulator
Load [n]    c[0] := c[n]                 Wert aus Zelle n laden
Store [n]   c[n] := c[0]                 Akkumulator in Zelle n schreiben
Add [n]     c[0] := c[0] + c[n]
Sub+ [n]    c[0] := max(c[0] - c[n], 0)
Goto i      PC := i
JZero i     weiter bei i, wenn c[0] = 0  (bedingter Sprung)
~~~`,
      note: r`Schon fast eine Assembler-Sprache. @@Sub+@@ wird nie negativ (nur natürliche Zahlen) – deshalb taugt „Sub+, dann JZero“ als Vergleich: Ergebnis 0 heißt $x \le y$. @@Load n@@ (Konstante) nicht mit @@Load [n]@@ (Zelleninhalt) verwechseln.`,
    },
  ],
  theorems: [
    {
      id: 'tm-add1',
      title: 'Turingmaschine „binary add 1“',
      ref: '02d · Beispiel: Turingmaschine für „binary add 1“',
      statement: r`Inkrementiert eine Binärzahl auf dem Band um 1. $\Sigma = \{\#, 0, 1\}$ (# = leere Zelle), $Q = \{z_1, z_2, z_3\}$, Start $z_1$ auf dem ersten Zeichen.

~~~
δ      #           0           1
z1     #, z2, L    0, z1, R    1, z1, R
z2     1, z3, L    1, z3, L    0, z2, L
z3     –           0, z3, L    1, z3, L
~~~

1. $z_1$: Gehe ans rechte Ende der Zahl.

2. $z_2$: Addiere von rechts nach links 1 mit Übertrag (1 wird 0, weiter; 0 oder # wird 1, fertig).

3. $z_3$: Gehe an den Anfang der Zahl. $\delta(z_3, \#)$ ist nicht definiert – die TM hält an.`,
      note: r`Der dritte Schritt ist für die Berechnung nicht erforderlich. $\delta(z_2, \#) = (1, z_3, L)$ behandelt den Überlauf: aus $111$ wird $1000$.`,
    },
    {
      id: 'tpp-add1',
      title: 'TPP für „binary add 1“',
      ref: '02d · TPP für „binary add 1“',
      statement: r`~~~
// rechts neben die Zahl laufen (z1)
 10 RIGHT
 20 CASE 0 JUMP 10
 30 CASE 1 JUMP 10
// von rechts nach links 1en zu 0en ändern (z2)
 40 LEFT
 50 CASE 1 JUMP 80
 60 CASE 0 JUMP 100
 70 CASE # JUMP 100
 80 WRITE 0
 90 CASE 0 JUMP 40
100 WRITE 1
// ganz nach links laufen (z3)
110 LEFT
120 CASE 0 JUMP 110
130 CASE 1 JUMP 110
140 HALT
~~~`,
      note: r`Zeile 90: Nach @@WRITE 0@@ steht sicher eine 0 in der Zelle – @@CASE 0 JUMP 40@@ wirkt hier wie ein unbedingter Sprung.`,
    },
    {
      id: 'rm-funktion',
      title: 'Funktionen mit einer Registermaschine berechnen',
      ref: '02d · Beispiel: ggT als C-Code und als RM-Programm',
      statement: r`Um eine Funktion $f: \N^k \to \N^l$ mit einer RM zu berechnen:

- Schreibe die Argumente $x_1, \dots, x_k$ in die Zellen c[1], …, c[k].
- Alle anderen Zellen haben den Wert 0.
- Bei Programmende steht das Ergebnis $r_1, \dots, r_l$ in den Zellen c[1], …, c[l].`,
    },
    {
      id: 'rm-ggt',
      title: 'RM-Programm für den ggT',
      ref: '02d · Beispiel: ggT als C-Code und als RM-Programm',
      statement: r`Hochsprache: solange $y \ne 0$: falls $x > y$, dann $x = x - y$, sonst $y = y - x$; Ergebnis $x$.

~~~
 0: Load [1]    // x
 1: Sub+ [2]    // x - y
 2: JZero 5     // x <= y
 3: Store [1]   // x = x - y
 4: Goto 0
 5: Load [2]    // y
 6: Sub+ [1]    // y - x
 7: JZero 10    // y == 0 (nach y - x)
 8: Store [2]   // y = y - x
 9: Goto 0
10: Halt
~~~`,
      note: r`Muster für if/else: Differenz mit @@Sub+@@ bilden, mit @@JZero@@ verzweigen, am Ende jedes Zweigs @@Goto@@. Das Programm hält, sobald $x = y$ erreicht ist ($y - x = 0$); dann steht der ggT in c[1].`,
    },
  ],
  claims: [
    {
      id: 'tm-ein-schritt',
      statement: r`Eine Turingmaschine schreibt in jedem Schritt ein Symbol, wechselt den Zustand und bewegt den Kopf um eine Zelle.`,
      holds: true,
      reason: r`$\delta: Q \times \Sigma \to \Sigma \times Q \times \{L, R\}$ liefert genau diese drei Dinge.`,
    },
    {
      id: 'tm-stehenbleiben',
      statement: r`Nach Definition der Vorlesung kann der Kopf einer TM in einem Schritt auch stehen bleiben.`,
      holds: false,
      reason: r`Die Bewegung ist aus $\{L, R\}$ – links oder rechts. (Andere, äquivalente Definitionen erlauben auch Stehenbleiben.)`,
    },
    {
      id: 'tm-halt',
      statement: r`Die TM „binary add 1“ hält an, weil $\delta(z_3, \#)$ nicht definiert ist.`,
      holds: true,
      reason: r`Erreicht der Kopf im Zustand $z_3$ das Leerzeichen links der Zahl, gibt es keinen Tabelleneintrag – die TM hält.`,
    },
    {
      id: 'tpp-zustaende',
      statement: r`In einem Turing-Post-Programm übernehmen die Zeilennummern die Rolle der Zustände.`,
      holds: true,
      reason: r`Wo das Programm gerade steht, kodiert die Berechnungsphase – so wie der Zustand in der Turing-Tabelle.`,
    },
    {
      id: 'jump-makro',
      statement: r`@@JUMP m@@ ist ein echter neuer Befehl, der sich nicht durch die fünf Grundbefehle ausdrücken lässt.`,
      holds: false,
      reason: r`Es ist ein Makro: ein @@CASE a JUMP m@@ für jedes Symbol des Alphabets.`,
    },
    {
      id: 'akkumulator',
      statement: r`In der Registermaschine wird im Akkumulator c[0] gerechnet.`,
      holds: true,
      reason: r`Add und Sub+ verändern c[0]; Load und Store übertragen Werte zwischen c[0] und den übrigen Zellen.`,
    },
    {
      id: 'sub-negativ',
      statement: r`Nach @@Load 3@@ und @@Sub+ [1]@@ mit c[1] = 5 steht im Akkumulator −2.`,
      holds: false,
      reason: r`@@Sub+@@ rechnet $\max(c[0] - c[n], 0)$: Das Ergebnis ist 0. Zellen speichern nur natürliche Zahlen.`,
    },
    {
      id: 'load-klammern',
      statement: r`@@Load 2@@ und @@Load [2]@@ bewirken dasselbe.`,
      holds: false,
      reason: r`@@Load 2@@ lädt die **Zahl** 2, @@Load [2]@@ den **Inhalt der Zelle** 2.`,
    },
    {
      id: 'rm-zellen',
      statement: r`Eine Zelle der Registermaschine speichert genau ein Symbol des Alphabets.`,
      holds: false,
      reason: r`Jede Zelle speichert eine natürliche Zahl beliebiger Größe – die RM ist vom Alphabet entkoppelt. Ein Symbol je Zelle hat die Turingmaschine.`,
    },
    {
      id: 'tm-typ0',
      statement: r`Turingmaschinen lösen das Wortproblem für Typ-0-Sprachen, soweit es entscheidbar ist.`,
      holds: true,
      reason: r`Übersicht der Folien: allgemeine Grammatiken ↔ TM, NDTM.`,
    },
  ],
  problems: [
    {
      id: 'tm-lauf',
      title: 'Turingmaschine von Hand ausführen',
      source: 'nach 02d · Beispiel: Turingmaschine für „binary add 1“',
      points: 8,
      task: r`Führe die TM „binary add 1“ auf dem Band @@#1011#@@ aus (Kopf auf der ersten 1, Zustand $z_1$).

~~~
δ      #           0           1
z1     #, z2, L    0, z1, R    1, z1, R
z2     1, z3, L    1, z3, L    0, z2, L
z3     –           0, z3, L    1, z3, L
~~~

Gib die Konfigurationen an (Zustand, Band, Kopfposition) und das Ergebnis.`,
      solution: r`Die eckigen Klammern markieren die Kopfposition.

~~~
z1   # [1] 0  1  1  #
z1   #  1 [0] 1  1  #
z1   #  1  0 [1] 1  #
z1   #  1  0  1 [1] #
z1   #  1  0  1  1 [#]     Ende erreicht: # schreiben, z2, L
z2   #  1  0  1 [1] #      1 → 0, Übertrag, L
z2   #  1  0 [1] 0  #      1 → 0, Übertrag, L
z2   #  1 [0] 0  0  #      0 → 1, z3, L
z3   # [1] 1  0  0  #      nach links laufen
z3  [#] 1  1  0  0  #      δ(z3, #) nicht definiert: Halt
~~~

Ergebnis: $1100$ (11 + 1 = 12).`,
    },
    {
      id: 'tm-add2',
      title: 'Turingmaschine für bin+2',
      source: 'nach Übung 5 · Aufgabe 2',
      points: 8,
      task: r`Konstruiere aus der TM „binary add 1“ eine Turingmaschine, die 2 zu einer Binärzahl auf dem Band addiert. Warum genügt es nicht, $\delta(z_3, \#) = (\#, z_1, R)$ zu ergänzen?`,
      hint: r`Zweimal 1 addieren. Wie stellst du sicher, dass die Maschine nach dem zweiten Durchlauf anhält?`,
      solution: r`**Idee:** Die TM für bin+1 zweimal hintereinander ausführen.

**Warum nicht einfach zurückspringen?** Mit $\delta(z_3, \#) = (\#, z_1, R)$ gäbe es keine Abbruchbedingung mehr – die Maschine würde endlos addieren und nie terminieren.

**Lösung:** Zustände duplizieren: $Q' = \{z_1, \dots, z_6\}$; $z_4, z_5, z_6$ sind Kopien von $z_1, z_2, z_3$ und übernehmen die zweite Addition. Neu ist nur der Übergang $\delta(z_3, \#) = (\#, z_4, R)$.

~~~
δ      #           0           1
z1     #, z2, L    0, z1, R    1, z1, R
z2     1, z3, L    1, z3, L    0, z2, L
z3     #, z4, R    0, z3, L    1, z3, L
z4     #, z5, L    0, z4, R    1, z4, R
z5     1, z6, L    1, z6, L    0, z5, L
z6     –           0, z6, L    1, z6, L
~~~

Jetzt beendet $\delta(z_6, \#)$ (nicht definiert) die Ausführung nach der zweiten Addition. Generischer wäre ein Zähler auf dem Band – hier unnötig kompliziert.`,
    },
    {
      id: 'tpp-dez',
      title: 'Turing-Post-Programm für dez+1',
      source: 'nach Übung 5 · Hausaufgabe 2',
      points: 10,
      task: r`Schreibe ein TPP, das 1 zu einer Dezimalzahl auf dem Band addiert ($\Sigma = \{0, \dots, 9, \#\}$). Du darfst das JUMP-Makro und Label verwenden. Beim Start steht der Kopf auf dem ersten (linksten) Zeichen.`,
      hint: r`Erst ganz nach rechts. Dann je Stelle elf Fälle: 0–8 werden um 1 erhöht (fertig), 9 wird 0 mit Übertrag nach links, # wird 1.`,
      solution: r`~~~
anfang:     RIGHT
            CASE # JUMP addieren     // ganz rechts angekommen
            JUMP anfang
addieren:   LEFT
            CASE # JUMP fall_#zu1
            CASE 0 JUMP fall_0zu1
            CASE 1 JUMP fall_1zu2
            ...                      // ebenso für 2 bis 7
            CASE 8 JUMP fall_8zu9
            WRITE 0                  // Fall 9: wird 0, Übertrag
            JUMP addieren
fall_#zu1:  WRITE 1
            JUMP ende
fall_0zu1:  WRITE 1
            JUMP ende
fall_1zu2:  WRITE 2
            JUMP ende
            ...                      // ebenso bis fall_8zu9: WRITE 9
ende:       HALT
~~~

In den Fällen 0–8 endet das Programm nach dem Schreiben. Bei 9 wird 0 geschrieben und die Stelle links davon behandelt. Erreicht der Übertrag das # links der Zahl (z. B. $999$), wird daraus eine 1: $1000$.`,
    },
    {
      id: 'rm-ggt-lauf',
      title: 'ggT-Programm der Registermaschine nachvollziehen',
      source: 'nach 02d · Beispiel: ggT als C-Code und als RM-Programm',
      points: 7,
      task: r`Das ggT-Programm (Zeilen 0–10 wie in der Vorlesung) startet mit c[1] = 6 und c[2] = 4. Gib die Werte von c[1] und c[2] nach jedem Schleifendurchlauf an und erkläre, wie das Programm endet.`,
      solution: r`~~~
Durchlauf   Zeilen           Rechnung              c[1]  c[2]
Start                                              6     4
1           0,1,2,3,4        6 - 4 = 2  → x = 2    2     4
2           0,1,2,5,6,7,8,9  2 - 4 = 0  → JZero 5
                             4 - 2 = 2  → y = 2    2     2
3           0,1,2,5,6,7      2 - 2 = 0  → JZero 5
                             2 - 2 = 0  → JZero 10 2     2
~~~

In Zeile 10 hält das Programm. Ergebnis in c[1]: $\text{ggT}(6, 4) = 2$.

Die beiden @@JZero@@ ersetzen die Vergleiche: $x - y = 0$ (mit Sub+) heißt $x \le y$; danach $y - x = 0$ heißt zusätzlich $y \le x$, also $x = y$ – fertig.`,
    },
    {
      id: 'rm-schreiben',
      title: 'Kleine RM-Programme schreiben',
      source: 'nach 02d · Registermaschinen',
      points: 6,
      task: r`Schreibe RM-Programme (Argumente in c[1], c[2]; Ergebnis in c[1]):

- (a) $f(x, y) = x + y$
- (b) $f(x, y) = \max(x, y)$`,
      solution: r`**(a)**

~~~
0: Load [1]
1: Add [2]
2: Store [1]
3: Halt
~~~

**(b)** $y - x = 0$ bedeutet $y \le x$: dann steht das Maximum schon in c[1]. Sonst $y$ nach c[1] kopieren.

~~~
0: Load [2]     // y
1: Sub+ [1]     // y - x
2: JZero 5      // y <= x: fertig
3: Load [2]
4: Store [1]    // x = y
5: Halt
~~~`,
    },
  ],
});
