import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            //Header
            "Previous": "Previous",
            "Home": "Home",
            "Help": "Help",
            //Page 1
            "Step1": "Step 1: choose an input",
            "inputParagraph": "Choose what you want to submit. It will then be assimilated and modified by the algorithm <br/> to create a new output such as an image for example.",
            "Image": "Image",
            "imageText": "Image + Text",
            "Example": "Example:",
            "input": "an astronaut riding a horse on mars, hd, dramatic lighting",
            "Text": "Text",
            //Page 2
            "Step2": "Step 2: Transform your input",
            "outputType": "Choose what you want to transform your input into.",
            //Image Page
            "Step3": "Step 3: Choose your image",
            "Step3_paragraph": "Select one of the proposed images or take a picture with the webcam.",
            "Step3_img_header": "Choose one of these images",
            "Camera_header": "Click here to take a picture using webcam",
            //Image_Text Page
            "Step3_img_paragraph": "Select one of the proposed images or take a picture with the webcam. Then describe the image you chose.",
            //Text Page
            "Step3_textPage": "Step 3: Write your text",
            "Step3_textPage_paragraph": "Write a text describing the image you would like to be created by the algorithm.",
            "Step3_textPage_placeholder": "Describe your image (max 100 characters)",
            // Result Page
            "Result": "Result",
            "resultHeader": "This is the output of the algorithm based on the parameters you have set.",
            "textInput": "This is the text you wrote",
            "imageInput": "This is the image you chose",
            "globalInput_header1": "This is the image created by the algorithm based on the text you wrote",
            "globalInput_header2": "This is the video created by the algorithm based on the text you wrote",
            "globalInput_header3": "This is the 3D object created by the algorithm based on the text you wrote",
        },
    },
    fr: {
        translation: {
            //Header
            "Previous": "Précédent",
            "Home": "Accueil",
            "Help": "Aide",
            //Page 1
            "Step1": "Étape 1: choisissez une entrée",
            "inputParagraph": " Choisissez ce que vous souhaitez soumettre. Il sera ensuite assimilé et modifié par l'algorithme <br/> pour créer une nouvelle sortie telle qu'une image, par exemple.",
            "Image": "Image",
            "imageText": "Image + Texte",
            "Example": "Exemple:",
            "input": "un astronaute à cheval sur mars, hd, éclairage dramatique",
            "Text": "Texte",
            //Page 2
            "Step2": "Étape 2 : Transformez votre contribution",
            "outputType": "Choisissez en quoi vous voulez transformer votre entrée.",
            //Image Page
            "Step3": "Étape 3 : Choisissez votre image",
            "Step3_paragraph": "Sélectionnez l'une des images proposées ou prenez une photo avec la webcam.",
            "Step3_img_header": "Choisissez une de ces images",
            "Camera_header": "Cliquez ici pour prendre une photo avec la webcam",
            //Image_Text Page
            "Step3_img_paragraph": "Sélectionnez l'une des images proposées ou prenez une photo avec la webcam. Ensuite, décrivez l'image que vous avez choisie.",
            //Text Page
            "Step3_textPage": "Étape 3 : Écrivez votre texte",
            "Step3_textPage_paragraph": "Écrivez un texte décrivant l'image que vous souhaitez que l'algorithme crée.",
            "Step3_textPage_placeholder": "Décrivez votre image (max 100 caractères)",
            // Result Page
            "Result": "Résultat",
            "resultHeader": "Voici la sortie de l'algorithme basée sur les paramètres que vous avez définis.",
            "textInput": "Voici le texte que vous avez écrit",
            "imageInput": "Voici l'image que vous avez choisie",
            "globalInput_header1": "Voici l'image créée par l'algorithme basée sur le texte que vous avez écrit",
            "globalInput_header2": "Voici la vidéo créée par l'algorithme basée sur le texte que vous avez écrit",
            "globalInput_header3": "Voici l'objet 3D créé par l'algorithme basé sur le texte que vous avez écrit",

        },
    },
    nl: {
        translation: {
            //Header
            "Previous": "Vorige",
            "Home": "Home",
            "Help": "Hulp",
            //Page 1
            "Step1": "Stap 1: kies een ingang",
            "inputParagraph": "Kies wat je wilt indienen. Het wordt vervolgens geassimileerd en aangepast door het algoritme <br/> om een ​​nieuwe output te creëren, zoals bijvoorbeeld een afbeelding.",
            "Image": "Afbeelding",
            "imageText": "Afbeelding + Tekst",
            "Example": "Voorbeeld:",
            "input": "een astronaut op een paard op mars, hd, dramatische verlichting",
            "Text": "Tekst",
            //Page 2    
            "Step2": "Stap 2: Transformeer uw input",
            "outputType": "Kies waar je je input in wilt omzetten.",
            //Image Page
            "Step3": "Stap 3: Kies je afbeelding",
            "Step3_paragraph": "Selecteer een van de voorgestelde afbeeldingen of maak een foto met de webcam.",
            "Step3_img_header": "Kies een van deze afbeeldingen",
            "Camera_header": "Klik hier om een ​​foto te maken met de webcam",
            //Image_Text Page
            "Step3_img_paragraph": "Selecteer een van de voorgestelde afbeeldingen of maak een foto met de webcam. Beschrijf vervolgens de afbeelding die je hebt gekozen.",
            //Text Page
            "Step3_textPage": "Stap 3: Schrijf je tekst",
            "Step3_textPage_paragraph": "Schrijf een tekst die de afbeelding beschrijft die je wilt dat het algoritme maakt.",
            "Step3_textPage_placeholder": "Beschrijf je afbeelding (max 100 tekens)",
            // Result Page
            "Result": "Resultaat",
            "resultHeader": "Dit is de output van het algoritme op basis van de door u ingestelde parameters.",
            "textInput": "Dit is de tekst die je hebt geschreven",
            "imageInput": "Dit is de afbeelding die je hebt gekozen",
            "globalInput_header1": "Dit is de afbeelding die door het algoritme is gemaakt op basis van de tekst die je hebt geschreven",
            "globalInput_header2": "Dit is de video die door het algoritme is gemaakt op basis van de tekst die je hebt geschreven",
            "globalInput_header3": "Dit is het 3D-object dat door het algoritme is gemaakt op basis van de tekst die je hebt geschreven",

        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
