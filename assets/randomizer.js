if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
  HTMLElement.prototype.click = function () {
    var evt = this.ownerDocument.createEvent("MouseEvents");
    evt.initMouseEvent(
      "click",
      true,
      true,
      this.ownerDocument.defaultView,
      1,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    this.dispatchEvent(evt);
  };
}

function scrambleGrid() {
  var req = new XMLHttpRequest();

  const HANDLE =
    document.getElementById("grid-select").value === "Standard" ?
    "assets/template_standard.txt" :
    "assets/template_expert.txt";

  const SAVEFILE =
    document.getElementById("version-select").value === "PC" ?
    new Uint8Array(0x6900) :
    new Uint8Array(0x64f8);

  const RANDOM_STATS = document.getElementById("scramble-stats").checked;

  const RANDOM_ABILITIES = document.getElementById("scramble-abilities")
    .checked;

  var TIDUS_NAME = document.getElementById("tidus-name").value;

  const FLEE = document.getElementById("enable-flee").checked;

  const STANDARDGRID =
    document.getElementById("grid-select").value === "Standard";

  var STATUS_MSG = document.getElementById("generator-status");
  const STATUS_CHECK = ' <span style="color:#6fda96">✔ </span><br />';

  STATUS_MSG.innerHTML = "Requesting template...";

  req.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      //STATUS_MSG.innerHTML += STATUS_CHECK;
      STATUS_MSG.innerHTML = "Parsing template...";

      for (var i = 0; i < SAVEFILE.length; i++) {
        SAVEFILE[i] = parseInt(this.responseText.substr(i * 2, 2), 16);
      }

      STATUS_MSG.innerHTML += STATUS_CHECK;

      //Reset playtime
      SAVEFILE[0x10] = 0x00;
      SAVEFILE[0x11] = 0x00;
      SAVEFILE[0xfc] = 0x00;
      SAVEFILE[0xfd] = 0x00;

      //Shuffle stats
      if (RANDOM_STATS && STANDARDGRID) {
        STATUS_MSG.innerHTML = "Shuffling stats...";
        var STATS = [];
        for (var i = 0; i < 11; i++) STATS.push(0x02); //STR+1
        for (var i = 0; i < 27; i++) STATS.push(0x03); //STR+2
        for (var i = 0; i < 05; i++) STATS.push(0x04); //STR+3
        for (var i = 0; i < 23; i++) STATS.push(0x05); //STR+4
        for (var i = 0; i < 01; i++) STATS.push(0x06); //DEF+1
        for (var i = 0; i < 22; i++) STATS.push(0x07); //DEF+2
        for (var i = 0; i < 19; i++) STATS.push(0x08); //DEF+3
        for (var i = 0; i < 12; i++) STATS.push(0x09); //DEF+4
        for (var i = 0; i < 02; i++) STATS.push(0x0a); //MAG+1
        for (var i = 0; i < 13; i++) STATS.push(0x0b); //MAG+2
        for (var i = 0; i < 14; i++) STATS.push(0x0c); //MAG+3
        for (var i = 0; i < 18; i++) STATS.push(0x0d); //MAG+4
        for (var i = 0; i < 06; i++) STATS.push(0x0e); //MDEF+1
        for (var i = 0; i < 18; i++) STATS.push(0x0f); //MDEF+2
        for (var i = 0; i < 06; i++) STATS.push(0x10); //MDEF+3
        for (var i = 0; i < 16; i++) STATS.push(0x11); //MDEF+4
        for (var i = 0; i < 05; i++) STATS.push(0x12); //AGIL+1
        for (var i = 0; i < 20; i++) STATS.push(0x13); //AGIL+2
        for (var i = 0; i < 15; i++) STATS.push(0x14); //AGIL+3
        for (var i = 0; i < 21; i++) STATS.push(0x15); //AGIL+4
        for (var i = 0; i < 04; i++) STATS.push(0x16); //LUCK+1
        for (var i = 0; i < 03; i++) STATS.push(0x17); //LUCK+2
        for (var i = 0; i < 02; i++) STATS.push(0x19); //LUCK+4
        for (var i = 0; i < 02; i++) STATS.push(0x1a); //EVA+1
        for (var i = 0; i < 17; i++) STATS.push(0x1b); //EVA+2
        for (var i = 0; i < 04; i++) STATS.push(0x1c); //EVA+3
        for (var i = 0; i < 19; i++) STATS.push(0x1d); //EVA+4
        for (var i = 0; i < 04; i++) STATS.push(0x1e); //ACC+1
        for (var i = 0; i < 13; i++) STATS.push(0x1f); //ACC+2
        for (var i = 0; i < 08; i++) STATS.push(0x20); //ACC+3
        for (var i = 0; i < 04; i++) STATS.push(0x21); //ACC+4
        for (var i = 0; i < 97; i++) STATS.push(0x22); //HP+200
        for (var i = 0; i < 07; i++) STATS.push(0x24); //MP+40
        for (var i = 0; i < 49; i++) STATS.push(0x25); //MP+20
        STATS = shuffle(STATS);
        STATS = shuffle(STATS);
        STATUS_MSG.innerHTML += STATUS_CHECK;
      } else if (RANDOM_STATS) {
        STATUS_MSG.innerHTML = "Shuffling stats...";
        var STATS = [];
        for (var i = 0; i < 11; i++) STATS.push(0x02); //STR+1
        for (var i = 0; i < 15; i++) STATS.push(0x03); //STR+2
        for (var i = 0; i < 09; i++) STATS.push(0x04); //STR+3
        for (var i = 0; i < 22; i++) STATS.push(0x05); //STR+4
        for (var i = 0; i < 04; i++) STATS.push(0x06); //DEF+1
        for (var i = 0; i < 18; i++) STATS.push(0x07); //DEF+2
        for (var i = 0; i < 17; i++) STATS.push(0x08); //DEF+3
        for (var i = 0; i < 10; i++) STATS.push(0x09); //DEF+4
        for (var i = 0; i < 04; i++) STATS.push(0x0a); //MAG+1
        for (var i = 0; i < 08; i++) STATS.push(0x0b); //MAG+2
        for (var i = 0; i < 12; i++) STATS.push(0x0c); //MAG+3
        for (var i = 0; i < 21; i++) STATS.push(0x0d); //MAG+4
        for (var i = 0; i < 08; i++) STATS.push(0x0e); //MDEF+1
        for (var i = 0; i < 10; i++) STATS.push(0x0f); //MDEF+2
        for (var i = 0; i < 07; i++) STATS.push(0x10); //MDEF+3
        for (var i = 0; i < 17; i++) STATS.push(0x11); //MDEF+4
        for (var i = 0; i < 04; i++) STATS.push(0x12); //AGIL+1
        for (var i = 0; i < 14; i++) STATS.push(0x13); //AGIL+2
        for (var i = 0; i < 14; i++) STATS.push(0x14); //AGIL+3
        for (var i = 0; i < 18; i++) STATS.push(0x15); //AGIL+4
        for (var i = 0; i < 03; i++) STATS.push(0x16); //LUCK+1
        for (var i = 0; i < 02; i++) STATS.push(0x17); //LUCK+2
        for (var i = 0; i < 01; i++) STATS.push(0x18); //LUCK+3
        for (var i = 0; i < 01; i++) STATS.push(0x19); //LUCK+4
        for (var i = 0; i < 04; i++) STATS.push(0x1a); //EVA+1
        for (var i = 0; i < 10; i++) STATS.push(0x1b); //EVA+2
        for (var i = 0; i < 04; i++) STATS.push(0x1c); //EVA+3
        for (var i = 0; i < 19; i++) STATS.push(0x1d); //EVA+4
        for (var i = 0; i < 04; i++) STATS.push(0x1e); //ACC+1
        for (var i = 0; i < 10; i++) STATS.push(0x1f); //ACC+2
        for (var i = 0; i < 09; i++) STATS.push(0x20); //ACC+3
        for (var i = 0; i < 04; i++) STATS.push(0x21); //ACC+4
        for (var i = 0; i < 81; i++) STATS.push(0x22); //HP+200
        for (var i = 0; i < 06; i++) STATS.push(0x24); //MP+40
        for (var i = 0; i < 39; i++) STATS.push(0x25); //MP+20
        for (var i = 0; i < 03; i++) STATS.push(0x26); //MP+10
        STATS = shuffle(STATS);
        STATS = shuffle(STATS);
        STATUS_MSG.innerHTML += STATUS_CHECK;
      }

      if (RANDOM_ABILITIES) {
        var ABILITIES = [];
        for (var i = 0x2a; i < 0x7f; i++) {
          ABILITIES.push(i);
        }
        STATUS_MSG.innerHTML = "Shuffling abilities...";
        ABILITIES = shuffle(ABILITIES);
        ABILITIES = shuffle(ABILITIES);
        STATUS_MSG.innerHTML += STATUS_CHECK;
      }

      //Switch out Stats & Abilities on Grid
      var c_stats = 0;
      var c_abilities = 0;

      if (RANDOM_STATS || RANDOM_ABILITIES) {
        for (var i = 0x222c; i < 0x28de; i += 2) {
          if (RANDOM_STATS && SAVEFILE[i] > 1 && SAVEFILE[i] < 39) {
            SAVEFILE[i] = STATS.pop();
            c_stats++;
          } else if (
            RANDOM_ABILITIES &&
            SAVEFILE[i] > 41 &&
            SAVEFILE[i] < 127
          ) {
            SAVEFILE[i] = ABILITIES.pop();
            c_abilities++;
          }
        }
      }

      STATUS_MSG.innerHTML += `Replaced ${c_stats} Stats and ${c_abilities} Abilities...`;
      STATUS_MSG.innerHTML += STATUS_CHECK;

      //Rename Tidus
      if (TIDUS_NAME !== "Tidus") {
        STATUS_MSG.innerHTML = " Renaming Tidus...";

        var INVALID_NAME = false;

        TIDUS_NAME = TIDUS_NAME.replace(
          "/[^A-Z0-9 \"!\\;#$%&'()*+,-./:;<=?[\\;]^_{|}~·【】♪♥“”‒↑↓←→«°»¿ÀÁÂÄÇÈÉÊËÌÍÎÏÑÒÓÔÖÙÚÛÜÜβàáâäçèéêëìíîïñòóôöùúûü,ƒ„…™§©®±²³¼½¾×÷★☆∞]/gi",
          ""
        );

        if (TIDUS_NAME === "") {
          INVALID_NAME = true;
        } else {
          var i = 0;

          for (; i < TIDUS_NAME.length && i < 18; i++) {
            var c = TIDUS_NAME.charAt(i);
            var k;
            switch (c) {
              case " ":
                k = 0x3a;
                break;
              case "!":
                k = 0x3b;
                break;
              case '"':
                k = 0x3c;
                break;
              case "#":
                k = 0x3d;
                break;
              case "$":
                k = 0x3e;
                break;
              case "%":
                k = 0x3f;
                break;
              case "&":
                k = 0x40;
                break;
              case "'":
                k = 0x41;
                break;
              case "(":
                k = 0x42;
                break;
              case ")":
                k = 0x43;
                break;
              case "*":
                k = 0x44;
                break;
              case "+":
                k = 0x45;
                break;
              case ",":
                k = 0x46;
                break;
              case "-":
                k = 0x47;
                break;
              case ".":
                k = 0x48;
                break;
              case "/":
                k = 0x49;
                break;
              case ":":
                k = 0x4a;
                break;
              case ";":
                k = 0x4b;
                break;
              case "<":
                k = 0x4c;
                break;
              case "=":
                k = 0x4d;
                break;
              case "?":
                k = 0x4f;
                break;
              case "[":
                k = 0x6a;
                break;
              case "\\":
                k = 0x6b;
                break;
              case "]":
                k = 0x6c;
                break;
              case "^":
                k = 0x6d;
                break;
              case "_":
                k = 0x6e;
                break;
              case "{":
                k = 0x8a;
                break;
              case "|":
                k = 0x8b;
                break;
              case "}":
                k = 0x8c;
                break;
              case "~":
                k = 0x8d;
                break;
              case "·":
                k = 0x8e;
                break;
              case "【":
                k = 0x8f;
                break;
              case "】":
                k = 0x90;
                break;
              case "♪":
                k = 0x91;
                break;
              case "♥":
                k = 0x92;
                break;
              case "“":
                k = 0x94;
                break;
              case "”":
                k = 0x95;
                break;
              case "‒":
                k = 0x96;
                break;
              case "↑":
                k = 0x99;
                break;
              case "↓":
                k = 0x9a;
                break;
              case "←":
                k = 0x9b;
                break;
              case "→":
                k = 0x9c;
                break;
              case "«":
                k = 0x9e;
                break;
              case "°":
                k = 0x9f;
                break;
              case "»":
                k = 0xa1;
                break;
              case "¿":
                k = 0xa2;
                break;
              case "À":
                k = 0xa3;
                break;
              case "Á":
                k = 0xa4;
                break;
              case "Â":
                k = 0xa5;
                break;
              case "Ä":
                k = 0xa6;
                break;
              case "Ç":
                k = 0xa7;
                break;
              case "È":
                k = 0xa8;
                break;
              case "É":
                k = 0xa9;
                break;
              case "Ê":
                k = 0xaa;
                break;
              case "Ë":
                k = 0xab;
                break;
              case "Ì":
                k = 0xac;
                break;
              case "Í":
                k = 0xad;
                break;
              case "Î":
                k = 0xae;
                break;
              case "Ï":
                k = 0xaf;
                break;
              case "Ñ":
                k = 0xb0;
                break;
              case "Ò":
                k = 0xb1;
                break;
              case "Ó":
                k = 0xb2;
                break;
              case "Ô":
                k = 0xb3;
                break;
              case "Ö":
                k = 0xb4;
                break;
              case "Ù":
                k = 0xb5;
                break;
              case "Ú":
                k = 0xb6;
                break;
              case "Û":
                k = 0xb7;
                break;
              case "Ü":
                k = 0xb8;
                break;
              case "Ü":
                k = 0xb8;
                break;
              case "β":
                k = 0xb9;
                break;
              case "à":
                k = 0xba;
                break;
              case "á":
                k = 0xbb;
                break;
              case "â":
                k = 0xbc;
                break;
              case "ä":
                k = 0xbd;
                break;
              case "ç":
                k = 0xbe;
                break;
              case "è":
                k = 0xbf;
                break;
              case "é":
                k = 0xc0;
                break;
              case "ê":
                k = 0xc1;
                break;
              case "ë":
                k = 0xc2;
                break;
              case "ì":
                k = 0xc3;
                break;
              case "í":
                k = 0xc4;
                break;
              case "î":
                k = 0xc5;
                break;
              case "ï":
                k = 0xc6;
                break;
              case "ñ":
                k = 0xc7;
                break;
              case "ò":
                k = 0xc8;
                break;
              case "ó":
                k = 0xc9;
                break;
              case "ô":
                k = 0xca;
                break;
              case "ö":
                k = 0xcb;
                break;
              case "ù":
                k = 0xcc;
                break;
              case "ú":
                k = 0xcd;
                break;
              case "û":
                k = 0xce;
                break;
              case "ü":
                k = 0xcf;
                break;
              case ",":
                k = 0xd0;
                break;
              case "ƒ":
                k = 0xd1;
                break;
              case "„":
                k = 0xd2;
                break;
              case "…":
                k = 0xd3;
                break;
              case "™":
                k = 0xd9;
                break;
              case "§":
                k = 0xdc;
                break;
              case "©":
                k = 0xdd;
                break;
              case "®":
                k = 0xdf;
                break;
              case "±":
                k = 0xe0;
                break;
              case "²":
                k = 0xe1;
                break;
              case "³":
                k = 0xe2;
                break;
              case "¼":
                k = 0xe3;
                break;
              case "½":
                k = 0xe4;
                break;
              case "¾":
                k = 0xe5;
                break;
              case "×":
                k = 0xe6;
                break;
              case "÷":
                k = 0xe7;
                break;
              case "★":
                k = 0xec;
                break;
              case "☆":
                k = 0xed;
                break;
              case "∞":
                k = 0xef;
                break;
              default:
                k = TIDUS_NAME.charCodeAt(i) + 15;
                break;
            }

            SAVEFILE[0x638c + i] = k;
          }

          SAVEFILE[0x638c + i] = 0;
          SAVEFILE[0x639f] = 0;
        }
        STATUS_MSG.innerHTML += STATUS_CHECK;
        if (INVALID_NAME)
          STATUS_MSG.innerHTML = 'Warning: Invalid name, reset to "Tidus"';
      }

      if (FLEE) {
        STATUS_MSG.innerHTML = "Enabling Flee...";
        SAVEFILE[0x564d] = 1;
        STATUS_MSG.innerHTML += STATUS_CHECK;
      }

      if (document.getElementById("version-select").value === "PC") {
        STATUS_MSG.innerHTML = "Switching soundtrack...";
        SAVEFILE[0x62c] =
          document.getElementById("ost-select").value === "Original" ? 1 : 0;
        STATUS_MSG.innerHTML += STATUS_CHECK;
      }

      //Fix checksum https://forums.pcsx2.net/Thread-Celsius-FFX-2-Save-game-editor?pid=182634#pid182634
      STATUS_MSG.innerHTML = " Repairing checksum...";
      var CRC_Mask = [
        0x0000,
        0x1021,
        0x2042,
        0x3063,
        0x4084,
        0x50a5,
        0x60c6,
        0x70e7,
        0x8108,
        0x9129,
        0xa14a,
        0xb16b,
        0xc18c,
        0xd1ad,
        0xe1ce,
        0xf1ef,
        0x1231,
        0x0210,
        0x3273,
        0x2252,
        0x52b5,
        0x4294,
        0x72f7,
        0x62d6,
        0x9339,
        0x8318,
        0xb37b,
        0xa35a,
        0xd3bd,
        0xc39c,
        0xf3ff,
        0xe3de,
        0x2462,
        0x3443,
        0x0420,
        0x1401,
        0x64e6,
        0x74c7,
        0x44a4,
        0x5485,
        0xa56a,
        0xb54b,
        0x8528,
        0x9509,
        0xe5ee,
        0xf5cf,
        0xc5ac,
        0xd58d,
        0x3653,
        0x2672,
        0x1611,
        0x0630,
        0x76d7,
        0x66f6,
        0x5695,
        0x46b4,
        0xb75b,
        0xa77a,
        0x9719,
        0x8738,
        0xf7df,
        0xe7fe,
        0xd79d,
        0xc7bc,
        0x48c4,
        0x58e5,
        0x6886,
        0x78a7,
        0x0840,
        0x1861,
        0x2802,
        0x3823,
        0xc9cc,
        0xd9ed,
        0xe98e,
        0xf9af,
        0x8948,
        0x9969,
        0xa90a,
        0xb92b,
        0x5af5,
        0x4ad4,
        0x7ab7,
        0x6a96,
        0x1a71,
        0x0a50,
        0x3a33,
        0x2a12,
        0xdbfd,
        0xcbdc,
        0xfbbf,
        0xeb9e,
        0x9b79,
        0x8b58,
        0xbb3b,
        0xab1a,
        0x6ca6,
        0x7c87,
        0x4ce4,
        0x5cc5,
        0x2c22,
        0x3c03,
        0x0c60,
        0x1c41,
        0xedae,
        0xfd8f,
        0xcdec,
        0xddcd,
        0xad2a,
        0xbd0b,
        0x8d68,
        0x9d49,
        0x7e97,
        0x6eb6,
        0x5ed5,
        0x4ef4,
        0x3e13,
        0x2e32,
        0x1e51,
        0x0e70,
        0xff9f,
        0xefbe,
        0xdfdd,
        0xcffc,
        0xbf1b,
        0xaf3a,
        0x9f59,
        0x8f78,
        0x9188,
        0x81a9,
        0xb1ca,
        0xa1eb,
        0xd10c,
        0xc12d,
        0xf14e,
        0xe16f,
        0x1080,
        0x00a1,
        0x30c2,
        0x20e3,
        0x5004,
        0x4025,
        0x7046,
        0x6067,
        0x83b9,
        0x9398,
        0xa3fb,
        0xb3da,
        0xc33d,
        0xd31c,
        0xe37f,
        0xf35e,
        0x02b1,
        0x1290,
        0x22f3,
        0x32d2,
        0x4235,
        0x5214,
        0x6277,
        0x7256,
        0xb5ea,
        0xa5cb,
        0x95a8,
        0x8589,
        0xf56e,
        0xe54f,
        0xd52c,
        0xc50d,
        0x34e2,
        0x24c3,
        0x14a0,
        0x0481,
        0x7466,
        0x6447,
        0x5424,
        0x4405,
        0xa7db,
        0xb7fa,
        0x8799,
        0x97b8,
        0xe75f,
        0xf77e,
        0xc71d,
        0xd73c,
        0x26d3,
        0x36f2,
        0x0691,
        0x16b0,
        0x6657,
        0x7676,
        0x4615,
        0x5634,
        0xd94c,
        0xc96d,
        0xf90e,
        0xe92f,
        0x99c8,
        0x89e9,
        0xb98a,
        0xa9ab,
        0x5844,
        0x4865,
        0x7806,
        0x6827,
        0x18c0,
        0x08e1,
        0x3882,
        0x28a3,
        0xcb7d,
        0xdb5c,
        0xeb3f,
        0xfb1e,
        0x8bf9,
        0x9bd8,
        0xabbb,
        0xbb9a,
        0x4a75,
        0x5a54,
        0x6a37,
        0x7a16,
        0x0af1,
        0x1ad0,
        0x2ab3,
        0x3a92,
        0xfd2e,
        0xed0f,
        0xdd6c,
        0xcd4d,
        0xbdaa,
        0xad8b,
        0x9de8,
        0x8dc9,
        0x7c26,
        0x6c07,
        0x5c64,
        0x4c45,
        0x3ca2,
        0x2c83,
        0x1ce0,
        0x0cc1,
        0xef1f,
        0xff3e,
        0xcf5d,
        0xdf7c,
        0xaf9b,
        0xbfba,
        0x8fd9,
        0x9ff8,
        0x6e17,
        0x7e36,
        0x4e55,
        0x5e74,
        0x2e93,
        0x3eb2,
        0x0ed1,
        0x0000
      ];
      var CRC_Hash = 0;
      var CRC_Seed = 0xffff;
      var CRC_Size = 0x64f8;
      var CRC_T = 0x001a;
      var CRC_B = 0x64f4;
      SAVEFILE[CRC_T] = 0;
      SAVEFILE[CRC_T + 1] = 0;
      SAVEFILE[CRC_B] = 0;
      SAVEFILE[CRC_B + 1] = 0;
      CRC_Hash ^= CRC_Seed;

      for (var i = 0x40; i < CRC_Size; i++) {
        CRC_Hash =
          (CRC_Mask[(SAVEFILE[i] ^ (CRC_Hash >>> 8)) & 0xff] ^
            (CRC_Hash << 8)) &
          0xffff;
      }

      CRC_Hash ^= CRC_Seed;
      SAVEFILE[CRC_T + 1] = (CRC_Hash >>> 8) & 0xff;
      SAVEFILE[CRC_B + 1] = (CRC_Hash >>> 8) & 0xff;
      SAVEFILE[CRC_T] = CRC_Hash & 0xff;
      SAVEFILE[CRC_B] = CRC_Hash & 0xff;

      //Signature
      var VER_MAJ = 0;
      var VER_MIN = 15;

      var SIGNATURE = [
        0x69,
        0x78,
        0x7d,
        0x83,
        0x48,
        0x72,
        0x77,
        0x3a,
        0x61,
        0x70,
        0x7d,
        0x73,
        0x7e,
        0x7c,
        0x78,
        0x89,
        0x74,
        0x81,
        0x3a,
        0x85
      ];
      if (VER_MAJ > 9) {
        SIGNATURE.push(Math.floor(VER_MAJ / 10) + 0x30);
      }
      SIGNATURE.push((VER_MAJ % 10) + 0x30);
      SIGNATURE.push(0x48);
      if (VER_MIN > 9) {
        SIGNATURE.push(Math.floor(VER_MIN / 10) + 0x30);
      }
      SIGNATURE.push((VER_MIN % 10) + 0x30);
      SIGNATURE.push(0x00);

      for (var i = 0; i < SIGNATURE.length; i++) {
        SAVEFILE[0x20 + i] = SIGNATURE[i];
      }

      if (document.getElementById("version-select").value === "Switch") {
        applySwitchPatch(SAVEFILE);
      }

      STATUS_MSG.innerHTML += STATUS_CHECK;
      STATUS_MSG.innerHTML = "Preparing download...";

      var filename = "ffx_001";
      var file = new Blob([SAVEFILE], {
        type: "application/octet-stream"
      });

      if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
      else {
        var a = document.createElement("a");
        var url = window.URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        a.click();
        STATUS_MSG.innerHTML += STATUS_CHECK;
        setTimeout(function () {
          window.URL.revokeObjectURL(url);
        }, 500);
      }
    }
  };

  req.open("GET", HANDLE, false);
  req.send();
}


function applySwitchPatch(data) {
  let timestamp = Math.floor((new Date()).getTime() / 1000);

  for (let i = data.length - 1; i > 7; i--) {
    data[i] = data[i - 8];
  }

  for (let i = 0; i < 4; i++) {
    data[i] = (timestamp >>> (i * 8)) & 0xFF;
    data[i + 4] = 0;
  }

  return data;
}

//Shuffle Array https://github.com/Daplie/knuth-shuffle/blob/master/index.js
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}