interface IConfig {
    baseUrl : string
    env     : string
    bearer: string
}

export const getconfig = (): IConfig => {
    const config: IConfig = {
        baseUrl : import.meta.env.APP_URL ?? "https://ocha.iank.me/ex",
        env     : import.meta.env.APP_MODE ?? "dev",
        bearer: import.meta.env.BEARER ?? "xxxxx",
    }

    return config
}