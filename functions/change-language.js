import i18n from '../src/i18n';

async function changeLanguage(selectedLanguage) {
    await i18n.changeLanguage(selectedLanguage);
    // Perform any other necessary logic after changing the language
}

export default changeLanguage;