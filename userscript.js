// ==UserScript==
// @name     Read receipt number aloud
// @version  1
// @match    https://www1.my.commbank.com.au/netbank/PaymentHub/PaymentReceipt.aspx*
// @grant    none
// ==/UserScript==

if(window.speechSynthesis.getVoices().length == 0) {
	window.speechSynthesis.addEventListener('voiceschanged', function() {
		textToSpeech();
	});
}

function textToSpeech() {
	var available_voices = window.speechSynthesis.getVoices();

	var english_voice = '';

	for(var i=0; i<available_voices.length; i++) {
		if(available_voices[i].lang === 'en-US') {
			english_voice = available_voices[i];
			break;
		}
	}
	if(english_voice === '')
		english_voice = available_voices[0];

	var utter = new SpeechSynthesisUtterance();
	utter.rate = 1;
	utter.pitch = 0.5;
	utter.text = document.querySelector('.receiptSecondarylbl').textContent.trim();
	utter.voice = english_voice;

	utter.onend = function() {
	var r = confirm("Repeat?");
		if (r == true) {
			textToSpeech();
		}
	}

	window.speechSynthesis.speak(utter);
}