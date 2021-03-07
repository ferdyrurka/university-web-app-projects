class Numbers {
    private inputs: HTMLInputElement[] = [];

    private sum: HTMLInputElement;
    private avg: HTMLInputElement;
    private min: HTMLInputElement;
    private max: HTMLInputElement;

    constructor() {
        this.setInputs();
        this.listenInputs();
    }

    private setInputs(): void {
        this.inputs.push(document.querySelector('#numbers #input-1'));
        this.inputs.push(document.querySelector('#numbers #input-2'));
        this.inputs.push(document.querySelector('#numbers #input-3'));
        this.inputs.push(document.querySelector('#numbers #input-4'));

        this.sum = document.querySelector('#result #sum');
        this.avg = document.querySelector('#result #avg');
        this.min = document.querySelector('#result #min');
        this.max = document.querySelector('#result #max');
    }

    private listenInputs(): void {
        for (const input of this.inputs) {
            input.addEventListener('input', () => this.compute())
        }
    }

    private getValues(): number[] {
        const values: number[] = [];

        for (const input of this.inputs) {
            values.push(+input.value);
        }

        return values;
    }

    private compute(): void {
        const values: number[] = this.getValues();

        const sum = values.reduce((a, b) => a + b);
        const avg = sum / 4;
        const min = Math.min(...values);
        const max = Math.max(...values);

        this.show(sum, avg, min, max);
    }

    private show(sum: number, avg: number, min: number, max: number): void {
        this.sum.value = sum.toString();
        this.avg.value = avg.toString();
        this.min.value = min.toString();
        this.max.value = max.toString();
    }
}

class App {
    private numbers: Numbers;

    run(): void {
        this.numbers = new Numbers();
    }
}

const app = new App();

app.run();
