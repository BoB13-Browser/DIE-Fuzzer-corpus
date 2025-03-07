// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function t(re, s) {
  re.test(s);
}

function f(re, s) {
  re.test(s);
}

t(/\p{Script_Extensions=Bopo}+/u, "\u300A");
t(/\p{Script_Extensions=Hang}+/u, "\u300A");
t(/\p{Script_Extensions=Hani}+/u, "\u300A");
t(/\p{Script_Extensions=Hira}+/u, "\u300A");
t(/\p{Script_Extensions=Kana}+/u, "\u300A");
t(/\p{Script_Extensions=Yiii}+/u, "\u300A");
t(/\p{scx=Bopomofo}+/u, "\u3003");
t(/\p{scx=Hangul}+/u, "\u3003");
t(/\p{scx=Han}+/u, "\u3003");
t(/\p{scx=Hiragana}+/u, "\u3003");
t(/\p{scx=Katakana}+/u, "\u3003");
f(/\p{scx=Yi}+/u, "\u3003");
t(/\p{Script_Extensions=Cypriot}+/u, "\u{10107}");
f(/\p{Script=Cypriot}+/u, "\u{10107}");
f(/\p{scx=Cprt}+/u, "\u3003");
/* Auto-generated from Unicode data file using following script
let data = read("ScriptExtensions.txt");
let map = new Map();
for (let line of data.split("\n")) {
  let match = /^(\p{Hex}{4,6})(..(\p{Hex}{4,6}))?\s+; ([\w\s]+) /u.exec(line);
  if (!match) continue;
  let [,start,,end,scripts] = match;
  if (!end) end = start;
  start = parseInt(start, 16);
  end = parseInt(end, 16);
  for (let script of scripts.split(" ")) {
    let codepoints = map.get(script) || new Set();
    for (let c = start; c <= end; c++) codepoints.add(c);
    map.set(script, codepoints);
  }
}

for (let s of map.keys()){
  let codepoints = map.get(s);
  print(`// Script_Extension=${s}`);
  for (let i = 0; i < 5;) {
    let c = (Math.random() * 0x110000) | 0;
    if (codepoints.has(c)) continue;
    print(`f(/(?=\\P{sc=${s}})\\p{scx=${s}}/u, "\\u{${c.toString(16)}}");`);
    i++;
  }
}
*/
// Unicode version 11.0.0
// https://unicode.org/Public/10.0.0/ucd/ScriptExtensions.txt
// Script_Extension=Beng

f(/(?=\P{sc=Beng})\p{scx=Beng}/u, "\u{e52ee}");
f(/(?=\P{sc=Beng})\p{scx=Beng}/u, "\u{78b48}");
f(/(?=\P{sc=Beng})\p{scx=Beng}/u, "\u{59987}");
f(/(?=\P{sc=Beng})\p{scx=Beng}/u, "\u{d18a8}");
f(/(?=\P{sc=Beng})\p{scx=Beng}/u, "\u{2b84e}"); // Script_Extension=Deva

f(/(?=\P{sc=Deva})\p{scx=Deva}/u, "\u{757f8}");
f(/(?=\P{sc=Deva})\p{scx=Deva}/u, "\u{2cb44}");
f(/(?=\P{sc=Deva})\p{scx=Deva}/u, "\u{7624d}");
f(/(?=\P{sc=Deva})\p{scx=Deva}/u, "\u{9a219}");
f(/(?=\P{sc=Deva})\p{scx=Deva}/u, "\u{e41a8}"); // Script_Extension=Dupl

f(/(?=\P{sc=Dupl})\p{scx=Dupl}/u, "\u{4ae62}");
f(/(?=\P{sc=Dupl})\p{scx=Dupl}/u, "\u{b80a}");
f(/(?=\P{sc=Dupl})\p{scx=Dupl}/u, "\u{c856c}");
f(/(?=\P{sc=Dupl})\p{scx=Dupl}/u, "\u{36c5f}");
f(/(?=\P{sc=Dupl})\p{scx=Dupl}/u, "\u{42ef3}"); // Script_Extension=Grek

f(/(?=\P{sc=Grek})\p{scx=Grek}/u, "\u{85c59}");
f(/(?=\P{sc=Grek})\p{scx=Grek}/u, "\u{bd40}");
f(/(?=\P{sc=Grek})\p{scx=Grek}/u, "\u{7ffef}");
f(/(?=\P{sc=Grek})\p{scx=Grek}/u, "\u{b4a21}");
f(/(?=\P{sc=Grek})\p{scx=Grek}/u, "\u{b97b3}"); // Script_Extension=Hani

f(/(?=\P{sc=Hani})\p{scx=Hani}/u, "\u{d59d4}");
f(/(?=\P{sc=Hani})\p{scx=Hani}/u, "\u{8da54}");
f(/(?=\P{sc=Hani})\p{scx=Hani}/u, "\u{77a36}");
f(/(?=\P{sc=Hani})\p{scx=Hani}/u, "\u{8d66b}");
f(/(?=\P{sc=Hani})\p{scx=Hani}/u, "\u{b2371}"); // Script_Extension=Latn

f(/(?=\P{sc=Latn})\p{scx=Latn}/u, "\u{10d47b}");
f(/(?=\P{sc=Latn})\p{scx=Latn}/u, "\u{7a184}");
f(/(?=\P{sc=Latn})\p{scx=Latn}/u, "\u{a64ac}");
f(/(?=\P{sc=Latn})\p{scx=Latn}/u, "\u{ea450}");
f(/(?=\P{sc=Latn})\p{scx=Latn}/u, "\u{ab23e}"); // Script_Extension=Arab

f(/(?=\P{sc=Arab})\p{scx=Arab}/u, "\u{43609}");
f(/(?=\P{sc=Arab})\p{scx=Arab}/u, "\u{bea28}");
f(/(?=\P{sc=Arab})\p{scx=Arab}/u, "\u{f9ef}");
f(/(?=\P{sc=Arab})\p{scx=Arab}/u, "\u{7b3fc}");
f(/(?=\P{sc=Arab})\p{scx=Arab}/u, "\u{3a64a}"); // Script_Extension=Copt

f(/(?=\P{sc=Copt})\p{scx=Copt}/u, "\u{a7927}");
f(/(?=\P{sc=Copt})\p{scx=Copt}/u, "\u{e11a5}");
f(/(?=\P{sc=Copt})\p{scx=Copt}/u, "\u{a7afe}");
f(/(?=\P{sc=Copt})\p{scx=Copt}/u, "\u{68bd4}");
f(/(?=\P{sc=Copt})\p{scx=Copt}/u, "\u{4c963}"); // Script_Extension=Rohg

f(/(?=\P{sc=Rohg})\p{scx=Rohg}/u, "\u{cd74e}");
f(/(?=\P{sc=Rohg})\p{scx=Rohg}/u, "\u{c4e3c}");
f(/(?=\P{sc=Rohg})\p{scx=Rohg}/u, "\u{1f2de}");
f(/(?=\P{sc=Rohg})\p{scx=Rohg}/u, "\u{999ca}");
f(/(?=\P{sc=Rohg})\p{scx=Rohg}/u, "\u{f25d9}"); // Script_Extension=Syrc

f(/(?=\P{sc=Syrc})\p{scx=Syrc}/u, "\u{dd913}");
f(/(?=\P{sc=Syrc})\p{scx=Syrc}/u, "\u{81cdc}");
f(/(?=\P{sc=Syrc})\p{scx=Syrc}/u, "\u{32fb2}");
f(/(?=\P{sc=Syrc})\p{scx=Syrc}/u, "\u{cc6ec}");
f(/(?=\P{sc=Syrc})\p{scx=Syrc}/u, "\u{adba2}"); // Script_Extension=Thaa

f(/(?=\P{sc=Thaa})\p{scx=Thaa}/u, "\u{782b1}");
f(/(?=\P{sc=Thaa})\p{scx=Thaa}/u, "\u{ca567}");
f(/(?=\P{sc=Thaa})\p{scx=Thaa}/u, "\u{c1506}");
f(/(?=\P{sc=Thaa})\p{scx=Thaa}/u, "\u{e783}");
f(/(?=\P{sc=Thaa})\p{scx=Thaa}/u, "\u{fc8e1}"); // Script_Extension=Armn

f(/(?=\P{sc=Armn})\p{scx=Armn}/u, "\u{36a6d}");
f(/(?=\P{sc=Armn})\p{scx=Armn}/u, "\u{6c98}");
f(/(?=\P{sc=Armn})\p{scx=Armn}/u, "\u{c4326}");
f(/(?=\P{sc=Armn})\p{scx=Armn}/u, "\u{25eb6}");
f(/(?=\P{sc=Armn})\p{scx=Armn}/u, "\u{db9d9}"); // Script_Extension=Geor

f(/(?=\P{sc=Geor})\p{scx=Geor}/u, "\u{e48f5}");
f(/(?=\P{sc=Geor})\p{scx=Geor}/u, "\u{9914e}");
f(/(?=\P{sc=Geor})\p{scx=Geor}/u, "\u{49dad}");
f(/(?=\P{sc=Geor})\p{scx=Geor}/u, "\u{9d193}");
f(/(?=\P{sc=Geor})\p{scx=Geor}/u, "\u{10ce35}"); // Script_Extension=Bopo

f(/(?=\P{sc=Bopo})\p{scx=Bopo}/u, "\u{36ac1}");
f(/(?=\P{sc=Bopo})\p{scx=Bopo}/u, "\u{73ae5}");
f(/(?=\P{sc=Bopo})\p{scx=Bopo}/u, "\u{cd0a}");
f(/(?=\P{sc=Bopo})\p{scx=Bopo}/u, "\u{bd8bd}");
f(/(?=\P{sc=Bopo})\p{scx=Bopo}/u, "\u{eb174}"); // Script_Extension=Bugi

f(/(?=\P{sc=Bugi})\p{scx=Bugi}/u, "\u{7dcfc}");
f(/(?=\P{sc=Bugi})\p{scx=Bugi}/u, "\u{b17d1}");
f(/(?=\P{sc=Bugi})\p{scx=Bugi}/u, "\u{15cb5}");
f(/(?=\P{sc=Bugi})\p{scx=Bugi}/u, "\u{10d4f6}");
f(/(?=\P{sc=Bugi})\p{scx=Bugi}/u, "\u{12bbe}"); // Script_Extension=Java

f(/(?=\P{sc=Java})\p{scx=Java}/u, "\u{10f6f3}");
f(/(?=\P{sc=Java})\p{scx=Java}/u, "\u{75579}");
f(/(?=\P{sc=Java})\p{scx=Java}/u, "\u{b39e4}");
f(/(?=\P{sc=Java})\p{scx=Java}/u, "\u{104b64}");
f(/(?=\P{sc=Java})\p{scx=Java}/u, "\u{102995}"); // Script_Extension=Cprt

f(/(?=\P{sc=Cprt})\p{scx=Cprt}/u, "\u{46b94}");
f(/(?=\P{sc=Cprt})\p{scx=Cprt}/u, "\u{3eaa1}");
f(/(?=\P{sc=Cprt})\p{scx=Cprt}/u, "\u{3dd9a}");
f(/(?=\P{sc=Cprt})\p{scx=Cprt}/u, "\u{c3e90}");
f(/(?=\P{sc=Cprt})\p{scx=Cprt}/u, "\u{75301}"); // Script_Extension=Linb

f(/(?=\P{sc=Linb})\p{scx=Linb}/u, "\u{b0cc}");
f(/(?=\P{sc=Linb})\p{scx=Linb}/u, "\u{2759a}");
f(/(?=\P{sc=Linb})\p{scx=Linb}/u, "\u{a6482}");
f(/(?=\P{sc=Linb})\p{scx=Linb}/u, "\u{11c84}");
f(/(?=\P{sc=Linb})\p{scx=Linb}/u, "\u{a3931}"); // Script_Extension=Cyrl

f(/(?=\P{sc=Cyrl})\p{scx=Cyrl}/u, "\u{2d4a3}");
f(/(?=\P{sc=Cyrl})\p{scx=Cyrl}/u, "\u{394c9}");
f(/(?=\P{sc=Cyrl})\p{scx=Cyrl}/u, "\u{aa2e7}");
f(/(?=\P{sc=Cyrl})\p{scx=Cyrl}/u, "\u{823e3}");
f(/(?=\P{sc=Cyrl})\p{scx=Cyrl}/u, "\u{f753e}"); // Script_Extension=Glag

f(/(?=\P{sc=Glag})\p{scx=Glag}/u, "\u{f060c}");
f(/(?=\P{sc=Glag})\p{scx=Glag}/u, "\u{f4430}");
f(/(?=\P{sc=Glag})\p{scx=Glag}/u, "\u{89208}");
f(/(?=\P{sc=Glag})\p{scx=Glag}/u, "\u{3b2fa}");
f(/(?=\P{sc=Glag})\p{scx=Glag}/u, "\u{5a463}"); // Script_Extension=Perm

f(/(?=\P{sc=Perm})\p{scx=Perm}/u, "\u{f4f29}");
f(/(?=\P{sc=Perm})\p{scx=Perm}/u, "\u{154a1}");
f(/(?=\P{sc=Perm})\p{scx=Perm}/u, "\u{8d2e1}");
f(/(?=\P{sc=Perm})\p{scx=Perm}/u, "\u{6ddec}");
f(/(?=\P{sc=Perm})\p{scx=Perm}/u, "\u{2859e}"); // Script_Extension=Gran

f(/(?=\P{sc=Gran})\p{scx=Gran}/u, "\u{dcc3b}");
f(/(?=\P{sc=Gran})\p{scx=Gran}/u, "\u{240a1}");
f(/(?=\P{sc=Gran})\p{scx=Gran}/u, "\u{d94fd}");
f(/(?=\P{sc=Gran})\p{scx=Gran}/u, "\u{3e537}");
f(/(?=\P{sc=Gran})\p{scx=Gran}/u, "\u{ddf65}"); // Script_Extension=Shrd

f(/(?=\P{sc=Shrd})\p{scx=Shrd}/u, "\u{c17cc}");
f(/(?=\P{sc=Shrd})\p{scx=Shrd}/u, "\u{2d717}");
f(/(?=\P{sc=Shrd})\p{scx=Shrd}/u, "\u{93c84}");
f(/(?=\P{sc=Shrd})\p{scx=Shrd}/u, "\u{e4d57}");
f(/(?=\P{sc=Shrd})\p{scx=Shrd}/u, "\u{4449a}"); // Script_Extension=Taml

f(/(?=\P{sc=Taml})\p{scx=Taml}/u, "\u{fb7ab}");
f(/(?=\P{sc=Taml})\p{scx=Taml}/u, "\u{d687c}");
f(/(?=\P{sc=Taml})\p{scx=Taml}/u, "\u{b6aea}");
f(/(?=\P{sc=Taml})\p{scx=Taml}/u, "\u{e42bc}");
f(/(?=\P{sc=Taml})\p{scx=Taml}/u, "\u{77534}"); // Script_Extension=Gujr

f(/(?=\P{sc=Gujr})\p{scx=Gujr}/u, "\u{4b35c}");
f(/(?=\P{sc=Gujr})\p{scx=Gujr}/u, "\u{889e5}");
f(/(?=\P{sc=Gujr})\p{scx=Gujr}/u, "\u{107d78}");
f(/(?=\P{sc=Gujr})\p{scx=Gujr}/u, "\u{c68d8}");
f(/(?=\P{sc=Gujr})\p{scx=Gujr}/u, "\u{a5b0a}"); // Script_Extension=Khoj

f(/(?=\P{sc=Khoj})\p{scx=Khoj}/u, "\u{2da77}");
f(/(?=\P{sc=Khoj})\p{scx=Khoj}/u, "\u{9fb5}");
f(/(?=\P{sc=Khoj})\p{scx=Khoj}/u, "\u{a0268}");
f(/(?=\P{sc=Khoj})\p{scx=Khoj}/u, "\u{10d835}");
f(/(?=\P{sc=Khoj})\p{scx=Khoj}/u, "\u{49e92}"); // Script_Extension=Guru

f(/(?=\P{sc=Guru})\p{scx=Guru}/u, "\u{54186}");
f(/(?=\P{sc=Guru})\p{scx=Guru}/u, "\u{a2fff}");
f(/(?=\P{sc=Guru})\p{scx=Guru}/u, "\u{e25c3}");
f(/(?=\P{sc=Guru})\p{scx=Guru}/u, "\u{10496}");
f(/(?=\P{sc=Guru})\p{scx=Guru}/u, "\u{10ad15}"); // Script_Extension=Mult

f(/(?=\P{sc=Mult})\p{scx=Mult}/u, "\u{2794e}");
f(/(?=\P{sc=Mult})\p{scx=Mult}/u, "\u{2f6b4}");
f(/(?=\P{sc=Mult})\p{scx=Mult}/u, "\u{d50f2}");
f(/(?=\P{sc=Mult})\p{scx=Mult}/u, "\u{62dac}");
f(/(?=\P{sc=Mult})\p{scx=Mult}/u, "\u{ad0b2}"); // Script_Extension=Hira

f(/(?=\P{sc=Hira})\p{scx=Hira}/u, "\u{be070}");
f(/(?=\P{sc=Hira})\p{scx=Hira}/u, "\u{d2d48}");
f(/(?=\P{sc=Hira})\p{scx=Hira}/u, "\u{ec3a2}");
f(/(?=\P{sc=Hira})\p{scx=Hira}/u, "\u{b2f9d}");
f(/(?=\P{sc=Hira})\p{scx=Hira}/u, "\u{4b539}"); // Script_Extension=Kana

f(/(?=\P{sc=Kana})\p{scx=Kana}/u, "\u{545d5}");
f(/(?=\P{sc=Kana})\p{scx=Kana}/u, "\u{23e9d}");
f(/(?=\P{sc=Kana})\p{scx=Kana}/u, "\u{104ba8}");
f(/(?=\P{sc=Kana})\p{scx=Kana}/u, "\u{dc9d5}");
f(/(?=\P{sc=Kana})\p{scx=Kana}/u, "\u{8229c}"); // Script_Extension=Mong

f(/(?=\P{sc=Mong})\p{scx=Mong}/u, "\u{3b0ad}");
f(/(?=\P{sc=Mong})\p{scx=Mong}/u, "\u{d9402}");
f(/(?=\P{sc=Mong})\p{scx=Mong}/u, "\u{8f4ae}");
f(/(?=\P{sc=Mong})\p{scx=Mong}/u, "\u{18b7d}");
f(/(?=\P{sc=Mong})\p{scx=Mong}/u, "\u{e0393}"); // Script_Extension=Phag

f(/(?=\P{sc=Phag})\p{scx=Phag}/u, "\u{3eb13}");
f(/(?=\P{sc=Phag})\p{scx=Phag}/u, "\u{273e7}");
f(/(?=\P{sc=Phag})\p{scx=Phag}/u, "\u{d7ad4}");
f(/(?=\P{sc=Phag})\p{scx=Phag}/u, "\u{80daf}");
f(/(?=\P{sc=Phag})\p{scx=Phag}/u, "\u{bd1ad}"); // Script_Extension=Cakm

f(/(?=\P{sc=Cakm})\p{scx=Cakm}/u, "\u{19eeb}");
f(/(?=\P{sc=Cakm})\p{scx=Cakm}/u, "\u{19dab}");
f(/(?=\P{sc=Cakm})\p{scx=Cakm}/u, "\u{f3a42}");
f(/(?=\P{sc=Cakm})\p{scx=Cakm}/u, "\u{455c7}");
f(/(?=\P{sc=Cakm})\p{scx=Cakm}/u, "\u{baa96}"); // Script_Extension=Sylo

f(/(?=\P{sc=Sylo})\p{scx=Sylo}/u, "\u{54d3}");
f(/(?=\P{sc=Sylo})\p{scx=Sylo}/u, "\u{283e9}");
f(/(?=\P{sc=Sylo})\p{scx=Sylo}/u, "\u{edab9}");
f(/(?=\P{sc=Sylo})\p{scx=Sylo}/u, "\u{e135d}");
f(/(?=\P{sc=Sylo})\p{scx=Sylo}/u, "\u{31bc2}"); // Script_Extension=Mymr

f(/(?=\P{sc=Mymr})\p{scx=Mymr}/u, "\u{9d605}");
f(/(?=\P{sc=Mymr})\p{scx=Mymr}/u, "\u{109cae}");
f(/(?=\P{sc=Mymr})\p{scx=Mymr}/u, "\u{cc2dd}");
f(/(?=\P{sc=Mymr})\p{scx=Mymr}/u, "\u{d1757}");
f(/(?=\P{sc=Mymr})\p{scx=Mymr}/u, "\u{baaff}"); // Script_Extension=Tale

f(/(?=\P{sc=Tale})\p{scx=Tale}/u, "\u{81845}");
f(/(?=\P{sc=Tale})\p{scx=Tale}/u, "\u{fe9d6}");
f(/(?=\P{sc=Tale})\p{scx=Tale}/u, "\u{8c1a0}");
f(/(?=\P{sc=Tale})\p{scx=Tale}/u, "\u{f1a55}");
f(/(?=\P{sc=Tale})\p{scx=Tale}/u, "\u{a8f6}"); // Script_Extension=Lina

f(/(?=\P{sc=Lina})\p{scx=Lina}/u, "\u{e3554}");
f(/(?=\P{sc=Lina})\p{scx=Lina}/u, "\u{e7555}");
f(/(?=\P{sc=Lina})\p{scx=Lina}/u, "\u{29fc1}");
f(/(?=\P{sc=Lina})\p{scx=Lina}/u, "\u{3fe04}");
f(/(?=\P{sc=Lina})\p{scx=Lina}/u, "\u{df6e2}"); // Script_Extension=Knda

f(/(?=\P{sc=Knda})\p{scx=Knda}/u, "\u{36afd}");
f(/(?=\P{sc=Knda})\p{scx=Knda}/u, "\u{72966}");
f(/(?=\P{sc=Knda})\p{scx=Knda}/u, "\u{531de}");
f(/(?=\P{sc=Knda})\p{scx=Knda}/u, "\u{cd350}");
f(/(?=\P{sc=Knda})\p{scx=Knda}/u, "\u{4081f}"); // Script_Extension=Kali

f(/(?=\P{sc=Kali})\p{scx=Kali}/u, "\u{2cc77}");
f(/(?=\P{sc=Kali})\p{scx=Kali}/u, "\u{7973a}");
f(/(?=\P{sc=Kali})\p{scx=Kali}/u, "\u{d67e0}");
f(/(?=\P{sc=Kali})\p{scx=Kali}/u, "\u{6f0a6}");
f(/(?=\P{sc=Kali})\p{scx=Kali}/u, "\u{130b7}"); // Script_Extension=Buhd

f(/(?=\P{sc=Buhd})\p{scx=Buhd}/u, "\u{91a77}");
f(/(?=\P{sc=Buhd})\p{scx=Buhd}/u, "\u{dad60}");
f(/(?=\P{sc=Buhd})\p{scx=Buhd}/u, "\u{10577d}");
f(/(?=\P{sc=Buhd})\p{scx=Buhd}/u, "\u{107c7d}");
f(/(?=\P{sc=Buhd})\p{scx=Buhd}/u, "\u{6d43d}"); // Script_Extension=Hano

f(/(?=\P{sc=Hano})\p{scx=Hano}/u, "\u{7e942}");
f(/(?=\P{sc=Hano})\p{scx=Hano}/u, "\u{b0a24}");
f(/(?=\P{sc=Hano})\p{scx=Hano}/u, "\u{106205}");
f(/(?=\P{sc=Hano})\p{scx=Hano}/u, "\u{4ac72}");
f(/(?=\P{sc=Hano})\p{scx=Hano}/u, "\u{e6681}"); // Script_Extension=Tagb

f(/(?=\P{sc=Tagb})\p{scx=Tagb}/u, "\u{dd8fa}");
f(/(?=\P{sc=Tagb})\p{scx=Tagb}/u, "\u{e622d}");
f(/(?=\P{sc=Tagb})\p{scx=Tagb}/u, "\u{d43fb}");
f(/(?=\P{sc=Tagb})\p{scx=Tagb}/u, "\u{10ba23}");
f(/(?=\P{sc=Tagb})\p{scx=Tagb}/u, "\u{bfbce}"); // Script_Extension=Tglg

f(/(?=\P{sc=Tglg})\p{scx=Tglg}/u, "\u{bb9f4}");
f(/(?=\P{sc=Tglg})\p{scx=Tglg}/u, "\u{cb69f}");
f(/(?=\P{sc=Tglg})\p{scx=Tglg}/u, "\u{5bb3f}");
f(/(?=\P{sc=Tglg})\p{scx=Tglg}/u, "\u{b6f43}");
f(/(?=\P{sc=Tglg})\p{scx=Tglg}/u, "\u{d013b}"); // Script_Extension=Dogr

f(/(?=\P{sc=Dogr})\p{scx=Dogr}/u, "\u{2d845}");
f(/(?=\P{sc=Dogr})\p{scx=Dogr}/u, "\u{1a910}");
f(/(?=\P{sc=Dogr})\p{scx=Dogr}/u, "\u{3ba2a}");
f(/(?=\P{sc=Dogr})\p{scx=Dogr}/u, "\u{bde46}");
f(/(?=\P{sc=Dogr})\p{scx=Dogr}/u, "\u{108e84}"); // Script_Extension=Kthi

f(/(?=\P{sc=Kthi})\p{scx=Kthi}/u, "\u{10dd0}");
f(/(?=\P{sc=Kthi})\p{scx=Kthi}/u, "\u{5484b}");
f(/(?=\P{sc=Kthi})\p{scx=Kthi}/u, "\u{3aed6}");
f(/(?=\P{sc=Kthi})\p{scx=Kthi}/u, "\u{1e733}");
f(/(?=\P{sc=Kthi})\p{scx=Kthi}/u, "\u{9448f}"); // Script_Extension=Mahj

f(/(?=\P{sc=Mahj})\p{scx=Mahj}/u, "\u{a2006}");
f(/(?=\P{sc=Mahj})\p{scx=Mahj}/u, "\u{184cd}");
f(/(?=\P{sc=Mahj})\p{scx=Mahj}/u, "\u{575ba}");
f(/(?=\P{sc=Mahj})\p{scx=Mahj}/u, "\u{1005cb}");
f(/(?=\P{sc=Mahj})\p{scx=Mahj}/u, "\u{c2d02}"); // Script_Extension=Hang

f(/(?=\P{sc=Hang})\p{scx=Hang}/u, "\u{b42fb}");
f(/(?=\P{sc=Hang})\p{scx=Hang}/u, "\u{15eff}");
f(/(?=\P{sc=Hang})\p{scx=Hang}/u, "\u{cc05b}");
f(/(?=\P{sc=Hang})\p{scx=Hang}/u, "\u{85919}");
f(/(?=\P{sc=Hang})\p{scx=Hang}/u, "\u{c27ea}"); // Script_Extension=Yiii

f(/(?=\P{sc=Yiii})\p{scx=Yiii}/u, "\u{b9c10}");
f(/(?=\P{sc=Yiii})\p{scx=Yiii}/u, "\u{55fef}");
f(/(?=\P{sc=Yiii})\p{scx=Yiii}/u, "\u{fe59b}");
f(/(?=\P{sc=Yiii})\p{scx=Yiii}/u, "\u{ffd82}");
f(/(?=\P{sc=Yiii})\p{scx=Yiii}/u, "\u{7df88}"); // Script_Extension=Mlym

f(/(?=\P{sc=Mlym})\p{scx=Mlym}/u, "\u{38ca6}");
f(/(?=\P{sc=Mlym})\p{scx=Mlym}/u, "\u{b536b}");
f(/(?=\P{sc=Mlym})\p{scx=Mlym}/u, "\u{d73c3}");
f(/(?=\P{sc=Mlym})\p{scx=Mlym}/u, "\u{ef7c}");
f(/(?=\P{sc=Mlym})\p{scx=Mlym}/u, "\u{54f11}"); // Script_Extension=Orya

f(/(?=\P{sc=Orya})\p{scx=Orya}/u, "\u{103437}");
f(/(?=\P{sc=Orya})\p{scx=Orya}/u, "\u{6db9f}");
f(/(?=\P{sc=Orya})\p{scx=Orya}/u, "\u{c0cbf}");
f(/(?=\P{sc=Orya})\p{scx=Orya}/u, "\u{693e6}");
f(/(?=\P{sc=Orya})\p{scx=Orya}/u, "\u{107f31}"); // Script_Extension=Telu

f(/(?=\P{sc=Telu})\p{scx=Telu}/u, "\u{4565}");
f(/(?=\P{sc=Telu})\p{scx=Telu}/u, "\u{92ad2}");
f(/(?=\P{sc=Telu})\p{scx=Telu}/u, "\u{7de0b}");
f(/(?=\P{sc=Telu})\p{scx=Telu}/u, "\u{bc7b2}");
f(/(?=\P{sc=Telu})\p{scx=Telu}/u, "\u{9edd7}"); // Script_Extension=Adlm

f(/(?=\P{sc=Adlm})\p{scx=Adlm}/u, "\u{8be77}");
f(/(?=\P{sc=Adlm})\p{scx=Adlm}/u, "\u{31dbb}");
f(/(?=\P{sc=Adlm})\p{scx=Adlm}/u, "\u{f2854}");
f(/(?=\P{sc=Adlm})\p{scx=Adlm}/u, "\u{10a682}");
f(/(?=\P{sc=Adlm})\p{scx=Adlm}/u, "\u{eba94}"); // Script_Extension=Mand

f(/(?=\P{sc=Mand})\p{scx=Mand}/u, "\u{180bd}");
f(/(?=\P{sc=Mand})\p{scx=Mand}/u, "\u{98fb9}");
f(/(?=\P{sc=Mand})\p{scx=Mand}/u, "\u{aaa0c}");
f(/(?=\P{sc=Mand})\p{scx=Mand}/u, "\u{de7c8}");
f(/(?=\P{sc=Mand})\p{scx=Mand}/u, "\u{e27ed}"); // Script_Extension=Mani

f(/(?=\P{sc=Mani})\p{scx=Mani}/u, "\u{88d89}");
f(/(?=\P{sc=Mani})\p{scx=Mani}/u, "\u{2102d}");
f(/(?=\P{sc=Mani})\p{scx=Mani}/u, "\u{35a92}");
f(/(?=\P{sc=Mani})\p{scx=Mani}/u, "\u{1e78e}");
f(/(?=\P{sc=Mani})\p{scx=Mani}/u, "\u{6afba}"); // Script_Extension=Phlp

f(/(?=\P{sc=Phlp})\p{scx=Phlp}/u, "\u{10677d}");
f(/(?=\P{sc=Phlp})\p{scx=Phlp}/u, "\u{31238}");
f(/(?=\P{sc=Phlp})\p{scx=Phlp}/u, "\u{62ae}");
f(/(?=\P{sc=Phlp})\p{scx=Phlp}/u, "\u{88872}");
f(/(?=\P{sc=Phlp})\p{scx=Phlp}/u, "\u{9720e}"); // Script_Extension=Sogd

f(/(?=\P{sc=Sogd})\p{scx=Sogd}/u, "\u{4c593}");
f(/(?=\P{sc=Sogd})\p{scx=Sogd}/u, "\u{74ba6}");
f(/(?=\P{sc=Sogd})\p{scx=Sogd}/u, "\u{f97a0}");
f(/(?=\P{sc=Sogd})\p{scx=Sogd}/u, "\u{62e97}");
f(/(?=\P{sc=Sogd})\p{scx=Sogd}/u, "\u{d2895}"); // Script_Extension=Modi

f(/(?=\P{sc=Modi})\p{scx=Modi}/u, "\u{107b3}");
f(/(?=\P{sc=Modi})\p{scx=Modi}/u, "\u{c6ffe}");
f(/(?=\P{sc=Modi})\p{scx=Modi}/u, "\u{57254}");
f(/(?=\P{sc=Modi})\p{scx=Modi}/u, "\u{3a9de}");
f(/(?=\P{sc=Modi})\p{scx=Modi}/u, "\u{bb58d}"); // Script_Extension=Sind

f(/(?=\P{sc=Sind})\p{scx=Sind}/u, "\u{b2f72}");
f(/(?=\P{sc=Sind})\p{scx=Sind}/u, "\u{f7673}");
f(/(?=\P{sc=Sind})\p{scx=Sind}/u, "\u{b2066}");
f(/(?=\P{sc=Sind})\p{scx=Sind}/u, "\u{22ea9}");
f(/(?=\P{sc=Sind})\p{scx=Sind}/u, "\u{492a}"); // Script_Extension=Takr

f(/(?=\P{sc=Takr})\p{scx=Takr}/u, "\u{89a3a}");
f(/(?=\P{sc=Takr})\p{scx=Takr}/u, "\u{2c9bb}");
f(/(?=\P{sc=Takr})\p{scx=Takr}/u, "\u{60523}");
f(/(?=\P{sc=Takr})\p{scx=Takr}/u, "\u{86916}");
f(/(?=\P{sc=Takr})\p{scx=Takr}/u, "\u{ce4af}"); // Script_Extension=Tirh

f(/(?=\P{sc=Tirh})\p{scx=Tirh}/u, "\u{2905}");
f(/(?=\P{sc=Tirh})\p{scx=Tirh}/u, "\u{900cf}");
f(/(?=\P{sc=Tirh})\p{scx=Tirh}/u, "\u{4b07a}");
f(/(?=\P{sc=Tirh})\p{scx=Tirh}/u, "\u{2319}");
f(/(?=\P{sc=Tirh})\p{scx=Tirh}/u, "\u{69d82}"); // Script_Extension=Gong

f(/(?=\P{sc=Gong})\p{scx=Gong}/u, "\u{3ce05}");
f(/(?=\P{sc=Gong})\p{scx=Gong}/u, "\u{362e8}");
f(/(?=\P{sc=Gong})\p{scx=Gong}/u, "\u{fe0b9}");
f(/(?=\P{sc=Gong})\p{scx=Gong}/u, "\u{99c0c}");
f(/(?=\P{sc=Gong})\p{scx=Gong}/u, "\u{10a9c2}"); // Script_Extension=Sinh

f(/(?=\P{sc=Sinh})\p{scx=Sinh}/u, "\u{8ac14}");
f(/(?=\P{sc=Sinh})\p{scx=Sinh}/u, "\u{fea84}");
f(/(?=\P{sc=Sinh})\p{scx=Sinh}/u, "\u{5f107}");
f(/(?=\P{sc=Sinh})\p{scx=Sinh}/u, "\u{7ed82}");
f(/(?=\P{sc=Sinh})\p{scx=Sinh}/u, "\u{1b5b4}"); // Script_Extension=Limb

f(/(?=\P{sc=Limb})\p{scx=Limb}/u, "\u{36208}");
f(/(?=\P{sc=Limb})\p{scx=Limb}/u, "\u{dff4e}");
f(/(?=\P{sc=Limb})\p{scx=Limb}/u, "\u{fb421}");
f(/(?=\P{sc=Limb})\p{scx=Limb}/u, "\u{5e20e}");
f(/(?=\P{sc=Limb})\p{scx=Limb}/u, "\u{b6402}");