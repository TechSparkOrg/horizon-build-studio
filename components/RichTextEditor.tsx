"use client";

import "react-quill-new/dist/quill.snow.css";

import ReactQuill from "react-quill-new";

const TOOLBAR = [
  [{ header: [1, 2, 3, 4, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["blockquote", "code-block"],
  ["link", "image", "video"],
  ["clean"],
];

const FORMATS = [
  "header",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "list",
  "align",
  "blockquote", "code-block",
  "link", "image", "video",
];

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{ toolbar: TOOLBAR }}
      formats={FORMATS}
      className="[&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-base"
    />
  );
}
