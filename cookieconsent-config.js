import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.0-rc.17/dist/cookieconsent.umd.js';

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "box inline",
            position: "bottom left",
            equalWeightButtons: false,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: true
        }
    },
    categories: {
        necessary: {
            readOnly: true
        },
        functionality: {},
        analytics: {},
        marketing: {}
    },
    language: {
        default: "en",
        autoDetect: "browser",
        translations: {
            en: {
                consentModal: {
                    title: "Welcome To News Website by CodeINBlogs, it's cookie time!",
                    description: "This website uses cookies to enhance your browsing experience and provide personalized content. By clicking Accept, you consent to the use of cookies.",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    showPreferencesBtn: "Manage preferences",
                    closeIconLabel: "Reject all and close"
                },
                preferencesModal: {
                    title: "Consent Preferences Center",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    savePreferencesBtn: "Save preferences",
                    closeIconLabel: "Close modal",
                    serviceCounterLabel: "Service|Services",
                    sections: [
                        {
                            title: "Cookie Usage",
                            description: "At our platform, we use cookies to enhance your experience and provide personalized content. This page explains how we use cookies, what information they gather, and how you can control your cookie preferences."
                        },
                        {
                            title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                            description: " Essential for the basic functioning of the website. They enable features like page navigation, access to secure areas, and basic functionality."
                        },
                        {
                            title: "Functionality Cookies",
                            description: "Enhance the functionality of the website by remembering user preferences and choices.",
                            linkedCategory: "functionality"
                        },
                        {
                            title: "Analytics Cookies",
                            description: " Collect information about how visitors use the website. This data helps in improving the website's performance and user experience.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "Advertisement Cookies",
                            description: "Used to deliver targeted advertisements based on user interests and behavior.",
                            linkedCategory: "marketing"
                        },
                        {
                            title: "More information",
                            description: "For any query in relation to my policy on cookies and your choices, please <a class=\"cc__link\" href=\"anshul.codeinblogs.co\">contact us</a>."
                        }
                    ]
                }
            }
        }
    },
    disablePageInteraction: true
});
