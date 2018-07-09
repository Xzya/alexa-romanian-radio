import { ui } from "ask-sdk-model";

export enum Station {
    KissFM = "kissfm",
    RadioZU = "radiozu",
    RockFM = "rockfm",
    MagicFM = "magicfm",
    EuropaFM = "europafm",
}

export interface RadioDetails {
    name: string;
    url: string;
    card?: ui.StandardCard;
}

export const Radio = {
    for(station: Station): RadioDetails {
        switch (station) {
            case Station.KissFM:
                return {
                    name: "Kiss F.M.",
                    url: "https://www.kissfm.ro/listen.pls",
                    card: {
                        type: "Standard",
                        title: "Kiss FM",
                        text: "#1 Hit Radio",
                        image: {
                            smallImageUrl: "https://www.kissfm.ro/app/assets/images/logo.png",
                            largeImageUrl: "https://www.kissfm.ro/app/assets/images/logo.png",
                        },
                    },
                };
            case Station.RadioZU:
                return {
                    name: "Radio ZU",
                    url: "http://live.romanticfm.ro:9123/radiozu.aacp", // not working, need https link
                    card: {
                        type: "Standard",
                        title: "Radio ZU",
                        text: "",
                        image: {
                            smallImageUrl: "https://radiozu.ro/img/logo-zu.png",
                            largeImageUrl: "https://radiozu.ro/img/logo-zu.png",
                        },
                    },
                };
            case Station.RockFM:
                return {
                    name: "Rock F.M.",
                    url: "https://www.rockfm.ro/listen.pls",
                    card: {
                        type: "Standard",
                        title: "Rock FM",
                        text: "It Rocks!",
                        image: {
                            smallImageUrl: "https://www.rockfm.ro/app/assets/layout/rock-logo-white.png",
                            largeImageUrl: "https://www.rockfm.ro/app/assets/layout/rock-logo-white.png",
                        },
                    },
                };
            case Station.MagicFM:
                return {
                    name: "Magic F.M.",
                    url: "https://www.magicfm.ro/listen.pls",
                    card: {
                        type: "Standard",
                        title: "Magic FM",
                        text: "",
                        image: {
                            smallImageUrl: "https://www.magicfm.ro/app/assets/magicfm/logo-magicfm.png",
                            largeImageUrl: "https://www.magicfm.ro/app/assets/magicfm/logo-magicfm.png",
                        },
                    },
                };
            case Station.EuropaFM:
                return {
                    name: "Europa F.M.",
                    url: "https://www.europafm.ro/live.m3u",
                    card: {
                        type: "Standard",
                        title: "Europa FM",
                        text: "",
                        image: {
                            smallImageUrl: "https://www.europafm.ro/wp-content/themes/efm_v4/img/logo.png?v=2.0",
                            largeImageUrl: "https://www.europafm.ro/wp-content/themes/efm_v4/img/logo.png?v=2.0",
                        },
                    },
                };
        }
    }
};
