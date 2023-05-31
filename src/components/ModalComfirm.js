import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import { deleteUser } from '../service/UserService';
const ModalComfirm = (props) => {
    const { show, handleClose, dataUserDelete,handleDeleteUserFromModal } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const confirmDelete = async(id) => {
        let res= await deleteUser(dataUserDelete);
        if(res && +res.statusCode === 204){
            handleClose();
            handleDeleteUserFromModal(dataUserDelete)
            toast.success('delete user succced')
        }
    }

    return (<>
        <div>
            <Modal
                show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user </Modal.Title>
                </Modal.Header>
                <div className="mb-3">
                    {`Delete user have email =  ${dataUserDelete.email} ?`}
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </>)
}
export default ModalComfirm;