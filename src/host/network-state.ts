export class NetworkState {
    private static callbacks: Function[] = [];

    public static listen(callback: (clientId: string, message: string) => void) {
        this.callbacks.push(callback);
    }

    public static intercept(clientId: string, message: string): void {
        this.callbacks.forEach(callback => {
            callback(clientId, message);
        });
    }

    public static leftyClientId: string;
    public static rightyClientId: string;
}