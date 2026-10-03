import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 04a: Petri nets, their building blocks, firing, conflicts and liveness. */
export const petriNetze = topic({
  id: 'petri-netze',
  chapter: '04a',
  title: 'Petri-Netze: Begriffe',
  summary:
    'Stellen, Transitionen, Kanten, Marken, Kapazität, Gewicht, Aktiviertheit, Schalten, Konflikt, Lebendigkeit.',
  definitions: [
    {
      id: 'petri-netz',
      title: 'Petri-Netz',
      ref: '04a · Petri-Netze',
      statement: r`**Petri-Netze** (Carl Petri, 1962) modellieren **diskrete, verteilte Systeme**. Sie heißen auch Stellen/Transitions-Netze (S/T-Netze).

- Basierend auf endlichen Automaten entwickelt, um **Nebenläufigkeit** abbilden zu können.
- Neben der grafischen Darstellung gibt es eine streng **formale Definition** – Eigenschaften von Modellen können damit automatisiert bewiesen werden.`,
      note: r`Sie stammen nicht aus der Geschäftsprozessmodellierung, sind aber dafür einsetzbar.`,
    },
    {
      id: 'bausteine',
      title: 'Stellen, Transitionen, Kanten',
      ref: '04a · Bausteine von Petri-Netzen 1',
      statement: r`- **Stellen** (auch Plätze) sind die **passiven** Komponenten; sie können Marken enthalten. Dargestellt als Kreise.
- **Transitionen** sind die **aktiven** Komponenten. Dargestellt als Rechtecke/Balken.
- **(Gerichtete) Kanten** verbinden Stellen und Transitionen.

Stellen und Transitionen müssen sich **streng abwechseln**: Kanten führen nie von Stelle zu Stelle oder von Transition zu Transition.`,
    },
    {
      id: 'marken',
      title: 'Marken und Annotationen',
      ref: '04a · Bausteine von Petri-Netzen 2',
      statement: r`**Marken** sind Ressourcen, die „durch das Netz wandern“: Sie lagern in Stellen; Transitionen **vernichten** eingehende und **erzeugen** ausgehende Marken.

**Annotationen:**

- an **Stellen** – Kapazität: Wie viele Marken kann die Stelle aufnehmen? Ohne Annotation **unendlich viele**.
- an **Kanten** – Gewicht: Wie viele Marken gehen gleichzeitig über die Kante? Ohne Annotation **genau eine**.`,
      note: r`Marken „wandern“ nicht wirklich: Eine Transition kann mehr oder weniger Marken erzeugen, als sie verbraucht.`,
    },
    {
      id: 'aktiviert',
      title: 'Aktivierte Transition',
      ref: '04a · Aktiviertheit und Schalten',
      statement: r`Eine Transition heißt **aktiviert** genau dann, wenn

1. **alle Eingangsstellen** ausreichend Marken enthalten (gemäß den Gewichten der Eingangskanten) **und**

2. die **Kapazität jeder Ausgangsstelle** ausreicht, um die entsprechende Anzahl an Marken aufzunehmen.`,
      note: r`Beide Bedingungen prüfen. Die zweite spielt nur bei annotierten Kapazitäten eine Rolle.`,
    },
    {
      id: 'schalten',
      title: 'Schalten',
      ref: '04a · Aktiviertheit und Schalten',
      statement: r`Aktivierte Transitionen **können** schalten. Beim Schalten

1. werden aus **allen Eingangsstellen** Marken entfernt (entsprechend den Gewichten der Eingangskanten),

2. werden **allen Ausgangsstellen** Marken hinzugefügt (entsprechend den Gewichten der Ausgangskanten).

Es kann immer nur **eine Transition pro Zeitschritt** schalten.`,
      note: r`„Können“, nicht „müssen“ – und welche von mehreren aktivierten Transitionen schaltet, legt das Netz nicht fest.`,
    },
    {
      id: 'formal',
      title: 'Formale Darstellung',
      ref: '04a · Formale Darstellung',
      statement: r`Ein Petri-Netz ist ein Tupel $(S, T, F, k, w, m_0)$ mit

- den Stellen $S$ und den Transitionen $T$
- den Kanten (Flussrelation) $F \subseteq (S \times T) \cup (T \times S)$
- Kapazitäten $k: S \to \N$ (ohne Annotation unendlich)
- Kantengewichten $w$ (ohne Annotation 1)
- der Anfangsmarkierung $m_0$ (Vektor mit einem Eintrag je Stelle)`,
      note: r`Beispiel: $S = \{s_1, \dots, s_4\}$, $F = \{(s_1, t_1), (t_1, s_2), \dots\}$, $k(s_3) = 7$, $w(t_2, s_3) = 2$, $m_0 = (0, 0, 0, 1)$.`,
    },
    {
      id: 'konflikt',
      title: 'Konflikt und Konfusion',
      ref: '04a · Konflikte / Konfusionen',
      statement: r`- **Konflikt:** Zwei nicht-nebenläufige Transitionen sind gleichzeitig aktiviert, aber nur eine kann schalten (das Schalten der einen deaktiviert die andere). Welche schaltet, ist unklar: zufällig oder durch externe Entscheidung.
- **Konfusion:** ein von anderer Seite **provozierter** Konflikt – er besteht nur unter bestimmten Randbedingungen, z. B. erst, wenn eine dritte Transition vorher geschaltet hat.`,
      note: r`Beispiel Konflikt: $s_1$ = Geld verfügbar, $t_1$ führt zu „satt“, $t_2$ zu „betrunken“ – eine Marke, zwei aktivierte Transitionen.`,
    },
    {
      id: 'lebendigkeit',
      title: 'Lebendigkeit',
      ref: '04a · Lebendigkeit',
      statement: r`Ein Petri-Netz heißt

- **deadlock-frei** oder **schwach lebendig**, wenn unter jeder erreichbaren Markierung **mindestens eine** Transition aktiviert ist.
- **lebendig** oder **stark lebendig**, wenn aus jeder erreichbaren Markierung **jede** Transition aktivierbar ist (d. h. unter mindestens einer Folgemarkierung aktiviert).
- **tot unter einer Markierung $m$**, wenn keine Transition aktiviert ist.`,
      note: r`„Tot“ ist nicht das Gegenteil von „lebendig“: Ein Netz kann weder schwach lebendig noch (unter $m_0$) tot sein – wenn es erst später in einen Deadlock läuft.`,
    },
    {
      id: 'hlpn',
      title: 'High Level Petri Nets (HLPN)',
      ref: '04a · Ausblick: High Level Petri Nets',
      statement: r`**HLPNs** (manchmal: gefärbte Petri-Netze) machen Marken **individuell und unterscheidbar**. Kanten sind mit Regeln annotiert, welche Bedingungen für die Marken gelten müssen, damit die Transition aktiviert wird. So lassen sich Datentypen, Schaltvariablen und Schaltbedingungen modellieren.`,
    },
  ],
  theorems: [
    {
      id: 'schaltregel',
      title: 'Schaltregel anwenden',
      ref: '04a · Aktivierte Transition / Schaltende Transition',
      statement: r`Für eine Transition $t$ und eine Markierung $m$:

1. **Aktiviert?** Für jede Eingangsstelle $s$: $m(s) \ge w(s, t)$. Für jede Ausgangsstelle $s$: Kapazität reicht für die neuen Marken.

2. **Schalten:** $m'(s) = m(s) - w(s, t) + w(t, s)$ für jede Stelle $s$ (fehlende Kanten zählen 0).

Beispiel: Eingangsstelle A mit 2 Marken, Eingangskante mit Gewicht 2, Ausgangskante mit Gewicht 1 nach B. Aktiviert; nach dem Schalten hat A zwei Marken weniger und B eine mehr.`,
    },
    {
      id: 'muster',
      title: 'Geschäftsprozess-Muster: AND und XOR',
      ref: '04a · Anwendung auf Geschäftsprozesse',
      statement: r`- **AND-Split:** eine **Transition** mit mehreren Ausgangsstellen – alle Zweige erhalten eine Marke (parallel).
- **AND-Join:** eine **Transition** mit mehreren Eingangsstellen – schaltet erst, wenn alle Zweige eine Marke geliefert haben.
- **XOR-Split:** eine **Stelle** mit mehreren ausgehenden Transitionen – nur eine kann die Marke verbrauchen (Konflikt als Entscheidung).
- **XOR-Join:** mehrere Transitionen führen in dieselbe **Stelle**.`,
      note: r`Merkhilfe: AND hängt an Transitionen, XOR an Stellen. Erzeuger-Verbraucher: Prozess A produziert in eine Lager-Stelle, Prozess B kauft daraus.`,
    },
    {
      id: 'ampel',
      title: 'Modellierung: Verkehrsampel',
      ref: '04b · Lösung der Aufgabe, Variante 1 und 2',
      statement: r`**Variante 1 – Stellen für Konfigurationen:** vier Stellen (rot, rot-gelb, grün, gelb) im Kreis, vier Transitionen, **eine** Marke wandert.

**Variante 2 – Stellen für Farben:** nur drei Stellen (rot, gelb, grün). Die Präsenz von Marken legt fest, welche Lampen leuchten; **Kantengewichte** an den Transitionen verhindern falsches Schalten.`,
      note: r`Variante 1 ist ein endlicher Automat im Petri-Netz-Gewand. Variante 2 nutzt, was Petri-Netze mehr können: mehrere Marken gleichzeitig.`,
    },
  ],
  claims: [
    {
      id: 'kante-stelle-stelle',
      statement: r`In einem Petri-Netz darf eine Kante zwei Stellen direkt verbinden.`,
      holds: false,
      reason: r`Stellen und Transitionen wechseln sich streng ab: $F \subseteq (S \times T) \cup (T \times S)$.`,
    },
    {
      id: 'kapazitaet-default',
      statement: r`Eine Stelle ohne Annotation kann beliebig viele Marken aufnehmen.`,
      holds: true,
      reason: r`Ohne Annotation ist die Kapazität unendlich. Eine Kante ohne Annotation hat Gewicht 1.`,
    },
    {
      id: 'muss-schalten',
      statement: r`Eine aktivierte Transition muss sofort schalten.`,
      holds: false,
      reason: r`Sie **kann** schalten. Bei mehreren aktivierten Transitionen ist offen, welche schaltet.`,
    },
    {
      id: 'gleichzeitig',
      statement: r`Sind zwei Transitionen aktiviert, schalten sie im selben Zeitschritt.`,
      holds: false,
      reason: r`Es schaltet immer nur eine Transition pro Zeitschritt.`,
    },
    {
      id: 'marken-erhalten',
      statement: r`Die Gesamtzahl der Marken in einem Petri-Netz bleibt beim Schalten immer gleich.`,
      holds: false,
      reason: r`Transitionen vernichten und erzeugen Marken; bei unterschiedlichen Gewichten oder unterschiedlich vielen Ein- und Ausgangsstellen ändert sich die Anzahl.`,
    },
    {
      id: 'ausgang-kapazitaet',
      statement: r`Eine Transition kann nicht aktiviert sein, wenn eine Ausgangsstelle ihre Kapazität bereits ausgeschöpft hat.`,
      holds: true,
      reason: r`Zweite Bedingung der Aktiviertheit: Die Ausgangsstellen müssen die neuen Marken aufnehmen können.`,
    },
    {
      id: 'tot-gegenteil',
      statement: r`Ein Netz, das nicht lebendig ist, ist tot.`,
      holds: false,
      reason: r`Tot (unter $m$) heißt: keine Transition aktiviert. Ein Netz kann nicht lebendig sein und trotzdem noch schalten können.`,
    },
    {
      id: 'stark-schwach',
      statement: r`Jedes stark lebendige Netz ist auch deadlock-frei.`,
      holds: true,
      reason: r`Ist aus jeder erreichbaren Markierung jede Transition aktivierbar, gibt es immer etwas, das schalten kann.`,
    },
    {
      id: 'transition-aktiv',
      statement: r`Transitionen sind die aktiven, Stellen die passiven Komponenten eines Petri-Netzes.`,
      holds: true,
      reason: r`Stellen lagern Marken, Transitionen verbrauchen und erzeugen sie.`,
    },
  ],
  problems: [
    {
      id: 'jahreszeiten',
      title: 'Jahreszeiten formal angeben',
      source: 'nach 04a · Beispiel: Jahreszeiten',
      points: 5,
      task: r`Modelliere die Jahreszeiten als Petri-Netz: Eine Marke zeigt die aktuelle Jahreszeit; die Transitionen sind die Übergänge (21. März, 21. Juni, 23. September, 21. Dezember). Gib $(S, T, F, m_0)$ für den Start im Winter an. Ist das Netz lebendig?`,
      solution: r`- $S = \{\text{Winter}, \text{Frühling}, \text{Sommer}, \text{Herbst}\}$
- $T = \{t_{Mär}, t_{Jun}, t_{Sep}, t_{Dez}\}$
- $F = \{(\text{Winter}, t_{Mär}), (t_{Mär}, \text{Frühling}), (\text{Frühling}, t_{Jun}), (t_{Jun}, \text{Sommer}), (\text{Sommer}, t_{Sep}), (t_{Sep}, \text{Herbst}), (\text{Herbst}, t_{Dez}), (t_{Dez}, \text{Winter})\}$
- $m_0 = (1, 0, 0, 0)$, alle Gewichte 1, keine Kapazitäten

Das Netz ist **stark lebendig**: Die Marke läuft endlos im Kreis, aus jeder Markierung wird jede Transition wieder aktivierbar. Es gibt nie einen Konflikt.`,
    },
    {
      id: 'ampel-farben',
      title: 'Ampel mit Stellen für Farben',
      source: 'nach 04b · Lösung der Aufgabe, Variante 2',
      points: 9,
      task: r`Eine Ampel durchläuft rot → rot-gelb → grün → gelb → rot. Modelliere sie mit nur **drei** Stellen (rot, gelb, grün); eine Lampe leuchtet, wenn ihre Stelle mindestens eine Marke enthält. Gib Transitionen mit Kantengewichten an und zeige, dass in jeder Markierung genau eine Transition aktiviert ist.`,
      hint: r`Lass „rot“ zwei Marken bedeuten. Gewichte von 2 verhindern, dass eine Transition zur falschen Zeit schaltet.`,
      solution: r`Eine mögliche Lösung, Markierungen als (rot, gelb, grün), $m_0 = (2, 0, 0)$:

~~~
t1:  2·rot          →  1·rot + 1·gelb      rot → rot-gelb
t2:  1·rot + 1·gelb →  2·grün              rot-gelb → grün
t3:  2·grün         →  2·gelb              grün → gelb
t4:  2·gelb         →  2·rot               gelb → rot
~~~

~~~
Markierung          aktiviert   danach
(2,0,0) rot         t1          (1,1,0)
(1,1,0) rot-gelb    t2          (0,0,2)
(0,0,2) grün        t3          (0,2,0)
(0,2,0) gelb        t4          (2,0,0)
~~~

In $(1,1,0)$ kann $t_1$ nicht noch einmal schalten (braucht 2·rot) und $t_4$ nicht (braucht 2·gelb) – genau dafür sind die Gewichte da. „Rot und grün gleichzeitig“ ist nicht erreichbar.`,
    },
    {
      id: 'wochentage',
      title: 'Werktage und Wochenende',
      source: 'nach Übung 6 · Aufgabe 1',
      points: 8,
      task: r`Konstruiere ein Petri-Netz mit den Wochentagen als Plätzen (eine Marke zeigt den aktuellen Tag) sowie je einem Platz „Werktag“ und „Wochenende“, sodass für jeden Tag erkennbar ist, ob er Werktag (Mo–Fr) oder Wochenende (Sa, So) ist.`,
      hint: r`Erst den Kreis der sieben Tage bauen. Dann genau die beiden Übergänge erweitern, an denen sich die Art des Tages ändert.`,
      solution: r`Plätze $s_1, \dots, s_7$ = Montag bis Sonntag, $s_8$ = Werktag, $s_9$ = Wochenende. $m_0 = (1,0,0,0,0,0,0,1,0)$ (Montag, Werktag).

~~~
t1: s1 → s2            Mo → Di
t2: s2 → s3            Di → Mi
t3: s3 → s4            Mi → Do
t4: s4 → s5            Do → Fr
t5: s5 + s8 → s6 + s9  Fr → Sa und Werktag → Wochenende
t6: s6 → s7            Sa → So
t7: s7 + s9 → s1 + s8  So → Mo und Wochenende → Werktag
~~~

$t_5$ kann nur schalten, wenn in $s_5$ (Freitag) **und** $s_8$ (Werktag) je eine Marke liegt; analog $t_7$.`,
    },
    {
      id: 'lebendigkeit-pruefen',
      title: 'Aktiviertheit und Lebendigkeit prüfen',
      source: 'nach 04a · Lebendigkeit',
      points: 7,
      task: r`Netz mit $S = \{s_1, s_2, s_3\}$, $m_0 = (2, 0, 0)$, alle Gewichte 1 außer wo angegeben:

~~~
t1: s1 → s2
t2: s2 → s3
t3: s2 + s3 → 2·s1
~~~

- (a) Welche Transitionen sind unter $m_0$ aktiviert? Schalte $t_1$ zweimal und gib die Markierungen an.
- (b) Unter $(1, 1, 0)$: Gibt es einen Konflikt?
- (c) Ist das Netz deadlock-frei?`,
      solution: r`**(a)** Nur $t_1$. $(2,0,0) \xrightarrow{t_1} (1,1,0) \xrightarrow{t_1} (0,2,0)$.

**(b)** Aktiviert sind $t_1$ (Marke in $s_1$) und $t_2$ (Marke in $s_2$). Sie konkurrieren nicht um dieselbe Marke – beide könnten nacheinander schalten, also kein Konflikt. Einen Konflikt gibt es z. B. unter $(0,1,1)$: $t_2$ und $t_3$ brauchen beide die eine Marke in $s_2$.

**(c)** Nein. $(2,0,0) \to (1,1,0) \xrightarrow{t_2} (1,0,1) \xrightarrow{t_1} (0,1,1) \xrightarrow{t_2} (0,0,2)$: Unter $(0,0,2)$ ist keine Transition aktiviert – das Netz ist dort tot. Es ist also weder schwach noch stark lebendig (aber unter $m_0$ auch nicht tot).`,
    },
  ],
});
