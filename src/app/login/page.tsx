import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <SignIn routing="hash" signUpUrl="/signup" />
    </div>
  );
}
