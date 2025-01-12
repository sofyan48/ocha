import { defineStore } from "pinia";
import type { IChat } from "@/interfaces/chatstore";

interface IStore {
    chats: IChat[];
}

export const useChatStore = defineStore('chatStore', {
    state: () => ({
        chats: [
            { direction: 'out', message: 'Halo kak, Saya adalah Ocha berbasis AI yang dirancang untuk membantu dalam berbagai tugas tentang om iank' },
        ],
    } as IStore),
    getters: {
        getChat: (state) => state.chats,
    },
    actions: {
        addMessage(newMessage: IChat) {
            if (!newMessage.message || !newMessage.direction) {
                // console.error("Pesan baru harus memiliki 'message' dan 'direction'.");
                return;
            }
            
            const messageCopy = { ...newMessage };
            this.chats.push(messageCopy);
        },
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
