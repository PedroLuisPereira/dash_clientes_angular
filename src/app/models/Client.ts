export interface ApiResponse<T> {
    message?: string;
    data: T;
}

export interface IClient {
    id: string;
    name: string;
    username: string;
    password: string;
}
