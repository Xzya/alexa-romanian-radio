import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../../../lib/helpers";
import { AudioPlayerPlaybackRequestTypes } from "../../../lib/constants";

export const PlaybackStopped: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, AudioPlayerPlaybackRequestTypes.PlaybackStopped);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .getResponse();
    },
};
