import { ActionBtn } from "../../components/atoms/actionBtn"
import { TextField } from "../../components/atoms/Textfield"


export const Login = () => {
    return (
        <div className="bg-[#f0f0f5] min-h-screen flex flex-col justify-center items-center ">
            <div className="bg-white p-[2%] rounded-xl w-[25%] shadow-[2px_2px_6px_2px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
                <div className="font-bold flex justify-center text-[25px]">Login</div>
                <div className="flex flex-col justify-center gap-[10px]">
                    <div className="text-[15px] text-gray-400">
                        Email
                    </div>
                    <TextField variant="primary" />
                    <div className="text-[15px] text-gray-400">
                        Password
                    </div>
                    <TextField variant="primary" />
                    <div className="flex justify-center">
                        <ActionBtn label="Login" variant="secondary" width="[100px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}