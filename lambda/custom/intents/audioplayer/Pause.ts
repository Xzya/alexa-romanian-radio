import { RequestHandler } from "ask-sdk-core";
import { IsIntent } from "../../lib/helpers";
import { audio } from "../../lib/AudioController";
import { AudioPlayerIntentTypes } from "../../lib/constants";

export const Pause: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, AudioPlayerIntentTypes.Pause);
    },
    handle(handlerInput) {
        return audio.pause()
            .getResponse();
    }
};
