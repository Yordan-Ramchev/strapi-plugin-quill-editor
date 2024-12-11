import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's styles
// import TurndownService from 'turndown'; // For converting HTML to Markdown
// import marked from 'marked'; // For converting Markdown to HTML

const QuillEditor = ({ value, onChange, placeholder = 'Start typing...', readOnly = false }) => {
  const quillContainerRef = useRef(null); // Ref for the container
  const quillInstanceRef = useRef(null); // Ref for the Quill editor instance
  // const turndownService = new TurndownService(); // Turndown service for converting HTML to Markdown

  useEffect(() => {
    if (!quillInstanceRef.current && quillContainerRef.current) {
      // Initialize Quill editor only once
      quillInstanceRef.current = new Quill(quillContainerRef.current, {
        theme: 'snow',
        readOnly,
        placeholder,
        modules: {
          toolbar: [
            [{ header: '2' }, { header: '3' }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['blockquote', 'code-block'],
          ],
        },
      });

      // Set initial content
      if (value) {
        quillInstanceRef.current.clipboard.dangerouslyPasteHTML(value);
      }

      // Handle text changes
      quillInstanceRef.current.on('text-change', () => {
        if (onChange) {
          const currentContent = quillInstanceRef.current.root.innerHTML;
          if (currentContent !== value) {
            onChange(currentContent);
          }
        }
      });
    }
  }, [onChange, placeholder, readOnly]);

  useEffect(() => {
    if (quillInstanceRef.current && value !== quillInstanceRef.current.root.innerHTML) {
      // Update content if value changes externally
      quillInstanceRef.current.clipboard.dangerouslyPasteHTML(value || '');
    }
  }, [value]);

  return (
    <div
      ref={quillContainerRef}
      style={{
        height: '450px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: readOnly ? '#f5f5f5' : '#fff',
      }}
    />
  );
};

export { QuillEditor };
