import React, { useIntl } from 'react-intl';
import { useField } from '@strapi/strapi/admin';
import { Flex } from '@strapi/design-system';
import { Field } from '@strapi/design-system';
import { QuillEditor } from './QuillEditor';

const QuillEditorInput = (props) => {
  const { attribute, name, disabled, labelAction, required, description, error, intlLabel } = props;
  const { onChange, value } = useField(name);
  const { formatMessage } = useIntl();

  const handleEditorChange = (content) => {
    onChange({
      target: {
        name,
        type: attribute.type,
        value: content,
      },
    });
  };

  return (
    <Field.Root
      name={name}
      id={name}
      error={error}
      hint={description && formatMessage(description)}
    >
      <Flex spacing={1} alignItems="normal" style={{ flexDirection: 'column' }}>
        <Field.Label action={labelAction} required={required}>
          {intlLabel ? formatMessage(intlLabel) : name}
        </Field.Label>
        <QuillEditor value={value} onChange={handleEditorChange} disabled={disabled} />
        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};

export { QuillEditorInput };
