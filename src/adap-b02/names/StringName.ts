import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.name = source;
        this.noComponents = this.parseComponents().length;
    }

    public asString(delimiter: string = this.delimiter): string {
        const components = this.parseComponents();
        return components.join(delimiter);
    }

    public asDataString(): string {
        const components = this.parseComponents();
        const escapedComponents = components.map(component => {
            let escaped = '';
            for (let char of component) {
                if (char === DEFAULT_DELIMITER || char === ESCAPE_CHARACTER) {
                    escaped += ESCAPE_CHARACTER;
                }
                escaped += char;
            }
            return escaped;
        });
        return escapedComponents.join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        const components = this.parseComponents();
        return components[x];
    }

    public setComponent(n: number, c: string): void {
        const components = this.parseComponents();
        components[n] = c;
        this.name = this.buildString(components);
    }

    public insert(n: number, c: string): void {
        const components = this.parseComponents();
        components.splice(n, 0, c);
        this.name = this.buildString(components);
        this.noComponents = components.length;
    }

    public append(c: string): void {
        const components = this.parseComponents();
        components.push(c);
        this.name = this.buildString(components);
        this.noComponents = components.length;
    }

    public remove(n: number): void {
        const components = this.parseComponents();
        components.splice(n, 1);
        this.name = this.buildString(components);
        this.noComponents = components.length;
    }

    public concat(other: Name): void {
        const components = this.parseComponents();
        for (let i = 0; i < other.getNoComponents(); i++) {
            components.push(other.getComponent(i));
        }
        this.name = this.buildString(components);
        this.noComponents = components.length;
    }

    private parseComponents(): string[] {
        if (this.name === "") {
            return [];
        }
        
        const components: string[] = [];
        let currentComponent = "";
        let i = 0;
        
        while (i < this.name.length) {
            if (this.name[i] === ESCAPE_CHARACTER && i + 1 < this.name.length) {
                // Escaped character - add the next character literally
                currentComponent += this.name[i + 1];
                i += 2;
            } else if (this.name[i] === this.delimiter) {
                // Delimiter - end current component
                components.push(currentComponent);
                currentComponent = "";
                i++;
            } else {
                // Regular character
                currentComponent += this.name[i];
                i++;
            }
        }
        
        // Add the last component
        components.push(currentComponent);
        return components;
    }

    private buildString(components: string[]): string {
        const escapedComponents = components.map(component => {
            let escaped = '';
            for (let char of component) {
                if (char === this.delimiter || char === ESCAPE_CHARACTER) {
                    escaped += ESCAPE_CHARACTER;
                }
                escaped += char;
            }
            return escaped;
        });
        return escapedComponents.join(this.delimiter);
    }

}