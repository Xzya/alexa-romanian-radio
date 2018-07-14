import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../../../lib/helpers";
import { PlaybackControllerRequestTypes } from "../../../lib/constants";

export const PausedCommandIssued: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, PlaybackControllerRequestTypes.PauseCommandIssued);
    },
    handle(handlerInput) {
        return PausedCommandIssued.handle(handlerInput);
    }
};
