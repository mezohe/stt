var config = {
  server: 'irc.freenode.net',
  nick: 'tinketufa',
  options: {
    channels: ['#guaspi', "#ninjbo"],
    debug: false
  }
};

var irc = require('irc');
var client = new irc.Client(config.server, config.nick, config.options);

client.addListener('message', function(from, to, text, message) {
    processor(client, from, to, text, message);
});

var fs = require('fs');
var log = function (from, to, text, out) {
    fs.appendFileSync("/tmp/ciplog", new Date().toJSON() + " " + from + " " + to + "\n" + text + "\n" + out + "\n");
    return out;
}

var camxes = require('../stt.js');
var camxes_pre = require('../camxes_preproc.js');
var camxes_post = require('../ilmentufa_postproc.js');

var regexps = {
  coi:  new RegExp("(^| )coi la .?"  + config.nick + ".?"),
  juhi: new RegExp("(^| )ju'i la .?" + config.nick + ".?"),
  kihe: new RegExp("(^| )ki'e la .?" + config.nick + ".?")
}

var options = require("../ilmentufa_options.js");

var processor = function(client, from, to, text, message) {
	if (!text) return;
	var sendTo = from; // send privately
	if (to.indexOf('#') > -1) {
		sendTo = to; // send publicly
	}
	if (sendTo == to) {	// Public
		if (text.indexOf(config.nick + ": ") == '0') {
			text = text.substr(config.nick.length + 2);
			if (text in options.minidocs) {
				client.say(sendTo, options.minidocs[text]);
				return;
			}
			var ret = extract_mode(text);
			var out = run_camxes(ret[0], ret[1]);
			client.say(sendTo, out);
			if (ret[1].invalid)
				if (sendTo == "#jbosnu")
					client.say(sendTo, ".i fliba lo ka tersmu zo'oi " + ret[1].invalid + " noi .optiiyvla .i lo nu benji zoi fa " + config.nick + ": +sidju fa cu rinka lo nu viska lo liste be lo ro .optiio");
				else
					client.say(sendTo, "Unrecognized option " + ret[1].invalid + " - use '" + config.nick + ": +help' for a list of all options");
		} else if (text.search(regexps.coi) >= 0) {
			client.say(sendTo, "coi");
		} else if (text.search(regexps.juhi) >= 0) {
			client.say(sendTo, "re'i");
		} else if (text.search(regexps.kihe) >= 0) {
			client.say(sendTo, "je'e fi'i");
		}
	} else {	// Private
		if (text in options.docs) {
			client.say(sendTo, options.docs[text]);
			return;
		}
		var ret = extract_mode(text);
		var out = run_camxes(ret[0], ret[1]);
		client.say(sendTo, log(from, to, text, out));
		if (ret[1].invalid)
			client.say(sendTo, "Unrecognized option " + ret[1].invalid + " - use '+help' for a list of all options");
	}
};

function extract_mode(input) {
	var formats = options.formats;
	var buhu = options.buhu;
	var ret = JSON.parse(JSON.stringify(options.ret));
	var flag_pattern = options.flag_pattern;
	var match = input.match(new RegExp("^\\s*((?:" + flag_pattern + ")+) *(.*)"))
	if (match != null) {
		input = match[2];
		var flags = match[1].match(new RegExp(flag_pattern, "g"))
		for (var i = 0; i < flags.length; ++i) {
			var name = flags[i].slice(1);
			var bool = flags[i][0] == "+";
			if (name[0] == "R") {
				ret.startRule = name.slice(1);
			} else if (name in formats) {
				ret.format = bool ? formats[name] : "brackets";
			} else if (name in ret) {
				ret[name] = bool;
			} else {
				if (ret.invalid)
					ret.invalid.push(name);
				else
					ret.invalid = [name];
			}
		}
	}
	return [input, ret];
}

function run_camxes(input, mode) {
	var result;
	var syntax_error = false;
	result = camxes_pre.preprocessing(input);
	//result = input;
	try {
	  result = camxes.parse(result, mode);
	} catch (e) {
		result = e;
		syntax_error = true;
	}
	if (!syntax_error) {
		result = camxes_post.postprocessing(result, mode);
	}
	return result;
}
