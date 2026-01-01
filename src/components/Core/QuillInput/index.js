import { useRef } from "react";
import classes from "./QuillInput.module.css";
import { Label } from "../Label";
// Dynamically import ReactQuill with SSR disabled
import ReactQuill from "react-quill";

function QuillInput({
  value,
  setter,
  quillClass = "",
  placeholder = "",
  label,
}) {
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [false, 1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
        { tabular: true },
      ],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <>
      <style>
        {`
        .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg{
          inset-inline-end: 0 !important;
          right:unset !important
        }
        .ql-editor.ql-blank::before{
        font-style: normal !important;
        font-size: var(--fs-base) !important;
        opacity: 0.4 !important;
        color: var(--placeholder-color) !important;
        }
        .ql-snow .ql-picker-options{
        background-color: var(--background) !important;
        }
        .ql-snow .ql-stroke{
        stroke: var(--text-color) !important;
        }
        .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill{
        fill: var(--text-color) !important;
        }
      `}
      </style>
      {label && <Label>{label}</Label>}
      <div className={classes.quillInput}>
        <ReactQuill
          ref={quillRef}
          className={`${classes.quill} ${quillClass}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setter(e)}
          modules={modules}
        />
      </div>
    </>
  );
}

export default QuillInput;
