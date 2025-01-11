import { useChatStore } from "@/stores/chat";
import { storeToRefs } from "pinia";

export const useChat = () => {
    const chatStore = useChatStore();

    // State dan getter dari store
    const { chats } = storeToRefs(chatStore);

    // Aksi dari store
    const { addMessage } = chatStore;

    return {
        chats,
        addMessage
    };
};