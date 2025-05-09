import * as React from 'react';
import { useEffect } from 'react';
import LegalLayout from './LegalLayout';

const Privacy: React.FC = () => {
  return (
    <LegalLayout title="Politika zasebnosti">
          <p className="lead">
            Pri ocenagor.si cenimo vašo zasebnost in se zavezujemo k varovanju vaših osebnih podatkov. Ta politika zasebnosti pojasnjuje, kako zbiramo, uporabljamo in varujemo vaše podatke.
          </p>

          <h2>1. Zbiranje podatkov</h2>
          <p>
            Zbiramo naslednje vrste osebnih podatkov:
          </p>
          <ul>
            <li>Kontaktni podatki (ime, e-pošta, telefon)</li>
            <li>Podatki o podjetju (ime, naslov, kontaktne osebe)</li>
            <li>Podatki o uporabi storitve (ocene, komentarji)</li>
            <li>Tehnični podatki (IP naslov, podatki o brskalniku)</li>
          </ul>

          <h2>2. Namen uporabe podatkov</h2>
          <p>
            Vaše podatke uporabljamo za:
          </p>
          <ul>
            <li>Zagotavljanje in izboljšanje naših storitev</li>
            <li>Komunikacijo z vami</li>
            <li>Analizo in izboljšanje uporabniške izkušnje</li>
            <li>Izpolnjevanje zakonskih obveznosti</li>
          </ul>

          <h2>3. Pravna podlaga</h2>
          <p>
            Podatke obdelujemo na podlagi:
          </p>
          <ul>
            <li>Vašega soglasja</li>
            <li>Pogodbenega razmerja</li>
            <li>Zakonitega interesa</li>
            <li>Zakonskih obveznosti</li>
          </ul>

          <h2>4. Hramba podatkov</h2>
          <p>
            Vaše podatke hranimo le toliko časa, kolikor je potrebno za namene, za katere so bili zbrani, ali kot to zahteva zakon. Po preteku tega obdobja podatke varno izbrišemo ali anonimiziramo.
          </p>

          <h2>5. Deljenje podatkov</h2>
          <p>
            Vaših podatkov ne prodajamo tretjim osebam. Podatke lahko delimo z:
          </p>
          <ul>
            <li>Našimi zaupanja vrednimi podizvajalci</li>
            <li>Pristojnimi organi na podlagi zakonskih zahtev</li>
          </ul>

          <h2>6. Varnost podatkov</h2>
          <p>
            Uporabljamo ustrezne tehnične in organizacijske ukrepe za zaščito vaših podatkov pred izgubo, zlorabo ali nepooblaščenim dostopom.
          </p>

          <h2>7. Vaše pravice</h2>
          <p>
            Imate pravico do:
          </p>
          <ul>
            <li>Dostopa do svojih podatkov</li>
            <li>Popravka netočnih podatkov</li>
            <li>Izbrisa podatkov</li>
            <li>Omejitve obdelave</li>
            <li>Prenosljivosti podatkov</li>
            <li>Ugovora obdelavi</li>
          </ul>

          <h2>8. Piškotki</h2>
          <p>
            Uporabljamo piškotke in podobne tehnologije za izboljšanje uporabniške izkušnje in analizo uporabe naše storitve. Več o tem si lahko preberete v naši politiki piškotkov.
          </p>

          <h2>9. Spremembe politike</h2>
          <p>
            To politiko lahko občasno posodobimo. O pomembnih spremembah vas bomo obvestili, najnovejša različica pa bo vedno na voljo na naši spletni strani.
          </p>

          <h2>10. Kontakt</h2>
          <p>
            Za vprašanja glede zasebnosti nas lahko kontaktirate:
          </p>
          <ul>
            <li>E-pošta: privacy@ocenagor.si</li>
            <li>Naslov: Tehnološki park 21, 1000 Ljubljana</li>
          </ul>
    </LegalLayout>
  );
};

export default React.memo(Privacy);