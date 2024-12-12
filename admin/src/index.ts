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
        base: [
          {
            intlLabel: {
              id: 'strapi-plugin-quill-editor.output.label',
              defaultMessage: 'Output type',
            },
            description: {
              id: 'strapi-plugin-quill-editor.output.description',
              defaultMessage: 'HTML or Markdown',
            },
            name: 'options.output',
            type: 'select',
            defaultValue: 'HTML',
            options: [
              {
                key: 'html',
                value: 'HTML',
                metadatas: {
                  intlLabel: {
                    id: 'strapi-plugin-quill-editor.output.html.label',
                    defaultMessage: 'HTML',
                  },
                },
              },
              {
                key: 'markdown',
                value: 'Markdown',
                metadatas: {
                  intlLabel: {
                    id: 'strapi-plugin-quill-editor.output.markdown.label',
                    defaultMessage: 'Markdown',
                  },
                },
              },
            ],
          },
        ],
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
