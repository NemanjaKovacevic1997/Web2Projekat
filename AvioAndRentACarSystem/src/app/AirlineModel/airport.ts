import { Address } from './address';

export class Airport
{
    id: number;
    name: string;
    address: Address;

    constructor(name: string, address: Address)
    {
        this.name = name;
        this.address = address;
    }
}