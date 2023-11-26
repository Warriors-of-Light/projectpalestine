export function Loader({ type = 1 }: { type?: 1 | 2 }) {

    switch (type) {
        case 1:
            return (
                <div className="full center gap p-2">
                    <div
                        className={`bg-foreground rounded-full shadow animate-ping`}
                        style={{ width: 10, height: 10 }}
                    ></div>
                    <div
                        className={`bg-foreground rounded-full shadow animate-ping [animation-delay:.25s]`}
                        style={{ width: 10, height: 10 }}
                    ></div>
                    <div
                        className={`bg-foreground rounded-full shadow animate-ping [animation-delay:.5s]`}
                        style={{ width: 10, height: 10 }}
                    ></div>
                </div>
            )
        case 2:
            return (
                <div className="full center">
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