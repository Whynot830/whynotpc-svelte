export default function (action) {
    if (!document) return
    if (!document.startViewTransition) return;
    document.startViewTransition(action);
}