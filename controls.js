export const ctrl = {

    timeout : true, //for dropdown clicks
    theme : 3,
    keyboardWidth : "",
    group : "strings", //last clicked group
    instrument : "", //last clicked instrument

    note : {
      pitch: "C",
      octave: 4,
      alt: " ",
      clef: ""
    },

    min : {
      pitch: "",
      octave: 0,
      alt: " ",
      clef: ""
    },

    max : {
      pitch: "",
      octave: 0,
      alt: " ",
      clef: ""
    }
};

export const themes = {
    0: ["#ff2c55","#a62639","#511c29","#56494e","#a29c9b"],
    1: ["#ef476f","#ffd166","#06d6a0","#118ab2","#073b4c"],
    2: ["#8ecae6","#219ebc","#023047","#ffb703","#fb8500"],
    3: ["#264653","#2a9d8f","#e9c46a","#f4a261","#e76f51"],
    4: ["#2c0735","#4e148c","#613dc1","#858ae3","#97dffc"]
};