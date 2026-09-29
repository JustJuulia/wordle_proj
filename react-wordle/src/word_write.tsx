import { useState, useRef } from 'react'
function Word_write() {
    const [letters, setLetters] = useState<string[]>(['', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const handleChange = (idx: number, value: string) => {
        const letter = value.slice(-1).toUpperCase();
        const newLetters = [...letters];
        newLetters[idx] = letter;
        setLetters(newLetters);
        if (letters && idx < 5) {
            inputRefs.current[idx + 1]?.focus();
        }
    };
    const handleKeyDown = (idx: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace") {
            event.preventDefault();
            const newLetters = [...letters];
            if (letters[idx]) {
                newLetters[idx] = "";
                setLetters(newLetters);
            }
            else if (idx > 0) {
                newLetters[idx - 1] = "";
                setLetters(newLetters); inputRefs.current[idx - 1]?.focus();
            }

        }
    };
        return (
            <div className="wordguess_boxes">
                {letters.map((letter, idx) => (
                    <input key={idx}
                        ref={(element) => {
                            inputRefs.current[idx] = element;
                        }}
                        className="letter-box"
                        value={letter}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        maxLength={1} />))}
            </div>
        )
    }
    export default Word_write;