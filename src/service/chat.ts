import {getconfig} from "@/config/config";
import type { IChatPayload, IChatResponse } from "@/entity/chat";
import { useChat } from "@/composables/usechat";

const fetchMessage = async (payload: IChatPayload): Promise<string> => {
    const {addMessage} = useChat()

    const config    = getconfig()
    const version   = "v1"
    const url       = `${config.baseUrl}/${version}/chat`
    const basicAuth = btoa(`${config.username}:${config.password}`);
    
    try {
        addMessage({
            direction: "in",
            message: payload.chat
        })

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "x-session": "67890",
                "Content-Type": "application/json",
                Authorization: `Basic ${basicAuth}`,
            },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            addMessage({
                direction: "out",
                message: "maaf terjadi kesalahan saat memuat data..."
            })
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const bodyResponse = await res.json() as IChatResponse
        addMessage({
            direction: "out",
            message: bodyResponse.data.result
        })

        return "success"
    } catch (error) {
        addMessage({
            direction: "out",
            message: "maaf terjadi kesalahan saat memuat data..."
        })
        throw new Error(`HTTP Error get response`)
    }
}

export default {
    fetchMessage
}