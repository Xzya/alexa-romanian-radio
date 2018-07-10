import { RequestHandler } from "ask-sdk-core";
import { IsType } from "./utils";
import { Radio, Station } from "./Stations";
import { audio } from "./AudioController";

export const PlayCommandIssuedHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "PlaybackController.PlayCommandIssued");
    },
    handle(handlerInput) {
        const audioPlayer = handlerInput.requestEnvelope.context.AudioPlayer;

        if (audioPlayer && audioPlayer.token) {
            const radio = Radio.for(audioPlayer.token as Station);

            // you cannot include speech or card for this
            return audio.play(radio.url, audioPlayer.token, 0)
                .getResponse();
        }

        return handlerInput.responseBuilder
            .getResponse();
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
