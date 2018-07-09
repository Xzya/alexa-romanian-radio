import { SkillBuilders } from "ask-sdk-core";
import { LocalizationInterceptor } from "./Interceptors";
import { PlaybackStartedHandler, PlaybackFinishedHandler, PlaybackStoppedHandler, PlaybackNearlyFinishedHandler, PlaybackFailedHandler } from "./AudioHandlers";
import { CheckAudioInterfaceHandler, SessionEndedRequestHandler, LaunchRequestHandler, PlayAudioIntentHandler, HelpIntentHandler, CancelAndStopAndPauseIntentHandler, NextIntentHandler, PreviousIntentHandler, ResumeIntentHandler, LoopOnIntentIntentHandler, LoopOffIntentHandler, ShuffleOnIntentHandler, ShuffleOffIntentHandler, StartOverIntentHandler, SystemExceptionEncounteredIntentHandler, GenericErrorHandler, PauseIntentHandler } from "./IntentHandlers";
import { PlayCommandIssuedHandler, PausedCommandIssuedHandler, NextCommandIssuedHandler, PreviousCommandIssuedHandler } from "./PlaybackControllerHandlers";

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        CheckAudioInterfaceHandler,
        SessionEndedRequestHandler,

        LaunchRequestHandler,
        PlayAudioIntentHandler,
        HelpIntentHandler,
        CancelAndStopAndPauseIntentHandler,
        PauseIntentHandler,
        NextIntentHandler,
        PreviousIntentHandler,
        ResumeIntentHandler,

        LoopOnIntentIntentHandler,
        LoopOffIntentHandler,
        ShuffleOnIntentHandler,
        ShuffleOffIntentHandler,
        StartOverIntentHandler,

        SystemExceptionEncounteredIntentHandler,

        // Audio Handlers
        PlaybackStartedHandler,
        PlaybackFinishedHandler,
        PlaybackStoppedHandler,
        PlaybackNearlyFinishedHandler,
        PlaybackFailedHandler,

        // Remote Control commands
        PlayCommandIssuedHandler,
        PausedCommandIssuedHandler,
        NextCommandIssuedHandler,
        PreviousCommandIssuedHandler,
)
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(GenericErrorHandler)
    .lambda();
