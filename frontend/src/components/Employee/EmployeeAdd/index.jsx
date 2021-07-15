import { Button, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core"
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addEmployees } from "../../../store/actions/EmoloyeeAction";

const EmployeeAdd = () => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, control } = useForm({
        defaultValues: {
            birthday: "2017-05-24"
        }
    });
    const history = useHistory();

    const onSubmit = (data) => {
        data.birthday = new Date(data.birthday.replace(/-/g,"/"));
        dispatch(addEmployees(data));
        history.push("/");
    };

    return (
        <>
            <h1>Thêm nhân viên</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl style={{ margin: 12 }} fullWidth error={errors.name?.message && true}>
                        <InputLabel htmlFor="component-simple">Tên nhân viên</InputLabel>
                        <Input
                            id="component-simple"
                            placeholder={"Nhập tên"}
                            {...register("name", { required: "Tên không được để trống", minLength: { value: 6, message: "Tên phải hơn 10 ký tự" } })}
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
                            {...register("phone", { required: "Số điện thoại không được để trống", pattern: { value: /[0]{1}[1-9]{1}[0-9]{8}/, message: "Số điện thoại không hợp lệ" } })}
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
                            {...register("email", { required: "Email không được để trống", pattern: { value: /\S+@\S+\.\S+/, message: "Email không hợp lệ" } })}
                        />
                        {errors.email?.message &&
                            <FormHelperText id="component-error-text">{errors.email?.message}</FormHelperText>
                        }
                    </FormControl>
                    <FormControl style={{ margin: 12 }} fullWidth>
                    <FormControl style={{ margin: 12 }} fullWidth>
                        <Controller
                            name="birthday"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <Input type="date" {...field} />}
                        />
                    </FormControl>
                    </FormControl>
                    <Button type="submit" style={{ margin: 12 }} variant="contained" color="primary">
                        Tạo mới
                    </Button>
                </div>
            </form>
        </>
    )
}

export default EmployeeAdd