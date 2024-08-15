import { loadComponents } from "./functions/loadComponents.js";
import {
    addButtonEventListener,
    addConfirmButtonEventListener,
    addRemoveButtonEventListener,
    addStartButtonEventListener
} from "./functions/addButtonEventListener.js";

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponents();
    addButtonEventListener();
    addRemoveButtonEventListener();
    addConfirmButtonEventListener();
    addStartButtonEventListener();
});