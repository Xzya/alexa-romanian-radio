import { ui, Response } from "ask-sdk-model";
import { ResponseFactory } from "ask-sdk-core";

export class AudioController {
    play(url: string, offset: number, text?: string, cardData?: ui.StandardCard): Response {
        const result = ResponseFactory.init();

        if (cardData) {
            result.withStandardCard(
                cardData.title ? cardData.title : "",
                cardData.text ? cardData.text : "",
                cardData.image ? cardData.image.smallImageUrl : undefined,
                cardData.image ? cardData.image.largeImageUrl : undefined
            );
        }

        // we are using url as token as they are all unique
        result.addAudioPlayerPlayDirective("REPLACE_ALL", url, url, offset)
            .withShouldEndSession(true);

        if (text) {
            result.speak(text);
        }

        return result.getResponse();
    }

    pause(): Response {
        const result = ResponseFactory.init();

        result
            .addAudioPlayerStopDirective()

        return result.getResponse();
    }

    stop(text: string): Response {
        const result = ResponseFactory.init();

        result
            .addAudioPlayerStopDirective()
            .speak(text);

        return result.getResponse();
    }

    clear(): Response {
        const result = ResponseFactory.init();

        result.addAudioPlayerClearQueueDirective("CLEAR_ALL");

        return result.getResponse();
    }
}

export const audio = new AudioController();
