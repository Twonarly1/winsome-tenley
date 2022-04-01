/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    /**
     * Provide the locales you want to support in your application
     */
    locales: ['English', 'Français', 'Español', 'Português', 'русский', '日本'],
    /**
     * This is the default locale you want to be used when visiting
     * a non-locale prefixed path.
     */
    defaultLocale: 'English',
  },
}
