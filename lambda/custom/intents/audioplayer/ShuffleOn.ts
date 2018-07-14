import { RequestHandler } from "ask-sdk-core";
import { IsIntent } from "../../lib/helpers";
import { StartOver } from "./StartOver";
import { AudioPlayerIntentTypes } from "../../lib/constants";

export const ShuffleOn: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, AudioPlayerIntentTypes.ShuffleOn);
    },
    handle(handlerInput) {
        return StartOver.handle(handlerInput);
    }
};
