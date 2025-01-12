export interface IChatPayload {
    chat      : string
    collection: string
}

export interface IChatResponse {
    message: string
    meta   : {
        history: string[]
    }
    data: {
        result: string
    }
}