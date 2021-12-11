import Cards from 'components/Cards/Cards'
import React from 'react'
import {Container, Draggable} from 'react-smooth-dnd'
import {cloneDeep} from 'lodash'
import {Dropdown, Form, Button} from 'react-bootstrap'

import './Column.scss'
import {mapOrder} from 'utilities/sorts'
import {MODAL_ACTION_CONFIRM} from 'utilities/constants'
import {ConfirmModal} from 'components/Common/ConfirmModal'
import {useState, useEffect, useRef} from 'react'
import {selectAllInlineText, setContentAfterPressEnter} from 'utilities/contentEditable'

function Column(props) {
    const {column, onCardDrop, onUpdateColumn} = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [columnTitle, setColumnTitle] = useState('')

    const [openNewCard, setOpenNewCard] = useState(false)
    const toggleOpenNewCard = () => setOpenNewCard(!openNewCard)

    const newCardTextAreaRef = useRef(null)

    const [newCardTitle, setNewCardTitle] = useState('')
    const onNewCardTitleChange = (event) => setNewCardTitle(event.target.value)

    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])

    useEffect(() => {
        if (newCardTextAreaRef && newCardTextAreaRef.current) {
            newCardTextAreaRef.current.focus()
            newCardTextAreaRef.current.select()
        }
    }, [openNewCard])

    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

    const onConfirmModalAction = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true,
            }

            onUpdateColumn(newColumn)
        }
        toggleShowConfirmModal()
    }

    const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)
    const handleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle,
        }

        onUpdateColumn(newColumn)
    }

    const addNewCard = () => {
        if (!newCardTitle) {
            newCardTextAreaRef.current.focus()
            return
        }

        const newCardToAdd = {
            id: Math.random().toString(36).substr(2, 5), // remove when call API
            boardId: column.boardId,
            columnId: column.id,
            title: newCardTitle.trim(),
            cover: null,
        }

        let newColumn = cloneDeep(column)
        newColumn.cards.push(newCardToAdd)
        newColumn.cardOrder.push(newCardToAdd.id)
        onUpdateColumn(newColumn)
        setNewCardTitle('')
        toggleOpenNewCard()
    }

    return (
        <div className='column'>
            <header className='column-drag-handle'>
                <div className='column-title'>
                    <Form.Control
                        size='sm'
                        type='text'
                        placeholder='Add new column...'
                        className='trello-content-editable'
                        value={columnTitle}
                        spellCheck='false'
                        onClick={selectAllInlineText}
                        onChange={handleColumnTitleChange}
                        onBlur={handleColumnTitleBlur}
                        onKeyDown={setContentAfterPressEnter}
                        onMouseDown={(e) => e.preventDefault()}
                    />
                </div>
                <div className='column-dropdown-actions'>
                    <Dropdown>
                        <Dropdown.Toggle id='dropdown-basic' size='sm' className='dropdown-btn'></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={toggleOpenNewCard}>Add Card</Dropdown.Item>
                            <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column...</Dropdown.Item>
                            <Dropdown.Item>Remove all card...</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className='card-list'>
                <Container
                    groupName='thucdo-dev'
                    onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
                    getChildPayload={(index) => cards[index]}
                    dragClass='card-ghost'
                    dropClass='card-ghost-drop'
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview',
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Cards key={index} card={card} />
                        </Draggable>
                    ))}
                </Container>
                {openNewCard && (
                    <div className='add-new-card-area'>
                        <Form.Control
                            size='sm'
                            as='textarea'
                            rows='3'
                            placeholder='Enter a title for this card...'
                            className='textarea-enter-new-card'
                            ref={newCardTextAreaRef}
                            value={newCardTitle}
                            onChange={onNewCardTitleChange}
                            onKeyDown={(event) => event.key === 'Enter' && addNewCard()}
                        />
                    </div>
                )}
            </div>
            <footer>
                {openNewCard && (
                    <div className='add-new-card-action'>
                        <Button variant='success' size='sm' onClick={addNewCard}>
                            Add Card
                        </Button>
                        <span className='cancel-item' onClick={toggleOpenNewCard}>
                            <i className='fa fa-trash' />
                        </span>
                    </div>
                )}
                {!openNewCard && (
                    <div className='footer-actions' onClick={toggleOpenNewCard}>
                        <i className='fa fa-plus icon' />
                        Add another card
                    </div>
                )}
            </footer>

            <ConfirmModal
                show={showConfirmModal}
                title='Remove column'
                onAction={onConfirmModalAction}
                content={`Are you sure to remove <strong>${column.title}</strong>!. All related cards also be removed`}
            />
        </div>
    )
}

export default Column
