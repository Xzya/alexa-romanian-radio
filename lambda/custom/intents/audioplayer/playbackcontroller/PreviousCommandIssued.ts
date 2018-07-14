import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../../../lib/helpers";
import { PlaybackControllerRequestTypes } from "../../../lib/constants";

export const PreviousCommandIssued: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, PlaybackControllerRequestTypes.PreviousCommandIssued);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};
