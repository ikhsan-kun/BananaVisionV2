import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ type = 'info', message, onClose, duration = 5000 }) => {
    const [isExiting, setIsExiting] = React.useState(false);

    React.useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose?.();
        }, 300);
    };

    const styles = {
        success: {
            bg: 'bg-green-50 border-green-200',
            icon: 'text-green-600',
            text: 'text-green-900',
            IconComponent: CheckCircle,
        },
        error: {
            bg: 'bg-red-50 border-red-200',
            icon: 'text-red-600',
            text: 'text-red-900',
            IconComponent: AlertCircle,
        },
        warning: {
            bg: 'bg-yellow-50 border-yellow-200',
            icon: 'text-yellow-600',
            text: 'text-yellow-900',
            IconComponent: AlertTriangle,
        },
        info: {
            bg: 'bg-blue-50 border-blue-200',
            icon: 'text-blue-600',
            text: 'text-blue-900',
            IconComponent: Info,
        },
    };

    const config = styles[type] || styles.info;
    const IconComponent = config.IconComponent;

    return (
        <div
            className={`${config.bg} border rounded-xl shadow-lg p-4 flex items-start gap-3 min-w-[320px] max-w-md ${isExiting ? 'toast-exit' : 'toast-enter'
                }`}
        >
            <IconComponent className={`w-5 h-5 ${config.icon} flex-shrink-0 mt-0.5`} />
            <p className={`${config.text} text-sm font-medium flex-1`}>{message}</p>
            <button
                onClick={handleClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;
