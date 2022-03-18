import React from 'react'

const BattleSimulator = () => {
    // Maybe pass in props (attacker, defender, max rounds, loadout)

    // Pick random heroes to do battle
    const battleSimulation = (attackerObj, defenderObj) => {
        let attackerDmg = 0
        let defenderDmg = 0
        let maxRound = 100
        let winner = null

        const checkIfWinner = () => {
            if (defenderDmg >= defenderDmg.basehp) {
                winner = attackerObj
            } else if (attackerDmg >= attackerObj.basehp) {
                winner = defenderObj
            }
        }
        for (let round = 1; round <= maxRound; round++) {
            if (winner) { return winner.name }
            defenderDmg += (attackerObj.baseatk - defenderObj.basedef)
            if (checkIfWinner()) { return winner.name }
            attackerDmg += (defenderObj.baseatk - attackerObj.basedef)
            if (round === maxRound) { return `No one` }
        }
    }

    return (
        <div>

        </div>
    )
}

export default BattleSimulator