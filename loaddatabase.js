'use strict';

const mongodb = require('mongodb');
const assert = require('assert');

const dbUrl = process.env.MONGO_URI;
const dbName = dbUrl.substr(dbUrl.lastIndexOf('/') + 1);

const mongoClient = mongodb.MongoClient;

const primates = [
    // Dwarf and mouse Lemurs (34 species)

    { // Fat tailed dwarf lemur
    "keywords": ["lemur", "lemurs"],
    "species": "Cheirogaleus medius",
    "status": "least concern",
    "url": "https://en.wikipedia.org/wiki/File:Cheirogaleus-medius.jpg",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Cheirogaleus-medius.jpg/220px-Cheirogaleus-medius.jpg",
    "context": "https://en.wikipedia.org/wiki/Fat-tailed_dwarf_lemur",
    "alt-text": "The Fat tailed dwarf lemur lives in the forests of Madagascar where it hiberates through the tropical winter"
    },

    // Aye-aye (1 species)
    // Ring-tailed lemur and allies (21 species)
    // Sportive lemurs (26 species)
    // Woolly lemurs and allies (19 species)

    // Lorisids (14 species)
    // Galagos (19 species)

    // Tarsiers (11 species)

    { // Dian's Tarsier
    "keywords": ["tarsier", "tarsiers"],
    "species": "Tarsius dentatus",
    "status": "vulnerable",
    "url": "https://www.arkive.org/dians-tarsier/tarsius-dentatus/",
    "thumbnail": "https://53744bf91d44b81762e0-fbbc959d4e21c00b07dbe9c75f9c0b63.ssl.cf3.rackcdn.com/media/0F/0F06B8CF-E53D-43C0-A7BD-E92562D2A657/Presentation.Large/Male-Dians-tarsier-portrait.jpg",
    "context": "https://en.wikipedia.org/wiki/Dian%27s_tarsier",
    "alt-text": "Dian's Tarsier is a nocturnal primate endemic to Sulawesi in South East Asia"
    },

    // Marmosets and tamarins (42 species)

    { // Common Marmoset
    "keywords": ["marmoset", "marmosets", "new world monkey", "new world monkeys"],
    "species": "Callithrix jacchus",
    "status": "least concern",
    "url": "https://en.wikipedia.org/wiki/File:Wei%C3%9Fb%C3%BCschelaffe_(Callithrix_jacchus).jpg",
    "thumbnail": "https://en.wikipedia.org/wiki/File:Wei%C3%9Fb%C3%BCschelaffe_(Callithrix_jacchus).jpg",
    "context": "https://en.wikipedia.org/wiki/Common_marmoset",
    "alt-text": "The common marmoset lives in Brazil and in some areas is invasive"
    },

    // Capuchines and squirrel monkeys (14 species)
    // Night or owl monkeys (11 species)
    // Titis, sakis and uakaris (43 species)
    // Holwer, spider, woolly spider and woolly monkeys (29 species)

    { // Red-faced Spider Monkey
    "keywords": ["spider monkey", "spider monkeys", "new world monkey", "new world monkeys", "monkey", "monkeys"],
    "species": "Ateles paniscus",
    "status": "vulnerable",
    "url": "https://en.wikipedia.org/wiki/File:Ateles_paniscus.jpg",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Ateles_paniscus.jpg/220px-Ateles_paniscus.jpg",
    "context": "https://en.wikipedia.org/wiki/Ateles_paniscus",
    "alt-text": "The Red-faced spider monkey lives in the Guiana jungles of South America"
    },

    // Old World Monkeys (138 species)

    { // Allen's swap monkey
    "keywords": ["swamp monkey", "swamp monkeys", "old world monkey", "old world monkeys"],
    "species": "Allenopithecus nigroviridis",
    "status": "least concern",
    "url": "https://en.wikipedia.org/wiki/File:Allens_swamp_monkey.jpg",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Allens_swamp_monkey.jpg/220px-Allens_swamp_monkey.jpg",
    "context": "https://en.wikipedia.org/wiki/Allen%27s_swamp_monkey",
    "alt-text": "Allen's swap monkey lives in the Congo Basin"
    },

    // Gibbons (18 species)

    { // Western hoolock gibbon
    "keywords": ["gibbon", "gibbons", "ape", "apes"],
    "species": "Hoolock hoolock",
    "status": "endangered",
    "url": "https://en.wikipedia.org/wiki/File:Hoolock_hoolock_001.jpg",
    "thumbnail": "https://en.wikipedia.org/wiki/File:Hoolock_hoolock_001.jpg",
    "context": "https://en.wikipedia.org/wiki/Western_hoolock_gibbon",
    "alt-text": "The Western Hoolock Gibbon lives in Western Mayanmar and neighbouring countries in Asia"
    },
    { // Eastern hoolock gibbon
    "keywords": ["gibbon", "gibbons", "ape", "apes"],
    "species": "Hoolock leuconedys",
    "status": "vulnerable",
    "url": "",
    "thumbnail": "",
    "context": "https://en.wikipedia.org/wiki/Eastern_hoolock_gibbon",
    "alt-text": "The Eastern Hoolock Gibbon lives in Eastern Mayanmar and neighbouring countries in Asia"
    },

    // Great Apes (7 species)
    { // Western gorilla
    "keywords": ["gorilla", "gorillas", "great ape", "great apes"],
    "species": "Gorilla gorilla",
    "status": "critically endangered",
    "url": "https://en.wikipedia.org/wiki/File:Male_gorilla_in_SF_zoo.jpg",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Male_gorilla_in_SF_zoo.jpg/220px-Male_gorilla_in_SF_zoo.jpg",
    "context": "https://en.wikipedia.org/wiki/Gorilla",
    "alt-text": "Western gorillas are ground dwelling herbivorous apes from central Sub-Saharan Africa"
    },
    { // Eastern gorilla
    "keywords": ["gorilla", "gorillas", "great ape", "great apes"],
    "species": "Gorilla beringei",
    "status": "critically endangered",
    "url": "https://en.wikipedia.org/wiki/File:Mountain_gorillas_(8209001529).jpg",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Mountain_gorillas_%288209001529%29.jpg/220px-Mountain_gorillas_%288209001529%29.jpg",
    "context": "https://en.wikipedia.org/wiki/Eastern_gorilla",
    "alt-text": "Eastern Gorillas are critically endangered"
    },
    { // Common chimpanzee
    "keywords": ["chimpanzee", "chimpanzees", "great ape", "great apes"],
    "species": "Pan troglodytes",
    "status": "endangered",
    "url": "https://en.wikipedia.org/wiki/File:Pan_troglodytes_(male).jpg",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Pan_troglodytes_%28male%29.jpg/220px-Pan_troglodytes_%28male%29.jpg",
    "context": "https://en.wikipedia.org/wiki/Common_chimpanzee",
    "alt-text": "Common chimpanzees live in West and Central Africa"
    },
    { // Bonobo
    "keywords": ["chimpanzee", "chimpanzees", "great ape", "great apes"],
    "species": "Pan paniscus",
    "status": "endangered",
    "url": "https://en.wikipedia.org/wiki/File:Bonobos_Lana_%26_Kesi_2006_CALVIN_IMG_1301.JPG",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Bonobos_Lana_%26_Kesi_2006_CALVIN_IMG_1301.JPG/220px-Bonobos_Lana_%26_Kesi_2006_CALVIN_IMG_1301.JPG",
    "context": "https://en.wikipedia.org/wiki/Bonobo",
    "alt-text": "Bonobos are a smaller species of chimpanzee living south of the Congo river in Central Africa"
    },
    { // Bornean Orangutan
    "keywords": ["orangutan", "orangutans", "great ape", "great apes"],
    "species": "Pongo pygmaeus",
    "status": "critically endangered",
    "url": "https://en.wikipedia.org/wiki/File:Orang_Utan,_Semenggok_Forest_Reserve,_Sarawak,_Borneo,_Malaysia.JPG",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG/220px-Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG",
    "context": "https://en.wikipedia.org/wiki/Orangutan",
    "alt-text": "Bornean Orangutans are an arboreal species that live in the jungles of Borneo in South East Asia"
    },
    { // Sumatran Orangutan
    "keywords": ["orangutan", "orangutans", "great ape", "great apes"],
    "species": "Pongo abelii",
    "status": "critically endangered",
    "url": "https://en.wikipedia.org/wiki/File:Sumatra-Orang-Utan_Pongo_pygmaeus_abeli_Tierpark_Hellabrunn-1.jpg",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pongo_abelii_m2.JPG/220px-Pongo_abelii_m2.JPG",
    "context": "https://en.wikipedia.org/wiki/Sumatran_orangutan",
    "alt-text": "Sumatran Orangutans are an arboreal species that live in the jungles of Sumatra in South East Asia"
    },
    { // Tapanuli Orangutan
    "keywords": ["orangutan", "orangutans", "great ape", "great apes"],
    "species": "Pongo tapanuliensis",
    "status": "critically endangered",
    "url": "https://en.wikipedia.org/wiki/File:Pongo_tapanuliensis.jpg",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pongo_tapanuliensis.jpg/220px-Pongo_tapanuliensis.jpg",
    "context": "https://en.wikipedia.org/wiki/Tapanuli_orangutan",
    "alt-text": "Tapanuli Orangutans are a genetically distinct species that live in the Tapanuli region of Sumatra in South East Asia"
    }
];

console.log(dbUrl);
console.log(dbName);

mongoClient.connect(dbUrl, (err, database) => {
  assert.equal(null, err);

  database.db(dbName).collection('primates').drop((err, ok) => {
      if (ok)
        console.log("primates collection deleted");

      database.db(dbName).collection('primates').insertMany(
        primates, (err, documents) => {
          assert.equal(null, err);

          database.close();

          console.log("primates collection loaded");
        });
  });
});
