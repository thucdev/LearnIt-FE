import React from 'react'
import './Cards.scss'

function Cards(props) {
    const {card} = props
    return (
        <li className='card-item'>
            {card && card.cover && <img src={card.cover} alt='' className='card-cover' />}
            {card.title}
        </li>
    )
}

export default Cards
