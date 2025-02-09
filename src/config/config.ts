interface IConfig {
    baseUrl : string
    env     : string
    bearer: string
}

export const getconfig = (): IConfig => {
    const config: IConfig = {
        baseUrl : import.meta.env.APP_URL ?? "https://ocha.iank.me/ex",
        env     : import.meta.env.APP_MODE ?? "dev",
        bearer: import.meta.env.BEARER ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJvY2hhYm90Iiwicm9sZXMiOiJjbGllbnQiLCJleHAiOjE3NzA2NzY3ODB9.kmu2QhvpaikwWIl9ZpSvHJqmGTYsvAFUBDssOZmab7k",
    }

    return config
}