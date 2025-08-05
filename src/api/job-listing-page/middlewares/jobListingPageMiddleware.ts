// src/api/job-listing-page/middlewares/jobListingPageMiddleware.ts
import { Context, Next } from 'koa';

const SUPPORTED_LOCALES = ['pt', 'es', 'en'];

const jobListingPageMiddleware = async (ctx: Context, next: Next) => {
    // Intercepta apenas GET /api/job-listing-page
    if (ctx.request.path === '/api/job-listing-page' && ctx.request.method === 'GET') {
        try {
            // Obtém locale via query string (?locale=xx), padrão 'pt'
            let locale = (ctx.query.locale as string) || 'pt';

            if (!SUPPORTED_LOCALES.includes(locale)) {
                locale = 'pt';
            }

            // Busca o conteúdo do single type job-listing-page filtrando por locale
            const entries = await strapi.entityService.findMany('api::job-listing-page.job-listing-page', {
                populate: '*',
                filters: { locale },
            });

            const data = entries[0] || null; // single type, pega o primeiro

            ctx.status = 200;
            ctx.body = { data, locale };
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Erro ao buscar job listing page' };
        }
    } else {
        await next(); // passa para o próximo middleware se não for a rota alvo
    }
};

export default jobListingPageMiddleware;
