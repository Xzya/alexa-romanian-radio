import { ui } from "ask-sdk-model";
import { ResponseFactory, ResponseBuilder } from "ask-sdk-core";

export class AudioController {
    play(url: string, token: string, offset: number, text?: string, cardData?: ui.StandardCard): ResponseBuilder {
        const result = ResponseFactory.init();

        // TODO: - investigate this, it doesn't seem to be displayed
        if (cardData) {
            result.withStandardCard(
                cardData.title ? cardData.title : "",
                cardData.text ? cardData.text : "",
                cardData.image ? cardData.image.smallImageUrl : undefined,
                cardData.image ? cardData.image.largeImageUrl : undefined
            );
        }

        // we are using url as token as they are all unique
        result.addAudioPlayerPlayDirective("REPLACE_ALL", url, token, offset)
            .withShouldEndSession(true);

        if (text) {
            result.speak(text);
        }

        return result;
    }

    pause(): ResponseBuilder {
        const result = ResponseFactory.init();

        result
            .addAudioPlayerStopDirective()

        return result;
    }

    stop(text?: string): ResponseBuilder {
        const result = ResponseFactory.init();

        result
            .addAudioPlayerStopDirective();

        if (text) {
            result.speak(text);
        }

        return result;
    }

    clear(): ResponseBuilder {
        const result = ResponseFactory.init();

        result.addAudioPlayerClearQueueDirective("CLEAR_ALL");

        return result;
    }
}

export const audio = new AudioController();
