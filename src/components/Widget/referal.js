export const getReferralFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("ref");
};

export const storeReferral = (ref) => {
    if (ref) localStorage.setItem("kol_ref", ref);
};

export const getStoredReferral = () => {
    return localStorage.getItem("kol_ref");
};