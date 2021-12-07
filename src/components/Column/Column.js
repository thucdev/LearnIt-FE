import Tasks from 'components/Tasks/Tasks'
import React from 'react'
import './Column.scss'

function Column() {
    return (
        <div className='column'>
            <header>Brainstorm</header>
            <ul className='task-list'>
                <Tasks />
                <li className='task-item'>Add what would you like to work on below</li>
                <li className='task-item'>Add what would you like to work on below</li>
                <li className='task-item'>Add what would you like to work on below</li>
                <li className='task-item'>Add what would you like to work on below</li>
                <li className='task-item'>Add what would you like to work on below</li>
            </ul>
            <footer>Add another card</footer>
        </div>
    )
}

export default Column
