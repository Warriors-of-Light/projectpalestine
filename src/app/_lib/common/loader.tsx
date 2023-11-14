export function Loader({ type = 1 }: { type?: 1 | 2 }) {

    switch (type) {
        case 1:
            return (
                <div className="center">
                    <div
                        className={`rounded-full shadow bg-primary animate-bounce`}
                        style={{ width: 20, height: 20 }}
                    ></div>
                    <div
                        className={`rounded-full shadow bg-primary animate-bounce [animation-delay:-.3s]`}
                        style={{ width: 20, height: 20 }}
                    ></div>
                    <div
                        className={`rounded-full shadow bg-primary animate-bounce [animation-delay:-.5s]`}
                        style={{ width: 20, height: 20 }}
                    ></div>
                </div>
            )
        case 2:
            return (
                <div className="center">
                    <div className="loading">
                        <svg width="64px" height="48px">
                            <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                            <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                        </svg>
                    </div>
                </div>
            )
    }

}