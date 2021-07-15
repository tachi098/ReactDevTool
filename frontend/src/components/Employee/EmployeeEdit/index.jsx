import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from "@material-ui/core"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { updateEmployees } from "../../../store/actions/EmoloyeeAction";

const EmployeeEdit = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [employee, ] = useState(location.state.employee);
    const { register, formState: { errors }, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: employee.name,
            phone: employee.phone,
            address: employee.address,
            email: employee.email,
            birthday: employee.birthday
        }
    });


    const onSubmit = (data) => {
        data.birthday = new Date(data.birthday.replace(/-/g,"/"));
        dispatch(updateEmployees(data));
        history.push("/");
    };

    return (
        <>
            <h1>Sửa thông tin nhân viên</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <input  {...register("id")} defaultValue={employee.id} hidden/>
                    <FormControl style={{ margin: 12 }} fullWidth error={errors.name?.message && true}>
                        <InputLabel htmlFor="component-simple">Tên nhân viên</InputLabel>
                        <Input
                            id="component-simple"
                            placeholder={"Nhập tên"}
                            defaultValue={employee.name}
                            {...register("name", { required: "Tên không được để trống", minLength: { value: 6, message: "Tên phải hơn 10 ký tự" } })}
                            onChange={e => {setValue("name", e.target.value)}}
                        />
                        {errors.name?.message &&
                            <FormHelperText id="component-error-text">{errors.name?.message}</FormHelperText>
                        }
                    </FormControl>
                    <FormControl style={{ margin: 12 }} fullWidth error={errors.phone?.message && true}>
                        <InputLabel htmlFor="component-simple">Số điện thoại</InputLabel>
                        <Input
                            id="component-simple"
                            placeholder={"Nhập số điện thoại"}
                            defaultValue={employee.phone}
                            {...register("phone", { required: "Số điện thoại không được để trống", pattern: { value: /[0]{1}[1-9]{1}[0-9]{8}/, message: "Số điện thoại không hợp lệ" } })}
                            onChange={e => {setValue("phone", e.target.value)}}
                        />
                        {errors.phone?.message &&
                            <FormHelperText id="component-error-text">{errors.phone?.message}</FormHelperText>
                        }
                    </FormControl>
                    <FormControl style={{ margin: 12 }} fullWidth error={errors.email?.message && true}>
                        <InputLabel htmlFor="component-simple">Email</InputLabel>
                        <Input
                            id="component-simple"
                            placeholder={"Nhập email"}
                            defaultValue={employee.email}
                            {...register("email", { required: "Email không được để trống", pattern: { value: /\S+@\S+\.\S+/, message: "Email không hợp lệ" } })}
                            onChange={e => {setValue("email", e.target.value)}}
                        />
                        {errors.email?.message &&
                            <FormHelperText id="component-error-text">{errors.email?.message}</FormHelperText>
                        }
                    </FormControl>
                    <FormControl style={{ margin: 12 }} fullWidth>
                        <TextField
                            id="date"
                            label="Ngày sinh"
                            fullWidth
                            type="date"
                            defaultValue={employee.birthday}
                            {...register("birthday")}
                            onChange={e => {setValue("birthday", e.target.value)}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <Button type="submit" style={{ margin: 12 }} variant="contained" color="primary">
                        Cập nhật
                    </Button>
                </div>
            </form>
        </>
    )
}

export default EmployeeEdit