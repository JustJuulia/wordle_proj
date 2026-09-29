import { useState, useRef, useEffect } from 'react';

function Word_write() {
    const [letters, setLetters] = useState<string[][]>([
        ['', '', '', '', '']
    ]);

    const [currentRow, setCurrentRow] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

    useEffect(() => {
        inputRefs.current[0]?.[0]?.focus();
    }, []);

    const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key;
        if (event.ctrlKey || event.metaKey || event.altKey) {
            return;
        }
        if (/^[a-zA-Z]$/.test(key)) {
            event.preventDefault();

            setLetters((prevLetters) => {
                const newLetters = [...prevLetters];
                newLetters[currentRow] = [...newLetters[currentRow]];
                newLetters[currentRow][currentIndex] = key.toUpperCase();

                return newLetters;
            });

            if (currentIndex < 4) {
                setCurrentIndex(prev => prev + 1);

                inputRefs.current[currentRow]?.[currentIndex + 1]?.focus();
            }

            return;
        }
        if (key === 'Backspace') {
            event.preventDefault();

            if (letters[currentRow][currentIndex] !== '') {
                setLetters((prevLetters) => {
                    const newLetters = [...prevLetters];
                    newLetters[currentRow] = [...newLetters[currentRow]];
                    newLetters[currentRow][currentIndex] = '';

                    return newLetters;
                });
            } else if (currentIndex > 0) {
                setLetters((prevLetters) => {
                    const newLetters = [...prevLetters];
                    newLetters[currentRow] = [...newLetters[currentRow]];
                    newLetters[currentRow][currentIndex - 1] = '';

                    return newLetters;
                });

                setCurrentIndex(prev => prev - 1);

                inputRefs.current[currentRow]?.[currentIndex - 1]?.focus();
            }

            return;
        }
        if (key === 'Enter') {
            if (letters[currentRow].every(letter => letter !== '')) {
                event.preventDefault();

                console.log(
                    'Word:',
                    letters[currentRow].join('')
                );

                setLetters((prevLetters) => [
                    ...prevLetters,
                    ['', '', '', '', '']
                ]);

                setCurrentRow(prevRow => prevRow + 1);
                setCurrentIndex(0);
                setTimeout(() => {
                    inputRefs.current[currentRow + 1]?.[0]?.focus();
                }, 0);
            }

            return;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [letters, currentRow, currentIndex]);

    return (
        <div className="wordguess_boxes">
            {letters.map((row, rowIdx) => (
                <div className="wordguess_row" key={rowIdx}>
                    {row.map((letter, idx) => (
                        <input
                            key={idx}
                            ref={(element) => {
                                if (!inputRefs.current[rowIdx]) {
                                    inputRefs.current[rowIdx] = [];
                                }

                                inputRefs.current[rowIdx][idx] = element;
                            }}
                            className="letter-box"
                            value={letter}
                            readOnly
                            tabIndex={-1}
                            onMouseDown={(e) => {
                                e.preventDefault();
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Word_write;