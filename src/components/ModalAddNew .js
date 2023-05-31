import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../service/UserService';
import {toast} from 'react-toastify'

const ModalAddNew = (props) => {
    const { show, handleClose,handleUpdateTable } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const handleSaveUsers = async () => {
     let res= await postCreateUser();
     if( res && res.id) {
        handleClose();
        setName('');
        setJob('');
        handleUpdateTable({first_name:name, id:res.id})
     }
     toast.success('Add new user succed')
    }

    return (<>
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                        <div className="mb-3">
                            <label 
                            htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input
                            value={name}
                            onChange={(event) => setName(event.target.value )}
                            type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label"> job</label>
                            <input 
                            value={job}
                            onChange={(event) => setJob(event.target.value )}
                            type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 form-check">
                        </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUsers}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </>)
}
export default ModalAddNew;