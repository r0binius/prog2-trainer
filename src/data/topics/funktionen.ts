import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 03, second part: functions, overloading, ambiguity, default arguments, passing by value and by reference. */
export const funktionen = topic({
  id: 'funktionen',
  chapter: '03',
  title: 'Funktionen, Overloading und Parameterübergabe',
  summary:
    'Deklaration und Definition, Function Overloading, Overload Resolution, Ambiguity Error, Pass by Value, Reference und Const Reference.',
  definitions: [
    {
      id: 'funktion-prozedur',
      title: 'Function und Procedure in C++',
      ref: '03 · Functions and Procedures in C++',
      statement: r`Eine **Function** ist ein benannter Codeblock für eine bestimmte Aufgabe. Sie kann Parameter entgegennehmen, Operationen ausführen und einen Wert zurückgeben (oder nicht).

Eine **Procedure** ist in C++ einfach eine Funktion, die **keinen Wert** zurückgibt: Rückgabetyp @@void@@. Ein eigenes Schlüsselwort dafür (wie in Pascal) gibt es nicht.`,
    },
    {
      id: 'deklaration-definition',
      title: 'Declaration (Prototype) vs. Definition',
      ref: '03 · Function Declaration vs. Definition',
      statement: r`**Declaration (Prototype):** teilt dem Compiler mit, dass die Funktion **existiert** – ihre Signatur.

**Definition:** liefert die eigentliche **Implementierung**.

~~~
int add(int a, int b);            // Declaration

int add(int a, int b) {           // Definition
    return a + b;
}
~~~`,
      note: r`Funktionen müssen deklariert sein (üblicherweise in einem Header), bevor sie in main benutzt werden.`,
    },
    {
      id: 'overloading',
      title: 'Function Overloading',
      ref: '03 · Function Overloading Concept',
      statement: r`**Function Overloading** erlaubt mehrere Funktionen mit **demselben Namen**, solange sich ihre **Parameterlisten** (Signaturen) unterscheiden – in

- der **Anzahl** der Parameter,
- dem **Typ** der Parameter oder
- der **Reihenfolge** verschiedener Parametertypen.

Der Compiler wählt anhand der übergebenen Argumente.`,
      note: r`Über den **Rückgabetyp allein** kann man nicht überladen.`,
    },
    {
      id: 'ambiguity',
      title: 'Ambiguity Error',
      ref: '03 · Ambiguity Error',
      statement: r`Ein **Ambiguity Error** entsteht, wenn der Compiler mehrere Funktionen findet, die passen könnten, aber **keine besser** ist als die andere. Er rät nicht („No Guess“) und bricht die Übersetzung ab.

~~~
void printNumber(float f);
void printNumber(double d);

printNumber(10);   // ERROR: int -> float und int -> double sind gleich gut
~~~`,
      note: r`Lösung: explizit sein – @@printNumber(10.0f)@@, @@printNumber(10.0)@@ oder @@printNumber((double)10)@@.`,
    },
    {
      id: 'default-argument',
      title: 'Default Argument',
      ref: '03 · Default arguments',
      statement: r`Ein **Default Argument** ist ein Vorgabewert für einen Parameter, der gilt, wenn der Aufrufer das Argument weglässt: @@void log(int x, int y = 0);@@

Default Arguments sind bequem, können aber mit Überladungen **kollidieren**.`,
    },
    {
      id: 'pass-by-value',
      title: 'Pass by Value',
      ref: '03 · Passing by Value vs. Reference',
      statement: r`@@void func(int x)@@ – der Compiler legt im Stack Frame der Funktion eine **neue Variable** an und **kopiert** den Wert des Arguments hinein. Das ist das Standardverhalten für einfache Typen.

„What happens in the function, stays in the function“: Änderungen am Parameter lassen das Original unverändert.`,
      note: r`Pro: sicher, keine Seiteneffekte. Contra: teuer für große Objekte (ein Vector mit einer Million Einträgen wird komplett dupliziert).`,
    },
    {
      id: 'pass-by-reference',
      title: 'Pass by Reference',
      ref: '03 · Passing by Value vs. Reference',
      statement: r`@@void func(int &x)@@ – es wird **keine Kopie** angelegt. Der Parameter ist ein **Alias** für die übergebene Variable; beide teilen dieselbe Box.

Ändert die Funktion den Wert, ist das **Original** geändert (Seiteneffekt).`,
      note: r`Pro: sehr schnell; gut, um mehrere Werte aus einer Funktion zurückzugeben. Contra: „gefährlich“, weil die Funktion die Daten unerwartet ändern kann.`,
    },
    {
      id: 'pass-by-const-ref',
      title: 'Pass by Const Reference',
      ref: '03 · Passing by Value vs. Reference',
      statement: r`@@void process(const std::string& text)@@ – der „Industry Standard“ für große Objekte (Strings, Vectors, Klassen). Das Beste aus beiden Welten:

- **Effizienz der Referenz:** keine Kopie.
- **Sicherheit des Wertes:** @@const@@ verbietet der Funktion, die Daten zu ändern. Ein Änderungsversuch kompiliert nicht.`,
    },
  ],
  theorems: [
    {
      id: 'resolution',
      title: 'Function Overload Resolution',
      ref: '03 · How it works?',
      statement: r`Der Compiler sucht den „best fit“ in drei Schritten:

1. **Candidate Functions:** alle Funktionen mit dem aufgerufenen Namen.
2. **Viable Functions:** davon die, die die übergebene Anzahl von Argumenten annehmen können.
3. **Best Match:** die spezifischste Übereinstimmung nach Typ.

Rangfolge beim Best Match:
- **Exact Match** – höchste Priorität (int an int).
- **Promotion** – etwa char → int oder float → double.
- **Standard Conversion** – etwa int → double.
- Sind zwei Treffer **gleich gut**: Ambiguity Error.`,
    },
    {
      id: 'fallen',
      title: 'Typische Ambiguity-Fallen',
      ref: '03 · Common Ambiguity Traps',
      statement: r`- **Mixing Types:** eine Funktion nimmt @@(int, double)@@, eine andere @@(double, int)@@. Der Aufruf mit @@(int, int)@@ ist mehrdeutig.
- **Default Arguments:** @@void func(int x)@@ und @@void func(int x, int y = 0)@@. Der Aufruf @@func(10)@@ passt auf **beide**.
- **Gleichwertige Konvertierungen:** nur float- und double-Version, Aufruf mit int.`,
    },
    {
      id: 'default-vermeiden',
      title: 'Kollisionen mit Default Arguments vermeiden',
      ref: '03 · Default arguments – How to avoid this',
      statement: r`- **Don't Overlap:** keine Überladung, deren Anzahl **Pflichtparameter** der Gesamtzahl der Parameter einer anderen (inklusive Defaults) entspricht.
- **Be Distinct:** die Typen so verschieden wählen, dass immer ein Exact Match gewinnt.
- **Choose One:** für eine Aufgabe entweder Overloading **oder** Default Arguments – selten beides unter demselben Namen.`,
    },
    {
      id: 'goldene-regeln',
      title: 'Golden Rules: Wie übergebe ich was?',
      ref: '03 · The "Golden Rules" of Passing Data',
      statement: r`~~~
Die Daten sind ...                        Übergabe
klein und einfach (int, bool, double)     Pass by Value
groß und komplex (string, vector, class)  Pass by Const Reference
als Ausgabe gedacht (Original ändern)     Pass by Reference
~~~

Im Zweifel ist für Objekte die **const reference** fast immer die „professionell richtige“ Wahl.`,
      note: r`Begründung: Kleine Werte sind schnell kopiert und das Original bleibt garantiert sicher; große Objekte zu kopieren ist teuer; nur die nicht-konstante Referenz erlaubt das „Zurückschreiben“ an den Aufrufer.`,
    },
  ],
  claims: [
    {
      id: 'return-overload',
      statement: r`@@int f(int x);@@ und @@double f(int x);@@ sind eine gültige Überladung.`,
      holds: false,
      reason: r`Die Parameterlisten sind identisch. Allein über den Rückgabetyp kann man nicht überladen.`,
      ref: '03 · Function Overloading Concept',
    },
    {
      id: 'reihenfolge-overload',
      statement: r`@@void f(int a, double b);@@ und @@void f(double a, int b);@@ sind eine gültige Überladung.`,
      holds: true,
      reason: r`Die Reihenfolge der Parametertypen unterscheidet sich. Mehrdeutig wird erst ein **Aufruf** mit @@(int, int)@@.`,
      ref: '03 · Common Ambiguity Traps',
    },
    {
      id: 'exact-match',
      statement: r`Gibt es @@display(int)@@ und @@display(double)@@, ruft @@display(3.14)@@ die double-Version auf.`,
      holds: true,
      reason: r`3.14 ist ein double-Literal – Exact Match, die höchste Priorität.`,
      ref: '03 · How it applies to our example',
    },
    {
      id: 'int-float-double',
      statement: r`Gibt es nur @@print(float)@@ und @@print(double)@@, wählt der Compiler bei @@print(10)@@ die double-Version, weil sie genauer ist.`,
      holds: false,
      reason: r`int → float und int → double sind beides Standard Conversions und damit gleich gut. Der Compiler rät nicht: Ambiguity Error.`,
      ref: '03 · Ambiguity Error',
    },
    {
      id: 'value-original',
      statement: r`Bei Pass by Value kann die Funktion die Variable des Aufrufers verändern.`,
      holds: false,
      reason: r`Die Funktion arbeitet auf einer Kopie in ihrem eigenen Stack Frame. Das Original bleibt unverändert.`,
      ref: '03 · Passing by Value',
    },
    {
      id: 'const-ref-kopie',
      statement: r`Bei @@void f(const std::string& s)@@ wird der String beim Aufruf nicht kopiert.`,
      holds: true,
      reason: r`Es ist eine Referenz, also ein Alias; @@const@@ verhindert zusätzlich Änderungen.`,
      ref: '03 · Passing by Const Reference',
    },
    {
      id: 'const-aendern',
      statement: r`Eine Funktion mit Parameter @@const std::string& text@@ darf @@text@@ ändern, die Änderung ist nur außen nicht sichtbar.`,
      holds: false,
      reason: r`Der Änderungsversuch kompiliert gar nicht erst.`,
      ref: '03 · Passing by Const Reference',
    },
    {
      id: 'default-kollision',
      statement: r`Mit @@void log(int x)@@ und @@void log(int x, int y = 0)@@ ist der Aufruf @@log(5, 10)@@ mehrdeutig.`,
      holds: false,
      reason: r`@@log(5, 10)@@ passt nur auf die Version mit zwei Parametern. Mehrdeutig ist @@log(5)@@.`,
      ref: 'Tutorial 03 · Default Arguments',
    },
    {
      id: 'void-prozedur',
      statement: r`Eine Procedure wird in C++ als Funktion mit Rückgabetyp @@void@@ geschrieben.`,
      holds: true,
      reason: r`C++ hat kein eigenes Schlüsselwort für Prozeduren.`,
      ref: '03 · Functions and Procedures in C++',
    },
  ],
  problems: [
    {
      id: 'update-score',
      title: 'updateScore: Value und Reference',
      source: 'nach Tasks 02 · Part 1 und 2',
      points: 9,
      task: r`1. Schreibe @@addBonusValue(int score)@@ (by value) und @@addBonusRef(int &score)@@ (by reference); beide addieren 100.
2. Schreibe @@logMessage@@ mit einem Parameter by const reference; Ausgabe mit dem Präfix @@[LOG]: @@.
3. @@playerScore@@ startet bei 500. Welchen Wert hat es nach jedem der beiden Aufrufe, und warum?
4. Das Aufgabenblatt nennt beide Versionen @@updateScore@@. Warum ist dann der Aufruf @@updateScore(playerScore)@@ ein Problem?`,
      hint: r`Zu 4: Welche der beiden Versionen passt auf eine int-Variable als Argument?`,
      solution: r`~~~
#include <iostream>
#include <string>

void addBonusValue(int score)  { score += 100; }   // Kopie
void addBonusRef(int &score)   { score += 100; }   // Alias

void logMessage(const std::string& message) {
    std::cout << "[LOG]: " << message << std::endl;
}

int main() {
    int playerScore = 500;
    addBonusValue(playerScore);   // bleibt 500
    addBonusRef(playerScore);     // wird 600
    logMessage("Exercise Complete");
    return 0;
}
~~~

3. Nach dem Value-Aufruf **500**: Die Funktion hat nur ihre Kopie geändert. Nach dem Reference-Aufruf **600**: Der Parameter ist ein Alias für playerScore.

4. @@updateScore(int)@@ und @@updateScore(int&)@@ sind als Überladung deklarierbar, aber für eine Variable passen **beide gleich gut** – der Aufruf ist **ambiguous**. Deshalb der Hinweis im Blatt, Aufruf oder Signatur zu ändern: verschiedene Namen (wie oben) oder eine Version mit Pointer-Parameter.

Die const reference bei logMessage vermeidet die Kopie des Strings und garantiert, dass er nicht verändert wird.`,
    },
    {
      id: 'resolution-ueben',
      title: 'Overload Resolution durchspielen',
      source: 'nach 03 · How it applies to our example / Tutorial 03',
      points: 7,
      task: r`Gegeben:

~~~
void show(int i);            // A
void show(double d);         // B
void show(int a, int b);     // C
void log(int x);             // D
void log(int x, int y = 0);  // E
~~~

Welche Version wird jeweils aufgerufen – oder warum kompiliert der Aufruf nicht?

~~~
(1) show(10);
(2) show(2.5);
(3) show('x');
(4) show(1, 2);
(5) log(5, 10);
(6) log(5);
~~~`,
      solution: r`1. **A** – Exact Match (int).
2. **B** – Exact Match (double).
3. **A** – kein Exact Match für char, aber die **Promotion** char → int schlägt die Conversion char → double.
4. **C** – die einzige Version mit zwei Parametern.
5. **E** – nur E nimmt zwei Argumente.
6. **Fehler: ambiguous.** D passt mit einem int, E passt ebenfalls, weil y den Default 0 bekommt. Beide sind gleich gut.`,
    },
    {
      id: 'square',
      title: 'squareValue und squareRef',
      source: 'nach Tasks 03 · Part 3',
      points: 5,
      task: r`Was gibt das Programm aus? Begründe.

~~~
void squareValue(int n) { n = n * n; }
void squareRef(int &n)  { n = n * n; }

int main() {
    int v = 4;
    squareValue(v);
    std::cout << v << std::endl;
    squareRef(v);
    std::cout << v << std::endl;
    return 0;
}
~~~`,
      solution: r`Ausgabe:

~~~
4
16
~~~

@@squareValue@@ quadriert eine Kopie im eigenen Stack Frame; sie verschwindet am Funktionsende, v bleibt 4. Bei @@squareRef@@ ist n ein Alias für v; die Zuweisung schreibt direkt in die Box von v.`,
    },
  ],
});
