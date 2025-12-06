// Lightweight toast utility — no external deps
export function showToast(message, type = 'success', timeout = 3500) {
    if (typeof document === 'undefined') return;

    let container = document.getElementById('app-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'app-toast-container';
        container.style.position = 'fixed';
        container.style.top = '1rem';
        container.style.right = '1rem';
        container.style.zIndex = 9999;
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '8px';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.minWidth = '200px';
    toast.style.maxWidth = '360px';
    toast.style.padding = '10px 14px';
    toast.style.color = '#fff';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
    toast.style.fontSize = '14px';
    toast.style.opacity = '0';
    toast.style.transition = 'transform 200ms ease, opacity 200ms ease';
    toast.style.transform = 'translateY(-6px)';

    if (type === 'error') {
        toast.style.background = 'linear-gradient(90deg,#ef4444,#dc2626)';
    } else if (type === 'warning') {
        toast.style.background = 'linear-gradient(90deg,#f59e0b,#f97316)';
    } else {
        toast.style.background = 'linear-gradient(90deg,#10b981,#059669)';
    }

    container.appendChild(toast);

    // trigger show
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    const remove = () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-6px)';
        setTimeout(() => {
            toast.remove();
            // remove container if empty
            if (container && container.childElementCount === 0) container.remove();
        }, 200);
    };

    const timer = setTimeout(remove, timeout);

    toast.addEventListener('click', () => {
        clearTimeout(timer);
        remove();
    });

    return { remove };
}

export default showToast;
