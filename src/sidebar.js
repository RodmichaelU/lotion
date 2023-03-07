const Sidebar = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
  }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
    return (
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <button onClick={onAddNote} style={{ fontSize: "2em", color: "black" }}>
            &#43;
          </button>
        </div>
        {activeNote ? (
          <div className="app-sidebar-notes">
            {sortedNotes.map(({ id, title, body, lastModified }, i) => (
              <div
                className={`app-sidebar-note ${id === activeNote && "active"}`}
                onClick={() => setActiveNote(id)}
              >
                <div className="sidebar-note-title">
                  <strong>{title}</strong>
                  
                </div>

                
                <p>{body && body.substr(0, 100) + "..."}</p>
                <small className="note-meta">
                  Last Modified{" "}
                  {new Date(lastModified).toLocaleDateString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-note">No Note Yet</div>
        )}
      </div>
    );
  };
  
  export default Sidebar;