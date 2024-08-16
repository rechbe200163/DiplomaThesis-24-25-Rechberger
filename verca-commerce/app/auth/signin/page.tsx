import AuthForm from "@/components/AuthForm";
import React from "react";

const SignIn = () => {
  return (
    <div className="container p-16 max-w-screen-md">
      <div className="card card-body shadow-2xl">
        <AuthForm type="sign-in" />
      </div>
    </div>
  );
};

export default SignIn;
