import { RequestHandler } from "ask-sdk-core";
import { IsIntent, GetRequestAttributes } from "../../lib/helpers";
import { AudioPlayerIntentTypes } from "../../lib/constants";

export const StartOver: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, AudioPlayerIntentTypes.StartOver);
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(t("NOT_POSSIBLE_MSG"))
            .getResponse();
    }
};
