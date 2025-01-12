import {getconfig} from "@/config/config";
import type { IChatPayload, IChatResponse } from "@/entity/chat";
import { useChat } from "@/composables/usechat";

const fetchMessage = async (payload: IChatPayload): Promise<string> => {
    const {addMessage, setLoading} = useChat()

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

        const bodyResponse = await res.json() as IChatResponse
        setLoading(false)
        setTimeout(() => {
            addMessage({
                direction: "out",
                message: bodyResponse.data.result
            })
        }, 400);

        return "success"
    } catch (error) {
        setLoading(false)
        setTimeout(() => {
            addMessage({
                direction: "out",
                message: "maaf terjadi kesalahan saat memuat data..."
            })
        }, 400);
        throw new Error(`HTTP Error get response`)
    }
}

export default {
    fetchMessage
}