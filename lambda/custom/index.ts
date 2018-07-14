import { SkillBuilders } from "ask-sdk-core";
import * as Interceptors from "./interceptors/Localization";
import * as AudioPlayerIntents from "./intents/audioplayer";
import * as Intents from "./intents";
import * as RadioIntents from "./intents/radio";
import * as AudioPlayerPlaybackRequests from "./intents/audioplayer/playback";
import * as PlaybackControllerRequests from "./intents/audioplayer/playbackcontroller";
import * as Errors from "./errors";

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        // DebugHandler,

        // Make sure the device supports audio player
        AudioPlayerIntents.CheckAudioInterface,

        // Default intents
        Intents.SessionEnded,
        Intents.Launch,
        Intents.Help,
        Intents.Stop,
        Intents.SystemExceptionEncountered,

        // Audio Player intents
        AudioPlayerIntents.Pause,
        AudioPlayerIntents.Next,
        AudioPlayerIntents.Previous,
        AudioPlayerIntents.Resume,
        AudioPlayerIntents.LoopOn,
        AudioPlayerIntents.LoopOff,
        AudioPlayerIntents.ShuffleOn,
        AudioPlayerIntents.ShuffleOff,
        AudioPlayerIntents.StartOver,

        // Playback Handlers
        AudioPlayerPlaybackRequests.PlaybackStarted,
        AudioPlayerPlaybackRequests.PlaybackFinished,
        AudioPlayerPlaybackRequests.PlaybackStopped,
        AudioPlayerPlaybackRequests.PlaybackNearlyFinished,
        AudioPlayerPlaybackRequests.PlaybackFailed,

        // Remote Control commands
        PlaybackControllerRequests.PlayCommandIssued,
        PlaybackControllerRequests.PausedCommandIssued,
        PlaybackControllerRequests.NextCommandIssued,
        PlaybackControllerRequests.PreviousCommandIssued,

        // Radio intent
        RadioIntents.InProgressPlayRadio,
        RadioIntents.CompletedPlayRadio
    )
    .addRequestInterceptors(Interceptors.Localization)
    .addErrorHandlers(Errors.Generic)
    .lambda();
