import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = this.parseComponents().length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        return this.parseComponents()[i];
    }

    public setComponent(i: number, c: string) {
        let components = this.parseComponents();
        components[i] = c;
        this.name = this.buildString(components);
    }

    public insert(i: number, c: string) {
        let components = this.parseComponents();
        components.splice(i, 0, c);
        this.name = this.buildString(components);
        this.noComponents = components.length;
    }

    public append(c: string) {
        let components = this.parseComponents();
        components.push(c);
        this.name = this.buildString(components);
        this.noComponents = components.length;
    }

    public remove(i: number) {
        let components = this.parseComponents();
        components.splice(i, 1);
        this.name = this.buildString(components);
        this.noComponents = components.length;
    }

    private parseComponents(): string[] {
        if (this.name === "") {
            return [];
        }
        
        let components: string[] = [];
        let currentComponent = "";
        let i = 0;
        
        while (i < this.name.length) {
            if (this.name[i] === ESCAPE_CHARACTER && i + 1 < this.name.length) {
                currentComponent += this.name[i + 1];
                i += 2;
            } else if (this.name[i] === this.delimiter) {
                components.push(currentComponent);
                currentComponent = "";
                i++;
            } else {
                currentComponent += this.name[i];
                i++;
            }
        }
        
        components.push(currentComponent);
        return components;
    }

    private buildString(components: string[]): string {
        let result: string[] = [];
        for (let i = 0; i < components.length; i++) {
            let component = components[i];
            let escaped = '';
            for (let j = 0; j < component.length; j++) {
                let c = component.charAt(j);
                if (c === this.delimiter || c === ESCAPE_CHARACTER) {
                    escaped += ESCAPE_CHARACTER;
                }
                escaped += c;
            }
            result.push(escaped);
        }
        return result.join(this.delimiter);
    }

}