import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../../../lib/helpers";
import { AudioPlayerPlaybackRequestTypes } from "../../../lib/constants";

export const PlaybackFinished: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, AudioPlayerPlaybackRequestTypes.PlaybackFinished);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .getResponse();
    },
};
