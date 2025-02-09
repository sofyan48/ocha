import {getconfig} from "@/config/config";
import type { IChatHistoryResponse, IChatPayload, IChatResponse } from "@/entity/chat";
import { useChat } from "@/composables/usechat";
import cookie from "@/utils/cookie";

const fetchMessage = async (payload: IChatPayload): Promise<string> => {
    const {addMessage, setLoading} = useChat()

    const config    = getconfig()
    const version   = "v1"
    const url       = `${config.baseUrl}/${version}/chat`
    const bearer = `${config.bearer}`;

    try {
        addMessage({
            direction: "out",
            message: payload.chat
        })

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "x-session": cookie.getCookie("identity") ?? '4390',
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearer}`,
            },
            body: JSON.stringify(payload)
        })

        const bodyResponse = await res.json() as IChatResponse
        setLoading(false)
        setTimeout(() => {
            addMessage({
                direction: "in",
                message: bodyResponse.data.result
            })
        }, 400);

        return "success"
    } catch (error) {
        setTimeout(() => {
            addMessage({
                direction: "in",
                message: "maaf terjadi kesalahan saat memuat data..."
            })
        }, 1300);
        setTimeout(() => {
            setLoading(false)
        }, 800);
        throw new Error(`HTTP Error get response`)
    }
}

const fetchHistory = async (): Promise<string> => {
    const {addMessage} = useChat()
    const config    = getconfig()
    const version   = "v1"
    const url       = `${config.baseUrl}/${version}/chat`
    const bearer = `${config.bearer}`;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "x-session": cookie.getCookie("identity") ?? '4390',
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearer}`,
            },
        })

        const bodyResponse = await res.json() as IChatHistoryResponse
        setTimeout(() => {
            const data = bodyResponse.data.chat
            for (let index = 0; index < data.length; index++) {
                console.log({ ai: "out", human: "in" }[data[index].type]);
                
                addMessage({
                    direction: { ai: "in", human: "out" }[data[index].type] || "unknown",
                    message: data[index].content
                })
            }
        }, 400);

        return "success"
    } catch (error) {
        throw new Error(`HTTP Error get response`)
    }
}

export default {
    fetchMessage,
    fetchHistory
}