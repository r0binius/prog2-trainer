import { topic } from '@/domain/content/build';

const r = String.raw;

/** Slides 02, second part: memory of a running program, stack and heap, pointers, new and delete. */
export const speicher = topic({
  id: 'speicher',
  chapter: '02',
  title: 'Speicher: Stack, Heap und Pointer',
  summary:
    'Speicherlayout eines laufenden Programms, Stack Frames, new und delete, Memory Leak, Adress- und Dereferenzierungsoperator.',
  definitions: [
    {
      id: 'stack',
      title: 'Stack',
      ref: '02 · Stack Memory',
      statement: r`Der **Stack** ist der Speicherbereich für

- lokale Variablen,
- Funktionsparameter,
- Informationen zum Funktionsaufruf.

Er wird **automatisch** verwaltet: Beim Start einer Funktion wird Speicher auf dem Stack angelegt, beim Ende (an der schließenden @@}@@) automatisch wieder freigegeben.`,
      note: r`Bild der Folien: ein Stapel Teller – last in, first out. Oder das Hotelzimmer, das beim Auschecken von selbst gereinigt wird.`,
    },
    {
      id: 'heap',
      title: 'Heap (Free Store)',
      ref: '02 · Heap Memory',
      statement: r`Der **Heap** ist der Speicherbereich für **dynamische Speicheranforderung**: Speicher wird während der Ausführung angefordert, wenn er gebraucht wird.

In C++ fordert @@new@@ Speicher vom Heap an, @@delete@@ gibt ihn zurück. Heap-Objekte verschwinden **nicht**, wenn eine Funktion endet.`,
      note: r`Bild der Folien: die gemietete Wohnung – wer nicht aufräumt, verliert die Kaution (dem Rechner geht der RAM aus).`,
    },
    {
      id: 'stack-frame',
      title: 'Stack Frame',
      ref: '02 · Stack vs Heap During Function Calls',
      statement: r`Bei jedem Funktionsaufruf wird ein neuer **Stack Frame** auf den Stack gelegt (push); er enthält die lokalen Variablen und Parameter dieses Aufrufs. Endet die Funktion, wird ihr Frame automatisch entfernt (pop).

Der Stack arbeitet nach **LIFO** (Last-In, First-Out): Die zuletzt aufgerufene Funktion endet zuerst.`,
    },
    {
      id: 'pointer',
      title: 'Pointer',
      ref: '02 · Pointers',
      statement: r`Ein **Pointer** ist eine Variable, die die **Adresse** eines anderen Speicherbereichs speichert.

~~~
int num = 42;
int* p = &num;   // p speichert die Adresse von num
~~~`,
      note: r`Um den Heap zu benutzen, braucht man Pointer: @@new@@ liefert eine Adresse zurück.`,
    },
    {
      id: 'operatoren',
      title: 'Address-of (&) und Dereference (*)',
      ref: '02 · Two operations',
      statement: r`- **Address-of Operator** @@&@@: liefert die „Hausnummer“ einer Variablen im RAM – ihre Adresse.
- **Dereference Operator** @@*@@: schaut „ins Haus hinein“ – liefert den Wert, der an der gespeicherten Adresse liegt.

~~~
int num = 42;
int* p = &num;
std::cout << p;    // Adresse, z. B. 0x7ffd5e3a2abc
std::cout << *p;   // 42
*p = 50;           // num ist jetzt 50
~~~`,
    },
    {
      id: 'memory-leak',
      title: 'Memory Leak',
      ref: '02 · Heap Memory',
      statement: r`Ein **Memory Leak** entsteht, wenn mit @@new@@ angeforderter Heap-Speicher nicht mit @@delete@@ freigegeben wird. Der Speicher bleibt belegt, obwohl das Programm ihn nicht mehr nutzt.`,
      note: r`Typisch: Der einzige Pointer auf das Objekt ist eine lokale Variable. Endet die Funktion, verschwindet der Pointer vom Stack – das Objekt im Heap bleibt und ist nicht mehr erreichbar.`,
    },
    {
      id: 'stack-overflow',
      title: 'Stack Overflow',
      ref: '02 · Stack Memory',
      statement: r`Der Stack ist relativ **klein**. Wer zu viel darauf ablegt – etwa ein riesiges Array –, bekommt einen **Stack Overflow**.`,
    },
  ],
  theorems: [
    {
      id: 'vergleich',
      title: 'Stack und Heap im Vergleich',
      ref: '02 / 03 · Stack and Heap',
      statement: r`~~~
Merkmal       Stack                      Heap
Allocation    automatisch                manuell (new)
Lifetime      bis zum Ende des Scopes    bis zum expliziten delete
Speed         sehr schnell               langsamer
Größe         klein, begrenzt            groß, flexibel
Verwaltung    Compiler                   Programmierer
Zugriff       lokal (innerhalb { })      global (über Pointer)
~~~`,
    },
    {
      id: 'goldene-regel',
      title: "Die goldene Regel: „Don't Leak Memory“",
      ref: '02 · The Golden Rule',
      statement: r`In C++ muss zu **jedem** @@new@@ ein passendes @@delete@@ gehören.

~~~
int* p = new int(10);   // Heap anfordern
// ... benutzen ...
delete p;               // freigeben
~~~`,
    },
    {
      id: 'wann-heap',
      title: 'Wann Stack, wann Heap?',
      ref: '02 · The Golden Rule – When to use which?',
      statement: r`**Standardmäßig den Stack benutzen:** sicherer, schneller, weniger Code.

Den **Heap nur**, wenn

- eine sehr große Datenmenge gebraucht wird,
- die Daten die Funktion **überleben** müssen, die sie erzeugt hat,
- sich die Größe der Daten während der Laufzeit ändert.`,
      note: r`Kurz: Den Heap nimmt man, wenn erst zur Laufzeit feststeht, wie viel Speicher nötig ist.`,
    },
    {
      id: 'pointer-stack-daten-heap',
      title: 'Wo liegt was bei new?',
      ref: '02 · Stack vs Heap During Function Calls',
      statement: r`Bei @@int* p = new int(42);@@ gilt:

- Der **Pointer** @@p@@ ist eine lokale Variable und liegt auf dem **Stack**.
- Das eigentliche **Objekt** (die 42) liegt im **Heap**.

~~~
Stack                 Heap
p  [0x1000]  ----->   0x1000: [42]
~~~`,
      note: r`Endet die Funktion, verschwindet nur p. Ohne vorheriges @@delete p;@@ bleibt die 42 als Leak im Heap.`,
    },
    {
      id: 'programmspeicher',
      title: 'Was beim Programmstart passiert',
      ref: '02 · What Happens When a Program Runs?',
      statement: r`Beim Ausführen weist das Betriebssystem dem Programm Speicher (RAM) zu. Darin liegen

- Variablen,
- Funktionsaufrufe,
- Programminstruktionen,
- dynamisch angeforderte Objekte.

Der Speicher eines Programms ist in Regionen unterteilt; die beiden wichtigsten sind **Stack** und **Heap**.`,
      note: r`Wer den Speicher versteht, versteht Pointer, dynamische Speicheranforderung, Performance, Memory Leaks und Object Lifetimes.`,
    },
  ],
  claims: [
    {
      id: 'lokal-stack',
      statement: r`Lokale Variablen einer Funktion liegen auf dem Stack und verschwinden automatisch, wenn die Funktion endet.`,
      holds: true,
      reason: r`Mit dem Ende der Funktion wird ihr Stack Frame entfernt.`,
      ref: '02 · Stack Memory',
    },
    {
      id: 'heap-automatisch',
      statement: r`Mit @@new@@ angelegter Speicher wird in C++ am Ende der Funktion automatisch freigegeben.`,
      holds: false,
      reason: r`Heap-Speicher lebt bis zum expliziten @@delete@@. Ohne delete entsteht ein Memory Leak.`,
      ref: '02 · Heap Memory',
    },
    {
      id: 'heap-schneller',
      statement: r`Speicher auf dem Heap anzufordern ist schneller als auf dem Stack.`,
      holds: false,
      reason: r`Der Stack ist sehr schnell (nur push und pop), der Heap langsamer – dafür groß und flexibel.`,
      ref: '02 · Stack and Heap',
    },
    {
      id: 'lifo',
      statement: r`Ruft @@main@@ die Funktion A auf und A die Funktion B, wird der Frame von B vor dem von A entfernt.`,
      holds: true,
      reason: r`LIFO: B wurde zuletzt auf den Stack gelegt und endet zuerst.`,
      ref: '02 · Stack vs Heap During Function Calls',
    },
    {
      id: 'stern-adresse',
      statement: r`Für @@int* p = &x;@@ liefert der Ausdruck @@*p@@ die Adresse von x.`,
      holds: false,
      reason: r`@@*p@@ dereferenziert: Es liefert den **Wert** von x. Die Adresse ist @@p@@ selbst (oder @@&x@@).`,
      ref: '02 · Two operations',
    },
    {
      id: 'pointer-ort',
      statement: r`Bei @@int* p = new int(5);@@ in einer Funktion liegt p auf dem Stack und die 5 im Heap.`,
      holds: true,
      reason: r`Der Stack speichert den Pointer, der Heap das eigentliche Objekt.`,
      ref: '02 · Heap Memory',
    },
    {
      id: 'heap-default',
      statement: r`Im Zweifel sollte man Objekte auf dem Heap anlegen, weil dort mehr Platz ist.`,
      holds: false,
      reason: r`Die Folien sagen das Gegenteil: „Use the Stack by default“ – sicherer, schneller, weniger Code. Der Heap nur für große, langlebige oder in der Größe veränderliche Daten.`,
      ref: '02 · When to use which?',
    },
    {
      id: 'overflow',
      statement: r`Ein sehr großes lokales Array kann einen Stack Overflow auslösen.`,
      holds: true,
      reason: r`Der Stack hat eine begrenzte, relativ kleine Größe.`,
      ref: '02 · Stack Memory',
    },
  ],
  problems: [
    {
      id: 'speicherbild',
      title: 'Speicherbild zeichnen',
      source: 'nach Tasks 03 · Part 2',
      points: 8,
      task: r`Zeichne das Speicherbild (Stack und Heap) unmittelbar vor @@delete@@ und gib die Ausgabe an.

~~~
int main() {
    int a = 10;
    int* h = new int(20);
    int& r = a;
    r = 11;
    *h = 21;
    std::cout << a << " " << *h << std::endl;
    delete h;
    return 0;
}
~~~`,
      hint: r`Welche Variablen halten eine Adresse, welche einen Wert? Eine Referenz ist ein zweiter Name.`,
      solution: r`~~~
Stack (main)                     Heap
a  [11]   <-- r (Alias für a)
h  [0x500]  ------------------>  0x500: [21]
~~~

- @@a@@ liegt auf dem Stack; @@r@@ ist nur ein zweiter Name für dieselbe Box, @@r = 11@@ ändert also a.
- @@h@@ liegt auf dem Stack und hält eine Adresse; der int dahinter liegt im Heap. @@*h = 21@@ ändert den Heap-Wert.

Ausgabe: @@11 21@@

@@delete h;@@ gibt den Heap-int frei. a und h selbst verschwinden am Ende von main automatisch.`,
    },
    {
      id: 'leak-finden',
      title: 'Memory Leak finden',
      source: 'nach 02 · The Golden Rule',
      points: 6,
      task: r`Die Funktion wird in einer Schleife tausendmal aufgerufen. Was ist das Problem? Nenne zwei Korrekturen.

~~~
void process() {
    int* data = new int[1000];
    data[0] = 1;
    // ... rechnen ...
}
~~~`,
      solution: r`Am Ende von @@process()@@ wird der Stack Frame entfernt – der Pointer @@data@@ verschwindet. Das Array im Heap bleibt, ist aber nicht mehr erreichbar: ein **Memory Leak** von 1000 ints pro Aufruf. Die goldene Regel ist verletzt (new ohne delete).

Korrekturen:

1. Vor dem Ende freigeben: @@delete[] data;@@ (für Arrays die Form mit eckigen Klammern).
2. Besser, im Sinne von „Stack by default“ und RAII: gar kein rohes new, sondern @@std::vector<int> data(1000);@@ – der Vector gibt seinen Speicher im Destruktor selbst frei.`,
    },
    {
      id: 'frames',
      title: 'Stack Frames verfolgen',
      source: 'nach 02 · Stack vs Heap During Function Calls',
      points: 5,
      task: r`Gib den Inhalt des Stacks (von unten nach oben) an, während @@functionB@@ läuft, und beschreibe, was beim Zurückkehren passiert.

~~~
void functionB() { int b = 3; }
void functionA() { int a = 2; functionB(); }
int main() { int x = 1; functionA(); return 0; }
~~~`,
      solution: r`~~~
oben    functionB:  b = 3
        functionA:  a = 2
unten   main:       x = 1
~~~

Jeder Aufruf legt einen neuen Frame auf den Stack. Beim Zurückkehren gilt LIFO: Erst wird der Frame von functionB entfernt (b verschwindet), dann der von functionA (a verschwindet), zuletzt der von main. Alles automatisch – kein delete nötig.`,
    },
  ],
});
