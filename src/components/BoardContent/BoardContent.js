import Column from 'components/Column/Column'
import React, {useState, useEffect, useRef} from 'react'
import {Container, Draggable} from 'react-smooth-dnd'
import {isEmpty} from 'lodash'
import {Container as BootstrapContainer, Col, Row, Form, Button} from 'react-bootstrap'
import './BoardContent.scss'
import {initialData} from 'actions/initialData'
import {mapOrder} from 'utilities/sorts'
import {applyDrag} from 'utilities/dragDrop'

function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [openNewColumn, setOpenNewColumn] = useState(false)
    const toggleOpenNewColumn = () => setOpenNewColumn(!openNewColumn)

    const [newColumnTitle, setNewColumnTitle] = useState('')
    const onNewColumnTitleChange = (event) => setNewColumnTitle(event.target.value)

    const newColumInputRef = useRef(null)

    useEffect(() => {
        const boardFromDB = initialData.boards.find((board) => board.id === 'board-1')

        if (boardFromDB) {
            setBoard(boardFromDB)
            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, [])

    useEffect(() => {
        if (newColumInputRef && newColumInputRef.current) {
            newColumInputRef.current.focus()
            newColumInputRef.current.select()
        }
    }, [openNewColumn])

    if (isEmpty(board)) {
        return <div>Board not found</div>
    }

    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        let newBoard = {...board}

        console.log('new    column', newColumns)
        newColumns = applyDrag(newColumns, dropResult)

        newBoard.columnOrder = newColumns.map((column) => column.id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
    }

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removeIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find((column) => column.id === columnId)

            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map((item) => item.id)

            setColumns(newColumns)
        }
    }

    const addNewColumn = () => {
        if (!newColumnTitle) {
            newColumInputRef.current.focus()
            return
        }

        const newColumnToAdd = {
            id: Math.random().toString(36).substr(2, 5), // remove when call API
            boardId: board.id,
            title: newColumnTitle.trim(),
            cardOrder: [],
            cards: [],
        }

        let newColumns = [...columns]
        newColumns.push(newColumnToAdd)

        let newBoard = {...board}

        newBoard.columnOrder = newColumns.map((column) => column.id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
        setNewColumnTitle('')
        toggleOpenNewColumn()
    }

    const onUpdateColumn = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate.id

        const newColumns = [...columns]
        const columnIndexToUpdate = newColumns.findIndex((item) => item.id === columnIdToUpdate)
        if (newColumnToUpdate._destroy) {
            //remove column
            newColumns.splice(columnIndexToUpdate, 1)
        } else {
            //update column
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
        }

        let newBoard = {...board}

        newBoard.columnOrder = newColumns.map((column) => column.id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
    }

    return (
        <div className='board-content'>
            <Container
                orientation='horizontal'
                onDrop={onColumnDrop}
                getChildPayload={(index) => columns[index]}
                dragHandleSelector='.column-drag-handle'
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview',
                }}
            >
                {columns.map((column, index) => {
                    return (
                        <Draggable key={index}>
                            <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
                        </Draggable>
                    )
                })}
            </Container>

            <BootstrapContainer className='trello-container'>
                {!openNewColumn && (
                    <Row>
                        <Col className='add-new-column' onClick={toggleOpenNewColumn}>
                            <i className='fa fa-plus icon' />
                            Add another column
                        </Col>
                    </Row>
                )}
                {openNewColumn && (
                    <Row>
                        <Col className='enter-new-column'>
                            <Form.Control
                                size='sm'
                                type='text'
                                placeholder='Add new column...'
                                className='input-enter-new-column'
                                ref={newColumInputRef}
                                value={newColumnTitle}
                                onChange={(event) => onNewColumnTitleChange(event)}
                                onKeyDown={(event) => event.key === 'Enter' && addNewColumn()}
                            />
                            <Button variant='success' size='sm' onClick={addNewColumn}>
                                Add Column
                            </Button>
                            <span className='cancel-item' onClick={toggleOpenNewColumn}>
                                <i className='fa fa-trash' />
                            </span>
                        </Col>
                    </Row>
                )}
            </BootstrapContainer>
        </div>
    )
}

export default BoardContent
