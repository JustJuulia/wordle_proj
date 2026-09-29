import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Word_write from './word_write.tsx'
function App() {


  return (
    <>
      <section className="mainsection">
        <div className="wordle_title">  WORDLE </div>
        <br/>
        <div className="wordle_tries">
        <Word_write />
        </div>
      </section>
    </>
  )
}

export default App
