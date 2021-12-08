import Column from 'components/Column/Column'
import React, {useState, useEffect} from 'react'
import {Container, Draggable} from 'react-smooth-dnd'
import {isEmpty} from 'lodash'
import './BoardContent.scss'
import {initialData} from 'actions/initialData'
import {mapOrder} from 'utilities/sorts'

function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    useEffect(() => {
        const boardFromDB = initialData.boards.find((board) => board.id === 'board-1')

        //sort column
        // boardFromDB.columns.sort(function (a, b) {
        //     return boardFromDB.columns.indexOf(a.id) - boardFromDB.columnOrder.indexOf(b.id)
        // })

        if (boardFromDB) {
            setBoard(boardFromDB)
            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
        return () => {}
    }, [])

    if (isEmpty(board)) {
        return <div>Board not found</div>
    }

    const onColumnDrop = (dropResult) => {}

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
                            <Column column={column} />
                        </Draggable>
                    )
                })}
            </Container>
        </div>
    )
}

export default BoardContent
