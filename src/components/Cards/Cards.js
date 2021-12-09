import React from 'react'
import './Cards.scss'

function Cards(props) {
    const {card} = props
    return (
        <div className='card-item'>
            {card && card.cover && <img src={card.cover} alt='' className='card-cover' draggable='false' />}
            {card.title}
        </div>
    )
}

export default Cards
