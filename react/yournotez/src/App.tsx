import { useEffect, useRef, useState } from "react"
import jsPDF from "jspdf"

function App() {
	const [notes, setNotes] = useState<string[]>([])
	const [currLen, setCurrLen] = useState<number>(-1)
	const [noteInput, setNoteInput] = useState<string>("")
	const [showSummary, setShowSummary] = useState<boolean>(false)
	const [summaryText, setSummaryText] = useState<string>("")
	const inputRef = useRef<HTMLInputElement>(null)
	const colors = ["#90EE90", "#94B3EC", "#FFA500", "#F98181", "#FFC0CB"]

	// useEffect(() => {}, [])

	useEffect(() => {
		const analytix = async () => {
			try {
				await fetch("https://nsk1755server.com/yournotez")
			} catch (err) {
				console.log(err)
			}
		}
		const getNotes = () => {
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
		}
		analytix()

		getNotes()
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

		let y = 20

		notes.reverse().forEach((note) => {
			const text = note.slice(0, -7)
			const splitText = doc.splitTextToSize(text, 180)
			doc.text(splitText, 10, y)

			// y = splitText.length * 7
			const textHeight = doc.getTextDimensions(splitText).h // Dynamically get height
			y += textHeight + 5 // Add some padding to prevent overlap
		})
		// console.log("after loop")

		doc.save("notes.pdf")
		// console.log("after save")
	}

	const summarize = () => {
		// summarize w AI ofc
		if (notes.length === 0) {
			setSummaryText("No notes available to summarize.")
		} else {
			// For now, generate a simple summary by joining the first few notes.
			const summary =
				notes
					.slice(0, 3)
					.map((note) => note.slice(0, -7)) // Remove color code
					.join(". ") + "..."
			setSummaryText(summary)
		}
		setShowSummary(true)
	}

	const handleClick = (index: number) => {
		console.log(notes[index].slice(0, -7) + " clicked")
	}

	return (
		<>
			<div className="header">
				<button onClick={handleExport}>Export to PDF</button>
				{/* &ensp;&ensp; */}
				{/* <button onClick={() => console.log("export to drive")}>
					Export to Google Drive
				</button> */}
				<button onClick={summarize}>Summarize</button>
				{/* &ensp;&ensp; */}
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
								onClick={() => handleClick(index)}
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

				{/* Summary Modal */}
				{showSummary && (
					<div
						style={{
							position: "fixed",
							top: "50%",
							left: "50%",
							display: "flex",
							// alignItems: "center",
							// justifyContent: "center",
							justifyContent: "flex-start",
							flexDirection: "column",
							textAlign: "center",
							width: "400px",
							height: "200px",
							border: "2px solid black",
							transform: "translate(-50%, -50%)",
							backgroundColor: "white",
							padding: "15px",
							boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
							borderRadius: "10px",
							gap: "8px",
							zIndex: 1000,
						}}
					>
						<h3>Summary</h3>
						<p>{summaryText}</p>
						<button onClick={() => setShowSummary(false)}>Close</button>
					</div>
				)}
			</div>
		</>
	)
}

export default App
