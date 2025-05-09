import * as React from 'react';
import { useEffect } from 'react';
import LegalLayout from './LegalLayout';

const GDPR: React.FC = () => {
  return (
    <LegalLayout title="GDPR Skladnost">
          <p className="lead">
            Ta dokument pojasnjuje, kako ocenagor.si zagotavlja skladnost z Splošno uredbo o varstvu podatkov (GDPR) in varuje pravice posameznikov v zvezi z obdelavo osebnih podatkov.
          </p>

          <h2>1. Upravljavec podatkov</h2>
          <p>
            Upravljavec vaših osebnih podatkov je ocenagor.si. Naš pooblaščenec za varstvo podatkov je dosegljiv na dpo@ocenagor.si.
          </p>

          <h2>2. Načela obdelave podatkov</h2>
          <p>
            Pri obdelavi osebnih podatkov sledimo naslednjim načelom:
          </p>
          <ul>
            <li>Zakonitost, pravičnost in transparentnost</li>
            <li>Omejitev namena</li>
            <li>Minimizacija podatkov</li>
            <li>Točnost</li>
            <li>Omejitev shranjevanja</li>
            <li>Celovitost in zaupnost</li>
            <li>Odgovornost</li>
          </ul>

          <h2>3. Pravne podlage za obdelavo</h2>
          <p>
            Osebne podatke obdelujemo na naslednjih pravnih podlagah:
          </p>
          <ul>
            <li>Privolitev posameznika</li>
            <li>Pogodbena obveznost</li>
            <li>Zakonska obveznost</li>
            <li>Zaščita življenjskih interesov</li>
            <li>Opravljanje naloge v javnem interesu</li>
            <li>Zakoniti interesi</li>
          </ul>

          <h2>4. Pravice posameznikov</h2>
          <p>
            V skladu z GDPR imate naslednje pravice:
          </p>
          <ul>
            <li>Pravica do dostopa do podatkov</li>
            <li>Pravica do popravka</li>
            <li>Pravica do izbrisa ("pravica do pozabe")</li>
            <li>Pravica do omejitve obdelave</li>
            <li>Pravica do prenosljivosti podatkov</li>
            <li>Pravica do ugovora</li>
            <li>Pravica glede avtomatiziranega sprejemanja odločitev</li>
          </ul>

          <h2>5. Uveljavljanje pravic</h2>
          <p>
            Za uveljavljanje svojih pravic lahko:
          </p>
          <ul>
            <li>Pošljete e-pošto na privacy@ocenagor.si</li>
            <li>Pišete na naslov: Tehnološki park 21, 1000 Ljubljana</li>
            <li>Izpolnite obrazec na naši spletni strani</li>
          </ul>

          <h2>6. Varnostni ukrepi</h2>
          <p>
            Za zaščito vaših podatkov izvajamo naslednje ukrepe:
          </p>
          <ul>
            <li>Šifriranje podatkov</li>
            <li>Redno varnostno kopiranje</li>
            <li>Nadzor dostopa</li>
            <li>Usposabljanje zaposlenih</li>
            <li>Redno preverjanje varnosti</li>
          </ul>

          <h2>7. Mednarodni prenosi podatkov</h2>
          <p>
            Kadar prenašamo podatke izven EU/EGP, zagotavljamo ustrezne zaščitne ukrepe v skladu z GDPR.
          </p>

          <h2>8. Kršitve varstva podatkov</h2>
          <p>
            V primeru kršitve varstva osebnih podatkov bomo:
          </p>
          <ul>
            <li>Obvestili pristojni nadzorni organ v 72 urah</li>
            <li>Obvestili posameznike, če obstaja veliko tveganje</li>
            <li>Dokumentirali vse kršitve in sprejete ukrepe</li>
          </ul>

          <h2>9. Ocena učinka</h2>
          <p>
            Redno izvajamo ocene učinka v zvezi z varstvom podatkov za tvegane obdelave.
          </p>

          <h2>10. Pooblaščene osebe</h2>
          <p>
            Imenovali smo pooblaščeno osebo za varstvo podatkov (DPO) in druge odgovorne osebe za zagotavljanje skladnosti z GDPR.
          </p>
    </LegalLayout>
  );
};

export default React.memo(GDPR);