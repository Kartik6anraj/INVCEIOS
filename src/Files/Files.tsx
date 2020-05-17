import React, { useState, useEffect } from "react";
import "./Files.css";
import * as AppGeneral from "../socialcalc/AppGeneral";
import { DATA } from "../app-data.js";
import { Local } from "../storage/LocalStorage.js";
import { render } from "react-dom";

const Files: React.FC<{ file: string; updateSelectedFile: Function }> = (
  props
) => {
  const store = new Local();
  const [files, setFiles] = useState(store._getAllFiles());
  const editFile = (key) => {
    const data = store._getFile(key);
    // console.log(JSON.stringify(data));
    AppGeneral.viewFile(key, decodeURIComponent(data.content));
    props.updateSelectedFile(key);
  };

  const deleteFile = (key) => {
    // event.preventDefault();
    const result = window.confirm(`Do you want to delete the ${key} file?`);
    if (result) {
      // Delete file
      store._deleteFile(key);
      setFiles(store._getAllFiles());
      loadDefault();
    }
  };

  const loadDefault = () => {
    const msc = DATA["home"][AppGeneral.getDeviceType()]["msc"];
    AppGeneral.viewFile("default", JSON.stringify(msc));
    props.updateSelectedFile("default");
  };

  const _formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  let fileList;

  useEffect(() => {
    const files = store._getAllFiles();
    // console.log(JSON.stringify(files));
    fileList = Object.keys(files).map((key) => {
      // console.log(key);
      return (
        <div key={key}>
          <li>
            {key} <span>{_formatDate(files[key])}</span>
          </li>
          <button
            onClick={() => {
              editFile(key);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteFile(key);
            }}
          >
            Delete
          </button>
        </div>
      );
    });
  });

  return (
    <div className='file'>
      <ul>{fileList}</ul>
    </div>
  );
};

export default Files;
