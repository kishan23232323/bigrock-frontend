import API from "../../config/axios";

export const applyForAgent = async ({
    phoneNumber,
    dob,
    socialId,
    addressProof,
    identityProof
}) => {
    try {
        const formData = new FormData();    
        formData.append("phoneNumber", phoneNumber);
        formData.append("dob", dob);
        formData.append("socialId", socialId);
        formData.append("addressProof", addressProof);
        formData.append("identityProof", identityProof);

        const response = await API.post("/api/v1/agent/apply", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data?.data;
    }catch (error) {
        throw error.response ? error.response.data : error;
    }
}