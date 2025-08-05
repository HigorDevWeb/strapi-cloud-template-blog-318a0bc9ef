// /src/api/hero-section/middlewares/heroSectionMiddleware.ts
import { Context, Next } from 'koa';

const SUPPORTED_LOCALES = ['pt', 'es', 'en'];

const heroSectionMiddleware = async (ctx: Context, next: Next) => {
    // Só intercepta GET em /api/hero-section
    if (ctx.request.path === '/api/hero-section' && ctx.request.method === 'GET') {
        try {
            // locale via ?locale=xx, default 'pt'
            let locale = (ctx.query.locale as string) || 'pt';
            if (!SUPPORTED_LOCALES.includes(locale)) {
                locale = 'pt';
            }

            // Busca a single-type hero-section, popula tudo e filtra por locale
            const entries = await strapi.entityService.findMany('api::hero-section.hero-section', {
                populate: '*',
                filters: { locale },
            });

            // Retorna o primeiro (é singleType, então sempre índice 0)
            const data = entries[0] || null;

            ctx.status = 200;
            ctx.body = { data, locale };
        } catch (err) {
            ctx.status = 500;
            ctx.body = { error: 'Erro ao buscar hero section' };
        }
    } else {
        // passa para o próximo middleware
        await next();
    }
};

export default heroSectionMiddleware;
