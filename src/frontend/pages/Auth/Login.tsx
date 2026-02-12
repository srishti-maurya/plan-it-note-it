import { Link } from "react-router-dom";
import { useAuth } from "../../context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function Login() {
  const { loginHandler, loginInput, setLoginInput } = useAuth();

  const loginInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const testCredentialsLogin = () => {
    setLoginInput({
      email: "srishtimaurya@gmail.com",
      password: "srishtimaurya",
    });
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-[420px] p-0">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={loginHandler} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-muted-foreground">
                Email address<span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Enter your email address"
                name="email"
                value={loginInput.email || ""}
                onChange={loginInputHandler}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-muted-foreground">
                Password<span className="text-destructive">*</span>
              </Label>
              <Input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={loginInput.password || ""}
                onChange={loginInputHandler}
                required
              />
            </div>
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={testCredentialsLogin}
            >
              Login with test credentials
            </Button>
            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
            <div className="text-center mt-4">
              <Link
                to="/signup"
                className="text-sm font-medium text-primary hover:underline"
              >
                Create new account?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
