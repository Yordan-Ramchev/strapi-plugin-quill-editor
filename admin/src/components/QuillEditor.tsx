import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's styles
import TurndownService from 'turndown'; // Import Turndown for HTML to Markdown conversion

const QuillEditor = ({ value, onChange, placeholder = 'Start typing...', readOnly = false }) => {
  const quillContainerRef = useRef(null); // Ref for the container
  const quillInstanceRef = useRef(null); // Ref for the Quill editor instance
  const turndownServiceRef = useRef(new TurndownService()); // Turndown service instance

  useEffect(() => {
    if (!quillInstanceRef.current && quillContainerRef.current) {
      // Initialize Quill editor only once
      quillInstanceRef.current = new Quill(quillContainerRef.current, {
        theme: 'snow',
        readOnly,
        placeholder,
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['link', 'image'],
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
        if (onChange) {
          const htmlContent = quillInstanceRef.current.root.innerHTML;
          const markdownContent = turndownServiceRef.current.turndown(htmlContent); // Convert HTML to Markdown

          if (markdownContent !== value) {
            onChange(markdownContent);
          }
        }
      });
    }
  }, [onChange, placeholder, readOnly]);

  useEffect(() => {
    if (quillInstanceRef.current) {
      const htmlContent = quillInstanceRef.current.root.innerHTML;
      const currentMarkdown = turndownServiceRef.current.turndown(htmlContent);

      if (value !== currentMarkdown) {
        // Update Quill content if external Markdown value changes
        const htmlFromMarkdown = new TurndownService().turndown(value || '');
        quillInstanceRef.current.clipboard.dangerouslyPasteHTML(htmlFromMarkdown);
      }
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
