import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 07a: Java's mental model, the JVM, stack and heap, references, the object lifecycle, memory errors. */
export const javaModell = topic({
  id: 'java-modell',
  chapter: '07a',
  title: 'Java: Mental Model, JVM und Speicher',
  summary:
    'WORA, Bytecode und JVM, Unterschiede zu C++ und Python, Primitives und Referenzen, Garbage Collection, NullPointerException, Leaks.',
  definitions: [
    {
      id: 'wora',
      title: 'WORA – Write Once, Run Anywhere',
      ref: '07a · The Power of the JVM',
      statement: r`In C++ kompiliert man gezielt für Windows x86, Mac M1 oder Linux. In Java kompiliert man **nur für die JVM**.

Solange auf dem Zielgerät eine kompatible JVM installiert ist, läuft der kompilierte @@.class@@-Bytecode überall gleich – ohne eine Zeile zu ändern.

**Die Portabilität kommt von der JVM, nicht vom Quellcode.**`,
    },
    {
      id: 'bytecode',
      title: 'Bytecode und JVM',
      ref: '07a · The Hybrid Execution Journey',
      statement: r`- **Bytecode** (@@.class@@): die plattformneutrale Zwischensprache, in die der Compiler @@javac@@ den Quellcode übersetzt.
- **JVM (Java Virtual Machine):** die Laufzeitumgebung auf dem jeweiligen Rechner; sie liest den Bytecode und führt ihn aus.`,
      note: r`Analogie: Quellcode ist ein Buch auf Englisch, Bytecode das (universelle) Notenblatt, die JVM der Musiker, der es auf seinem Instrument spielt (Windows, Mac, Linux).`,
    },
    {
      id: 'jit',
      title: 'JIT Compilation',
      ref: '07a · Java vs. Python: Performance & Structure',
      statement: r`Anders als die Standard-Interpretation von Python benutzt Java in der JVM einen **Just-In-Time-Compiler (JIT)**: Häufig ausgeführter Code wird **während der Laufzeit** in rohe Maschineninstruktionen übersetzt.`,
    },
    {
      id: 'primitiv-referenz',
      title: 'Primitive Types vs. Reference Types',
      ref: '07a · Primitives vs. Reference Types',
      statement: r`~~~
               Primitive (int, char, double)   Reference (String, ArrayList, Klassen)
speichert      den tatsächlichen Wert          eine Adresse, die auf die Daten zeigt
liegt          auf dem Stack                   Objekt auf dem Heap
Default        0, 0.0, false                   null
Fähigkeiten    nur Daten, kein . Operator      Zustand und Methoden
~~~`,
      note: r`Java ist „zu 95 % rein“ objektorientiert: Alles lebt in Klassen – mit der Ausnahme der Primitives, die es nur der Geschwindigkeit wegen gibt.`,
    },
    {
      id: 'referenz',
      title: 'Object Reference',
      ref: '07a · Safety First: Java vs. C++',
      statement: r`Java benutzt statt roher Adressen **Referenzen**: streng verwaltete, sichere Pointer, die man nicht „kaputt machen“ kann. Es gibt keine Pointer-Arithmetik (kein @@ptr++@@).

Eine Objektvariable hält **nicht das Objekt**, sondern die Referenz (die Speicheradresse im Heap).`,
      note: r`@@Car myCar;@@ erzeugt **kein** Auto – nur eine leere Referenzvariable auf dem Stack, die null enthält. Erst @@new@@ baut das Objekt im Heap.`,
    },
    {
      id: 'gc',
      title: 'Garbage Collector',
      ref: "07a · The Three Stages of an Object's Life",
      statement: r`Der **Garbage Collector (GC)** ist ein Hintergrund-Thread der JVM. Er durchsucht periodisch den Heap, findet verlassene („unreachable“) Objekte, gibt ihren Speicher frei und stellt ihn für künftige @@new@@-Aufrufe bereit.

Es gibt in Java weder @@delete@@ noch @@free()@@.`,
    },
    {
      id: 'npe',
      title: 'NullPointerException (NPE)',
      ref: '07a · Common Memory Errors (Part 1)',
      statement: r`Eine **NullPointerException** entsteht, wenn man mit dem Punkt-Operator auf eine Referenz zugreift, die @@null@@ ist: Man will auf einem Objekt handeln, das im Heap **nicht existiert**.

~~~
Car myCar = null;
myCar.startEngine();    // NullPointerException
~~~`,
      note: r`Mailbox-Analogie: myCar ist ein Zettel (Stack), der die Adresse eines Hauses (Heap) tragen soll. Steht „leer“ darauf, gibt es nichts, wohin man gehen könnte.`,
    },
  ],
  theorems: [
    {
      id: 'drei-schritte',
      title: 'Vom Code zur Ausführung: drei Schritte',
      ref: '07a · The Hybrid Execution Journey',
      statement: r`1. **Source Code** (@@.java@@): schreibt der Programmierer.
2. **Bytecode** (@@.class@@): @@javac@@ übersetzt den Code in die plattformneutrale Zwischensprache.
3. **Runtime (JVM):** Die JVM auf dem Rechner des Nutzers liest den Bytecode und führt ihn aus.

Java ist damit ein **Hybrid**: erst kompiliert (zu Bytecode), dann von der JVM ausgeführt (interpretiert und per JIT übersetzt).`,
    },
    {
      id: 'java-vs-cpp',
      title: 'Java vs. C++',
      ref: '07a · Java vs C++ (Core Differences)',
      statement: r`~~~
Merkmal                Java                       C++
Memory Management      automatisch (GC)           manuell (new/delete)
Pointer                versteckt (Referenzen)     explizit
Multiple Inheritance   nur über Interfaces        unterstützt
Plattform              JVM-basiert                kompiliert zu Maschinencode
~~~

Was Java „weggenommen“ hat, zum Schutz: **No Pointers**, **Memory Safety** (Array-Bounds-Checks und Null-Prüfung sind eingebaut), **Automatic Management** (kein delete).`,
    },
    {
      id: 'struktur',
      title: 'Strukturregeln eines Java-Programms',
      ref: '07a · Java Program Structure Anatomy',
      statement: r`- **Packages:** Namensräume ganz oben in der Datei, etwa @@package com.university.assignment1;@@ – sie organisieren das Projekt und vermeiden Namenskonflikte.
- **Classes:** **Jede** ausführbare Zeile lebt in einer Klasse. Keine losen, globalen Funktionen wie in Python oder C++.
- **Entry Point:** @@public static void main(String[] args)@@
- **File Naming Rule:** Der Dateiname muss **exakt** dem Namen der public-Klasse entsprechen – @@public class Hello@@ steht in @@Hello.java@@.`,
    },
    {
      id: 'stack-heap',
      title: 'Stack und Heap in der JVM',
      ref: '07a · The Core Divide: Stack vs. Heap',
      statement: r`**Stack (Execution & Scope):** schnell, leichtgewichtig, automatisch nach LIFO verwaltet. Speichert Methodenaufrufe, lokale **primitive** Variablen und die **Referenzvariablen**.

**Heap (The Object Warehouse):** großer, dynamischer Speicherpool. Speichert **alle Objekte**, egal wo sie erzeugt wurden; wird von der ganzen Anwendung geteilt.

~~~
int age = 21;                      // 21 direkt auf dem Stack
String name = new String("Jack");  // Objekt im Heap (z. B. 0x7A),
                                   // name auf dem Stack hält 0x7A
~~~`,
    },
    {
      id: 'referenz-kopie',
      title: 'Zuweisung kopiert die Referenz',
      ref: '07a · Object Creation & Reference Copying',
      statement: r`In Java (wie in Python) kopiert die Zuweisung einer Objektvariablen **nicht die Daten**, sondern die **Referenzadresse**.

~~~
Car car1 = new Car("Red");   // car1 -> 0x99
Car car2 = car1;             // car2 -> 0x99
car2.color = "Blue";
System.out.println(car1.color);   // Blue
~~~

Es gibt weiterhin nur **ein** Car-Objekt im Speicher. Eine Änderung über car2 ändert car1.`,
      note: r`Der große Unterschied zu C++: Dort legt @@Car car2 = car1;@@ eine Kopie des Objekts an (Value Semantics).`,
    },
    {
      id: 'drei-phasen',
      title: 'Die drei Lebensphasen eines Objekts',
      ref: "07a · The Three Stages of an Object's Life",
      statement: r`**1. Birth (Instantiation):** ausgelöst durch @@new@@. Die JVM sucht im Heap freien Speicher passender Größe, ein **Konstruktor** initialisiert ihn, die Adresse geht an die Referenzvariable.

**2. Abandonment (Losing Reachability):** Ein Objekt wird in dem Moment freigabefähig, in dem **keine aktive Referenz** vom Stack es mehr erreicht – weil die Methode endet (der Stack Frame verschwindet) oder die Referenz umgesetzt bzw. gelöscht wird (@@myObject = null;@@).

**3. Death (Garbage Collection):** Der GC gibt den Speicher irgendwann frei.`,
      note: r`Nach @@s1 = null;@@ ist das Objekt **nicht sofort** gelöscht – nur unerreichbar. @@System.gc()@@ ist eine Bitte: Die JVM **kann** das Objekt dann entfernen.`,
    },
    {
      id: 'java-leak',
      title: 'Memory Leaks in Java',
      ref: '07a · Common Memory Errors (Part 2)',
      statement: r`„Java hat Garbage Collection, also sind Memory Leaks unmöglich“ – **falsch**.

Ein Leak entsteht, wenn die Anwendung **Referenzen auf Objekte behält**, die die Programmlogik nie wieder benutzt. Weil noch ein gültiger Verweis existiert (vom Stack oder von einem langlebigen globalen Objekt), hält der GC sie für wichtig und löscht sie nie.

Beispiel: eine @@static@@-Liste als Cache, in die eine Schleife immer neue Objekte legt. Die Liste verschwindet nie, der Heap wächst, bis @@java.lang.OutOfMemoryError: Java heap space@@ kommt.`,
      note: r`Java verwaltet den Speicher automatisch, kann aber schlechte Logik nicht erkennen.`,
    },
  ],
  claims: [
    {
      id: 'portabel-quelle',
      statement: r`Java-Programme sind portabel, weil der Java-Quellcode auf jedem Betriebssystem direkt ausgeführt wird.`,
      holds: false,
      reason: r`Ausgeführt wird der Bytecode von der JVM. Die Portabilität kommt von der JVM, nicht vom Quellcode.`,
      ref: '07a · The Power of the JVM',
    },
    {
      id: 'javac',
      statement: r`@@javac@@ übersetzt .java-Dateien in plattformneutralen Bytecode (.class).`,
      holds: true,
      reason: r`Das ist Schritt 2 der Ausführungsreise; die JVM führt den Bytecode dann aus.`,
      ref: '07a · The Hybrid Execution Journey',
    },
    {
      id: 'car-mycar',
      statement: r`Die Zeile @@Car myCar;@@ erzeugt ein Car-Objekt im Speicher.`,
      holds: false,
      reason: r`Sie erzeugt nur eine Referenzvariable. Das Objekt entsteht erst mit @@new Car(...)@@.`,
      ref: '07a · Concept Review',
    },
    {
      id: 'zuweisung-kopie',
      statement: r`Nach @@Car car2 = car1;@@ existieren in Java zwei unabhängige Car-Objekte.`,
      holds: false,
      reason: r`Kopiert wird die Referenz. Beide Variablen zeigen auf dasselbe Objekt.`,
      ref: '07a · Object Creation & Reference Copying',
    },
    {
      id: 'null-sofort',
      statement: r`Nach @@s1 = null;@@ wird das zuvor referenzierte Objekt sofort aus dem Speicher entfernt.`,
      holds: false,
      reason: r`Es ist nur unerreichbar und damit freigabefähig. Wann der Garbage Collector es entfernt, entscheidet die JVM.`,
      ref: '07a · The Three Stages – Example',
    },
    {
      id: 'leak-moeglich',
      statement: r`Auch in Java kann es Memory Leaks geben.`,
      holds: true,
      reason: r`Wenn Referenzen auf nicht mehr benötigte Objekte bestehen bleiben, etwa in einer static-Collection, kann der GC sie nicht freigeben.`,
      ref: '07a · Java "Memory Leaks"',
    },
    {
      id: 'dateiname',
      statement: r`Die Klasse @@public class Hello@@ darf in der Datei Main.java stehen.`,
      holds: false,
      reason: r`Der Dateiname muss exakt dem Namen der public-Klasse entsprechen: Hello.java.`,
      ref: '07a · Java Program Structure Anatomy',
    },
    {
      id: 'globale-funktion',
      statement: r`In Java kann man wie in C++ Funktionen außerhalb von Klassen definieren.`,
      holds: false,
      reason: r`Jede ausführbare Zeile muss in einer Klasse stehen; es gibt keine losen, globalen Funktionen.`,
      ref: '07a · Java Program Structure Anatomy',
    },
    {
      id: 'multiple-java',
      statement: r`Java unterstützt Multiple Inheritance nur über Interfaces.`,
      holds: true,
      reason: r`Eine Klasse kann nur von einer Klasse erben, aber mehrere Interfaces implementieren. C++ erlaubt Multiple Inheritance von Klassen.`,
      ref: '07a · Java vs C++',
    },
    {
      id: 'default-null',
      statement: r`Der Default-Wert eines Reference Types ist @@null@@.`,
      holds: true,
      reason: r`Primitives haben 0, 0.0 oder false; Referenzen zeigen zunächst auf nichts.`,
      ref: '07a · Primitives vs. Reference Types',
    },
  ],
  problems: [
    {
      id: 'memory-trace',
      title: 'Memory Trace',
      source: 'nach 07a · Code Example: Tracing Stack vs. Heap / Quick Checkpoint',
      points: 8,
      task: r`Student hat ein Attribut @@String name@@. Zeichne Stack und Heap nach Zeile (4) und gib die Ausgabe an. Wie viele Student-Objekte gibt es am Ende im Heap, und welche davon sind für den Garbage Collector freigabefähig?

~~~
int age = 21;                      // (1)
Student s1 = new Student("Alice"); // (2)
Student s2 = s1;                   // (3)
s2.name = "Bob";                   // (4)
System.out.println(s1.name);       // (5)
s1 = new Student("Carol");         // (6)
s2 = null;                         // (7)
~~~`,
      solution: r`Nach Zeile (4):

~~~
Stack                   Heap
age  [21]
s1   [0x10]  ------->   0x10: Student { name = "Bob" }
s2   [0x10]  ------->   (dasselbe Objekt)
~~~

Ausgabe in (5): **Bob** – s1 und s2 halten dieselbe Referenz; es gibt nur ein Objekt.

Nach (6) zeigt s1 auf ein neues Objekt (Carol); das erste Objekt wird noch von s2 gehalten. Nach (7) zeigt keine Referenz mehr auf das erste Objekt.

Am Ende: zwei Student-Objekte im Heap. Das erste (Bob) ist **unreachable** und damit freigabefähig – gelöscht wird es erst, wenn der GC läuft. Das zweite (Carol) ist über s1 erreichbar.`,
    },
    {
      id: 'vergleich-drei',
      title: 'Java zwischen C++ und Python',
      source: 'nach 07a · How Java Fits into Your Toolbox',
      points: 6,
      task: r`Vergleiche C++, Java und Python in je einem Stichwort bei: Typisierung, Speicherverwaltung, Ausführungsmodell. Erkläre anschließend in zwei Sätzen, warum Java als „Middle Ground“ gilt.`,
      solution: r`~~~
                    C++                     Java                      Python
Typisierung         statisch                statisch                  dynamisch
Speicher            manuell (new/delete)    automatisch (GC)          automatisch
Ausführung          nativer Maschinencode   Bytecode + JVM (JIT)      interpretiert
~~~

Java ist **strikt typisiert und strukturiert wie C++**, aber **verwaltet und portabel wie Python**. C++ bietet maximale Geschwindigkeit mit dem Risiko von Memory Leaks und Segmentation Faults, Python maximale Agilität bei langsamerer Ausführung; Java ist der „Enterprise Standard“ für große, zuverlässige Systeme.`,
    },
    {
      id: 'leak-cache',
      title: 'Ein Leak trotz Garbage Collector',
      source: 'nach 07a · Common Memory Errors (Part 2)',
      points: 7,
      task: r`Was passiert beim Ausführen, und warum greift der Garbage Collector nicht ein? Wie behebt man es?

~~~
import java.util.ArrayList;
import java.util.List;

public class LeakDemo {
    static List<String> cache = new ArrayList<>();

    public static void main(String[] args) {
        while (true) {
            String data = new String("temporary data");
            cache.add(data);
        }
    }
}
~~~`,
      solution: r`- Jeder Schleifendurchlauf erzeugt ein neues String-Objekt im Heap.
- Das Objekt wird in @@cache@@ abgelegt. cache ist **static**, verschwindet also nie.
- Die Objekte sind für das Programm nutzlos (sie werden nie wieder gelesen), aber **weiterhin referenziert**.

Der GC löscht nur **unerreichbare** Objekte. Diese sind erreichbar, also bleibt alles liegen; der Heap wächst bis zu @@java.lang.OutOfMemoryError: Java heap space@@.

Abhilfe: nicht mehr benötigte Objekte gar nicht erst aufbewahren oder die Referenzen wieder entfernen (@@cache.clear()@@ bzw. gezielt entfernen, Cache-Größe begrenzen). Java verwaltet den Speicher automatisch, erkennt aber keine schlechte Logik.`,
    },
  ],
});
