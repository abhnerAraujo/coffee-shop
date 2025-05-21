declare const FIREBASE_ENV: {
  FIREBASE_projectId: string;
  FIREBASE_appId: string;
  FIREBASE_storageBucket: string;
  FIREBASE_apiKey: string;
  FIREBASE_authDomain: string;
  FIREBASE_messagingSenderId: string;
  FIREBASE_measurementId: string;
};

declare const google: {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: ({ credential: string }) => void;
      }) => void;
      renderButton: (element: any, config: any) => void;
      prompt: () => void;
      cancel: () => void;
    };
  };
};

declare const NODE_ENV: string;

declare const PT_URL: string;
declare const EN_URL: string;
