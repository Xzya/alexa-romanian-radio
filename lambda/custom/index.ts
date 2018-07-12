import { SkillBuilders } from "ask-sdk-core";
import { LocalizationInterceptor } from "./Interceptors";
import { PlaybackStartedHandler, PlaybackFinishedHandler, PlaybackStoppedHandler, PlaybackNearlyFinishedHandler, PlaybackFailedHandler } from "./AudioHandlers";
import { CheckAudioInterfaceHandler, SessionEndedRequestHandler, LaunchRequestHandler, HelpIntentHandler, CancelAndStopAndPauseIntentHandler, NextIntentHandler, PreviousIntentHandler, ResumeIntentHandler, LoopOnIntentIntentHandler, LoopOffIntentHandler, ShuffleOnIntentHandler, ShuffleOffIntentHandler, StartOverIntentHandler, SystemExceptionEncounteredIntentHandler, GenericErrorHandler, PauseIntentHandler } from "./IntentHandlers";
import { PlayCommandIssuedHandler, PausedCommandIssuedHandler, NextCommandIssuedHandler, PreviousCommandIssuedHandler } from "./PlaybackControllerHandlers";
import { InProgressPlayRadioIntentHandler, CompletedPlayRadioIntentHandler } from "./RadioHandlers";
import { DebugHandler } from "./DebugHandler";

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        DebugHandler,

        CheckAudioInterfaceHandler,
        SessionEndedRequestHandler,

        LaunchRequestHandler,
        InProgressPlayRadioIntentHandler,
        CompletedPlayRadioIntentHandler,
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
