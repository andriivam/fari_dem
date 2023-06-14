import i18n from '../i18n';

export async function getStaticProps({ locale }) {
    i18n.changeLanguage(locale);
    const translations = await i18n.getResourceBundle(locale, 'translation');

    return {
        props: {
            translations,
        },
    };
}