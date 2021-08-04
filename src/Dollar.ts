export class Dollar {

    constructor(private amount: number) {}

    multiplyByRate(rate: number): void {
        this.amount *= rate;
    }
    
    getAmount(): number {
        return this.amount;
    }
}