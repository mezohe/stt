var config = {nick: "spagetufa"};

var docs = {
	"+sidju": "lo se pruce cu te gerna la'o fa \n" +
			"  selruhe = cxuhoptiio+ \" \" selsku / selsku\n" +
			"  cxuhoptiio = [+-][a-z]+\n" +
			"fa (to zo selsku sinxa la'oi text ne lo gerna be lo jbobau toi)\n" +
			".i lo nu pilno lo cxu'optiio zo'u tu'e\n" +
			"  .i zo'oi  +brackets  noi jdifaute zo'u lo te pruce cu se melgau je nai cu se fanva\n" +
			"  .i zo'oi  +raw                     zo'u lo te pruce na se melgau\n" +
			"  .i zo'oi  +s                       zo'u lo cmene be lo selma'o cu pagbu\n" +
			"  .i zo'oi  +f         noi jdifaute zo'u lo famyma'o poi jai se rivbi cu pagbu\n" +
			"  .i lo nu pilno lo cxu'optiio valsi poi va'o ce'u me'o ni'u bu basti me'o ma'u bu cu rinka lo fatne be lo se skicu\n" +
			"tu'u\n" +
			".i lo nu pilno va'o lo gubni se .irci cu se sarcu lo nu lidnygau zoi fa " + config.nick + ":  fa lo se pruce"
			,
	"+help": "The input is composed like this: \n" +
			"  input = option+ \" \" text / text\n" +
			"  option = [+-][a-z]+\n" +
			"(\"text\" refers to the \"text\" rule of the Lojban grammar)\n" +
			"Use of options:\n" +
			"  +brackets  (default): the output is prettified but not translated\n" +
			"  +raw                : the output is not prettified\n" +
			"  +s                  : selma'o names are shown\n" +
			"  +f         (default): elided terminators are shown\n" +
			"  Using an option with a minus sign instead of a plus sign reverses the option's effect.\n" +
			"For use in a public channel, \"" + config.nick + ": \" needs to precede the input."
			,
};

var minisyntax = config.nick + ": (([+-](brackets|raw|s|f))+ )? ";

var minidocs = {
	"+sidju": "lo stinasa zo'u  " + minisyntax + "LO_SELSKU_POI_TE_GRETUFA\n.i lo jdifaute zo'u  +brackets+f\n.i lo nu benji lo sivni notci pe zo'oi +sidju cu rinka lo nu viska lo zmadu",
	"+help": "syntax:  " + minisyntax + "TEXT_TO_PARSE\ndefault:  +brackets+f\nSend a private message with \"+help\" to see more",
};

var formats = {
	brackets: "brackets", gloss: "gloss", raw: "raw",
	b: "brackets", g: "gloss", r: "raw",
};
var ret = {
	format: "brackets",
	s: false,
	f: true,
	startRule: "text",
};
var flag_pattern = "[+-]\\w+"

module.exports.docs = docs;
module.exports.minidocs = minidocs;
module.exports.formats = formats;
module.exports.ret = ret;
module.exports.flag_pattern = flag_pattern;
