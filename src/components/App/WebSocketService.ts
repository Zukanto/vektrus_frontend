export class WebSocketService {
    private socket: WebSocket;
    private isReady: boolean = false;
    private messageCallback: (message: string) => void;

    constructor(url: string, messageCallback: (message: string) => void) {
        this.socket = new WebSocket(url);
        this.messageCallback = messageCallback;

        this.socket.onopen = () => {
            this.isReady = true;
            console.log("WebSocket connection opened");
        };

        this.socket.onclose = (event) => {
            this.isReady = false;
            console.log("WebSocket connection closed:", event);
        };

        this.socket.onmessage = (event) => {
            this.messageCallback(event.data);
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }

    public sendMessage(message: string) {
        this.socket.send(message);
    }

    public close() {
        this.socket.close();
    }
}
