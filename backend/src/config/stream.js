import { StreamChat } from "stream-chat";

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        console.log("Stream user upserted successfully:", userData.name); 
    }catch(error){
        console.error("Error upserting Stream user:", error.message);
        throw new Error("Failed to upsert Stream user");
    }
};
export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId);
        console.log("Stream user deleted successfully:", userId);
    }catch(error){
        console.error("Error deleting Stream user:", error.message);
        throw new Error("Failed to delete Stream user");
    }
};

export const generateStreamToken = (userId) => {
    try{
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    }catch(error){
        console.error("Error generating Stream token:", error.message);
        return null; // Return null if token generation fails
    }
};

export const addUserToPublicChannels = async (newUserId) => {
    const publicChannels = await streamClient.queryChannels({ discoverable: true});

    for(const channel of publicChannels){
        await channel.addMembers([newUserId]);
    }
};