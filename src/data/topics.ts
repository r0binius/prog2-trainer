import type { Topic } from '@/domain/content/types';

import { cnfCyk } from './topics/cnf-cyk';
import { dfa } from './topics/dfa';
import { entscheidbarkeit } from './topics/entscheidbarkeit';
import { erreichbarkeit } from './topics/erreichbarkeit';
import { grammatiken } from './topics/grammatiken';
import { grenzen } from './topics/grenzen';
import { kellerautomaten } from './topics/kellerautomaten';
import { kontextabhaengig } from './topics/kontextabhaengig';
import { maschinen } from './topics/maschinen';
import { minimierung } from './topics/minimierung';
import { nfa } from './topics/nfa';
import { petriNetze } from './topics/petri-netze';
import { pnp } from './topics/pnp';
import { regulaer } from './topics/regulaer';
import { sprachen } from './topics/sprachen';

/** Everything the trainer teaches, in the order of the lecture's slide decks (01a to 04b). */
export const topics: readonly Topic[] = [
  sprachen,
  entscheidbarkeit,
  regulaer,
  dfa,
  minimierung,
  grenzen,
  nfa,
  grammatiken,
  cnfCyk,
  kellerautomaten,
  kontextabhaengig,
  maschinen,
  pnp,
  petriNetze,
  erreichbarkeit,
];
