// login admin
export interface IadminLoginData {
    username: string | undefined;
    password: string | undefined;
}

export class adminLoginData implements IadminLoginData {
    username: string | undefined;
    password: string | undefined;
}

// login user
export interface IUserLoginData {
    phone: string | undefined;
    password: string | undefined;
}

export class UserLoginData implements IUserLoginData {
    phone: string | undefined;
    password: string | undefined;
}


// sign up 
export interface IsignUpData {
    phone: string | undefined;
    password: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
}

export class signUpData implements IsignUpData {
    phone: string | undefined;
    password: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
}

// verify phone
export interface IverifyData {
    phone: string | undefined;
    code: string | undefined;
}

export class verifyData implements IverifyData {
    phone: string | undefined;
    code: string | undefined;
}

// resend code
export interface IResendData {
    phone: string | undefined;
}

export class resendData implements IResendData {
    phone: string | undefined;
}

// reset password
export interface IResetPassData {
    phone: string | undefined;
    password: string | undefined;
}

export class ResetPassData implements IResetPassData {
    phone: string | undefined;
    password: string | undefined;
}