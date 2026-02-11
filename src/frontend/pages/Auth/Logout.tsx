import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { logout } from "../../assets";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function Logout() {
  return (
    <section className="flex items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-[420px] text-center">
        <CardContent className="pt-6 flex flex-col items-center gap-6">
          <img src={logout} alt="logout" className="max-h-[200px]" />
          <Alert
            variant="success"
            className="flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            You have successfully logged out
          </Alert>
          <Button asChild variant="outline">
            <Link to="/">Go Back</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
