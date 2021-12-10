import Cards from 'components/Cards/Cards'
import React from 'react'
import {Container, Draggable} from 'react-smooth-dnd'
import './Column.scss'
import {Dropdown, Form} from 'react-bootstrap'
import {mapOrder} from 'utilities/sorts'
import {MODAL_ACTION_CONFIRM} from 'utilities/constants'
import {ConfirmModal} from 'components/Common/ConfirmModal'
import {useState, useEffect, useCallback} from 'react'
import {selectAllInlineText, setContentAfterPressEnter} from 'utilities/contentEditable'

function Column(props) {
    const {column, onCardDrop, onUpdateColumn} = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [columnTitle, setColumnTitle] = useState('')

    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])
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

    const handleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])
    const handleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle,
        }

        onUpdateColumn(newColumn)
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
                            <Dropdown.Item>Add Card</Dropdown.Item>
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
            </div>
            <footer>
                <div className='footer-actions'>
                    <i className='fa fa-plus icon' />
                    Add another card
                </div>
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
