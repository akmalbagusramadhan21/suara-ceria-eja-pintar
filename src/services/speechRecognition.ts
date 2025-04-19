// Speech recognition service with improved type definitions for browser compatibility

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

const startSpeechRecognition = (
  onResult: (transcript: string) => void,
  onError: (error: Error) => void
): (() => void) => {
  // Check browser support
  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognitionAPI) {
    onError(new Error("Speech recognition is not supported in this browser."));
    return () => {};
  }

  // Initialize speech recognition
  const recognition = new SpeechRecognitionAPI();

  recognition.lang = 'id-ID'; // Set language to Indonesian
  recognition.continuous = false;
  recognition.interimResults = true; // Enable interim results for faster response
  recognition.maxAlternatives = 1;

  // Add a timeout for better user experience
  let resultTimeout: number | null = null;

  recognition.onresult = (event) => {
    const results = event.results;
    const currentResult = results[results.length - 1];
    const transcript = currentResult[0].transcript.toLowerCase().trim();
    
    // Clear any existing timeout
    if (resultTimeout) {
      window.clearTimeout(resultTimeout);
    }
    
    // If result is final, immediately process it
    if (currentResult.isFinal) {
      onResult(transcript);
    } else {
      // Otherwise set a short timeout to prevent too much delay
      resultTimeout = window.setTimeout(() => {
        onResult(transcript);
      }, 1000); // Process after 1 second without final result
    }
  };

  recognition.onerror = (event) => {
    onError(new Error(`Speech recognition error: ${event.error}`));
  };

  // Automatically restart if ended without result
  recognition.onend = () => {
    if (resultTimeout) {
      window.clearTimeout(resultTimeout);
    }
  };

  recognition.start();

  // Return a cleanup function
  return () => {
    if (resultTimeout) {
      window.clearTimeout(resultTimeout);
    }
    recognition.stop();
  };
};

export default startSpeechRecognition;
