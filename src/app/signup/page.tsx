import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <SignUp routing="hash" signInUrl="/login" />
    </div>
  );
}
