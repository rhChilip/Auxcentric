// frågor (steg 1)
console.log("Hi");

alert("I DONT CARE ABOUT STEEL BALL RUN I WANT SBR!!");

/* frågor (steg 2)

let namn = "Nenne";
var job = "Job job sahur";
const årserfarenhet = 67;

	console.log("Namn:", namn);
	console.log("Jobb:", job);
	console.log("årserfarenhet:", årserfarenhet);

let tal1 = 6;
let tal2 = 7;

var summa = (tal1 + tal2);

	console.log("6 + 7:", summa);
*/

/* frågor (steg 3)
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Svar = getRandomNumber(1, 10);
let gissning = getRandomNumber(1, 10);

while (gissning !== Svar)
{	
  if (gissning > Svar) {
    console.log(`${gissning}: För högt!`);
  } else if (gissning < Svar) {
    console.log(`${gissning}: För lågt!`);
  }		

  gissning = getRandomNumber(1, 10);
}

console.log(`${gissning}: Rätt!!!`);

for (let i = 1; i <= 10; i++) {
		console.log("Nummer: " + i);
	}
*/

/* frågor (steg 4)
let nmr1 = 5;
let nmr2 = 7;

function addition(nmr1, nmr2)
	{
		return nmr1 + nmr2;
	}
	
console.log(addition(nmr1, nmr2));

function byttlila() {
	document.body.style.backgroundColor = "purple";
}
*/

let currentPokemon = ""; 

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();

        currentPokemon = data.name;

        const numberContainer = document.getElementById("pokemonNumber");
        numberContainer.textContent = `#${data.id}`;

        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        const typeContainer = document.getElementById("pokemonTypes");
        const types = data.types.map(typeInfo => typeInfo.type.name);
        typeContainer.textContent = `Type: ${types.join(" / ")}`;

        const audioElement = document.getElementById("pokemonCry");
        audioElement.src = data.cries.latest;
        audioElement.style.display = "block";

        displayEntries(); 

    } catch (error) {
        console.log("Could not find Pokemon", error);
    }
}

const dagbokinput = document.getElementById('dagbokinput');
const sparaknapp = document.getElementById('sparaknapp');
const entriescontainer = document.getElementById('entriescontainer');

let allPokemonNotes = JSON.parse(localStorage.getItem('mindagbok')) || {};

sparaknapp.addEventListener('click', () => {
    if (currentPokemon === "") {
        alert("Sök efter en Pokémon först!");
        return;
    }

    const text = dagbokinput.value.trim();
    if (text === "") return;

    if (!allPokemonNotes[currentPokemon]) {
        allPokemonNotes[currentPokemon] = []; 
    }

    const newEntry = {
        id: Date.now(),
        content: text,
        date: new Date().toLocaleString('sv-SE')
    };

    allPokemonNotes[currentPokemon].unshift(newEntry);
    
    localStorage.setItem('mindagbok', JSON.stringify(allPokemonNotes));
    
    dagbokinput.value = "";
    displayEntries();
});

function displayEntries() {
    entriescontainer.innerHTML = "";
    
    const currentNotes = allPokemonNotes[currentPokemon] || [];

    currentNotes.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.innerHTML = `
            <small>${entry.date}</small>
            <p>${entry.content}</p>
            <button onclick="deleteEntry(${entry.id})">Radera</button>
        `;
        entriescontainer.appendChild(entryDiv);
    });
}

function deleteEntry(id) {
    allPokemonNotes[currentPokemon] = allPokemonNotes[currentPokemon].filter(entry => entry.id !== id);
    
    localStorage.setItem('mindagbok', JSON.stringify(allPokemonNotes));
    displayEntries();
}
