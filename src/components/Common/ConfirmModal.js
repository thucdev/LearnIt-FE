import {Modal, Button} from 'react-bootstrap'
import Parser from 'html-react-parser'
import {MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM} from 'utilities/constants'

export function ConfirmModal(props) {
    const {title, content, show, onAction} = props
    return (
        <Modal show={show} onHide={() => onAction('close')} backdrop='static' keyboard={false} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title className='h5'>{Parser(title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{Parser(content)} </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => onAction(MODAL_ACTION_CLOSE)}>
                    Close
                </Button>
                <Button variant='primary' onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal
