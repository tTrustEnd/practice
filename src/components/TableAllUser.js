import Table from 'react-bootstrap/Table';
import Input from 'react-bootstrap/Table';
import './TableAllUser.scss'
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../service/UserService';
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/esm/Button';
import ModalAddNew from './ModalAddNew ';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash'
import ModalComfirm from './ModalComfirm';
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { debounce } from 'lodash'
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse'

const TableAllUser = () => {
    const [listUsers, setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState([])
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false)
    const [dataUserDelete, setDataUserDelete] = useState([]);
    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');
    const [keyWord, setKeyWord] = useState('');
    const [dataExport, setDataExport] = useState([])

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEditUser(false);
        setIsShowModalConfirm(false);
    }

    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setListUsers(res.data);
        }

    }
    const handlePageClick = (event) => {
        getUsers(event.selected + 1)

    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    const handleEditUser = (item) => {
        setIsShowModalEditUser(true);
        setDataUserEdit(item);
    }
    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = cloneListUsers.findIndex(item => item.id)
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers)
        toast.success('edit user succced')

    }
    const handleDeleteUser = (item) => {
        setIsShowModalConfirm(true);
        setDataUserDelete(item);
    }
    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id)
        setListUsers(cloneListUsers)
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers)

    }
    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
            setListUsers(cloneListUsers)
        } else {
            getUsers(1);
        }
    }, 100)

    const handleExportCSV = () => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(['Id', 'Email', 'First_name', 'Last_name'])
            listUsers.map(item => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr)
            })
            setDataExport(result)
        }
    }
    const handleImportCSV = (event) => {
        if(event.target && event.target.files[0]){
            let file = event.target.files[0];
            if(event.target && file) {
                if(file.type !== 'text/csv'){
                    toast.error('only file CSV')
                  
                }
            }
                Papa.parse(file, {
                    // header:true,
                    complete: function(results) {
                      let rawCSV = results.data;
                      console.log(rawCSV[0][0])
                      if(rawCSV.length > 1){
                        if( rawCSV[0].length === 4){
                            console.log(rawCSV[0])
                            if(rawCSV[0][0] !== "Id"
                                || rawCSV[0][1] !== "Email"
                                || rawCSV[0][2] !== "First_name"
                                || rawCSV[0][3] !== "Last_name"
                                ){
                                    toast.error('Wrong format file CSV')
                                }
                            else {
                                let result = [];
                                rawCSV.map((item,index)=>{
                                    let obj = {};
                                   obj.id=item[0];
                                   obj.email=item[1];
                                   obj.first_name=item[2];
                                   obj.last_name=item[3];
                                   result.push(obj)
                                })
                                setListUsers(result)
                            }
                        }
                      }
                    }
                });
               
            }
        }
       
    

    return (<>
        <div className='my-3 add-new'>
           <div className='d-flex col-4 sm-3'><span><b>ListUsers:</b></span></div> 
            <div className='d-flex col-sm-3'>

                <CSVLink
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={(event) => handleExportCSV(event)}
                    className='btn btn-primary '
                >
                    <i className="fa-solid fa-file-export"></i>  Export
                </CSVLink>

                <label htmlFor='test' className='btn btn-warning mx-3'
                ><i className="fa-sharp fa-solid fa-cloud-arrow-up"></i> Import
                </label>
                <input hidden={true} id='test' type='file'
                    onChange={(event) => handleImportCSV(event)}
                />


                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddNew(true)}
                ><i className="fa-sharp fa-solid fa-user-plus"></i> Add new user</button>

            </div>
        </div>
        <div className='col-12 col-sm-4 my-3'>
            <input className='form-control' placeholder='Search user by email'
                onChange={(event) => handleSearch(event)}
            />
        </div>
        <div>
            <Table className="customize-table">
                <thead>
                    <tr className='tr'>
                        <th> <span>id</span>
                            <i className="fa-solid fa-arrow-up mx-3"
                                onClick={() => handleSort('desc', 'id')}
                            ></i>
                            <i className="fa-solid fa-arrow-down"
                                onClick={() => handleSort('asc', 'id')}
                            ></i>
                        </th>
                        <th>email</th>
                        <th><span>first_name </span>
                            <i className="fa-solid fa-arrow-up mx-3"
                                onClick={() => handleSort('desc', 'first_name')}
                            ></i>
                            <i className="fa-solid fa-arrow-down"
                                onClick={() => handleSort('asc', 'first_name')}
                            ></i>

                        </th>


                        <th>last_name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button className="btn btn-primary mx-3 "
                                            onClick={() => handleEditUser(item)}
                                        >Edit
                                        </button>
                                        <button className="btn btn-danger"
                                            onClick={() => handleDeleteUser(item)}
                                        >Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={2}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
        />
        <ModalAddNew
            show={isShowModalAddNew}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUser
            show={isShowModalEditUser}
            handleClose={handleClose}
            dataUserEdit={dataUserEdit}
            handleEditUserFromModal={handleEditUserFromModal}
        />
        <ModalComfirm
            show={isShowModalConfirm}
            handleClose={handleClose}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
        />
    </>)
}
export default TableAllUser;