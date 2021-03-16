class Numbers {
    private inputs: HTMLInputElement[] = [];

    private sum: HTMLInputElement;
    private avg: HTMLInputElement;
    private min: HTMLInputElement;
    private max: HTMLInputElement;
    private inputNumbersCount: HTMLInputElement;
    private createInputBtn: HTMLButtonElement;
    private numbersContainer: HTMLDivElement;
    private deleteBtn: HTMLButtonElement;

    public setBasicFields(): void {
        this.numbersContainer = <HTMLDivElement>document.getElementById('numbers');

        this.inputNumbersCount = <HTMLInputElement>document.getElementById('numbers-count');
        this.createInputBtn = <HTMLButtonElement>document.getElementById('input-create-btn');
        this.deleteBtn = <HTMLButtonElement>document.getElementById('inputs-delete-btn');

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

        this.deleteBtn.addEventListener('click', () => this.deleteInputs())
    }

    private createInputs(count: number): void
    {
        if (this.numbersContainer.outerHTML.length > 0) {
            this.numbersContainer.innerHTML = '';
        }

        for (let i = 0; i < count; i++) {
            const input:HTMLInputElement = <HTMLInputElement>document.createElement('input');
            input.type = 'number';

            this.numbersContainer.append(input);

            const inputCheckbox:HTMLInputElement = <HTMLInputElement>document.createElement('input');
            inputCheckbox.type = 'checkbox';

            this.numbersContainer.append(inputCheckbox);
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
            if (input.type != 'number') {
                continue;
            }

            input.addEventListener('input', () => this.compute());
        }
    }

    private deleteInputs() {
        for (const input of this.inputs) {
            if (input.type != 'checkbox' || !input.checked) {
                continue;
            }

            input.previousElementSibling.remove();
            input.remove();
        }

        this.setInputs();
        this.compute();
    }

    private getValues(): number[] {
        const values: number[] = [];

        const regexpNumber = new RegExp('^\\d+$');

        for (const input of this.inputs) {
            if (input.type != 'number') {
                continue;
            }

            if (input.value.length > 0 && !regexpNumber.test(input.value)) {
                throw new TypeError();
            }

            if (!regexpNumber.test(input.value)) {
                continue;
            }

            values.push(+input.value);
        }

        return values;
    }

    private compute(): void {
        let values: number[];

        try {
            values = this.getValues();
        } catch (e) {
            this.show(null, null, null, null);
            return;
        }

        const sum = values.reduce((a, b) => a + b);
        const avg = sum / 4;
        const min = Math.min(...values);
        const max = Math.max(...values);

        this.show(sum, avg, min, max);
    }

    private show(sum: number | null, avg: number | null, min: number | null, max: number | null): void {
        this.sum.value = sum != null ? sum.toString() : 'Waiting for data...';
        this.avg.value = avg != null ? avg.toString() : 'Waiting for data...';
        this.min.value = min != null ? min.toString() : 'Waiting for data...';
        this.max.value = max != null ? max.toString() : 'Waiting for data...';
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
