// src/api/tech-stack-section/middlewares/techStackSectionMiddleware.ts
import { Context, Next } from 'koa';

const SUPPORTED_LOCALES = ['pt', 'es', 'en'];

const techStackSectionMiddleware = async (ctx: Context, next: Next) => {
    // Intercepta apenas GET /api/tech-stack-section
    if (ctx.request.path === '/api/tech-stack-section' && ctx.request.method === 'GET') {
        try {
            // Lê locale via query string (?locale=xx), default 'pt'
            let locale = (ctx.query.locale as string) || 'pt';
            if (!SUPPORTED_LOCALES.includes(locale)) {
                locale = 'pt';
            }

            // Busca o singleType tech-stack-section, popula tudo e filtra por locale
            const entries = await strapi.entityService.findMany('api::tech-stack-section.tech-stack-section', {
                populate: '*',
                filters: { locale },
            });

            const data = entries[0] || null; // como é singleType, pegamos o primeiro

            ctx.status = 200;
            ctx.body = { data, locale };
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Erro ao buscar tech stack section' };
        }
    } else {
        // Se não for essa rota, passa adiante
        await next();
    }
};

export default techStackSectionMiddleware;
