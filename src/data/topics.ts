import type { Topic } from '@/domain/content/types';

import { ausfuehrung } from './topics/ausfuehrung';
import { cppGrundlagen } from './topics/cpp-grundlagen';
import { cppStruktur } from './topics/cpp-struktur';
import { fehler } from './topics/fehler';
import { funktionen } from './topics/funktionen';
import { javaFeatures } from './topics/java-features';
import { javaMethoden } from './topics/java-methoden';
import { javaModell } from './topics/java-modell';
import { javaOop } from './topics/java-oop';
import { javaSyntax } from './topics/java-syntax';
import { klassen } from './topics/klassen';
import { kopieren } from './topics/kopieren';
import { polymorphie } from './topics/polymorphie';
import { speicher } from './topics/speicher';
import { sprachen } from './topics/sprachen';
import { templatesModern } from './topics/templates-modern';
import { vererbung } from './topics/vererbung';

/** Everything the trainer teaches, in the order of the lecture's slide decks (01 to 08a). */
export const topics: readonly Topic[] = [
  sprachen,
  ausfuehrung,
  cppGrundlagen,
  speicher,
  cppStruktur,
  funktionen,
  klassen,
  kopieren,
  vererbung,
  polymorphie,
  fehler,
  templatesModern,
  javaModell,
  javaSyntax,
  javaMethoden,
  javaOop,
  javaFeatures,
];
