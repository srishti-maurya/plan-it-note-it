import { Link } from "react-router-dom";
import { useAuth } from "../../context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function Signup() {
  const { signupInput, setSignupInput, signupHandler } = useAuth();

  const signupInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInput({ ...signupInput, [name]: value });
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-[420px] p-0">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Signup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={signupHandler} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-muted-foreground">
                Full name<span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Enter your full name"
                name="fullname"
                value={signupInput.fullname || ""}
                onChange={signupInputHandler}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-muted-foreground">
                Email address<span className="text-destructive">*</span>
              </Label>
              <Input
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={signupInput.email || ""}
                onChange={signupInputHandler}
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
                value={signupInput.password || ""}
                onChange={signupInputHandler}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm font-medium text-muted-foreground">
                Confirm password<span className="text-destructive">*</span>
              </Label>
              <Input
                type="password"
                placeholder="Confirm your password"
                name="cnfpassword"
                value={signupInput.cnfpassword || ""}
                onChange={signupInputHandler}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              Create new account
            </Button>
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-sm font-medium text-primary hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
