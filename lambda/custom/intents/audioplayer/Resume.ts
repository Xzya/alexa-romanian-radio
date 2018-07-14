import { RequestHandler } from "ask-sdk-core";
import { IsIntent, GetRequestAttributes } from "../../lib/helpers";
import { audio } from "../../lib/AudioController";
import { AudioPlayerIntentTypes, Station, Radio } from "../../lib/constants";

export const Resume: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, AudioPlayerIntentTypes.Resume);
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput);

        const audioPlayer = handlerInput.requestEnvelope.context.AudioPlayer;

        if (audioPlayer && audioPlayer.token) {
            const radio = Radio.for(audioPlayer.token as Station);

            return audio.play(radio.url, audioPlayer.token, 0, undefined, radio.card)
                .getResponse();
        }

        return handlerInput.responseBuilder
            .speak(t("WHICH_STATION_MSG"))
            .reprompt(t("HELP_MSG"))
            .getResponse();
    }
};
