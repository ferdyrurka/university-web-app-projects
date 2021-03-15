class Numbers {
    private inputs: HTMLInputElement[] = [];

    private sum: HTMLInputElement;
    private avg: HTMLInputElement;
    private min: HTMLInputElement;
    private max: HTMLInputElement;
    private inputNumbersCount: HTMLInputElement;
    private createInputBtn: HTMLButtonElement;
    private numbersContainer: HTMLDivElement;

    public setBasicFields(): void {
        this.numbersContainer = <HTMLDivElement>document.getElementById('numbers');

        this.inputNumbersCount = <HTMLInputElement>document.getElementById('numbers-count');
        this.createInputBtn = <HTMLButtonElement>document.getElementById('input-create-btn');

        this.sum = document.querySelector('#result #sum');
        this.avg = document.querySelector('#result #avg');
        this.min = document.querySelector('#result #min');
        this.max = document.querySelector('#result #max');
    }

    public listenBasicFields(): void {
        this.createInputBtn.addEventListener('click', () => {
            this.createInputs(
                +this.inputNumbersCount.value
            )
        })
    }

    private createInputs(count: number): void
    {
        if (this.numbersContainer.outerHTML.length > 0) {
            this.numbersContainer.innerHTML = '';
        }

        for (let i = 1; i < count; i++) {
            const input:HTMLInputElement = <HTMLInputElement>document.createElement('input');
            input.type = 'number';

            this.numbersContainer.append(input);
        }

        this.setInputs();
        this.listenInputs();
    }

    private setInputs(): void {
        this.inputs = [];

        document.querySelectorAll('#numbers input').forEach(input => {
            this.inputs.push(<HTMLInputElement>input);
        });
    }

    private listenInputs(): void {
        for (const input of this.inputs) {
            input.addEventListener('input', () => this.compute());
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
        this.numbers.setBasicFields();
        this.numbers.listenBasicFields();
    }
}

const app = new App();

app.run();
