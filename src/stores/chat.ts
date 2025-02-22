import { defineStore } from "pinia";
import type { IChat } from "@/interfaces/chatstore";

interface IStore {
    chats: IChat[];
    loading: boolean
}

export const useChatStore = defineStore('chatStore', {
    state: () => ({
        chats: [
            { direction: 'in', message: 'Halo kak, Saya adalah Cinbot berbasis AI yang dirancang untuk membantu dalam berbagai tugas tentang om iank' },
        ],
    } as IStore),
    getters: {
        getChat: (state) => state.chats,
        getLoading: (state) => state.loading
    },
    actions: {
        addMessage(newMessage: IChat) {
            if (!newMessage.message || !newMessage.direction) {
                return;
            }
            
            const messageCopy = { ...newMessage };
            this.chats.push(messageCopy);
        },
        setLoading(payload: boolean) {
            this.loading = payload
        }
    },
});

export const setupLogging = () => {
    const chatStore = useChatStore();

    chatStore.$subscribe((mutation, state) => {
        console.log("Chats telah berubah.");
        console.log("Mutation:", mutation); // Log tipe mutasi
        console.log("State terkini:", state.chats); // Log state terbaru
    });
};
