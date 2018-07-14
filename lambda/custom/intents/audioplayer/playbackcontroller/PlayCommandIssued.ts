import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../../../lib/helpers";
import { audio } from "../../../lib/AudioController";
import { PlaybackControllerRequestTypes, Station, Radio } from "../../../lib/constants";

export const PlayCommandIssued: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, PlaybackControllerRequestTypes.PlayCommandIssued);
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
