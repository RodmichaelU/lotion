import ReactMarkdown from "react-markdown";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'


const Main = ({ activeNote, onUpdateNote, onDeleteNote, onCalendarChange }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
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

  const onDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
      onDeleteNote && onDeleteNote(activeNote.id);
    }
  };

  const onCalendarDateChange = (date) => {
    const updatedNote = {
      ...activeNote,
      lastModified: date.getTime(),
    };
    onUpdateNote(updatedNote);
  };

  const onSaveClick = () => {
    const updatedNote = {
      ...activeNote,
      lastModified: Date.now(),
    };
    onUpdateNote(updatedNote);
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

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
          id="body"
          placeholder="Your Note Here"
          value={activeNote.body}
          onChange={(content, delta, source) => {
            if (source === "user") {
              onEditField("body", content);
            }
          }}
        />
      </div>

      <div className="app-main-note-date-picker">
        <label htmlFor="date-picker">Last Modified:</label>
        <input
          type="date"
          id="date-picker"
          value={formatDate(activeNote.lastModified)}
          onChange={(e) => onCalendarDateChange(new Date(e.target.value))}
        />
      </div>

      <div className="app-main-note-delete-button">
        <button onClick={onDeleteClick}>Delete</button>
      </div>

      <div className="app-main-note-save-button">
        <button onClick={onSaveClick}>Save</button>
      </div>
    </div>
  );
};

export default Main;