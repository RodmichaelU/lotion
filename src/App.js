import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./index.css";
import Main from "./main";
import Sidebar from "./sidebar";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  window.history.replaceState( {} , 'notes', '/notes' );

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    
  /*Tried to implement routing. Couldn't get it to work
  <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Edit />}></Route>
          <Route path="/save" element={<Save />}></Route>
           <Route path="/notes" element={<Notes />}></Route>
          <Route path="/noNotes" element={<noNotes />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>*/

    <div className="App">
      <header className="header">
        <h1>Lotion</h1>
        <h2>Like Notion, but worse</h2>
        <button onClick={toggleSidebar} style={{ position: 'absolute', top: '40px', left: '40px', fontSize: '3em', color:"black" }}>&#9776;</button>
      </header>
      <div className="content">
        {sidebarVisible && (
          <Sidebar
            notes={notes}
            onAddNote={onAddNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        )}
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote} />
      </div>
    </div>
  );
}

export default App;