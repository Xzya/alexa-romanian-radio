import { RequestHandler } from "ask-sdk-core";
import { IsType, GetRequestAttributes } from "../lib/helpers";
import { RequestTypes } from "../lib/constants";

export const Launch: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, RequestTypes.Launch);
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(t("WELCOME_MSG"))
            .reprompt(t("HELP_MSG"))
            .getResponse();
    }
};
