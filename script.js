import { notes, enharmonics, alterations, keyboardNotes, instruments, rangeSteps } from "./constants.js";
import {ctrl, themes} from "./controls.js";

document.addEventListener('DOMContentLoaded', function() {

  // creates and displays the keyboard
  drawKeyboard();
  // creates and displays dropdown buttons
  instrumentsDropdowns();
  // displays current note and info con right panel
  infoNoteDisplay();

  // creates divs for all ranges
  drawRanges();
  setTheme();
  document.querySelector('#theme').addEventListener("click", function() {
    updateTheme();
  });
  
  //keyboard actions
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
  	key.addEventListener('mouseover', function() {
  		this.classList.add("active");
  		keyboardNoteInput(this.dataset);
  	});
  	key.addEventListener('mouseout', function() {
  		this.classList.remove("active");
  	});
  	key.addEventListener('click', function() {
      ctrl.note = {
        pitch: this.dataset.pitch,
        octave: this.dataset.octave,
        alt: this.dataset.alt
      };
      infoNoteDisplay();
  	});
  });

  // event listener for window resize
  window.addEventListener('resize', setKeyboardWidth);
});

/////////////////////
// other functions //
/////////////////////
function setTheme() {
  const storedThemeIndex = localStorage.getItem('themeIndex');
  if (storedThemeIndex !== null) {
    ctrl.theme = parseInt(storedThemeIndex);
  }
  const colors = themes[ctrl.theme];
  colors.forEach((color, index) => {
    document.documentElement.style.setProperty(`--color-${index + 1}`, color);
  }); 
  // Store the theme index in localStorage
  localStorage.setItem('themeIndex', ctrl.theme); 
}

function updateTheme() {
  ctrl.theme = (ctrl.theme + 1) % 5;
  // Store the theme index in localStorage
  localStorage.setItem('themeIndex', ctrl.theme); 
  location.reload();
}

////////////////////////
// keyboard functions //
////////////////////////
function setKeyboardWidth() {
  ctrl.keyboardWidth = document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--keyboard-width', `${ctrl.keyboardWidth}px`);
}

function drawKeyboard() {
  setKeyboardWidth();
  document.documentElement.style.setProperty('--keyboard-width', `${ctrl.keyboardWidth}px`);
  // Get the parent element to append the keys
  let keyboard = document.querySelector('.keyboard');
  // Loop through the notes array and create the key elements
  for (let i = 0; i <= 8; i++) {
    for (let note of notes) {
      if (i==0 && ((note!="A") && (note!="B"))) {
        continue;
      }
      let whiteKey = document.createElement('div');

      // Add the note and octave to the class name
      const className = (note + i);

      // Set the data-note attribute
      whiteKey.setAttribute("data-pitch", note);
      whiteKey.setAttribute("data-octave", i);
      whiteKey.setAttribute("data-alt", " ");
      // Add the class names to the key element
      whiteKey.className = "key white"
      // Append the key element to the keyboard container
      keyboard.appendChild(whiteKey);
      // Last key?
      if (className == "C8") {
        break;
      }
      // Check if a black key should be added between the white keys
      if (note !== "E" && note !== "B") {
        let blackKey = document.createElement('div');
        blackKey.className = "key black";
        blackKey.setAttribute("data-pitch", note);
        blackKey.setAttribute("data-octave", i);
        blackKey.setAttribute("data-alt", "#");
        keyboard.appendChild(blackKey);
      }
    }
  }
}

// draws central note of the staff keyboard input)
function keyboardNoteInput(note) {

  // hides all 8va 15va etc...
  document.querySelectorAll('.octava.va,.octava.vb').forEach( div =>{
    div.classList.add("hide");
  })

  let octave = note.octave;
  let alt = note.alt;
  let pitch = note.pitch;
  let input = "";
  let bassInput = document.querySelector("#staff .bass #current");
  let trebleInput = document.querySelector("#staff .treble #current");

  if (octave < 4) {
    ctrl.note.clef  = "bass";
    let mod8 = document.querySelector('.staff.bass #current-vb8');
    mod8.classList.add("hide");
    if (octave < 2) {
      mod8.classList.remove("hide");
    }
    trebleInput.classList.add("hide");
    bassInput.classList.remove("hide");
    input = bassInput;
  } else {
    ctrl.note.clef = "treble"
    let mod8 = document.querySelector('.staff.treble #current-va8');
    let mod15 = document.querySelector('.staff.treble #current-va15');
    mod8.classList.add("hide");
    mod15.classList.add("hide");
    if (octave >= 7) {
      mod15.classList.remove("hide");
    } else if (octave == 6) {
      mod8.classList.remove("hide");
    }
    trebleInput.classList.remove("hide");
    bassInput.classList.add("hide");
    input = trebleInput;
  }

  let currentNote = keyboardNotes[ctrl.note.clef][pitch + octave.toString()];
  if (currentNote != undefined) {
    if (alt == "#") {
      currentNote += "=";
    } else if (alt == "b") {// b is not implemented in keyboard black keys =( 
      currentNote += "-";
    }
    input.innerText = currentNote;
  }
};

//////////////////////////
// left panel functions //
//////////////////////////
function instrumentsDropdowns() {
  const instrumentsDiv = document.querySelector('.instruments');
  Object.keys(instruments).forEach(key => {

    if (key === "others") {
      return; // Skip this iteration
    }

    let div = document.createElement("div");
    div.className ="dropdown";

    let content = document.createElement("div");
    content.id = "dropdown";
    content.className = "dropdown-content";

    let btn = document.createElement("dropdown-button");
    btn.className = "dropdown-button ".concat(key);
    btn.innerText = key;   
    btn.dataset.group = key;
    btn.addEventListener("click", () => {
      // clears instrument selection, staff notes, name and range
      unselectInstrument(btn.dataset.group, btn.dataset.instrument);
      btn.innerText = key;
    })

    Object.keys(instruments[key]).forEach(element => {
      let a = document.createElement("a");
      a.dataset.group = key;
      a.dataset.instrument = element;
      a.innerText = element;

      a.addEventListener("click", (event) => {
        ctrl.timeout = false;
        resetStaffRangeInput();
        selectInstrument(a.dataset);
        content.classList.remove("show");
        btn.innerText = key + " -> " + element;
        btn.dataset.instrument = element;
        setTimeout(() => { ctrl.timeout = true;   }, 1);
      })
      content.appendChild(a);
    })
    
    btn.addEventListener("mouseover", () => {
      if (ctrl.timeout) {
        content.classList.toggle("show");
      }
    });

    div.addEventListener("mouseleave", () => {
      content.classList.remove("show");
    });

    div.appendChild(btn);
    div.appendChild(content);
    instrumentsDiv.appendChild(div);
  })
}

function selectInstrument(dataset) {
  ctrl.group =  dataset.group;
  ctrl.instrument = dataset.instrument;
  setNoteMinMaxObject()
  setStaffNotes("min");
  setStaffNotes("max");
  displayRange();
  displayInstrumentName();
}

function setNoteMinMaxObject() {
  let minNote = (instruments[ctrl.group][ctrl.instrument].min).split('/');
  let maxNote = (instruments[ctrl.group][ctrl.instrument].max).split('/');
  note.min = {
    pitch: minNote[0],
    octave: parseInt(minNote[2]),
    alt: minNote[1]
  };
  note.max = {
    pitch: maxNote[0],
    octave: parseInt(maxNote[2]),
    alt: maxNote[1]
  };
}

function displayInstrumentName() {
  let input = document.querySelector('#info');
  input.innerText = ctrl.instrument.charAt(0).toUpperCase() + ctrl.instrument.slice(1) + " Range";
}

function unselectInstrument(group, instrument) {
  // clear staff notes ranges and name if is the last selected
  if (instrument == ctrl.instrument) {
    resetStaffRangeInput();
  }
  // clear range
  resetRange(group);
}

function resetStaffRangeInput() {
  // clear Instrument range name!
  ctrl.instrument = "";
  displayInstrumentName();
  document.querySelectorAll("#min, #max").forEach(element =>{
    element.classList.add("hide");
  });
  document.querySelector('#vb8').classList.add("hide");
  document.querySelector('#vb15').classList.add("hide");
  document.querySelector('#va8').classList.add("hide");
  document.querySelector('#va15').classList.add("hide");
}

//////////////////////
// ranges functions //
//////////////////////
function drawRanges() {
  let divs = document.querySelectorAll('.ranges');
  divs.forEach( div => {
      for (let i = 0; i <= 51; i++) {
          const step = document.createElement('div');
          step.className = "step";
          step.dataset.x = i;
          div.appendChild(step);
      }
  });
}

function resetRange(group) {
  let rangeDiv = document.querySelector(`.ranges[data="group-${group}"]`);
  rangeDiv.querySelectorAll(".step").forEach(div => {
    div.classList.remove(group);
  })
}

// add b and # to range drawing
function displayRange() {
  // check for enharmonics (harp min note is Cb, changed it to B!)
  let pitchMin = note.min.pitch;
  let pitchMax = note.max.pitch;
  let altMin = note.min.alt;
  let altMax = note.max.alt;
  let octaveMin = note.min.octave;
  let octaveMax = note.max.octave;
  let minNoteEnharmonic = "";
  let maxNoteEnharmonic = "";
  
  if (altMin != " ") {
    minNoteEnharmonic = enharmonics[pitchMin + altMin];
    if (minNoteEnharmonic) { 
      pitchMin = minNoteEnharmonic;
      altMin = " ";
      if (minNoteEnharmonic == "B") {
        octaveMin -= 1; 
      } else if (minNoteEnharmonic == "C") {
        octaveMin += 1; 
      }
    }
  }

  if (altMax != " ") {
    maxNoteEnharmonic = enharmonics[pitchMax + altMax];
    if (maxNoteEnharmonic) { 
      pitchMax = maxNoteEnharmonic;
      altMax = " ";
      if (maxNoteEnharmonic == "B") {
        octaveMax -= 1; 
      } else if (maxNoteEnharmonic == "C") {
        octaveMax += 1; 
      }
    }
  }

  // enharmonico manual, pasar Ab a G# para harpa... etc.
  if (altMin == "#") {
    pitchMin = notes[notes.indexOf(pitchMin) + 1];
    altMin = "b";
  }
  if (altMax == "b") {
    pitchMax = notes[notes.indexOf(pitchMax) - 1];
    altMax = "#";
  }

  let minStep = rangeSteps[pitchMin + (octaveMin.toString())];
  let maxStep = rangeSteps[pitchMax + (octaveMax.toString())];
  console.log(pitchMin,octaveMin, minStep, pitchMax,octaveMax, maxStep);

  let rangeDiv = document.querySelector(`.ranges[data="group-${ctrl.group}"]`);
  rangeDiv.querySelectorAll(".step").forEach(div => {
    div.classList.remove(ctrl.group);
  });

  // Select all the div elements with the data-x attribute, excluding the range from minStep to maxStep
  let stringRange = "";
  for (let i = minStep; i <= maxStep; i++) {
    stringRange += `[data-x="${i}"], `;
  }
  // Remove the trailing comma
  stringRange = stringRange.slice(0, -2);
  
  const stepsDivs = rangeDiv.querySelectorAll(`.step${stringRange}`); 
  // Loop through the selected divs and hide them
  stepsDivs.forEach(div => {
    div.classList.toggle(ctrl.group);
  });
}

/////////////////////
// staff functions //
/////////////////////
function setStaffNotes(type) { //HIDE ALL? THE IF FOR SHOW??
  let pitch = note[type].pitch;
  let alt = note[type].alt;
  let octave = note[type].octave;
  let clef = "";

  let input = "";
  let bassInput = document.querySelector(`#staff .bass #${type}`);
  let trebleInput = document.querySelector(`#staff .treble #${type}`);
  if (octave < 4) {
      clef = "bass";
      let mod8 = document.querySelector('.staff.bass #vb8');
      mod8.classList.add("hide");
      if (octave <= 1) {
        mod8.classList.remove("hide");
      }
      trebleInput.classList.add("hide");
      bassInput.classList.remove("hide");
      input = bassInput;
    } else {
      clef = "treble";
      let mod8 = document.querySelector('.staff.treble #va8');
      let mod15 = document.querySelector('.staff.treble #va15');
      mod8.classList.add("hide");
      mod15.classList.add("hide");
      if (octave == 6) {
        mod8.classList.remove("hide");
        mod15.classList.add("hide");
      } else if (octave >= 7) {
        mod8.classList.add("hide");
        mod15.classList.remove("hide");
      }
      trebleInput.classList.remove("hide");
      bassInput.classList.add("hide");
      input = trebleInput;
    }
    let currentNote = keyboardNotes[clef][pitch+octave];
    if (currentNote != undefined) {
      if (alt) {
          if (alt == "#") {
              currentNote += "=";
          } else if (alt == "b") {
              currentNote += "-";
          }
      }
      input.innerText = currentNote;
    }
}

////////////////////
// note functions //
////////////////////
function infoNoteDisplay() {
  document.querySelector("#note .info").innerText = `Selected Note: ${ctrl.note.pitch}${ctrl.note.alt}${ctrl.note.octave}`;
  let listDiv = document.querySelector("#note .info.list");
  listDiv.innerHTML = "";
  Object.keys(instruments).forEach(key => {
      let ul = document.createElement("ul");
      ul.setAttribute('aria-label', key);
      Object.keys(instruments[key]).forEach(instrument => {
          let minNote = instruments[key][instrument].min;
          let minNotePitch = minNote.slice("/")[0];
          let minNoteAlt = minNote.slice("/")[2];

          let maxNote = instruments[key][instrument].max;
          let maxNotePitch =  maxNote.slice("/")[0];
          let maxNoteAlt = maxNote.slice("/")[2];

          let octaveMin = parseInt(minNote.slice(-1));
          let octaveMax =  parseInt(maxNote.slice(-1));

          let octaveCurrent = ctrl.note.octave;
          let noteCurrent = ctrl.note.pitch;
          let minNoteEnharmonic = "";
          let maxNoteEnharmonic = "";

          if (minNoteAlt != " ") {
            minNoteEnharmonic = enharmonics[minNotePitch + minNoteAlt];
            if (minNoteEnharmonic) { 
              minNotePitch = minNoteEnharmonic;
              minNoteAlt = " ";
              if (minNoteEnharmonic == "B") {
                octaveMin -= 1; 
              } else if (minNoteEnharmonic == "C") {
                octaveMin += 1; 
              }
            }
          }

          if (maxNoteAlt != " ") {
            maxNoteEnharmonic = enharmonics[minNotePitch + maxNoteAlt];
            if (maxNoteEnharmonic) { 
              maxNotePitch = maxNoteEnharmonic;
              maxNoteAlt = " ";
              if (maxNoteEnharmonic == "B") {
                octaveMax -= 1; 
              } else if (minNoteEnharmonic == "C") {
                octaveMin += 1; 
              }
            }
          }
          
          // manual enharmonic from b to #
          if (minNoteAlt == "b") {
            minNotePitch = notes[notes.indexOf(minNotePitch) - 1];
            minNoteAlt = "#";
          }
          if (maxNoteAlt == "b") {
            maxNotePitch = notes[notes.indexOf(maxNotePitch) - 1];
            maxNoteAlt = "#";
          }

          // check octava number, then checks pitch name...
          if (octaveCurrent == octaveMin) {
            if (notes.indexOf(noteCurrent) >= notes.indexOf(minNotePitch)) {
              if (notes.indexOf(noteCurrent) == notes.indexOf(minNotePitch)) {
                if (alterations.indexOf(ctrl.note.alt) >= alterations.indexOf(minNoteAlt)) {
                  let li = document.createElement("li");
                  li.innerText = instrument;
                  ul.appendChild(li);
                }
              } else {
                let li = document.createElement("li");
                li.innerText = instrument;
                ul.appendChild(li);
              }       
            }
          } else if (octaveCurrent == octaveMax) {
            if (notes.indexOf(noteCurrent) <= notes.indexOf(maxNotePitch)) {
              if (notes.indexOf(noteCurrent) == notes.indexOf(maxNotePitch)) {
                if (alterations.indexOf(ctrl.note.alt) <= alterations.indexOf(maxNoteAlt)) {
                  let li = document.createElement("li");
                  li.innerText = instrument;
                  ul.appendChild(li);
                }
              } else {
                let li = document.createElement("li");
                li.innerText = instrument;
                ul.appendChild(li);
              }
            }
          } else if (octaveCurrent > octaveMin && octaveCurrent < octaveMax) {
            let li = document.createElement("li");
            li.innerText = instrument;
            ul.appendChild(li);
          }
      });
      listDiv.appendChild(ul);
  });
}