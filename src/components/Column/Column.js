import Cards from 'components/Cards/Cards'
import React from 'react'
import './Column.scss'
import {mapOrder} from 'utilities/sorts'

function Column(props) {
    const {column} = props
    const {cards} = mapOrder(column.cards, column.cardOrder, 'id')
    return (
        <div className='column'>
            <header>{column.title}</header>
            <ul className='card-list'>
                {cards.map((card, index) => (
                    <Cards key={index} card={card} />
                ))}
            </ul>
            <footer>Add another card</footer>
        </div>
    )
}

export default Column
