import { useEffect, useRef, useState } from "react";

function App() {
  // const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [currLen, setCurrLen] = useState<number>(-1);
  const [noteInput, setNoteInput] = useState<string>("");
  // const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const colors = ["#90EE90", "#94B3EC", "#FFA500", "#F98181", "#FFC0CB"];

  // setCurrLen, setNoteInput are asynchronous

  // useEffect(() => {
  //   if (darkMode) {
  //   }
  // });

  useEffect(() => {
    // try {
    // localStorage.setItem("test", "local storage");
    // localStorage.removeItem("test");
    // console.log("localstorage");
    // } catch (error) {
    //   console.log(error);
    // }
    // load the indexeddb and fill out notes before user starts adding

    // let's worry about indexeddb later, let's implement the localStorage solution
    // we made in the last version.
    // localStorage.setItem("0", "3")
    // localStorage.setItem("3", "one")
    // localStorage.setItem("2", "two")
    // localStorage.setItem("1", "three")
    // console.log(localStorage.getItem("0"))
    // console.log(localStorage.getItem("1"))
    // console.log(localStorage.getItem("2"))
    // console.log(localStorage.getItem("3"))

    var numNotes = -1;
    let localArr: string[] = [];
    if (localStorage.getItem("0") === null) {
      localStorage.setItem("0", "0");
      setCurrLen(0);
      // console.log(0)
      // setCurrLen(0)
    } else {
      // numNotes works.
      numNotes = Number(localStorage.getItem("0"));
      // console.log(Number(numNotes))
      setCurrLen(numNotes);
      for (let i = 1; i <= numNotes; i++) {
        let val = localStorage.getItem(String(i));
        if (val !== null) {
          console.log(val);
          localArr.push(val);
        } else {
          console.log("null string");
        }
      }
    }

    setNotes(localArr.reverse());
    // console.log(notes)
    // console.log("after effects, currLen = " + currLen)
    inputRef.current?.focus();
    // textAreaRef.current?.focus()
  }, []);

  // Math.floor(Math.random() * this.colors.length)
  const getRandomColor = (): number => {
    return Math.floor(Math.random() * colors.length);
  };

  const addNote = (): void => {
    if (noteInput.trim()) {
      // localStorage.setItem(String(currLen), noteInput.trim())
      const nextIndex = currLen + 1;
      const randomColor = colors[getRandomColor()];
      console.log(randomColor);
      localStorage.setItem(nextIndex + "", noteInput.trim() + randomColor);
      //
      localStorage.setItem("0", nextIndex + "");

      setNotes((prevNotes: string[]) => [
        noteInput.trim() + randomColor,
        ...prevNotes,
      ]);
      setCurrLen(nextIndex);
      setNoteInput("");
      inputRef.current?.focus();
      // textAreaRef.current?.focus()
    }
  };

  // this works!
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line
      addNote();
    }
  };

  // works!
  const clear = () => {
    localStorage.clear();
    setNotes([]);
    inputRef.current?.focus();
    // textAreaRef.current?.focus()
  };

  // const log = (s:string):void => {
  //   console.log(s)
  // }

  // useEffect(() => {
  //   addNote("one")
  //   addNote("two")
  //   addNote("three")
  //   addNote("four")
  //   addNote("five")
  // }, [])

  return (
    <>
      <div className="header">
        <button onClick={() => console.log("export to pdf")}>
          Export to PDF
        </button>
        &ensp;&ensp;
        <button onClick={() => console.log("export to drive")}>
          Export to Google Drive
        </button>
        &ensp;&ensp;
      </div>
      <div>
        <h1>yournotez.com</h1>
      </div>

      <div>
        <p>Browser Notes</p>
      </div>

      <div>
        <div>
          {/* <textarea ref={textAreaRef} value={noteInput} placeholder="Enter your notes here ..."
        onChange={(e) => setNoteInput(e.target.value)}
        onKeyDown={handleKeyDown}
        ></textarea><br></br> */}
          <input
            type="text"
            ref={inputRef}
            value={noteInput}
            placeholder="Enter your notes here ..."
            onChange={(e) => setNoteInput(e.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
          <br></br>
          <br></br>
          <button onClick={addNote}>Enter Note</button>&ensp;&ensp;
          <button onClick={clear}>Delete All</button>&ensp;&ensp;
          {/* <button>Download PDF</button>&ensp;&ensp;
        <button>Export to Google Drive</button>&ensp;&ensp; */}
        </div>
        <div>
          {/* {notes.slice().reverse().map((note, index) => ( */}
          {/* {notes.map((note, index) => (
            <p key={index}>{note}</p>
          ))} */}
          {notes.map((note, index) => {
            const color = note.slice(-7);
            const text = note.slice(0, -7);
            return (
              <p key={index} style={{ backgroundColor: color }}>
                {text}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
