# Biblos.js for Ancient Greek

Simple practical Ancient Greek analizer on a top of [electron.js](https://electronjs.org/), a.k.a. Morpheus-Greek

## v.0.9 in progress

Morpheus is the collective name and technology for applications for several ancient languages, including Ancient Greek, Tibetan, Chinese and in future Sanskrit.

![biblos-0 9](https://user-images.githubusercontent.com/47331/64867999-2a2b1780-d647-11e9-8411-7dbb5c9f1438.png)

#### about Morpheus for Ancient Greek:

- Morpheus is a desktop web application for Windows, MacOS, Linux. Works offline, synchronizes dictionaries when online. It is a free software (license is **GNU GPL**)
- instantly displays and analyzes any amount of text (just copy **Ctrl-C** Ancient Greek text anywhere on a desktop)
- uses a data from <span class="external" href="https://en.wiktionary.org/w/index.php?title=Category:Ancient_Greek_language">https://wiktionary.org</span> for creating the paradigms and the tests, so has several hundred thousand tests
- many other dictionaries (including LSJ) can be installed from <span class="external" href="http://diglossa.org:5984/_utils/#">http://diglossa.org:5984/_utils/#</span> (login: **guest**, password: **guest**) or from CSV files
- Morpheus recursively creates chains of segments, and then selects the best from them. So it analyzes the parts of the compound Greek word (just **click** on a wordform), so allows in-depth analysis - prefixes, suffixes, words with several stems, etc. **Disclamer**: the reverse side of this power - if there is no obvious correct result, Morpheus can find a chain of segments that is formally correct, but do not make sense as a whole
- user can easily create a local dictionary for a selected text, created in a seconds by his own hands. Just type **Ctrl-D** and add the translation for the desired word
- Morpheus integrated with <span class="external" href="http://diglossa.org/diglossa.js">Diglossa.js</span> (v >= 0.6), so user can find the translations of a word in question just with **Ctrl-F**.
- see screencast at <span class="external" href="http://diglossa.org/greek">http://diglossa.org/greek</span>

&nbsp;

#### dictionaries

just now you can use:

- <b>wkt</b>, dictionary created by data from https://www.wiktionary.org/,
- <b>terms</b>, special dictionary for indeclinables (terms), i.e. articles, particles, all forms of pronouns, some adverbs, etc
- <b>lsj</b>, Liddell-Scott-Jones Greek-English (https://github.com/perseids-project/lsj-js)
- <b>dvr</b>, Древнегреческо-русский словарь Дворецкого (https://wiki.lingvoforum.net/wiki/index.php)
- <b>Souda</b>, Λεξικὸν Σουίδα ἤ Σοῦδα (http://users.ntua.gr/dimour/ilias_odysseia/Lexiko/souida.html)
- you can create your own <b>Local</b> dictionary, just translate a wordform step by step

#### catch sight of a water:

Morpheus is <b>not</b> a linguistic program. Morpheus is intended to help in reading and understanding the ancient text, but not to study the very questionable  theoretical construction of "language".

Linguistics is a science. Science refers to what it studies as an object. But that what "means," "wants to say," "strives", etc - is not an object. The language and the word are not objects. The word is part of an overheard conversation. A word taken out of context is a many-voiced chorus in which we do not hear individual voices. To speak a word is not an object, but an act, to understand a word is also an act. “There can be no science about an act” (Aristotle).

The ancient and foreign cultural authors do not know the concept of "language". Do not know about nouns and adjectives. The word of the ancient language is the unity of knowledge and emotions, of all that we carefully distinguish, considering this distinction to be a scientific method. But we are thereby changing the meaning of the ancient word. For example, an impossible translation of the word τὸ ἐπιθετικός appears as "adjective", and so on. It is clear that modern science should be put "out of brackets" - ἐποχή -  if you want to understand the ancient author. The motivation for epoche is not an anti-scientific orientation. It's just another, additional direction of attention - another ἕξῐς. It does not contradict in any way, and cannot contradict the results of the science of linguistics. I'm interested in reading the text as if this reading is a conversation with the author, and not studying him, or studying his language.

If, while reading an ancient author, you use modern linguistics, you know and use what the author did not know. And you think in this way and in a way that he did not know how to think. Nor do you know what he necessarily knew, and do not reason as he does - unless you use ancient grammar. Grammar provides a framework that limits the possible lexical meaning. Try to think of a “beautiful pot” so that the "pot" is not a noun, and a "beautiful" is not an adjective. I am talking about nuances and overtones, but there are no trifles in a serious text.

Why is the influence of modern theory (grammar) on the meaning of the text invisible to us? For the same reason why the fish do not know about water. Therefore, the Morpheus development takes into account first of all not the modern linguistic theory, but the grammar used by the author of the text, authentic grammar. First of all a grammar of Apollonius the Dyscolus. I think that this type of program can be called computer hermeneutics, and not computer linguistics.

&nbsp;

Read more: <span class="external">http://ru.diglossa.org/blog</span> (only Russian)

&nbsp;




## License

  GNU GPL v.3.0
