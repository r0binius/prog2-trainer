import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 04b: reachability table and graph, boundedness and the incidence matrix. */
export const erreichbarkeit = topic({
  id: 'erreichbarkeit',
  chapter: '04b',
  title: 'Petri-Netze: Erreichbarkeit und Inzidenzmatrix',
  summary:
    'Markierung, k-beschränkt, Erreichbarkeitstabelle, Erreichbarkeitsgraph, Inzidenzmatrix, Schaltvektor.',
  definitions: [
    {
      id: 'markierung',
      title: 'Markierung und Erreichbarkeit',
      ref: '04b · Erreichbarkeit',
      statement: r`Ein **Systemzustand** ist immer eine Konfiguration von Marken, also eine **Markierung** (Vektor mit der Markenzahl je Stelle).

Eine Markierung $m_i$ heißt **erreichbar**, wenn sie ausgehend von der Anfangsmarkierung $m_0$ durch eine **Abfolge von Transitionen** entsteht.`,
      note: r`Damit werden Eigenschaften beweisbar: „Das System kann sich nicht aufhängen“, „ein bestimmter Zustand kann (nicht) erreicht werden“.`,
    },
    {
      id: 'beschraenkt',
      title: 'k-beschränktes Netz',
      ref: '04b · Erreichbarkeit',
      statement: r`Ein Petri-Netz heißt **$k$-beschränkt** mit $k \in \N$, wenn ausgehend von $m_0$ bei allen erreichbaren Markierungen **keine Stelle mit mehr als $k$ Marken** belegt wird.`,
      note: r`Beschränktheit ist die Voraussetzung für eine endliche Erreichbarkeitsanalyse. Gegenbeispiel: eine Transition $t_1$ ohne Eingangsstelle mit Ausgangsstelle $s_1$ erzeugt $(0), (1), (2), \dots$ – unendlich viele Markierungen.`,
    },
    {
      id: 'erreichbarkeitstabelle',
      title: 'Erreichbarkeitstabelle',
      ref: '04b · Erreichbarkeitstabelle',
      statement: r`Tabelle mit einer **Zeile je erreichbarer Markierung**: links die Markenzahl je Stelle, rechts für jede Transition die **Folgemarkierung**, die durch ihr Schalten entsteht – oder ein Strich, wenn die Transition nicht aktiviert ist.

~~~
      s1  s2  s3 | t1   t2   t3
m0    1   2   0  | m1   -    -
m1    0   1   2  | -    m2   m3
...
~~~`,
      note: r`Eine Zeile nur mit Strichen ist eine tote Markierung (Deadlock).`,
    },
    {
      id: 'erreichbarkeitsgraph',
      title: 'Erreichbarkeitsgraph',
      ref: '04b · Erreichbarkeitsgraph',
      statement: r`Gerichteter Graph: **Knoten** sind die erreichbaren Markierungen, **Kanten** sind mit der Transition beschriftet, deren Schalten von einer Markierung zur nächsten führt.

Er lässt sich direkt aus der Erreichbarkeitstabelle ableiten: jeder Eintrag $m_j$ in Zeile $m_i$, Spalte $t$ ist eine Kante $m_i \xrightarrow{t} m_j$.`,
      note: r`Tabelle und Graph enthalten dieselbe Information und können beide unendlich sein.`,
    },
    {
      id: 'inzidenzmatrix',
      title: 'Inzidenzmatrix',
      ref: '04b · Inzidenzmatrix',
      statement: r`Die **Inzidenzmatrix** $C$ hat eine **Zeile je Stelle** und eine **Spalte je Transition**. Der Eintrag $C_{i,j}$ gibt an, wie sich die Markenzahl in Stelle $s_i$ ändert, wenn die Transition $t_j$ schaltet:

$$C_{i,j} = \text{(erzeugte Marken)} - \text{(gelöschte Marken)}$$`,
      note: r`Sie dient zur Analyse von Petri-Netzen mit linearen Gleichungssystemen. Spaltenweise lesen: Spalte $j$ ist die Wirkung von $t_j$.`,
    },
    {
      id: 'schaltvektor',
      title: 'Schaltvektor und Markierungsgleichung',
      ref: '04b · Schaltfolgen sind Vektoradditionen',
      statement: r`Schaltet in einer Schaltfolge die Transition $t_j$ genau $u_j$-mal, so gilt für die erreichte Markierung

$$m = m_0 + C \cdot u$$

mit dem **Schaltvektor** $u = (u_1, \dots, u_n)$, $u_j \in \N_0$ (es gibt nur „ganze“ Transitionen).`,
      note: r`Schaltfolgen sind Vektoradditionen: Jedes Schalten von $t_j$ addiert die $j$-te Spalte von $C$.`,
    },
  ],
  theorems: [
    {
      id: 'tabelle-aufstellen',
      title: 'Erreichbarkeitstabelle aufstellen',
      ref: '04b · Erreichbarkeitstabelle',
      statement: r`1. Trage $m_0$ als erste Zeile ein.

2. Prüfe für die aktuelle Zeile **jede Transition**: aktiviert? Wenn ja, berechne die Folgemarkierung. Ist sie neu, bekommt sie die nächste freie Nummer und eine neue Zeile; sonst trage die vorhandene Nummer ein.

3. Wiederhole Schritt 2 für jede Zeile, bis **alle Zeilen abgearbeitet** sind.`,
      note: r`Für einen **Nicht**-Erreichbarkeitsbeweis muss die Tabelle **vollständig** sein. Für einen Erreichbarkeitsbeweis genügt ein Pfad.`,
    },
    {
      id: 'matrix-aufstellen',
      title: 'Inzidenzmatrix aufstellen',
      ref: '04b · Inzidenzmatrix',
      statement: r`Für jede Stelle $s_i$ und Transition $t_j$: Gewicht der Kante $t_j \to s_i$ **minus** Gewicht der Kante $s_i \to t_j$ (fehlende Kante = 0).

Beispielnetz ($t_1$: $s_1 + s_2 \to 2 s_3$; $t_2$: $s_3 \to s_1$; $t_3$: $s_3 \to s_2$):

$$C = \begin{pmatrix} 0-1 & 1-0 & 0-0 \\ 0-1 & 0-0 & 1-0 \\ 2-0 & 0-1 & 0-1 \end{pmatrix} = \begin{pmatrix} -1 & 1 & 0 \\ -1 & 0 & 1 \\ 2 & -1 & -1 \end{pmatrix}$$`,
      note: r`Wenn $t_1$ schaltet, werden in $s_3$ zwei Marken erzeugt und keine gelöscht: $C_{3,1} = 2$.`,
    },
    {
      id: 'nicht-erreichbar',
      title: 'Nicht-Erreichbarkeit mit der Inzidenzmatrix zeigen',
      ref: '04b · Schaltfolgen sind Vektoradditionen',
      statement: r`Ist $m$ erreichbar, so hat $m = m_0 + C \cdot u$ eine Lösung $u$ in den natürlichen Zahlen. Umkehrschluss:

**Hat das Gleichungssystem keine Lösung in $\N_0$, ist $m$ nicht erreichbar.**

Beispiel $m_a = (2, 2, 0)$ mit $m_0 = (1, 2, 0)$: $2 = 1 - u_1 + u_2$, $2 = 2 - u_1 + u_3$, $0 = 2u_1 - u_2 - u_3$. Addieren aller drei Gleichungen ergibt $4 = 3$ – keine Lösung.`,
      note: r`Nur „manchmal“ hilfreich: Die Gleichung ist eine **notwendige**, keine hinreichende Bedingung. Hat sie eine Lösung, kann die Markierung trotzdem unerreichbar sein (die Reihenfolge des Schaltens wird ignoriert). Dann hilft die Erreichbarkeitstabelle.`,
    },
  ],
  claims: [
    {
      id: 'tabelle-endlich',
      statement: r`Die Erreichbarkeitstabelle eines Petri-Netzes ist immer endlich.`,
      holds: false,
      reason: r`Nur bei beschränkten Netzen. Eine Transition ohne Eingangsstelle erzeugt unendlich viele Markierungen.`,
    },
    {
      id: 'matrix-zeilen',
      statement: r`Die Inzidenzmatrix hat eine Zeile je Stelle und eine Spalte je Transition.`,
      holds: true,
      reason: r`$C_{i,j}$: Änderung der Markenzahl in $s_i$, wenn $t_j$ schaltet.`,
    },
    {
      id: 'matrix-eintrag',
      statement: r`Verbraucht $t_2$ eine Marke aus $s_3$ und erzeugt dort keine, so ist $C_{3,2} = 1$.`,
      holds: false,
      reason: r`Erzeugt minus gelöscht: $0 - 1 = -1$.`,
    },
    {
      id: 'loesung-erreichbar',
      statement: r`Hat $m = m_0 + C \cdot u$ eine Lösung in den natürlichen Zahlen, so ist $m$ erreichbar.`,
      holds: false,
      reason: r`Die Gleichung ist nur notwendig. Sie sagt nichts darüber, ob die Transitionen in irgendeiner Reihenfolge auch wirklich aktiviert sind.`,
    },
    {
      id: 'keine-loesung',
      statement: r`Hat $m = m_0 + C \cdot u$ keine Lösung in den natürlichen Zahlen, so ist $m$ nicht erreichbar.`,
      holds: true,
      reason: r`Jede Schaltfolge liefert einen solchen Vektor $u$. Ohne Lösung gibt es keine Schaltfolge.`,
    },
    {
      id: 'strichzeile',
      statement: r`Eine Zeile der Erreichbarkeitstabelle, in der bei allen Transitionen ein Strich steht, ist eine tote Markierung.`,
      holds: true,
      reason: r`Keine Transition ist aktiviert – das Netz ist unter dieser Markierung tot.`,
    },
    {
      id: 'graph-knoten',
      statement: r`Die Knoten des Erreichbarkeitsgraphen sind die Stellen des Petri-Netzes.`,
      holds: false,
      reason: r`Die Knoten sind **Markierungen**, die Kanten Transitionen.`,
    },
    {
      id: 'beweis-tabelle',
      statement: r`Um zu zeigen, dass eine Markierung nicht erreichbar ist, genügt ein Ausschnitt der Erreichbarkeitstabelle.`,
      holds: false,
      reason: r`Die Tabelle muss vollständig sein – sonst könnte die Markierung in einer fehlenden Zeile stehen.`,
    },
  ],
  problems: [
    {
      id: 'tabelle',
      title: 'Erreichbarkeitstabelle aufstellen',
      source: 'nach 04b · Erreichbarkeitstabelle',
      points: 10,
      task: r`Netz mit $m_0 = (1, 2, 0)$:

~~~
t1: s1 + s2 → 2·s3
t2: s3 → s1
t3: s3 → s2
~~~

Stelle die vollständige Erreichbarkeitstabelle auf. Gibt es tote Markierungen? Ist das Netz beschränkt?`,
      solution: r`~~~
      s1  s2  s3 | t1   t2   t3
m0    1   2   0  | m1   -    -
m1    0   1   2  | -    m2   m3
m2    1   1   1  | m4   m5   m0
m3    0   2   1  | -    m0   m6
m4    0   0   3  | -    m7   m1
m5    2   1   0  | m7   -    -
m6    0   3   0  | -    -    -
m7    1   0   2  | -    m8   m2
m8    2   0   1  | -    m9   m5
m9    3   0   0  | -    -    -
~~~

Tote Markierungen: $m_6 = (0,3,0)$ und $m_9 = (3,0,0)$ – das Netz ist nicht deadlock-frei. Es ist 3-beschränkt (die Gesamtzahl der Marken bleibt 3).`,
    },
    {
      id: 'matrix',
      title: 'Inzidenzmatrix und Nicht-Erreichbarkeit',
      source: 'nach 04b · Schaltfolgen sind Vektoradditionen',
      points: 8,
      task: r`Für dasselbe Netz ($t_1$: $s_1 + s_2 \to 2 s_3$; $t_2$: $s_3 \to s_1$; $t_3$: $s_3 \to s_2$; $m_0 = (1, 2, 0)$):

- (a) Stelle die Inzidenzmatrix auf.
- (b) Zeige, dass $m_a = (2, 2, 0)$ nicht erreichbar ist.
- (c) Prüfe die Gleichung für $(0, 0, 3)$ und gib eine Schaltfolge an.`,
      solution: r`**(a)**

$$C = \begin{pmatrix} -1 & 1 & 0 \\ -1 & 0 & 1 \\ 2 & -1 & -1 \end{pmatrix}$$

**(b)** $m_a = m_0 + C \cdot u$:

~~~
2 = 1 - u1 + u2
2 = 2 - u1      + u3
0 = 0 + 2u1 - u2 - u3
---------------------- addieren
4 = 3
~~~

Widerspruch – keine Lösung, also ist $(2,2,0)$ nicht erreichbar. (Anschaulich: Jede Transition erhält die Gesamtzahl von 3 Marken, $m_a$ hätte 4.)

**(c)** $0 = 1 - u_1 + u_2$, $0 = 2 - u_1 + u_3$, $3 = 2u_1 - u_2 - u_3$ wird z. B. von $u = (2, 1, 0)$ gelöst. Schaltfolge: $(1,2,0) \xrightarrow{t_1} (0,1,2) \xrightarrow{t_2} (1,1,1) \xrightarrow{t_1} (0,0,3)$ – $t_1$ zweimal, $t_2$ einmal. ✓`,
    },
    {
      id: 'wochentage-beweise',
      title: 'Beweise am Wochentage-Netz',
      source: 'nach Übung 6 · Aufgabe 2',
      points: 8,
      task: r`Wochentage-Netz: $s_1, \dots, s_7$ = Mo–So, $s_8$ = Werktag, $s_9$ = Wochenende; $t_1, \dots, t_4, t_6$ schalten den Tag weiter, $t_5$: $s_5 + s_8 \to s_6 + s_9$, $t_7$: $s_7 + s_9 \to s_1 + s_8$; $m_0 = (1,0,0,0,0,0,0,1,0)$.

- (a) Zeige, dass gleichzeitig Samstag und Wochenende sein kann.
- (b) Zeige, dass niemals gleichzeitig Dienstag und Wochenende sein kann.`,
      solution: r`Vollständige Erreichbarkeitstabelle:

~~~
      s1 s2 s3 s4 s5 s6 s7 s8 s9 | t1  t2  t3  t4  t5  t6  t7
m0    1  0  0  0  0  0  0  1  0  | m1  -   -   -   -   -   -
m1    0  1  0  0  0  0  0  1  0  | -   m2  -   -   -   -   -
m2    0  0  1  0  0  0  0  1  0  | -   -   m3  -   -   -   -
m3    0  0  0  1  0  0  0  1  0  | -   -   -   m4  -   -   -
m4    0  0  0  0  1  0  0  1  0  | -   -   -   -   m5  -   -
m5    0  0  0  0  0  1  0  0  1  | -   -   -   -   -   m6  -
m6    0  0  0  0  0  0  1  0  1  | -   -   -   -   -   -   m0
~~~

**(a)** Gesucht ist eine erreichbare Markierung mit $s_6 > 0$ und $s_9 > 0$: $m_5$ erfüllt das. Pfad im Erreichbarkeitsgraphen: $m_0 \xrightarrow{t_1} m_1 \xrightarrow{t_2} m_2 \xrightarrow{t_3} m_3 \xrightarrow{t_4} m_4 \xrightarrow{t_5} m_5$.

**(b)** Gesucht wäre eine Markierung mit $s_2 > 0$ und $s_9 > 0$. Die Tabelle ist vollständig, und nur $m_1$ hat $s_2 > 0$ – dort ist $s_9 = 0$. Also kann nie gleichzeitig Dienstag und Wochenende sein.`,
    },
    {
      id: 'graph',
      title: 'Erreichbarkeitsgraph eines kleinen Netzes',
      source: 'nach 04b · Erreichbarkeitsgraph aus Erreichbarkeitstabelle ableiten',
      points: 7,
      task: r`Netz mit $m_0 = (2, 0, 0)$: $t_1$: $s_1 \to s_2$; $t_2$: $s_2 \to s_3$; $t_3$: $s_2 + s_3 \to 2 s_1$. Stelle die Erreichbarkeitstabelle auf und gib die Kanten des Erreichbarkeitsgraphen an.`,
      solution: r`~~~
      s1  s2  s3 | t1   t2   t3
m0    2   0   0  | m1   -    -
m1    1   1   0  | m2   m3   -
m2    0   2   0  | -    m4   -
m3    1   0   1  | m4   -    -
m4    0   1   1  | -    m5   m0
m5    0   0   2  | -    -    -
~~~

Kanten: $m_0 \xrightarrow{t_1} m_1$, $m_1 \xrightarrow{t_1} m_2$, $m_1 \xrightarrow{t_2} m_3$, $m_2 \xrightarrow{t_2} m_4$, $m_3 \xrightarrow{t_1} m_4$, $m_4 \xrightarrow{t_2} m_5$, $m_4 \xrightarrow{t_3} m_0$.

$m_5 = (0,0,2)$ ist tot. Über $t_3$ gibt es einen Zyklus zurück nach $m_0$.`,
    },
  ],
});
