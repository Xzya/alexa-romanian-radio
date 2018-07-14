import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../../../lib/helpers";
import { AudioPlayerPlaybackRequestTypes } from "../../../lib/constants";

export const PlaybackNearlyFinished: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, AudioPlayerPlaybackRequestTypes.PlaybckNearlyFinished);
    },
    handle(handlerInput) {
        // const request = handlerInput.requestEnvelope.request as interfaces.audioplayer.PlaybackNearlyFinishedRequest;

        return handlerInput.responseBuilder
            .getResponse();
    },
};
