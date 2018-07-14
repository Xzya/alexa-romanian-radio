import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../../../lib/helpers";
import { AudioPlayerPlaybackRequestTypes } from "../../../lib/constants";

export const PlaybackStarted: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, AudioPlayerPlaybackRequestTypes.PlaybackStarted);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .getResponse();
    },
};
