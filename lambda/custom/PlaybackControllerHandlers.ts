import { RequestHandler } from "ask-sdk-core";
import { IsType } from "./utils";
import { Radio, Station } from "./Stations";
import { audio } from "./AudioController";

export const PlayCommandIssuedHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "PlaybackController.PlayCommandIssued");
    },
    handle(handlerInput) {
        const radio = Radio.for(Station.KissFM);

        return audio.play(radio.url, 0);
    }
};

export const PausedCommandIssuedHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "PlaybackController.PauseCommandIssued");
    },
    handle(handlerInput) {
        return PausedCommandIssuedHandler.handle(handlerInput);
    }
};

export const NextCommandIssuedHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "PlaybackController.NextCommandIssued");
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

export const PreviousCommandIssuedHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "PlaybackController.PreviousCommandIssued");
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};
