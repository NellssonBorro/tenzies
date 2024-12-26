// import { useState } from 'react'
import { useState } from 'react'
import './App.css'
import Dice from './Dice'

function App() {
  const [dice, setDice] = useState(() => generateNewDice())
 
  const gameWon = 
    dice.every(die => die.isHeld) &&
    dice.every(die => die.num === dice[0].num)

  function generateNewDice() {
    // OR
    // return new Array(10)
    // .fill(0)
    // .map(() => Math.ceil(Math.random()*6))
    const newDice = []
    for (let i = 0; i < 10; i++) {
      const rand = Math.ceil(Math.random() * 6)
      const obj = {
        num: rand,
        isHeld: false,
        id: i
      }
      newDice.push(obj)
    }
    return newDice
  }
  function rollDice() {
    // setDice(generateNewDice())
    if(gameWon){
      reset()
      return
    }
    setDice(oldDice => {
      return oldDice.map(dice => {
        return !dice.isHeld ?
          { ...dice, num: Math.ceil(Math.random() * 6) }
          : dice
      })
    })
  }

  function holdDice(id) {

    setDice(oldDice => {
      return oldDice.map(dice => {
        return dice.id === id ?
          { ...dice, isHeld: !dice.isHeld } : dice
      })
    })

  }
  function reset() {
    setDice(oldDice =>  oldDice.map(dice =>
      ({ ...dice, isHeld: false, num: Math.ceil(Math.random() * 6) })
      )
    )
    // rollDice()
  }

  const diceEl = dice.map(dieObj => <Dice hold={() => holdDice(dieObj.id)} key={dieObj.id} isHeld={dieObj.isHeld} val={dieObj.num} />)
  return (
    <main >
      <h1 className="font-bold text-3xl">Tenzies</h1>
      <h3 className='w-1/2 text-center mb-4'>
        Roll until all dice are the same. Click on a
        dice to freeze it at it's current value between
        rolls.
      </h3>
      <div className="grid grid-cols-5 gap-5 mb-5">
        {
          diceEl
          // Array.from({ length: 10 }, (_, index) => (
          //   <Dice key={index + 1}  index={index+1} />
          // ))
        }
      </div>
        <button onClick={rollDice} className=' bg-blue-700 text-white p-2 rounded-md'>{gameWon? "New Game" : "Roll Dice"}</button>

    </main>
  )
}

export default App
