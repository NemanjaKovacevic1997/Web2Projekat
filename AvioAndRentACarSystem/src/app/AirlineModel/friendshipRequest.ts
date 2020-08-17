export class FriendshipRequest {
    id: number;
    fromId: number;
    toId: number;

    constructor(id: number, fromId: number, toId: number) {
        this.id = id;
        this.fromId = fromId;
        this.toId = toId; 
    }
}