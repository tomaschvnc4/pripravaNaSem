import React from 'react';
// import { useGlobalContext } from '../context';

const About = () => {
   // const {showNav} = useGlobalContext();

   return (
      <section className='section about-section'>
         <h1 className='section-title'>o nás</h1>
         <p>
            <b>
               Autopožičovňa Dewel Tech Slovensko,pobočka Liptovský Mikuláš je založená na korektnom
               prístupe ku klientom. Našou prioritou je flexibilný a individuálny prístup ku každému
               zákazníkovi. Poskytujeme krátkodobý a dlhodobý prenájom osobných automobilov Škoda,
               Volkswagen, Peugeot a Audi.
            </b>
         </p>
         <p>
            Na zabezpečenie našich služieb používame len nové autá, ktoré sú pravidelne kontrolované
            v autorizovanom servise. Náš personál je vám k dispozícii 24 hodín denne. Jednoduché a
            prehľadné zmluvy s jasne špecifikovanými pravidlami. Individuálny a kvalitný prístup ku
            klientovi, rovnako ako komplexné služby sú samozrejmosťou.
         </p>
      </section>
   );
};

export default About;
