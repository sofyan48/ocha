import { defineStore } from "pinia";
import type { IChat } from "@/interfaces/chatstore";

interface IStore {
    chats: IChat[];
}

export const useChatStore = defineStore('chatStore', {
    state: () => ({
        chats: [
            { direction: 'in', message: 'Siapakah kamu?' },
            { direction: 'out', message: 'Saya adalah asisten virtual berbasis AI yang dirancang untuk membantu dalam berbagai tugas, Saya belajar dari data dan dapat menyesuaikan jawaban saya dengan kebutuhan Anda. 😊' },
        ],
    } as IStore),
    getters: {
        getChat: (state) => state.chats,
    },
    actions: {
        addMessage(newMessage: IChat) {
            if (!newMessage.message || !newMessage.direction) {
                console.error("Pesan baru harus memiliki 'message' dan 'direction'.");
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
