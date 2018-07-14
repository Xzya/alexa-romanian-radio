import { ErrorHandler } from "ask-sdk-core";
import { GetRequestAttributes } from "../lib/helpers";

export const Generic: ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        const { t } = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(t("UNKNOWN_COMMAND_MSG"))
            .reprompt(t("UNKNOWN_COMMAND_MSG"))
            .getResponse();
    },
};
