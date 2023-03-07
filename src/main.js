import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Main = ({ activeNote, onUpdateNote, onDeleteNote }) => {
  const [saved, setSaved] = useState(false); // track if note has been saved

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
    setSaved(false); // note is no longer saved after editing
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
};

const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
        return "";
    }
    return formatted;
};



  const onSaveClick = () => {
    const savedNote = JSON.stringify(activeNote);
    localStorage.setItem(activeNote.id, savedNote);
    setSaved(true);
  };

  const onDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      onDeleteNote && onDeleteNote(activeNote.id);
    }
  };

  if (!activeNote)
    return (
      <div className="no-active-note">Select a note, or create a new one.</div>
    );

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <ReactQuill
          value={activeNote.body}
          //onChange={(value) => onEditField("body", value)}
        />
      </div>
      <div className="app-main-note-preview">
        <button onClick={onDeleteClick} className="delete-button">
          Delete
        </button>
        <button onClick={onSaveClick} className="save-button">
          {saved ? "Edit" : "Save"}
        </button>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;