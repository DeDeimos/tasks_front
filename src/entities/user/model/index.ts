export type UserResponse = {
    ExpiresIn:   string;
	AccessToken: string;
	TokenType:   string;
    Role: string;
}

export type UserApi = {
    User_id: string;
    Name: string;
    Email: string;
    Password: string;
    Phone: string;
    Role: string;
}

export type UserModel = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}

export const normalizeUser = (user: UserApi): UserModel => ({
    id: user.User_id,
    name: user.Name,
    email: user.Email,
    password: user.Password,
    phone: user.Phone,
    role: user.Role,
})