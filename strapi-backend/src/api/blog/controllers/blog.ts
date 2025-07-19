/**
 * blog controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog.blog', ({ strapi }) => ({
  // Standart CRUD işlemleri + custom fonksiyonlar
  async find(ctx) {
    strapi.log.info('🔍 Blog find çağrıldı');
    const data = await strapi.entityService.findMany('api::blog.blog', {
      ...ctx.query,
    });
    return { data };
  },

  async findOne(ctx) {
    strapi.log.info(`🔍 Blog findOne çağrıldı: id=${ctx.params.id}`);
    const { id } = ctx.params;
    const entity = await strapi.entityService.findOne('api::blog.blog', id, {
      ...ctx.query,
    });
    return { data: entity };
  },

  async create(ctx) {
    strapi.log.info('➕ Blog create çağrıldı');
    const { data } = ctx.request.body;
    const entity = await strapi.entityService.create('api::blog.blog', { data });
    return { data: entity };
  },

  async update(ctx) {
    strapi.log.info(`✏️ Blog update çağrıldı: id=${ctx.params.id}`);
    const { id } = ctx.params;
    const { data } = ctx.request.body;
    const entity = await strapi.entityService.update('api::blog.blog', id, { data });
    return { data: entity };
  },

  async delete(ctx) {
    strapi.log.info(`🗑️ Blog delete çağrıldı: id=${ctx.params.id}`);
    const { id } = ctx.params;
    const entity = await strapi.entityService.delete('api::blog.blog', id);
    return { data: entity };
  },

  async updateByCustomId(ctx) {
    try {
      const { id } = ctx.params;
      const { data } = ctx.request.body;
      
      strapi.log.info(`🔧 Custom update çağrıldı: id=${id}, data=${JSON.stringify(data)}`);
      
      const entity = await strapi.entityService.update('api::blog.blog', parseInt(id), { data });
      
      strapi.log.info('✅ Custom update başarılı:', entity);
      return entity;
    } catch (error) {
      strapi.log.error('❌ Custom update hatası:', error);
      ctx.throw(500, error.message);
    }
  }
}));
