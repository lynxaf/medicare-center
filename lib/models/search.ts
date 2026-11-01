let searchModal = false;

const SEARCH_MODAL_ID = "search-modal";
const SEARCH_INPUT_ID = "search-input";

function getSearchModal(): HTMLElement | null {
    if (typeof document === "undefined") {
        return null;
    }

    return document.getElementById(SEARCH_MODAL_ID);
}
let searchModalBound = false;

function BindSearchModalEvents() {
    if ( searchModalBound || typeof document === "undefined") {
        return;
    } 
    
    const modal = getSearchModal();
    if (!modal) {
        return;
    }
    searchModalBound = true;

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            CloseSearchModal();
        }   
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            CloseSearchModal();
        }
    });
}

export function OpenSearchModal() {
    const modal = getSearchModal(); 

    if (!modal) {
        return;
    }

    BindSearchModalEvents();
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    const input = document.getElementById(SEARCH_INPUT_ID) as HTMLInputElement | null;
    if (input) {
        input.focus();
    }
    
}

export function CloseSearchModal() {
    const modal = getSearchModal();
    if (!modal) {
        return;
    }
    modal.classList.remove("flex");
    modal.classList.add("hidden");
}