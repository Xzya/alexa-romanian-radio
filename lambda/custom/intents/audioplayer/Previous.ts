import { RequestHandler } from "ask-sdk-core";
import { IsIntent, GetRequestAttributes } from "../../lib/helpers";
import { AudioPlayerIntentTypes } from "../../lib/constants";

export const Previous: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, AudioPlayerIntentTypes.Previous);
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(t("CAN_NOT_SKIP_MSG"))
            .withShouldEndSession(true)
            .getResponse();
    }
};
