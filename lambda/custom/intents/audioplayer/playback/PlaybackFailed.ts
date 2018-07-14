import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../../../lib/helpers";
import { interfaces } from "ask-sdk-model";
import { AudioPlayerPlaybackRequestTypes } from "../../../lib/constants";

export const PlaybackFailed: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, AudioPlayerPlaybackRequestTypes.PlaybackFailed);
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request as interfaces.audioplayer.PlaybackFailedRequest;
        console.log("Playback Failed : " + JSON.stringify(request.error, null, 2));

        return handlerInput.responseBuilder
            .getResponse();
    },
};
