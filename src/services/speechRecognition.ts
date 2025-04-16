
// Speech recognition service
const startSpeechRecognition = (
  onResult: (transcript: string) => void,
  onError: (error: Error) => void
): (() => void) => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    onError(new Error("Speech recognition is not supported in this browser."));
    return () => {};
  }

  // Use the appropriate speech recognition API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'id-ID'; // Set language to Indonesian
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    onError(new Error(`Speech recognition error: ${event.error}`));
  };

  recognition.start();

  // Return a cleanup function
  return () => {
    recognition.stop();
  };
};

export default startSpeechRecognition;
