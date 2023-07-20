import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";
import { ReactComponent as Search } from "../assests/search.svg";
import { ReactComponent as up } from "../assests/arrowDown.svg";
import { ReactComponent as down } from "../assests/arrowUp.svg";
import $ from "jquery";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [upside, setUpside] = useState(true);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await fetch("/mainapp/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "GET",
        }),
      });
      const data = await response.json();
      console.log("data: ", data);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSearchClick = async () => {
    try {
      const response = await fetch("/mainapp/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "SEARCH",
          body: searchTerm,
        }),
      });
      const data = await response.json();
      console.log("data: ", data);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const symbolChange = () => {
    if (upside) {
      return <span onClick={handleSort}>&#x25B2;</span>;
    } else if (!upside) {
      return <span onClick={handleSort}>&#x25BC;</span>;
    }
  };

  const handleSort = async () => {
    try {
      const response = await fetch("/mainapp/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-HTTP-Method-Override": "POST",
        },
        body: JSON.stringify({
          method: "SORT",
          body: upside,
        }),
      });
      const data = await response.json();
      console.log("data: ", data);
      setUpside(!upside);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title"> &#9782; Notes</h2>
        <div>
          {symbolChange()}
        </div>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div onClick={handleSearchClick}>
          <Search />
        </div>
      </div>
      <div className="notes-list">
        {notes ? (
          notes.map((note, index) => <ListItem key={index} note={note} />)
        ) : (
          <></>
        )}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesList;
