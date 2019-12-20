import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {WebhookComponent} from './webhook.component';

export class WebSocketAPI {
    webSocketEndPoint = 'https://web-programming-websocket.herokuapp.com/ws';
    topic = '/topic/file-changes';
    stompClient: any;
    webhookComponent: WebhookComponent;

    constructor(webhookComponent: WebhookComponent) {
        this.webhookComponent = webhookComponent;
    }

    _connect() {
        console.log('Initialize WebSocket Connection');
        const ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function(frame) {
            _this.stompClient.subscribe(_this.topic, function(sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            // _this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log('Disconnected');
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log('errorCallBack -> ' + error);
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    onMessageReceived(message) {
        console.log('Message Recieved from Server :: ' + message.body);
        this.webhookComponent.addMessage(message.body);
    }

    _send(name: string) {
        console.log('calling logout api via web socket');
        this.stompClient.send('/app/file-changed', {}, JSON.stringify(name));
    }
}
