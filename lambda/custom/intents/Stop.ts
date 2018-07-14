import { RequestHandler } from "ask-sdk-core";
import { GetRequestAttributes, IsOneOfIntent } from "../lib/helpers";
import { audio } from "../lib/AudioController";
import { IntentTypes } from "../lib/constants";

export const Stop: RequestHandler = {
    canHandle(handlerInput) {
        return IsOneOfIntent(handlerInput, IntentTypes.Cancel, IntentTypes.Stop);
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        return audio.stop(t("STOP_MSG"))
            .getResponse();
    }
};
