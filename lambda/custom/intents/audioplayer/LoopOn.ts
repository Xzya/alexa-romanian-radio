import { RequestHandler } from "ask-sdk-core";
import { IsIntent } from "../../lib/helpers";
import { StartOver } from "./StartOver";
import { AudioPlayerIntentTypes } from "../../lib/constants";

export const LoopOn: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, AudioPlayerIntentTypes.LoopOn);
    },
    handle(handlerInput) {
        return StartOver.handle(handlerInput);
    }
};
