import { useEffect, useRef, useState } from "react"
import jsPDF from "jspdf"

function App() {
	const [notes, setNotes] = useState<string[]>([])
	const [currLen, setCurrLen] = useState<number>(-1)
	const [noteInput, setNoteInput] = useState<string>("")
	const inputRef = useRef<HTMLInputElement>(null)
	const colors = ["#90EE90", "#94B3EC", "#FFA500", "#F98181", "#FFC0CB"]

	useEffect(() => {
		var numNotes = -1
		let localArr: string[] = []
		if (localStorage.getItem("0") === null) {
			localStorage.setItem("0", "0")
			setCurrLen(0)
			// console.log(0)
			// setCurrLen(0)
		} else {
			// numNotes works.
			numNotes = Number(localStorage.getItem("0"))
			// console.log(Number(numNotes))
			setCurrLen(numNotes)
			for (let i = 1; i <= numNotes; i++) {
				let val = localStorage.getItem(String(i))
				if (val !== null) {
					// console.log(val)
					localArr.push(val)
				} else {
					console.log("null string")
				}
			}
		}

		setNotes(localArr.reverse())
		inputRef.current?.focus()
		// textAreaRef.current?.focus()
	}, [])

	// Math.floor(Math.random() * this.colors.length)
	const getRandomColor = (): number => {
		return Math.floor(Math.random() * colors.length)
	}

	const addNote = (): void => {
		if (noteInput.trim()) {
			// localStorage.setItem(String(currLen), noteInput.trim())
			const nextIndex = currLen + 1
			const randomColor = colors[getRandomColor()]
			// console.log(randomColor)
			localStorage.setItem(nextIndex + "", noteInput.trim() + randomColor)
			//
			localStorage.setItem("0", nextIndex + "")

			setNotes((prevNotes: string[]) => [
				noteInput.trim() + randomColor,
				...prevNotes,
			])
			setCurrLen(nextIndex)
			setNoteInput("")
			inputRef.current?.focus()
			// textAreaRef.current?.focus()
		}
	}

	// this works!
	// const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault() // Prevents adding a new line
			addNote()
		}
	}

	// works!
	const clear = () => {
		localStorage.clear()
		setNotes([])
		inputRef.current?.focus()
		// textAreaRef.current?.focus()
	}

	const handleExport = () => {
		// use jsPDF to create a PDF of the notes

		// console.log("inside handleExport")

		const doc = new jsPDF()

		doc.setFont("helvetica", "normal")
		doc.setFontSize(12)
		// doc.text("Your Notes", 10, 10)
		// console.log("before loop")

		notes.reverse().forEach((note, index) => {
			const text = note.slice(0, -7) // Remove color code
			doc.text(text, 10, 20 + index * 10)
		})
		// console.log("after loop")

		doc.save("notes.pdf")
		// console.log("after save")
	}

	return (
		<>
			<div className="header">
				<button onClick={handleExport}>Export to PDF</button>
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
					<br></br>
					<br></br>
					{/* <button>Download PDF</button>&ensp;&ensp;
        <button>Export to Google Drive</button>&ensp;&ensp; */}
				</div>
				<div>
					{/* {notes.slice().reverse().map((note, index) => ( */}
					{/* {notes.map((note, index) => (
            <p key={index}>{note}</p>
          ))} */}
					{notes.map((note, index) => {
						const color = note.slice(-7)
						const text = note.slice(0, -7)
						return (
							<p
								key={index}
								style={{
									backgroundColor: color,
									margin: 0,
									padding: 0,
									border: "none",
									height: "25px",
									lineHeight: "25px", // Ensures text stays within 10px height
								}}
							>
								{text}
							</p>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default App
