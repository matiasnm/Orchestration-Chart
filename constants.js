export const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export const enharmonics = {
    "Cb":"B",
    "B#":"C",
    "E#":"F",
    "Fb":"E"
};

export const alterations = ['b',' ','#']; // index 0=flat, 1=nat, 2=sharp

export const keyboardNotes = {
    "treble": {
        "C4":"A~~", "D4":"S~~", "E4":"D~~", "F4":"F~~", "G4":"G~~", "A4":"H~~", "B4":"J~~",
        "C5":"Q~~", "D5":"W~~", "E5":"E~~", "F5":"R~~", "G5":"T~~", "A5":"Y~~", "B5":"U~~",
        "C6":"Q~~", "D6":"W~~", "E6":"E~~", "F6":"R~~", "G6":"T~~", "A6":"Y~~", "B6":"U~~",
        "C7":"Q~~", "D7":"W~~", "E7":"E~~", "F7":"R~~", "G7":"T~~", "A7":"Y~~", "B7":"U~~",
        "C8":"!~~"
    },
    "bass": {
	  	"A0":"V~~", "B0":"B~~",
        "C1":"N~~", "D1":"M~~", "E1":"A~~", "F1":"S~~", "G1":"D~~", "A1":"F~~", "B1":"G~~",
        "C2":"N~~", "D2":"M~~", "E2":"A~~", "F2":"S~~", "G2":"D~~", "A2":"F~~", "B2":"G~~",
        "C3":"H~~", "D3":"J~~", "E3":"Q~~", "F3":"W~~", "G3":"E~~", "A3":"R~~", "B3":"T~~",
        "C4":"Y~~",
    }
};

export const instruments = {
    "strings":{
        "violin":       {"min":"G/ /3",  "max":"A/ /7"},
        "viola":        {"min":"C/ /3",  "max":"C/ /6"},
        "cello":        {"min":"C/ /2",  "max":"A/ /5"},
        "contrabass":   {"min":"C/ /1",  "max":"G/ /5"},
        "harp":         {"min":"C/b/1", "max":"A/b/7"}
    },
    "brass":{
        "horn":         {"min":"G/ /1",  "max":"F/ /5"},
        "trumpet [C]":  {"min":"F/#/3", "max":"D/ /6"},
        "trombone":     {"min":"E/ /2",  "max":"F/ /5"},//B/b/4
        "tuba":         {"min":"F/ /1",  "max":"D/ /4"}
    },
    "percussion":{
        "celesta":      {"min":"C/ /3",  "max":"C/ /5"},
        "glockenspiel": {"min":"G/ /3",  "max":"C/ /6"},
        "marimba":      {"min":"C/ /3",  "max":"C/ /7"},
        "tubular bells":{"min":"C/ /4",  "max":"G/ /5"},
        "vibrafono":    {"min":"F/ /3",  "max":"F/ /6"},
        "xilofon":      {"min":"C/ /4",  "max":"C/ /8"}
    },
    "woodwinds":{
        "piccolo":      {"min":"C/ /5",  "max":"C/ /8"},
        "flute":        {"min":"C/ /4",  "max":"C/ /7"},
        "oboe":         {"min":"B/b/3", "max":"G/ /6"},
        "english horn": {"min":"E/ /3", "max":"C/ /6"},
        "clarinet [Bb]":{"min":"D/ /3",  "max":"G/ /6"},
        "basson":       {"min":"B/b/1", "max":"D/b/5"},
        "contrabasson": {"min":"B/b/0", "max":"D/ /4"}    
    },
    "voices":{
        "soprano":      {"min":"C/ /4",  "max":"F/ /6"},
        "alto":         {"min":"F/ /3",  "max":"A/ /5"},
        "tenor":        {"min":"C/ /3",  "max":"C/ /5"},
        "baritone":     {"min":"G/ /2",  "max":"G/ /4"},
        "bass":         {"min":"C/ /2",  "max":"E/ /4"}
    },
    "others":{
        "accordion" :   {"min":"F/ /3",  "max":"A/ /6"},
        "bandoneon":    {"min":"C/ /2",  "max":"B/ /6"},
        "guitar":       {"min":"E/ /2",  "max":"B/ /5"},
        "piano":        {"min":"A/ /0",  "max":"C/ /8"},
    }
};

export const rangeSteps = {
    "A0": 0, "B0": 1,
    "C1": 2, "D1": 3, "E1": 4, "F1": 5, "G1": 6, "A1": 7, "B1": 8,
    "C2": 9, "D2": 10, "E2": 11, "F2": 12, "G2": 13, "A2": 14, "B2": 15,
    "C3": 16, "D3": 17, "E3": 18, "F3": 19, "G3": 20, "A3": 21, "B3": 22,
    "C4": 23, "D4": 24, "E4": 25, "F4": 26, "G4": 27, "A4": 28, "B4": 29,
    "C5": 30, "D5": 31, "E5": 32, "F5": 33, "G5": 34, "A5": 35, "B5": 36,
    "C6": 37, "D6": 38, "E6": 39, "F6": 40, "G6": 41, "A6": 42, "B6": 43,
    "C7": 44, "D7": 45, "E7": 46, "F7": 47, "G7": 48, "A7": 49, "B7": 50, 
    "C8": 51
};