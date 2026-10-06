import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 08a: wrapper classes, autoboxing, enums, switch, type casting, strings and StringBuilder. */
export const javaFeatures = topic({
  id: 'java-features',
  chapter: '08a',
  title: 'Java Language Features',
  summary:
    'Wrapper Classes, Autoboxing und Unboxing, Enums, switch, Widening und Narrowing, Upcasting und Downcasting, String und StringBuilder.',
  definitions: [
    {
      id: 'wrapper',
      title: 'Wrapper Class',
      ref: '08a · Wrapper Classes',
      statement: r`Eine **Wrapper Class** erlaubt es, einen primitiven Datentyp **als Objekt** zu verwenden. Jeder primitive Typ hat eine zugehörige Wrapper-Klasse (Package @@java.lang@@, automatisch importiert).

~~~
int -> Integer      double -> Double    char -> Character
boolean -> Boolean  long -> Long        float -> Float
byte -> Byte        short -> Short
~~~

Eigenschaften: **immutable** (wie String), alle numerischen Wrapper erben von @@java.lang.Number@@, die Werte liegen als Objekte auf dem **Heap**.`,
    },
    {
      id: 'autoboxing',
      title: 'Autoboxing und Unboxing',
      ref: '08a · Autoboxing and Unboxing',
      statement: r`- **Autoboxing:** die automatische Umwandlung eines primitiven Wertes in sein Wrapper-Objekt (int → Integer).
- **Unboxing:** die automatische Umwandlung eines Wrapper-Objekts zurück in den primitiven Wert (Integer → int).

~~~
Integer boxed = 42;      // Autoboxing
int plain = boxed;       // Unboxing
~~~`,
      note: r`Hinter den Kulissen: Bei Operatoren (+, -, *, >) auf Wrapper-Typen unboxt der Compiler vor der Ausführung. Unboxing von @@null@@ wirft eine NullPointerException.`,
    },
    {
      id: 'enum',
      title: 'Enumeration (enum)',
      ref: '08a · What is an Enumeration (Enum)',
      statement: r`Ein **enum** ist ein spezieller Java-Datentyp für eine **feste Menge benannter Konstanten** (seit Java 5).

~~~
enum Day { MONDAY, TUESDAY, WEDNESDAY }
Day today = Day.MONDAY;
~~~

- **Type Safety:** ersetzt das Muster @@public static final int@@ durch typsichere Konstanten, geprüft zur Compile-Zeit.
- **Class-Based:** Ein enum ist eine besondere Klasse, die @@java.lang.Enum@@ erweitert.
- **Fixed Instances:** Zur Laufzeit können keine weiteren Instanzen entstehen.`,
      note: r`Enum-Konstanten sind implizit final und static.`,
    },
    {
      id: 'switch',
      title: 'switch Statement',
      ref: '08a · What is a switch Statement?',
      statement: r`Ein Kontrollfluss-Statement, das einen Ausdruck auswertet und in den passenden @@case@@-Block verzweigt – die lesbarere Alternative zu langen if-else-if-Ketten, wenn **eine** Variable gegen mehrere feste Werte geprüft wird.

- @@case@@: ein konstanter Wert zum Vergleich.
- @@break@@: verlässt den switch-Block sofort. Fehlt es, läuft die Ausführung in die folgenden cases weiter (**Fall-through**).
- @@default@@: optionaler Rückfall, wenn kein case passt.`,
    },
    {
      id: 'casting-primitiv',
      title: 'Widening und Narrowing Casting',
      ref: '08a · What is Type Casting?',
      statement: r`**Type Casting:** eine Variable oder ein Objekt von einem Datentyp in einen anderen umwandeln.

- **Widening (implizit, automatisch):** kleinerer Typ → größerer Typ, ohne Datenverlust. @@double d = 3;@@ ergibt 3.0.
- **Narrowing (explizit, manuell):** größerer Typ → kleinerer Typ, verlangt den Cast in Klammern. Risiko: abgeschnittene Daten oder Genauigkeitsverlust. @@int i = (int) 3.99;@@ ergibt 3.`,
    },
    {
      id: 'up-down',
      title: 'Upcasting und Downcasting',
      ref: '08a · Upcasting vs. Downcasting',
      statement: r`**Reference Type Casting** wandelt eine Objektreferenz innerhalb **desselben Vererbungsbaums** um.

- **Upcasting (implizit):** Subklassen-Referenz → Superklassen-Referenz. Immer sicher, automatisch. @@Animal a = new Dog();@@
- **Downcasting (explizit):** Superklassen-Referenz → Subklassen-Referenz. Verlangt den Cast und kann zur Laufzeit scheitern: **ClassCastException**. @@Dog d = (Dog) a;@@`,
    },
    {
      id: 'string',
      title: 'String: Immutability und String Pool',
      ref: '08a · String Fundamentals & Essential Methods',
      statement: r`- **Immutable:** Ein String-Objekt kann nach der Erzeugung **nicht verändert** werden. Operationen, die einen String scheinbar ändern, liefern ein **neues** String-Objekt.
- **String Pool:** Java speichert String-Literale in einem besonderen Speicherbereich, dem **String Constant Pool**, um Speicher zu sparen.
- **Comparison Rule:** String-**Werte** immer mit @@.equals()@@ vergleichen, nie mit @@==@@ (das vergleicht Speicherreferenzen).`,
    },
    {
      id: 'stringbuilder',
      title: 'StringBuilder',
      ref: '08a · String Efficiency & StringBuilder',
      statement: r`Ein **StringBuilder** ist eine **veränderliche** (mutable) Zeichenfolge für häufige String-Änderungen. Er verändert seinen Zeichenpuffer direkt im Speicher, **ohne neue Objekte** zu erzeugen.

~~~
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);
}
String result = sb.toString();
~~~`,
      note: r`Das Problem davor: Wiederholtes @@+@@ in einer Schleife erzeugt tausende kurzlebige temporäre String-Objekte auf dem Heap.`,
    },
  ],
  theorems: [
    {
      id: 'wrapper-warum',
      title: 'Warum braucht man Wrapper Classes?',
      ref: '08a · Why Do We Need Wrapper Classes?',
      statement: r`- **Java Collections Framework:** ArrayList, HashSet, HashMap arbeiten **nur mit Objekten**. @@ArrayList<Integer>@@ ist gültig, @@ArrayList<int>@@ nicht.
- **Generics:** verlangen Objektreferenzen.
- **Null Value:** Objekte können @@null@@ speichern, um einen fehlenden Wert auszudrücken (etwa Datenbankspalten, die NULL erlauben).
- **Utility Methods:** statische Methoden zum Konvertieren und Parsen, etwa @@Integer.parseInt("42")@@.`,
    },
    {
      id: 'wrapper-kosten',
      title: 'Performance und Best Practices',
      ref: '08a · Performance & Best Practices / Key Takeaways',
      statement: r`- **Memory Overhead:** Ein int braucht 4 Bytes; ein Integer-Objekt je nach JVM etwa 16–24 Bytes.
- **CPU Overhead:** Autoboxing/Unboxing bedeutet Methodenaufrufe und Objekterzeugung – teuer in engen Schleifen.

**Primitives** für lokale Berechnungen, enge Schleifen und performancekritischen Code. **Wrapper** für Collections, Generics und Felder, die null sein dürfen.

**Comparison Care:** Wrapper mit @@.equals()@@ vergleichen, nicht mit @@==@@ (Referenzidentität und Integer-Cache).`,
      note: r`Klassische Falle: @@Double sum = 0.0;@@ und in der Schleife @@sum += x;@@ – jede Runde unboxt, rechnet und boxt wieder in ein neues Double. Mit @@double sum@@ entsteht kein einziges Objekt.`,
    },
    {
      id: 'enum-methoden',
      title: 'Eingebaute Enum-Methoden',
      ref: '08a · Built-in Enum Methods',
      statement: r`Alle Enums erben von @@java.lang.Enum@@:

~~~
values()               Array aller Konstanten in        Day.values()
                       Deklarationsreihenfolge
valueOf(String name)   String-Name -> Konstante         Day.valueOf("MONDAY")
ordinal()              nullbasierter Index              Day.MONDAY.ordinal() -> 0
name()                 exakter Name als String          Day.MONDAY.name() -> "MONDAY"
~~~`,
    },
    {
      id: 'enum-fortgeschritten',
      title: 'Enums mit Feldern, Konstruktoren und Methoden',
      ref: '08a · Advanced Enum Features',
      statement: r`~~~
enum Planet {
    MERCURY(3.303e+23), EARTH(5.976e+24);

    private final double mass;

    Planet(double mass) { this.mass = mass; }   // implizit private

    public double getMass() { return mass; }
}
~~~

- Der Konstruktor wird **automatisch** aufgerufen, wenn die Konstanten initialisiert werden.
- Seine Sichtbarkeit ist private (bzw. package-private); man kann ihn **nicht** mit @@new@@ aufrufen.
- Enums können **abstrakte Methoden** definieren, die jede Konstante selbst implementiert (Constant-Specific Behaviour).
- Jedes Enum erweitert java.lang.Enum: Es kann **keine andere Klasse erben**, aber **Interfaces implementieren**.`,
      note: r`Vorteile gegenüber alten int-Konstanten: Type Safety, Namespacing (@@Status.PENDING@@), Maintainability, Readability (die Ausgabe ist lesbarer Text statt einer Zahl).`,
    },
    {
      id: 'switch-modern',
      title: 'Modern Switch Expressions (Java 14+)',
      ref: '08a · Modern Switch Expressions',
      statement: r`~~~
String type = switch (day) {
    case SATURDAY, SUNDAY -> "Weekend";
    default -> "Weekday";
};
~~~

- Die **Pfeil-Syntax** macht manuelle @@break@@-Statements überflüssig – kein versehentliches Fall-through.
- Ein switch kann direkt **einen Wert liefern**, der einer Variablen zugewiesen wird.`,
    },
    {
      id: 'instanceof',
      title: 'Safe Downcasting und warum man es selten braucht',
      ref: '08a · Safe Downcasting Pattern / The GOOD Way',
      statement: r`Vor einem Downcast mit @@instanceof@@ prüfen:

~~~
if (animal instanceof Dog) {
    Dog d = (Dog) animal;
    d.bark();
}
~~~

**Best Practice:** überschriebene Methoden direkt aufrufen statt exzessiv zu downcasten.
- **BAD:** if-else-Ketten mit instanceof und Casts. Kommt eine neue Rolle dazu (TeachingAssistant), muss jede Kette angepasst werden.
- **GOOD:** @@user.printRoleDetails()@@ – Java ruft zur Laufzeit die richtige Version auf. Sauberer und erweiterbar (**Open-Closed Principle**): neue Typen ohne Änderung an @@processUser()@@.`,
    },
  ],
  claims: [
    {
      id: 'arraylist-int',
      statement: r`@@ArrayList<int>@@ ist in Java gültig.`,
      holds: false,
      reason: r`Collections und Generics arbeiten nur mit Objekten: @@ArrayList<Integer>@@.`,
      ref: '08a · Why Do We Need Wrapper Classes?',
    },
    {
      id: 'wrapper-immutable',
      statement: r`Wrapper-Objekte wie Integer sind immutable.`,
      holds: true,
      reason: r`Einmal erzeugt, können sie nicht verändert werden – wie String.`,
      ref: '08a · Wrapper Classes – Key Characteristics',
    },
    {
      id: 'integer-gleich',
      statement: r`Zwei Integer-Objekte vergleicht man zuverlässig mit @@==@@.`,
      holds: false,
      reason: r`@@==@@ vergleicht bei Objekten die Referenzen. Wegen des Integer-Cache scheint es für kleine Werte zu funktionieren und scheitert bei größeren. Richtig: @@.equals()@@.`,
      ref: '08a · Key Takeaways',
    },
    {
      id: 'integer-speicher',
      statement: r`Ein Integer-Objekt belegt deutlich mehr Speicher als ein int.`,
      holds: true,
      reason: r`4 Bytes gegenüber etwa 16–24 Bytes je nach JVM.`,
      ref: '08a · Performance & Best Practices',
    },
    {
      id: 'ordinal',
      statement: r`Für @@enum Day { MONDAY, TUESDAY }@@ liefert @@Day.TUESDAY.ordinal()@@ den Wert 2.`,
      holds: false,
      reason: r`ordinal() ist nullbasiert: MONDAY ist 0, TUESDAY ist 1.`,
      ref: '08a · Built-in Enum Methods',
    },
    {
      id: 'enum-new',
      statement: r`Mit @@new Day()@@ kann man zur Laufzeit eine weitere Enum-Konstante erzeugen.`,
      holds: false,
      reason: r`Fixed Instances: Enum-Konstruktoren lassen sich nicht mit new aufrufen.`,
      ref: '08a · Key Rules for Enum Constructors',
    },
    {
      id: 'enum-extends',
      statement: r`Ein enum kann keine andere Klasse erweitern, aber Interfaces implementieren.`,
      holds: true,
      reason: r`Jedes enum erweitert bereits java.lang.Enum, und Java erlaubt nur eine Elternklasse.`,
      ref: '08a · Key Takeaways',
    },
    {
      id: 'fall-through',
      statement: r`Fehlt in einem klassischen switch das @@break@@, werden auch die folgenden case-Blöcke ausgeführt.`,
      holds: true,
      reason: r`Das ist Fall-through. Die Pfeil-Syntax ab Java 14 vermeidet es.`,
      ref: '08a · What is a switch Statement?',
    },
    {
      id: 'narrowing-runden',
      statement: r`@@(int) 3.99@@ ergibt 4.`,
      holds: false,
      reason: r`Narrowing schneidet ab (truncation), es rundet nicht: Das Ergebnis ist 3.`,
      ref: '08a · Primitive Casting Types',
    },
    {
      id: 'upcast-sicher',
      statement: r`Upcasting ist immer sicher und braucht keinen expliziten Cast.`,
      holds: true,
      reason: r`Jedes Subklassen-Objekt ist auch ein Objekt der Superklasse (IS-A).`,
      ref: '08a · Upcasting vs. Downcasting',
    },
    {
      id: 'string-aendern',
      statement: r`@@s.toUpperCase()@@ verändert den String, auf den s zeigt.`,
      holds: false,
      reason: r`Strings sind immutable. Die Methode liefert ein **neues** String-Objekt; ohne @@s = s.toUpperCase();@@ bleibt s unverändert.`,
      ref: '08a · String Fundamentals',
    },
  ],
  problems: [
    {
      id: 'grade-parser',
      title: 'University Grade Parser',
      source: 'nach Coding Practice Lec. 08.a',
      points: 10,
      task: r`Gegeben ist @@String rawRecord = " CS101:88 ";@@ im Format COURSE_CODE:SCORE.

1. Entferne den Leerraum und teile am Doppelpunkt in courseCode und scoreString.
2. Wandle scoreString mit einer Wrapper-Klasse in ein int um.
3. Berechne die Stufe mit @@(int) Math.ceil(score / 10.0)@@.
4. Vergib per switch: 10 und 9 „A - Outstanding“, 8 „B - Good“, 7 „C - Satisfactory“, 6 „D - Pass“, 5 bis 0 „F - Fail“, sonst „Invalid Score“.

Was wird für den Beispielwert ausgegeben? Warum @@10.0@@ und nicht @@10@@?`,
      hint: r`trim(), split(":"), Integer.parseInt(...).`,
      solution: r`~~~
public class GradeParser {
    public static void main(String[] args) {
        String rawRecord = " CS101:88 ";

        String[] parts = rawRecord.trim().split(":");
        String courseCode = parts[0];
        String scoreString = parts[1];

        int score = Integer.parseInt(scoreString);
        int bracket = (int) Math.ceil(score / 10.0);

        String grade = switch (bracket) {
            case 10, 9 -> "A - Outstanding";
            case 8 -> "B - Good";
            case 7 -> "C - Satisfactory";
            case 6 -> "D - Pass";
            case 5, 4, 3, 2, 1, 0 -> "F - Fail";
            default -> "Invalid Score";
        };

        System.out.println("Course: " + courseCode);
        System.out.println("Evaluation: " + grade);
    }
}
~~~

Für 88: 88 / 10.0 = 8.8, Math.ceil ergibt 9.0, der Narrowing-Cast 9 → **A - Outstanding**, Kurs **CS101**.

@@score / 10@@ wäre eine Ganzzahldivision (88 / 10 = 8); das Aufrunden käme zu spät, und es käme „B“ heraus. Mit @@10.0@@ wird score per Widening zu double.`,
    },
    {
      id: 'vergleich-fallen',
      title: 'Vergleichsfallen: == und equals',
      source: 'nach 08a · String Fundamentals / Key Takeaways',
      points: 8,
      task: r`Was geben die Zeilen (1) bis (6) aus, und warum?

~~~
String a = "java";
String b = "java";
String c = new String("java");

System.out.println(a == b);         // (1)
System.out.println(a == c);         // (2)
System.out.println(a.equals(c));    // (3)

Integer x = 127, y = 127;
Integer p = 1000, q = 1000;

System.out.println(x == y);         // (4)
System.out.println(p == q);         // (5)
System.out.println(p.equals(q));    // (6)
~~~`,
      solution: r`1. **true** – beide Literale liegen im String Constant Pool; a und b halten dieselbe Referenz.
2. **false** – @@new String(...)@@ erzeugt ein eigenes Objekt auf dem Heap; @@==@@ vergleicht Referenzen.
3. **true** – @@.equals()@@ vergleicht den Inhalt.
4. **true** – Werte im Bereich des **Integer-Cache** (-128 bis 127) werden beim Autoboxing wiederverwendet: dasselbe Objekt.
5. **false** – außerhalb des Cache entstehen zwei verschiedene Integer-Objekte.
6. **true** – Wertvergleich.

Regel: Strings und Wrapper immer mit @@.equals()@@ vergleichen.`,
    },
    {
      id: 'casting',
      title: 'Casting: Was kompiliert, was scheitert?',
      source: 'nach 08a · Type Casting / Upcasting vs. Downcasting',
      points: 7,
      task: r`Dog und Cat erben von Animal. Was passiert in jeder Zeile – kompiliert sie, und was ist das Ergebnis zur Laufzeit?

~~~
double d = 7;                 // (1)
int i = 9.7;                  // (2)
int j = (int) 9.7;            // (3)
Animal a = new Dog();         // (4)
Dog dog = a;                  // (5)
Dog dog2 = (Dog) a;           // (6)
Cat cat = (Cat) a;            // (7)
~~~

Wie macht man (7) sicher?`,
      solution: r`1. kompiliert – **Widening**, d ist 7.0.
2. **Compilerfehler** – Narrowing braucht einen expliziten Cast.
3. kompiliert – **Narrowing**, j ist 9 (abgeschnitten).
4. kompiliert – **Upcasting**, implizit und immer sicher.
5. **Compilerfehler** – Downcasting braucht den expliziten Cast.
6. kompiliert und läuft – das Objekt ist tatsächlich ein Dog.
7. kompiliert, wirft aber zur Laufzeit eine **ClassCastException** – das Objekt ist ein Dog, keine Cat.

Sicher mit instanceof:

~~~
if (a instanceof Cat) {
    Cat cat = (Cat) a;
}
~~~

Noch besser: gar nicht casten, sondern eine überschriebene Methode aufrufen.`,
    },
  ],
});
