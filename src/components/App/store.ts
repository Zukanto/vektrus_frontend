import React from "react";
import * as mobx from 'mobx';
import { WebSocketService } from './WebSocketService';

export interface Register_Data {
    surname:string,
    lastname:string,
    company:string,
    password:string,
    password_confirm:string,
    country: string,
    postcode: number,
    city:string,
    street:string,
    registernumber:string,
    ustid:string,
    industry:string
    billing:{
        country:string,
        postcode:number,
        city:string,
        street:string,
    }
    creditCard?:{
        cardNumber: '',
        expiry: '',
        cvv: '',
    }
}

export interface Store {
    threads: Thread[];
    messages: Message[];
    input: string;
    costumerStyle: CostumerStyle;
    isLoading: boolean;
    isHovered: boolean;
    generate_threads(): Promise<void>;
    generate_chat(thread_id: number): Promise<void>;
    generate_costumer_style(): Promise<void>;
    sendMessage(webSocketService: WebSocketService): Promise<void>;
    createNewChat(): void;
    deleteChat(id: number): void;
    editSummary(id: number, summary: string): void;
    thread_click(id: number): void;
    put_customer_data(data:{surname?:string,lastname?:string,company?:string,password?:string,password_confirm?:string}):Promise<void>;
    get_customer_data():Promise <{color: string, surname: string, lastname: string, email: string, companyname: string}>;
    get_customer_licenses(): Promise <[{id:number, startdate:string, nextpayment:string, expirationdate: string}]>;
    get_news(): Promise<[{id: number, headline: string, content: string}]>;
    post_customer_data(data:Register_Data): Promise<Response>;
    post_login_data(email: string, password:string): Promise<Response>;
}

export interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

export interface Thread {
    id: number;
    thread_name: string;
    edit?: boolean;
}

export interface CostumerStyle {
    color: string;
    name: string;
}

const ADDRESS: string = window.location.origin; // 'vektrus.com' //85.214.99.105:8172

class StoreImpl implements Store {
    _threads: Thread[] = [];
    _messages: Message[] = [];
    _input: string = '';
    _isLoading: boolean = false;
    _isHovered: boolean = false;
    _currentThreadId: number = 0;
    _costumerStyle: CostumerStyle =  { color: '#ffffff', name: 'M' };
    _webSocketService: WebSocketService | null = null;
    constructor() {
        mobx.makeAutoObservable(this);
    }

    get threads() {
        return this._threads;
    }

    get costumerStyle() {
        return this._costumerStyle;
    }

    set threads(chats: Thread[]) {
        this._threads = chats;
    }

    get messages() {
        return this._messages;
    }

    set messages(messages: Message[]) {
        this._messages = messages;
    }

    get input() {
        return this._input;
    }

    set input(input: string) {
        this._input = input;
    }

    get isLoading() {
        return this._isLoading;
    }

    set isLoading(isLoading: boolean) {
        this._isLoading = isLoading;
    }

    get isHovered() {
        return this._isHovered;
    }

    set isHovered(isHovered: boolean) {
        this._isHovered = isHovered;
    }

    createNewChat() {
        this.messages = [];
        this._currentThreadId = 0;
    }

    async post_login_data(email: string, password:string) {
        return await fetch(`${ADDRESS}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data:{email, password}}),
        });
    }

    async get_threads() {
        const response = await fetch(`${ADDRESS}/thread`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    async get_customer_style() {
        const response = await fetch(`${ADDRESS}/customerStyle`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    async get_customer_data(): Promise <{color: string, surname: string, lastname: string, email: string, companyname: string}> {
        const response = await fetch(`${ADDRESS}/customer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    async get_customer_licenses(): Promise <[{id:number, startdate:string, nextpayment:string, expirationdate: string}]> {
        const response = await fetch(`${ADDRESS}/license`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    async get_news(): Promise<[{id:number, headline:string, content:string}]> {
        const response = await fetch(`${ADDRESS}/news`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    async put_customer_data(data:{surname:string,lastname:string,company:string,password?:string,password_confirm?:string}) {
        await fetch(`${ADDRESS}/customer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data}),
        });
        return;
    }

    async post_customer_data(data:Register_Data) {
        return  await fetch(`${ADDRESS}/customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data}),
        });
    }

    async set_new_thread(): Promise<{id:number}> {
        const thread_name = 'Neuer Chat'
        const response = await fetch(`${ADDRESS}/thread`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({thread_name: thread_name}),
        });
        return await response.json();
    }

    async get_chat(thread_id: number) {
        const response = await fetch(`${ADDRESS}/chat?id=${thread_id}`, {method: 'GET'});
        return await response.json();
    }
    /*
    async post_chat(message: string, thread_id: number, websocket: WebSocket) {
        const response = await fetch(`${ADDRESS}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: thread_id, content: message}),
        });
        return await response.json();
    }
     */

    async generate_threads(): Promise<void> {
        this.threads = [];
        await this.get_threads().then((results: {threads:[{id: number, thread_name: string, messages: []}]}) => {
            for (const result of results.threads) {
                this.threads = [{
                    id: result.id,
                    thread_name: result.thread_name,
                }, ...this.threads];
            }
        });
    }

    async generate_chat(): Promise<void> {
        this.messages = [];
        await this.get_chat(this._currentThreadId).then((results: [{ id: number, thread_id: number, request_time: string, request_type: string, request_text: string }]) => {
            for (const result of results) {
                this.messages = [...this.messages, {
                    id: result.id,
                    text: result.request_text,
                    sender: result.request_type == 'request' ? 'user' : 'bot'
                }];
                console.log(this.messages);
            }
        });
    }

    async generate_costumer_style(): Promise<void> {
        this.get_customer_style().then((result) => {
            this._costumerStyle.name = (((result.name).trim('')[0]).toUpperCase());
            this._costumerStyle.color = '#'+(result.color);
        });
    }

    async sendMessage(webSocketService: WebSocketService) {
        if (!this.input?.trim() || this.isLoading) return;
        this.isLoading = true; // Vor dem Senden der Anfrage auf true setzen
        const userMessage: Message = {
            id: this.messages.length + 1,
            text: this.input,
            sender: 'user',
        };

        if (this.messages?.length < 1) {
            this._currentThreadId = Number((await this.set_new_thread()).id);
            this.generate_threads();
        }

        this.messages = [...this.messages, userMessage];
        this.input = '';

        try {
            console.log(userMessage)
            webSocketService.sendMessage(JSON.stringify({payload:userMessage, thread_id: this._currentThreadId}));
            const botMessage: Message = {
                id: this.messages.length + 2, // Stellen Sie sicher, dass die ID eindeutig ist
                text: "",
                sender: 'bot',
            };
            this.messages = [...this.messages, botMessage];
        } catch (error) {
            console.error("Fehler beim Senden der Nachricht: ", error);
            // Hier könnten Sie auch eine Fehlermeldung im Chat anzeigen
        }
    };


    async deleteChat(id: number): Promise<void> {
        console.log(`Deleting chat: ${id}`);
        if (id === this._currentThreadId) {
            this.createNewChat();
        }
        const response: Response = await fetch(`${ADDRESS}/thread/` + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error("Could not delete chat");
        }
    }

    async editSummary(id: number, summary: string): Promise<void> {
        await fetch(`${ADDRESS}/thread/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: summary}),
        });
    }

    thread_click(id: number): void {
        this._currentThreadId = id;
        this.generate_chat().then();
    }
}

export const store: Store = new StoreImpl();
