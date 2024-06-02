import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d6278e9426e5b134334b5745fdbe30b5@o4507358638505984.ingest.us.sentry.io/4507363406970880",

  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});