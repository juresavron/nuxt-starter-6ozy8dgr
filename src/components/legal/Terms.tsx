import * as React from 'react';
import { useEffect } from 'react';
import LegalLayout from './LegalLayout';

const Terms: React.FC = () => {
  return (
    <LegalLayout title="Pogoji uporabe">
          <h2>1. Splošne določbe</h2>
          <p>
            Ti splošni pogoji uporabe ("Pogoji") urejajo uporabo storitve ocenagor.si ("Storitev"), ki jo upravlja podjetje ocenagor.si ("mi", "nas" ali "naše"). Z uporabo Storitve se strinjate s temi pogoji.
          </p>

          <h2>2. Opis storitve</h2>
          <p>
            Storitev ocenagor.si je platforma za upravljanje spletnih ocen in povratnih informacij strank. Omogoča podjetjem zbiranje, upravljanje in analizo ocen strank ter optimizacijo njihovega spletnega ugleda.
          </p>

          <h2>3. Registracija in račun</h2>
          <p>
            Za uporabo Storitve morate ustvariti račun. Odgovorni ste za ohranjanje zaupnosti svojih prijavnih podatkov in za vse dejavnosti, ki se izvajajo prek vašega računa.
          </p>

          <h2>4. Pravice in obveznosti uporabnika</h2>
          <p>
            Strinjate se, da boste Storitev uporabljali v skladu z veljavno zakonodajo in temi pogoji. Prepovedano je:
          </p>
          <ul>
            <li>Uporaba storitve za nezakonite namene</li>
            <li>Zbiranje lažnih ali zavajajočih ocen</li>
            <li>Manipulacija s sistemom ocenjevanja</li>
            <li>Kršenje pravic drugih uporabnikov ali tretjih oseb</li>
          </ul>

          <h2>5. Plačilo in naročnina</h2>
          <p>
            Storitev je na voljo prek različnih naročniških paketov. Cene in pogoji plačila so navedeni na naši spletni strani. Pridržujemo si pravico do spremembe cen z ustreznim predhodnim obvestilom.
          </p>

          <h2>6. Intelektualna lastnina</h2>
          <p>
            Vse pravice intelektualne lastnine v zvezi s Storitvijo (vključno s programsko opremo, oblikovanjem in vsebino) so v naši lasti ali v lasti naših licencodajalcev.
          </p>

          <h2>7. Omejitev odgovornosti</h2>
          <p>
            Storitev je na voljo "takšna, kot je". Ne prevzemamo odgovornosti za kakršno koli škodo, ki bi nastala zaradi uporabe ali nezmožnosti uporabe Storitve.
          </p>

          <h2>8. Spremembe pogojev</h2>
          <p>
            Pridržujemo si pravico do spremembe teh pogojev. O pomembnih spremembah vas bomo obvestili. Nadaljnja uporaba Storitve po spremembah pomeni vaše strinjanje z novimi pogoji.
          </p>

          <h2>9. Prenehanje</h2>
          <p>
            Pridržujemo si pravico do začasne ali trajne ukinitve vašega dostopa do Storitve v primeru kršitve teh pogojev ali iz drugih utemeljenih razlogov.
          </p>

          <h2>10. Veljavno pravo</h2>
          <p>
            Ti pogoji se presojajo po slovenskem pravu. Za reševanje sporov so pristojna slovenska sodišča.
          </p>

          <h2>11. Kontakt</h2>
          <p>
            Za vprašanja v zvezi s temi pogoji nas lahko kontaktirate na info@ocenagor.si.
          </p>
    </LegalLayout>
  );
};

export default React.memo(Terms);