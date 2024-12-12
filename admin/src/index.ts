import { PLUGIN_ID } from './pluginId';

export default {
  register(app: any) {
    app.customFields.register({
      name: PLUGIN_ID,
      pluginId: PLUGIN_ID,
      type: 'richtext',
      intlLabel: {
        id: 'strapi-plugin-quill-editor.label',
        defaultMessage: 'Quill Editor',
      },
      intlDescription: {
        id: 'strapi-plugin-quill-editor.description',
        defaultMessage: 'Unofficial integration',
      },
      components: {
        Input: async () =>
          import('./components/QuillEditorInput').then((module) => ({
            default: module.QuillEditorInput,
          })),
      },
      options: {
        // declare options here
      },
    });

    // app.addMenuLink({
    //   to: `plugins/${PLUGIN_ID}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${PLUGIN_ID}.plugin.name`,
    //     defaultMessage: PLUGIN_ID,
    //   },
    // });
  },

  // async registerTrads({ locales }: { locales: string[] }) {
  //   return Promise.all(
  //     locales.map(async (locale) => {
  //       try {
  //         const { default: data } = await import(`./translations/${locale}.json`);
  //
  //         return { data, locale };
  //       } catch {
  //         return { data: {}, locale };
  //       }
  //     })
  //   );
  // },
};
