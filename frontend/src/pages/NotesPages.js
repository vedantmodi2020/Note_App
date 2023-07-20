import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assests/arrow-left.svg";
import { Link } from "react-router-dom";

const NotesPages = () => {
  const { id } = useParams();
  let [note, setNote] = useState(null);

  useEffect(() => {
    handleEffect();
  }, [id]);

  let handleEffect = async () => {
    id !== "new" ? getNote() : console.log("New Entry");
  };

  let getNote = async () => {
    let response = await fetch(`/mainapp/notes/${id}/`,{
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "GET", 
        }),
    });
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async () => {
    let response = fetch(`/mainapp/notes/${id}/`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "PUT", 
          body: note.body, 
        }),
    });
  };

  const CreateNote = async () => {
    try {
      const response = await fetch("/mainapp/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "CREATE", 
          body: note.body, 
        }),
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  let deleteNote = async () => {
    fetch(`/mainapp/notes/${id}/`, {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "DELETE", 
        }),
    });
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link
            to={"/"}
            onClick={() => {
              if (id !== "new" && !note) {
                deleteNote();
              } else if (id !== "new") {
                updateNote();
              } else if (id === "new" && note !== null) {
                CreateNote();
              }
            }}
          >
            <ArrowLeft />
          </Link>
        </h3>
        {id !== "new" ? (
          <Link to={"/"}>
            <button onClick={deleteNote}>Delete Note</button>
          </Link>
        ) : (
          <Link to={"/"}>
            <button
              onClick={() => {
                note !== null
                  ? CreateNote()
                  : console.log("Don't create a empty Note");
              }}
            >
              Done
            </button>
          </Link>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        defaultValue={note?.body}
      ></textarea>
    </div>
  );
};

export default NotesPages;
