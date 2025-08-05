import { Context, Next } from 'koa';

const SUPPORTED_LOCALES = ['pt', 'es', 'en']; // idiomas permitidos

const globalMiddleware = async (ctx: Context, next: Next) => {
    if (ctx.request.path === '/api/global' && ctx.request.method === 'GET') {
        try {
            // Lê o locale do query string (?locale=xx), padrão 'pt'
            let locale = ctx.query.locale as string;
            if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
                locale = 'pt'; // fallback para português
            }

            // Busca com populate * (tudo), e filtra pelo locale selecionado
            const global = await strapi.entityService.findMany('api::global.global', {
                populate: '*', // popula todos os componentes/media/relations
                filters: { locale },
            });

            ctx.status = 200;
            ctx.body = { data: global[0] || null, locale };
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Erro ao buscar global' };
        }
    } else {
        await next();
    }
};

export default globalMiddleware;
