import { RequestHandler } from "ask-sdk-core";
import { GetRequestAttributes } from "../../lib/helpers";

export const CheckAudioInterface: RequestHandler = {
    canHandle(handlerInput) {
        let result = false;
        try {
            result = (handlerInput.requestEnvelope.context.System.device.supportedInterfaces.AudioPlayer === undefined);
        } catch (e) {
            // system.device or system.device.supportedInterfaces is undefined.
            // this happens when the skill receives audio player event or skill lifecycle events 
        }
        return result;
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        return handlerInput.responseBuilder
            .speak(t("DEVICE_NOT_SUPPORTED_MSG"))
            .withShouldEndSession(true)
            .getResponse();
    },
};
