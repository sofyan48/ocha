interface IConfig {
    baseUrl : string
    env     : string
    username: string
    password: string
}

export const getconfig = (): IConfig => {
    const config: IConfig = {
        baseUrl : import.meta.env.APP_URL ?? "https://ocha.iank.me/ex",
        env     : import.meta.env.APP_MODE ?? "dev",
        username: import.meta.env.USERNAME ?? "iank",
        password: import.meta.env.PASSWORD ?? "meongBEGO@324",
    }

    return config
}