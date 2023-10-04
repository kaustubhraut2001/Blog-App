import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ label, name, control, defaultvaluee = "" }) {
  return (
    <div>
      <div className="">
        {label && (
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            {label}
          </label>
        )}
      </div>
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",

              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
			  alignleft aligncenter alignright alignjustify | \
			  bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={onChange}
            value={defaultvaluee}
          />
        )}
      />
    </div>
  );
}

export default RTE;
