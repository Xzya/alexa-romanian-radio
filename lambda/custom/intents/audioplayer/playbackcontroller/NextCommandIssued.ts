import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../../../lib/helpers";
import { PlaybackControllerRequestTypes } from "../../../lib/constants";

export const NextCommandIssued: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, PlaybackControllerRequestTypes.NextCommandIssued);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};
