import { RequestHandler } from "ask-sdk-core";
import { IsType } from "./utils";
import { interfaces } from "ask-sdk-model";

export const PlaybackStartedHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "AudioPlayer.PlaybackStarted");
    },
    handle(handlerInput) {
        console.log("Playback started");

        return handlerInput.responseBuilder
            .getResponse();
    },
};

export const PlaybackFinishedHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "AudioPlayer.PlaybackFinished");
    },
    handle(handlerInput) {
        console.log("Playback finished");

        return handlerInput.responseBuilder
            .getResponse();
    },
};

export const PlaybackStoppedHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "AudioPlayer.PlaybackStopped");
    },
    handle(handlerInput) {
        console.log("Playback stopped");

        return handlerInput.responseBuilder
            .getResponse();
    },
};

export const PlaybackNearlyFinishedHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "AudioPlayer.PlaybackNearlyFinished");
    },
    handle(handlerInput) {
        console.log("Playback nearly finished");

        // const request = handlerInput.requestEnvelope.request as interfaces.audioplayer.PlaybackNearlyFinishedRequest;

        return handlerInput.responseBuilder
            .getResponse();
    },
};

export const PlaybackFailedHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "AudioPlayer.PlaybackFailed");
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request as interfaces.audioplayer.PlaybackFailedRequest;
        console.log("Playback Failed : " + JSON.stringify(request.error, null, 2));

        return handlerInput.responseBuilder
            .getResponse();
    },
};
