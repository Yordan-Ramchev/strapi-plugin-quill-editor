import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from "../../admin/src/pluginId";

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: "QuillEditor",
    plugin: PLUGIN_ID,
    type: "richtext",
    inputSize: {
      default: 12,
      isResizable: true,
    },
  });
};

export default register;
