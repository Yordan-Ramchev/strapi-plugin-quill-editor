import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's styles

// Type the props explicitly
interface QuillEditorProps {
  value: string; // Content from the database
  onChange: (content: string) => void; // Callback to send changes
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start typing...',
  readOnly = false,
}) => {
  const quillContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the container
  const quillInstanceRef = useRef<Quill | null>(null); // Ref for the Quill editor instance

  useEffect(() => {
    if (!quillInstanceRef.current && quillContainerRef.current) {
      // Initialize Quill editor only once
      quillInstanceRef.current = new Quill(quillContainerRef.current, {
        theme: 'snow',
        readOnly,
        placeholder,
        modules: {
          toolbar: [
            [{ header: [2, 3, 4, 5, 6, false] }],
            ['link', 'image'],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['clean'],
          ],
        },
      });

      // Set initial content
      if (value) {
        quillInstanceRef.current.clipboard.dangerouslyPasteHTML(value);
      }

      // Handle text changes
      quillInstanceRef.current.on('text-change', () => {
        if (onChange && quillInstanceRef.current) {
          const currentContent = quillInstanceRef.current.root.innerHTML;
          if (currentContent !== value) {
            onChange(currentContent); // Send changes back
          }
        }
      });
    }
  }, [onChange, placeholder, readOnly, value]);

  useEffect(() => {
    if (quillInstanceRef.current) {
      const currentContent = quillInstanceRef.current.root.innerHTML;
      if (value !== currentContent) {
        // Update content if value changes externally
        quillInstanceRef.current.clipboard.dangerouslyPasteHTML(value || '');
      }
    }
  }, [value]);

  return (
    <div
      ref={quillContainerRef}
      style={{
        height: '450px',
        border: '1px solid #ccc',
        backgroundColor: readOnly ? '#f5f5f5' : '#fff',
      }}
    />
  );
};

export { QuillEditor };
