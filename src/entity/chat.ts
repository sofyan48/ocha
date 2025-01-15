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

export interface IChatHistoryDetail {
    content: string;
    additional_kwargs: Record<string, unknown>;
    response_metadata: Record<string, unknown>;
    type: string;
    name: string | null;
    id: string | null;
    example: boolean;
    tool_calls?: unknown[] | null;
    invalid_tool_calls?: unknown[] | null;
    usage_metadata?: unknown | null;
}

export interface IChatHistoryResponse{
    message: string
    meta: Record<string, unknown>
    data: {
        session: string
        chat: IChatHistoryDetail[]
    }
}