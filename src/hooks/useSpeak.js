export function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new window.SpeechSynthesisUtterance(text);

  utterance.lang == "en-US";
  utterance.voice = synth
    .getVoices()
    .filter((voice) => voice.name == "Samantha" || voice.lang == "en-US")[0];

  if (synth.speaking) {
    synth.cancel();
  }
  synth.speak(utterance);
}
