import { useCallback } from "react";
import { TextFieldVariant } from "../../components/atoms/Textfield";
import { ActionBtn } from "../../components/atoms/ActionBtn/ActionBtn";
import { TextField } from "../../components/atoms/Textfield";
import { useNavigate } from "react-router";
import { useSessionStore } from "../../stores/sessionStore/sessionStore";
import { ActionBtnVariant } from "../../components/atoms/ActionBtn/ActionBtn.type";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/login/loginApi";
import { LoadingPage } from "../../components/molecules/Loading/LoadingPage";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "../../components/atoms/Toast/toast";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
});

export const Login = () => {
  const setSession = useSessionStore((s: any) => s.setSession);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode:"onChange"
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const { accessToken, expiresIn } = data;
      setSession(accessToken, expiresIn);
      navigate('/dashboard');
      showToast("Logged in successfully")
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handleLogin = useCallback((data: { email: string; password: string }) => {
    login({ email: data.email, password: data.password });
  }, [login]);

  const isPageLoading = isPending;

  if (isPageLoading) {
    return <LoadingPage label={"Logging in"} />;
  }

  return (
    <div className="bg-[#f0f0f5] dark:bg-dark min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-[2%] rounded-xl w-[25%] shadow-[2px_2px_6px_2px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
        <div className="font-bold flex justify-center text-[25px]">Login</div>
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col justify-center gap-[10px]">
          <label className="text-[15px] text-gray-400">Email</label>
          <TextField
            {...register("email")}
            variant={TextFieldVariant.PRIMARY}
            type="email"
          />
          {errors.email && (
            <div className="text-red-500 text-sm text-center">
              {errors.email.message}
            </div>
          )}

          <label className="text-[15px] text-gray-400">Password</label>
          <TextField
            {...register("password")}
            variant={TextFieldVariant.PRIMARY}
            type="password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm text-center">
              {errors.password.message}
            </div>
          )}

          <div className="flex justify-center mt-4">
            <ActionBtn
              label={isPending ? 'Logging in...' : 'Login'}
              variant={ActionBtnVariant.SECONDARY}
              type="submit"
              disabled={!isValid || isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
