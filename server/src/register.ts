import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../admin/src/pluginId';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: PLUGIN_ID,
    plugin: PLUGIN_ID,
    type: 'richtext',
  });
};

export default register;
