import { RequestHandler } from "ask-sdk-core";
import { IsIntent } from "../../lib/helpers";
import { StartOver } from "./StartOver";
import { AudioPlayerIntentTypes } from "../../lib/constants";

export const ShuffleOff: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, AudioPlayerIntentTypes.ShuffleOff);
    },
    handle(handlerInput) {
        return StartOver.handle(handlerInput);
    }
};
