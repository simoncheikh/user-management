import { useCallback, useState } from "react";
import { TextFieldVariant } from "../../components/atoms/Textfield";
import { ActionBtn } from "../../components/atoms/ActionBtn/ActionBtn";
import { TextField } from "../../components/atoms/Textfield";
import { useNavigate } from "react-router";
import { useSessionStore } from "../../stores/sessionStore/sessionStore";
import { ActionBtnVariant } from "../../components/atoms/ActionBtn/ActionBtn.type";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setSession = useSessionStore((s: any) => s.setSession);
  const navigate = useNavigate();

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        const { accessToken, expiresIn } = data.result.data;
        setSession(accessToken, expiresIn);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [email, password, navigate, setSession]);

  return (
    <div className="bg-[#f0f0f5] min-h-screen flex flex-col justify-center items-center">
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
              label={loading ? 'Logging in...' : 'Login'}
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
