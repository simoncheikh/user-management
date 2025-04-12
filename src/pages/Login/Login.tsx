import { useState } from "react";
import { TextFieldVariant } from "../../components/atoms/Textfield";
import { ActionBtn } from "../../components/atoms/actionBtn";
import { TextField } from "../../components/atoms/Textfield";
import { useNavigate } from "react-router";
import { loginApi } from "../../api/loginApi";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError("");
        console.log("test")

        try {
            const result = loginApi(email, password);
            if (result.status !== 200) {
                throw new Error(result.result.message);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f0f0f5] min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white p-[2%] rounded-xl w-[25%] shadow-[2px_2px_6px_2px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
                <div className="font-bold flex justify-center text-[25px]">Login</div>
                <div className="flex flex-col justify-center gap-[10px]">
                    <div className="text-[15px] text-gray-400">
                        Email
                    </div>
                    <TextField
                        name="email"
                        variant={TextFieldVariant.PRIMARY}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="text-[15px] text-gray-400">
                        Password
                    </div>
                    <TextField
                        name="password"
                        variant={TextFieldVariant.PRIMARY}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="flex justify-center mt-4">
                        <ActionBtn
                            label="Login"
                            variant="secondary"
                            width="[100px]"
                            onClick={() => handleLogin()}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}