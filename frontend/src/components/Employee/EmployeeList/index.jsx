import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteEmployees, fetchEmployees } from '../../../store/actions/EmoloyeeAction';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import { store } from '../../../store';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { employees } = useSelector((state) => state.employee);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const onEditEmployee  = (emp) => {
        history.push("/employee/edit", { employee: emp});
    }

    const onDeleteEmployee = (id) => {
        dispatch(deleteEmployees(id));
    }

    return (
        <>
            <h1>Danh sách nhân viên</h1>
            <TableContainer component={Paper}>
                <Table style={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã nhân viên</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Ngày sinh</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell component="th" scope="row">
                                    {emp.id}
                                </TableCell>
                                <TableCell>{emp.name}</TableCell>
                                <TableCell>{emp.email}</TableCell>
                                <TableCell>{emp.phone}</TableCell>
                                <TableCell>{emp.birthday}</TableCell>
                                <TableCell>
                                    <Button style={{marginRight: 10}} variant="contained" color="secondary" onClick={() => { onDeleteEmployee(emp.id) }}>
                                        Xoá
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => { onEditEmployee(emp) }}>
                                        Sửa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default EmployeeList