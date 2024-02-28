export interface ApiResponse<T> {
    message?: string;
    data: T;
}

export interface IClient {
    _id?: string;
    name: string;
    username: string;
    password: string;
}
