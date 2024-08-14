import { loadComponents } from "./functions/loadComponents.js";
import { addButtonEventListener, addRemoveButtonEventListener } from "./functions/addButtonEventListener.js";

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponents();
    addButtonEventListener();
    addRemoveButtonEventListener();
});