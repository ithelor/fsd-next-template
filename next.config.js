const { withSentryConfig } = require('@sentry/nextjs');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['ru'],
        defaultLocale: 'ru',
    },
    images: {
        domains: [process.env.NEXT_PUBLIC_DOMAIN],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    headers() {
        return [
            {
                source: '/fonts/(.*?)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.graphql$/,
            loader: 'graphql-tag/loader',
            exclude: /node_modules/,
        });

        return config;
    },
};

/**
 * @type {import('@sentry/nextjs').SentryWebpackPluginOptions}
 **/
const SentryWebpackPluginOptions = {
    include: '.next',
    ignore: ['node_modules'],
    urlPrefix: '~/_next',
    configFile: 'sentry.properties',
};

if (process.env.NODE_ENV === 'production' && Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN)) {
    module.exports = withSentryConfig(
        {
            ...nextConfig,
            sentry: {
                hideSourceMaps: true,
            },
        },
        SentryWebpackPluginOptions,
    );
} else {
    module.exports = nextConfig;
}
