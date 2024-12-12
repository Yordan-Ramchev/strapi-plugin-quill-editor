import React from 'react';
import { useIntl, IntlShape } from 'react-intl';
import { useField } from '@strapi/strapi/admin';
import { Flex } from '@strapi/design-system';
import { Field } from '@strapi/design-system';
import { QuillEditor } from './QuillEditor';

// Define the expected prop types for the QuillEditorInput component
interface QuillEditorInputProps {
  attribute: {
    type: string; // adjust the type if necessary
  };
  name: string;
  disabled?: boolean;
  labelAction?: React.ReactNode;
  required?: boolean;
  description?: string;
  error?: string;
  intlLabel?: { id: string; defaultMessage?: string };
}

const QuillEditorInput: React.FC<QuillEditorInputProps> = (props) => {
  const { attribute, name, disabled, labelAction, required, description, error, intlLabel } = props;
  const { onChange, value } = useField(name);
  const { formatMessage }: IntlShape = useIntl(); // Type the useIntl hook

  const handleEditorChange = (content: string) => {
    // Directly pass the content to the onChange function
    onChange(content);
  };

  return (
    <Field.Root
      name={name}
      id={name}
      error={error}
      hint={description && formatMessage({ id: description })}
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
