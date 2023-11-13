export function Loader({ size = 20 }: { size?: 20 | 30 | 40 }) {
    return (
        <div className="flex flex-row gap-2 z-50">
            <div
                className={`rounded-full shadow-sm bg-gradient-to-br from-app-primary to-app--primary animate-bounce`}
                style={{ width: size, height: size }}
            ></div>
            <div
                className={`rounded-full shadow-sm bg-gradient-to-br from-app-primary to-app--primary animate-bounce [animation-delay:-.3s]`}
                style={{ width: size, height: size }}
            ></div>
            <div
                className={`rounded-full shadow-sm bg-gradient-to-br from-app-primary to-app--primary animate-bounce [animation-delay:-.5s]`}
                style={{ width: size, height: size }}
            ></div>
        </div>
    )
}