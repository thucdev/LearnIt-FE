export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'Todo Cards',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7'],
                    cards: [
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title card 1',
                            cover: 'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?size=626&ext=jpg',
                        },
                        {id: 'card-2', boardId: 'board-1', columnId: 'column-1', title: 'Title card 2', cover: null},
                        {id: 'card-3', boardId: 'board-1', columnId: 'column-1', title: 'Title card 3', cover: null},
                        {id: 'card-4', boardId: 'board-1', columnId: 'column-1', title: 'Title card 4', cover: null},
                        {id: 'card-5', boardId: 'board-1', columnId: 'column-1', title: 'Title card 5', cover: null},
                        {id: 'card-6', boardId: 'board-1', columnId: 'column-1', title: 'Title card 6', cover: null},
                        {id: 'card-7', boardId: 'board-1', columnId: 'column-1', title: 'Title card 7', cover: null},
                    ],
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'Thucidol',
                    cardOrder: ['card-8', 'card-9', 'card-10', 'card-11', 'card-12'],
                    cards: [
                        {id: 'card-8', boardId: 'board-1', columnId: 'column-2', title: 'Title card 1', cover: null},
                        {id: 'card-9', boardId: 'board-1', columnId: 'column-2', title: 'Title card 2', cover: null},
                        {id: 'card-10', boardId: 'board-1', columnId: 'column-2', title: 'Title card 3', cover: null},
                        {id: 'card-11', boardId: 'board-1', columnId: 'column-2', title: 'Title card 4', cover: null},
                        {id: 'card-12', boardId: 'board-1', columnId: 'column-2', title: 'Title card 5', cover: null},
                    ],
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Cards list',
                    cardOrder: ['card-13', 'card-14', 'card-15'],
                    cards: [
                        {id: 'card-13', boardId: 'board-1', columnId: 'column-1', title: 'Title card 1', cover: null},
                        {id: 'card-14', boardId: 'board-1', columnId: 'column-1', title: 'Title card 2', cover: null},
                        {id: 'card-15', boardId: 'board-1', columnId: 'column-1', title: 'Title card 3', cover: null},
                    ],
                },
            ],
        },
    ],
}
