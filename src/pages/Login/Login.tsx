import { useCallback, useState } from "react";
import { TextFieldVariant } from "../../components/atoms/Textfield";
import { ActionBtn } from "../../components/atoms/ActionBtn/ActionBtn";
import { TextField } from "../../components/atoms/Textfield";
import { useNavigate } from "react-router";
import { useSessionStore } from "../../stores/sessionStore/sessionStore";
import { ActionBtnVariant } from "../../components/atoms/ActionBtn/ActionBtn.type";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/login/loginApi";
import { LoadingPage } from "../../components/molecules/Loading/LoadingPage";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const setSession = useSessionStore((s: any) => s.setSession);
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const { accessToken, expiresIn } = data;
      setSession(accessToken, expiresIn);
      navigate('/dashboard');
    },
    onError: (error: any) => {
      setError(error.message || 'Something went wrong.');
    },
  });

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    login({ email, password });
  }, [email, password, login]);

  const isPageLoading = isPending

  if (isPageLoading) {
    return <LoadingPage label={"Logging in"} />;
  }


  return (
    <div className="bg-[#f0f0f5] dark:bg-dark min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-[2%] rounded-xl w-[25%] shadow-[2px_2px_6px_2px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
        <div className="font-bold flex justify-center text-[25px]">Login</div>
        <form onSubmit={handleLogin} className="flex flex-col justify-center gap-[10px]">
          <label className="text-[15px] text-gray-400">Email</label>
          <TextField
            name="email"
            variant={TextFieldVariant.PRIMARY}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-[15px] text-gray-400">Password</label>
          <TextField
            name="password"
            variant={TextFieldVariant.PRIMARY}
            type="password"
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
              label={isPending ? 'Logging in...' : 'Login'}
              variant={ActionBtnVariant.SECONDARY}
              width="[100px]"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
