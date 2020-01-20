import {Component, OnInit} from '@angular/core';
import {WebSocketAPI} from './WebSocketAPI';
import $ from 'jquery';

@Component({
    selector: 'app-webhook',
    templateUrl: './webhook.component.html',
    styleUrls: ['./webhook.component.less']
})
export class WebhookComponent implements OnInit {

    webSocketAPI: WebSocketAPI;
    name: string;
    myForm: any;

    ngOnInit() {
        this.webSocketAPI = new WebSocketAPI(new WebhookComponent());
    }

    connect() {
        this.webSocketAPI._connect();
    }

    disconnect() {
        this.webSocketAPI._disconnect();
    }


    addMessage(message) {
        $('#message').append('<tr><td>' + message + '</td></tr>');
    }

    sendMessage() {
        this.webSocketAPI._send(this.name);
    }
}
