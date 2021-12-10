//onkeyDown
export const setContentAfterPressEnter = (e) => {
    if (e.key === 'Enter') {
        e.target.blur()
    }
}

// select All input value

export const selectAllInlineText = (e) => {
    e.target.focus()
    e.target.select()
}
